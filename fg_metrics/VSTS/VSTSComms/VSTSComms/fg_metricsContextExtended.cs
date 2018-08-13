using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTSComms
{
    public partial class fg_metricsContext : DbContext
    {
        public string ConnectionString { get; set; }
        public fg_metricsContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //                optionsBuilder.UseMySql("Server=ec2-52-55-14-143.compute-1.amazonaws.com;User Id=fg_user_dev;Password=b_cH0RT1rH_S;Database=fg_metrics_dev");
                optionsBuilder.UseMySql(ConnectionString);
                //optionsBuilder.UseMySql("Server=localhost;User Id=fg_user;Password=fg_user;Database=portal");
                // optionsBuilder.UseMySql("Server=52.55.14.143;User Id=fg_user_dev;Password=b_cH0RT1rH_S;Database=fg_metrics_dev");
                // optionsBuilder.UseMySql("Server=52.55.14.143;User Id=fg_user_dev2;Password=6UhjVvAgM_Jm;Database=fg_metrics_dev2");
                // optionsBuilder.UseMySql("Server=52.55.14.143;User Id=fg_user;Password=uXQ1pgjZlne7;Database=fg_metrics");
                optionsBuilder.EnableSensitiveDataLogging(true);

            }
        }

    }
}
