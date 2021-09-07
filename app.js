// Variables
let appKey = 'AIzaSyBXlrpB1sbqwFV3Ka2r1dYvgGoyPDLlGC4';

// Contains All the DOM elements
const domElements = {
    mapContainerStr: document.getElementById('map'),
    showListingsStr: document.getElementById('show-listings'),
    hideListingsStr: document.getElementById('hide-listings')
}

let map;
let locations;
let marker;
let infoWindow;
let bounds;
const orlandoCod = {lat: 28.5384, lng: -81.3789};

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.async = true;
script.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMap`;


// Attached callback function to the `window` object
window.initMap = function () {
    let markers = [];

    // JS API is loaded and available
    let options = {
        center: orlandoCod,
        zoom: 13,
        // mapId: '9ffa16729c1a3c66'
    };

    map = new google.maps.Map(domElements.mapContainerStr, options);

    locations = [
        {title: 'I-4 Westbound Rest Area', location: {lat: 28.703015, lng: -81.3869928}},
        {title: 'Polk County Rest Area I-4 Westbound', location:{lat: 28.172558, lng:-81.767027}},
        {title: 'Polk County Rest Area I-4 Eastbound', location:{lat: 28.1676031, lng:-81.7730702}},
        {title: 'Love\'s Travel Stop', location:{lat: 28.1551445, lng: -81.8186561}}
    ]

    infoWindow = new google.maps.InfoWindow();

    // loop through each location and create a new marker for each one
    locations.forEach((location, i) => {
        // marker variables
        let title;
        let position;


        title = location.title
        position = location.location


        // new marker instance
        marker = new google.maps.Marker({
        position: position,
        label: {
            text: "\ue63d", // always start with \u then the icon code
            fontFamily: "Material Icons",
            color: "#ffffff",
            className: "rest-area-icons",
            fontSize: "18px",
          },
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
    });

    // Push each marker into the markers array
    markers.push(marker);

    // Added click event listener on the marker
    marker.addListener('click', function(){
      populateInfoWindow(this, infoWindow)
    });

    }); // end of forEach loop

    domElements.showListingsStr.addEventListener('click', showListings);
    domElements.hideListingsStr.addEventListener('click', hideListings);

    function populateInfoWindow(marker, infoWind){
        if(infoWind.marker != marker){
            infoWind.marker = marker;
            infoWind.setContent(`<div>${marker.title}</div>`);
            infoWind.open(map, marker);
        }
    }

    function showListings() {
        // created a new instance of the boundary object
        bounds = new google.maps.LatLngBounds();
        // Extends the boundaries of the map for each marker
        markers.forEach(mark => {
            // console.log(mark);
            mark.setMap(map);
            bounds.extend(mark.position);
    
        });
        map.fitBounds(bounds);

    }

    function hideListings() {
        markers.forEach(mark => {
            mark.setMap(null);
        });
    }


};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

 //NOTES

 // this method takes in 2 arguments: 
        // 1. Where to open the info window
        // 2. Precise place we want the info window to display.
        // infoWindow.open(map, marker);