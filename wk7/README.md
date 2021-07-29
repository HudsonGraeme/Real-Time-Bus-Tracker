# Week 7 - PacMen Factory

## Description

This web application displays a number of generated pacmen floating around the window with varying colours and mouth open / closed states.

### Features

* Pacmen avoid hitting the control box

* Each pacman has it's own colour wheel offset based on the time it was created

* Responsive buttons for starting and resetting the animation

* An animation frame is used in partnership with `setTimeout` to display all animations, in place of `setInterval`.

## Installation

* Download these project files and open the `index.html` file in your browser

## Usage

Once the window has loaded this application, use the `Add Pacman` button to add one or many pacmen to the document. Once a sufficient number of pacmen have been added, press the `Start Animation` button to see the animated pacmen find their way around the display. As the pacmen move, they will "bounce" off of the controls box and window edges. They will also shift colour over time. Feel free to use the `Add Pacman` button while the animation is ongoing to increase the amount of pacmen on the display. Any new pacmen added whilst the animation is ongoing will result in a wide variety of colour wheel offsets which proves to be an interesting sight. If too many pacmen are generated or you'd just like a fresh board, use the `Reset` button to clear all of the active pacmen and bring back the initial state of the page.

## Support

* If there are any bugs present feel free to create an issue in the parent repo, or make a PR.

## Roadmap

* This project is complete and will no longer be maintained unless a bug is found (an issue or PR is opened)

## License

MIT
