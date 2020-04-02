using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Leave
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string leavename { get; set; }
        [Required]
        public string maximumleavesallowed { get; set; }
    }
}
