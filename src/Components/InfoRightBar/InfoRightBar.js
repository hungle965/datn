import React from 'react';

class InfoRightBar extends React.Component {
     render() {
          return (
               <div className="sidebar__item">
                    <div className="sidebar__about__item">
                         <div className="sidebar__item__title">
                              <h6>About me</h6>
                         </div>
                         <h6>Hi every one! I,m <span>Lena Mollein.</span></h6>
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="sidebar__follow__item">
                         <div className="sidebar__item__title">
                              <h6>Follow me</h6>
                         </div>
                         <div className="sidebar__item__follow__links">
                              <i className="fa fa-facebook"></i>
                              <i className="fa fa-twitter"></i>
                              <i className="fa fa-youtube-play"></i>
                              <i className="fa fa-instagram"></i>
                              <i className="fa fa-envelope-o"></i>
                         </div>
                    </div>
                    <div className="sidebar__item__banner">
                         img banner
                    </div>
                    <div className="sidebar__item__categories">
                         <div className="sidebar__item__title">
                              <h6>Categories</h6>
                         </div>
                    </div>
                    <div className="sidebar__subscribe__item">
                         <div className="sidebar__item__title">
                              <h6>Subscribe</h6>
                         </div>
                         <p>Subscribe to our newsletter and get our newest updates right on your inbox.</p>

                    </div>
               </div>
          );
     }
}

export default InfoRightBar;