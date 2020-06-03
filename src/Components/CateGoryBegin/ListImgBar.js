import React from 'react';
import './listPhoto.css';
import {connect} from 'react-redux';

function ListImgBar() {
  return (
    <div className="categories__item bg-warning-50">
      {/* <div className='col-md-3'><img alt="avatar" src='img/img/cat-1.jpg' /></div>
      <div className='col-md-3'> <img alt="avatar" src='img/img/cat-2.jpg' /></div>
      <div className='col-md-3'><img alt="avatar" src='img/img/cat-3.jpg' /></div>
      <div className='col-md-3'> <img alt="avatar" src='img/img/cat-4.jpg' /></div> */}
    </div>
  );
}

const mapStateToProps = () => {
  return{

  }
}
const mapDispatchToProps = () => {
  return{

  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ListImgBar);