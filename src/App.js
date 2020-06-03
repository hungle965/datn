import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import NavBar from './Components/topBar/NavBar';
import Login from './Components/Login/Login';

class App extends React.Component {
	render() {
		return (
			<div >
				<div>
				{this.props.isDisplayLoginForm === 0 ? '':<Login/>}
				<NavBar />
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return{
		isDisplayLoginForm : state.isDisplaySignIn
	}
}
const mapDispatchtoProps = (dispatch , props) => {
	return{
	}
}
export default connect(mapStateToProps, mapDispatchtoProps)( App);
