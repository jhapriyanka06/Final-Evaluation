using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class EmployeeLeaveMapping
    {
        [Key]
        public int id { get; set; }
        
        public int employeeid { get; set; }
        
        public int leaveid { get; set; }
        
        public string leavestartdate { get; set; }
       
        public string leaveenddate { get; set; }
        public string status { get; set; }
    }
}
