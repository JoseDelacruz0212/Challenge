using System.Text.Json.Serialization;

namespace Challenge.Models.DB
{
    public class Contact
    {
        public Guid ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string PhysicalAddress { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string? UpdatedBy { get; set; }

        [JsonIgnore]
        public virtual ICollection<ContactGroupRelationship> ContactGroupRelationships { get; set; } = new List<ContactGroupRelationship>();


    }
}
