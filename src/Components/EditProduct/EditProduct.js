import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: 'name of product',
      price: 99000,
      slug: 'electronic',
      desc: `decsription of your product`,
      urlPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQE1iDI1fNEj6lp118ibSXiJDioneC8wbJryXhM5xPWoH9Hl2vc&usqp=CAU',
      status: false,
      isRedirect: false,
      date: '',
    }
  }

  componentWillMount() {
    const editProduct = JSON.parse(sessionStorage.getItem('editProduct'));
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

  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const product = this.state;
    this.props.onEditProduct(product);
    this.setState({
      isRedirect: true
    })
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  render() {
    const sessionAccount = JSON.parse(sessionStorage.getItem('account'));
    const account = sessionAccount ? sessionAccount : { name: 'store' };
    const { isRedirect } = this.state;
    const succesfulAlert = (
      <Link to='/listItem'>
        <div className="alert alert-success" role="alert">
          Editing succesful click here to redirect to list product
                    </div>
      </Link>);
    const { types } = this.props;
    const listTypes = types.map((elm, index) => {
      return (
        <option key={index} value={elm.name}>{elm.name}</option>
      )
    })
    let dt = new Date();
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <h2 className='text-center'>preview</h2>
            <div className="row border align-items-center">
              <div className="col-lg-6 col-md-6">
                <img alt='' src={this.state.urlPhoto} />
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="categories__post__item__text">
                  <span className="post__label">{this.state.slug}</span>
                  <h3>{this.state.name}</h3>
                  <ul className="post__widget">
                    <li>Price: <span> {this.state.price.toLocaleString()} </span> vnđ</li>
                    <li>{dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear()}</li>
                    <li>{account.name}</li>
                    <li>0 Comment</li>
                  </ul>
                  <button className='btn btn-sm btn-danger' onClick={this.onDetail}>Detail</button> &nbsp;
                  <button className="btn btn-sm btn-warning" onClick={this.onHandleAddCart}>Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            {isRedirect ? succesfulAlert : ''}
            <h2 className='text-center'>Edit your product</h2>
            <form onSubmit={this.onSubmit} className='container'>
              <div className="form-group">
                <label >Product type:</label>
                <select
                  className="form-control"
                  value={this.state.slug}
                  onChange={this.onChange}
                  name='slug'>
                  {listTypes}
                </select>
              </div>
              <div className="form-group">
                <label >Name of product:</label>
                <input
                  type="text"
                  className="form-control"
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange} />
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
                  className="btn btn-warning"
                  onClick={this.onScroll}><i className="fas fa-save"></i> save</button>
                <Link to='/listitem'>
                  <button
                    className='btn btn-danger'
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
    types: state.ProductTypes
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onEditProduct: product => {
      dispatch(action.actUpdateProductRequest(product));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);