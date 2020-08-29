"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeData = exports.FetchEmployee = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var FetchEmployee = /** @class */ (function (_super) {
    __extends(FetchEmployee, _super);
    function FetchEmployee(props) {
        var _this = _super.call(this, props) || this;
        // Handle delete request from an employee
        _this.handleDelete = function (id) {
            if (!window.confirm('Do you want to delete employee with Id: ' + id)) {
                return;
            }
            fetch('api/employee/delete' + id, { method: 'delete' })
                .then(function (data) {
                _this.setState({
                    empList: _this.state.empList.filter(function (rec) {
                        return (rec.employeeId !== id);
                    })
                });
            });
        };
        // Handle edit
        _this.handleEdit = function (id) {
            _this.props.history.push('/employee/edit' + id);
        };
        _this.state = { empList: [], loading: true };
        fetch('api/employee/index')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ empList: data, loading: false });
        });
        return _this;
    }
    FetchEmployee.prototype.render = function () {
        var contents = this.state.loading ?
            React.createElement("p", null,
                React.createElement("em", null, "Loading...")) :
            this.renderEmployeeTable(this.state.empList);
        return (React.createElement("div", null,
            React.createElement("h1", null, "Employee Data"),
            React.createElement("p", null, "This component demonstrates fetching Employee data from the server."),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addemployee" }, "Create New")),
            contents));
    };
    // Returns the HTML table to the render() method.
    FetchEmployee.prototype.renderEmployeeTable = function (empList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "EmployeeId"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Gender"),
                    React.createElement("th", null, "Department"),
                    React.createElement("th", null, "City"))),
            React.createElement("tbody", null, empList.map(function (emp) {
                return React.createElement("tr", { key: emp.employeeId },
                    React.createElement("td", null),
                    React.createElement("td", null, emp.employeeId),
                    React.createElement("td", null, emp.name),
                    React.createElement("td", null, emp.gender),
                    React.createElement("td", null, emp.department),
                    React.createElement("td", null, emp.city),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(emp.employeeId); } }, "Edit"),
                        "  |",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(emp.employeeId); } }, "Delete")));
            })));
    };
    return FetchEmployee;
}(React.Component));
exports.FetchEmployee = FetchEmployee;
var EmployeeData = /** @class */ (function () {
    function EmployeeData() {
        this.employeeId = 0;
        this.name = "";
        this.gender = "";
        this.city = "";
        this.department = "";
    }
    return EmployeeData;
}());
exports.EmployeeData = EmployeeData;
//# sourceMappingURL=FetchEmployee.js.map