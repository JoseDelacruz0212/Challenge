namespace Challenge.Models.DB
{
    public class ContactGroupRelationship
    {
        public Guid ContactId { get; set; }
        public Guid GroupId { get; set; }
        public Contact Contact { get; set; }
        public Group Group { get; set; }
    }
}
