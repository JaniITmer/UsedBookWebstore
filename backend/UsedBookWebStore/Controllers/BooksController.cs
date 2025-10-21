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
            var books = await _context.Books
        .Include(b => b.User)
        .Select(b => new
        {
            b.Id,
            b.Title,
            b.Author,
            b.Price,
            b.Currency,
            DisplayName = b.User != null ? b.User.DisplayName : "Unknown"
        })
        .ToListAsync();

            return Ok(books);
        }
        [HttpGet("mybooks")]
        public async Task<IActionResult> GetMyBooks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var myBooks = await _context.Books.Where(b => b.UserId == userId).ToListAsync();

            return Ok(myBooks);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _context.Books
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (book == null)
                return NotFound("Book not found");

            return Ok(new
            {
                book.Id,
                book.Title,
                book.Author,
                book.Price,
                book.Currency,
                book.Description,
                book.Language,
                DisplayName = book.User?.DisplayName
            });
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updateBook)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();


            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
            if (book == null) return NotFound("Book not found or you don't have permission to edit it.");

            book.Title = updateBook.Title;
            book.Description = updateBook.Description;
            book.Language = updateBook.Language;
            book.Author = updateBook.Author;
            book.Price = updateBook.Price;
            book.Currency = updateBook.Currency;
            await _context.SaveChangesAsync();
            return Ok(book);

        }
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] Book newBook)
        {
            if (newBook == null || string.IsNullOrWhiteSpace(newBook.Title) || newBook.Price < 0 || string.IsNullOrWhiteSpace(newBook.Description) || string.IsNullOrWhiteSpace(newBook.Language))
                return BadRequest("Invalid book data");


            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            newBook.UserId = userId;

            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();

            return Ok(newBook);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var book=await _context.Books.FirstOrDefaultAsync(b=>b.Id == id && b.UserId == userId);
            if (book == null)
                return NotFound("Book not found or you don't have permission to delete it.");

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Book deleted successfully" });
        }
    }
}