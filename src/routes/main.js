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
			year: '',
			month: '',
			users: [], 
			listdays: [],
			listapp: []
		};

		this.onClickDay = this.onClickDay.bind(this);

	

	}

	componentDidMount() {
		//this.checkLoginSession();

		
		let d = new Date();
		console.log(d.getDate());
		console.log(d.getFullYear());
		console.log(d.getMonth());
		this.setState({
			year: d.getFullYear(),
			month: d.getMonth()
		})
		this.loadDays(d.getFullYear(), d.getMonth());
	}

	onClickDay(dn){
		console.log('day: ' + dn);

		axios.get(this.state.path + ':5000/appointment/d/' + this.state.year + '/' + this.state.month + '/' + dn)
			.then((res) => {

				this.setState({
					
					listapp : res.data

				})
				console.log(this.state.listapp)
			})

		axios.get(this.state.path + ':5000/appointment/m/' + this.state.year + '/' + this.state.month + '/' + dn)
			.then((res) => {

				
				console.log(res.data)
			})
					

				
	}

	logout() {
		//reset login credidentals in local storage. Run checkLoginSession to boot user back to login page.
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

	loadDays(y, m){
		console.log(y+"/"+m);
		let date = new Date();
		console.log(date);
		date.setFullYear(y); date.setMonth(m);
		console.log(date.getDay());
		//copy date, set to first day of month, use getday to get the right value.
		let firstday = new Date(y, m, 1).getDay(); //pulls the day, sunday, monday, etc.
		let d = new Date(y, m, 0).getDate(); //Should get the number of days in the month
		let days = [];
		let count = 0;
		console.log("day of week: " + firstday)

		console.log("days: " + d)

		// {
		// 	num: '77',
		// 	app: 'Appointments: 66'
		// }
		for (let i = 0; i < firstday; i++){
			days.push({
				'num': '',
				'app': ''
			})
			count++
			console.log(count)
		}

		for (let i=0; i < d; i++ ){
			
			days.push({
				'num': i+1,
				'app': 'Appointments: ' + i
			})
			count++

		}

		let d2 = 35-d;	
		for (let i=0; i < d2-1; i++){
			days.push({
				'num': '',
				'app': ''
			})
		}

		console.log(days)

		// axios.get(this.state.path + ':5000/appointment/m/' + this.state.year + '/' + this.state.month + '/' + dn)
		// 			.then((res) => {

						
		// 			})
		/*
		//Search the entire month for results
		//let cdate = ''
		//Foreach
			if (cdate === day.stime) [if the dates are the same]
				count++
			else if{}
			cdate = day.stime
			
			i = cdate.getDate()+firstdays-1

			days[i].app = count
			

		*/
		this.setState({ listdays : days})

	/*
		Get first day
		Get day name
		get offset
		run loop to fill the first slots with junk spaces
			Might be easy enough to fill the previous days
		run loop to fill actual days
		run loop to fill the final days with junk spaces

		
	*/
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

											<div className="square border" key={index} name={day.num} onClick={() => this.onClickDay(day.num)}>
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


							
				
							</div>{/*Week-1 End */}
							
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default main;
