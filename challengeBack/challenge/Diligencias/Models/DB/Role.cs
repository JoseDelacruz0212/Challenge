using System.Text.Json.Serialization;

namespace Challenge.Models.DB
{
    public class Role
    {
        public Guid RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserRoleRelationship> UserRoleRelationships { get; set; }


    }
}
