import React from 'react';
import './admin.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';
class User extends React.Component {
  onSetUserDetail = () => {
    const { user } = this.props;
    this.props.setUser(user);
  }
  render() {
    const { user } = this.props;
    const pers = user.permission;
    const listPer = pers ? pers.map((per, index) => {
      return <span className={per === "admin" ? 'badge badge-pill badge-danger' : 'badge badge-pill badge-success'} key={index}>{per}</span>
    }) : '';
    return (
      <tr>
        <th scope="row">{user.id}</th>
        <td><img className="img-thumbnail img-item" alt={user.name} src={user.picture} /></td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{listPer}</td>
        <td>
          <span className={user.status ? 'badge badge-pill badge-primary' : 'badge badge-pill badge-secondary'} >{user.status ? 'active' : 'banned'}</span>
        </td>
        <td className="d-flex align-items-center">
          <Link to='/admin/user-detail'><button onClick={this.onSetUserDetail} className="btn btn-sm btn-danger">detail</button></Link>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(action.setUserDetail(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);