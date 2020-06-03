import React from 'react';
import * as action from '../../redux/actions/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import TopBarAdmin from './TopBarAdmin';
import './topbar1.css';

class TopBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    }
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  onSignIn = () => {
    this.props.onSignIn();
  }

  onToggleHumberger = () => {
    this.props.onToggleHumberger();
  }

  onLogOut = () => {
    this.props.onLogOut();
  }

  checkPer = (per) => {
    let isAdmin = false;
    const listPer = per;
    if (per) {
      listPer.forEach(per => {
        if (per === "admin") {
          return isAdmin = true
        }
      })
    }
    return isAdmin;
  }
  render() {
    const { account, cart } = this.props;
    let totalItem = 0;
    cart.forEach(product => {
      totalItem = totalItem + product.quantity
    });
    const per = account.permission;
    const isAdmin = this.checkPer(per);
    return (
      <div className="nav-top-bar">
        {
          isAdmin ? <TopBarAdmin onLogOut={this.onLogOut} account={account} /> :
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="header__btn">
                    {account.name === '' ?
                      <button className="primary-btn "
                        onClick={this.onSignIn}>Sign In
								    </button> :
                      <div>
                        <img alt='avatar' src={account.picture} className="rounded-circle avatar" /> &nbsp;
										     <p className="primary-btn rounded " >
                          <Link to='/editinfo'>{account.name}</Link>&nbsp;&nbsp;|&nbsp; <i title="Log Out" type="button" onClick={this.onLogOut} className="fas fa-sign-out-alt"></i>
                        </p>
                      </div>
                    }
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="header__logo">
                    <div>
                      <img alt='logo' src='https://colorlib.com/preview/theme/foodeiblog/img/logo.png' />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3">
                  <div className="header__social">
                    {
                      account.name === '' ?
                        <Link to='/Carts' > <i className="fas fa-cart-arrow-down" title='Carts' /></Link>
                        :
                        <div className='row'>
                          <div>
                            <Link to='/Carts' >
                              <button className='btn'>
                                <i className="fas fa-cart-arrow-down" title='Carts'> | Cart {totalItem} </i>
                              </button>
                            </Link>
                          </div>
                          <div>
                            <Dropdown>
                              <Dropdown.Toggle variant="" id="dropdown-basic">
                                Buy
                      </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Link to='/carts' >&nbsp;&nbsp;<i className="fas fa-cart-arrow-down" title="Cart items"> Cart </i></Link>
                                <Link to='/orderhistory' >&nbsp;&nbsp;<i className="fas fa-shipping-fast" title="Your list order">  Orders status </i></Link>
                                <Link to='/rating' >&nbsp;&nbsp;<i className="fas fa-star-half" title="rating your order">  Rating </i></Link>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div>
                            <Dropdown>
                              <Dropdown.Toggle variant="" id="dropdown-basic">
                                Sell
                      </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Link to='/postproduct' >&nbsp;&nbsp;<i className="fas fa-upload" title="Post product"> Post product </i></Link>
                                <Link to='/listItem' >&nbsp;&nbsp;<i className="fas fa-list-ol" title="Your list product"> Products </i></Link>
                                <Link to='/listorder' >&nbsp;&nbsp;<i className="fas fa-tasks" title="Your list order"> List order </i></Link>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplaySignIn: state.isDisplaySignIn,
    account: state.account,
    cart: state.Cart
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSignIn: () => {
      dispatch(action.isDisplaySignIn());
    },
    onToggleHumberger: () => {
      dispatch(action.isDisplayHumberger());
    },
    onLogOut: () => {
      dispatch(action.logOut());
    },
    fetchProducts: () => {
      dispatch(action.actFetchProductsRequest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBar2);
