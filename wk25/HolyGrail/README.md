# Week 25 - Holy Grail Application

![Holy Grail](https://user-images.githubusercontent.com/25019680/146494245-a01fd830-db41-4bc7-a9c8-f5b262146c7a.jpeg)

## Description

This app shows a simple holy grail page and updates values for each section based off of button presses. When section values are updated, an express server updates a redis database and returns the new state to the frontend.

### Features

- Update integer values for each section in the holy grail page

- Uses a redis database for storing values

- Uses an express backend

## Installation

- Download the project files `cd` into the downloaded directory and run `node index.js`

- Install [`Docker`](https://www.docker.com/get-started) and run `docker run -p 6379:6379 --name redis -d redis` which will pull the official redis docker image and fire up a DB instance for the app to use

## Usage

Open the page and press the `+` / `-` buttons for each section. Observe as section numbers increase and decrease to positive and negative numbers when each add / remove button is pressed.

## Support

- If there are any bugs present feel free to create an issue in the parent repo, or make a PR.

## Roadmap

- This project is complete and will no longer be maintained unless a bug is found (an issue or PR is opened)

## License

MIT
