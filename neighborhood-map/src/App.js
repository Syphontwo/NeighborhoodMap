import React, { Component } from 'react';
import './App.css';
// axios is used to handle API calls to foursquare
import axios from 'axios';
import APIkeys from './api-keys.json';
// Make sure this json is present, contains a googleMapsApi property,
// and that the property contains a valid, active, google maps API key

class App extends Component {

  /// react state
  state = {
    venues: []
  }

  /// Run after this component is mounted
  componentDidMount() {
    this.getVenues();
  }

  /// Load the google map API script in a way that is visible to react
  loadMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=' + APIkeys.googleMapsApi + '&callback=initMap');
    window.initMap = this.initMap;
  }

  /// fetch the venue data from the forsquare API using Axios
  /// set that data to the venues state
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: APIkeys.fouresquareClientID,
      client_secret: APIkeys.foursquareClientSecret,
      query: 'food',
      near: 'Sydney',
      v: 20181013
    }

    // API Call, then a callback to load the map using data from the call
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadMap()); // callback to load map after getting venues
      })
      .catch(error => {
        console.log(error);
      })
  }

  ///  load a map in a default position
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    // ensure there is only one infowindow
    const infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(item => {
      const marker = new window.google.maps.Marker({
        position: {lat: item.venue.location.lat, lng: item.venue.location.lng},
        map: map,
        title: item.venue.name
      });

      marker.addListener('click', function(){
        infowindow.setContent(item.venue.name);
        infowindow.open(map, marker);
      });
    })
  }

  toggleMenu(){
    document.getElementById('hamburger').classList.toggle("x");
  }

  /// main render command to build the DOM
  render() {
    return (
      <main>
        <nav>
          <div id="hamburger" onClick={this.toggleMenu}>
            <div id="hamburgerbar1"></div>
            <div id="hamburgerbar2"></div>
            <div id="hamburgerbar3"></div>
          </div>
          <p>Neighborhood Map</p>
        </nav>
        <div id="map"></div>
      </main>
  )}
}

// Thank you Elharony for help with this technique
/// Create a DOM object for the script tag
function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
