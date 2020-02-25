import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import UploadForm from "../UploadForm/UploadForm";

export default class Upload extends Component {
  render() {
    return (
      <div className="row">
        <Sidebar />
        <UploadForm />
      </div>
    );
  }
}
