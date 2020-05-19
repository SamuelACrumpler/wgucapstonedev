import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../css/login.css';


class login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			updated_date: '',
			created_date: '',
			count: '',
			error: '',
			path: window.location.protocol + '//' + window.location.hostname
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}

	//First Run check. If there is no users. Add the following  admin/admin as user/pass

	componentDidMount() {
		//this.checkLoginSession();
		//this.dropCheck();
		this.checkUserCount();
	}


	onChange(event) {
		console.log("eventname: " + event.target.name);
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	onSubmit = (e) => {
		e.preventDefault();

		axios.get(this.state.path + ':5000/user/u/' + this.state.username)
			.then(res => {
				this.setState({ user: res.data });
				console.log(this.state.user); //pulls the user if it exists
			}).finally(() => {

				if (this.state.username === "") {
					this.setState({ error: 'Username is empty' });
					return;
				}
				if (this.state.password === "") {
					this.setState({ error: 'Password is empty' });
					return;
				}


				if (this.state.user === null) {
					this.setState({ error: 'Username or password is incorrect' });
					return;
				}
				else if (this.state.user.password !== this.state.password) {
					this.setState({ error: 'Username or password is incorrect' });
					return;
				}

				this.createLoginSession();

				this.props.history.push("/main")

			});

	}

	dropCheck() {
		axios.delete(this.state.path + ':5000/user/deleteall')
			.then(res => {
				console.log("Ihatethis: " + res);
			});

	};

	


	checkUserCount() {
		axios.get(this.state.path + ':5000/user/count')
			.then(res => {
				this.setState({ count: res.data });
				console.log("user count: " + this.state.count); //pulls the user if it exists
			}).finally(() => {
				if (this.state.count <= 0) {
					//logic here for creating user;

					this.setState({ updated_date: Date.now })
					this.setState({ created_date: Date.now })


					const username = "admin";
					const password = "admin";
					const updatedBy = "admin";
					const createdBy = "admin";
					const updatedDate = new Date();
					const createdDate = new Date();


					axios.post('http://localhost:5000/user', { username, password, updatedBy, createdBy, updatedDate, createdDate })
						.then((result) => {
							this.props.history.push("/")
						});
				}
			});
	}


	checkLoginSession() {
		if (localStorage.getItem("isLoggedIn") === 'true') {
			this.props.history.push("/main")
		}
	}

	createLoginSession() {
		console.log(this.state.user._id);
		localStorage.setItem("userId", this.state.user._id);
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
						<button className="btn btn-lg btn-primary btn-block">Sign in</button>
					</div>
				</div>
			</form>
		);
	}
}

export default login;
