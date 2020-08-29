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
exports.AddEmployee = void 0;
var React = require("react");
var FetchEmployee_1 = require("./FetchEmployee");
var AddEmployee = /** @class */ (function (_super) {
    __extends(AddEmployee, _super);
    function AddEmployee(props) {
        var _this = _super.call(this, props) || this;
        // Handle submit event
        _this.handleSave = function (event) {
            event.preventDefault();
            var data = new FormData(event.target);
            // Put request for Edit employee
            if (_this.state.empData.employeeId) {
                fetch('api/Employee/Edit', {
                    method: 'PUT',
                    body: data
                }).then(function (res) { return res.json(); })
                    .then(function (data) {
                    _this.props.history.push('/fetchemployee');
                });
            }
            // Post request for Add employee
            else {
                fetch('api/Employee/Create', {
                    method: 'POST',
                    body: data,
                }).then(function (res) { return res.json(); })
                    .then(function (data) {
                    _this.props.history.push('/fetchemployee');
                });
            }
        };
        // Handle cancel event
        _this.handleCancel = function (event) {
            event.preventDefault();
            _this.props.history.push('/fetchemployee');
        };
        _this.state = { title: '', loading: true, cityList: [], empData: new FetchEmployee_1.EmployeeData };
        fetch('api/employee/GetCityList')
            .then(function (res) { return res.json(); })
            .then(function (data) {
            _this.setState({ cityList: data });
        });
        var empid = _this.props.match.params["empid"];
        //var empid = 0;
        // Set state for Edit employee
        if (empid > 0) {
            fetch('api/employee/Details/' + empid)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                _this.setState({ title: 'Edit', loading: false, empData: data });
            });
        }
        // Set state for Add employee
        else {
            _this.state = { title: 'Create', loading: false, cityList: [], empData: new FetchEmployee_1.EmployeeData };
        }
        return _this;
    }
    AddEmployee.prototype.render = function () {
        var contents = this.state.loading ?
            React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.cityList);
        return (React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Employee"),
            React.createElement("hr", null),
            contents));
    };
    // Returns the HTML Form to the render() method.  
    AddEmployee.prototype.renderCreateForm = function (cityList) {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "employeeId", value: this.state.empData.employeeId })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.empData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Gender" }, "Gender"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "gender", defaultValue: this.state.empData.gender, required: true },
                        React.createElement("option", { value: "" }, "-- Select Gender --"),
                        React.createElement("option", { value: "Male" }, "Male"),
                        React.createElement("option", { value: "Female" }, "Female")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Department" }, "Department"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "Department", defaultValue: this.state.empData.department, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "City" }, "City"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "City", defaultValue: this.state.empData.city, required: true },
                        React.createElement("option", { value: "" }, "-- Select City --"),
                        cityList.map(function (city) {
                            return React.createElement("option", { key: city.cityId, value: city.cityName }, city.cityName);
                        })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "Cancel"))));
    };
    return AddEmployee;
}(React.Component));
exports.AddEmployee = AddEmployee;
//# sourceMappingURL=AddEmployee.js.map