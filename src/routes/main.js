import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './../routes/nav';


class main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: '',
			selected: '',
			cUser: '',
			users: [], //Need to use this instead of the dumb idea I was using
			listdays: []
		};

	

	}

	componentDidMount() {
		//this.checkLoginSession();
		const theData = [
			{
				num: '11',
				app: 'Appointments: 00'
			},

			{
				num: '22',
				app: 'Appointments: 11'
			},

			{
				num: '33',
				app: 'Appointments: 22'
			},

			{
				num: '44',
				app: 'Appointments: 33'
			},

			{
				num: '55',
				app: 'Appointments: 44'
			},

			{
				num: '66',
				app: 'Appointments: 55'
			},

			{
				num: '77',
				app: 'Appointments: 66'
			}
		]

		this.setState({listdays: theData})
	}

	logout() {
		//reset login credidentals in local storage. Run checkLoginSession to boot user back to login page.
	}

	//[CRUD Functions] - User
	saveUser = (e) => {
		e.preventDefault();
		const uid = this.state.user[this.state.selected]._id
		const cuser = this.state.user[this.state.selected]._createdBy
		const name = this.state.user[this.state.selected]._name
		const type = this.state.user[this.state.selected].type
		const password = this.state.user[this.state.selected]._password
		const uUser = this.state.cUser;
		const udate = new Date();
		const cdate = this.state.user[this.state.selected]._createdDate

		if (name === '') { console.log("Empty String"); return; }
		else if (type === '') { console.log("Empty String"); return; }
		else if (password === '') { console.log("Empty String"); return; }

		switch (this.state.crudState) {
			case 0: //create
				//created then updated
				axios.post(this.state.path + ':5000/user/', { name, type, password, cuser, uUser, cdate, udate })
					.then((result) => {
					}).finally(() => {
						//call refresh function
					});
				break;
			case 1: //update
				axios.post(this.state.path + ':5000/user/' + this.state.list[this.state.selected]._id, { name, type, password, cuser, uUser, cdate, udate})
					.then((result) => {
					}).finally(() => {
						//call refresh function
					});
				break;
			case 2: //delete
				axios.delete(this.state.path + ':5000/user/ ' + this.state.list[this.state.selected]._id)
					.then((result) => {
					}).finally(() => {
						//call refresh function
					});
				break;
		}

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
				<Navbar/>
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
							<div className="calendar-days row">
								{
									this.state.listdays.map((day, index) => (

											<div className="square border" key={index}>
												<div className="content">
													<div className="table">
														<div className="table-cell">
															<h5 className="daynum">{day.num}</h5>
															<p className="appnum">{day.app}</p>
														</div>
													</div>
												</div>
											</div>
										)
									)

								}


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
				
							</div>{/*Week-1 End */}
							
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default main;
