import React from 'react';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';
import { connect } from 'react-redux';
import './style.css';

const RatingWrapper = (ratingValue) => {
  return (
    <div style={{ width: `${ratingValue}%` }}>
      <div className="rating-core rounded-pill text-center">
        <div>{Math.ceil(ratingValue / 20)}/5 <i className="fas fa-star"></i></div>
      </div>
    </div>
  )
}
class Product extends React.Component {
  onDetail = () => {
    const { product } = this.props;
    this.props.onDetail(product);
    this.onScroll();
  }

  onHandleAddCart = () => {
    const { product } = this.props;
    this.props.onAddCart(product);
    this.onScroll();
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }



  render() {
    const { product, user } = this.props;
    const price = Number(product.price).toLocaleString();
    const dt = new Date(product.date);
    const rating = product.rating ? product.rating : [5];
    let sum = 0;
    rating.forEach(elm => {
      sum = sum + elm;
    });
    const RatingWrapperValue = (sum / rating.length) * 20;
    return (
      <div
        className="categories__list__post__item border-top "
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex align-items-center">
            <img alt='' src={product.urlPhoto} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="categories__post__item__text">
              <span className="post__label">{product.slug}</span>
              <h3>{product.name}</h3>
              <ul className="post__widget">
                <li>Price: <span> {price} </span> vnđ</li>
                <li>
                  {dt.getDate()}/{dt.getMonth()}/{dt.getFullYear()}
                </li>
                <li>shop: {user.name}</li>
                <li>20 Comment</li>
                <div className="container">
                  <div className="row bg-light rounded-pill">
                    {RatingWrapper(RatingWrapperValue)}
                  </div>
                </div>
              </ul>
              <Link to={"/detail/" + product.id + "/" + product.name}>
                <button className='btn btn-sm btn-danger' onClick={this.onDetail}>Detail</button>
              </Link>&nbsp;
                <button className="btn btn-sm btn-warning" onClick={this.onHandleAddCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDetail: (product) => {
      dispatch(action.productDetail(product));
    },
    onAddCart: (product) => {
      dispatch(action.cart(product));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);