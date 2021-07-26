# Week 9 - Real Time Bus Tracker

## Description

This web app uses the Ottawa [OC Transpo API](https://open.ottawa.ca/documents/ottawa::oc-transpo-live-next-bus-arrival-data-feed-api/about) to display semi-live bus data on a [MapBoxGL map](https://www.mapbox.com/). It polls for new data at the user's selected interval (defualt is every 30 seconds) and updates map markers when new data is fetched.

### Features

* Dynamic toggle button to trigger starting / stopping requests for new data

* Selection buttons for the frequency of new data loads

* A list of the routes currently displayed

* The ability to highlight map markers based on the selected route

* Error and error recovery handling plus alert messaging

* An activity spinner within the toggle button which indicates when the application is processing new data

* Per-bus information using map marker callouts

## Installation

* Download the project files and open the `index.html` file in your browser

## Usage

The app will begin fetching new data as soon as the page is loaded. It's default data fetch interval is set to 30s but that can be changed using the `5s` (5 second), `30s` (30 second) and `1m` (1 Minute) buttons. You can pause the data shown using the toggle button at the top of the screen. When new data is being loaded into the map, a spinner is shown within the toggle button. To highlight markers based on their routes, you can click elements in the `Active Routes` list. The list item you selected will become highlighted in the same colour as the bus markers corresponding to the selected route. You can view more detailed, per-bus data by clicking any of the map markers to reveal a callout. If any errors occur in the application, you will be notified via an alert in the top right corner of the screen and given the option to submit a bug report via link. When an error is resolved, any error messages will disappear and will be replaced with a success message lasting 5 seconds which will indicate normal service has been resumed.

## Support

* If there are any bugs present feel free to create an issue in the parent repo, or make a PR.

## Roadmap

* This project is complete and will no longer be maintained unless a bug is found (an issue or PR is opened)

## License

MIT
