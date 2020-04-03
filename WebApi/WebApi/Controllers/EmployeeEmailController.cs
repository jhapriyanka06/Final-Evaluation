using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeEmailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeEmailController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Employee/abc@gmail.com
        [HttpGet("{email}")]
        public ActionResult<Employee> GetEmployee(string email)
        {
            var employee = _context.employee.FirstOrDefault(employee => employee.email == email);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }
    }
}