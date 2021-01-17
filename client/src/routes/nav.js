import React, { Component } from 'react';
class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			admin : [{title: 'Main', link: '/main'},{title: 'Users', link: '/users'},{title: 'Customers', link: '/customers'},{title: 'Appointments', link: '/appointments'},{title: 'Reports', link: '/reports'},{title: 'Search', link: '/search'}],
			dispatcher : [{title: 'Main', link: '/main'},{title: 'Customers', link: '/customers'},{title: 'Appointments', link: '/appointments'}],
			worker : [{title: 'Main', link: '/main'}],
			list : []

			

		}

	
	}

	componentDidMount() {
		if(localStorage.getItem('userType') === 'Admin'){
			this.setState({list : this.state.admin})
		} else if (localStorage.getItem('userType') === 'Dispatcher'){
			this.setState({list : this.state.dispatcher})
		} else {
			this.setState({list : this.state.worker})
		}
	}
	
	

	onLogout(){
		localStorage.setItem("isLoggedIn", false) 
		localStorage.setItem("userId", '') 
		localStorage.setItem("userType", '') 

	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-isley static-top">
				<div className="container">
					<a className="navbar-brand" href="#">Isley Scheduler</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">

							{
								this.state.list.map((list, index) => (
							

										<li className="nav-item" key={index}>
											<a className="nav-link" href={list.link}>{list.title}</a>
									
										</li>
									)
								)

							}

					
							<li className="nav-item">
								<a className="nav-link" href="" onClick={this.onLogout}>Log Out</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

		);
	}
}

export default Navbar;
