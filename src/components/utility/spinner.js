import React from 'react';

let spinnerStyles = {
  height: '3em',
  width: '3em'
}

let spinnerContainerStyles = {
  paddingTop: '3em',
  width: '100%',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center', 
  alignItems: 'center'
}

const Spinner = () => (
  <div style={spinnerContainerStyles}>
    <img style={spinnerStyles} src="/public/spinner.gif" />
  </div>
)

export default Spinner