

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';

class search extends Component {
	constructor() {
        super();
        let url = window.location.href;
        let arr = url.split("/");
        let result = arr[0] + "//" + arr[2]
        this.state = {
			path: result,
			crudState: '',
			selected: '',
            cUser: '',
            categories: [{title:'Name/Title',class: "" },  {title:'Created by', class:"" }, {title: 'Updated By', class: ""}, {title: 'Created Date', class: ""}, {title: 'Updated Date', class: ""}],
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
    
    loadData(event){
    
        localStorage.setItem("docid",event.target.name)
    }

    onSubmit(){
        const q = this.state.search
        if(this.state.search = ''){
            return;
        }

        axios.get(this.state.path + '/api/user/s/' + q)
        .then((res) => {
            this.setState({ tbluse: res.data });
            
        })

        axios.get(this.state.path + '/api/customer/s/' + q)
        .then((res) => {
            this.setState({ tblcus: res.data });
        })

        axios.get(this.state.path + '/api/appointment/s/' + q)
					.then((res) => {
                        this.setState({ tblapp: res.data });
					})

    }

    onChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

    handleTypeChange(event){
        switch (event.target.value){
            case 'option1':
                document.getElementById("tbluse").classList.remove('d-none');
                document.getElementById("tblcus").classList.remove('d-none');
                document.getElementById("tblapp").classList.remove('d-none');
                document.getElementById("tblusem").classList.remove('d-none');
                document.getElementById("tblcusm").classList.remove('d-none');
                document.getElementById("tblappm").classList.remove('d-none');
                break;
            case 'option2':
                document.getElementById("tbluse").classList.remove('d-none');
                document.getElementById("tblcus").classList.add('d-none');
                document.getElementById("tblapp").classList.add('d-none');
                document.getElementById("tblusem").classList.remove('d-none');
                document.getElementById("tblcusm").classList.add('d-none');
                document.getElementById("tblappm").classList.add('d-none');
                break;
            case 'option3':
                document.getElementById("tbluse").classList.add('d-none');
                document.getElementById("tblcus").classList.remove('d-none');
                document.getElementById("tblapp").classList.add('d-none');
                document.getElementById("tblusem").classList.add('d-none');
                document.getElementById("tblcusm").classList.remove('d-none');
                document.getElementById("tblappm").classList.add('d-none');
                break;
            case 'option4':
                document.getElementById("tbluse").classList.add('d-none');
                document.getElementById("tblcus").classList.add('d-none');
                document.getElementById("tblapp").classList.remove('d-none');
                document.getElementById("tblusem").classList.add('d-none');
                document.getElementById("tblcusm").classList.add('d-none');
                document.getElementById("tblappm").classList.remove('d-none');
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
                                <button type="button" className="btn btn-success m-0" onClick={this.onSubmit}>Submit</button>

							</div>
                            

                        </div>
                    </div>
                    <div className="row border">
                        <div className="col-lg">
                        <div className="btn-group btn-group-toggle w-100" data-toggle="buttons" >
								<label id="lbloption1" className="btn btn-success active">
									<input type="radio" name="options" id="option1" value="option1" onClick={this.handleTypeChange} /> All
								</label>

								<label id="lbloption2" className="btn btn-success">
									<input type="radio" name="options" id="option2" value="option2" onClick={this.handleTypeChange} /> Users
								</label>
								<label id="lbloption3" className="btn btn-success">
									<input type="radio" name="options" id="option3" value="option3" onClick={this.handleTypeChange} /> Customers
								</label>
                                <label id="lbloption3" className="btn btn-success">
									<input type="radio" name="options" id="option4" value="option4" onClick={this.handleTypeChange} /> Appointments
								</label>
							</div>

                        </div>
                    </div>
                    <div className="row border">
                        <div className="col-lg d-none d-md-block">
                        <table className="table table-striped table-fix">
                                <thead className="thead-dark">
                                    <tr>
                                    {
                                        this.state.categories.map((header, index) => (
                                        <th scope="col" key={index} className={header.class}>{header.title}</th>
                                            )
                                        )

                                    }
                                    </tr>
                                </thead>
                                <tbody id="tbluse" className="empty-square all-apps "> 
                                    {
                                        this.state.tbluse.map((data, index) => (
                                            <tr>    
                                                <th scope='col' key={index}><a className="" href="/users" onClick={this.loadData} name={data._id}> {"User: " +data.username}</a></th>
                                                <td >{data.createdBy}</td>
                                                <td >{data.updatedBy}</td>
                                                <td >{data.createdDate}</td>
                                                <td >{data.updatedDate}</td>

                                            </tr>
                                            )
                                        )
                                    }
                                </tbody>

                                <tbody id="tblcus" className="empty-square all-apps "> 
                                    {
                                            this.state.tblcus.map((data, index) => (
                                            <tr>    
                                                <th scope='col' key={index}><a className="" href="/customers" onClick={this.loadData} name={data._id}> Customer: {data.name}</a></th>
                                                <td>{data.createdBy}</td>
                                                <td>{data.updatedBy}</td>
                                                <td>{data.createdDate}</td>
                                                <td>{data.updatedDate}</td>

                                            </tr>
                                            )
                                        )

                                    }
                                </tbody>

                                <tbody id="tblapp" className="empty-square all-apps "> 
                                    {
                                        this.state.tblapp.map((data, index) => (
                                        <tr>    
                                            <th scope='col' key={index}><a className="" href="/appointments" onClick={this.loadData} name={data._id}> Appointment: {data.title}</a></th>
                                            <td>{data.createdBy}</td>
                                            <td>{data.updatedBy}</td>
                                            <td>{data.createdDate}</td>
                                            <td>{data.updatedDate}</td>

                                        </tr>
                                            )
                                        )
                                    }
                                </tbody>
                        </table>
                        </div>
                        <div className="col-lg d-none d-sm-block d-md-none">
                        <table className="table table-striped table-fix">
                                <thead className="thead-dark">
                                    <tr>
                  
                                    <th scope="col">Name/Title</th>
                                    <th scope="col">CreatedBy</th>

                                    </tr>
                                </thead>
                                <tbody id="tblusem" className="empty-square all-apps "> 
                                    {
                                        this.state.tbluse.map((data, index) => (
                                            <tr>    
                                                <th scope='col' key={index}><a className="" href="/users" onClick={this.loadData} name={data._id}> {"User: " +data.username}</a></th>
                                                <td >{data.createdBy}</td>
                                     

                                            </tr>
                                            )
                                        )
                                    }
                                </tbody>

                                <tbody id="tblcusm" className="empty-square all-apps "> 
                                    {
                                            this.state.tblcus.map((data, index) => (
                                            <tr>    
                                                <th scope='col' key={index}><a className="" href="/customers" onClick={this.loadData} name={data._id}> Customer: {data.name}</a></th>
                                                <td>{data.createdBy}</td>
                                       
                                            </tr>
                                            )
                                        )

                                    }
                                </tbody>

                                <tbody id="tblappm" className="empty-square all-apps "> 
                                    {
                                        this.state.tblapp.map((data, index) => (
                                        <tr>    
                                            <th scope='col' key={index}>Appointment: {data.title}</th>
                                            <td>{data.createdBy}</td>
                                          

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