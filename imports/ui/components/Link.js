import React from "react";
import FilterLinks from "./FilterLinks";

import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
export default () => (
  <div>
    <PrivateHeader title="Short Lnk" />
    <div className="page-content">
      <FilterLinks />
      <AddLink />
      <LinksList />
    </div>
  </div>
);
