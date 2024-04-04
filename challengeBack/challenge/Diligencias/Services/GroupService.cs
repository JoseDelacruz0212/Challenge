using Challenge.Context;
using Challenge.Models.DB;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.Services
{
    public class GroupService
    {
        private readonly ChallengeContext _context;

        public GroupService(ChallengeContext context)
        {
            _context = context;
        }
        public async Task<List<dynamic>> GetAllGroupsAsync()
        {
            try
            {
                var groups = await _context.Groups
                    .Select(g => new
                    {
                        ID = g.ID,
                        GroupName = g.GroupName,
                        CompanyName = g.CompanyName,
                        CreatedOn = g.CreatedOn,
                        CreatedBy = g.CreatedBy,
                        UpdatedOn = g.UpdatedOn,
                        UpdatedBy = g.UpdatedBy,
                        ContactCount = _context.ContactGroupRelationships.Count(cgr => cgr.GroupId == g.ID)
                    })
                    .ToListAsync();

                var result = groups.Select(g => new
                {
                    ID = g.ID,
                    GroupName = g.GroupName,
                    CompanyName = g.CompanyName,
                    CreatedOn = g.CreatedOn,
                    CreatedBy = g.CreatedBy,
                    UpdatedOn = g.UpdatedOn,
                    UpdatedBy = g.UpdatedBy,
                    ContactCount = g.ContactCount
                }).ToList();

                return result.Cast<dynamic>().ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while retrieving all groups.");
                throw;
            }
        }
        public async Task<List<Group>> GetGroupById(Guid Id)
        {
            try
            {
                return await _context.Groups.Where(c => c.ID == Id)
                        .ToListAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while retrieving contacts with id {Id}.");
                throw;
            }
        }

        public async Task<Group> CreateGroupAsync(Group group,string username)
        {
            try
            {
                group.CreatedOn = DateTime.Now;
                group.UpdatedOn = DateTime.Now;
                group.UpdatedBy = username;
                group.CreatedBy = username;

                _context.Groups.Add(group);
                await _context.SaveChangesAsync();
                return group;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating the group.");
                throw;
            }
        }

        public async Task<Group> UpdateGroupAsync(Guid id, Group updatedGroup,string username)
        {
            try
            {
                var existingGroup = await _context.Groups.FindAsync(id);
                if (existingGroup == null)
                {
                    throw new InvalidOperationException($"Group with id {id} not found.");
                }

                existingGroup.GroupName = updatedGroup.GroupName;
                existingGroup.CompanyName = updatedGroup.CompanyName;
                existingGroup.UpdatedOn = DateTime.Now;
                existingGroup.UpdatedBy = username;
                await _context.SaveChangesAsync();

                return existingGroup;
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while updating the group with id {id}.");
                throw;
            }
        }

        public async Task DeleteGroupAsync(Guid id)
        {
            try
            {
                var groupToDelete = await _context.Groups.FindAsync(id);
                if (groupToDelete == null)
                {
                    throw new InvalidOperationException($"Group with id {id} not found.");
                }

                _context.Groups.Remove(groupToDelete);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, $"An error occurred while deleting the group with id {id}.");
                throw;
            }
        }
    }
}
