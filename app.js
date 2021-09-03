// Variables
let appKey = 'AIzaSyBXlrpB1sbqwFV3Ka2r1dYvgGoyPDLlGC4';
let containerId = document.getElementById('map');
let map;
let locations;
let marker;
let infoWindow;
let bounds;
const global5 = {lat: 28.6876424, lng: -81.4019766};

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMap`;
script.async = true;

// Attached callback function to the `window` object
window.initMap = function () {
    // JS API is loaded and available
    let options = {
        center: global5,
        zoom: 13,
        mapId: '9ffa16729c1a3c66'
    };

    map = new google.maps.Map(containerId, options);

    locations = [
        {title: 'I-4 Eastbound Rest Area', location: {lat: 28.7018043, lng: -81.402416}},
        {title: 'Polk County Rest Area I-4 Westbound', location:{lat: 28.177376, lng:-81.794276}},
        {title: 'Love\'s Travel Stop', location:{lat: 28.1551445, lng: -81.8186561}}
    ]

    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    // loop through each location and create a new marker for each one
    locations.forEach((location, i) => {
        // marker variables
        let title;
        let position;


        title = location.title
        position = location.location


        // new marker instance
        marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
    });

    // Extends the boundaries of the map for each marker
    bounds.extend(marker.position);

    // Added click event listener on the marker
    marker.addListener('click', function(){
      populateInfoWindow(this, infoWindow)
    });
    map.fitBounds(bounds);
    }); // end of forEach loop

    function populateInfoWindow(marker, infoWind){
        if(infoWind.marker != marker){
            infoWind.marker = marker;
            infoWindow.setContent(`<div>${marker.title}</div>`);
            infoWindow.open(map, marker);
        }
    }

};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

 //NOTES

 // this method takes in 2 arguments: 
        // 1. Where to open the info window
        // 2. Precise place we want the info window to display.
        // infoWindow.open(map, marker);