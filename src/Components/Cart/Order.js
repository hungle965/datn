import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import OrderInfo from './OrderInfo';
import './Cart.css';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      sort: '',
    }
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }

  componentDidMount() {
    this.props.fetchOrders();
    this.props.fetchUsers();
    const user = JSON.parse(sessionStorage.getItem('account'));
    this.setState({
      user: user
    });
  }

  onChange = (e) => {
    const t = e.target;
    const name = t.name;
    const value = t.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { orders } = this.props;
    const { user, sort } = this.state;
    let listorder = orders.filter(order => {
      return order.idSeller === user.id
    });

    if (sort) {
      switch (sort) {
        case 'near':
          listorder = listorder.sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            else return 0;
          });
          break;
        case 'far':
          listorder = listorder.sort((a, b) => {
            if (a.date > b.date) return 1;
            else if (a.date < b.date) return -1;
            else return 0;
          });
          break;
        default: return;
      }
    }

    const orderList = listorder.map((order, index) => {
      return (
        <OrderInfo key={index} order={order} />
      )
    });
    const listOrderStatus = this.props.orderStatus.map((stt, index) => {
      return <option key={index} value={stt.name}>{stt.name}</option>
    })
    return (
      <div className='container'>
        <h2 className="text-center">list order</h2>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">date</th>
              <th scope="col">customer</th>
              <th scope="col">payment</th>
              <th scope="col">phone</th>
              <th scope="col">address</th>
              <th scope="col">price</th>
              <th scope="col">status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className='form-control'
                  onChange={this.onChange}
                  name='sort'
                  value={this.state.value}
                >
                  <option value=''>default</option>
                  <option value='near'>nearest</option>
                  <option value='far'>furthest</option>
                </select>
              </th>
              <th scope="col">
                <input
                  className='form-control'
                  placeholder='Search'
                />
              </th>
              <th scope="col">
                <select className='form-control'>
                  <option>all</option>
                  <option>direct</option>
                  <option>banking</option>
                  <option>on delivery</option>
                </select>
              </th>
              <th scope="col">
                <input
                  className='form-control'
                  placeholder='phone number'
                />
              </th>
              <th scope="col"></th>
              <th scope="col">
                <select className='form-control'>
                  <option value='none'>none</option>
                  <option value='ascending'>ascending</option>
                  <option value='decrease'>decrease</option>
                </select>
              </th>
              <th scope="col">
                <select className='form-control'>
                  <option>default</option>
                  {listOrderStatus}
                </select>
              </th>
              <th scope="col"></th>
            </tr>
            {orderList}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.Orders,
    users: state.ListUser,
    orderStatus: state.OrderStatus
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchOrders: () => {
      dispatch(action.fetchOrderRequest());
    },
    fetchUsers: () => {
      dispatch(action.actFetchUsersRequest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);