import React from 'react';
import * as action from '../../redux/actions/action';
import User from './User';
import { connect } from 'react-redux';
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPhone: '',
      filterEmail:'',
      filterName: '',
      filterStatus: '',
    }
  }
  isAdmin = (user) => {
    let result = false;
    const per = user.permission;
    per.forEach(elm => {
      if (elm === "admin") {
        result = true
      }
    });
    return result;
  }
  componentDidMount() {
    this.props.fetchProductsRequest();
    this.props.fetchUsersRequest();
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    let { users } = this.props;
    const {filterPhone, filterEmail, filterName, filterStatus} = this.state;
    if(filterName){
      users = users.filter(user=>{
        return user.name.indexOf(filterName) !== -1;
      })
    }
    if(filterPhone){
      users = users.filter(user=>{
        return user.phone.indexOf(filterPhone) !== -1;
      })
    }
    if(filterEmail){
      users = users.filter(user=>{
        return user.email.indexOf(filterEmail) !== -1;
      })
    }
    if(filterStatus){
      users = users.filter(user=> {
        return user.status.toString() === filterStatus;
      })
    }
    const listUser = users.map((user, index) => {
      return (
        < User key={index} user={user} />
      );
    });
    return (
      <div className="container">
        <h4 className="justify-content-center text-center bg-primary rounded text-light">List user</h4>
        <table className="table table-sm table-hover rounded">
          <thead>
            <tr>
              <th scope="col" className="text-primary">#</th>
              <th scope="col" className="text-primary">avatar</th>
              <th scope="col" className="text-primary">name</th>
              <th scope="col" className="text-primary">email</th>
              <th scope="col" className="text-primary">phone</th>
              <th scope="col" className="text-primary">permission</th>
              <th scope="col" className="text-primary">status</th>
              <th scope="col" className="text-primary"></th>
              <th scope="col" className="text-primary"></th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <input 
                  className="form-control-sm rounded" 
                  placeholder="search"
                  name="filterName"
                  value={this.state.filterName}
                  onChange={this.onChange} />
              </th>
              <th scope="col">
                <input 
                  className="form-control-sm rounded" 
                  laceholder="email"
                  name="filterEmail"
                  value={this.state.filterEmail}
                  onChange={this.onChange} />
              </th>
              <th scope="col">
                <input
                  type="number"
                  name="filterPhone"
                  className="form-control-sm"
                  placeholder="phone"
                  value={this.state.filterPhone}
                  onChange={this.onChange} />
              </th>
              <th scope="col"></th>
              <th scope="col">
                <select
                  className="form-control-sm"
                  name="filterStatus"
                  value={this.state.filterStatus}
                  onChange={this.onChange}
                >
                  <option value=''>all</option>
                  <option value={true}>active</option>
                  <option value={false}>banned</option>
                </select>
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listUser}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.ListProduct,
    users: state.ListUser
  }
}
const mapDispatchToPops = (dispatch) => {
  return {
    fetchProductsRequest: () => {
      dispatch(action.actFetchProductsRequest());
    },
    fetchUsersRequest: () => {
      dispatch(action.actFetchUsersRequest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToPops)(Users);