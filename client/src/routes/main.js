import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';
//import port from '../config';




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
			title: '',
			cust: '',
			worker: '',
			add: '',
			stime: '',
			etime: '',
			index: 0,
			users: [],
			listmonths: ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"], 
			listdays: [],
			listcust: [],
			listwork: [],
			listallapp: [],
			listapp: []
		};

		this.onClickDay = this.onClickDay.bind(this);

	}

	componentDidMount() {

		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn")) {
			this.props.history.push('/')
		}
	 	//let { port } = require('../config.js');
		
		
		console.log("This is your port test: " + process.env.MDBP)
		//console.log(port)
		let d = new Date();
		
		this.setState({
			year: d.getFullYear(),
			month: d.getMonth(),
			monthName: this.state.listmonths[d.getMonth()]
		})
		this.loadDays(d.getFullYear(), d.getMonth());
	}

	onClickDay(dn){
		let dc = this.state.year+""+this.state.month+""+dn
		console.log("onClickDay Clicked: " + dc)


		let t = [];
		this.state.listallapp.forEach(app => {
			let cd = new Date(app.stime)
			console.log("date: " +  app.stime)
			cd = (cd.getFullYear()+''+cd.getMonth()+''+cd.getDate())
			console.log("date string: " +  cd)

			if (cd == dc){
				t.push(app)
				console.log(app)
			}
			
		});
	
		
		if(t.length){
			this.setState({ listapp : t,
					title: t[0].title,
					cust : this.state.listcust[t[0].custid],
					worker : this.state.listwork[t[0].userid],
					add : this.state.listcust['add:'+t[0].custid],
					stime : t[0].stime,
					etime : t[0].etime,
					index : 0,
			})
		} else {
			
				this.setState({ listapp : [],
					title: '',
					cust : '',
					worker : '',
					add : '',
					stime : '',
					etime : '',
					index : 0,
			})
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

	loadDays(y, m){
		let am = parseInt(m)+1
		console.log(y+"-"+am);
		
		console.log(y+"-"+m);
		//use zulu
		//let date = new Date((y+"-"+am+'-1'));
		let date = new Date(y,m,1);
		console.log(date)
		console.log(date.getDay());
		let firstday = date.getDay(); 
		let d = new Date(y, am, 0).getDate();
		let days = [];
		let count = 0;
		console.log("day of week: " + firstday)
		console.log((parseInt(m)-1))
		console.log("days: " + d)


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
				this.setState({ listallapp: res.data})
				month = res.data
				
				

			}).finally(() => {
				let results ={};


				for (let i=0; i< month.length; i++) {

					let curDate = new Date(month[i].stime);
					console.log("curDate: " + curDate )
					// let date = [curDate.getFullYear(),curDate.getMonth(),curDate.getDate()].join("-"); //creates yyyy-mm-dd
					let date = [curDate.getFullYear(),curDate.getMonth(),curDate.getDate()].join("-"); //creates yyyy-mm-dd
					results[date] = results[date] || 0; //if results doesn't exist, 
					results[date]++;
				}
				for (let i in results) {
				if (results.hasOwnProperty(i)) {
					let split = i.split("-");
					let tdate = new Date(split[0],split[1],split[2]);
					let ind = tdate.getDate()+firstday-1;
					console.log(ind)
					days[ind].app = 'Appointments: ' + results[i];
					days[ind].color = 'filled-square'

				}
				}
				this.setState({ listdays : days})

				let custs = {};


				axios.get(this.state.path + ':5000/customer/')
					.then((res) => {
						res.data.forEach(cust => {
							custs[cust._id] = cust.name;
							custs["add:" + cust._id] = cust.address;
						});

						this.setState({ listcust : custs})
						console.log(this.state.listcust['5ecb538a9d80159f14099481'])
						
						
		
					})

				let workers = {}
				axios.get(this.state.path + ':5000/user/')
					.then((res) => {
						res.data.forEach(work => {
							if(work.type === 'Field Worker'){
								workers[work._id] = work.username;
							}
						});
						workers['null'] = 'null';

						this.setState({ listwork : workers})
						console.log(this.state.listwork)

						console.log(this.state.listwork['5ecb538a9d80159f14099481'])
						
						
		
					})
					

			})
	}

	changeMonth(val){
		let y = this.state.year; const m = parseInt(this.state.month);
		console.log(y+'-'+m+'-1')
		//let newdate = new Date(y+'-'+m+'-1')
		let newdate = new Date(y,m,1);

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
	
	changeApp(val){
		if(this.state.index+val < 0){return}
		if(this.state.index+val >= this.state.listapp.length ){return}
		console.log(this.state.listwork[this.state.listapp[this.state.index+val].userid])
		this.setState(
			{
				title: this.state.listapp[this.state.index+val].title,
				cust : this.state.listcust[this.state.listapp[this.state.index+val].custid],
				worker : this.state.listwork[this.state.listapp[this.state.index+val].userid],
				add : this.state.listcust['add:'+this.state.listapp[this.state.index+val].custid],
				stime : this.state.listapp[this.state.index+val].stime,
				etime : this.state.listapp[this.state.index+val].etime,
				index : this.state.index+val,

			}

		)

	}

	render() {
		return (
			<div>
				<Navbar/>
				<div className="container">
					<div className="row p-0">
						<div className="col-lg-3 border recent p-0 no-day-square d-none d-lg-block">
							{
								this.state.listapp.map((app, index) => (
									<div className="app-list-border">
										<h3 className="app-list-border filled-square m-0">Title: {app.title}</h3>
										<div className="empty-square app-list-label">Customer: {this.state.listcust[app.custid]}</div>
										<div className="empty-square app-list-label">Contracter: {this.state.listwork[app.userid]}</div>
										<div className="empty-square app-list-label">Address: {this.state.listcust['add:'+app.custid]}</div>
										<div className="empty-square app-list-label">Timeframe: {(new Date(app.stime)).toLocaleTimeString()} - {(new Date(app.etime)).toLocaleTimeString()}</div>
									</div>
									)
								)
								
							}
								
						</div>
						<div className="col-lg-3 border recent no-day-square d-md-block d-lg-none  ">
						<div className="row p-0">
								<div className="col-1 p-0">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeApp(-1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
											<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
											<path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
										</svg>
									</button>
								</div>
								<div className="col-10 p-0">
										<h3 className="app-list-border filled-square m-0">Title: {this.state.title}</h3>
										<div className="empty-square app-list-label">Customer: {this.state.cust}</div>
										<div className="empty-square app-list-label">Contracter: {this.state.worker}</div>
										<div className="empty-square app-list-label">Address: {this.state.add}</div>
										<div className="empty-square app-list-label">Timeframe: {(new Date(this.state.stime)).toLocaleTimeString()} - {(new Date(this.state.etime)).toLocaleTimeString()} </div>
								</div>
								<div className="col-1 p-0">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeApp(1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
											<path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
										</svg>
									</button>	
								</div>
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


							
				
							</div>
							
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default main;
