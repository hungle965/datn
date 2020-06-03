import React from 'react';
import { connect } from 'react-redux';
import Type from './Type';
import * as action from '../../redux/actions/action';

class Types extends React.Component {
  render() {
    const { types } = this.props;
    const listType = types.map((type, index) => {
      return (
        <Type key={index} type={type} />
      )
    })
    return (
      <div className="container">
        <h4 className="justify-content-center text-center bg-primary rounded text-light">List type of products</h4>
        <table className="table table-hover table-sm">
          <thead>
            <tr className="text-primary">
              <th scope="col">id</th>
              <th scope="col">Name of type</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listType}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    types: state.ProductTypes,
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
export default connect(mapStateToProps, mapDispatchToPops)(Types);