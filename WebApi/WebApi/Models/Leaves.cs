using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Leaves
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string leavename { get; set; }
        [Required]
        public int maximumleavesallowed { get; set; }
    }
}
