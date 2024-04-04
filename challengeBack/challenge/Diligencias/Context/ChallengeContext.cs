using Challenge.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace Challenge.Context
{
    public partial class ChallengeContext : DbContext
    {
        public ChallengeContext()
        {
        }

        public ChallengeContext(DbContextOptions<ChallengeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ContactGroupRelationship> ContactGroupRelationships { get; set; }
        public virtual DbSet<UserRoleRelationship> UserRoleRelationships { get; set; }
        public virtual DbSet<UserGroupRelationship> UserGroupRelationships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.PhysicalAddress).HasMaxLength(255);
                entity.Property(e => e.CreatedOn).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.CreatedBy).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
                entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.GroupName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CompanyName).HasMaxLength(255);
                entity.Property(e => e.CreatedOn).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.CreatedBy).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
                entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).HasColumnName("RoleId");
                entity.Property(e => e.RoleName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.CreatedOn).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.CreatedBy).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
                entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("UserId");
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Password).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FullName).HasMaxLength(100);
                entity.Property(e => e.CreatedOn).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.CreatedBy).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");
                entity.Property(e => e.UpdatedBy).HasMaxLength(100);
            });

            modelBuilder.Entity<ContactGroupRelationship>(entity =>
            {
                entity.HasKey(e => new { e.ContactId, e.GroupId });
                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.ContactGroupRelationships)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ContactGroupRelationship_Contacts");
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.ContactGroupRelationships)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ContactGroupRelationship_Groups");
            });

            modelBuilder.Entity<UserRoleRelationship>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });
                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoleRelationships)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoleRelationship_Users");
                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoleRelationships)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserRoleRelationship_Roles");
            });

            modelBuilder.Entity<UserGroupRelationship>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.GroupId });
                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGroupRelationships)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserGroupRelationship_Users");
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.UserGroupRelationships)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserGroupRelationship_Groups");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
