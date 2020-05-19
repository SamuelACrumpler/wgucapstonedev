import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


class main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			updated_date: '',
			created_date: '',
			error: ''
		};

	

	}

	componentDidMount() {
		this.checkLoginSession();
	}




	checkLoginSession() {
		if (localStorage.getItem("isLoggedIn") === 'true') {
			this.props.history.push("/Main")
		}
	}

	createLoginSession() {
		console.log(this.state.user._id);
		localStorage.setItem("userId", this.state.user._id);
		localStorage.setItem("isLoggedIn", true);
	}


	//https://codepen.io/chrisdpratt/pen/OOybam
	//Configure the calendar header to disappear at a certain size, and only display the days
	//day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted
	render() {
		return (
			<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
				<div className="container">
					<a className="navbar-brand" href="#">[Company Name] Scheduler</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<a className="nav-link" href="#">Users
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Customers</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Appointments</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Reports</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
				<div className="container">
					<div className="row">
						<div className="col-lg-3 border recent">Recent Appointments section</div>
						<div className="col-lg-9 border border-left-0 calendar d-none d-md-block">
							<h4 className="display-4 mb-4 text-center">Current Month</h4>
							<header>
							<div className="row d-none d-md-flex p-1 bg-dark text-white">
								<h5 className="col-sm p-1 text-center">Sunday</h5>
								<h5 className="col-sm p-1 text-center">Monday</h5>
								<h5 className="col-sm p-1 text-center">Tuesday</h5>
								<h5 className="col-sm p-1 text-center">Wednesday</h5>
								<h5 className="col-sm p-1 text-center">Thursday</h5>
								<h5 className="col-sm p-1 text-center">Friday</h5>
								<h5 className="col-sm p-1 text-center">Saturday</h5>
								</div>
							</header>
							<div className="days week-1 row"> 
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
										 </div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
										 </div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
							</div>{/*Week-1 End */}
							<div className="days week-2 row">
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
							</div>{/*week-2 end*/}
							<div className="days week-2 row">
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
							</div>{/*week-3 end*/}
							<div className="days week-2 row">
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
							</div>{/*week-4 end*/}
							<div className="days week-2 row">
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
								<div className="square border">
									<div className="content">
										<div className="table">
											<div className="table-cell numbers">
												<h5 className="daynum">11</h5>
												<p className="appnum">Appointments: 00</p>
											</div>
										</div>
									</div>
								</div>
							</div>{/*week-5 end*/}
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default main;
