using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedBookWebStore.Models;

namespace UsedBookWebStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class BooksController : ControllerBase
    {
        
        private static readonly List<Book> Books = new List<Book>
        {
            new Book { Id = 1, Title = "1984", Author = "George Orwell" },
            new Book { Id = 2, Title = "Brave New World", Author = "Aldous Huxley" },
            new Book { Id = 3, Title = "Fahrenheit 451", Author = "Ray Bradbury" }
        };

        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(Books);
        }
    }
}