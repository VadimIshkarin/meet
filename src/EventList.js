import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="d-flex justify-content-center event-list-wrapper">
        {events.map((event) => (
          <li sm={12} md={6} lg={4} key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
