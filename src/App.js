import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";

class App extends Component {
  updateEvents = (location, eventCount) => {
    if (location === undefined) {
      location = this.state.seletedLocation;
    }
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    }
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
        seletedLocation: location,
      });
    });
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        this.setState({ events, locations: extractLocations(events) });
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      seletedLocation: "all",
      showWelcomeScreen: undefined,
    };
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return (
        <div className="App">
          <h1>Meet App</h1>

          <h4>Choose your nearest city</h4>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <EventList events={this.state.events} />
          <NumberOfEvents
            numberOfEvents={this.state.numberOfEvents}
            updateEvents={this.updateEvents}
          />
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        </div>
      );
  }
}

export default App;
