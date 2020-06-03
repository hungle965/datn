import React from 'react';

class Type extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <tr>
        <th>
          {type.id}
        </th>
        <td>
          {type.name}
        </td>
        <td>
          <span type="button" className="badge badge-warning">edit</span>
        </td>
        <td>
          <span type="button" className="badge badge-danger">remove</span>
        </td>
      </tr>
    )
  }
}
export default Type;