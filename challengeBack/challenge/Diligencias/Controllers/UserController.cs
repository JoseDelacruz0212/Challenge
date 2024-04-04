using Challenge.Models.DB;
using Challenge.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;

namespace Challenge.Controllers
{
    [Route("api/[controller]")]
    
    [AllowAnonymous]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] LoginRequest newUser)
        {
            try
            {
                User createdUser = await _service.CreateUserAsync(newUser);
                return Ok(createdUser);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating a new user.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a new user.");
            }
        }
    }
}
