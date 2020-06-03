import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

class Item extends React.Component {

  onEdit = () => {
    sessionStorage.setItem('editProduct', JSON.stringify(this.props.product));
  }

  onRemove = () => {
    this.props.onRemove(this.props.product.id);
  }

  render() {
    const { product } = this.props;
    const dt = new Date(product.date);
    return (
      <tr>
        <th scope="row">{product.id}</th>
        <td className='text-center'>{dt.getDate()}/{dt.getMonth() + 1}/{dt.getFullYear()}</td>
        <td><img alt='piture' className="img-product" src={product.urlPhoto} /></td>
        <td >{product.name}</td>
        <td className='text-center'>{Number(product.price).toLocaleString()}</td>
        <td className='text-center'>{product.slug}</td>
        <td className='text-center'>
          <span className={product.status?'badge badge-pill badge-success':'badge badge-pill badge-warning'}>
            {product.status === true ? 'approved' : 'not approved'}
          </span>
        </td>
        <td>
          <Link to='/editproduct'>
            <i className="fas fa-edit" onClick={this.onEdit}></i>
          </Link>
          &nbsp;
            <i type="button" className="fas fa-trash" onClick={this.onRemove}></i>
        </td>
      </tr>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onRemove: (id) => {
      dispatch(action.actDeleteProductRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
