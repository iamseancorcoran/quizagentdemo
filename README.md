# Video Learning Quiz System

A no-code/low-code solution for creating quizzes based on YouTube video content. The system verifies user understanding by requiring them to watch a video and then answer questions about its content.

## Live Demo

Visit [https://quizagentdemo.vercel.app/](https://quizagentdemo.vercel.app/) to see the application in action.

## Features

- **Video Selection**: Browse a collection of educational videos about Ethereum and blockchain
- **Video Player**: Watch videos directly in the application
- **Progress Tracking**: System tracks video watching progress
- **Quiz Generation**: Take a quiz after watching at least 90% of a video
- **Badge System**: Earn digital badges for successful quiz completion

## Technical Implementation

### Architecture

This project is built using a combination of static frontend files and data files:

- **Frontend**: HTML, CSS, and JavaScript files in the `/frontend` directory
- **Data**: JSON files containing video metadata and quiz questions in the `/data` directory
- **Deployment**: Configured for Vercel static site hosting

### Project Structure

```
/
├── frontend/               # Frontend static files
│   ├── index.html          # Home page
│   ├── player.html         # Video player page
│   ├── quiz.html           # Quiz page
│   ├── results.html        # Quiz results page
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── data/                   # Data files
│   ├── videos.json         # Video metadata
│   ├── question-pools.js   # Quiz questions
│   └── badges/             # Badge templates
└── vercel.json            # Vercel deployment configuration
```

### How It Works

1. Users select a video from the main page
2. The system loads the video and tracks viewing progress
3. Once 90% of the video is watched, the "Start Quiz" button becomes active
4. The quiz consists of 3 multiple-choice questions about the video content
5. Users receive a digital badge if they answer all questions correctly

## Deployment

This project is configured for deployment on Vercel with the following settings:

```json
{
  "version": 2,
  "builds": [
    { "src": "frontend/**/*", "use": "@vercel/static" },
    { "src": "data/**/*", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/data/(.*)", "dest": "/data/$1" },
    { "src": "/(.*)", "dest": "/frontend/$1" }
  ]
}
```

## Future Enhancements

- Integration with n8n for workflow automation
- Connection to Flowise for AI-powered question generation using the video transcript
- Implementation of a vector database for more sophisticated question retrieval
- User authentication and progress tracking
