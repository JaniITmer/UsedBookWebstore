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
        [HttpGet("mybooks")]
        public async Task<IActionResult> GetMyBooks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) 
                return Unauthorized();

            var myBooks=await _context.Books.Where(b=> b.UserId == userId).ToListAsync();

            return Ok(myBooks);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateBook(int id, [FromBody]Book updateBook)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(userId == null) return Unauthorized();
            

            var  book=await _context.Books.FirstOrDefaultAsync(b=>b.Id == id&& b.UserId==userId);
            if (book == null) return NotFound("Book not found or you don't have permission to edit it.");

            book.Title = updateBook.Title;
            book.Author = updateBook.Author;
            book.Price = updateBook.Price;
            book.Currency = updateBook.Currency;
            await _context.SaveChangesAsync();
            return Ok(book);

        }
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book newBook)
        {
            if (newBook == null || string.IsNullOrWhiteSpace(newBook.Title) || newBook.Price<0)
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