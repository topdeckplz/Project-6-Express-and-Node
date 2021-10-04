/**Required modules

const express = require('express');
const pug = require('pug');
const http = require('http');

//Print Error Messages
function printError(error) {
    console.error(error.message);
}

//
function get(username) {
    try {
        // Connect to the API URL (http://localhost:3000/data.json)
        const request = https.get(`http://localhost:3000/${projects}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try {
                        // Parse the data
                        const profile = JSON.parse(body);
                        // Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}**/