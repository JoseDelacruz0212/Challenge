namespace Challenge.Models.DB
{
    public class UserGroupRelationship
    {
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
        public User User { get; set; }
        public Group Group { get; set; }
    }
}
