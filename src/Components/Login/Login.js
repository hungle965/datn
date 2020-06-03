import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import FacebookLogin from 'react-facebook-login';
import callApi from '../../Utils/apiCaller';
import './login.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false,
      userName: '',
      passWord: '',
      confirmPassWord: '',
      email: '',
      fullName: '',
      phone: '',
      agree: false,
      listUser: []
    };
  }


  onToggleSignIn = () => {
    this.setState({
      isDisplay: !this.state.isDisplay
    })
  }

  onToggleLoginForm = () => {
    this.props.onToggleLoginForm()
  }

  onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  componentWillMount() {
    callApi('users', 'GET', null).then(res => {
      this.setState({
        listUser: res.data
      });
    })
  }

  onSubmitLogin = (event) => {
    event.preventDefault();
    const { userName, passWord, listUser } = this.state;
    let account = '';
    listUser.forEach(user => {
      if (user.userName === userName && user.passWord === passWord ) {
        account = user;
      }
    });
    if(account === ''){
      alert('You entered the wrong password')
    }else if(account!=='' && account.status === false){
      alert('your account has been banned, contact Foodieblog for more details')
    }
    else if(account.status===true){  //dang nhap ok
      this.props.onAccountAccess(account);
      this.props.onToggleLoginForm();
    }
  }

  componentClicked = () => {
  }

  responseFacebook = (response) => {
    const account = {
      id: response.userID,
      userName: response.name,
      name: response.name,
      passWord: '',
      email: response.email,
      picture: response.picture.data.url,
      address: ''
    };
    this.props.onAccountAccess(account);
    this.onToggleLoginForm();
  }

  onToggleAgree = () => {
    this.setState({
      agree: !this.state.agree
    })
  }

  makeCode = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  onSubmitRegister = (event) => {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      passWord: this.state.passWord,
      confirmPassWord: this.state.confirmPassWord,
      email: this.state.email,
      name: this.state.fullName,
      phone: this.state.phone,
      agree: this.state.agree,
      picture: 'https://freesvg.org/img/publicdomainq-0006224bvmrqd.png',
      address: this.state.address,
      permission: ['user']
    };
    if (user.name === '') {
      alert('error name');
    } else if (user.passWord === '' || user.passWord !== user.confirmPassWord) {
      alert('error password');
    } else if (user.email === '') {
      alert('error mail');
    } else if (user.fullName === '') {
      alert('error full name');
    } else if (user.agree === false) {
      alert('you need to agree to the terms & conditions')
    } else {
      let confirmcode = this.makeCode();
      let cf = prompt(confirmcode, 'enter code to comfirm');
      if (cf === confirmcode) {
        this.props.onAddUser(user);
        this.onToggleSignIn();
      } else {
        alert('confirm code is false!')
      }
    }
  }

  render() {
    const { isDisplay, userName, passWord } = this.state;
    return (
      <div 
        className="signin"
        data-aos="fade-right"
      >
        <div className="signin__content">
          <div className="signin__logo">
            <img src="http://localhost:3000/img/siign-in-logo.png" alt=""/>
          </div>
          <div className="signin__form">
            <ul className="nav nav-tabs" role="tablist" onClick={this.onToggleSignIn}>
              <li className="nav-item">
                <p className={isDisplay === true ? "nav-link active" : 'nav-link'} >
                  Sign in
              </p>
              </li>
              <li className="nav-item">
                <p className={isDisplay === false ? "nav-link active" : 'nav-link'}>
                  Sign up
              </p>
              </li>
              <li className="nav-item"></li>
            </ul>
            <div className="tab-content">
              <div className={isDisplay === false ? ' tab-pane' : ' active tab-pane'} id="tabs-1" role="tabpanel">
                <div className="signin__form__text">
                  <p>Register an account to post your product</p>
                  <form onSubmit={this.onSubmitRegister} >
                    <input
                      name='userName'
                      type="text"
                      placeholder="User Name*"
                      onChange={this.onChange} />
                    <input
                      name='passWord'
                      type="password"
                      placeholder="Password"
                      onChange={this.onChange} />
                    <input
                      name='confirmPassWord'
                      type="password"
                      placeholder="Confirm Password"
                      onChange={this.onChange} />
                    <input
                      name='email'
                      type="text"
                      placeholder="Email Address"
                      onChange={this.onChange} />
                    <input
                      name='phone'
                      type="text"
                      placeholder="Phone number"
                      onChange={this.onChange} />
                    <input
                      name='fullName'
                      type="text"
                      placeholder="Full Name"
                      onChange={this.onChange} />
                    <input
                      name='address'
                      type="text"
                      placeholder="address"
                      onChange={this.onChange} />
                    <label >
                      I agree to the terms & conditions
                       <input
                        type="checkbox"
                        id="sign-agree-check"
                        onClick={this.onToggleAgree}
                        onChange={this.onChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <button type="submit" className="site-btn">Register Now</button>&nbsp;
                    <button className="site-btn btn-danger" onClick={this.onToggleLoginForm}>cancel</button>
                  </form>
                </div>
              </div>
              <div className={isDisplay === false ? ' tab-pane active' : 'tab-pane'} id="tabs-2" role="tabpanel">
                <div className="signin__form__text">
                  <p>with your social network :</p>
                  <div className="rounded">
                    <FacebookLogin
                      appId='237859344122069'
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={this.componentClicked}
                      callback={this.responseFacebook} />
                  </div>
                  <div className="divide">or</div>
                  <form onSubmit={this.onSubmitLogin}>
                    <input type="text"
                      name="userName"
                      value={userName}
                      onChange={this.onChange}
                      placeholder="User Name" />
                    <input type="password"
                      name="passWord"
                      value={passWord}
                      onChange={this.onChange}
                      placeholder="Password" />
                    <button type="submit" className="site-btn">Sign In</button>&nbsp;
                    <button className="site-btn btn-danger" onClick={this.onToggleLoginForm}>cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listUser: state.ListUser,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleLoginForm: () => {
      dispatch(action.isDisplaySignIn());
    },
    onAccountAccess: (account) => {
      dispatch(action.account(account));
    },
    onAddUser: (user) => {
      dispatch(action.actAddUserRequest(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);