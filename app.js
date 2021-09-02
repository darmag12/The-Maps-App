let appKey = 'AIzaSyBXlrpB1sbqwFV3Ka2r1dYvgGoyPDLlGC4';
let containerId = document.getElementById('map');

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&callback=initMap`;
script.async = true;

// Attached callback function to the `window` object
window.initMap = function () {
    // JS API is loaded and available
};

