using Microsoft.AspNetCore.Identity;

namespace UsedBookWebStore.Models

{
    public class ApplicationUser : IdentityUser

    {
        public string? Fullname { get; set; }

        public string DisplayName { get; set; } = string.Empty;
        public bool ShowEmail { get; set; } = true;
        public bool ShowPhoneNumber { get; set; } = false;
        public bool ShowFullName { get; set; } = true;

    }
}
