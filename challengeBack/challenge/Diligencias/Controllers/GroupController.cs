using Challenge.Models.DB;
using Challenge.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;

namespace Challenge.Controllers
{
    [Route("api/[controller]")]

    [ServiceFilter(typeof(JwtAuthorizationFilter))]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly GroupService _service;

        public GroupController(GroupService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetGroups()
        {
            try
            {
                var groups = await _service.GetAllGroupsAsync();
                return Ok(groups);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving groups.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving groups.");
            }
        }
        // GET api/contact
        [HttpGet("GetGroupById/{Id}")]
        public async Task<IActionResult> GetGroupById(Guid Id)
        {
            try
            {
                var group = await _service.GetGroupById(Id);
                return Ok(group);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving groups.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving groups.");
            }
        }

        // POST api/group
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] Group group)
        {
            try
            {

                var username = HttpContext.User.Identity.Name;
                dynamic newGroup = await _service.CreateGroupAsync(group, username);
                return Ok(newGroup);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating the group.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the group.");
            }
        }

        // PUT api/group/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] Group updatedGroup)
        {
            try
            {
                var username = HttpContext.User.Identity.Name;
                var updatedGroupResult = await _service.UpdateGroupAsync(id, updatedGroup, username);
                return Ok(updatedGroupResult);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while updating the group with id {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while updating the group with id {id}.");
            }
        }

        // DELETE api/group/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            try
            {
                await _service.DeleteGroupAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while deleting the group with id {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deleting the group with id {id}.");
            }
        }
    }
}
