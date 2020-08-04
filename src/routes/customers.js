import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './../routes/nav';
import Top from './../routes/top';



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
		if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") === "Field Worker") {
			if(this.props.history !== undefined){this.props.history.push('/')}

		}

		

		this.setState({
			cUser: localStorage.getItem("currentUser"),
			uid: localStorage.getItem("userId")
		})
		this.getAllDocuments();
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

		axios.get(this.state.path + ':5000/customer/' + this.state.documents[i]._id)
			.then((res) => {
				this.setState({ edit: res.data });
			}).finally(() => {

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
		const state = this.state
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	//[CRUD Functions] - User
	getAllDocuments() {
		axios.get(this.state.path + ':5000/customer/')
			.then(res => {
				this.setState({ documents: res.data });
			}).finally(() => {
				if(localStorage.getItem("docid")){
					let i = this.state.documents.findIndex(i => i._id === localStorage.getItem("docid"))

					axios.get(this.state.path + ':5000/customer/' + localStorage.getItem("docid"))
						.then((res) => {
		
							this.setState({ edit: res.data });
						}).finally(() =>{
							this.setState({
								name: this.state.edit.name,
								address: this.state.edit.address,
								address2: this.state.edit.address2,
								city: this.state.edit.city,
								zip: this.state.edit.zip,
								phone: this.state.edit.phone,
								crudState: 2,
								selectedName: "customer" + i,
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

		const uid = this.state.uid
		const name = this.state.name
		const address = this.state.address
		const address2 = this.state.address2
		const city = this.state.city
		const zip = this.state.zip
		const phone = this.state.phone
		let createdBy = localStorage.getItem("username")
		const updatedBy = localStorage.getItem("username")
		const updatedDate = new Date();
		let createdDate = new Date();
		switch (this.state.crudState) {
			case 0: //create
				//created then updated

				axios.post(this.state.path + ':5000/customer/', { uid, name, address, address2, city, zip, phone, createdBy, updatedBy, createdDate, updatedDate })
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
						createdDate = res.data.createdDate;
					}).finally(() => {

						axios.put(this.state.path + ':5000/customer/' + this.state.documents[this.state.selectedIndex]._id, {uid, name, address, address2, city, zip, phone, createdBy, updatedBy, createdDate, updatedDate })
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

										<label key={'customer'+index} id={'lblcustomer' + index} className="btn btn-secondary w-100">
											<input type="radio" name="customer" id={'customer' + index} value={index} onClick={this.handleEditChange} />{document.name}
										</label>
									)
									)

								}
							</div>
						</div>
						<div className="col-lg-9 border input-col ">
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
