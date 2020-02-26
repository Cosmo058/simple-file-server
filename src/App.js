import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" component={Upload} />
            <Route path="/about" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
