using Challenge.Context;
using Challenge.Models.DB;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.Services
{
    public class ContactService
    {
        private readonly ChallengeContext _context;

        public ContactService(ChallengeContext context)
        {
            _context = context;
        }

        public async Task<List<Contact>> GetAllContactsAsync()
        {
            try
            {
                return await _context.Contacts 
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving all contacts.");
                throw;
            }
        }
        public async Task<List<Contact>> GetContactsById(Guid Id)
        {
            try
            {
                return await _context.Contacts.Where(c =>c.ID==Id)
                        .ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while retrieving contacts with id {Id}.");
                throw;
            }
        }

        public async Task<List<Contact>> GetContactsByGroupAsync(Guid groupId)
        {
            try
            {
                return await _context.ContactGroupRelationships
                    .Where(cgr => cgr.GroupId == groupId)
                    .Select(cgr => cgr.Contact) 
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while retrieving contacts for group with id {groupId}.");
                throw;
            }
        }

        public async Task<Contact> CreateContactAsync(Contact contact, Guid[] groupIds,string username)
        {
            try
            {
                contact.CreatedOn = DateTime.Now;
                contact.UpdatedOn = DateTime.Now;
                contact.UpdatedBy = username;
                contact.CreatedBy = username;

                _context.Contacts.Add(contact);
                if (groupIds?.Length > 0)
                {
                    var contactGroupRelationships = groupIds.Select(groupId => new ContactGroupRelationship
                    {
                        ContactId = contact.ID,
                        GroupId = groupId
                    });

                    await _context.ContactGroupRelationships.AddRangeAsync(contactGroupRelationships);
                }
                await _context.SaveChangesAsync();

                return contact;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating the contact.");
                throw;
            }
        }

        public async Task<Contact> UpdateContactAsync(Guid id, Contact updatedContact, Guid[] groupIds,string username)
        {
            try
            {
                var existingContact = await _context.Contacts.FindAsync(id);
                if (existingContact == null)
                {
                    throw new InvalidOperationException($"Contact with id {id} not found.");
                }

                existingContact.FirstName = updatedContact.FirstName;
                existingContact.LastName = updatedContact.LastName;
                existingContact.PhoneNumber = updatedContact.PhoneNumber;
                existingContact.Email = updatedContact.Email;
                existingContact.PhysicalAddress = updatedContact.PhysicalAddress;
                existingContact.UpdatedBy = username;

                _context.ContactGroupRelationships.RemoveRange(_context.ContactGroupRelationships.Where(cgr => cgr.ContactId == id));

                if (groupIds?.Length > 0)
                {
                    var contactGroupRelationships = groupIds.Select(groupId => new ContactGroupRelationship
                    {
                        ContactId = id,
                        GroupId = groupId
                    });

                    await _context.ContactGroupRelationships.AddRangeAsync(contactGroupRelationships);
                }

                await _context.SaveChangesAsync();

                return existingContact;
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while updating the contact with id {id}.");
                throw;
            }
        }

        public async Task DeleteContactAsync(Guid id)
        {
            try
            {
                var contactToDelete = await _context.Contacts.FindAsync(id);
                if (contactToDelete == null)
                {
                    throw new InvalidOperationException($"Contact with id {id} not found.");
                }

                _context.ContactGroupRelationships.RemoveRange(_context.ContactGroupRelationships.Where(cgr => cgr.ContactId == id));

                _context.Contacts.Remove(contactToDelete);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while deleting the contact with id {id}.");
                throw;
            }
        }
    }
}
