import React from 'react';
import { Link } from 'react-router-dom';
import * as action from '../../../redux/actions/action';
import { connect } from 'react-redux';
class UserDetailAdmin extends React.Component {
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
      retypeOldPass: '',
      status: true,
      displayAlertRedirect: false
    }
  }
  componentDidMount() {
    const account = this.props.user;
    if (account) {
      this.setState({
        id: account.id,
        userName: account.userName,
        email: account.email,
        name: account.name,
        passWord: account.passWord,
        phone: account.phone,
        picture: account.picture,
        desc: account.desc,
        status: account.status
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
    this.props.setCurrentPage('users');
  }
  onSubmit = (e) => {
    e.preventDefault();
    const account = {
      id: this.state.id,
      userName: this.state.userName,
      email: this.state.email,
      name: this.state.name,
      passWord: this.state.passWord,
      phone: this.state.phone,
      picture: this.state.picture,
      desc: this.state.desc,
      status: this.state.status
    };
    this.props.onEditUser(account);
    this.setState({
      displayAlertRedirect: true
    });
    this.onScroll();
    this.props.setCurrentPage('users');
  }
  onBan = () => {
    this.setState({
      status: !this.state.status
    })
  }
  render() {
    const alertRedirect = (
      <Link to='/dashboard'>
        <div class="alert alert-success" role="alert">
          This is a success alert—check it out!
        </div>
      </Link>
    )
    const { displayAlertRedirect, status } = this.state;
    return (
      <div>
        <div className='col'>
          <h2 className='text-center'>
            <div>
              <img className="img-product-detail" alt="avatar" src={this.state.picture} />
            </div>
            <div>
              {this.state.name}' store
            </div>
          </h2>
          <form onSubmit={this.onSubmit} className='container'>
            {!displayAlertRedirect ? '' : alertRedirect}
            <div className="form-group">
              <label >Account:</label>
              <input
                name='userName'
                className='form-control '
                onChange={this.onChange}
                value={this.state.userName}
              />
            </div>
            <div className="form-group">
              <label >Email:</label>
              <input
                name='email'
                className='form-control'
                onChange={this.onChange}
                value={this.state.email}
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
                <label className="custom-file-label" >Photo</label>
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
            <div className='d-flex justify-content-center'>
              <button type="submit" className="btn btn-sm btn-success"><i className="fas fa-save"></i> save </button>&nbsp;
              <Link to='/dashboard' >
                <button onClick={this.onScroll} className='btn btn-sm btn-warning'>Cancel</button>&nbsp;
              </Link>
              <button onClick={this.onBan} className={status ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-primary'}>
                {status ? 'Ban' : 'active'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.UserDetail
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(action.setUserDetail(user));
    },
    onEditUser: (user) => {
      dispatch(action.actUpdateUsersRequest(user));
    },
    setCurrentPage: (value) => {
      dispatch(action.setCurrentPage(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailAdmin);