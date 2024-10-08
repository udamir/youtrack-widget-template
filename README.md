# Youtrack Widget Template

## Description

A template for building YouTrack custom widgets using Bun, Vite, TypeScript, React (with functional components), and Ring-UI.

This repository can be used as a template so you don't need to fork it.

## Installation

1. Clone the repository.
2. Run: ```bun install```

## Development

Implement your Custom Widget as React functional component (src/components/Widget.tsx):
1. Use JetBrains Ring-UI components to align Youtrack style.
2. Use [youtrack-client](http://github.com/udamir/youtrack-client) in order to work with Youtrack API.

## Widget preview

Use the Widget Playground in Youtrack while developing to preview you widget in real time.

1. Run ```bun dev``` to start the development server.
2. Go to the Widget Playground, in the Custom Widgets section, on Youtrack.
3. Insert the URL of the development server in the widget URL field.

## Build

1. Run ```bun package``` to package the widget.

## Deployment

1. Go to the Custom Widgets section in Youtrack.
2. Press "New Widget" and upload the packaged widget (zip folder).
