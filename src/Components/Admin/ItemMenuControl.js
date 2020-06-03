import React from 'react';

class Products extends React.Component{
  onSelected = () => {
    this.props.onSelected(this.props.elm.name);
  }
  render(){
    const {elm} = this.props;
    return(
      <li type="button" className="list-group-item list-group-item-primary" onClick={this.onSelected}>{elm.name}</li>
    )
  }
}
export default Products;