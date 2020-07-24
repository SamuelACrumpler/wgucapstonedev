import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';


class users extends Component {

	constructor(props) {
		super(props);

		this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: 0,
			selected: '',
			cUser: '',
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
			test: []
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.handleCrudChange = this.handleCrudChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);




	}

	componentDidMount() {
		//this.checkLoginSession();
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") !== "Admin") {
			this.props.history.push('/')
		}

		this.setState({ cUser: localStorage.getItem("currentUser")})
		this.getAllUsers();
		console.log("user")
	}

	logout() {
		//reset login credidentals in local storage. Run checkLoginSession to boot user back to login page.
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
		console.log("current select:" + event.target.value)
		console.log("current select2:" + event.target.value)
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


		axios.get(this.state.path + ':5000/user/' + this.state.users[i]._id)
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
		axios.get(this.state.path + ':5000/user/u/TestDataDeleteMe')
					.then(res => {
						if (res.data !== null) {// as long as something is there
							check = res.data._id;
						} else {
							flag = true;
						}

					}).finally(() => { 
						if(flag === true){return}
						axios.delete(this.state.path + ':5000/user/' + check)
							.then(() => {

							}).finally(() => {
								//call refresh function
								this.getAllUsers();

							});
					})
		}

	handleCrudChange(event) {
		//consider clearing focus class from all options to solve that odd issue with save being stuck
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
			user: this.state.editUser.username,
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


		axios.get('http://localhost:5000/user/')
			.then(res => {
				this.setState({ users: res.data });
			});
	}

	crudUse() {

		const uid = ''
		const cuser = ''
		const username = this.state.user
		const type = this.state.type
		const password = this.state.pass
		const createdBy = this.state.cUser;
		const updatedBy = this.state.cUser;
		const udate = new Date();
		const cdate = new Date();
		console.log("test this mess: " + updatedBy)
		
		switch (this.state.crudState) {
			case 0: //create
				//created then updated
				let check;
				
				axios.get(this.state.path + ':5000/user/u/' + username)
					.then(res => {
						if (res.data !== null) {// as long as something is there
							check = res.data.username;
						}

					}).finally(() => {
						console.log('What is in here?: ' + check)
						if (check === username) {// as long as something is there
							this.setState({ error: "Username already exists." });
							document.getElementById("error").classList.remove('d-none');
							return;
						}
						
						axios.post(this.state.path + ':5000/user/', { username, type, password, createdBy, updatedBy, cdate, udate })
							.then((result) => {
							}).finally(() => {
								//call refresh function
								this.getAllUsers();
							});
					});

				
				break;
			case 1: //read

				axios.get(this.state.path + ':5000/user/' + this.state.users[this.state.selectedIndex]._id)
					.then((res) => {

						this.state({ editUser: res.data });
					})
				break;
			case 2: //update

				
				axios.put(this.state.path + ':5000/user/' + this.state.users[this.state.selectedIndex]._id, { username, type, password, createdBy, updatedBy, cdate, udate })
					.then(() => {
					}).finally(() => {
						//call refresh func
						this.getAllUsers();
					});
				break;
			case 3: //delete
				axios.delete(this.state.path + ':5000/user/' + this.state.users[this.state.selectedIndex]._id)
					.then((result) => {

					}).finally(() => {
						//call refresh function
						this.getAllUsers();

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



	render() {
		return (


			<div>
				<Navbar />
				<div className="container">
					<div className="row">
						<div className="col-lg-3 border d-none d-lg-block recent ">
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
							{
								this.state.test.map((user, index) => (


									<div className="row namelist" key={index}>
										<button type="button" className="btn btn-secondary btn-lg btn-block">{user}</button>
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

export default users;
