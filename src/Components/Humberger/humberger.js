import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/action';

class Humberger extends React.Component {
     render() {
          const isDisplay = this.props.isDisplayHumberger;
          return (
               <div>
                    <div className={isDisplay===1?"humberger__menu__overlay active":'humberger__menu__overlay'} onClick={this.props.onToggleHumberger}></div>
                    <div className={isDisplay===1?'humberger__menu__wrapper show__humberger__menu__wrapper':'humberger__menu__wrapper '}>
                         <div className="humberger__menu__logo">
                              <img alt='avatar' src='http://localhost:3000/img/siign-in-logo.png' />
                         </div>
                         <nav className="humberger__menu__nav mobile-menu">
                         </nav>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = state => {
	return {
		isDisplayHumberger: state.isDisplayHumberger,
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
          onToggleHumberger: () => {
               dispatch(action.isDisplayHumberger())
          }
	}
}

export default connect(mapStateToProps,mapDispatchToProps) (Humberger);