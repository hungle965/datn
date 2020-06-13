import React from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import './style.css';
class ListProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterType: ''
    }
  }
  componentDidMount() {
    this.props.fetchProductsRequest();
    this.props.fetchUsersRequest();
  }
  render() {
    const { filterType } = this.state;
    let { products, users, types } = this.props;
    products = products.filter((elm) => {
      return elm.status === '1'
    });
    if (filterType) {
      products = products.filter(p => {
        return p.slug === filterType;
      })
    }
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
        <div
          className="col pdt-16"
          type="button"
          key={index}
          name="filterType"
          value={type.name}
          onClick={() => { this.setState({ filterType: type.name }) }}
        >
          <p>
            {type.name}
          </p>
        </div>
      )
    })
    return (
      <div className="categories__post">
        <div className="container">
          <div className="categories__grid__post">
            <div className=" row bg-cam rounded">
              <div
                className="col pdt-16 bg-cam-active rounded"
                type="button"
                name="filterType"
                value=''
                onClick={() => { this.setState({ filterType: '' }) }}
              >
                <p>
                  all
                </p>
              </div>
              {listTypes}
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="breadcrumb__text">
                  <div className="breadcrumb__option pdt-16">
                    <select className="form-control form-control-sm">
                      <option>1</option>
                      <option>1</option>
                      <option>1</option>
                    </select>
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