using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using UsedBookWebStore.Data;
using UsedBookWebStore.Models;

namespace UsedBookWebStore.Hubs
{
   

    [Authorize]
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;

        public ChatHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string receiverName, string message)
        {
            var senderId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var sender = await _context.Users.FindAsync(senderId);
            var senderName = sender?.Fullname ?? "Unknown";

            var receiver = _context.Users.FirstOrDefault(u => u.Fullname == receiverName);
            if (receiver == null) return;

            var msg = new Message
            {
                SenderId = senderId,
                ReceiverId = receiver.Id,
                Content = message,
                SentAt = DateTime.UtcNow
            };

            _context.Messages.Add(msg);
            await _context.SaveChangesAsync();

            await Clients.User(receiver.Id)
                .SendAsync("ReceiveMessage", senderName, message, DateTime.UtcNow);
        }
    }
}