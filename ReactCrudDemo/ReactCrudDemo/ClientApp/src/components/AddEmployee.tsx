﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';

interface AddEmployeeDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    empData: EmployeeData;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { title: '', loading: true, cityList: [], empData: new EmployeeData };

        fetch('api/employee/GetCityList')
            .then(res => res.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data })
            });

        var empid = this.props.match.params["empid"];
        //var empid = 0;

        // Set state for Edit employee
        if (empid > 0) {
            fetch('api/employee/Details/' + empid)
                .then(res => res.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({ title: 'Edit', loading: false, empData: data });
                });
        }

        // Set state for Add employee
        else {
            this.state = { title: 'Create', loading: false, cityList: [], empData: new EmployeeData };
        }
    }

    public render() {
        let contents = this.state.loading ?
             <p><em>Loading...</em></p>
                : this.renderCreateForm(this.state.cityList); 

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Employee</h3>
                <hr />
                {contents}
            </div>
        );
    }

    // Handle submit event
    private handleSave = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);

        // Put request for Edit employee
        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data
            }).then(res => res.json())
                .then(data => {
                    this.props.history.push('/fetchemployee');
                });
        }

        // Post request for Add employee
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => {
                    this.props.history.push('/fetchemployee');
                });
        }
    }

    // Handle cancel event
    private handleCancel = (event: any) => {
        event.preventDefault();
        this.props.history.push('/fetchemployee');
    }

    // Returns the HTML Form to the render() method.  
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    } 
}