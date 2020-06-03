import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import OrderStatus from './OrderStatus';
import './Cart.css';

class OrderSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      sort: 'near',
      filterStatus: '',
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
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  render() {
    const { orders } = this.props;
    const { user, sort, filterStatus } = this.state;
    let listorder = orders.filter(order => {
      return order.idBuyer === user.id
    });
    if (sort) {
      switch (sort) {
        case 'near':
          listorder = listorder.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            } else if (a.date < b.date) {
              return 1;
            } else return 0;
          });
          break;
        case 'far':
          listorder = listorder.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else if (a.date < b.date) {
              return -1;
            } else return 0;
          });
          break;
        case 'cheap':
          listorder = listorder.sort((a, b) => {
            if (a.totalPrice > b.totalPrice) {
              return 1;
            } else if (a.totalPrice < b.totalPrice) {
              return -1;
            } else return 0;
          });
          break;
        case 'expensive':
          listorder = listorder.sort((a, b) => {
            if (a.totalPrice > b.totalPrice) {
              return -1;
            } else if (a.totalPrice < b.totalrice) {
              return 1;
            } else return 0;
          });
          break;
        default: return;
      };
    }
    if (filterStatus) {
      listorder = listorder.filter(order => {
        return order.status === filterStatus;
      })
    }
    let orderList = listorder.map((order, index) => {
      return (
        <OrderStatus key={index} order={order} />
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
              <th scope="col">products</th>
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
                  name='sort'
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value=''>default</option>
                  <option value='near'>near</option>
                  <option value='far'>far</option>
                </select>
              </th>
              <th scope="col">
                <input
                  className='form-control'
                  placeholder='Search'
                />
              </th>
              <th scope="col">
                <select
                  className='form-control'
                  name="sort"
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value=''>none</option>
                  <option value='cheap'>cheap</option>
                  <option value='expensive'>expensive</option>
                </select>
              </th>
              <th scope="col">
                <select
                  className='form-control'
                  value={this.state.filterStatus}
                  onChange={this.onChange}
                  name='filterStatus'
                >
                  <option value=''>default</option>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderSeller);