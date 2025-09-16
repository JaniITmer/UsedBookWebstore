using System.ComponentModel.DataAnnotations.Schema;

namespace UsedBookWebStore.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Author { get; set; } = "";

        public string UserId { get; set; } = "";

        public ApplicationUser? User { get; set; }

       
        public decimal Price { get; set; } = 0;

        public string Currency { get; set; } = "HUF";
    }
}
