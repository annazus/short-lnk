import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    console.log(email);
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: "Password must be greater than 9 charcters"
      });
    }
    Accounts.createUser({ email, password }, err => {
      console.log(err);
      if (err) this.setState({ error: err.reason });
      else {
        this.setState({ error: "" });
      }
    });
  };
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup to Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form
            onSubmit={this.onSubmit}
            noValidate
            className="boxed-view__form"
          >
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
            />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}
export default Signup;
