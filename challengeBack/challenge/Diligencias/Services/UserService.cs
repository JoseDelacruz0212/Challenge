using Challenge.Context;
using Challenge.Models.DB;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Threading.Tasks;

namespace Challenge.Services
{
    public class UserService
    {
        private readonly ChallengeContext _context;

        public UserService(ChallengeContext context)
        {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username && u.Password == password);

                if (user == null)
                    return null;
                return user;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while searching for user in the database.");
                throw;
            }
        }
        public async Task<User> CreateUserAsync(LoginRequest fieldsUser)
        {
            try
            {
                 User newUser = new User();

                if (await _context.Users.AnyAsync(u => u.Email == fieldsUser.Email))
                {
                    throw new InvalidOperationException("Email already exists");
                }

                newUser.CreatedOn = DateTime.UtcNow;
                newUser.UpdatedOn = DateTime.UtcNow;
                newUser.CreatedBy= fieldsUser.Email;
                newUser.UpdatedBy = fieldsUser.Email;
                newUser.Username = fieldsUser.Email;
                newUser.Email= fieldsUser.Email;
                newUser.Password = fieldsUser.Password;
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return newUser;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "An error occurred while creating a new user.");
                throw;
            }
        }

    }
}
