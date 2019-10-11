import * as React from 'react';
import questionMark from './images/questionMark.png';

const Footer = ({ close, exportData, infoScreen, saveChanges }) => {
  return (
    <footer>
      <button id="save" onClick={saveChanges}>Save</button>
      <button id="export" onClick={exportData}>Export</button>
      <button id="cancel" onClick={close}>Close</button>
      <img className="infoButton" src={questionMark} alt="more info" onClick={infoScreen}/>
    </footer>
  )
}

export default Footer;
