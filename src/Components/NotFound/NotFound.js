import React from 'react';

class NotFound extends React.Component {
     render() {
          return (
               <div>
                    <section class="section-404">
                         <div class="text-404">
                              <h1>404</h1>
                              <h3>Opps! This page Could Not Be Found!</h3>
                              <p>Sorry bit the page you are looking for does not exist, have been removed or name changed</p>
                              <form action="#">
                                   <input type="text" placeholder="Enter your keyword" />
                                   <button type="submit"><i class="fa fa-search"></i></button>
                              </form>
                         </div>
                    </section>
               </div>
          );
     }
}
export default NotFound;