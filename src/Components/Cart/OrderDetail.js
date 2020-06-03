import React from 'react';
import ItemOrder from './ItemOrder';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      address: '',
      date: '',
      idBuyer: '',
      idSeller: '',
      paymentMethods: '',
      phone: '',
      products: [],
      status: '',
      totalPrice: 0,
      moreInfo: {
        name: '',
        address: '',
        phone: ''
      }
    };
  };
  componentDidMount() {
    const { OrderDetail } = this.props;
    this.setState({
      id: OrderDetail.id,
      address: OrderDetail.address,
      idBuyer: OrderDetail.idBuyer,
      idSeller: OrderDetail.idSeller,
      paymentMethods: OrderDetail.paymentMethods,
      phone: OrderDetail.phone,
      products: OrderDetail.products,
      status: OrderDetail.status,
      totalPrice: OrderDetail.totalPrice,
      moreInfo: OrderDetail.moreInfo,
      date: OrderDetail.date
    });
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  };

  findUserById = (id) => {
    const { users } = this.props;
    let currentUser = '';
    users.forEach(user => {
      if (user.id === id) currentUser = user;
    });
    return currentUser;
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  onNextStatus = () => {
    const order = this.state;
    this.props.onUpdateOrder(order);
    this.onScroll();
  }

  render() {
    const { idBuyer } = this.state;
    const { OrderDetail, orderStatus } = this.props;
    const user = this.findUserById(idBuyer);
    const itemOrder = OrderDetail.products.map((product, index) => {
      return (
        <ItemOrder key={index} product={product} />
      );
    });
    const listStatus = orderStatus.map((status, index) => {
      return (
        <option key={index} value={status.name} > {status.name}</option>
      )
    });
    return (
      <div>
        <table className=" container table table-hover">
          <thead className="thead-dark">
            <tr>
              <th colSpan="3" className='text-center'>Customer detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>
                {user.name}
              </td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>
                {user.email}
              </td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>
                {user.address}
              </td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>
                {user.phone}
              </td>
            </tr>
            <tr>
              <td>Payment methods: </td>
              <td>
                {this.state.paymentMethods}
              </td>
            </tr>
          </tbody>
        </table>
        <table className=" container table table-hover">
          <thead className="thead-dark">
            <tr>
              <th colSpan="2" className='text-center'> more infomation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>
                {this.state.moreInfo.name}
              </td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>
                {this.state.moreInfo.address}
              </td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>
                {this.state.moreInfo.phone}
              </td>
            </tr>
            <tr>
              <td>Status: </td>
              <td>
                {this.state.status} &nbsp;
                <select
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  {listStatus}
                </select> &nbsp;
                <i onClick={this.onNextStatus} type='button' className="fas fa-check-circle"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <table className='container table table-hover'>
          <thead className="thead-dark">
            <tr>
              <th colSpan="8" className='text-center'>List item</th>
            </tr>
            <tr className="thead-light">
              <th></th>
              <th>#</th>
              <th>photo</th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th></th>
              <th>totalPrice</th>
            </tr>
          </thead>
          <tbody>
            {itemOrder}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    OrderDetail: state.OrderDetail,
    users: state.ListUser,
    orderStatus: state.OrderStatus
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateOrder: (order) => {
      dispatch(action.updateOrderRequest(order))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);