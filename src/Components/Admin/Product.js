import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/action';
import './admin.css';
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.numFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  }
  onDetail = () => {
    this.props.setProductDetail(this.props.product);
  }
  render() {
    const { product, store } = this.props;
    const dt = new Date(product.date);
    return (
      <tr
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom">
        <th scope="row">{product.id}</th>
        <td>{dt.getDate()}/{(dt.getMonth() + 1)}/{dt.getFullYear()}</td>
        <td>{product.name}</td>
        <td>{product.slug}</td>
        <td>{store.name}</td>
        <td>{this.numFormatter.format(product.price)}</td>
        <td>
          <span className=
            {product.status === '0' ? 'badge badge-pill badge-warning' :
              product.status === '1' ? 'badge badge-pill badge-success' : 'badge badge-pill badge-danger'} >
            {product.status === '0' ? 'posted' : product.status === '1' ? 'approved' : 'not approved'}
          </span>
        </td>
        <td className="d-flex align-items-center">
          <Link to='/admin/product-detail'>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onDetail}>detail</button>
          </Link>
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
    setProductDetail: (product) => {
      dispatch(action.setProductDetail(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);