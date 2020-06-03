import React from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import * as action from '../../redux/actions/action';
import './Cart.css';

class ItemCart extends React.Component {
  onInCreasing = () => {
    const id = this.props.product.id;
    this.props.onInCreasing(id);
  }

  onReduction = () => {
    const id = this.props.product.id;
    this.props.onReduction(id);
  }

  onRemove = () => {
    const id = this.props.product.id;
    this.props.onRemove(id);
  }

  findUserByIdProduct = (id) => {
    const { listUser } = this.props;
    let userC = '';
    listUser.forEach(user => {
      if (user.id === id) userC = user;
    });
    return userC;
  }

  render() {
    let product = this.props.product;
    let user = this.findUserByIdProduct(product.accountID);
    return (
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <th> <img src={product.urlPhoto} alt='name of product' className='img-cart' /> </th>
        <td>{product.name}</td>
        <td>{Number(product.price).toLocaleString()}</td>
        <td>
          <button
            className='btn btn-sm'
            onClick={this.onInCreasing}
          ><i className="fas fa-arrow-up"></i>
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={this.onReduction}
            className='btn btn-sm'>
            <i className="fas fa-arrow-down"></i>
          </button>
        </td>
        <td>
          <img alt="avatar" src={user.picture} className='avatar-cart' />&nbsp;
          {user.name}
        </td>
        <td><span
          className='btn-sm btn btn-warning'
          onClick={this.onRemove}>
          <i className="fas fa-trash-alt"></i>
        </span> </td>
        <td>{Number(product.price * product.quantity).toLocaleString()}</td>
      </tr>
    );
  }
}
const mapStateToProps = state => {
  return {
    listItem: state.Cart,
    listUser: state.ListUser
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onInCreasing: (id) => {
      dispatch(action.inCreasing(id))
    },
    onReduction: (id) => {
      dispatch(action.reduction(id))
    },
    onRemove: (id) => {
      dispatch(action.removeItemCart(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCart);