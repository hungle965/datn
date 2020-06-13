import React from 'react';
import './admin.css';
import * as action from '../../redux/actions/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }
  findUserById = (id) => {
    let userr = '';
    const { users } = this.props;
    users.map((user, index) => {
      if (user.id === id) {
        userr = user;
      }
      return '';
    });
    return userr;
  }
  onDetail = () => {
    this.props.setOrderDetail(this.props.order);
  }
  render() {
    const { order } = this.props;
    const products = order.products;
    const listProduct = products.map((product, index) => {
      return (
        <span key={index}>{product.name + ",..."}</span>
      )
    })
    const dt = new Date(order.date);
    return (
      <tr>
        <th scope="row">{order.id}</th>
        <td>{dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear()}</td>
        <td className="text-center">{order.idSeller}</td>
        <td className="text-center">{order.idBuyer}</td>
        <td>{listProduct}</td>
        <td>{order.status}</td>
        <td>{this.numFormatter.format(order.totalPrice)}</td>
        <td>{order.paymentMethods}</td>
        <td>
          <Link to='/admin/order-detail'>
            <button className="btn btn-sm btn-danger" onClick={this.onDetail} >detail</button>
          </Link>
        </td>
      </tr>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.ListProduct,
    users: state.ListUser
  }
}
const mapDispatchToPops = (dispatch) => {
  return {
    fetchProductsRequest: () => {
      dispatch(action.actFetchProductsRequest());
    },
    fetchUsersRequest: () => {
      dispatch(action.actFetchUsersRequest());
    },
    setOrderDetail: (order) => {
      dispatch(action.setOrderDetail(order));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToPops)(Order);