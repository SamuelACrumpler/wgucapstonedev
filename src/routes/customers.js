import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';


class customers extends Component {

	constructor(props) {
		super(props);

		this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: 0,
			selected: '',
			cUser: '',
			uid: '',
			name: '',
			address: '',
			address2: '',
			city: '',
			zip: '',
			phone: '',
			edit: '',
			lbutton: 'Save',
			rbutton: 'Cancel',
			selCrud: 'option1',
			selectedName: '',
			selectedIndex: 0,
			disabled: false,
			header: 'Create New Customer',
			documents: [],
			error: '',
			test: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.handleCrudChange = this.handleCrudChange.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);




	}

	componentDidMount() {
		//this.checkLoginSession();
		console.log(localStorage.getItem("userType") === "")
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") === "Field Worker") {
			this.props.history.push('/')
		}
		this.setState({
			cUser: localStorage.getItem("currentUser"),
			uid: localStorage.getItem("userId")
		})
		this.getAllDocuments();
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

	inputReset() {
		this.setState({
			name: '',
			address: '',
			address2: '',
			city: '',
			zip: '',
			phone: ''
		});
	}

	inputFill(n, a, a2, c, z, p) {
		this.setState({
			name: n,
			address: a,
			address2: a2,
			city: c,
			zip: z,
			phone: p
		});
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


		axios.get(this.state.path + ':5000/customer/' + this.state.documents[i]._id)
			.then((res) => {
				console.log("t" + res.data.name)
				this.setState({ edit: res.data });
			}).finally(() => {
				console.log("t2" + this.state.edit.name)

				this.setState({
					name: this.state.edit.name,
					address: this.state.edit.address,
					address2: this.state.edit.address2,
					city: this.state.edit.city,
					zip: this.state.edit.zip,
					phone: this.state.edit.phone,
					selectedName: "customer" + i,
					selectedIndex: i,
					crudState: 2
				});

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

	onSubmit() {
		this.setState({ error: '' })
		try{
			if (this.state.name === '' && this.state.crudState !== 3) throw "ERROR: Name was left blank."
			if (this.state.address === '' && this.state.crudState !== 3) throw "ERROR: Address was left blank."
			if (this.state.city === '' && this.state.crudState !== 3) throw "ERROR: City was left blank."
			if (this.state.zip === '' && this.state.crudState !== 3) throw "ERROR: Zip was left blank."
			if (this.state.phone === '' && this.state.crudState !== 3) throw "ERROR: Phone number was left blank."
		}
		catch(err){
			this.setState({ error: err })
			if(document.getElementById("error") !== null){
				document.getElementById("error").classList.remove('d-none');
			}
			return;
		}


		//database section
		this.crudUse();

		//Success section
		if(document.getElementById("error") !== null){
			document.getElementById("error").classList.add('d-none');
		}

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
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	//[CRUD Functions] - User
	getAllDocuments() {
		axios.get('http://localhost:5000/customer/')
			.then(res => {
				this.setState({ documents: res.data });
			});
	}

	crudUse() {

		//this.state.user[this.state.selected]._password
		const uid = this.state.uid
		const name = this.state.name
		const address = this.state.address
		const address2 = this.state.address2
		const city = this.state.city
		const zip = this.state.zip
		const phone = this.state.phone
		let createdBy = this.state.cUser;
		const updatedBy = this.state.cUser;
		const udate = new Date();
		let cdate = new Date();
		switch (this.state.crudState) {
			case 0: //create
				//created then updated

				axios.post(this.state.path + ':5000/customer/', { uid, name, address, address2, city, zip, phone, createdBy, updatedBy, cdate, udate })
					.then((result) => {
					}).finally(() => {
						//call refresh function
						this.getAllDocuments();
					});

				break;
			case 1: //read

				axios.get(this.state.path + ':5000/customer/' + this.state.documents[this.state.selectedIndex]._id)
					.then((res) => {

						this.state({ edit: res.data });
					})
				break;
			case 2: //update

				axios.get(this.state.path + ':5000/customer/' + this.state.documents[this.state.selectedIndex]._id)
					.then((res) => {

						createdBy = res.data.createdBy;
						cdate = res.data.createdDate;
					}).finally(() => {

						axios.put(this.state.path + ':5000/customer/' + this.state.documents[this.state.selectedIndex]._id, {uid, name, address, address2, city, zip, phone, createdBy, updatedBy, cdate, udate })
							.then(() => {
							}).finally(() => {

								//call refresh func
								this.getAllDocuments();
							});
					});

				break;
			case 3: //delete
				axios.delete(this.state.path + ':5000/customer/' + this.state.documents[this.state.selectedIndex]._id)
					.then((result) => {

					}).finally(() => {
						//call refresh function
						this.getAllDocuments();

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

										<label key={'customer'+index} id={'lbluser' + index} className="btn btn-secondary w-100">
											<input type="radio" name="user" id={'user' + index} value={index} onClick={this.handleEditChange} />{document.name}
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
								cruUsers : {this.state.edit.name}
							</div>
							<div className="btn-group btn-group-toggle w-100" data-toggle="buttons" >
								<label id="lbloption1" className="btn btn-secondary active">
									<input type="radio" name="options" id="option1" value="option1"  onClick={this.handleCrudChange} /> New
								</label>

								<label id="lbloption2" className="btn btn-secondary">
									<input type="radio" name="options" id="option2" value="option2"  onClick={this.handleCrudChange} /> Save
								</label>
								<label id="lbloption3" className="btn btn-secondary">
									<input type="radio" name="options" id="option3" value="option3"  onClick={this.handleCrudChange} /> Delete
								</label>
							</div>



							<h5 className="text-center">{this.state.header}</h5>
							<div className="alert alert-danger d-none" id="error" role="alert">
								{this.state.error}
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Name</span>
								</div>
								<input type="text" name="name" value={this.state.name} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>


							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Address</span>
								</div>
								<input type="text" name="address" value={this.state.address} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Address 2</span>
								</div>
								<input type="text" name="address2" value={this.state.address2} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >City</span>
								</div>
								<input type="text" name="city" value={this.state.city} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Zip</span>
								</div>
								<input type="text" name="zip" value={this.state.zip} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Phone</span>
								</div>
								<input type="text" name="phone" value={this.state.phone} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>


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

export default customers;
