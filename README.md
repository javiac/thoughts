# Thoughts

Web app that lets add thoughts into a list

![Alt text](doc/thoughtsList.png 'screenshot')
![Alt text](doc/modal.png 'screenshot')
![Alt text](doc/error.png 'screenshot')

## Project structure

### Client

React app created with create-react-app scripts. It uses react testing library to test the App component.

### Server

NodeJS server that simulates the thoughts store. It uses mocha to test the API.

## Run the project

Requirements Node v14.18.1

    cd client
    npm install
    npm start
    cd server
    npm install
    npm start
    Navigate to http://localhost:3000/

## Run frontend tests

For now it only tests that App component renders

    cd client; npm test

## Run backend tests

    cd server; npm start
    npm test
