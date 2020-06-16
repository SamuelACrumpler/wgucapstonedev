import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './../routes/nav';


class appointments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: 0,
			selected: '',
			cUser: '',
			uid: '',
			cid: '',
			title: '',
			rate: '',
			supply: '',
			total: '',
			hours: '',
			overlap: false,
			//isHourly: '',
			type: 'rout',
			notes: '',
			edit: '',
			lbutton: 'Save',
			rbutton: 'Cancel',
			selCrud: 'option1',
			selectedName: '',
			selectedIndex: 0,
			disabled: false,
			header: 'Create New Appointmennt',
			documents: [],
			customers: [],
			selCust: '',
			selCustId: '',
			error: '',
			test2: '',
			test: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onChecked = this.onChecked.bind(this);


		this.handleCrudChange = this.handleCrudChange.bind(this);
		this.handleAppChange = this.handleAppChange.bind(this);
		this.handleCustomerChange = this.handleCustomerChange.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);





	}

	componentDidMount() {
		//this.checkLoginSession();
		//this.setState({ test: ['admin', 'test', 'test', 'this is a really long name so get prepared for it!'] })
		this.setState({
			cUser: localStorage.getItem("currentUser"),
			uid: localStorage.getItem("userId")
		})
		this.getAllDocuments();
		this.getAllCustomers();

	}

	logout() {
		//reset login credidentals in local storage. Run checkLoginSession to boot user back to login page.
	}

	crudRefresh(o, n) {
		document.getElementById("lbloption" + o).classList.remove('focus');
		document.getElementById("lbloption" + o).classList.remove('active');
		document.getElementById("lbloption" + n).classList.add('focus');
		document.getElementById("lbloption" + n).classList.add('active');
		this.setState({
			lbutton: 'Save',
			disabled: false
		});
		return;
	}

	typeRefresh(o, n) {
		document.getElementById("lbltype" + o).classList.remove('focus');
		document.getElementById("lbltype" + o).classList.remove('active');
		document.getElementById("lbltype" + n).classList.add('focus');
		document.getElementById("lbltype" + n).classList.add('active');
	}

	getTypeVal(s) {
		let val = '';
		switch (s) {
			case "rout":
				val = 1;
				break;
			case "cons":
				val = 2;
				break;
			case "spec":
				val = 3;
				break;
		}
		return val;
	}
	inputReset() {
		this.setState({
			cid: '',
			title: '',
			rate: '',
			supply: '',
			total: '',
			hours: '',
			//isHourly: '',
			overlap: '',
			notes: ''
		});
	}

	inputFill(c,t,r,s,to,h,ty,d) {
		this.setState({
			cid: c,
			title: t,
			rate: r,
			supply: s,
			total: to,
			hours: h,
			//isHourly: i,
			type: ty,
			description: d,
		});
	}

	roundMinutes(date) {

		date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
		date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

		return date;
	}

	handleEditChange(event) {
		console.log("current select:" + event.target.value)
		console.log("current select2:" + event.target.value)
		let i = event.target.value;


		if (this.state.selCrud === 'option1') {
			this.crudRefresh(1, 2);
			this.setState({
				selCrud: 'option2'
			});
		} else if (this.state.selCrud === 'option3') {
			this.crudRefresh(3, 2);
			this.setState({
				selCrud: 'option2'
			});
		}

		//needs to read from database and put in the information 


		axios.get(this.state.path + ':5000/appointment/' + this.state.documents[i]._id)
			.then((res) => {

				this.setState({ edit: res.data });
			}).finally(() => {
				let sdate = new Date(this.state.edit.stime);
				let edate = new Date(this.state.edit.etime);
				let oldty = this.getTypeVal(this.state.type);
				this.setState({
					cid: this.state.edit.custid,
					title: this.state.edit.title,
					rate: this.state.edit.rate,
					supply: this.state.edit.supply,
					total: this.state.edit.total,
					hours: this.state.edit.hours,
					date: this.state.edit.stime.substring(0,this.state.edit.stime.indexOf('T')),
					stime: sdate.getHours() + ":" + sdate.getMinutes(),
					etime: edate.getHours() + ":" + edate.getMinutes(),
					//isHourly: this.state.edit.isHourly,
					type: this.state.edit.type,
					notes: this.state.edit.description,
					selectedName: "customer" + i,
					selectedIndex: i,
					crudState: 2
				});

				console.log("oldty: " + oldty);
				console.log("ty: " + this.state.type); 

				this.typeRefresh(oldty, this.getTypeVal(this.state.type))

				switch (this.state.type) {
					case "rout":
						document.getElementById("rate").classList.remove('d-none');
						document.getElementById("supply").classList.add('d-none');
						document.getElementById("total").classList.remove('d-none');
						break;
					case "cons":
						document.getElementById("rate").classList.add('d-none');
						document.getElementById("supply").classList.add('d-none');
						document.getElementById("total").classList.add('d-none');
						break;
					case "spec":
						document.getElementById("rate").classList.remove('d-none');
						document.getElementById("supply").classList.remove('d-none');
						document.getElementById("total").classList.remove('d-none');
						break;
				}

			});

		



	}

	handleCrudChange(event) {
		//consider clearing focus class from all options to solve that odd issue with save being stuck
		console.log("current select:" + event.target.value)

		if (event.target.value === 'option1') {

			console.log('save time')
			document.getElementById("error").classList.add('d-none');

			this.inputReset();

			this.setState({
				//name: '',
				//address: '',
				//address2: '',
				//city: '',
				//zip: '',
				//phone: '',
				lbutton: 'Save',
				selectedName: '',
				selectedIndex: -1,
				disabled: false,
				crudState: 0
			});

		} else if (event.target.value === 'option2') {
			if (this.state.selectedName === '') {
				this.setState({ error: 'ERROR: Please select user before attempting to edit a user.' })
				document.getElementById("error").classList.remove('d-none');
				this.crudRefresh(2, 1)
				this.setState({
					lbutton: 'Save',
					disabled: false,
					crudState: 0
				});
				return;
			}

			console.log('save time')
			this.setState({
				lbutton: 'Save',
				disabled: false,
				crudState: 2
			});


		} else {
			if (this.state.selectedName === '') {
				this.setState({ error: 'ERROR: Please select user before attempting to delete a user.' })
				document.getElementById("error").classList.remove('d-none');
				this.crudRefresh(3, 1)
				this.setState({
					lbutton: 'Save',
					disabled: false,
					crudState: 0
				});
				return;
			}

			console.log('sdel time')
			this.setState({
				lbutton: 'Delete',
				disabled: true,
				crudState: 3
			});

		}

		this.setState({
			selCrud: event.target.value
		});
	}

	handleAppChange(event) {
		//consider clearing focus class from all options to solve that odd issue with save being stuck
		console.log("current select:" + event.target.value)

		if (event.target.value === 'apptype1') {

			document.getElementById("rate").classList.remove('d-none');
			document.getElementById("supply").classList.add('d-none');
			document.getElementById("total").classList.remove('d-none');
			this.setState({type : 'rout' })
			

		} else if (event.target.value === 'apptype2') {
			document.getElementById("rate").classList.add('d-none');
			document.getElementById("supply").classList.add('d-none');
			document.getElementById("total").classList.add('d-none');


			this.setState({ type: 'cons' })

		} else {
			document.getElementById("rate").classList.remove('d-none');
			document.getElementById("supply").classList.remove('d-none');
			document.getElementById("total").classList.remove('d-none');


			this.setState({ type: 'spec' })
		}

	}

	handleCustomerChange(event) {
		console.log("current select:" + event.target.name)
		this.setState({
			selCust: this.state.customers[event.target.value].name,
			selCustId: this.state.customers[event.target.value]._id,

		})

	}

	onChecked() {
		console.log("cheked: " + this.state.overlap)
		if (this.state.overlap === false)
			this.setState({ overlap: true })
		if (this.state.overlap === true)
			this.setState({ overlap: false })
	}

	onSubmit() {
		console.log("Submit")
		this.setState({ error: '' })

		// Check username database first for similar username
		if (this.state.title === '' && this.state.crudState !== 3) {
			this.setState({ error: 'ERROR: Title was left blank.' })
			document.getElementById("error").classList.remove('d-none');

			return;
		} else if (this.state.date === undefined && this.state.crudState !== 3) {
			this.setState({ error: 'ERROR: Date was not selected.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		} else if (this.state.stime === undefined && this.state.crudState !== 3) {
			this.setState({ error: 'ERROR: Start time was not selected.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		} else if (this.state.etime === undefined && this.state.crudState !== 3) {
			this.setState({ error: 'ERROR: End time was not selected.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		}   else if (this.state.rate === '' && this.state.crudState !== 3 && this.state.type !== 'cons' ) {
			this.setState({ error: 'ERROR: Chaarge rate was left blank.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		} else if (this.state.rate === '' && this.state.crudState !== 3 && this.state.type === 'spec') {
			this.setState({ error: 'ERROR: Chaarge rate was left blank.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		} else if (this.state.total === '' && this.state.crudState !== 3 && this.state.type !== 'cons') {
			this.setState({ error: 'ERROR: Total was left blank.' })
			document.getElementById("error").classList.remove('d-none');
			return;

		}

		//Pull all appointments for the day, and  check if they overlap

		/// Total = Charge Rate*(Hours(roundedup))

		//database section
		this.crudUse();

		//Success section
		document.getElementById("error").classList.add('d-none');

		this.inputReset();

		this.setState({
			selectedName: this.state.edit.name
		});


	}

	onCancel(event) {
		console.log("Cancel called: lbl" + this.state.selectedName);
		if (this.state.selectedName !== '') {
			document.getElementById("lbl" + this.state.selectedName).classList.remove('focus');
			document.getElementById("lbl" + this.state.selectedName).classList.remove('active');
		}

		if (this.state.selCrud === 'option2') {
			document.getElementById("error").classList.remove('d-none');
			this.crudRefresh(2, 1);
		} else if (this.state.selCrud === 'option3') {
			document.getElementById("error").classList.remove('d-none');
			this.crudRefresh(3, 1);
			this.setState({
				lbutton: 'Save',
				disabled: false
			});
		}


		this.inputReset();


		this.setState({
			selectedName: ''
		});

		document.getElementById("error").classList.add('d-none');

	}

	onChange(event) {
		console.log("eventname: " + event.target.name);
		console.log("eventvalue: " + event.target.value);
	
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
		return;
		let s = '';
		let e = '';
		if (this.state.date !== '' && this.state.stime !== '') {
			//this.setState({ stime : new Date(this.state.date + " " + this.state.stime) })
			//s = new Date(this.state.date + " " + this.state.stime);
		}
		
		if (this.state.date !== '' && this.state.etime !== '') {
			//this.setState({ etime: new Date(this.state.date + " " + this.state.etime) })
			//e = new Date(this.state.date + " " + this.state.etime);

		}

		if (this.state.date !== '' && this.state.stime !== '' && this.state.stime !== '') {
			s = new Date(this.state.date + " " + this.state.stime);
			e = new Date(this.state.date + " " + this.state.etime);
			if (e.getHours() < s.getHours()) {
				this.setState({ error: 'ERROR: Ending time must be higher than starting time. ' })
				document.getElementById("error").classList.remove('d-none');
				return;
			}
			document.getElementById("error").classList.add('d-none');
			if (this.state.supply !== '' && this.state.type === 'spec') {
				let v = this.state.rate * (e.getHours() - s.getHours()) + parseFloat(this.state.supply);
				this.setState({ total: v }) //should round these numbers for the total
			} else {
				let v = this.state.rate * (e.getHours() - s.getHours());
				this.setState({ total: v })
			}
			
		}

		

		//if (this.state.stime !== '' && this.state.etime !== '' && this.state.rate !== '') {
		//	//error check. etime must be higher than stime
		//	//let s = this.roundMinutes(this.state.stime)
		//	//let e = this.roundMinutes(this.state.etime)
		//	if (e.getHours() > s.getHours()) { //end hours greater than start hours
		//		let v = this.state.rate * (e.getHours() - s.getHours());
		//		this.setState({ total: v })
		//	} else if (e.getHours() < s.getHours()) {
				

		//	}
		//	//round stime
		//	//round etime
			
		//}
	}

	//[CRUD Functions] - User
	getAllDocuments() {
		axios.get('http://localhost:5000/appointment/')
			.then(res => {
				this.setState({ documents: res.data });
			});
	}

	getAllCustomers() {
		axios.get('http://localhost:5000/customer/')
			.then(res => {
				this.setState({ customers: res.data });
			});
	}


	crudUse() {

		//this.state.user[this.state.selected]._password

		
		const uid = this.state.uid
		const cuid = this.state.cuid
		const title = this.state.title
		const rate = this.state.rate
		const supply = this.state.supply
		const total = this.state.total
		const hours = this.state.hours
		//const isHourly = this.state.isHourly
		const stime = new Date(this.state.date + " " + this.state.stime);
		const etime = new Date(this.state.date + " " + this.state.etime);
		const overlap = this.state.overlap
		const type = this.state.type
		const notes = this.state.notes
		let createdBy = this.state.cUser;
		const updatedBy = this.state.cUser;
		const udate = new Date();
		let cdate = new Date();
		console.log("test this mess: " + updatedBy)

		switch (this.state.crudState) {
			case 0: //create
				//created then updated

				axios.post(this.state.path + ':5000/appointment/', { uid, cuid, title, rate, supply, total, hours, overlap, type, notes, stime, etime, createdBy, updatedBy, cdate, udate })
					.then((result) => {
					}).finally(() => {
						//call refresh function
						this.getAllDocuments();
						this.getAllCustomers();
					});

				break;
			case 1: //read

				axios.get(this.state.path + ':5000/appointment/' + this.state.documents[this.state.selectedIndex]._id)
					.then((res) => {

						this.state({ edit: res.data });
					})
				break;
			case 2: //update

				axios.get(this.state.path + ':5000/appointment/' + this.state.documents[this.state.selectedIndex]._id)
					.then((res) => {

						createdBy = res.data.createdBy;
						cdate = res.data.createdDate;
					}).finally(() => {

						axios.put(this.state.path + ':5000/appointment/' + this.state.documents[this.state.selectedIndex]._id, { uid, cuid, title, rate, supply, total, hours, overlap, type, notes, stime, etime, createdBy, updatedBy, cdate, udate  })
							.then(() => {
							}).finally(() => {

								//call refresh func
								this.getAllDocuments();
								this.getAllCustomers();

							});
					});

				break;
			case 3: //delete
				axios.delete(this.state.path + ':5000/appointment/' + this.state.documents[this.state.selectedIndex]._id)
					.then((result) => {

					}).finally(() => {
						//call refresh function
						this.getAllDocuments();
						this.getAllCustomers();

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


	// foreach in getusers
	// put in array
	// map array


	// Create submit form
	// Create error section
	// Write save
	// Write read
	// Write edit
	// Write delete

	render() {
		return (


			<div>
				<Navbar />
				<div className="container">
					<div className="row">
						<div className="col-lg-3 border d-none d-lg-block recent ">
							<div className="row btn-group btn-group-toggle btn-group-special btn-group-vertical" data-toggle="buttons">
								{
									this.state.documents.map((document, index) => (

										<label key={'customer' + index} id={'lbluser' + index} className="btn btn-secondary w-100">
											<input type="radio" name="user" id={'user' + index} value={index} onClick={this.handleEditChange} />{document.title}
										</label>
									)
									)

								}
							</div>
						</div>
						<div className="col-lg-9 border input-col ">
							<div>
								Selected option is : {this.state.selCrud}
							</div>
							<div>
								Selected user is : {this.state.selectedName}
							</div>
							<div>
								crudstate : {this.state.crudState}
							</div>
							<div>
								cruUsers : {this.state.cUser}
							</div>
							<div>
								date : {this.state.date+""}
							</div>
							<div>
								stime : {this.state.stime+""}
							</div>
							<div>
								overlap : {this.state.overlap+""}
							</div>
							<div>
								type : {this.state.type + ""}
							</div>
							<div>
								type : {this.state.test2 + ""}
							</div>
							<div className="btn-group btn-group-toggle w-100" data-toggle="buttons" >
								<label id="lbloption1" className="btn btn-secondary active">
									<input type="radio" name="options" id="option1" value="option1" onClick={this.handleCrudChange} /> New
								</label>

								<label id="lbloption2" className="btn btn-secondary">
									<input type="radio" name="options" id="option2" value="option2" onClick={this.handleCrudChange} /> Save
								</label>
								<label id="lbloption3" className="btn btn-secondary">
									<input type="radio" name="options" id="option3" value="option3" onClick={this.handleCrudChange} /> Delete
								</label>
							</div>



							<h5 className="text-center">{this.state.header}</h5>
							<div className="alert alert-danger d-none" id="error" role="alert">
								{this.state.error}
							</div>
							

							<div className="btn-group btn-group-toggle w-100 mb-4" data-toggle="buttons" >
								<label id="lbltype1" className="btn btn-secondary active focus">
									<input type="radio" name="apptype" id="apptype1" value="apptype1" onClick={this.handleAppChange} /> Labor
								</label>

								

								<label id="lbltype2" className="btn btn-secondary">
									<input type="radio" name="apptype" id="apptype2" value="apptype2" onClick={this.handleAppChange} /> Consultation
								</label>
								<label id="lbltype3" className="btn btn-secondary">
									<input type="radio" name="apptype" id="apptype3" value="apptype3" onClick={this.handleAppChange} /> Special Order
								</label>
							</div>


							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Title</span>
								</div>
								<input type="text" name="title" value={this.state.title} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>


							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Customer</span>
								</div>
								<select className="form-control" id="rating" name='rating' value={this.state.test2} onChange={this.onChange}>
									{
										this.state.customers.map((customers, index) => (
											<option key={'customer' + index}>{customers.name}</option>
										))



									}
								</select>

							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Date</span>
								</div>
								<input type="date" name="date" value={this.state.date} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Start Time</span>
								</div>
								<input type="time" name="stime" value={this.state.stime} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />

								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >End Time</span>
								</div>
								<input type="time" name="etime" value={this.state.etime} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="form-check">
								<input type="checkbox" class="form-check-input" id="overlap" name="overlap" value={this.state.overlap} onClick={this.onChecked}/>
									<label class="form-check-label" htmlFor="exampleCheck1">Allow Overlap</label>
							</div>
							<div className="input-group mb-3" id="rate">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Charge Rate</span>
								</div>
								<input type="number" name="rate" step={1} value={this.state.rate} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3 d-none" id="supply">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Supply Charge</span>
								</div>
								<input type="number" name="supply" value={this.state.supply} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3" id="total">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Total Charge</span>
								</div>
								<input type="number" name="total" value={this.state.total} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<h5>Notes</h5>
							<textarea class="form-control" aria-label="With textarea" onChange={this.onChange} name="notes" value={this.state.notes}></textarea>

							<button type="button" className="btn btn-primary" onClick={this.onSubmit}>{this.state.lbutton}</button> <button type="button" className="btn btn-primary" onClick={this.onCancel}>{this.state.rbutton}</button>
						</div>

						<div className="col border user d-lg-none ">
							{
								this.state.documents.map((document, index) => (


									<div className="row namelist" key={index}>
										<button type="button" className="btn btn-secondary btn-lg btn-block">{document.name}</button>
									</div>
								)
								)

							}

						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default appointments;
