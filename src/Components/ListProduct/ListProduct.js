import React from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';

class ListProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'default'
    }
  }
  componentDidMount() {
    this.props.fetchProductsRequest();
    this.props.fetchUsersRequest();
  }

  render() {
    let { products, users, types } = this.props;
    products = products.filter((elm) => {
      return elm.status === '1'
    })
    const product = products.map((product, index) => {
      let userP = '';
      users.forEach(user => {
        if (user.id === product.accountID) {
          userP = user;
        }
      });
      return (
        <Product key={index} index={index} product={product} user={userP} />
      );
    });
    const listTypes = types.map((type, index) => {
      return (
        <span type="button" key={index}>{type.name + ", "}</span>
      )
    })
    return (
      <div className="categories__post">
        <div className="container">
          <div className="categories__grid__post">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="breadcrumb__text">
                  <h2>Categories: {listTypes}</h2>
                  <div className="breadcrumb__option">
                    <p href="#">Home</p>
                    <span>Recipes</span>
                  </div>
                </div>
                {product}
                <div className="row">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    products: state.ListProduct,
    users: state.ListUser,
    types: state.ProductTypes
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

export default connect(mapStateToProp, mapDispatchToProps)(ListProduct);