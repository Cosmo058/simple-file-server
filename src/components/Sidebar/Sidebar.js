import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="col-3">
        <h5>Server info</h5>
        <p>Space used: 34.4MB</p>
        <p>Space left: 2.04TB</p>
      </div>
    );
  }
}
