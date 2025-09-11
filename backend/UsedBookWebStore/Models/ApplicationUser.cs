using Microsoft.AspNetCore.Identity;

namespace UsedBookWebStore.Models

{
    public class ApplicationUser : IdentityUser

    {
        public string? Fullname { get; set; }
       

    }
}
