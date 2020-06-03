import React from 'react';
import * as action from '../../redux/actions/action';
import { connect } from 'react-redux';
import Order from './Order';
import './admin.css'
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'near',
      filterStore: '',
      filterBuyer: '',
      filterStatus: '',
      filterPaymentMethod: '',
    }
  }
  componentDidMount() {
    this.props.fetchOrders();
    this.props.fetchUsers();
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    let { orders, paymentMethods, orderStatus } = this.props;
    const { sort, filterStore, filterBuyer, filterStatus, filterPaymentMethod } = this.state;
    let listOrderItem = orders ? orders : [];
    if (sort) {
      switch (sort) {
        case 'near':
          listOrderItem = listOrderItem.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            } else if (a.date < b.date) {
              return 1;
            } else return 0;
          });
          break;
        case 'far':
          listOrderItem = listOrderItem.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else if (a.date < b.date) {
              return -1;
            } else return 0;
          });
          break;
        case 'cheap':
          listOrderItem = listOrderItem.sort((a, b) => {
            if (a.totalPrice > b.totalPrice) {
              return 1;
            } else if (a.totalPrice < b.totalPrice) {
              return -1;
            } else return 0;
          });
          break;
        case 'expensive':
          listOrderItem = listOrderItem.sort((a, b) => {
            if (a.totalPrice > b.totalPrice) {
              return -1;
            } else if (a.totalPrice < b.totalPrice) {
              return 1;
            } else return 0;
          });
          break;
        default: return;
      }
    }
    if(filterStore){
      listOrderItem = listOrderItem.filter(order => {
        return order.idSeller === filterStore;
      });
    }
    if(filterBuyer){
      listOrderItem = listOrderItem.filter(order => {
        return order.idBuyer === filterBuyer;
      });
    }
    if(filterStatus){
      listOrderItem = listOrderItem.filter(order => {
        return order.status === filterStatus;
      });
    }
    if(filterPaymentMethod){
      listOrderItem = listOrderItem.filter(order => {
        return order.paymentMethods === filterPaymentMethod;
      })
    }
    const listOrder = listOrderItem.map((order, index) => {
      return (
        <Order key={index} order={order} />
      )
    });
    const listPaymentMethod = paymentMethods.map((elm, index) => {
      return <option key={index} value={elm.name}>{elm.name} </option>
    });
    const listOrderStatus = orderStatus.map((elm, index) => {
      return <option key={index} value={elm.name}>{elm.name}</option>
    });
    return (
      <div>
        <h4 className="justify-content-center text-center bg-primary rounded text-light">List order</h4>
        <table className="table table-sm table-hover rounded">
          <thead>
            <tr className="text-primary">
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">IDStore</th>
              <th scope="col">IDBuyer</th>
              <th scope="col">Products</th>
              <th scope="col">Status</th>
              <th scope="col">Total price</th>
              <th scope="col">Methods</th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name='sort'
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value='near'>near</option>
                  <option value='far'>far</option>
                </select>
              </th>
              <th scope="col">
                <input 
                  type="number" 
                  className="form-control-sm input-number"
                  onChange={this.onChange}
                  name="filterStore"
                />
              </th>
              <th scope="col">
                <input 
                  type="number" 
                  className="form-control-sm input-number"
                  onChange={this.onChange}
                  name="filterBuyer"
                />
              </th>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name='filterStatus'
                  onChange={this.onChange}
                >
                  <option value=''>all</option>
                  {listOrderStatus}
                </select>
              </th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  onChange={this.onChange}
                  value={this.state.sort}
                  name='sort'
                >
                  <option value=''>default</option>
                  <option value='cheap'>cheap</option>
                  <option value='expensive'>expensive</option>
                </select>
              </th>
              <th scope="col">
                <select 
                  className="form-control-sm"
                  name="filterPaymentMethod"
                  value={this.state.filterPaymentMethod}
                  onChange={this.onChange}
                >
                  <option value=''> all</option>
                  {listPaymentMethod}
                </select>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listOrder}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.ListProduct,
    orders: state.Orders,
    users: state.ListUser,
    orderStatus: state.OrderStatus,
    paymentMethods: state.PaymentMethods
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders);