import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';

class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }

  findUserById = (id) => {
    const { users } = this.props;
    let buyer = '';
    users.map(user => {
      if (user.id === id) buyer = user;
      return -1;
    });
    return buyer;
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }
  onDetail = () => {
    const { order } = this.props;
    this.onScroll();
    this.props.setOrderDetail(order);
  }

  statusDisplay = (status) => {
    switch (status) {
      case 'Canceled':
        return 'badge badge-danger';
      case 'Sent':
        return 'badge badge-primary';
      case 'Received':
        return 'badge badge-success';
      case 'Shipping':
        return 'badge badge-info';
      case 'Successful':
        return 'badge badge-secondary';
      default:
        return 'badge badge-dark';
    }
  }

  render() {
    const { order } = this.props;
    let date = new Date(order.date);
    return (
      <tr>
        <td >{order.id}</td>
        <td >{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</td>
        <td >{this.findUserById(order.idBuyer).name}</td>
        <td >{order.paymentMethods}</td>
        <td >{order.phone}</td>
        <td >{order.address}</td>
        <td >{this.numFormatter.format(order.totalPrice)}</td>
        <td >
          <span
            className={this.statusDisplay(order.status)}
          >
            {order.status}
          </span>
        </td>
        <td colSpan='6' className='text-right'>
          <Link to='/orderdetail'>
            <span
              type='button'
              className='badge badge-dark'
              onClick={this.onDetail}
            >Detail</span>
          </Link>
        </td>
      </tr>
    )
  }
}
const mapStateToProps = state => {
  return {
    orders: state.Orders,
    users: state.ListUser
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchOrders: () => {
      dispatch(action.fetchOrderRequest());
    },
    fetchUsers: () => {
      dispatch(action.actFetchUsersRequest());
    },
    setOrderDetail: (order) => {
      dispatch(action.setOrderDetail(order));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);