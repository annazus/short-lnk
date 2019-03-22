import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { error: "" };
  }

  onSubmit = e => {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: "err.message " });
        // console.log(err);
      }
    });
  };
  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>
        {this.state.error ? <p>this.state.error</p> : undefined}
        <form onSubmit={this.onSubmit}>
          <input type="email" name="email" ref="email" placeholder="Email" />
          <input
            type="password"
            name="password"
            ref="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>
        <Link to="/signup">Need an account?</Link>
      </div>
    );
  }
}
