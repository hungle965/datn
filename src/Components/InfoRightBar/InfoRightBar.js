import React from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';


// const getBestProduct = (products) => {
//      let bestProduct = products[0];
//      products.forEach(product => {
//           if (product.orderQuantity > bestProduct.orderQuantity) bestProduct = product;
//      });
//      return bestProduct;
// }
// const findUserById = (id, users) => {
//      let curUser = '';
//      users.forEach(user => {
//           if (user.id === id) curUser = user;
//      });
//      return curUser;
// }
class InfoRightBar extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               product: '',
               user: ''
          }
     }

     render() {
          // const {products,users} = this.props;
          return (
               <div className="sidebar__item">
                    <div className="sidebar__item__title">
                         <h6>lots of orders</h6>
                    </div>
                    <div className="sidebar__about__item">
                       best product
                    </div>
                    <div className="sidebar__follow__item">
                         <div className="sidebar__item__title">
                              <h6>Follow me</h6>
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