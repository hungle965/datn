import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../redux/actions/action';

const getRatingProduct = (product) => { // lấy lượt rating trung bình của sản phẩm
     let sum , avg = 0;
     if(product.rating){
          sum = product.rating.reduce(function(a,b){return a + b;});
          avg = sum / product.rating.length;
     }
     return avg; 
}

const getRatingAverage = (products, id) => {
     let result = [];
     let productsAfterFilterId = products.filter(p => p.accountID === id);
     productsAfterFilterId.forEach(product => {
          if (getRatingProduct(product)) {
               result.push(getRatingProduct(product));
          }
     });
     console.log((result.reduce((p, c) => p + c, 0) / result.length));
     return result ? (result.reduce((p, c) => p + c, 0) / result.length).toFixed(2) : 0; // trả về rating trung bình của người dùng
}
class PostProduct extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               name: 'name of product',
               price: 99000,
               slug: 'electronic',
               desc: `decsription of your product`,
               urlPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQE1iDI1fNEj6lp118ibSXiJDioneC8wbJryXhM5xPWoH9Hl2vc&usqp=CAU',
               isRedirect: 1,
               accountID: 0,
               date: 0,
               orderQuantity: 0,
          }
     }
     componentWillMount() {
          const account = JSON.parse(sessionStorage.getItem('account'));
          const dt = new Date();
          if (!account) {
               alert('you need to login to post your product');
          } else {
               this.setState({
                    accountID: account.id,
                    date: dt
               });
          }
     }

     onChange = (event) => {
          const target = event.target;
          const value = target.value;
          const name = target.name;
          this.setState({
               [name]: value
          })
     }

     onScroll = () => {
          let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
               window.requestAnimationFrame(this.onScroll);
               window.scrollTo(0, currentScroll - (currentScroll / 5));
          }
     }
     makeCode = () => {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < 5; i++)
               text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
     }

     onSubmit = (e) => {
          e.preventDefault();
          let { products } = this.props;
          const account = JSON.parse(sessionStorage.getItem('account'));
          let status = '';
          if(getRatingAverage(products,account.id) > 3){
              status = true
          }else{
              status = false
          }
          const product = {...this.state, status};
          if (!account) {
               alert('you need to login to post your product');
          } else if (product.name === '') {
               alert('product has no name!')
          } else {
               let confirmcode = this.makeCode();
               let cf = prompt(confirmcode, 'enter code to comfirm');
               if (cf === confirmcode) {
                    this.props.onPostProduct(product);
                    alert('posting product succesful!');
                    this.setState({
                         isRedirect: true
                    })
               } else {
                    alert('posting failed');
                    this.setState({
                         isRedirect: false
                    })
               }
          }
     }

     render() {
          const sessionAccount = JSON.parse(sessionStorage.getItem('account'));
          const account = sessionAccount ? sessionAccount : { name: 'name store' };
          let { isRedirect } = this.state;
          const succesfulAlert = (
               <Link to='/listItem'>
                    <div className="alert alert-success" role="alert">
                         posting succesful click here to redirect to list product
                    </div>
               </Link>);
          const FailPostingAlert = (
               <Link to='/listItem'>
                    <div className="alert alert-danger" role="alert">
                         posting failed click here to redirect
                    </div>
               </Link>)
          const { ProductTypes } = this.props;
          const types = ProductTypes.map((type, index) => {
               return (
                    <option key={index} value={type.name}>{type.name}</option>
               )
          })
          let dt = new Date();
          return (
               <div className='container'>
                    {isRedirect === 1 ? '' : isRedirect ? succesfulAlert : FailPostingAlert}
                    <div className='row'>
                         <div className='col-md-5'>
                              <h2 className='text-center'>preview</h2>
                              <div className="row border align-items-center">
                                   <div className="col-lg-6 col-md-6">
                                        <img alt='' src={this.state.urlPhoto} />
                                   </div>
                                   <div className="col-lg-6 col-md-6">
                                        <div className="categories__post__item__text">
                                             <span className="post__label">{this.state.slug}</span>
                                             <h3>{this.state.name}</h3>
                                             <ul className="post__widget">
                                                  <li>Price: <span> {this.state.price.toLocaleString()} </span> vnđ</li>
                                                  <li>{dt.getDate() + '/' + dt.getMonth() + '/' + dt.getFullYear()}</li>
                                                  <li>shop: {account.name}</li>
                                                  <li>0 Comment</li>
                                             </ul>
                                             <button className='btn btn-sm btn-danger' onClick={this.onDetail}>Detail</button> &nbsp;
                                   <button className="btn btn-sm btn-warning" onClick={this.onHandleAddCart}>Add to cart</button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className='col-md-7'>
                              <h2 className='text-center'>Post your product</h2>
                              <form onSubmit={this.onSubmit} className='container'>
                                   <div className="form-group">
                                        <label >Product type:</label>
                                        <select
                                             className="form-control"
                                             value={this.state.slug}
                                             onChange={this.onChange}
                                             name='slug'>
                                             {types}
                                        </select>
                                   </div>
                                   <div className="form-group">
                                        <label >Name of product:</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             name='name'
                                             value={this.state.name}
                                             onChange={this.onChange} />
                                   </div>
                                   <div className="form-group ">
                                        <label >Prince:</label>
                                        <div>
                                             <input
                                                  type="number"
                                                  className="form-control"
                                                  placeholder="vnd"
                                                  name='price'
                                                  value={this.state.price}
                                                  onChange={this.onChange} />
                                        </div>
                                   </div>
                                   <div className="input-group">
                                        <div className="input-group-prepend">
                                             <span className="input-group-text">Upload</span>
                                        </div>
                                        <div className="custom-file">
                                             <input type="file" className="custom-file-input" />
                                             <label className="custom-file-label" > Photo</label>
                                        </div>
                                   </div>
                                   <div className="form-group">
                                        <input
                                             type="text"
                                             className="form-control"
                                             placeholder="src"
                                             name='urlPhoto'
                                             value={this.state.urlPhoto}
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
                                             Detailed description of your product
                                        </small>
                                   </div>
                                   <div className='d-flex justify-content-around'>
                                        <button
                                             type="submit"
                                             className="btn btn-warning"
                                             onClick={this.onScroll}>Post product</button>
                                        <Link to='userdetail'>
                                             <button className='btn btn-danger'> Cancel </button>
                                        </Link>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          )
     }
}

const mapStateToProps = (state) => {
     return {
          ProductTypes: state.ProductTypes,
          products: state.ListProduct
     }
}
const mapDispatchToProps = (dispatch) => {
     return {
          onPostProduct: (product) => {
               dispatch(action.actAddProductRequest(product));
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct);