import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";
export default class PrivateHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "", isOpen: false, error: undefined };
  }
  addLink = e => {
    let url = this.state.url;
    e.preventDefault();
    if (url) {
      Meteor.call("links.insert", url, (err, res) => {
        console.log(err, res);
        if (!err) {
          this.setState({ url: "", isOpen: false, error: undefined });
        } else {
          this.setState({ error: err.reason });
        }
      });
    }
  };
  onChange = e => {
    this.setState({ url: e.target.value });
  };
  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Label"
          onAfterOpen={() => {
            this.refs.url.focus();
          }}
          onRequestClose={() => {
            this.setState({ url: "", isOpen: false, error: undefined });
          }}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          <p>{this.state.error}</p>
          <form
            onSubmit={this.addLink}
            noValidate={true}
            className="boxed-view__form"
          >
            <input
              type="text"
              name="url"
              ref="url"
              placeholder="URL"
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => this.setState({ isOpen: false, error: undefined })}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
