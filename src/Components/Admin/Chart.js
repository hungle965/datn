import React from 'react';
import { connect } from 'react-redux';
import { Bar, Line, Doughnut } from "react-chartjs-2";
import * as action from '../../redux/actions/action';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      displayChart: 'products'
    }
  }
  componentDidMount() {
    this.props.fetchProduct();
    this.props.fetchOrder();
    const typesPro = this.props.types;
    let types = [];
    typesPro.forEach(type => {
      types.push(type.name);
    });
    this.setState({
      types: types
    });
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  }
  render() {
    const { products, orders } = this.props;
    let elec = 0;
    let pet = 0;
    let home = 0;
    let fashion = 0;
    let car = 0;
    let other = 0;

    let p = 0  // payment ondelivery
    let i = 0 // internet banking
    let d = 0 // direct payment

    products.forEach(elm => {
      if (elm.slug === 'Electronic') elec = elec + 1;
      else if (elm.slug === "Home") home = home + 1;
      else if (elm.slug === "Pets") pet = pet + 1;
      else if (elm.slug === "Fashion") fashion = fashion + 1;
      else if (elm.slug === "Car") car = car + 1;
      else if (elm.slug === "Other...") other = other + 1;
    });
    let month = [];
    let data = [];
    let post = [];

    for (let i = 0; i <= 30; i++) {
      month.push(i);
      data.push(0);
      post.push(0); // test commit
    };
    orders.forEach(elm => {
      const dt = new Date(elm.date).getDate();
      data[dt] = data[dt] + 1;
      if (elm.paymentMethods.slice(0, 1) === "P") {
        p++;
      } else if (elm.paymentMethods.slice(0, 1) === "I") {
        i++;
      } else { d++; }
    }); 
    let total = p+i+d;
    let percentP = Math.floor((p/total)*100);
    let percentI = Math.floor((i/total)*100);
    let percentD = Math.floor((d/total)*100);
    percentD += 100-(percentP+percentI+percentD);
    products.forEach(elm => {
      const dt = new Date(elm.date).getDate();
      post[dt] = post[dt] + 1;
    });
    const { displayChart } = this.state;
    return (
      <div className="container">
        <div>
          <select
            value={this.state.displayChart}
            name='displayChart'
            className="form-control-sm"
            onChange={this.onChange}
          >
            <option value="products">product type</option>
            <option value="orders">order quantity</option>
            <option value="post">post product</option>
            <option value="payment">payment methods (%)</option>
          </select>
        </div>
        {
          displayChart === 'products' ?
            <div>
              <Bar
                data={{
                  labels: this.state.types,
                  datasets: [
                    {
                      label: "Product",
                      backgroundColor: [
                        "#6699FF",
                        "#FFCC99",
                        "#FF9933",
                        "#6699FF",
                        "#c45850",
                        "#CC3333"
                      ],
                      data: [elec, pet, home, fashion, car, other]
                    }
                  ]
                }}
                options={{
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Product types"
                  }
                }}
              />
            </div> : ''
        }
        {
          displayChart === 'orders' ?
            <div>
              <Line
                data={{
                  labels: month,
                  datasets: [
                    {
                      data: data,
                      label: "order quantity",
                      borderColor: "#0000FF",
                      fill: false
                    }
                  ]
                }}
                options={{
                  title: {
                    display: true,
                    text: "order quantity (month)"
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
            </div> : ''
        }
        {
          displayChart === 'post' ?
            <div>
              <Line
                data={{
                  labels: month,
                  datasets: [
                    {
                      data: post,
                      label: "post quantity",
                      borderColor: "#FF0000",
                      fill: false
                    }
                  ]
                }}
                options={{
                  title: {
                    display: true,
                    text: "post quantity (month)"
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
            </div> : ''
        }
        {
          displayChart === 'payment' ?
            <div>
              <Doughnut
                data={{
                  datasets: [{
                    data: [percentP, percentI, percentD],
                    backgroundColor: [
                      "#99FFCC",
                      "#FFCCCC",
                      "#9999FF",
                    ]
                  }],
                  labels: [
                    'Payment on delivery',
                    'Internet banking',
                    'Direct payment'
                  ]
                }}
              />
            </div>
            : ''
        }

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    types: state.ProductTypes,
    products: state.ListProduct,
    orders: state.Orders
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: () => {
      dispatch(action.actFetchProductsRequest());
    },
    fetchOrder: () => {
      dispatch(action.fetchOrderRequest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);