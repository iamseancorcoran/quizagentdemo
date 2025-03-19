// Constants
const API_BASE_URL = 'http://localhost:5678/webhook/';
const QUIZ_TITLE_ID = 'quiz-title';
const QUIZ_CONTAINER_ID = 'quiz-container';
const CURRENT_QUESTION_ID = 'current-question';
const TOTAL_QUESTIONS_ID = 'total-questions';
const PREV_BUTTON_ID = 'prev-question';
const NEXT_BUTTON_ID = 'next-question';
const SUBMIT_BUTTON_ID = 'submit-quiz';
const QUESTIONS_PER_QUIZ = 3;

// DOM Elements
const quizTitleElement = document.getElementById(QUIZ_TITLE_ID);
const quizContainer = document.getElementById(QUIZ_CONTAINER_ID);
const currentQuestionElement = document.getElementById(CURRENT_QUESTION_ID);
const totalQuestionsElement = document.getElementById(TOTAL_QUESTIONS_ID);
const prevButton = document.getElementById(PREV_BUTTON_ID);
const nextButton = document.getElementById(NEXT_BUTTON_ID);
const submitButton = document.getElementById(SUBMIT_BUTTON_ID);

// State
let quizSession;
let videoData;
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// Import question pools
let questionPools;
try {
    // Attempt to load question pools dynamically
    import('/data/question-pools.js')
        .then(module => {
            questionPools = module.default;
            console.log('Question pools loaded successfully');
        })
        .catch(error => {
            console.error('Error loading question pools:', error);
            // Fall back to fetch
            fetch('/data/question-pools.js')
                .then(response => response.text())
                .then(text => {
                    // Extract the object from the text
                    const poolsText = text.substring(
                        text.indexOf('const questionPools = {'),
                        text.indexOf('module.exports = questionPools')
                    );
                    // Use eval in a safe context to convert the text to an object
                    questionPools = (new Function('return ' + poolsText.replace('const questionPools = ', '')))();
                    console.log('Question pools loaded via fetch');
                })
                .catch(fetchError => {
                    console.error('Failed to load question pools via fetch:', fetchError);
                });
        });
} catch (error) {
    console.error('Error in question pool loading process:', error);
}

// Default questions as fallback
const defaultQuestions = [
    {
        question: "What is Ethereum primarily designed as?",
        options: [
            { text: "A digital currency only", correct: false },
            { text: "A decentralized platform for smart contracts", correct: true },
            { text: "A centralized database system", correct: false },
            { text: "An alternative to traditional banking", correct: false }
        ]
    },
    {
        question: "What is the native cryptocurrency of Ethereum called?",
        options: [
            { text: "Bitcoin", correct: false },
            { text: "Ether (ETH)", correct: true },
            { text: "Litecoin", correct: false },
            { text: "Solana", correct: false }
        ]
    },
    {
        question: "What are self-executing agreements on Ethereum called?",
        options: [
            { text: "Digital contracts", correct: false },
            { text: "Auto protocols", correct: false },
            { text: "Smart contracts", correct: true },
            { text: "Crypto agreements", correct: false }
        ]
    }
];

// Functions
async function fetchVideoData(videoId) {
    try {
        // For development we'll load directly from the JSON file
        // In production this would be replaced with an API call to n8n
        const response = await fetch('/data/videos.json');
        const data = await response.json();
        return data.videos.find(video => video.id === videoId);
    } catch (error) {
        console.error('Error fetching video data:', error);
        return null;
    }
}

async function fetchQuizQuestions(videoId) {
    try {
        // In a real implementation this would call the n8n webhook to get questions
        // For development we'll randomly select questions from our question pools

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if we have loaded question pools and if there's a pool for this video
        if (questionPools && questionPools[videoId]) {
            const videoPool = questionPools[videoId];

            // If we have fewer questions than needed return all of them
            if (videoPool.length <= QUESTIONS_PER_QUIZ) {
                return videoPool;
            }

            // Otherwise randomly select QUESTIONS_PER_QUIZ questions
            const selectedQuestions = [];
            const availableIndices = Array.from({ length: videoPool.length }, (_, i) => i);

            for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
                // Randomly select an index from available indices
                const randomIndex = Math.floor(Math.random() * availableIndices.length);
                const questionIndex = availableIndices[randomIndex];

                // Add the question to selected questions
                selectedQuestions.push(videoPool[questionIndex]);

                // Remove the selected index from available indices
                availableIndices.splice(randomIndex, 1);
            }

            console.log(`Randomly selected ${selectedQuestions.length} questions for video ${videoId}`);
            return selectedQuestions;
        }

        // Fall back to default questions
        console.log(`No question pool found for video ${videoId}, using default questions`);
        return defaultQuestions;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return defaultQuestions;
    }
}

function renderQuestion(questionIndex) {
    const question = questions[questionIndex];

    // Create question element
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `
        <h3 class="question-text">${question.question}</h3>
        <div class="options"></div>
    `;

    // Add options
    const optionsContainer = questionElement.querySelector('.options');
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[questionIndex] === optionIndex) {
            optionElement.classList.add('selected');
        }

        optionElement.innerHTML = `
            <input type="radio" id="q${questionIndex}-option${optionIndex}"
                name="q${questionIndex}" value="${optionIndex}"
                ${userAnswers[questionIndex] === optionIndex ? 'checked' : ''}>
            <label for="q${questionIndex}-option${optionIndex}">${option.text}</label>
        `;

        // Add event listener
        optionElement.addEventListener('click', () => {
            // Select this option
            document.querySelectorAll(`.option[name="q${questionIndex}"]`).forEach(el => {
                el.classList.remove('selected');
            });
            optionElement.classList.add('selected');

            // Update user answers
            userAnswers[questionIndex] = optionIndex;

            // Check if all questions are answered
            checkAllAnswered();
        });

        optionsContainer.appendChild(optionElement);
    });

    return questionElement;
}

function showQuestion(index) {
    // Update current question index
    currentQuestionIndex = index;

    // Update navigation buttons
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';

    // Update question counter
    currentQuestionElement.textContent = currentQuestionIndex + 1;

    // Clear container and render current question
    quizContainer.innerHTML = '';
    quizContainer.appendChild(renderQuestion(currentQuestionIndex));
}

function checkAllAnswered() {
    // Check if all questions have an answer
    const allAnswered = userAnswers.length === questions.length &&
                        !userAnswers.includes(undefined);

    // Enable submit button if all questions are answered
    if (currentQuestionIndex === questions.length - 1) {
        submitButton.disabled = !allAnswered;
    }
}

async function submitQuiz() {
    try {
        // Prepare answers for submission
        const answers = userAnswers.map((answerIndex, questionIndex) => {
            return {
                questionIndex: questionIndex,
                selectedOptionIndex: answerIndex,
                isCorrect: questions[questionIndex].options[answerIndex].correct
            };
        });

        // Calculate score
        const correctAnswers = answers.filter(answer => answer.isCorrect).length;
        const totalQuestions = questions.length;
        const score = (correctAnswers / totalQuestions) * 100;

        // Store results
        const quizResults = {
            videoId: quizSession.videoId,
            timestamp: new Date().toISOString(),
            answers: answers,
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions,
            passed: correctAnswers === totalQuestions // Perfect score required for badge
        };
        localStorage.setItem('quizResults', JSON.stringify(quizResults));

        // Navigate to results page
        window.location.href = 'results.html';
    } catch (error) {
        console.error('Error submitting quiz:', error);
        alert('Error submitting quiz. Please try again.');
    }
}

// Event Listeners
function setupEventListeners() {
    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        }
    });

    submitButton.addEventListener('click', submitQuiz);
}

// Initialization
async function init() {
    // Get quiz session from localStorage
    const sessionData = localStorage.getItem('quizSession');
    if (!sessionData) {
        window.location.href = 'index.html';
        return;
    }

    quizSession = JSON.parse(sessionData);

    // Fetch video data
    videoData = await fetchVideoData(quizSession.videoId);
    if (!videoData) {
        window.location.href = 'index.html';
        return;
    }

    // Update quiz title
    quizTitleElement.textContent = videoData.title;

    // Fetch quiz questions
    questions = await fetchQuizQuestions(quizSession.videoId);
    if (questions.length === 0) {
        quizContainer.innerHTML = '<p>Error loading quiz questions. Please try again.</p>';
        return;
    }

    // Initialize user answers array
    userAnswers = new Array(questions.length).fill(undefined);

    // Update total questions
    totalQuestionsElement.textContent = questions.length;

    // Setup event listeners
    setupEventListeners();

    // Show first question
    showQuestion(0);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
