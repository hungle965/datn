import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }

  findUserById = (id) => {
    const { users } = this.props;
    let seller = '';
    users.map(user => {
      if (user.id === id) seller = user;
      return -1;
    });
    return seller;
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
    let dt = new Date(order.date);
    let listproduct = order.products;
    return (
      <tr 
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500">
        <td >{order.id}</td>
        <td >{dt.getDate()}/{dt.getMonth() + 1}/{dt.getFullYear()}</td>
        <td >{listproduct[0].name}{listproduct[1] ? ', ' + listproduct[1].name : ''}{listproduct[2] ? ', ...' : ''}</td>
        <td >{this.numFormatter.format(order.totalPrice)}</td>
        <td >
          <span
            className={this.statusDisplay(order.status)}
          >
            {order.status}
          </span>
        </td>
        <td colSpan='6' className='text-right'>
          <Link to='/orderhistorydetail'>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);