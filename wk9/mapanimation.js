/**
 * Spencer Graham
 * Full Stack Development - MIT xPro
 * 07/24/21
 * This application periodically polls an endpoint which provides live bus data for the `Parliament` bus route
 * and displays markers based on where each bus is. I'd like to add callouts to the markers displaying data about
 * each bus, but we shall see how far this project will take me.
 *
 * Update: The following functionality has been implemented
 * - Three polling options (5 seconds, 30 seconds and 1 minute) which allow the user to control how fast data comes in
 * - A spinner which is shown for the duration of all data loads, indicating the application is working
 * - A dynamic toggle button that controls whether or not the application is fetching new data
 * - A list of all of the current routes and the ability to highlight buses by route
 * - Custom bus icons with callouts containing all of the data we have (minus two fields, which are unused or not relevant)
 *
 * Things that would likely take a lot of time but would have been very fun to work on
 * - Some sort of unique bus ID would be great to allow movement of the map markers rather than removing them all and replacing them on each data load
 * - A better method of marker colouring should be employed, the CSS filter is a little hacky.
 * - Something like firebase or a websocket connection would be great so live data could come in (Not a fan of polling)
 * - Drawing trailing lines behind buses as they move through their routes
 * - Allowing users to search and filter by route, as well including all of the stops to get a full set of data here
 */

// Static variables
const API_BASE = 'https://api.octranspo1.com'
const APP_ID = 'd71fbb3f';
const API_KEY = '48b0234e680d416a543cba958deed79c';
const POLL_OPTIONS = [
    '5s',
    '30s',
    '1m',
];
/**
 * The stop we are monitoring
 * @see {@link https://www.octranspo.com/en/plan-your-trip/travel-tools/bus-stop-number-list}
 */
const STOP_NO = '3052'

// Have we already set our map's center point?
let wasCenterSet = false;
// Have we finished loading the initial set of data?
let wasDataInitiallyLoaded = false;
// Are we actively polling for new data?
let poller = { active: false, interval: 30000, setIntervalID: 0 };

/**
 * Start polling for new data at the poller's set interval
 */
poller.start = () => {
    loadData();
    poller.setIntervalID = setInterval(loadData, poller.interval);
    poller.active = true;
};

/**
 * Stop polling for new data
 */
poller.stop = () => {
    clearInterval(poller.setIntervalID);
    poller.active = false;
};

/**
 * Restart the poller
 */
poller.restart = () => {
    if (poller.active)
        poller.stop();
    poller.start();
};
const activeMarkers = [];

/**
 * Get data when the window loads
 */
window.onload = () => {
    loadData();
};

// Setup our MapBoxGL token
mapboxgl.accessToken = 'pk.eyJ1IjoiaHVkc29uZ3JhZW1lIiwiYSI6ImNrcjJzd3E3MDBodDMydnBkdzB0YjY4dmEifQ.ajH7utMK0vEC0E8ZKS1CWw';

// Initialize the MapBoxGL map
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 10
});


/**
 * A wrapper for `fetch` that uses the constants defined above to simplify network requests
 * @param {String} uri The endpoint URI that will be used (only one in this case, but left as a parameter in case more will be added)
 * @returns A promise containing the result of the `fetch`
 */
const fetchFromAPI = (uri) => fetch(API_BASE + `${uri}?` + new URLSearchParams({
    appID: APP_ID,
    apiKey: API_KEY,
    stopNo: STOP_NO
}));

/**
 * Sets new text within the button, done this way to prevent overwriting the spinner child element each time
 * @param {String} newText The new text to be shown in the toggle button
 */
const setToggleButtonText = (newText) => {
    const button = document.getElementById('togglebutton');
    button.childNodes[0].nodeValue = newText;
}

/**
 * Load data from the buses endpoint
 */
const loadData = () => {
    const spinner = document.getElementById('togglebutton').getElementsByClassName('spinner-grow')[0];
    spinner.style.visibility = 'visible';
    fetchFromAPI('/v2.0/GetNextTripsForStopAllRoutes').then(async(response) => {
        const json = await response.json();
        setNewData(deserializeAllRoutesData(json));
        const errorAlert = document.getElementsByClassName('alert-danger')[0];
        if (errorAlert) {
            document.body.removeChild(errorAlert);
            displayAlert('Successfully loaded new data from the bus data API. Normal service has been resumed.', false);
            setTimeout(() => document.body.removeChild(document.getElementsByClassName('alert')[0]), 5000);
        }
    }).catch(ex => {
        console.error('Something has gone terribly wrong, and the API request was not successful.', ex);
        displayAlert(`An exception has occurred and the poller has been turned off. <br/> Please <a class="alert-link" href="https://github.com/HudsonGraeme/xPro-Portfolio/issues/new">create a new issue</a> if this is a recurring bug. <br/> ${ex}`, true);
        setIsPolling(false);
    }).finally(() => {
        spinner.style.visibility = 'hidden';
        if (!wasDataInitiallyLoaded) {
            poller.start();
            document.getElementById('togglebutton').disabled = false;
            wasDataInitiallyLoaded = true;
        }
    });
}

/**
 * Deserializes data from our API call, @see {@link loadData}
 * @param {Object} data Data from the `GetNextTripsForStopAllRoutes` endpoint
 * @returns Deserialized data to be used for display on the map
 */
const deserializeAllRoutesData = (data) => {
    const unwrappedData = data.GetRouteSummaryForStopResult;
    const stop = unwrappedData.StopDescription;
    const buses = unwrappedData.Routes.Route.filter(route => route.Trips.length).map(route => route.Trips.map(trip => ({...trip, route: route.RouteHeading }))).flat().filter(b => b.Longitude && b.Latitude).map(bus => ({
        ...bus,
        coords: [parseFloat(bus.Longitude), parseFloat(bus.Latitude)],
    })).sort((a, b) => a.TripDestination.localeCompare(b.TripDestination));

    const center = [
        buses.reduce((a, b) => a + b.coords[0], 0) / buses.length || 0,
        buses.reduce((a, b) => a + b.coords[1], 0) / buses.length || 0
    ];

    return {
        stop,
        buses,
        center
    }
};

/**
 * Display new data on our map
 * @param {Object} data New deserialized data
 */
const setNewData = (data) => {
    const routeList = document.getElementById('routelist');
    if (data.buses) {
        activeMarkers.forEach(marker => {
            marker.remove();
        });
        activeMarkers.length = 0;
        [...routeList && routeList.children || []].forEach(child => routeList.removeChild(child));
    }
    data.buses.forEach(bus => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.setAttribute("route", bus.route);
        el.style.backgroundImage =
            'url(./images/BusMarker.svg)';
        el.style.width = '27.9px';
        el.style.height = '47px';
        el.style.backgroundSize = '100%';
        const marker = new mapboxgl.Marker(el);
        marker.setLngLat(bus.coords);
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<ul class="list-group list-group-flush" style="margin-right: 0.75rem;" >' + Object.entries(bus).filter(([key]) => key !== "coords" && key !== "GPSSpeed").map(([key, value]) => `<li class="list-group-item"><b>${(key.charAt(0).toLocaleUpperCase() + key.split(key.charAt(0))[1]).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</b> &emsp; ${value}</li>`).join('') + '</ul>'));
        marker.addTo(map);
        activeMarkers.push(marker);
    });
    const routes = [];
    data.buses.map(bus => bus.route).sort().forEach(route => {
        if (!routes.includes(route)) {
            routes.push(route);
        }
    });

    routes.forEach(route => {
        const listElement = document.createElement('li');
        listElement.className = "list-group-item";
        listElement.style.userSelect = 'none';
        listElement.innerHTML = route;
        listElement.onclick = (event) => showRoutes(event);
        listElement.style.cursor = 'grab';
        routeList.appendChild(listElement);
    });

    // Don't move the map on the user if they have moved it themselves
    if (!wasCenterSet) {
        map.setCenter(data.center);
        wasCenterSet = true;
    }
};

/**
 * Sets the state of the poller to the provided boolean. Also sets the state of the text in the page button
 * @param {Boolean} flag The desired state of the poller (true = on, false = off)
 */
const setIsPolling = (flag) => {
    if (flag && !poller.active) {
        poller.start();
    } else if (!flag && poller.active) {
        poller.stop();
    }
    setToggleButtonText(poller.active ? 'Pause live data feed' : 'Start live data feed');
}

/**
 * A function that gets called from the HTML button toggling the state of the poller.
 */
const togglePoller = () => {
    console.log(`toggling poller ${poller.active ? 'off' : 'on'}`)
    if (!poller.active) {
        setIsPolling(true);
        return;
    }
    setIsPolling(false);
}

/**
 * Updates the rate at which data is fetched from the Ottawa data API
 * @param {Object} button The radio button triggering the polling interval switch
 */
const updatePollRate = (button) => {
    const previousInterval = poller.interval;
    switch (button.id) {
        case POLL_OPTIONS[0]:
            poller.interval = 5000;
            break;
        case POLL_OPTIONS[1]:
            poller.interval = 30000;
            break;
        case POLL_OPTIONS[2]:
            poller.interval = 60000;
            break;
        default:
            poller.interval = 30000;
            break;
    }
    POLL_OPTIONS.forEach(option => {
        document.getElementById(option).checked = option === button.id;
    });
    if (poller.interval !== previousInterval)
        poller.restart();
}


/**
 * Make and display a new alert in place of any other alerts
 * @param {String} html Formatted text to be shown in the alert (set as innerHTML)
 * @param {Boolean} error True if this alert is an error, false if it is a regular message
 */
const displayAlert = (html, error) => {
    const existingAlerts = document.getElementsByClassName('alert');
    if (existingAlerts.length) {
        existingAlerts.forEach(alert => document.body.removeChild(alert))
    }
    const alert = document.createElement('div');
    alert.className = 'alert alert-' + (error ? 'danger' : 'success');
    alert.innerHTML = html;
    document.body.appendChild(alert);
    console.log(alert);
};

/**
 * Random logic for colouring markers based on the user's selected route
 * @param {Object} e The event for onclick of one of the LI elements
 */
const showRoutes = (e) => {
    const route = e.target.innerHTML;
    const routeToAsciiSum = [...route].map(c => c.charCodeAt(0)).reduce((a, b) => a + b);
    const markers = [...document.getElementsByClassName('marker')].filter(marker => marker.getAttribute('route') === route.replaceAll('&amp;', '&'));
    markers.forEach(marker => {
        const filter = `sepia(25%) hue-rotate(${(Math.random()*1000 + routeToAsciiSum) * 2322334}deg) saturate(4483%)`;
        marker.style.filter = filter;
        e.target.style.filter = filter;
    });
}