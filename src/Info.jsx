import * as React from 'react';
import backArrow from './images/backArrow.png';

const Info = ({ infoScreen }) => {
  return (
    <div className="infoScreen">
        <h1>Rosetta Helper</h1>
        <h3>V 1.0.1</h3>
        <div className="pluginDetails">
          <ul>
            <li>Store keys and descriptions directly in Figma</li>
            <li>Keys are auto-generated based on layer names</li>
            <li>Edit keys and descriptions in the table view</li>
            <li>Export data as a .csv</li>
          </ul>
        </div>
        <div className="devInfoContainer">
          <div className="devInfo">Devleoped by Matt Strom</div>
          <div className="devInfo">For feedback and questions reach out to mstrom1@ext.uber.com</div>
          <img className="backButton" src={backArrow} alt="backArrow" onClick={infoScreen}/> 
        </div>
    </div>
  )
}

export default Info;