import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';
import Top from './../routes/top';



class users extends Component {

	constructor(props) {
		super(props);

		this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: 0,
			selected: '',
			user: '',
			type: 'Admin',
			pass: '',
			cPass: '',
			editUser: '',
			lbutton: 'Save',
			rbutton: 'Cancel',
			selCrud: 'option1',
			selectedName: '',
			selectedIndex: 0,
			disabled: false,
			header: 'Create New User',
			users: [],
			error: '',
			runtest: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.handleCrudChange = this.handleCrudChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);




	}

	componentDidMount() {
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") !== "Admin") {
			if(this.props.history !== undefined){this.props.history.push('/')}
		}

		

		this.getAllUsers();
	}


	crudRefresh(o,n) {
		document.getElementById("lbloption"+o).classList.remove('focus');
		document.getElementById("lbloption"+o).classList.remove('active');
		document.getElementById("lbloption"+n).classList.add('focus');
		document.getElementById("lbloption"+n).classList.add('active');
		this.setState({
			lbutton: 'Save',
			disabled: false
		});
		return;
	}


	handleUserChange(event) {
		let i = event.target.value;
	

		if (this.state.selCrud === 'option1') {
			this.crudRefresh(1, 2);
			this.setState({
				selCrud: 'option2'
			});
		}else if (this.state.selCrud === 'option3') {
			this.crudRefresh(3, 2);
			this.setState({
				selCrud: 'option2'
			});
		}

		//needs to read from database and put in the information 


		axios.get(this.state.path + '/api/user/' + this.state.users[i]._id)
			.then((res) => {

				this.setState({ editUser: res.data });
			}).finally(() => {

				this.setState({
					user: this.state.editUser.username,
					type: this.state.editUser.type,
					pass: '',
					cPass: '',
					selectedName: "user" + i,
					selectedIndex: i,
					crudState: 2
				});

			});

		
	}

	handleTestReset(){
		let check = ""
		let flag = false
		axios.get(this.state.path + '/api/user/u/TestDataDeleteMe')
					.then(res => {
						if (res.data !== null) {// as long as something is there
							check = res.data._id;
						} else {
							flag = true;
						}

					}).finally(() => { 
						if(flag === true){return}
						axios.delete(this.state.path + '/api/user/' + check)
							.then(() => {

							}).finally(() => {
								//call refresh function
								this.getAllUsers();

							});
					})
		}

	handleCrudChange(event) {
		console.log("current select:" + event.target.value)

		if (event.target.value === 'option1') {

			console.log('save time')
			document.getElementById("error").classList.add('d-none');

			

			this.setState({
				user: '',
				type: 'Admin',
				pass: '',
				cPass: '',
				lbutton: 'Save',
				selectedName : '',
				selectedIndex : -1,
				disabled: false,
				crudState: 0
			});

		} else if (event.target.value === 'option2') {
			if (this.state.selectedName === '') {
				this.setState({ error: 'ERROR: Please select user before attempting to edit a user.' })
				document.getElementById("error").classList.remove('d-none');
				this.crudRefresh(2,1)
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


		}else {
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
			if (this.state.user === '' && this.state.crudState !== 3) throw "ERROR: Username was left blank."
			if (this.state.pass === '' && this.state.crudState !== 3) throw "ERROR: Password was left blank."
			if (this.state.cPass === '' && this.state.crudState !== 3) throw "ERROR: Confirm Password was left blank."
			if (this.state.cPass !== this.state.pass && this.state.crudState !== 3) throw "ERROR: Passwords do not match."
		}
		catch(err){
			this.setState({ error: err })
			if (document.getElementById("error") !== null) {
				document.getElementById("error").classList.remove('d-none');
			}
			return;
		}
		

		//database section
		this.crudUse();

		//Success section
		if (document.getElementById("error") !== null) {
			document.getElementById("error").classList.add('d-none');
		}
		this.setState({
			user: '',
			type: this.state.editUser.type,
			pass: '',
			cPass: '',
			selectedName: this.state.editUser.username
		});


	}

	onCancel() {
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


		this.setState({
			user: '',
			type: 'Admin',
			pass: '',
			cPass: '',
			selectedName: ''
		});
		console.log(document.getElementById("error"))
		document.getElementById("error").classList.add('d-none');

	}

	onChange(event) {
		console.log("eventname: " + event.target.name);
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	//[CRUD Functions] - User
	getAllUsers() {
		//this.setState({ users: [] })


		axios.get(this.state.path + '/api/user/')
			.then(res => {
				this.setState({ users: res.data });
			}).finally(()=>{
				if(localStorage.getItem("docid")){
					console.log(this.state.users.findIndex(i => i._id === localStorage.getItem("docid")))
					let i = this.state.users.findIndex(i => i._id === localStorage.getItem("docid"))
					console.log(localStorage.getItem("docid"))
					axios.get(this.state.path + '/api/user/' + localStorage.getItem("docid"))
							.then((res) => {
								this.setState({ editUser: res.data });
							}).finally(()=>{
								this.setState({
									user: this.state.editUser.username,
									type: this.state.editUser.type,
									pass: '',
									cPass: '',
									selectedName: this.state.editUser.username,
									crudState: 2,
									selectedIndex: i
								});
								document.getElementById("lbloption"+1).classList.remove('focus');
								document.getElementById("lbloption"+1).classList.remove('active');
								document.getElementById("lbloption"+2).classList.add('focus');
								document.getElementById("lbloption"+2).classList.add('active');
						})
		
					localStorage.removeItem("docid")
		
				}
			});
	}

	crudUse() {

		const username = this.state.user
		const type = this.state.type
		const password = this.state.pass
		let createdBy = localStorage.getItem("username")
		const updatedBy = localStorage.getItem("username")
		const updatedDate = new Date();
		let createdDate = new Date();
		
		switch (this.state.crudState) {
			case 0: //create
				//created then updated
				let check;
				
				axios.get(this.state.path + '/api/user/u/' + username)
					.then(res => {
						if (res.data !== null) {// as long as something is there
							check = res.data.username;
						}

					}).finally(() => {
						if (check === username) {// as long as something is there
							this.setState({ error: "Username already exists." });
							document.getElementById("error").classList.remove('d-none');
							return;
						}
						
						axios.post(this.state.path + '/api/user/', { username, type, password, createdBy, updatedBy, createdDate, updatedDate })
							.then((result) => {
							}).finally(() => {
								//call refresh function
								this.getAllUsers();
							});
					});

				
				break;
			case 1: //read

				axios.get(this.state.path + '/api/user/' + this.state.users[this.state.selectedIndex]._id)
					.then((res) => {

						this.state({ editUser: res.data });
					})
				break;
			case 2: //update
					createdBy = this.state.editUser.createdBy
					createdDate = this.state.editUser.createdDate
				
				axios.put(this.state.path + '/api/user/' + this.state.users[this.state.selectedIndex]._id, { username, type, password, createdBy, updatedBy, createdDate, updatedDate })
					.then(() => {
					}).finally(() => {
						//call refresh func
						this.getAllUsers();
					});
				break;
			case 3: //delete
				axios.delete(this.state.path + '/api/user/' + this.state.users[this.state.selectedIndex]._id)
					.then((result) => {

					}).finally(() => {
						//call refresh function
						this.getAllUsers();

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
								this.state.users.map((user, index) => (
									
										<label id={'lbluser' + index} className="btn btn-secondary w-100">
											<input  type="radio" name="user" id={'user' + index} value={index} onClick={this.handleUserChange}  />
											<div>{user.username}</div>
									</label>

									
								)
								)

							}
							</div>
						</div>
						<div className="col-lg-9 border calendar ">
							
							<div className="btn-group btn-group-toggle w-100" data-toggle="buttons" >
								<label id="lbloption1" className="btn btn-secondary active">
									<input type="radio" name="options" id="option1" value="option1" checked={this.state.selCrud === 'option1'} onClick={this.handleCrudChange} /> New
								</label>
								
								<label id="lbloption2" className="btn btn-secondary">
									<input type="radio" name="options" id="option2" value="option2" checked={this.state.selCrud === 'option2'} onClick={this.handleCrudChange}/> Save
								</label>
								<label id="lbloption3" className="btn btn-secondary">
									<input type="radio" name="options" id="option3" value="option3" checked={this.state.selCrud === 'option3'} onClick={this.handleCrudChange}/> Delete
								</label>
							</div>


							
							<h5 className="text-center">{this.state.header}</h5>
							<div className="alert alert-danger d-none" id="error" role="alert">
								{this.state.error}
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Username</span>
								</div>
								<input type="text" name="user" value={this.state.user} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Permission Type</span>
								</div>
								<select className="form-control" name='type' value={this.state.type} onChange={this.onChange} disabled={this.state.disabled} id="type">
									<option>Admin</option>
									<option>Dispatcher</option>
									<option>Field Worker</option>
								</select>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Password</span>
								</div>
								<input type="password" name="pass" value={this.state.pass} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3" >Confirm Password</span>
								</div>
								<input type="password" name="cPass" value={this.state.cPass} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
							</div>
							<button type="button" className="btn btn-primary" onClick={this.onSubmit}>{this.state.lbutton}</button> <button type="button" className="btn btn-primary" onClick={this.onCancel}>{this.state.rbutton}</button>
							
							</div>
					
						<div className="col border user d-lg-none ">
							<div className="row btn-group btn-group-toggle btn-group-special btn-group-vertical" data-toggle="buttons">
								{
									this.state.users.map((user, index) => (
										
											<label id={'lbluser' + index} className="btn btn-secondary w-100">
												<input  type="radio" name="user" id={'user' + index} value={index} onClick={this.handleUserChange}  />
												<div>{user.username}</div>
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

export default users;
