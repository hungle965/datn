import React from 'react';
import { connect } from 'react-redux';
import './userDetail.css'
import Item from './Item';
import { Link } from 'react-router-dom';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      toggleInfo: true,
      isLoading: true,
      keyWord: '',
      filterStatus: '',
      sort: 'near',
      filterType: ''
    }
  }

  onToggleInfo = () => {
    this.setState({
      toggleInfo: !this.state.toggleInfo
    })
  }

  componentDidMount() {
    const account = JSON.parse(sessionStorage.getItem('account'));
    if (!account) {
      alert('you need to login');
    } else {
      this.setState({
        account: account
      })
    }
  }

  onChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { keyWord, sort, filterStatus, filterType } = this.state;
    const { listProduct, listType } = this.props;
    let listItem = [];
    listProduct.forEach((product, index) => {
      if (product.accountID === this.state.account.id) {
        listItem.push(product);
      }
    });

    if (keyWord) {
      listItem = listItem.filter(product => {
        return product.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
      })
    };
    if (filterStatus) {
      listItem = listItem.filter(product => {
        return product.status.toString() === filterStatus;
      });
    }
    if (sort) {
      switch (sort) {
        case 'near':
          listItem.sort((a, b) => {
            if (a.date > b.date) return 1;
            else if (a.date < b.data) return -1
            else return 0;
          })
          break;
        case 'far':
          listItem.sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.data) return 1;
            else return 0;
          })
          break;
        case 'cheap':
          listItem.sort((a, b) => {
            if (a.price > b.price) return -1;
            else if (a.price < b.price) return 1;
            else return 0;
          });
          break;
        case 'expensive':
          listItem.sort((a, b) => {
            if (a.price > b.price) return 1;
            else if (a.price < b.price) return -1;
            else return 0;
          });
          break;
        case 'none':
          break;
        default:
          return;
      }
    }
    if(filterType){
      listItem = listItem.filter(elm => {
        return elm.slug === filterType;
      })
    }
    listItem = listItem.map((product, index) => {
      return (
        <Item key={index} product={product} />
      );
    });
    const types = listType.map((elm, index) => {
      return (
        <option key={index} value={elm.name}>{elm.name}</option>
      )
    })
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2 className='text-center'> {this.state.account.name}'s list product </h2>
            <Link to='/postproduct'><span className='btn btn-sm btn-warning'>Post product</span></Link>
            <div>
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Date</th>
                    <th scope="col">image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price (vnd)</th>
                    <th scope="col">type</th>
                    <th scope='col'>status</th>
                    <th scope='col'>action</th>
                  </tr>
                </thead>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      <select
                        className='form-control'
                        onChange={this.onChange}
                        name='sort'
                        value={this.state.sort}
                      >
                        <option value="near">near</option>
                        <option value="far">far</option>
                      </select>
                    </th>
                    <th scope='col'></th>
                    <th scope="col">
                      <input
                        className='form-control'
                        placeholder='Search'
                        name='keyWord'
                        value={this.state.keyWord}
                        onChange={this.onChange}
                      >
                      </input>
                    </th>
                    <th scope="col">
                      <select
                        className='form-control'
                        name='sort'
                        value={this.state.filterPrice}
                        onChange={this.onChange}
                      >
                        <option value='none'>none</option>
                        <option value='cheap'>cheap</option>
                        <option value='expensive'>expensive</option>
                      </select>
                    </th>
                    <th scope="col">
                      <select 
                        className='form-control'
                        onChange={this.onChange}
                        name="filterType"
                        value={this.state.filterType}
                      >
                        <option value=''>default</option>
                        {types}
                      </select>
                    </th>
                    <th scope="col">
                      <select
                        className='form-control text-center'
                        name='filterStatus'
                        value={this.state.filterStatus}
                        onChange={this.onChange}
                      >
                        <option value=''>all</option>
                        <option value={true} >approved</option>
                        <option value={false}> not approved</option>
                      </select>
                    </th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {listItem}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listProduct: state.ListProduct,
    listType: state.ProductTypes
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);