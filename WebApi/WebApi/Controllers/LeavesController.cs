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
    public class LeavesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeavesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Leaves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leaves>>> GetLeaves()
        {
            return await _context.Leaves.ToListAsync();
        }

        // GET: api/Leaves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Leaves>> GetLeaves(int id)
        {
            var leaves = await _context.Leaves.FindAsync(id);

            if (leaves == null)
            {
                return NotFound();
            }

            return leaves;
        }

        // PUT: api/Leaves/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaves(int id, Leaves leaves)
        {
            if (id != leaves.id)
            {
                return BadRequest();
            }

            _context.Entry(leaves).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeavesExists(id))
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

        // POST: api/Leaves
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Leaves>> PostLeaves(Leaves leaves)
        {
            _context.Leaves.Add(leaves);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeaves", new { id = leaves.id }, leaves);
        }

        // DELETE: api/Leaves/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Leaves>> DeleteLeaves(int id)
        {
            var leaves = await _context.Leaves.FindAsync(id);
            if (leaves == null)
            {
                return NotFound();
            }

            _context.Leaves.Remove(leaves);
            await _context.SaveChangesAsync();

            return leaves;
        }

        private bool LeavesExists(int id)
        {
            return _context.Leaves.Any(e => e.id == id);
        }
    }
}
