using Microsoft.AspNetCore.Mvc;
using Challenge.Services;
using Microsoft.AspNetCore.Identity.Data;

namespace Challenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var token = await _authService.AuthenticateAsync(loginRequest.Email, loginRequest.Password);

                if (token == null)
                {
                    return Unauthorized();
                }

                return Content(token, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing login request.");
            }
        }
    }
}
