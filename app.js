'use strict';
// Variables
const appKey = 'AIzaSyCBDIBTQI6A550hCzOErcK-ewHGs3OEd2o';
const baseUrl = `https://rethink.agilemile.com/?agile_tp=true&trip_type=1`;
// let str = `&origin_address=${}&origin_lat=${}&origin_lng=${}&dest_address=${}&dest_lat=${}&dest_lng=${}`
// Contains All the DOM elements
const domElements = {
  commuteOrigin: document.getElementById('origin'),
  commuteDestination: document.getElementById('destination'),
  commuteSearch: document.getElementById('commute_search')
};

// Created the script tag & set the appropriate attributes
let script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${appKey}&libraries=places&callback=initMap`;
script.async = true;

// Attached callback function to the `window` object
window.initMap = function() {
  const options = {
    componentRestrictions: { country: ['us'] },
    fields: ['formatted_address', 'geometry', 'name'],
    strictBounds: false
  };
  const originAutocomplete = new google.maps.places.Autocomplete(
    domElements.commuteOrigin,
    options
  );
  const destinationAutocomplete = new google.maps.places.Autocomplete(
    domElements.commuteDestination,
    options
  );

  // EventListeners callbacks
  originAutocomplete.addListener('place_changed', onOriginPlaceChanged);
  destinationAutocomplete.addListener(
    'place_changed',
    onDestinationPlaceChanged
  );
  // domElements.commuteSearch.addEventListener('click', onCommuteSearch);

  // get origin details
  function onOriginPlaceChanged() {
    let originLat,
      originLng,
      originPlace,
      originValue,
      replaceSpace,
      originUrl,
      encodedValue;
    originPlace = originAutocomplete.getPlace();
    originValue = domElements.commuteOrigin.value;
    if (!originPlace.geometry) {
      // user did not select an origin (reset origin field)
      domElements.commuteOrigin.value = '';
      domElements.commuteOrigin.placeholder = 'Enter a valid origin';
    } else {
      originLat = originPlace.geometry.location.lat();
      originLng = originPlace.geometry.location.lng();
      replaceSpace = originValue.replace(/\s/g, '%20');
      encodedValue = replaceSpace.replace(/,/g, '%2C');
      originUrl = `&origin_address=${encodedValue}&origin_lat=${originLat}&origin_lng=${originLng}`;
      return originUrl;
    }
  }

  // get destination details
  function onDestinationPlaceChanged() {
    let destinationLat,
      destinationLng,
      destinationPlace,
      destinationValue,
      replaceSpace,
      destinationUrl,
      commuteUrl,
      encodedValue,
      getOrigin;
    getOrigin = onOriginPlaceChanged;
    destinationPlace = destinationAutocomplete.getPlace();
    destinationValue = domElements.commuteDestination.value;
    if (!destinationPlace.geometry) {
      // user did not select a destination (reset dest field)
      domElements.commuteDestination.value = '';
      domElements.commuteDestination.placeholder = 'Enter a valid destination';
    } else {
      domElements.commuteSearch.classList.remove('isDisabled');
      destinationLat = destinationPlace.geometry.location.lat();
      destinationLng = destinationPlace.geometry.location.lng();
      replaceSpace = destinationValue.replace(/\s/g, '%20');
      encodedValue = replaceSpace.replace(/,/g, '%2C');
      destinationUrl = `&dest_address=${encodedValue}&dest_lat=${destinationLat}&dest_lng=${destinationLng}`;
      // return destinationUrl;
      // concat the base, origin and destination
      commuteUrl = `${baseUrl}${getOrigin()}${destinationUrl}`;
      // set href for search
      domElements.commuteSearch.href = commuteUrl;
    }
  }

  // search commute
  // function onCommuteSearch(e) {
  //   // prevent reload onclick
  //   // e.preventDefault();
  //   let commuteUrl;
  //   let getOrigin = onOriginPlaceChanged;
  //   let getDestinaton = onDestinationPlaceChanged;
  //   if (
  //     !domElements.commuteOrigin.value === '' &&
  //     !domElements.commuteDestination.value === ''
  //   ) {
  //     commuteUrl = `${baseUrl}${getOrigin()}${getDestinaton()}`;
  //     domElements.commuteSearch.href = commuteUrl;
  //     // console.log(getOrigin());
  //     // console.log(getDestinaton());
  //   }
  // }
};
// Appended the 'script' element to 'head'
document.head.appendChild(script);
