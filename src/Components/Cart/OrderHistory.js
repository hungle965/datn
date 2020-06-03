import React from 'react';
import ItemOrderSeller from './ItemOrderSeller';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

class OrderHistory extends React.Component {
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
    const { OrderDetail } = this.props;
    const itemOrder = OrderDetail.products.map((product, index) => {
      return (
        <ItemOrderSeller key={index} product={product} />
      );
    });
    const seller = this.findUserById(OrderDetail.idSeller);
    console.log(seller);
    return (
      <div>
        <table className=" container table table-hover">
          <thead className="thead-dark">
            <tr>
              <th colSpan="2" className='text-center'>Store</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>
                {seller.name}
              </td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>
                {seller.address}
              </td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>
                {seller.phone}
              </td>
            </tr>
            <tr>
              <td>Status: </td>
              <td>
                <span
                  className={this.statusDisplay(this.state.status)}
                >
                  {this.state.status}
                </span> &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
        <table className='container table table-hover'>
          <thead className="thead-dark">
            <tr>
              <th colSpan="9" className='text-center'>List item</th>
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
              <th></th>
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);