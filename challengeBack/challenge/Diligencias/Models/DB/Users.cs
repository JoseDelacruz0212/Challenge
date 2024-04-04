using System.Text.Json.Serialization;

namespace Challenge.Models.DB
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string? UpdatedBy { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserRoleRelationship> UserRoleRelationships { get; set; } = new List<UserRoleRelationship>();
        [JsonIgnore]
        public virtual ICollection<UserGroupRelationship> UserGroupRelationships { get; set; } = new List<UserGroupRelationship>();


    }
    public class LoginUser
    {
        public string Username { get; set; }
        public string Password { get; set; }

    }
}
