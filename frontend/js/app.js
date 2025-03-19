// Constants
const API_BASE_URL = 'http://localhost:5678/webhook/';
const VIDEO_GRID_ID = 'video-grid';

// DOM Elements
const videoGrid = document.getElementById(VIDEO_GRID_ID);

// State
let videos = [];

// Functions
async function fetchVideos() {
    try {
        // For development, we'll load directly from the JSON file
        // In production, this would be replaced with an API call to n8n
        const response = await fetch('/data/videos.json');
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

function renderVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.title}">
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <p><small>Duration: ${video.duration}</small></p>
        <button class="btn primary-btn" data-id="${video.id}">Watch & Quiz</button>
    `;

    // Add event listener to the button
    const button = videoCard.querySelector('button');
    button.addEventListener('click', () => selectVideo(video.id));

    return videoCard;
}

function renderVideos(videos) {
    // Clear loading message
    videoGrid.innerHTML = '';

    if (videos.length === 0) {
        videoGrid.innerHTML = '<p>No videos available.</p>';
        return;
    }

    // Render each video card
    videos.forEach(video => {
        const videoCard = renderVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

function selectVideo(videoId) {
    // Store selected video ID in localStorage
    localStorage.setItem('selectedVideoId', videoId);

    // Navigate to the player page
    window.location.href = 'player.html';
}

// Initialization
async function init() {
    // Fetch videos
    videos = await fetchVideos();

    // Render videos
    renderVideos(videos);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
