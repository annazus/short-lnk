import React from "react";
import FilterLinks from "./FilterLinks";

import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
export default () => (
  <div>
    <PrivateHeader title="Your Links" />
    <FilterLinks />

    <AddLink />

    <LinksList />
  </div>
);
