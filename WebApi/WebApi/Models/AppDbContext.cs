﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public DbSet<Employee> employee { get; set; }
        public DbSet<Leave> leave { get; set; }
        public DbSet<EmployeeLeaveMapping> empleavemap { get; set; }
        public DbSet<Leaves> Leaves { get; set; }
    }
}
