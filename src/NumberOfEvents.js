import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    let inputValue = event.target.value;
    if (inputValue >= 33 || inputValue <= 0) {
      this.setState({
        renderNumber: event.target.value,
        infoText: "Select number from 1 to 32",
      });
    } else {
      this.setState({
        renderNumber: event.target.value,
        infoText: "",
      });
    }
    this.props.updateEvents(undefined, inputValue);
  };

  constructor() {
    super();
    this.state = {
      renderNumber: 32,
      infoText: "",
    };
  }

  render() {
    const { renderNumber } = this.state;

    return (
      <div className="number-of-events">
        <p className="input-label">Number of Events:</p>
        <input
          id="render-number"
          type="number"
          className="render-number"
          value={renderNumber}
          onChange={this.handleInputChanged}
        ></input>
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default NumberOfEvents;
