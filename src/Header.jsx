import * as React from 'react';

const Header = ({ alphabetize }) => {
  return (
    <table id="tableHeader">
      <tbody>
        <tr>
          <td className="key">Key</td>
          <td className="characters" onClick={alphabetize}>String</td>
          <td className="description">Localization context</td>
          <td className="description">Repo</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Header;
