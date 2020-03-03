import React, { Component } from "react";
import B2 from "backblaze-b2";
import "./styles.css";

const b2 = new B2({
  applicationKeyId: process.env.REACT_APP_KEY_ID,
  applicationKey: process.env.REACT_APP_APPLICATION_KEY,
  axios:{
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  }
});

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
    b2.authorize().then(()=>{
      b2.getBucket({
        bucketName: 'CosmoStorage'
      }).then(buckets=>{
        b2.getUploadUrl({
          bucketId: buckets.data.buckets[0].bucketId
        }).then(uploadUrl =>{
          b2.uploadFile({
            uploadUrl: uploadUrl.data.uploadUrl,
            uploadAuthToken: uploadUrl.data.authorizationToken,
            fileName: this.state.fileLabel,
            data: this.state.seletctedFile.arrayBuffer,
            contentLength: this.state.seletctedFile.size,
          }).then(()=>{
            console.log("File uploaded!");
          }).catch(err=>{
            console.error("uploadFile(): "+err);
          });
        }).catch(err=>{
          console.error("getUploadUrl(): "+err);
        });
      }).catch(err=>{
        console.error("getBucket(): "+err);
      });
    }).catch(err=>{
      console.error("authorize(): "+err);
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
        <button className="btn btn-success submit" onClick={this.onSubmitHandler}>Submit</button>
      </div>
    );
  }
}
