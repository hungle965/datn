import React from 'react';
import ItemOrderSeller from './ItemOrderSeller';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

const checkRating = (product, valueRating) => {
  if(product.rating){ //đã có sẵn arrRating
    product.rating = [...product.rating,valueRating];
    return product;
  }else{ // chưa có arrRating
    const arrRating = [valueRating];
    return {...product,arrRating};
  }
 }
const checkRated = (product, idUser) => {
  let result = false;
  if(product.userRated){
   product.userRated.forEach(p => {
     if(p===idUser) result = true
   })
  }
  return result;
}
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
      },
      isDisplayStar: false,
      currentProductRating: '',
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

  findProductById = (id) => {
    const { products } = this.props;
    let currentProduct = '';
    products.forEach(product => {
      if (product.id === id) currentProduct = product;
    });
    return currentProduct;
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

  onRating = (valueRating) => {
    const id = JSON.parse(sessionStorage.getItem('account')).id;
    const product = this.findProductById(this.state.currentProductRating);
    if(checkRated(product,id)){
      alert("You have already rated this product!!");
      this.setState({
        isDisplayStar: false
      })
    }else{
      if(product.userRated){ 
        product.userRated.push(id);
        let newP = checkRating(product,valueRating);
        this.props.onUpdateProduct(newP);
      }else{
        let userRated = [id];
        let newP = {...product,userRated};
        newP = checkRating(newP, valueRating);
        console.log(newP);
        this.props.onUpdateProduct(newP);
        this.onScroll();
        this.setState({
          isDisplayStar: false
        })
      }
    }
  }

  onToggleStarForm = (id) => {
    this.setState({
      isDisplayStar: true,
      currentProductRating: id,
    });
  }

  render() {
    const { OrderDetail } = this.props;
    const { isDisplayStar } = this.state;
    const itemOrder = OrderDetail.products.map((product, index) => {
      return (
        <ItemOrderSeller  onToggleStarForm={this.onToggleStarForm} onRating={this.onRating} key={index} product={product} />
      );
    });
    const seller = this.findUserById(OrderDetail.idSeller);
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
        {
          !isDisplayStar ? '' :
            <div className="alert alert-primary container">
              <h4>Choose your rating for the product: {this.findProductById(this.state.currentProductRating).name}</h4>
              <div className="row d-flex justify-content-center">
                {[...Array(5).keys()].map(i =>
                  <i key={i} type="button" onClick={() => this.onRating(i+1)} className="fas fa-star fa-2x painting"></i>)}
              </div>
            </div>
        }
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
    orderStatus: state.OrderStatus,
    products: state.ListProduct
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateOrder: (order) => {
      dispatch(action.updateOrderRequest(order))
    },
    onUpdateProduct: (product) => {
      dispatch(action.actUpdateProductRequest(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);