import React from "react";
import { connect } from "react-redux";
import "./Cart.css";
import ItemCart from "./ItemCart";
import * as action from "../../redux/actions/action";
import callApi from "../../Utils/apiCaller";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      address: "",
      phone: "",
      paymentMethods: "Direct payment",
      displayApi: false,
      cart: [],
    };
  }
  componentDidMount() {
    const userStorage = JSON.parse(sessionStorage.getItem("account"));
    const user = userStorage
      ? userStorage
      : {
          id: "",
          name: "",
          address: "",
          phone: "",
        };
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    this.setState({
      user: user,
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      cart: cart,
    });
    this.onScroll();
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    const { cart, name, email, address, phone } = this.state;
    if (!name || !email || !address || !phone) {
      alert("You have not entered the information");
    } else if (!cart) {
      alert("no item in your cart");
    } else {
      const { user, cart } = this.state;
      const { orderStatus } = this.props;
      let listIDSeller = [];
      cart.forEach((product) => {
        listIDSeller.push(product.accountID);
      }); // them id cua seller vao danh sach seller

      listIDSeller = listIDSeller.filter((item, index) => {
        return listIDSeller.indexOf(item) === index;
      }); // loc cac id trung

      listIDSeller.forEach((IDSeller) => {
        let products = [];
        let totalPrice = 0;
        cart.forEach((item) => {
          if (item.accountID === IDSeller) {
            let orderQuantity = item.orderQuantity + item.quantity;
            let addQuantity = { orderQuantity: orderQuantity };
            let product = Object.assign({}, item, addQuantity);
            callApi(`products/${product.id}`, "PUT", product).then((res) => {});
            products.push(item);
            totalPrice = totalPrice + Number(item.price) * item.quantity;
          }
        });
        const dt = new Date();
        const moreInfo = {
          name: this.state.name,
          address: this.state.address,
          phone: this.state.phone,
        };
        const order = {
          idSeller: IDSeller,
          idBuyer: user.id,
          products: products,
          status: orderStatus[1].name,
          totalPrice: totalPrice,
          paymentMethods: this.state.paymentMethods,
          address: user.address,
          phone: user.phone,
          date: dt,
          moreInfo: moreInfo,
        };
        callApi("orders", "POST", order).then((res) => {
          this.setState({
            displayApi: true,
          });
          this.props.addOrder(order);
        });
      });
      sessionStorage.removeItem("cart");
      this.props.cartComplete();
      this.onScroll();
    }
  };

  onScroll = () => {
    let currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.onScroll);
      window.scrollTo(0, currentScroll - currentScroll / 5);
    }
  };

  render() {
    const { carts, paymentMethods } = this.props;

    const listProduct = carts.map((product, index) => {
      return (
        <ItemCart
          key={index}
          product={product}
          index={index}
          quantity={product.quantity}
        />
      );
    });

    const listPaymentMethod = paymentMethods.map((paymentMethod, index) => {
      return (
        <option key={index} value={paymentMethod.name}>
          {paymentMethod.name}
        </option>
      );
    });

    const showAlert = (
      <div className="alert alert-warning" role="alert">
        You have no items in your shopping cart
      </div>
    );

    let totalPrice = 0;
    let totalItem = 0;
    carts.forEach((product) => {
      totalPrice = totalPrice + product.price * product.quantity;
      totalItem = totalItem + product.quantity;
    });

    return (
      <div className="container">
        <h2 className="text-center">Cart</h2>
        {totalPrice === 0 ? showAlert : ""}
        <table className="table table-hover" data-aos="fade-down-left">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">store</th>
              <th scope="col">action</th>
              <th scope="col">Total (vnd)</th>
            </tr>
          </thead>
          <tbody>
            {listProduct}
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <p> total items: {totalItem} </p>
              </th>
              <th scope="col"></th>
              <th>
                <button
                  onClick={this.onSubmit}
                  className="btn btn-sm btn-danger"
                >
                  Buy <i className="fas fa-cart-arrow-down"></i>
                </button>
              </th>
              <th>Total: {totalPrice.toLocaleString()} vnđ</th>
            </tr>
          </tbody>
        </table>
        <br></br>
        <h2
          className="text-center"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          Your infomation
        </h2>
        <table
          className="table table-hover"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <tbody>
            <tr>
              <td>Name: </td>
              <td>
                <input
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>
                <input
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>
                <input
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>
                <input
                  className="form-control"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Payment methods: </td>
              <td>
                <select
                  name="paymentMethods"
                  value={this.state.paymentMethods}
                  onChange={this.onChange}
                >
                  {listPaymentMethod}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carts: state.Cart,
    paymentMethods: state.PaymentMethods,
    orderStatus: state.OrderStatus,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    addOrder: (order) => {
      dispatch(action.addOrder(order));
    },
    cartComplete: () => {
      dispatch(action.cartComplete());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
