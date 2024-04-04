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
    [ApiController]

    [ServiceFilter(typeof(JwtAuthorizationFilter))]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _service;
        public ContactController(ContactService service)
        {
            _service = service;
        }


        // GET api/contact
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            try
            {
                var contacts = await _service.GetAllContactsAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving contacts.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving contacts.");
            }
        }
        // GET api/contact
        [HttpGet("GetContactsById/{Id}")]
        public async Task<IActionResult> GetContactsById(Guid Id)
        {
            try
            {
                var contact = await _service.GetContactsById(Id);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving contacts.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving contacts.");
            }
        }

        // GET api/contact/group/{groupId}
        [HttpGet("group/{groupId}")]
        public async Task<IActionResult> GetContactsByGroup(Guid groupId)
        {
            try
            {
                var contacts = await _service.GetContactsByGroupAsync(groupId);
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while retrieving contacts for group with id {groupId}.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while retrieving contacts for group with id {groupId}.");
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] Contact contact, [FromQuery] Guid[] groupIds)
        {
            try
            {
                var username = HttpContext.User.Identity.Name;
                var newContact = await _service.CreateContactAsync(contact, groupIds, username);
                return Ok(newContact);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating the contact.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the contact.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(Guid id, [FromBody] Contact updatedContact, [FromQuery] Guid[] groupIds)
        {
            try
            {
                var username = HttpContext.User.Identity.Name;
                var updatedContactResult = await _service.UpdateContactAsync(id, updatedContact, groupIds, username);
                return Ok(updatedContactResult);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while updating the contact with id {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while updating the contact with id {id}.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            try
            {
                await _service.DeleteContactAsync(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while deleting the contact with id {id}.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while deleting the contact with id {id}.");
            }
        }
    }
}
