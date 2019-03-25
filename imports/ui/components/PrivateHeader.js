import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { PropTypes } from "prop-types";

const PrivateHeader = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <button onClick={() => Meteor.logout()}>Logout</button>
  </div>
);
PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};
export default PrivateHeader;
