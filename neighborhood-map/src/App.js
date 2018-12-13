import React, { Component } from 'react';
import './App.css';
// axios is used to handle API calls to foursquare
import axios from 'axios';
import APIkeys from './api-keys.json';
// Make sure this json is present, contains a googleMapsApi property,
// and that the property contains a valid, active, google maps API key

function ListItems (props) {
  return(
  props.venues.map( item =>
  <div class="list_item">
    <h2>{item.venue.name}</h2>
  </div> ))
}

class App extends Component {

  /// react state
  state = {
    venues: [],
    search: ''
  }

  /// Run after this component is mounted
  componentDidMount() {
    this.getVenues();
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
        }, () => {this.loadApp();}); // callback to load app after getting venues
      })
      .catch(error => {
        console.log(error);
      })
  }

  loadApp = () => {
    document.getElementById("loading").style.display = "none";
    console.log(`after loop ${this.state.venues.length}`);
    this.loadMap();
    console.log(`after loadmap ${this.state.venues.length}`);
    this.populateList();
  }

  /// Load the google map API script in a way that is visible to react
  loadMap = () => {
    console.log(`start load map ${this.state.venues.length}`);
    loadScript('https://maps.googleapis.com/maps/api/js?key=' + APIkeys.googleMapsApi + '&callback=initMap');
    console.log(`after script load ${this.state.venues.length}`);
    window.initMap = this.initMap;
  }

  ///  load a map in a default position
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    console.log(`before placing markers ${this.state.venues.length}`);
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

  ListItems = this.state.venues.map( item =>
    <div class="list_item">
      <h2>{item.venue.name}</h2>
    </div> );

  populateList = () => {
    console.log(`populating list ${this.state.venues.length}`);

    this.ListItems = this.state.venues.map( item =>
      <div class="list_item">
        <h2>{item.venue.name}</h2>
      </div> );

  }

  toggleMenu(){
    document.getElementById('hamburger').classList.toggle("x");
    document.getElementById('map_list').classList.toggle("hidden");
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
        <div id="app">
        <div id="map_list" className="hidden">
          <div id="location_list"><ListItems venues={this.state.venues}/></div>
        </div>
        <div id="map"></div>
        </div>
        <div id="loading">
          <p>Loading Venues</p>
        </div>
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
