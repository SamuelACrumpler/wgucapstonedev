

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';

class search extends Component {
	constructor() {
        super();
        
        this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: '',
			selected: '',
            cUser: '',
            categories: ['Name/Title',  'Created by', 'Updated By','Created Date', 'Updated Date'],
            year: new Date().getFullYear(),
            search: '',
        
            tbluse: [],
            tblcus: [],
            tblapp: []
        }
        
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);


		//consider making navbar part of a state array based on users.
		//Map out the appropriate options
    }

    componentDidMount() {
		//this.checkLoginSession();
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") === "Field Worker") {
			this.props.history.push('/')
		}

	}

    onSubmit(){
        console.log(this.state.search)
        const q = this.state.search
        if(this.state.search = ''){
            return;
        }

        console.log('test: ' + this.state.path + ':5000/user/s/' + q)

        axios.get(this.state.path + ':5000/user/s/' + q)
        .then((res) => {
            this.setState({ tbluse: res.data });
            
        })

        axios.get(this.state.path + ':5000/customer/s/' + q)
        .then((res) => {
            this.setState({ tblcus: res.data });
        })

        axios.get(this.state.path + ':5000/appointment/s/' + q)
					.then((res) => {
                        this.setState({ tblapp: res.data });
                        console.log(res.data)
					})

    }

    onChange(event) {
		console.log("eventname: " + event.target.name);
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

    handleTypeChange(event){
        console.log(event.target.value)
        switch (event.target.value){
            case 'option1':
                document.getElementById("tbluse").classList.remove('d-none');
                document.getElementById("tblcus").classList.remove('d-none');
                document.getElementById("tblapp").classList.remove('d-none');
                break;
            case 'option2':
                document.getElementById("tbluse").classList.remove('d-none');
                document.getElementById("tblcus").classList.add('d-none');
                document.getElementById("tblapp").classList.add('d-none');
                break;
            case 'option3':
                document.getElementById("tbluse").classList.add('d-none');
                document.getElementById("tblcus").classList.remove('d-none');
                document.getElementById("tblapp").classList.add('d-none');
                break;
            case 'option4':
                document.getElementById("tbluse").classList.add('d-none');
                document.getElementById("tblcus").classList.add('d-none');
                document.getElementById("tblapp").classList.remove('d-none');
                break;
        }
    }



    render() {
		return (
			<div>
				<Navbar />
				<div className="container border">
                    <div className="row border">
                        <div className="col-lg">
                        <div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon3">Title</span>
								</div>
								<input type="text" name="search" value={this.state.search} onChange={this.onChange} disabled={this.state.disabled} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                                <button type="button" className="btn btn-primary m-0" onClick={this.onSubmit}>Submit</button>

							</div>
                            

                        </div>
                    </div>
                    <div className="row border">
                        <div className="col-lg">
                        <div className="btn-group btn-group-toggle w-100" data-toggle="buttons" >
								<label id="lbloption1" className="btn btn-secondary active">
									<input type="radio" name="options" id="option1" value="option1" onClick={this.handleTypeChange} /> All
								</label>

								<label id="lbloption2" className="btn btn-secondary">
									<input type="radio" name="options" id="option2" value="option2" onClick={this.handleTypeChange} /> Users
								</label>
								<label id="lbloption3" className="btn btn-secondary">
									<input type="radio" name="options" id="option3" value="option3" onClick={this.handleTypeChange} /> Customers
								</label>
                                <label id="lbloption3" className="btn btn-secondary">
									<input type="radio" name="options" id="option4" value="option4" onClick={this.handleTypeChange} /> Appointments
								</label>
							</div>

                        </div>
                    </div>
                    <div className="row border">
                        <div className="col-lg">
                        <table className="table table-striped table-fix">
                                <thead className="thead-dark">
                                    <tr>
                                    {
                                        this.state.categories.map((header, index) => (
                                        <th scope="col" key={index}>{header}</th>
                                            )
                                        )

                                    }

                                    </tr>

                                    
                                </thead>
                                
                                
                                
                                <tbody id="tbluse" className="empty-square all-apps "> 
                                    {
                                        this.state.tbluse.map((data, index) => (
                                            
                                        <tr>    
                                            <th scope='col' key={index}> {"User: " +data.username}</th>
                                            <td>{data.createdBy}</td>
                                            <td>{data.updatedBy}</td>
                                            <td>{data.updatedDate}</td>
                                            <td>{data.createdDate}</td>

                                        </tr>
                                            )
                                        )

                                    }
                                </tbody>

                                <tbody id="tblcus" className="empty-square all-apps "> 
                                    {
                                        this.state.tblcus.map((data, index) => (
                                        <tr>    
                                            <th scope='col' key={index}>Customer: {data.name}</th>
                                            <td>{data.createdBy}</td>
                                            <td>{data.updatedBy}</td>
                                            <td>{data.updatedDate}</td>
                                            <td>{data.createdDate}</td>

                                        </tr>
                                            )
                                        )

                                    }
                                </tbody>

                                <tbody id="tblapp" className="empty-square all-apps "> 
                                    {
                                        this.state.tblapp.map((data, index) => (
                                        <tr>    
                                            <th scope='col' key={index}>Appointment: {data.title}</th>
                                            <td>{data.createdBy}</td>
                                            <td>{data.updatedBy}</td>
                                            <td>{data.updatedDate}</td>
                                            <td>{data.createdDate}</td>

                                        </tr>
                                            )
                                        )

                                    }
                                </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default search; 