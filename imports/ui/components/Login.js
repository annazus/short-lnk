import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Meteor } from "meteor/meteor";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", loggedIn: false };
  }

  onSubmit = e => {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: "Unable to login - check email and password." });
        // console.log(err);
      } else {
        this.setState({ error: "", loggedIn: true });
      }
    });
  };
  render() {
    return this.state.loggedIn ? (
      <Redirect to="/link" />
    ) : (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form
            className="boxed-view__form"
            onSubmit={this.onSubmit}
            noValidate
          >
            <input type="email" name="email" ref="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              ref="password"
              placeholder="Password"
            />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}
