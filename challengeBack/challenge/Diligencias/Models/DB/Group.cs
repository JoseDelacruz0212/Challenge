using System.Text.Json.Serialization;

namespace Challenge.Models.DB
{
    public class Group
    {
        public Guid ID { get; set; }
        public string GroupName { get; set; }
        public string CompanyName { get; set; }

        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string? UpdatedBy { get; set; }
         [JsonIgnore]
        public virtual ICollection<UserGroupRelationship> UserGroupRelationships { get; set; } = new List<UserGroupRelationship>();
        [JsonIgnore]
        public virtual ICollection<ContactGroupRelationship> ContactGroupRelationships { get; set; } = new List<ContactGroupRelationship>();

    }
}
