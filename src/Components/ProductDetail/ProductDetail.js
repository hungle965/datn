import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import { withRouter, Link } from "react-router-dom";
import './detail.css'

const ensureArray = s => Array.isArray(s) ? s : []

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  AddCart = () => {
    const { product } = this.props;
    this.props.AddCart(product);
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  findUserById = (id) => {
    let userP = '';
    this.props.listUser.forEach(user => {
      if (user.id === id) {
        userP = user;
      }
    });
    return userP;
  }

  componentDidMount() {
    this.onScroll();
  }

  findProductById = (id) => {
    const { products } = this.props;
    let product = '';
    products.forEach(item => {
      if (item.id === id) product = item;
    });
    return product;
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.comment) {
      alert("content comment is nothing")
    } else {
      const idUser = JSON.parse(sessionStorage.getItem('account')).id;
      const p = this.findProductById(this.props.match.params.id);
      const newCmt = { id: idUser, content: this.state.comment }
      p.comment = [...ensureArray(p.comment), newCmt]
      this.props.onCmt(p);
      this.setState({
        comment: '',
      })
      this.onScroll();
    }
  }

  render() {
    const idProduct = this.props.match.params.id;
    const product = this.findProductById(idProduct);
    const user = this.findUserById(product.accountID);
    const account = JSON.parse(sessionStorage.getItem('account'));
    const ratingValue = +(product.rating ? (product.rating.reduce((p, c) => p + c, 0) / product.rating.length).toFixed(2) : 0)
    const listCmt = product.comment ? product.comment.map((cmt, index) => {
      return (
        <div
          className="row rounded about__text"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          key={index}
        >
          <div className="col-md-4 row">
            <div className="col-4 rounded-circle"> <img className="avatar" alt="avatar" src={this.findUserById(cmt.id).picture} /></div>
            <div className="col-8 d-flex align-items-center">{this.findUserById(cmt.id).name}</div>
          </div>
          <div className="col-md-8 d-flex align-items-center">
            <div>{cmt.content}</div>
          </div>
        </div>
      )
    }) : <div>No comments yet</div>;
    return (
      <div>
        <section className="about spad">
          <div className="container">
            <div className="about__text">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb__text">
                    <h2>{user.name}'s store</h2>
                    <div>
                      <span>Category: {product.slug}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-lg-6"
                  data-aos="fade-right"
                >
                  <div className="detail-img d-flex justify-content-center">
                    <img src={product.urlPhoto} alt="" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about__right__text">
                    <h2>{product.name}</h2>
                    <div className="bg-light desc pd rounded ">
                      {product.desc}
                    </div>
                    <div className="d-flex justify-content-around pd">
                      <i className="fa fa-facebook fa-2x"></i>
                      <i className="fa fa-twitter fa-2x"></i>
                      <i className="fa fa-youtube-play fa-2x"></i>
                      <i className="fa fa-instagram fa-2x"></i>
                    </div>
                  </div>
                  <br></br>
                  <div className='btn btn-danger' onClick={this.AddCart}>Add to cart</div>
                </div>
              </div>
              Customer reviews
              <div
                className="row about__text "
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="col-md-4 border-right">
                  <div className="text-center">
                    <h3>Customer rating</h3>
                  </div>
                  <h1 className="text-center text-danger">
                    {ratingValue}/5
                    </h1>
                  <div className="d-flex justify-content-center">
                    {
                      [...Array(Math.floor(ratingValue)).keys()].map(i => <i key={i} className="fas fa-star fa-2x"></i>)
                    }
                    {
                      [...Array(Math.ceil(5 - ratingValue)).keys()].map(i => <i key={i} className="far fa-star fa-2x"></i>)
                    }
                  </div>
                  <div className="text-center">
                    <p>{product.rating ? product.rating.length : 0} ratings</p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div >
                    {account ?
                      <form onSubmit={this.onSubmit}>
                        <img alt='avatar' src={account.picture} className="rounded-circle avatar" /> &nbsp;
                            <p className="primary-btn rounded " >
                          <Link to='/editinfo'>{account.name}</Link>
                        </p>
                        <div className="form-group">
                          <label>Comment</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            onChange={this.onChange}
                            name="comment"
                            value={this.state.comment}
                          />
                        </div>
                        <button
                          className="btn-sm btn-primary"
                          type='submit'
                        >
                          submit
                          </button>
                      </form>
                      :
                      <p
                        className="bg-light text-primary"
                        type="button"
                        onClick={this.onScroll}>Click here to login to comment on this product
								        </p>
                    }
                  </div>
                </div>
              </div>
              Comments
              {listCmt}
            </div>
          </div>
        </section>
      </div>
    )
  };
}
const mapStateToProps = state => {
  return {
    listUser: state.ListUser,
    products: state.ListProduct
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    AddCart: (product) => {
      dispatch(action.cart(product));
    },
    onCmt: (product) => {
      dispatch(action.actUpdateProductRequest(product))
    }
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhance(ProductDetail);