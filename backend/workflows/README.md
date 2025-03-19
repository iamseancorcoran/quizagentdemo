# n8n Workflows

This directory contains exported n8n workflow files that can be imported into your n8n instance.

## Workflow Overview

The following workflows will be implemented:

1. **Video Management Workflow**
   - Serves video catalog data to the frontend
   - Handles video selection and playback

2. **Question Generation Workflow**
   - Processes video transcripts
   - Generates quiz questions using OpenAI API
   - Formats and randomizes questions

3. **Quiz Delivery Workflow**
   - Serves quiz questions to the frontend
   - Handles answer submission and evaluation

4. **Badge Generation Workflow**
   - Creates digital badges for successful quiz completion

## How to Import Workflows

1. Access your n8n instance at http://localhost:5678
2. Go to Workflows in the left sidebar
3. Click the "Import from File" button
4. Select the workflow JSON file you want to import
5. Configure any credentials or settings as needed
6. Activate the workflow

## Workflow Dependencies

- OpenAI API credentials for question generation
- Access to the video transcript data
- Frontend integration via webhook endpoints
