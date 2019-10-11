import * as React from 'react';
import Row from './Row';

const Table = ({ metadata, onChange }) => {
  return (
    <table>
      <tbody>
        {metadata.map(node => 
          <Row key={node.id} node={node} onChange={onChange}></Row>
        )}
      </tbody>
    </table>
  )
}

export default Table;
