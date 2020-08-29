﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState>{
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { empList: [], loading: true };

        fetch('api/employee/index')
            .then(response => response.json() as Promise<EmployeeData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading ?
            <p><em>Loading...</em></p> :
            this.renderEmployeeTable(this.state.empList);

        return (
            <div>
                <h1>Employee Data</h1>
                <p>This component demonstrates fetching Employee data from the server.</p>
                <p>
                    <Link to="/addemployee">Create New</Link>
                </p>
                {contents}
            </div>
        );
    }

    // Handle delete request from an employee
    private handleDelete = (id: number) => {
        if (!window.confirm('Do you want to delete employee with Id: ' + id)) {
            return;
        }

        fetch('api/employee/delete' + id, { method: 'delete' })
            .then(data => {
                this.setState({
                    empList: this.state.empList.filter((rec) => {
                        return (rec.employeeId !== id);
                    })
                });
            });
    }

    // Handle edit
    private handleEdit = (id: number) => {
        this.props.history.push('/employee/edit' + id);
    }

    // Returns the HTML table to the render() method.
    private renderEmployeeTable(empList: EmployeeData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>EmployeeId</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.employeeId}>
                        <td></td>
                        <td>{emp.employeeId}</td>
                        <td>{emp.name}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.employeeId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.employeeId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }  
}

export class EmployeeData {
    employeeId: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
}