# Know Weather App

This is a weather application built as part of Kraftshala’s Selection Process for the Frontend Developer intern position. The application fetches and displays current weather information based on user input, using the Open Weather API. It includes features like current time and date, dark/light mode toggle and displays detailed weather information.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Page](#page)
  - [App](#app)

## Demo

Check out the live demo of the application: [Live Demo](https://know-weather-app.vercel.app/)

## Features

- Fetches and displays current weather information based on user input (city name).
- Displays location, temperature, date, and time.
- Provides additional weather details such as humidity, feels like, wind speed, and weather description.
- Implements dark mode and light mode toggle functionality.
- Handles API responses and errors gracefully.
- Responsive design for various devices (desktop, tablet, mobile).

## Tech Stack

- React
- Fetch for API requests
- Open Weather Map API
- CSS for styling

## Getting Started

### Prerequisites

Make sure you have the following installed on your local development machine:

- Node.js (>= 14)
- npm (>= 6)

### Installation

1. Clone the repository:

   ```bash
   git https://github.com/prasanth-p8/know_weather_app
   cd know_weather_app-main
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Page

### App

- **Input Field**: Type the name of a city to get weather info.
- **No Input Provided**: Error message will be display to enter a city name.
- **Real-Time Weather Results**: Displays weather info results as you searched.
- **City Not Found**: Display error image if no city found for your search.
- **Toggle Button(light/dark)**: Option to change application theme (light/dark).
- **Social Media Icons**: Redirect to respective platform to get in touch with me.
