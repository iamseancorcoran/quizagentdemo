// Constants
const API_BASE_URL = 'http://localhost:5678/webhook/';
const VIDEO_TITLE_ID = 'video-title';
const START_QUIZ_BTN_ID = 'start-quiz';
const QUIZ_STATUS_ID = 'quiz-status';
const VIDEO_COMPLETION_THRESHOLD = 0.9; // 90% of the video must be watched

// DOM Elements
const videoTitleElement = document.getElementById(VIDEO_TITLE_ID);
const startQuizButton = document.getElementById(START_QUIZ_BTN_ID);
const quizStatusElement = document.getElementById(QUIZ_STATUS_ID);

// State
let player;
let videoData;
let videoId;
let videoCompleted = false;

// Functions
async function fetchVideoData(videoId) {
    try {
        // For development, we'll load directly from the JSON file
        // In production, this would be replaced with an API call to n8n
        const response = await fetch('../data/videos.json');
        const data = await response.json();
        return data.videos.find(video => video.id === videoId);
    } catch (error) {
        console.error('Error fetching video data:', error);
        return null;
    }
}

// YouTube Player API
function onYouTubeIframeAPIReady() {
    // Get video ID from localStorage
    videoId = localStorage.getItem('selectedVideoId');
    
    if (!videoId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Fetch video data
    fetchVideoData(videoId).then(data => {
        if (!data) {
            window.location.href = 'index.html';
            return;
        }
        
        videoData = data;
        videoTitleElement.textContent = data.title;
        
        // Initialize YouTube player
        player = new YT.Player('youtube-player', {
            height: '360',
            width: '640',
            videoId: data.youtubeId,
            playerVars: {
                'playsinline': 1,
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // Check if video is ended or nearly complete (90%)
    if (event.data === YT.PlayerState.ENDED || 
        (player.getCurrentTime() / player.getDuration() > VIDEO_COMPLETION_THRESHOLD)) {
        videoCompleted = true;
        startQuizButton.disabled = false;
        quizStatusElement.textContent = "You've watched enough of the video to take the quiz!";
    }
    
    // Add a progress check every second to update the status message
    if (event.data === YT.PlayerState.PLAYING) {
        const progressInterval = setInterval(() => {
            if (!player) {
                clearInterval(progressInterval);
                return;
            }
            
            const progress = player.getCurrentTime() / player.getDuration();
            
            if (progress > VIDEO_COMPLETION_THRESHOLD) {
                videoCompleted = true;
                startQuizButton.disabled = false;
                quizStatusElement.textContent = "You've watched enough of the video to take the quiz!";
                clearInterval(progressInterval);
            } else {
                const percentWatched = Math.floor(progress * 100);
                quizStatusElement.textContent = `Video progress: ${percentWatched}% (need ${VIDEO_COMPLETION_THRESHOLD * 100}% to take quiz)`;
            }
        }, 1000);
    }
}

async function startQuiz() {
    if (!videoCompleted) {
        quizStatusElement.textContent = 'Please watch at least 90% of the video before starting the quiz.';
        return;
    }
    
    quizStatusElement.textContent = 'Generating quiz questions...';
    startQuizButton.disabled = true;
    
    try {
        // In a real implementation, this would call the n8n webhook to generate questions
        // For development, we'll simulate a delay and redirect to the quiz page
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store quiz session info
        const quizSession = {
            videoId: videoId,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('quizSession', JSON.stringify(quizSession));
        
        // Navigate to quiz page
        window.location.href = 'quiz.html';
    } catch (error) {
        console.error('Error starting quiz:', error);
        quizStatusElement.textContent = 'Error starting quiz. Please try again.';
        startQuizButton.disabled = false;
    }
}

// Event Listeners
function setupEventListeners() {
    startQuizButton.addEventListener('click', startQuiz);
}

// Initialization
function init() {
    setupEventListeners();
    
    // YouTube API will call onYouTubeIframeAPIReady when ready
    
    // Load video data
    videoId = localStorage.getItem('selectedVideoId');
    if (videoId) {
        fetchVideoData(videoId).then(data => {
            if (data) {
                videoData = data;
                videoTitleElement.textContent = data.title;
                console.log('Video data loaded');
            }
        });
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
