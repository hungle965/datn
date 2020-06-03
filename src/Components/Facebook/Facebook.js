import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
export default class Facebook extends Component {
     state = {
         isLoggedIn: false,
         userID: '',
         name: '',
         email: '',
         picture: '',
     }
     
     componentClicked = () => { }
     responseFacebook = (response) => {
         this.setState({
             isLoggedIn: false,
             userID: response.userID,
             name: response.name,
             email: response.email,
             picture: response.picture.data.url
 
         })
     }
     render() {
         let fbContent;
         if (this.state.isLoggedIn===false) {
             fbContent = (
                 <div style={{
                     width:'400px',
                     margin: 'auto',
                     background: '#f4f4f4',
                     padding: '20px',
                 }}>
                      <img src={this.state.picture} alt={this.state.name}></img>
                      <h2>Welcome {this.state.name}</h2>
                 </div>
 
             )
         } else {
             fbContent = (<FacebookLogin
                 appId='237859344122069'
                 autoLoad={false}
                 fields="name,email,picture"
                 onClick={this.componentClicked}
                 callback={this.responseFacebook} />)
         }
         return (
             <div>
               {fbContent}
             </div>
         )
     }
 }