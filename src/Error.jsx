import * as React from 'react';

const Error = ({ close }) => {
  return (
    <div className="infoScreen">
      <h1>No text selected</h1>
      <div className="pluginDetails">
        <ol>
          <li>Select a text node or a layer containing a text node</li>
          <li>Run plugin to see metadata</li>
        </ol>
      </div>
      <button onClick={close}>OK</button>
    </div>
  )
}

export default Error;
