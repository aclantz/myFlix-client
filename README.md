# MyFlix Movie App
### Full-Stack-Immersion Achievement 3
Welcome to myFlix, a web application that allows users to explore a collection of movies, create profiles, and save movies as their favorites.

## Overview
MyFlix is a full stack application built with React, Node.js, Express, and MongoDB. This achievement in my Career Foundry course is focused on learning to use React and building a front end application to connect to an API I built in a previous achievement.

## Link to site hosted by Netlify
https://myflixacl.netlify.app

## Setup Development Environment
Start Development server:
`npm start`
Open the app in your browser: http://localhost:1234

## Essential Views and Features
Main view
- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view
- Allows users to log in with a username and password

Signup view
- Allows new users to register (username, password, email, date of birth)

Profile view
- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

