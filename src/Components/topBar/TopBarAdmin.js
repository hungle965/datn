import React from 'react';
import { Link } from 'react-router-dom';

class TopBarAdmin extends React.Component {
	render() {
		const { account } = this.props;
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3">
							<div className="header__btn">
								{account.name === '' ?
									<button className="primary-btn "
										onClick={this.onSignIn}>Sign In
								    </button> :
									<div>
										<img alt='avatar' src={account.picture} className="rounded-circle avatar" /> &nbsp;
										<p className="primary-btn rounded " >
											<Link to='/editinfo'>{account.name}</Link>&nbsp;&nbsp;|&nbsp; <i title="Log Out" type="button" onClick={this.props.onLogOut} className="fas fa-sign-out-alt"></i>
										</p>
									</div>
								}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="header__logo">
								<div>
									<h3 className="text-dark bg-light">ADMIN DASHBOARD</h3>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3">
							<div className="header__social">
								<div>
									<Link to='/dashboard'>
										<p className="primary-btn rounded " >
											Dashboard
										</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		)
	}
}
export default TopBarAdmin;