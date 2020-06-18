import React from 'react';
import Product from '../Product/Product';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import './style.css';
class ListProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterType: '',
      sort: '',
      keyW: '',
    }
  }
  componentDidMount() {
    this.props.fetchProductsRequest();
    this.props.fetchUsersRequest();
  }
  onChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onClickType = (type) => {
    this.setState({
      filterType: type
    });
    const list = document.getElementsByClassName('type-bar');
    [...list].forEach(item => {
      item.classList.remove('bg-cam-active');
      if (item.textContent === type) {
        item.classList.add('bg-cam-active');
      }
    })
  }

  render() {
    const { filterType, sort, keyW } = this.state;
    let { products, users, types } = this.props;
    products = products.filter((elm) => {
      return elm.status === '1'
    });
    if (filterType) {
      products = products.filter(p => {
        return p.slug === filterType;
      })
    }
    if (keyW) {
      products = products.filter(p => {
        return p.name.toLowerCase().indexOf(keyW.toLowerCase()) !== -1;
      });
    }
    if (sort) {
      if (sort === "cheap") {
        products = products.sort((a, b) => {
          if (a.price > b.price) return 1;
          else if (a.price < b.price) return -1;
          else return 0;
        });
      }
      else if (sort === "expensive") {
        products = products.sort((a, b) => {
          if (a.price > b.price) return -1;
          else if (a.price < b.price) return 1;
          else return 0;
        })
      }
      else if (sort === "recent") {
        products = products.sort((a, b) => {
          if (a.date > b.date) return -1;
          else if (a.date < b.date) return 1;
          else return 0;
        });
      }
      else if (sort === "far") {
        products = products.sort((a, b) => {
          if (a.date > b.date) return 1;
          else if (a.date < b.date) return -1;
          else return 0;
        });
      }
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
          className="col pdt-16 type-bar rounded text-center"
          type="button"
          key={index}
          name="filterType"
          value={type.name}
          onClick={() => { this.onClickType(type.name) }}
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
                className="col pdt-16 bg-cam-active rounded type-bar text-center"
                type="button"
                name="filterType"
                value=''
                onClick={() => { this.onClickType('') }}
              >
                <p>
                  all
                </p>
              </div>
              {listTypes}
            </div>
            <div className="breadcrumb__option pdt-16 row container">
              <div className="col-md-6">
                <select
                  className="form-control form-control-sm"
                  name='sort'
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value=''>default</option>
                  <option value='cheap'>cheap</option>
                  <option value='expensive'>expensive</option>
                  <option value='recent'>recent</option>
                  <option value='far'>farthest</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  className="form-control form-control-sm"
                  value={this.state.keyW}
                  onChange={this.onChange}
                  name='keyW'
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="breadcrumb__text">

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