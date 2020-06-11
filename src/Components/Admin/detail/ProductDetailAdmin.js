import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../../redux/actions/action';
import './detail.css';
class ProductDetailAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: 0,
      slug: '',
      desc: ``,
      urlPhoto: '',
      status: '',
      isRedirect: false,
      date: '',
      accountID: '',
    };
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }

  componentWillMount() {
    const editProduct = this.props.detailProduct;
    this.setState({
      id: editProduct.id,
      name: editProduct.name,
      price: editProduct.price,
      slug: editProduct.slug,
      desc: editProduct.desc,
      urlPhoto: editProduct.urlPhoto,
      status: editProduct.status,
      accountID: editProduct.accountID,
      date: editProduct.date
    })
  }
  findUserById = (id) => {
    const { store } = this.props;
    let user = '';
    store.forEach(elm => {
      if (elm.id === id) {
        user = elm;
      }
    });
    return user;
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  }

  onApp = () => {
    this.setState({
      status: '1'
    })
    this.onScroll();  
  }

  onBan = () => {
    this.setState({
      status: '-1'
    })
    this.onScroll();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const product = this.state;
    this.props.onEditProduct(product);
    this.setState({
      isRedirect: true
    });
    this.props.setCurrentPage('products');
  }
  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
    this.props.setCurrentPage('products');
  }

  render() {
    const user = this.findUserById(this.state.accountID);
    const dt = new Date(this.state.date);
    const { isRedirect } = this.state;
    const succesfulAlert = (
      <Link to='/dashboard'>
        <div className="alert alert-success" role="alert">
          Editing succesful click here to redirect to list product
        </div>
      </Link>);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 bg-light">
            <h4 className="text-center bg-primary rounded text-white">{user.name}</h4>
            <ul className="list-group">
              <li className="list-group-item list-group-item-primary d-flex justify-content-center thumbnail">
                <img alt="avatar" className="rounded-circle img-avatar" src={user.picture} />
              </li>
              <li className="list-group-item list-group-item-primary">account: {user.userName}</li>
              <li className="list-group-item list-group-item-primary">email: {user.email}</li>
              <li className="list-group-item list-group-item-primary">phone: {user.phone}</li>
              <li className="list-group-item list-group-item-primary">address: {user.address}</li>
              <li className="list-group-item list-group-item-primary">
                description:
                <p>
                  {user.desc}
                </p>
              </li>
              <li className="list-group-item list-group-item-primary">
                status: &nbsp;
                <span className={user.status ? 'badge badge-success' : 'badge badge-danger'}>{user.status ? 'active' : 'banned'}</span>
              </li>
            </ul>
          </div>
          <div className='col-md-9'>
            <div className="d-flex justify-content-center">
              <img className="img-product-detail" alt={this.state.name} src={this.state.urlPhoto} />
            </div>
            {isRedirect ? succesfulAlert : ''}
            <form onSubmit={this.onSubmit} className='container'>
              <div className="form-group">
                <label >Name of product:</label>
                <input
                  type="text"
                  className="form-control"
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label >Product type:</label>
                <select
                  className="form-control"
                  value={this.state.slug}
                  onChange={this.onChange}
                  name='slug'>
                  <option value='electronic'>Electronic</option>
                  <option value='pets'>Pets</option>
                  <option value='home'>Home</option>
                  <option value='fashion'>Fashion - clother</option>
                  <option value='other'>other...</option>
                </select>
              </div>
              <div className="form-group ">
                <label >Prince:</label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="vnd"
                    name='price'
                    value={this.state.price}
                    onChange={this.onChange} />
                </div>
              </div>
              <div className="form-group ">
                <label >Date:</label>
                <div>
                  {dt.getDate()}/{dt.getMonth() + 1}/{dt.getFullYear()}
                </div>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Upload</span>
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" />
                  <label className="custom-file-label" > Photo</label>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="src"
                  name='urlPhoto'
                  value={this.state.urlPhoto}
                  onChange={this.onChange} />
                <small className="form-text text-muted">
                  or address image
                </small>
              </div>
              <div className='form-group'>
                <span 
                  className={this.state.status === '1' ? 'badge badge-pill badge-success' :
                  this.state.status ==='-1'?
                  'badge badge-pill badge-danger':'badge badge-pill badge-warning'}

                >
                  {
                    this.state.status==='1' ? 'approved' :
                    this.state.status==='-1' ? 'banned':'posted'
                  }
                </span>
              </div>
              <div className="form-group">
                <label >Description: </label>
                <textarea
                  className="form-control"
                  rows="3"
                  name='desc'
                  value={this.state.desc}
                  onChange={this.onChange}></textarea>
                <small className="form-text text-muted">
                  Detailed description of your product
                </small>
              </div>
              <div className='d-flex justify-content-around'>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onScroll}><i className="fas fa-save"></i> save</button>
                <button
                  type="submit"
                  className='btn btn-danger'
                  onClick={this.onBan}
                >
                  Ban
                </button>
                <button 
                  type="submit"
                  className="btn btn-success"
                  onClick={this.onApp}
                >
                  Approved
                </button>
                <Link to='/dashboard'>
                  <button
                    className='btn btn-warning'
                    onClick={this.onScroll}
                  > Cancel </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detailProduct: state.ProductDetailAdmin,
    store: state.ListUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onEditProduct: product => {
      dispatch(action.actUpdateProductRequest(product));
    },
    setCurrentPage: value => {
      dispatch(action.setCurrentPage(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailAdmin);