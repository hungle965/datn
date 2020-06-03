import * as types from '../constant/constant';
import callApi from '../../Utils/apiCaller';


export const listAllProduct = () => {
     return {
          type: types.LIST_ALL
     }
}
export const isDisplaySignIn = () => {
     return {
          type: types.IS_DISPLAY_SIGNIN
     }
}
export const isDisplayHumberger = () => {
     return {
          type: types.TOGGLE_HUMBERGER
     }
}
export const listUser = () => {
     return {
          type: types.LIST_USER
     }
}
export const account = (account) => {
     return {
          type: types.ACCOUNT,
          account
     }
}
export const logOut = () => {
     return {
          type: types.LOGOUT
     }
}
export const productDetail = (product) => {
     return {
          type: types.PRODUCT_DETAIL,
          product
     }
}
export const cart = (product) => {
     return {
          type: types.CART,
          product
     }
}
export const inCreasing = (id) => {
     return {
          type: types.INCREASING,
          id
     }
}
export const reduction = (id) => {
     return {
          type: types.REDUCTION,
          id
     }
}
export const removeItemCart = (id) => {
     return {
          type: types.REMOVE_ITEM_CART,
          id
     }
}
export const cartComplete = () => {
     return{
          type: types.CART_COMPLETE,
     }
}
export const AddUser = (user) => {
     return {
          type: types.ADD_USER,
          user
     }
}
export const postProduct = (product, account) => {
     return {
          type: types.POST_PRODUCT,
          product,
          account
     }
}
export const postProductInUser = (product, account) => {
     return {
          type: types.POST_PRODUCT_IN_USER,
          product,
          account
     }
}
export const editUser = (account) => {
     return {
          type: types.EDIT_USER,
          account
     }
}
export const editProduct = (product) => {
     return {
          type: types.EDIT_PRODUCT,
          product
     }
}
export const removeProduct = (id) => {
     return {
          type: types.REMOVE_PRODUCT,
          id
     }
}

// API
// lay danh sach san pham
export const actFetchProductsRequest = () => {
     return (dispatch) => {
          return callApi('products', 'GET', null).then(res => { //neu goi API thanh cong thi dispatch store 
               dispatch(actFetchProducts(res.data))
          })
     };
}
// thiet lap danh sach san pham tren store
export const actFetchProducts = (products) => {
     return {
          type: types.FETCH_PRODUCTS,
          products
     }
}

// danh sach user
export const actFetchUsersRequest = () => {
     return (dispatch) => {
          return callApi('users', 'GET', null).then(res => {
               dispatch(actFetchUsers(res.data))
          })
     }
}

export const actFetchUsers = (users) => {
     return {
          type: types.FETCH_USERS,
          users
     }
}

// user dang ky tai khoan

export const actAddUserRequest = (user) => {
     return dispatch => {
          return callApi('users', 'POST', user).then(res => {
               dispatch(actAddUser(user))
          })
     }
}
export const actAddUser = (user) => {
     return {
          type: types.ADD_USER,
          user
     }
}
// user update thong tin
export const actUpdateUsersRequest = (user) => {
     return (dispatch) => {
          return callApi(`users/${user.id}`, 'PUT', user).then(res => {
               dispatch(actUpdateUser(user))
          })
     }
}

export const actUpdateUser = (user) => {
     return {
          type: types.UPDATE_USER,
          user
     }
}

// user dang san pham
export const actAddProductRequest = (product) => {
     return dispatch => {
          return callApi('products', 'POST', product).then(res => {
               dispatch(actAddProduct(product))
          })
     }
}
export const actAddProduct = (product) => {
     return {
          type: types.ADD_PRODUCT,
          product
     }
}

// user xoa san pham

export const actDeleteProductRequest = (id) => {
     return dispatch => {
          return callApi(`products/${id}`, 'DELETE', null).then(res => {
               dispatch(actDeleteProduct(id));
          })
     }
}
export const actDeleteProduct = (id) => {
     return {
          type: types.DELETE_PRODUCT,
          id
     }
}

// user sua san pham
export const actUpdateProductRequest = (product) => {
     return dispatch => {
          return callApi(`products/${product.id}`, 'PUT', product).then(res => {
               dispatch(actUpdateProduct(product));
          })
     }
}
export const actUpdateProduct = (product) => {
     return {
          type: types.UPDATE_PRODUCT,
          product
     }
}

// user them don hang

export const addOrder = (order) => {
     return {
          type: types.ADD_ORDER,
          order
     }
}

export const fetchOrderRequest = () => {
     return dispatch => {
          return callApi('orders','GET',null).then(res => {
               dispatch(fetchOrder(res.data));
          })
     }
}

export const fetchOrder = (orders) => {
     return {
          type: types.FETCH_ORDERS,
          orders
     }
}

export const updateOrderRequest = (order) => {
     return dispatch => {
          return callApi(`orders/${order.id}`,'PUT',order).then(res => {
               dispatch(updateOrder(order));
          });
     };
}

export const updateOrder = (order) => {
     return{
          type: types.UPDATE_ORDER,
          order
     }
}

export const setOrderDetail = (order) => {
     return{
          type: types.SET_ORDER_DETAIL,
          order
     }
}

export const setUserDetail = (user) => {
     return{
          type: types.SET_USER_DETAIL,
          user
     }
}

export const setProductDetail = (product) => {
     return{
          type: types.SET_PRODUCT_DETAIL,
          product
     }
}

export const setCurrentPage = (value) => {
     return{
          type: types.SET_CURRENT_PAGE,
          value
     }
}