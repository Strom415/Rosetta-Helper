import * as React from 'react';
import Textarea from 'react-textarea-autosize';

const Row = ({ onChange, node, columnNames = ["key", "characters", "description", "repo"] }) => {
  return (
    <tr>
      {columnNames.map(name => 
        <td key={name + node.id} className={name}>
          <Textarea name={name} defaultValue={node[name]} onChange={onChange.bind(this, node.id)}/>
        </td>
      )}
    </tr>
  )
}

export default Row;
