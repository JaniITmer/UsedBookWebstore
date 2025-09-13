using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using UsedBookWebStore.Data;
using UsedBookWebStore.Models;

namespace UsedBookWebStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book newBook)
        {
            if (newBook == null || string.IsNullOrWhiteSpace(newBook.Title))
                return BadRequest("Invalid book data");

          
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            newBook.UserId = userId;

            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();

            return Ok(newBook);
        }
    }
}