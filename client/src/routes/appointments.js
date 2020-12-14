import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';
import Top from './../routes/top';


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
			type: 'rout',
			tasks: '',
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
			workers: [],
			custid: '',
			workerid: '',
			workername: '',
			selCust: '',
			selCustId: '',
			error: '',
			test2: 2,
			test: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSelect = this.onSelect.bind(this);

		this.onCancel = this.onCancel.bind(this);
		this.onChecked = this.onChecked.bind(this);


		this.handleCrudChange = this.handleCrudChange.bind(this);
		this.handleAppChange = this.handleAppChange.bind(this);
		this.handleCustomerChange = this.handleCustomerChange.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);





	}

	componentDidMount() {
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") === "Field Worker") {
			if(this.props.history !== undefined){this.props.history.push('/')}

		}

		this.getAllDocuments();
		this.getAllCustomers();
		this.getAllWorkers();

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
			workerid: '',
			workername: '',
			cid: '',
			custid: '',
			title: '',
			date: '',
			stime: '',
			etime: '',
			rate: '',
			supply: '',
			total: '',
			hours: '',
			tasks: '',
			notes: ''
		});
	}

	lzMinute(dt){
		return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
	}

	lzHour(dt){
		return (dt.getHours() < 10 ? '0' : '') + dt.getHours();
	}

	roundMinutes(date) {

		date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
		date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

		return date;
	}

	handleEditChange(event) {
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
		if(this.state.custid === undefined){
			document.getElementById('customer').selectedIndex = "0";
		}

		axios.get(this.state.path + ':5000/appointment/' + this.state.documents[i]._id)
			.then((res) => {

				this.setState({ edit: res.data });


			}).finally(() => {
				let sdate = new Date(this.state.edit.stime);
				let edate = new Date(this.state.edit.etime);
				let oldty = this.getTypeVal(this.state.type);
				this.setState({
					custid: this.state.edit.custid,
					workerid: this.state.edit.userid,
					title: this.state.edit.title,
					rate: this.state.edit.rate,
					supply: this.state.edit.supply,
					total: this.state.edit.total,
					hours: this.state.edit.hours,
					overlap: this.state.edit.overlap,
					date: this.state.edit.stime.substring(0,this.state.edit.stime.indexOf('T')),
					stime: this.lzHour(sdate) + ":" + this.lzMinute(sdate),
					etime: this.lzHour(edate) + ":" + this.lzMinute(edate),
					type: this.state.edit.type,
					tasks: this.state.edit.tasks,
					notes: this.state.edit.notes,
					selectedName: "appointment" + i,
					selectedIndex: i,
					crudState: 2
				});

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

		if (event.target.value === 'option1') {

			document.getElementById("error").classList.add('d-none');

			this.inputReset();

			this.setState({
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

		if (event.target.value === 'apptype1') {
			document.getElementById("tasks").classList.remove('d-none');
			document.getElementById("tasks-label").classList.remove('d-none');
			document.getElementById("rate").classList.remove('d-none');
			document.getElementById("supply").classList.add('d-none');
			document.getElementById("total").classList.remove('d-none');
			this.setState({type : 'rout' })
			

		} else if (event.target.value === 'apptype2') {
			document.getElementById("tasks").classList.add('d-none');
			document.getElementById("tasks-label").classList.add('d-none');
			document.getElementById("rate").classList.add('d-none');
			document.getElementById("supply").classList.add('d-none');
			document.getElementById("total").classList.add('d-none');


			this.setState({ type: 'cons' })

		} else {
			document.getElementById("tasks").classList.add('d-none');
			document.getElementById("tasks-label").classList.add('d-none');
			document.getElementById("rate").classList.remove('d-none');
			document.getElementById("supply").classList.remove('d-none');
			document.getElementById("total").classList.remove('d-none');


			this.setState({ type: 'spec' })
		}

	}

	handleCustomerChange(event) {
		this.setState({
			selCust: this.state.customers[event.target.value].name,
			custid: this.state.customers[event.target.value]._id,

		})

	}

	onChecked() {
		if (this.state.overlap === false)
			this.setState({ overlap: true })
		if (this.state.overlap === true)
			this.setState({ overlap: false })
	}

	onSubmit() {
		this.setState({ error: '' })

		const stime = new Date(this.state.date + " " + this.state.stime);
		const etime = new Date(this.state.date + " " + this.state.etime);
		
		let	opening = new Date(this.state.date + " " + "06:00");
		let	closing = new Date(this.state.date + " " + "20:00");
		let	s = new Date(this.state.date + " " + this.state.stime);
		let	e = new Date(this.state.date + " " + this.state.etime);

		try{
			if (this.state.title === '' && this.state.crudState !== 3) throw "ERROR: Title was left blank."
			if (this.state.custid === '' && this.state.crudState !== 3) throw "ERROR: Customer was not selected."
			if (this.state.workerid === '' && this.state.crudState !== 3) throw "ERROR: Field Worker was not selected."
			if (this.state.date === undefined && this.state.crudState !== 3) throw "ERROR: Date was not selected."
			if (this.state.stime === undefined && this.state.crudState !== 3) throw "ERROR: Start time was not selected."
			if (this.state.etime === undefined && this.state.crudState !== 3) throw "ERROR: End time was not selected."
			if (this.state.rate === '' && this.state.crudState !== 3 && this.state.type !== 'cons') throw "ERROR: Charge rate was left blank." 
			if (this.state.total === '' && this.state.crudState !== 3 && this.state.type !== 'cons') throw "ERROR: Total rate was left blank." 
			if (e.getHours() < s.getHours() && this.state.crudState !== 3) throw "ERROR: Ending time must be higher than starting time. "
			if (s.getHours() < opening.getHours() && this.state.crudState !== 3) throw "ERROR: Starting time is lower than the opening time."
			if (s.getHours() > closing.getHours() && this.state.crudState !== 3) throw "ERROR: Starting time is higher than the closing time."
			if (e.getHours() < opening.getHours() && this.state.crudState !== 3) throw "ERROR: Ending time is lower than the opening time."
			if (e.getHours() > closing.getHours() && this.state.crudState !== 3) throw "ERROR: Ending time is higher than the closing time."
		}
		catch(err){
			this.setState({ error: err })
			if(document.getElementById("error") !== null){
				document.getElementById("error").classList.remove('d-none');
			}
			return;
		}

	
		let eflag = false;
		axios.get(this.state.path + ':5000/appointment/d/' + stime.getFullYear() + '/' + (parseInt(stime.getMonth())+1) + '/' + stime.getDate())
			.then((res) => {
				res.data.forEach(app => {
					
					if(stime >= new Date(app.stime) && stime <= new Date(app.etime) && this.state.workerid === app.userid && this.state.crudState !== 3 && this.state.overlap === false){
						eflag = true;
						this.setState({ error: 'ERROR: Start time is overlapping with another appointment called: ' + app.title + "; Assigned to the currently selected worker"})
						document.getElementById("error").classList.remove('d-none');
						return; 
					}else if(etime >= new Date(app.stime) && etime <= new Date(app.etime) && this.state.workerid === app.userid && this.state.crudState !== 3 && this.state.overlap === false){
						eflag = true;
						this.setState({ error: 'ERROR: End time is overlapping with another appointment called: ' + app.title + "; Assigned to the currently selected worker"})
						document.getElementById("error").classList.remove('d-none');
						return;
					}
				});
				
				

			}).finally((res) => {
				if(eflag === true){return;}
				//database section
				this.crudUse();

				//Success section
				document.getElementById("error").classList.add('d-none');

				this.inputReset();

				this.setState({
					selectedName: ''
				});



			})

	}

	onCancel(event) {
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

	onSelect(event) {
		if(event.target.name === 'customer'){
			this.setState(
				{ custid : event.target.value}
			)
		} else if( event.target.name === 'worker'){


			this.setState(
				{ workerid : event.target.value
				}
			)
		}
	}

	onChange(event) {
	
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
		let s = '';
		let e = '';
		let opening = '';
		let closing = '';

		if (this.state.date !== '' && this.state.stime !== '' && this.state.stime !== '') {
			opening = new Date(this.state.date + " " + "06:00");
			closing = new Date(this.state.date + " " + "20:00");
			s = new Date(this.state.date + " " + this.state.stime);
			e = new Date(this.state.date + " " + this.state.etime);
			let e2 = (e.getHours()+e.getMinutes()/60);
			let s2 = (s.getHours()+s.getMinutes()/60); 

			if (e.getHours() < s.getHours()) {
				return;
			}

			document.getElementById("error").classList.add('d-none');
			if (this.state.supply !== '' && this.state.type === 'spec') {
				let v = this.state.rate * (e2 - s2) + parseFloat(this.state.supply);
				this.setState({ total: v.toFixed(2),
					hours: (e2-s2).toFixed(1)
				}) 
			} else {
				let v = this.state.rate * (e2 - s2);
				this.setState({ total: v.toFixed(2), 
					hours: (e2-s2).toFixed(2)
				})
			}
			
		}

	
	}

	//[CRUD Functions] - User
	getAllDocuments() {
		axios.get(this.state.path + ':5000/appointment/' )
			.then(res => {
				this.setState({ documents: res.data });
			}).finally(() => {
				if(localStorage.getItem("docid")){
					let i = this.state.documents.findIndex(i => i._id === localStorage.getItem("docid"))

					axios.get(this.state.path + ':5000/appointment/' + localStorage.getItem("docid"))
						.then((res) => {
		
							this.setState({ edit: res.data });
						}).finally(() =>{
							let sdate = new Date(this.state.edit.stime);
							let edate = new Date(this.state.edit.etime);
							let oldty = this.getTypeVal(this.state.type);
							this.setState({
								custid: this.state.edit.custid,
								workerid: this.state.edit.userid,
								title: this.state.edit.title,
								rate: this.state.edit.rate,
								supply: this.state.edit.supply,
								total: this.state.edit.total,
								hours: this.state.edit.hours,
								overlap: this.state.edit.overlap,
								date: this.state.edit.stime.substring(0,this.state.edit.stime.indexOf('T')),
								stime: this.lzHour(sdate) + ":" + this.lzMinute(sdate),
								etime: this.lzHour(edate) + ":" + this.lzMinute(edate),
								type: this.state.edit.type,
								tasks: this.state.edit.tasks,
								notes: this.state.edit.notes,
								selectedName: "appointment" + i,
								selectedIndex: i,
								crudState: 2
							});

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

							document.getElementById("lbloption"+1).classList.remove('focus');
							document.getElementById("lbloption"+1).classList.remove('active');
							document.getElementById("lbloption"+2).classList.add('focus');
							document.getElementById("lbloption"+2).classList.add('active');
						})
						localStorage.removeItem("docid")
					
				}

			});
	}

	getAllCustomers() {
		axios.get(this.state.path + ':5000/customer/')
			.then(res => {
				this.setState({ customers: res.data });
			});
	}

	getAllWorkers(){
		let tempworkers = []
		axios.get(this.state.path + ':5000/user/')
			.then(res => {
				
				res.data.forEach(user => {
					if(user.type === "Field Worker"){
						tempworkers.push(user)
					}
				});

				this.setState({ workers: tempworkers });
			});
	}


	crudUse() {


		const userid = this.state.workerid;
		const custid = this.state.custid
		const title = this.state.title
		const rate = this.state.rate
		const supply = this.state.supply
		const total = this.state.total
		const hours = this.state.hours
		const stime = new Date(this.state.date + " " + this.state.stime);
		const etime = new Date(this.state.date + " " + this.state.etime);
		const overlap = this.state.overlap
		const type = this.state.type
		const tasks = this.state.tasks
		const notes = this.state.notes
		let createdBy = localStorage.getItem("username")
		const updatedBy = localStorage.getItem("username")
		const updatedDate = new Date();
		let createdDate = new Date();

		switch (this.state.crudState) {
			case 0: //create
				//created then updated

				axios.post(this.state.path + ':5000/appointment/', { userid, custid, title, rate, supply, total, hours, overlap, type, tasks, notes, stime, etime, createdBy, updatedBy, createdDate, updatedDate })
					.then((result) => {
					}).finally(() => {
						//call refresh function
						this.getAllDocuments();
						this.getAllCustomers();
						this.getAllWorkers();
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
						createdDate = res.data.createdDate;
					}).finally(() => {

						axios.put(this.state.path + ':5000/appointment/' + this.state.documents[this.state.selectedIndex]._id, { userid, custid, title, rate, supply, total, hours, overlap, type, notes, stime, etime, createdBy, updatedBy, createdDate, updatedDate  })
							.then(() => {
							}).finally(() => {

								//call refresh func
								this.getAllDocuments();
								this.getAllCustomers();
								this.getAllWorkers();


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
						this.getAllWorkers();


					});
				break;

		}

	}



	
	render() {
		return (


			<div>
				<Navbar />
				<Top />
				<div className="container">
					<div className="row">
						<div className="col-lg-3 border d-none d-lg-block recent height-cap">
							<div className="row btn-group btn-group-toggle btn-group-special btn-group-vertical force-scroll" data-toggle="buttons">
								{
									this.state.documents.map((document, index) => (

										<label key={'customer' + index} id={'lblappointment' + index} className="btn btn-secondary w-100">
											<input type="radio" name="appointment" id={'appointment' + index} value={index} onClick={this.handleEditChange} />{document.title}
										</label>
									)
									)

								}
							</div>
						</div>
						<div className="col-lg-9 border input-col ">
						
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
								<select className="form-control" id="customer" name='customer' value={this.state.custid} disabled={this.state.disabled} onChange={this.onSelect}>
									<option value=''>Select a customer.</option>
									{
										this.state.customers.map((customers, index) => (
											<option key={index} value={customers._id}>{customers.name}</option>
										))
									}
								</select>

							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Field Worker</span>
								</div>
								<select className="form-control" id="worker" name='worker' value={this.state.workerid} disabled={this.state.disabled} onChange={this.onSelect}>
									<option value=''>Select a worker.</option>
									{
										this.state.workers.map((worker, index) => (
											<option key={index}  value={worker._id}>{worker.username}</option>
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
								<input type="checkbox" className="form-check-input" id="overlap" name="overlap" value={this.state.overlap} onClick={this.onChecked}/>
								<label className="form-check-label" htmlFor="exampleCheck1">Allow Overlap</label>
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

							<h5 id="tasks-label">Tasks to complete: (Separate with commas)</h5>
							<textarea className="form-control" aria-label="With textarea" onChange={this.onChange} id="tasks" name="tasks" value={this.state.tasks}></textarea>

							<h5>Notes</h5>
							<textarea className="form-control" aria-label="With textarea" onChange={this.onChange} name="notes" value={this.state.notes}></textarea>

							<button type="button" className="btn btn-primary" onClick={this.onSubmit}>{this.state.lbutton}</button> <button type="button" className="btn btn-primary" onClick={this.onCancel}>{this.state.rbutton}</button>
						</div>

						<div className="col border user d-lg-none ">
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
					</div>
				</div>
			</div>

		);
	}
}

export default appointments;
