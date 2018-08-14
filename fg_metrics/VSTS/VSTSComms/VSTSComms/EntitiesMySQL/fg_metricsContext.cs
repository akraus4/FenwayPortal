using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VSTSComms.EntitiesMySQL
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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AgileSprint>(entity =>
            {
                entity.ToTable("agile_sprint");

                entity.HasIndex(e => e.AgileSystemId)
                    .HasName("FK_AGILE_SPRINT_AGILE_SYSTEM");

                entity.Property(e => e.AgileSprintId)
                    .HasColumnName("agile_sprint_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.AgileSprintName)
                    .HasColumnName("agile_sprint_name")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255);

                entity.Property(e => e.SprintDescription)
                    .HasColumnName("sprint_description")
                    .HasMaxLength(255);

                entity.Property(e => e.EndDate)
                    .HasColumnName("sprint_end_date");

                entity.Property(e => e.StartDate)
                .HasColumnName("sprint_start_date");

                entity.HasOne(d => d.AgileSystem)
                    .WithMany(p => p.AgileSprint)
                    .HasForeignKey(d => d.AgileSystemId)
                    .HasConstraintName("FK_AGILE_SPRINT_AGILE_SYSTEM");
            });

            modelBuilder.Entity<AgileStory>(entity =>
            {
                entity.ToTable("agile_story");

                entity.HasIndex(e => e.AgileSprintId)
                    .HasName("FK_AGILE_STORY_AGILE_SPRINT");

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

                entity.HasOne(d => d.AgileSprint)
                    .WithMany(p => p.AgileStory)
                    .HasForeignKey(d => d.AgileSprintId)
                    .HasConstraintName("FK_AGILE_STORY_AGILE_SPRINT");
            });

            modelBuilder.Entity<AgileStoryAgileSystemUser>(entity =>
            {
                entity.ToTable("agile_story_agile_system_user");

                entity.HasIndex(e => e.AgileStoryId)
                    .HasName("FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_STORY");

                entity.HasIndex(e => e.AgileSystemUserId)
                    .HasName("FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_SYSTEM_USER");

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

                entity.HasOne(d => d.AgileStory)
                    .WithMany(p => p.AgileStoryAgileSystemUser)
                    .HasForeignKey(d => d.AgileStoryId)
                    .HasConstraintName("FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_STORY");

                entity.HasOne(d => d.AgileSystemUser)
                    .WithMany(p => p.AgileStoryAgileSystemUser)
                    .HasForeignKey(d => d.AgileSystemUserId)
                    .HasConstraintName("FK_AGILE_STORY_AGILE_SYSTEM_USER_AGILE_SYSTEM_USER");
            });

            modelBuilder.Entity<AgileSystem>(entity =>
            {
                entity.ToTable("agile_system");

                entity.HasIndex(e => e.WorkTeamId)
                    .HasName("FK_AGILE_SYSTEM_WORK_TEAM");

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(1)");

                entity.Property(e => e.AgileSystemName)
                    .HasColumnName("agile_system_name")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemType)
                    .HasColumnName("agile_system_type")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255);

                entity.HasOne(d => d.WorkTeam)
                    .WithMany(p => p.AgileSystem)
                    .HasForeignKey(d => d.WorkTeamId)
                    .HasConstraintName("FK_AGILE_SYSTEM_WORK_TEAM");
            });

            modelBuilder.Entity<AgileSystemUser>(entity =>
            {
                entity.ToTable("agile_system_user");

                entity.HasIndex(e => e.WorkTeamMemberId)
                    .HasName("FK_AGILE_SYSTEM_USER_WORK_TEAM_MEMBER");

                entity.Property(e => e.AgileSystemUserId)
                    .HasColumnName("agile_system_user_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(1)");

                entity.Property(e => e.AgileSystemId)
                    .HasColumnName("agile_system_id")
                    .HasMaxLength(255);

                entity.Property(e => e.AgileSystemUserName)
                    .HasColumnName("agile_system_user_name")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkTeamMemberId)
                    .HasColumnName("work_team_member_id")
                    .HasMaxLength(255);

                entity.HasOne(d => d.WorkTeamMember)
                    .WithMany(p => p.AgileSystemUser)
                    .HasForeignKey(d => d.WorkTeamMemberId)
                    .HasConstraintName("FK_AGILE_SYSTEM_USER_WORK_TEAM_MEMBER");
            });

            modelBuilder.Entity<WorkDailyhours>(entity =>
            {
                entity.ToTable("work_dailyhours");

                entity.HasIndex(e => e.WorkTeamMemberId)
                    .HasName("FK_WORK_DAILYHOURS_WORK_TEAM_MEMBER");

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

                entity.HasOne(d => d.WorkTeamMember)
                    .WithMany(p => p.WorkDailyhours)
                    .HasForeignKey(d => d.WorkTeamMemberId)
                    .HasConstraintName("FK_WORK_DAILYHOURS_WORK_TEAM_MEMBER");
            });

            modelBuilder.Entity<WorkTeam>(entity =>
            {
                entity.ToTable("work_team");

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(1)");

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

                entity.HasIndex(e => e.WorkTeamId)
                    .HasName("FK_WORK_TEAM_MEMBER_WORK_TEAM");

                entity.HasIndex(e => e.WorkUserId)
                    .HasName("FK_WORK_TEAM_MEMBER_WORK_USER");

                entity.Property(e => e.WorkTeamMemberId)
                    .HasColumnName("work_team_member_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(1)");

                entity.Property(e => e.WorkTeamId)
                    .HasColumnName("work_team_id")
                    .HasMaxLength(255);

                entity.Property(e => e.WorkUserId)
                    .HasColumnName("work_user_id")
                    .HasMaxLength(255);

                entity.HasOne(d => d.WorkTeam)
                    .WithMany(p => p.WorkTeamMember)
                    .HasForeignKey(d => d.WorkTeamId)
                    .HasConstraintName("FK_WORK_TEAM_MEMBER_WORK_TEAM");

                entity.HasOne(d => d.WorkUser)
                    .WithMany(p => p.WorkTeamMember)
                    .HasForeignKey(d => d.WorkUserId)
                    .HasConstraintName("FK_WORK_TEAM_MEMBER_WORK_USER");
            });

            modelBuilder.Entity<WorkUser>(entity =>
            {
                entity.ToTable("work_user");

                entity.Property(e => e.WorkUserId)
                    .HasColumnName("work_user_id")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(1)");

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
