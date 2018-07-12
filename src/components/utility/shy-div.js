import React from "react";

const ShyDiv = ({ contents, showIf }) =>
  showIf ? <div> {contents} </div> : null;

export default ShyDiv;
