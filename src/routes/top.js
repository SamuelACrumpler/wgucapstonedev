import React, { Component } from 'react';
class Top extends Component {
	constructor(props) {
		super(props);


	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	

	handleScroll() {
		let top = document.getElementById("top");
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		  top.style.display = "block";
		} else {
		  top.style.display = "none";
		  
		}
	  }
	  
	  // When the user clicks on the button, scroll to the top of the document
 	toTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	  }


	render() {
		return (
			<button className="btn btn-primary d-none d-sm-block d-md-none btn-top" id="top" onClick={this.toTop}>
				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
				<path fill-rule="evenodd" d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"/>
				<path fill-rule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"/>
				</svg>
			</button>

		);
	}
}

export default Top;
