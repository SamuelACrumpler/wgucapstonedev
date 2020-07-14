import React, { Component } from 'react';

class Navbar extends Component {
	constructor() {
		super();

		//consider making navbar part of a state array based on users.
		//Map out the appropriate options
	}

	onLogout(){
		console.log("This will log you out.")
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
				<div className="container">
					<a className="navbar-brand" href="#">[Company Name] Scheduler</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<a className="nav-link" href="/main">Main
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/users">Users
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/customers">Customers</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/appointments">Appointments</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/reports">Reports</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/search">Search</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#" onClick={this.onLogout}>Log Out</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

		);
	}
}

export default Navbar;
