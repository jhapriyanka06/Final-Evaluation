using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Leave
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leave>>> Getleave()
        {
            return await _context.leave.ToListAsync();
        }

        // GET: api/Leave/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Leave>> GetLeave(int id)
        {
            var leave = await _context.leave.FindAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            return leave;
        }
        

        // PUT: api/Leave/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, Leave leave)
        {
            if (id != leave.id)
            {
                return BadRequest();
            }

            _context.Entry(leave).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Leave
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Leave>> PostLeave(Leave leave)
        {
            _context.leave.Add(leave);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeave", new { id = leave.id }, leave);
        }

        // DELETE: api/Leave/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Leave>> DeleteLeave(int id)
        {
            var leave = await _context.leave.FindAsync(id);
            if (leave == null)
            {
                return NotFound();
            }

            _context.leave.Remove(leave);
            await _context.SaveChangesAsync();

            return leave;
        }

        private bool LeaveExists(int id)
        {
            return _context.leave.Any(e => e.id == id);
        }
    }
}
