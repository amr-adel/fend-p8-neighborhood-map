# Neighborhood Map (React)

This is my entry for project 8 (*Neighborhood Map*) from Udacity's  [Front-End Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) program.

[![Neighborhood Map (React)](public/demo.jpg "Neighborhood Map (React)")](https://amr-adel.github.io/fend-p8-neighborhood-map/)

---


## Project Specification Criteria

#### Interface Design
- All application components render on-screen in a responsive manner.
- All application components are usable across modern desktop, tablet, and phone browsers.


#### Application Functionality
- Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
- A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
- Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
- List functionality is responsive and runs error free.
- Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
- Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
- Any additional custom functionality provided in the app functions error-free.

#### Asynchronous Data Usage
- Application utilizes the `Google Maps API` or another mapping system and at least one non-Google third-party `API`. Refer to this [documentation](https://developers.google.com/maps/documentation/javascript/tutorial)
- All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.
- Data requests that fail are handled gracefully using common fallback techniques (i.e. `AJAX` error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an `API` doesn’t load there should be some visible indication on the page that it didn’t load. 


#### Documentation
- A `README` file is included detailing all steps required to successfully run the application.
- Comments are present and effectively explain longer code procedures.


#### Location Details Functionality
- Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s `infoWindow`, or in an `HTML` element in the `DOM` (a sidebar, the list view, a modal, etc.)
- Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.
- Application runs without console errors.
- Functionality is presented in a usable and responsive manner.


#### Accessibility
- Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
- Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate `ARIA roles` are defined.
- All content-related images include appropriate alternate text that clearly describes the content of the image. 


#### Offline Use
- When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.



#### Application Architecture
- React code follows a reasonable component structure.
- State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.
- There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.

---


### To see it in action
### Visit live demo
At [Neighborhood Map (React)](https://amr-adel.github.io/fend-p8-neighborhood-map/)

---
#### Clone repository
via `HTTPS` 
```
https://github.com/amr-adel/fend-p8-neighborhood-map.git
```
Or via `SSH` 
```
git@github.com:amr-adel/fend-p8-neighborhood-map.git
```

---

#### Download repository
As a ZIP archive [Neighborhood Map (React)](https://github.com/amr-adel/fend-p8-neighborhood-map/archive/master.zip)

1- install all project dependencies with `npm install`
2- start the development server with `npm run start`


---


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
