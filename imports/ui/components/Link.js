import React, { useState } from "react";
import FilterLinks from "./FilterLinks";
import { Redirect } from "react-router-dom";
import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import { Meteor } from "meteor/meteor";
export default () => {
  const [loggedIn, setLoggedIn] = useState(!!Meteor.userId());

  const logout = () => {
    setLoggedIn(false);
  };
  return loggedIn ? (
    <div>
      <PrivateHeader title="Short Lnk" logout={logout} />
      <div className="page-content">
        <FilterLinks />
        <AddLink />
        <LinksList />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};
