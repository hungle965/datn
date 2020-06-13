import React from 'react';
import OrderDetail from '../../Cart/OrderDetail';
import * as action from '../../../redux/actions/action';
import { connect } from 'react-redux';
function OrderDetailAdmin(props) {
  return (
    <OrderDetail OrderDetail={props.OrderDetail} />
  )
}
const mapStateToProps = (state) => {
  return {
    OrderDetail: state.OrderDetail,
    users: state.ListUser,
    orderStatus: state.OrderStatus
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateOrder: (order) => {
      dispatch(action.updateOrderRequest(order))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailAdmin);