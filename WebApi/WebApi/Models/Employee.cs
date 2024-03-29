﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string dob { get; set; }
        [Required]
        public string doj { get; set; }
        [Required]
        public int salary { get; set; }
        [Required]
        public string email { get; set; }
    }
}
