import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import logo from "./img/logo.png";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { OffLineAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import WelcomeScreen from "./WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// class App extends Component {
//   updateEvents = (location, eventCount) => {
//     if (location === undefined) {
//       location = this.state.seletedLocation;
//     }
//     if (eventCount === undefined) {
//       eventCount = this.state.numberOfEvents;
//     }
//     getEvents().then((events) => {
//       const locationEvents =
//         location === "all"
//           ? events
//           : events.filter((event) => event.location === location);
//       this.setState({
//         events: locationEvents.slice(0, eventCount),
//         numberOfEvents: eventCount,
//         seletedLocation: location,
//       });
//     });
//   };

//   componentDidMount() {
//     this.mounted = true;
//     getEvents().then((events) => {
//       if (this.mounted) {
//         this.setState({ events, locations: extractLocations(events) });
//       }
//     });
//   }

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
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
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents),
      });
    });
  };

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount,
    });
    this.updateEvents(currentLocation, eventCount);
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  // constructor() {
  //   super();
  //   this.state = {
  //     events: [],
  //     locations: [],
  //     numberOfEvents: 32,
  //     selectedLocation: "all",
  //     // showWelcomeScreen: undefined,
  //   };
  // }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <div className="App-logo">
          <img src={logo} alt="meet app logo" />
          <h4>Choose your nearest city</h4>
          <CitySearch updateEvents={this.updateEvents} locations={locations} />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={numberOfEvents}
          />
          <div className="data-vis-wrapper">
            <EventGenre events={events} />
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis
                  // tick={{ fill: "#fff" }}
                  type="category"
                  dataKey="city"
                  name="city"
                />
                <YAxis
                  // tick={{ fill: "#fff" }}
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="rgb(101, 189, 240)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <EventList events={events} />
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
          <div className="OffLineAlert">
            {!navigator.onLine && (
              <OffLineAlert
                text={"You are currently OFFLINE! Data loaded from cache."}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
