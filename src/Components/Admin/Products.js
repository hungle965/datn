import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import Product from './Product';
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: '',
      filterType: '',
      sort: 'near',
    }
  }
  componentDidMount() {
    this.props.fetchProductsRequest();
    this.props.fetchUsersRequest();
  }

  onUpdateNewProduct = () => {
    const today = new Date();
    const { products } = this.props;
    let pt = {
      status: '1'
    }
    products.forEach(p => {
      const dateP = new Date(p.date);
      if (p.status === '0' && dateP.getFullYear() === today.getFullYear() && dateP.getMonth() === today.getMonth() && today.getDate() - dateP.getDate() > 1) {
        this.props.updateProductRequest({ ...p, ...pt });
      }
    });
  }

  findUserById = (id) => {
    let userr = false;
    this.props.users.map(user => {
      if (user.id === id) {
        userr = user;
      }
      return -1;
    });
    return userr;
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
    let { products, types } = this.props;
    console.log(products);
    let listType = types.map((type, index) => {
      return (
        <option key={index} value={type.name}> {type.name} </option>
      )
    })
    const { filterName, filterType, filterStatus, sort } = this.state;
    if (filterName) {
      products = products.filter(elm => {
        return elm.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
      })
    }
    if (filterType) {
      products = products.filter(elm => {
        return elm.slug.toLowerCase().indexOf(filterType.toLowerCase()) !== -1;
      })
    }
    if (filterStatus) {
      products = products.filter(elm => {
        return elm.status.toString() === filterStatus;
      })
    }
    if (sort) {
      switch (sort) {
        case 'far':
          products = products.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            } else if (a.date < b.date) {
              return -1;
            } else return 0;
          });
          break;
        case 'near':
          products = products.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            } else if (a.date < b.date) {
              return 1;
            } else return 0;
          });
          break;
        case 'cheap':
          products = products.sort((a, b) => {
            if (Number(a.price) > Number(b.price)) {
              return 1;
            } else if (Number(a.price) < Number(b.price)) {
              return -1;
            } else return 0;
          });
          break;
        case 'expensive':
          products = products.sort((a, b) => {
            if (Number(a.price) > Number(b.price)) {
              return -1;
            } else if (Number(a.price) < Number(b.price)) {
              return 1;
            } else return 0;
          });
          break;
        default:
          return;
      }
    }
    const listProduct = products.map((product, index) => {
      const store = this.findUserById(product.accountID);
      return <Product key={index} product={product} store={store} />
    });
    return (
      <div className="container">
        <h4 className="justify-content-center text-center bg-primary rounded text-light">List product</h4>
        <table className="table table-sm table-hover rounded">
          <thead >
            <tr >
              <th scope="col" className="text-primary">#</th>
              <th scope="col" className="text-primary">time</th>
              <th scope="col" className="text-primary">name</th>
              <th scope="col" className="text-primary">type</th>
              <th scope="col" className="text-primary">store</th>
              <th scope="col" className="text-primary">price</th>
              <th scope="col" className="text-primary">status</th>
              <th scope="col" className="text-primary">
                <button className="btn btn-sm btn-primary">update</button>
              </th>
              <th scope="col" className="text-primary"></th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name="sort"
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value='near'>near</option>
                  <option value='far'>far</option>
                </select>
              </th>
              <th scope="col">
                <input
                  className="form-control-sm"
                  placeholder="search"
                  name="filterName"
                  onChange={this.onChange}
                  value={this.state.filterName} />
              </th>
              <th scope="col">
                <select
                  className='form-control-sm'
                  value={this.state.filterType}
                  name='filterType'
                  onChange={this.onChange}
                >
                  <option value=''>default</option>
                  {listType}
                </select>
              </th>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name="sort"
                  value={this.state.sort}
                  onChange={this.onChange}
                >
                  <option value='cheap'>cheap</option>
                  <option value='expensive'>expensive</option>
                </select>
              </th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name="filterStatus"
                  value={this.state.filterStatus}
                  onChange={this.onChange}
                >
                  <option value=''>default</option>
                  <option value='0'>posted</option>
                  <option value='1'>approved</option>
                  <option value='-1'>not approved</option>
                </select>
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listProduct}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.ListProduct,
    users: state.ListUser,
    types: state.ProductTypes
  }
}
const mapDispatchToPops = (dispatch) => {
  return {
    fetchProductsRequest: () => {
      dispatch(action.actFetchProductsRequest());
    },
    fetchUsersRequest: () => {
      dispatch(action.actFetchUsersRequest());
    },
    updateProductRequest: (product) => {
      dispatch(action.actUpdateProductRequest(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToPops)(Products);