import React from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

const findUserById = (id, users) => {
  let curUser = '';
  users.forEach(user => {
    if (user.id === id) curUser = user;
  });
  return curUser;
}
class InfoRightBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      user: ''
    }
  }
  render() {
    let { users, products } = this.props;
    // const bestProducts = this.props.products.sort((a, b) => {
    //   if (a.orderQuantity > b.orderQuantity) return 1;
    //   else if (a.orderQuantity < b.orderQuantity) return -1;
    //   else return 0;
    // });
    // const newProducts = this.props.products.sort((a, b) => {
    //   if (a.date > b.date) return 1;
    //   else if (a.date < b.date) return -1;
    //   else return 0;
    // });
    // const bestProduct1 = bestProducts[bestProducts.length - 1];
    // const bestProduct2 = bestProducts[bestProducts.length - 2];
    // const user1 = bestProduct1 ? findUserById(bestProduct1.accountID, users) : '';
    // const user2 = bestProduct2 ? findUserById(bestProduct2.accountID, users) : '';
    // const newProduct1 = newProducts[newProducts.length - 1];
    // const newProduct2 = newProducts[newProducts.length - 2];
    // const user3 = newProduct1 ? findUserById(newProduct1.accountID, users) : '';
    // const user4 = newProduct2 ? findUserById(newProduct2.accountID, users) : '';
    let bp = products[0] ? products[0] : '';
    let np = products[0] ? products[0] : '';
    products.forEach(p => {
      if (p.orderQuantity > bp.orderQuantity) {
        bp = p;
      }
      if (p.date > np.date) {
        np = p;
      }
    })
    const userB = bp ? findUserById(bp.accountID, users) : '';
    const userN = np ? findUserById(np.accountID, users) : '';
    return (
      <div className="sidebar__item">
        <div className="sidebar__item__title">
          <h6>Best seller</h6>
          {/* {bestProduct1 ? <Product product={bestProduct1} user={user1} /> : ''}
          {bestProduct2 ? <Product product={bestProduct2} user={user2} /> : ''} */}
          {bp ? <Product product={bp} user={userB} /> : ''}
        </div>
        <div className="sidebar__follow__item">
          <div className="sidebar__item__title">
            <h6>Latest</h6>
            {/* {newProduct1 ? <Product product={newProduct1} user={user3} /> : ''}
            {newProduct2 ? <Product product={newProduct2} user={user4} /> : ''} */}
            {np ? <Product product={np} user={userN} /> : ''}
          </div>
          <div className="sidebar__item__follow__links">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-youtube-play"></i>
            <i className="fa fa-instagram"></i>
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
        <div className="sidebar__item__banner">
          img banner
                    </div>
        <div className="sidebar__item__categories">
          <div className="sidebar__item__title">
            <h6>Categories</h6>
          </div>
        </div>
        <div className="sidebar__subscribe__item">
          <div className="sidebar__item__title">
            <h6>Subscribe</h6>
          </div>
          <p>Subscribe to our newsletter and get our newest updates right on your inbox.</p>

        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    products: state.ListProduct,
    users: state.ListUser
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchProductsRequest: () => {
      dispatch(action.actFetchProductsRequest());
    },
    fetchUsersRequest: () => {
      dispatch(action.actFetchUsersRequest());
    }
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(InfoRightBar);