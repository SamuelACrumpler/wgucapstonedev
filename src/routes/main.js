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
			monthName: '',
			users: [],
			listmonths: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"], 
			listdays: [],
			listapp: []
		};

		this.onClickDay = this.onClickDay.bind(this);

	

	}

	componentDidMount() {
		//this.checkLoginSession();

		
		let d = new Date();
		
		this.setState({
			year: d.getFullYear(),
			month: d.getMonth(),
			monthName: this.state.listmonths[d.getMonth()]
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
		let am = parseInt(m)+1
		console.log(y+"-"+am);
		
		console.log(y+"-"+m);
		let date = new Date((y+"-"+am+'-1'));
		console.log(date)
		console.log(date.getDay());
		//copy date, set to first day of month, use getday to get the right value.
		let firstday = date.getDay(); //pulls the day, sunday, monday, etc.
		let d = new Date(y, am, 0).getDate(); //Should get the number of days in the month
		let days = [];
		let count = 0;
		console.log("day of week: " + firstday)
		console.log((parseInt(m)-1))
		console.log("days: " + d)

		// {
		// 	num: '77',
		// 	app: 'Appointments: 66'
		// }
		for (let i = 0; i < firstday; i++){
			days.push({
				'num': '',
				'app': '',
				'color': 'no-day-square'
			})
			count++
			console.log(count)
		}

		for (let i=0; i < d; i++ ){
			
			days.push({
				'num': i+1,
				'app': '',
				'color': 'empty-square'
			})
			count++

		}

		let d2 = 42-d-firstday;	
		for (let i=0; i < d2; i++){
			days.push({
				'num': '',
				'app': '',
				'color': 'no-day-square'
			})
		}

		console.log(days)
		count = 0;
		let month = [];


		axios.get(this.state.path + ':5000/appointment/m/' + y + '/' + am + '/' + 1)
			.then((res) => {
				month = res.data
				console.log('----------------------------')
				console.log(res.data)
			}).finally(() => {
				let results ={};

				for (let i=0; i< month.length; i++) {
				// get the date
					let curDate = new Date(month[i].stime);
					let date = [curDate.getFullYear(),curDate.getMonth(),curDate.getDate()].join("-"); //creates yyyy-mm-dd
					results[date] = results[date] || 0; //if results doens't exist, 
					results[date]++;
					//result key is date, value is number
				}
				// you can always convert it into an array of objects, if you must
				for (let i in results) {
				if (results.hasOwnProperty(i)) {
					let tdate = new Date(i);
					let ind = tdate.getDate()+firstday-1;
					console.log(ind)
					days[ind].app = 'Appointments: ' + results[i];
					days[ind].color = 'filled-square'


					//rarr.push({date:i,counts:results[i]});
				}
				}
				this.setState({ listdays : days})

			})
		
		
			
	
	}

	changeMonth(val){
		let y = this.state.year; const m = parseInt(this.state.month)+1;
		console.log(y+'-'+m+'-1')
		let newdate = new Date(y+'-'+m+'-1')
		console.log(newdate)
		newdate.setMonth(newdate.getMonth()+val)
		

		let date = new Date(y+'-'+(m+val+1)+'-1');
		console.log('monthnum: ' + (m+val))
		console.log(newdate)
		this.setState(
			{
				year : newdate.getFullYear(),
				month : newdate.getMonth(),
				monthName : this.state.listmonths[newdate.getMonth()]
			}
		)
		this.loadDays(newdate.getFullYear(), newdate.getMonth())

	}


	//https://codepen.io/chrisdpratt/pen/OOybam
	//Configure the calendar header to disappear at a certain size, and only display the days
	//day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted
	//make the web friendly appointment display disappear, and the mobile friendly appear

	//appointment class that becomes other appointments for different purposes.

	render() {
		return (
			<div>
				<Navbar/>
				<div className="container">
					<div className="row p-0">
						<div className="col-lg-3 border recent p-0 no-day-square">
							<div className="app-list-border">
								<h3 className="app-list-border filled-square m-0">Title</h3>
								<div className="empty-square app-list-label">Customer: Bill Haverford</div>
								<div className="empty-square app-list-label">Contracter: Alan Damby</div>
								<div className="empty-square app-list-label">Address: 123 Easy Str</div>
								<div className="empty-square app-list-label">Timeframe: 8:00PM - 9:00PM</div>
							</div>
						</div>
						<div className="col-lg-9 border border-left-0 calendar ">
							<div className="row p-0">
								<div className="col-1 p-0">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeMonth(-1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
											<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
											<path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
										</svg>
									</button>
								</div>
								<div className="col-10">
								<h4 className="display-4 mb-4 text-center">{this.state.monthName + ' ' +this.state.year}</h4>
								</div>
								<div className="col-1 p-0">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeMonth(1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
											<path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
										</svg>
									</button>	
								</div>
							</div>
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

											<div className={day.color + " square border"} key={index} name={day.num} onClick={() => this.onClickDay(day.num)}>
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
