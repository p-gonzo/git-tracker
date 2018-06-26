import React, { Component } from 'react';

const Filter = ({by, children}) => {
  return (
  <div>
    {
      children.filter((child) => by(child.props))
    }
  </div>
)}


export default Filter