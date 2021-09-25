# Revieu Frontend / Backend

<img src="./assets/revieu.png" alt="revieu" width="100px" height="40px" />


Product Review App with Barcode Scan and Camera functions  


## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [About the app](#about-the-app)
    - [Screenshots](#screenshots)
    - [Features](#features)
  - [Running locally](#running-locally)
    - [Requirements](#requirements)
    - [Steps](#steps)
  - [Technologies](#technologies)
  - [Collaboration](#collaboration)
  - [Upcoming features](#upcoming-features)
  - [Credits](#credits)

## About the app

Product Review App with Barcode Scan and Camera functions.
Create this app for Japanese who is new or live in Europe.
Scan the product and see the reviews. 
Add Product infomation(Photos automatically  Open food facts API (https://de.openfoodfacts.org/data) and store it to our MongoDB data base


### Screenshots

<img src="./assets/screenshots/authStack.png" alt="librix: auth screens" width="300px" />
<img src="./assets/screenshots/swipingBooks.png" alt="librix: pool of books with swiping functionality" width="300px" />

<img src="./assets/screenshots/addBook.png" alt="librix: add a book" width="300px" />
<img src="./assets/screenshots/savedBooks.png" alt="librix: saved books" width="300px" />

<img src="./assets/screenshots/matches.png" alt="librix: matches functionality" width="300px" />
<img src="./assets/screenshots/drawer.png" alt="librix: drawer with profile link and books filter" width="300px" />

### Features

1. Secure login / registration
2. Managing a personal profile
3. Adding books for exchange with images
4. Navigating the pool of books via swiping
5. Filtering the pool of books by language, genre, and location
6. Saving books for later
7. Creating a match with another user and:
   1. reserving/accepting the match
   2. deleting/declining the match
   3. completing the exchange
8. Viewing match partner's profile

## Running locally

### Requirements

- Node & NPM
- [Expo CLI](https://docs.expo.io/workflow/expo-cli/)
- Expo Go mobile app or iOS Simulator and/or Android emulator

### Steps

##Frontend

```
$ git clone git@github.com:carveler/Revieu.git
$ cd Revieu/mobile-client/  
$ npm install 
$ npm start
```

##Backend

```
$ git clone git@github.com:carveler/Revieu.git
$ cd Revieu/server/
$ npm install 
$ touch .env
Add a MONGO_URI && JWT_SECRET && JWT_EXPIRY to the .env file
$ npm start
```
## Technologies

###Frontend

1. React Native
2. React Navigation
3. Redux 
4. Expo
5. Axios
6. React Native Paper
7. a number of 3rd-party libraries

###Backend

1. Node.js
2. MongoDB
3. Express
4. Cloudinary
5. Open food facts API (https://de.openfoodfacts.org/data)
6. a number of 3rd-party libraries



## Upcoming features

1. Desktop Client App with Next.js


## TEAM

- [Elias Guderian](https://github.com/GuderianE), Full Stack
- [Mami Kurokawa](https://github.com/carveler), Full Stack


