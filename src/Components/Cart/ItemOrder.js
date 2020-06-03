import React from 'react';

class ItemOrder extends React.Component {
  constructor(props) {
    super(props);
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }
  render() {
    const { product } = this.props;
    return (
      <tr>
        <th> </th>
        <th scope="row">{product.id}</th>
        <th> <img src={product.urlPhoto} alt='name of product' className='img-cart' /> </th>
        <td>{product.name}</td>
        <td>{Number(product.price).toLocaleString()}</td>
        <td>
          <button
            className='btn btn-sm'
            onClick={this.onInCreasing}
          >
          </button>
          <span>{product.quantity}</span>
        </td>
        <td>  
          <span
            className='btn-sm btn btn-warning'
            onClick={this.onRemove}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </td>
        <td>{Number(product.price * product.quantity).toLocaleString()}</td>
      </tr>
    )
  }
}
export default ItemOrder;