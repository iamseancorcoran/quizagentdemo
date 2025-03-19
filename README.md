# AI-Powered Quiz System for YouTube Content

This project implements a no-code/low-code AI-powered quiz system for verifying user understanding of YouTube video content.

## Project Structure

```
/
├── frontend/           # Frontend web application
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   ├── index.html      # Video selection page
│   ├── player.html     # Video playback page
│   ├── quiz.html       # Quiz interface
│   └── results.html    # Results and badge page
│
├── backend/            # Backend configuration files for n8n
│   ├── workflows/      # n8n workflow definitions
│   └── cline-n8n-integration.js # Examples of n8n-nodes-mcp usage
│
├── data/               # Data storage
│   ├── videos.json     # Video metadata and transcripts
│   └── badges/         # Badge templates
│
├── run-local.js        # Local development server
├── environment.yml     # Conda environment definition
├── .gitignore          # Git ignore file
└── README.md           # Project documentation
```

## Getting Started

### Environment Setup

This project uses a conda environment named `env5`:

```bash
# Activate the environment
conda activate env5

# Deactivate the environment when done
conda deactivate
```

### Running the Application Locally

1. Start the local development server:

```bash
# Make sure you're in the project directory
cd /Users/user/CLINE/AITCH/QUIZ\ Agent\ N8N\ VERSION\ 1

# Run the local server
node run-local.js
```

2. Open your browser and navigate to http://localhost:3002

### Setting Up n8n Workflows

1. Access your n8n instance at http://localhost:5678

2. Import the workflow files from the `backend/workflows` directory:
   - Go to Workflows in the left sidebar
   - Click the "Import from File" button
   - Select the workflow JSON file you want to import
   - Configure any credentials or settings as needed
   - Activate the workflow

3. Configure OpenAI API credentials:
   - Go to Settings > Credentials
   - Click "Add Credential"
   - Select "OpenAI API"
   - Enter your OpenAI API key
   - Save the credential

## Using n8n-nodes-mcp with Cline

The project includes examples of how to use the n8n-nodes-mcp integration with Cline in the `backend/cline-n8n-integration.js` file. This integration allows you to:

1. Trigger n8n workflows directly from Cline
2. Get workflow execution results
3. Create and update workflows
4. List all available workflows

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: n8n workflow engine
- **AI Integration**: OpenAI API via n8n
- **Video Player**: YouTube iframe API
- **Integration**: n8n-nodes-mcp for Cline integration

## Features

- **Video Selection & Playback**: Browse and watch YouTube videos
- **AI-Powered Quiz Generation**: Automatically generate multiple-choice questions from video transcripts
- **Quiz Interface**: Take quizzes with randomized questions and options
- **Results & Badges**: View quiz results and earn digital badges for perfect scores
