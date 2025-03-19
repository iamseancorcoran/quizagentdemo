// Constants
const API_BASE_URL = 'http://localhost:5678/webhook/';
const RESULTS_CONTAINER_ID = 'results-container';
const BADGE_CONTAINER_ID = 'badge-container';
const BADGE_IMAGE_ID = 'badge-image';
const DOWNLOAD_BADGE_BTN_ID = 'download-badge';
const SHARE_BADGE_BTN_ID = 'share-badge';
const RETRY_QUIZ_BTN_ID = 'retry-quiz';
const NEW_VIDEO_BTN_ID = 'new-video';

// DOM Elements
const resultsContainer = document.getElementById(RESULTS_CONTAINER_ID);
const badgeContainer = document.getElementById(BADGE_CONTAINER_ID);
const badgeImageContainer = document.getElementById(BADGE_IMAGE_ID);
const downloadBadgeButton = document.getElementById(DOWNLOAD_BADGE_BTN_ID);
const shareBadgeButton = document.getElementById(SHARE_BADGE_BTN_ID);
const retryQuizButton = document.getElementById(RETRY_QUIZ_BTN_ID);
const newVideoButton = document.getElementById(NEW_VIDEO_BTN_ID);

// State
let quizResults;
let videoData;
let badgeData;

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

async function fetchBadgeTemplate() {
    try {
        // For development we'll load directly from the JSON file
        // In production this would be replaced with an API call to n8n
        const response = await fetch('/data/badges/badge-template.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching badge template:', error);
        return null;
    }
}

function renderResults() {
    // Create results summary
    const resultsSummary = document.createElement('div');
    resultsSummary.className = 'result-summary';

    // Calculate percentage score
    const percentScore = Math.round(quizResults.score);

    // Determine result message based on score
    let resultMessage;
    if (quizResults.passed) {
        resultMessage = 'Congratulations! You answered all questions correctly!';
    } else if (percentScore >= 70) {
        resultMessage = 'Good job! You have a solid understanding of the material.';
    } else if (percentScore >= 40) {
        resultMessage = 'You\'re on the right track but might want to review the video again.';
    } else {
        resultMessage = 'It seems you need to review the material more carefully.';
    }

    resultsSummary.innerHTML = `
        <h2>Your Score</h2>
        <div class="score">${percentScore}%</div>
        <p>${resultMessage}</p>
        <p>You answered ${quizResults.correctAnswers} out of ${quizResults.totalQuestions} questions correctly.</p>
    `;

    // Create detailed results
    const detailedResults = document.createElement('div');
    detailedResults.className = 'detailed-results';
    detailedResults.innerHTML = '<h3>Question Summary</h3>';

    // Add each question result
    quizResults.answers.forEach((answer, index) => {
        const questionResult = document.createElement('div');
        questionResult.className = `question-result ${answer.isCorrect ? 'correct' : 'incorrect'}`;

        questionResult.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}</p>
        `;

        detailedResults.appendChild(questionResult);
    });

    // Clear container and add results
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultsSummary);
    resultsContainer.appendChild(detailedResults);

    // Show badge if passed
    if (quizResults.passed) {
        renderBadge();
    }
}

function renderBadge() {
    if (!badgeData || !videoData) {
        return;
    }

    // Create badge image
    const badgeImage = document.createElement('img');

    // Replace template variables in image URL
    let imageUrl = badgeData.template.imageTemplate;
    imageUrl = imageUrl.replace('Video+Comprehension+Badge', encodeURIComponent(videoData.title));

    badgeImage.src = imageUrl;
    badgeImage.alt = 'Achievement Badge';

    // Add badge image to container
    badgeImageContainer.innerHTML = '';
    badgeImageContainer.appendChild(badgeImage);

    // Show badge container
    badgeContainer.style.display = 'block';
}

function downloadBadge() {
    // In a real implementation this would generate a downloadable badge
    // For development we'll just open the image in a new tab
    if (badgeImageContainer.querySelector('img')) {
        window.open(badgeImageContainer.querySelector('img').src, '_blank');
    }
}

function shareBadge() {
    // In a real implementation this would share the badge on social media
    // For development we'll just show an alert
    alert('In a real implementation this would share your badge on social media.');
}

function retryQuiz() {
    // Navigate back to the quiz page
    window.location.href = 'quiz.html';
}

function chooseNewVideo() {
    // Navigate back to the video selection page
    window.location.href = 'index.html';
}

// Event Listeners
function setupEventListeners() {
    downloadBadgeButton.addEventListener('click', downloadBadge);
    shareBadgeButton.addEventListener('click', shareBadge);
    retryQuizButton.addEventListener('click', retryQuiz);
    newVideoButton.addEventListener('click', chooseNewVideo);
}

// Initialization
async function init() {
    // Get quiz results from localStorage
    const resultsData = localStorage.getItem('quizResults');
    if (!resultsData) {
        window.location.href = 'index.html';
        return;
    }

    quizResults = JSON.parse(resultsData);

    // Fetch video data
    videoData = await fetchVideoData(quizResults.videoId);
    if (!videoData) {
        window.location.href = 'index.html';
        return;
    }

    // Fetch badge template
    badgeData = await fetchBadgeTemplate();

    // Setup event listeners
    setupEventListeners();

    // Render results
    renderResults();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
