import { combineReducers } from 'redux';
import  ListProduct  from './ListProduct';
import isDisplaySignIn from './IsDisPlaySignIn';
import isDisplayHumberger from './isDisplayHumberger';
import ListUser from './ListUser';
import account from './account';
import productDetail from './productDetail';
import Orders from './Orders';
import Cart from './Cart';
import PaymentMethods from './PaymentMethods';
import OrderStatus from './OrderStatus';
import OrderDetail from './OrderDetail';
import ProductTypes from './ProductTypes';
import ManageComps from './ManageComps';
import UserDetail from './UserDetail';
import ProductDetailAdmin from './ProductDetailAdmin';
import currentPage from './currentPage';

const myReducer = combineReducers({
   ListProduct,
   isDisplaySignIn,
   isDisplayHumberger,
   ListUser,
   account,
   productDetail,
   Cart,
   Orders,
   PaymentMethods,
   OrderStatus,
   OrderDetail,
   ProductTypes,
   ManageComps,
   UserDetail,
   ProductDetailAdmin,
   currentPage,
});

export default myReducer;