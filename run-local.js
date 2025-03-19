#!/usr/bin/env node

/**
 * Simple HTTP server for local development
 * This script starts a local HTTP server to serve the frontend files
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Configuration
const PORT = 3002;
const PUBLIC_DIR = path.join(__dirname, 'frontend');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  
  // Extract path from URL
  let pathname = parsedUrl.pathname;
  
  // Default to index.html if path is '/'
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Resolve file path
  const filePath = path.join(PUBLIC_DIR, pathname);
  
  // Get file extension
  const ext = path.extname(filePath);
  
  // Set default content type to text/plain
  let contentType = MIME_TYPES[ext] || 'text/plain';
  
  // Special handling for data directory
  if (pathname.startsWith('/data/')) {
    const dataPath = path.join(__dirname, pathname);
    
    // Read file
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        // If file not found, return 404
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
          return;
        }
        
        // For other errors, return 500
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
        return;
      }
      
      // Set content type based on file extension
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
    
    return;
  }
  
  // Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, return 404
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }
      
      // For other errors, return 500
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
      return;
    }
    
    // Set content type based on file extension
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
});
