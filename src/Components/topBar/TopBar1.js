import React from 'react';
import TopBar2 from './TopBar2';
import * as action from '../../redux/actions/action';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import './topbar1.css';
import Humberger from '../Humberger/humberger';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      let active = match ? 'active' : '';
      return (
        <li className={active}>
          <NavLink to={to} >{label}</NavLink>
        </li>
      )
    }}
    />
  )
}

const Menus = [
  {
    name: 'Home',
    to: '/',
    exact: true
  },
  {
    name: 'Contact',
    to: '/contact',
    exact: true
  },
  {
    name: 'Cart',
    to: '/carts',
    exact: false
  },
  {
    name: 'Post product',
    to: '/postproduct',
    exact: true
  }
];


class TopBar1 extends React.Component {
  onToggleHumberger = () => {
    this.props.onToggleHumberger();
  }


  showMenus = (menus) => {
    const ListMenu = menus.map((menu, index) => {
      return (
        <MenuLink
          key={index}
          label={menu.name}
          to={menu.to}
          activeOnlyWhenExact={menu.exact}
        />
      )
    })
    return ListMenu;
  }

  render() {
    return (
      <section>
        <div className="nav-top-bar header__top fixed-top ">
          <Humberger />
          <div className="container rounded-pill">
            <div className="row">
              <div className="col-md-2">
                <div className="header__humberger">
                  <i className="fa fa-bars humberger__open" onClick={this.onToggleHumberger}></i>
                </div>
              </div>
              <div className="col-md-8">
                <nav className="header__menu">
                  <ul>
                    {this.showMenus(Menus)}
                  </ul>
                </nav>
              </div>
              <div className="col-md-2">
                <div className="header__search">
                  <i className="fa fa-search search-switch"></i> &nbsp;
							</div>
              </div>
            </div>
          </div>
        </div>
        <div className="topbar2">
          < TopBar2 />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplaySignIn: state.isDisplaySignIn,
    account: state.account
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBar1);