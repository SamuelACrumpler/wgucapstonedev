import React, { Component } from 'react';
import { appointment, routapp, specapp} from './../js/classes/appointment';
import axios from 'axios';
import Navbar from './../routes/nav';

class reports extends Component {
	constructor() {
        super();
        
        this.state = {
			path: window.location.protocol + '//' + window.location.hostname,
			crudState: '',
			selected: '',
            cUser: '',
            categories: [],
            entries: [],
            year: new Date().getFullYear(),
            tblall: [],
            tblrou: [],
            tblcon: [],
            tblspe: [],
        
            listapps: [],
            listrout: [],
            listcons: [],
            listspec: []
        }
        
		this.handleTypeChange = this.handleTypeChange.bind(this);


    }
    
    componentDidMount(){
        if (localStorage.getItem("isLoggedIn") === 'false' || !localStorage.getItem("isLoggedIn") || localStorage.getItem("userType") !== "Admin") {
			this.props.history.push('/')
		}

        let all = ["Month", "Appointments", "Sum", "Average", "Routine Jobs", "Consultations", "Special Orders"]
        this.setState({
            categories: all
        })
        this.getAllApps(this.state.year)
    }


    handleTypeChange(event){
        
        switch (event.target.value){
            case "tblall":
                this.setState({
                    categories: ["Month", "Appointments", "Sum", "Average", "Routine Jobs", "Consultations", "Special Orders"]
                })
                document.getElementById("tblall").classList.remove('d-none');
                document.getElementById("tblrou").classList.add('d-none');
                document.getElementById("tblcon").classList.add('d-none');
                document.getElementById("tblspe").classList.add('d-none');
                   break;
            case "tblrou":
                this.setState({
                    categories: ["Month", "Appointments", "Sum", "Average", "Tasks", "Average Tasks"]
                   
                })
                document.getElementById("tblall").classList.add('d-none');
                document.getElementById("tblrou").classList.remove('d-none');
                document.getElementById("tblcon").classList.add('d-none');
                document.getElementById("tblspe").classList.add('d-none');
                break;
            case "tblcon":
                this.setState({
                    categories: ["Month", "Appointments"]
                   
                })
                document.getElementById("tblall").classList.add('d-none');
                document.getElementById("tblrou").classList.add('d-none');
                document.getElementById("tblcon").classList.remove('d-none');
                document.getElementById("tblspe").classList.add('d-none');
                break;
            case "tblspe":
                this.setState({
                    categories: ["Month", "Appointments", "Sum", "Average", "Supply Cost", "Average Supply Cost"]
                   
                })
                document.getElementById("tblall").classList.add('d-none');
                document.getElementById("tblrou").classList.add('d-none');
                document.getElementById("tblcon").classList.add('d-none');
                document.getElementById("tblspe").classList.remove('d-none');
                break;
        }

        
    }

    getCurrentYear(){
        axios.get('http://localhost:5000/appointment/y/' + this.state.year)
        .then(res => {
            res.data.forEach(app => {
                console.log("  ---" + new Date(app.stime).getFullYear())
                let newapp = {};
                switch (app.type){
                    case 'rout':
                        newapp = new routapp(app._id, app.userid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime, app.rate, app.total, app.tasks )
                        break;
                    case 'cons':
                        newapp = new appointment(app._id, app.usserid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime)
                        break;
                    case 'spec':
                        newapp = new specapp(app._id, app.usserid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime, app.rate, app.total, app.supply)
                        break;
                }


            
            });
         
            
        });
    }


    getAllApps(i){

        let routs = []
        let cons = []
        let specs = []



        axios.get('http://localhost:5000/appointment/y/' + i)
        .then(res => {
            res.data.forEach(app => {
                let newapp = {};
                switch (app.type){
                    case 'rout':
                        console.log(app.stime)
                        newapp = new routapp(app._id, app.userid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime, app.rate, app.total, app.tasks )
                        routs.push(newapp)
                        break;
                    case 'cons':
                        newapp = new appointment(app._id, app.usserid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime)
                        cons.push(newapp)
                        break;
                    case 'spec':
                        newapp = new specapp(app._id, app.usserid, app.custid, app.title, app.overlap, app.hours, app.type, app.notes, app.stime, app.etime, app.rate, app.total, app.supply)
                        specs.push(newapp)
                        break;
                }

             
            });
         
            this.setState({
                listrout: routs,
                listcons: cons,
                listspec: specs
            })
            
        }).finally(()=> {
            this.loadApps()

        });
            

    }

 

    changeYear(i){
        this.getAllApps(this.state.year+i);
        this.setState({
            year: this.state.year + i
        })
        console.log(this.state.year)
    }
    
    getMonthName(i){
        let name = ''
        switch (i){
            case 0:
                name = "Jan"
                break;
            case 1:
                name = "Feb"
                break;
            case 2:
                name = "Mar"
                break;
            case 3:
                name = "Apr"
                break;
            case 4:
                name = "May"
                break;
            case 5:
                name = "Jun"
                break;
            case 6:
                name = "Jul"
                break;
            case 7:
                name = "Aug"
                break;
            case 8:
                name = "Sep"
                break;
            case 9:
                name = "Oct"
                break;
            case 10:
                name = "Nov"
                break;
            case 11:
                name = "Dec"
                break;
        }

        return name;
    }

    

    loadApps(){
        let table = []
        let rou = []
        let con = []
        let spe = []

        for(let i = 0; i <= 11; i++){
            let obj = {}
            obj.count = 0;
            obj.sum = 0;
            obj.avg = 0;
            obj.rout = 0;
            obj.cons = 0;
            obj.spec = 0;

            let r = {}
            r.count = 0;
            r.sum = 0;
            r.avg = 0;
            r.tasks = 0;
            r.avgtasks = 0;

            let c = {}
            c.count = 0;

            let s = {}
            s.count = 0;
            s.sum = 0;
            s.avg = 0;
            s.sup = 0;
            s.avgsup = 0;

            table.push(obj)
            rou.push(r)
            con.push(c)
            spe.push(s)
            

        

        }
        this.state.listrout.forEach(app => {
            console.log(app._stime)
            console.log(app.indexMonth())
           table[app.indexMonth()].count++
           table[app.indexMonth()].rout++

           rou[app.indexMonth()].count++

           table[app.indexMonth()].sum = app._total + table[app.indexMonth()].sum

           rou[app.indexMonth()].sum = app._total + rou[app.indexMonth()].sum


           if(table[app.indexMonth()].sum > 0){
                table[app.indexMonth()].avg = (table[app.indexMonth()].sum/table[app.indexMonth()].count).toFixed(2)
           }

           if(rou[app.indexMonth()].sum > 0){
                rou[app.indexMonth()].avg = (rou[app.indexMonth()].sum/rou[app.indexMonth()].count).toFixed(2)
            }

            rou[app.indexMonth()].tasks = app.getTaskCount() + rou[app.indexMonth()].tasks
            if(rou[app.indexMonth()].tasks > 0){
                rou[app.indexMonth()].avgtasks = (rou[app.indexMonth()].tasks/rou[app.indexMonth()].count).toFixed(2)
            }


        });

        this.state.listcons.forEach(app => {
            table[app.indexMonth()].count++
            table[app.indexMonth()].cons++

            con[app.indexMonth()].count++


 
         });

        this.state.listspec.forEach(app => {
           table[app.indexMonth()].count++
           table[app.indexMonth()].spec++

           spe[app.indexMonth()].count++

           table[app.indexMonth()].sum = app._total + table[app.indexMonth()].sum

           spe[app.indexMonth()].sum = app._total + spe[app.indexMonth()].sum


           if(table[app.indexMonth()].sum > 0){
            table[app.indexMonth()].avg = (table[app.indexMonth()].sum/table[app.indexMonth()].count).toFixed(2)
           }

           if(spe[app.indexMonth()].sum > 0){
                spe[app.indexMonth()].avg = (spe[app.indexMonth()].sum/spe[app.indexMonth()].count).toFixed(2)
           }

           spe[app.indexMonth()].sup = app._supply + spe[app.indexMonth()].sup

           if(spe[app.indexMonth()].sup > 0){
            spe[app.indexMonth()].supavg = (spe[app.indexMonth()].sup/spe[app.indexMonth()].count).toFixed(2)
            }    




        });


        this.setState({ tblall : table})
        this.setState({ tblrou : rou})   
        this.setState({ tblcon : con})   
        this.setState({ tblspe : spe})   

        console.log(this.state.tblall)
    }


	render() {
		return (
			<div>
				<Navbar />
				<div className="container">
					<div className="row">
                        
                        <div className="col-lg border input-col p-0 h-100">
                        <div className="row">
								<div className="col-2 ">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeYear(-1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
											<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
											<path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
										</svg>
									</button>
								</div>
								<div className="col-8">
                                <h4 className="display-4 mb-4 text-center">Current Year: {this.state.year}</h4>
								</div>
								<div className="col-2 ">
									<button type="button" class="btn btn-secondary  w-100 h-100 m-0" onClick={() => this.changeYear(1)}>
										<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
											<path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
										</svg>
									</button>	
								</div>
							</div>
                            <div className="col-lg border  recent p-0">
                                <div className="btn-group btn-group-toggle w-100 w-100 m-0 " data-toggle="buttons">

                                    <label className="btn btn-secondary w-100 active">
                                        <input type="radio" name="type" id="allApps" value='tblall' onClick={this.handleTypeChange} /> All Appointments
                                    </label>
                                    <label className="btn btn-secondary w-100">
                                        <input type="radio" name="type" id="allLabor" value='tblrou' onClick={this.handleTypeChange} /> All Labor
                                    </label>
                                    <label className="btn btn-secondary w-100">
                                        <input type="radio" name="type" id="allCons" value='tblcon' onClick={this.handleTypeChange} /> All Consultations
                                    </label>
                                    <label className="btn btn-secondary w-100">
                                        <input type="radio" name="type" id="allSpec" value='tblspe' onClick={this.handleTypeChange} /> All Special Orders
                                    </label>
                
                                </div>
                            </div>
							<div className="col-lg ">

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
                                    <tbody id="tblall" className="empty-square all-apps"> 
                                        {
                                            this.state.tblall.map((data, index) => (
                                            <tr>    
                                                <th scope="col" key={index}>{this.getMonthName(index)}</th>
                                                <td>{data.count}</td>
                                                <td>{data.sum}</td>
                                                <td>{data.avg}</td>
                                                <td>{data.rout}</td>
                                                <td>{data.cons}</td>
                                                <td>{data.spec}</td>

                                            </tr>
                                                )
                                            )

                                        }
                                    </tbody>

                                    <tbody id="tblrou" className="empty-square all-apps d-none"> 
                                        {
                                            this.state.tblrou.map((data, index) => (
                                            <tr>    
                                                <th scope="col" key={index}>{this.getMonthName(index)}</th>
                                                <td>{data.count}</td>
                                                <td>{data.sum}</td>
                                                <td>{data.avg}</td>
                                                <td>{data.tasks}</td>
                                                <td>{data.avgtasks}</td>

                                            </tr>
                                                )
                                            )

                                        }
                                    </tbody>

                                    <tbody id="tblcon" className="empty-square all-apps d-none"> 
                                        {
                                            this.state.tblcon.map((data, index) => (
                                            <tr>    
                                                <th scope="col" key={index}>{this.getMonthName(index)}</th>
                                                <td>{data.count}</td>
                                            </tr>
                                                )
                                            )

                                        }
                                    </tbody>

                                    <tbody id="tblspe" className="empty-square all-apps d-none"> 
                                        {
                                            this.state.tblspe.map((data, index) => (
                                            <tr>    
                                                <th scope="col" key={index}>{this.getMonthName(index)}</th>
                                                <td>{data.count}</td>
                                                <td>{data.sum}</td>
                                                <td>{data.avg}</td>
                                                <td>{data.sup}</td>
                                                <td>{data.supavg}</td>

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
            </div>

		);
	}
}

export default reports;
