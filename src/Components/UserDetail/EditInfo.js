import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';
class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      userName: '',
      email: '',
      name: '',
      passWord: '',
      phone: '',
      picture: '',
      desc: '',
      isShowConfirm: false,
      retypeOldPass: '',
      displayAlertRedirect: false
    }
  }
  componentDidMount() {
    const account = JSON.parse(sessionStorage.getItem('account'));
    if (account) {
      this.setState({
        id: account.id,
        userName: account.userName,
        email: account.email,
        name: account.name,
        passWord: account.passWord,
        phone: account.phone,
        picture: account.picture,
        desc: account.desc
      })
    }
    else {
      alert('You need to be logged in to perform this function');
    }
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value
    this.setState({
      [name]: value
    });
  }

  onScroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { isShowConfirm } = this.state;
    const oldPass = JSON.parse(sessionStorage.getItem('account')).passWord;
    if (isShowConfirm === false) {
      this.setState({
        isShowConfirm: true,
      })
    } else if (oldPass !== this.state.retypeOldPass) {
      alert(' Old password incorrect ');
    } else {
      const account = {
        id: this.state.id,
        userName: this.state.userName,
        email: this.state.email,
        name: this.state.name,
        passWord: this.state.passWord,
        phone: this.state.phone,
        picture: this.state.picture,
        desc: this.state.desc,
      };
      this.props.onEditUser(account);
      this.setState({
        displayAlertRedirect: true
      });
      this.onScroll();
    }
  }
  render() {
    let showConfirm = (<div className="alert alert-primary" role="alert">
      <label>Retype the old password</label>
      <input
        className='form-control'
        type='password'
        name='retypeOldPass'
        value={this.state.retypeOldPass}
        onChange={this.onChange} />
    </div>)
    const alertRedirect = (
      <Link to='/'>
        <div class="alert alert-success" role="alert">
          This is a success alert—check it out!
        </div>
      </Link>
    )
    const { isShowConfirm, displayAlertRedirect } = this.state;
    return (
      <div className='col'>
        <h2 className='text-center'>{this.state.name}' store</h2>
        <form onSubmit={this.onSubmit} className='container'>
          {!displayAlertRedirect ? '' : alertRedirect}
          <div className="form-group">
            <label >Account:</label>
            <input
              name='userName'
              className='form-control '
              value={this.state.userName}
              disabled
              readOnly
            />
          </div>
          <div className="form-group">
            <label >Email:</label>
            <input
              name='email'
              className='form-control'
              value={this.state.email}
              disabled
              readOnly
            />
          </div>
          <div className="form-group">
            <label >Store name:</label>
            <input
              type="text"
              className="form-control"
              name='name'
              value={this.state.name}
              onChange={this.onChange} />
          </div>
          <div className="form-group ">
            <label >Pass word:</label>
            <div>
              <input
                type="password"
                className="form-control"
                name='passWord'
                value={this.state.passWord}
                onChange={this.onChange} />
            </div>
          </div>
          <div className="form-group">
            <label >Phone: </label>
            <input
              type="text"
              className="form-control"
              name='phone'
              placeholder="phone"
              onChange={this.onChange}
              value={this.state.phone}
            />
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
              name='picture'
              value={this.state.picture}
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
              Detailed description of your store
            </small>
          </div>
          {isShowConfirm === false ? '' : showConfirm}
          <div className='d-flex justify-content-center'>
            <button type="submit" className="btn btn-sm btn-warning"><i className="fas fa-save"></i> save </button>&nbsp;
            <Link to='/' >
              <button className='btn btn-sm btn-danger'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onEditUser: (user) => {
      dispatch(action.actUpdateUsersRequest(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);