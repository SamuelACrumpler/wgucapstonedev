import React, { Component } from 'react';
import axios from 'axios';


class login extends Component {

	constructor(props) {
		super(props);
		let url = window.location.href;
        let arr = url.split("/");
        let result = arr[0] + "//" + arr[2]
		this.state = {
			username: '',
			password: '',
			updated_date: '',
			created_date: '',
			count: '',
			error: '',
			path: result
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}


	componentDidMount() {
		this.checkLoginSession();
		this.checkUserCount();
	}


	onChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	onSubmit(e) {
		e.preventDefault();

		axios.get(this.state.path + '/api/user/u/' + this.state.username)
			.then(res => {
				this.setState({ user: res.data });
			}).finally(() => {


				try{
					if (this.state.username === '' ) throw "ERROR: Username was left blank."
					if (this.state.password === '' ) throw "ERROR: Password was left blank."
					if (this.state.user === null ) throw "ERROR: Username or password is incorrect."
					if (this.state.user.password !== this.state.password ) throw "ERROR: Username or password is incorrect."
					
				}
				catch(err){
					this.setState({ error: err })
					if (document.getElementById("error") !== null) {
						document.getElementById("error").classList.remove('d-none');
					}
					return;
				}
				

				this.createLoginSession();

				this.props.history.push("/main")

			});
			

	}


	checkUserCount() {
		let count = 0;
		axios.get(this.state.path + '/api/user/count')
			.then(res => {
				this.setState({ count: res.data });
				count = res.data
			}).finally(() => {
				if (count <= 0) {
					//logic here for creating user;

					this.setState({ updated_date: Date.now })
					this.setState({ created_date: Date.now })


					const username = "Admin";
					const type = "Admin"
					const password = "admin";
					const updatedBy = "Admin";
					const createdBy = "Admin";
					const updatedDate = new Date();
					const createdDate = new Date();


					axios.post(this.state.path + '/api/user', { username, type, password, updatedBy, createdBy, updatedDate, createdDate })
						.then((result) => {
						});
				}
			});
	}


	checkLoginSession() {
		if (localStorage.getItem("isLoggedIn") === 'false'  || !localStorage.getItem("isLoggedIn")) {
			this.props.history.push("/")
		} else if(localStorage.getItem("isLoggedIn") === 'true'){
			this.props.history.push("/main")

		}
	}

	createLoginSession() {
		localStorage.setItem("userId", this.state.user._id);
		localStorage.setItem("username", this.state.user.username);
		localStorage.setItem("userType", this.state.user.type);
		localStorage.setItem("isLoggedIn", true);
	}


	render() {
		return (

			<form className="form-login border text-center full-center" onSubmit={this.onSubmit}>
				<p className="error">{this.state.error}</p>
				<div>
					<input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} className="form-control" />
				</div>

				<div>
					<input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" />

				</div>
				<div className="container">
					<div className="col">
						<button className="btn btn-lg btn-success btn-block">Sign in</button>
					</div>
				</div>
			</form>
		);
	}
}

export default login;
