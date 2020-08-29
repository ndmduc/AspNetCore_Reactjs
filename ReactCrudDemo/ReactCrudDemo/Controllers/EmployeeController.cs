using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCrudDemo.Models;

namespace ReactCrudDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private EmployeeDataAccessLayer objEmployee = new EmployeeDataAccessLayer();

        [HttpGet]
        [Route("api/employee/index")]
        public IEnumerable<TblEmployee> Index()
        {
            return objEmployee.GetAllEmployees();
        }

        [HttpPost]
        [Route("api/Employee/Create")]
        public int Create(TblEmployee employee)
        {
            return objEmployee.AddEmployee(employee);
        }

        [HttpGet]
        [Route("api/Employee/Details/{id}")]
        public TblEmployee Details(int id)
        {
            return objEmployee.GetEmployeeData(id);
        }
        [HttpPut]
        [Route("api/Employee/Edit")]
        public int Edit(TblEmployee employee)
        {
            return objEmployee.UpdateEmployee(employee);
        }
        [HttpDelete]
        [Route("api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return objEmployee.DeleteEmployee(id);
        }
        [HttpGet]
        [Route("api/Employee/GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            return objEmployee.GetCities();
        }
    }
}
