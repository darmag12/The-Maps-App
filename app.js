let appKey = 'AIzaSyBXlrpB1sbqwFV3Ka2r1dYvgGoyPDLlGC4';
let containerId = document.getElementById('map');
let map;

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMap`;
script.async = true;

// Attached callback function to the `window` object
window.initMap = function () {
    // JS API is loaded and available
    let options = {
        center: {
            lat: 28.6876424,
            lng: -81.4019766
        },
        zoom: 10
    };

    map = new google.maps.Map(containerId, options);
};

// Appended the 'script' element to 'head'
document.head.appendChild(script);

