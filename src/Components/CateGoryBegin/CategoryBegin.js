import React from 'react';
import ListProduct from './../ListProduct/ListProduct';
// import ListImgBar from './ListImgBar';
import InfoRightBar from '../InfoRightBar/InfoRightBar';
class CategoryBegin extends React.Component {
     render() {
          return (
               <div>
                    <div className="container">
                         {/* <div>
                              <ListImgBar />
                         </div> */}
                         <div className="categories__post">
                              <div className="container ">
                                   <div className="row">
                                        <div className="col-lg-8 col-md-8 border-right">
                                             <ListProduct />
                                        </div>
                                        <div className="col-lg-4 col-md-4"
                                             data-aos="fade-left"
                                             data-aos-anchor="#example-anchor"
                                             data-aos-offset="500"
                                             data-aos-duration="1000">
                                             <InfoRightBar />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
}

export default CategoryBegin;