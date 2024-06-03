using Microsoft.EntityFrameworkCore;

namespace Scrum_Manager_API.Models;

public class SCRUMDB : DbContext
{
    
    public DbSet<Project> Projects { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Sprint> Sprints { get; set; }
    public DbSet<Task> Tasks { get; set; }

    public SCRUMDB(DbContextOptions<SCRUMDB> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<Project>()
            .HasKey(s => s.ProjectID);
        modelBuilder.Entity<Sprint>()
            .HasKey(s => s.SprintID);
        modelBuilder.Entity<Task>()
            .HasKey(s => s.TaskID);

    }
}