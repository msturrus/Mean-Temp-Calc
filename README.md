# yapmo-weather-app

## Yapmo Average Temperature Calculator

Version: 0.5

Current status: Temperature Calculator and user current location working, data visualizations not yet implemented.  US City Search, Autocomplete, not functional due to database hiccup (the file I found that would serve as my database had invalid json).

This app takes user inputs in the form of a location and a date range, then retrieves hourly temperature data for all days within that range from the forecast.io api.  It then calculates the average daily temperature for that date range based on the data it receives.


**How to Use the Calculator**

Open `public/index.html` in your preferred web browser or host it if you like. It should work in Chrome (without geolocation features, see Project Notes below), Safari, and Firefox


### What's Next?

- Finding/creating a valid json list of cities with geocoordinates for city lookup
- Chart.js line graph of daily temperature data
- Aesthetic changes
- Switching API's to something more conducive to this project, so that the number of api calls is more manageable.


### Project Notes

- Project should work without any cross-origin errors from the index.html file but works best if it's hosted
- Chrome does not allow location access from files or http, location access is https only, disabling this app's location feature in certain contexts with that browser
- Styles are copied from previous projects, and are appended to bootstrap.css due to the way I wrote my gulpfile to handle LESS during those projects.  That is why there are non-bootstrap styles but no styles.css file.


## Special Thanks:

- forecast.io
