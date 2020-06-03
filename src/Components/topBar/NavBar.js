import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopBar1 from './TopBar1';
import Routes from './../../Routes';


class NavBar extends React.Component {

  onSignIn = () => {
    this.props.onSignIn();
  }

  onToggleHumberger = () => {
    this.props.onToggleHumberger();
  }

  showContentMenus = (Routes) => {
    let result = null;
    if (Routes.length > 0) {
      result = Routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        )
      });
    }
    return result;
  }

  render() {
    return (
      <Router>
        <div>
          <TopBar1 />
          <Switch>
            {this.showContentMenus(Routes)}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplaySignIn: state.isDisplaySignIn,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleHumberger: () => {
      dispatch(action.isDisplayHumberger());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
