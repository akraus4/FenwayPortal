using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VSTSComms
{
    public partial class fg_metricsContext : DbContext
    {
        public virtual DbSet<AgileSprint> AgileSprint { get; set; }
        public virtual DbSet<AgileStory> AgileStory { get; set; }
        public virtual DbSet<AgileStoryAgileSystemUser> AgileStoryAgileSystemUser { get; set; }
        public virtual DbSet<AgileSystem> AgileSystem { get; set; }
        public virtual DbSet<AgileSystemUser> AgileSystemUser { get; set; }
        public virtual DbSet<WorkDailyhours> WorkDailyhours { get; set; }
        public virtual DbSet<WorkTeam> WorkTeam { get; set; }
        public virtual DbSet<WorkTeamMember> WorkTeamMember { get; set; }
        public virtual DbSet<WorkUser> WorkUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("Server=ec2-52-55-14-143.compute-1.amazonaws.com;User Id=fg_user_dev;Password=b_cH0RT1rH_S;Database=fg_metrics_dev");
                optionsBuilder.EnableSensitiveDataLogging(true);
             
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AgileSprint>(entity =>
            {
                entity.ToTable("agile_sprint");

                entity.Property(e => e.AgileSprintId)
                    .HasColumnName("agile_sprint_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileSprintName)
                    .HasColumnName("agile_sprint_name")
                    .HasMaxLength(255);

                entity.Property(e => e.EndDate)
                    .HasColumnName("sprint_end_date");

                entity.Property(e => e.StartDate)
                .HasColumnName("sprint_start_date");

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255);

                entity.Property(e => e.SprintDescription)
                    .HasColumnName("sprint_description")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<AgileStory>(entity =>
            {
                entity.ToTable("agile_story");

                entity.Property(e => e.AgileStoryId)
                    .HasColumnName("agile_story_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileSprintId)
                    .HasColumnName("agile_sprint_id")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileStoryName)
                    .HasColumnName("agile_story_name")
                    .HasMaxLength(255);

                entity.Property(e => e.StoryDescription)
                    .HasColumnName("story_description")
                    .HasMaxLength(255);

                entity.Property(e => e.StoryPoints)
                    .HasColumnName("story_points")
                    .HasMaxLength(255);

                entity.Property(e => e.StoryStatus)
                    .HasColumnName("story_status")
                    .HasMaxLength(255);

                entity.Property(e => e.StoryType)
                    .HasColumnName("story_type")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<AgileStoryAgileSystemUser>(entity =>
            {
                entity.ToTable("agile_story_agile_system_user");

                entity.Property(e => e.AgileStoryAgileSystemUserId)
                    .HasColumnName("agile_story_agile_system_user_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileStoryId)
                    .HasColumnName("agile_story_id")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemUserId)
                    .HasColumnName("agile_system_user_id")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemUserStoryPoints)
                    .HasColumnName("agile_system_user_story_points")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<AgileSystem>(entity =>
            {
                entity.ToTable("agile_system");

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileSystemName)
                    .HasColumnName("agile_system_name")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemType)
                    .HasColumnName("agile_system_type")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<AgileSystemUser>(entity =>
            {
                entity.ToTable("agile_system_user");

                entity.Property(e => e.AgileSystemUserId)
                    .HasColumnName("agile_system_user_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemUserName)
                    .HasColumnName("agile_system_user_name")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkTeamMemberId)
                    .HasColumnName("work_team_member_id")
                    .HasMaxLength(255);

                //entity.Property(e => e.WorkUserId)
                //    .HasColumnName("work_user_id")
                //    .HasMaxLength(255);
            });

            modelBuilder.Entity<WorkDailyhours>(entity =>
            {
                entity.ToTable("work_dailyhours");

                entity.Property(e => e.WorkDailyhoursId)
                    .HasColumnName("work_dailyhours_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Hours)
                    .HasColumnName("hours")
                    .HasColumnType("int(11)");

                entity.Property(e => e.WorkTeamMemberId)
                    .HasColumnName("work_team_member_id")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<WorkTeam>(entity =>
            {
                entity.ToTable("work_team");

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.ProjectId)
                    .HasColumnName("project_id")
                    .HasMaxLength(255);

                entity.Property(e => e.ProjectName)
                    .HasColumnName("project_name")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkTeamName)
                    .HasColumnName("work_team_name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<WorkTeamMember>(entity =>
            {
                entity.ToTable("work_team_member");

                entity.Property(e => e.WorkTeamMemberId)
                    .HasColumnName("work_team_member_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkUserId)
                    .HasColumnName("work_user_id")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<WorkUser>(entity =>
            {
                entity.ToTable("work_user");

                entity.Property(e => e.WorkUserId)
                    .HasColumnName("work_user_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255);

                entity.Property(e => e.Firstname)
                    .HasColumnName("firstname")
                    .HasMaxLength(255);

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasMaxLength(255);
            });
        }
    }
}
