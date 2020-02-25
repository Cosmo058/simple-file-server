import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seletctedFile: null,
      fileLabel: "Choose a file"
    };
  }

  onChangeHandler = event => {
    this.setState({
      seletctedFile: event.target.files[0],
      loaded: 0,
      fileLabel: event.target.files[0].name
    });
  };

  onSubmitHandler = () => {
    const data = new FormData();
    data.append("file", this.state.seletctedFiles);
    axios.post("http://angelsv.com:9000/upload", { data }).then(res => {
      console.log(res.statusText);
    });
  };

  render() {
    return (
      <div className="col">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputLabel">
              File
            </span>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="file"
              onChange={this.onChangeHandler}
            />
            <label className="custom-file-label" htmlFor="file">
              {this.state.fileLabel}
            </label>
          </div>
        </div>
        <button className="btn btn-success submit">Submit</button>
      </div>
    );
  }
}
