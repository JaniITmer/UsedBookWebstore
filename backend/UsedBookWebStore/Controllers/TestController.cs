using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UsedBookWebStore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]


    public class TestController : ControllerBase
    {

        [HttpGet("secure")]
        [Authorize]
        public IActionResult SecureEndpoint()
        {
            return Ok(new { message = "It is a secured endpoint" });
        }

        [HttpGet("public")]
        [AllowAnonymous]
        public IActionResult PublicEndpoint()
        {
            return Ok(new { message = "It is a public endpoint" });
        }
    }
}
