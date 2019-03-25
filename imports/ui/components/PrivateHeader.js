import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { PropTypes } from "prop-types";

const PrivateHeader = ({ title }) => (
  <div className="header">
    <div className="header__content">
      <h1 className="header__title"> {title}</h1>
      <button
        className="button button--secondary--link"
        onClick={() => Meteor.logout()}
      >
        Logout
      </button>
    </div>
  </div>
);
PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};
export default PrivateHeader;
