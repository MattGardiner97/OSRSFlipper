using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OSRSFlipper.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<FavouriteItemModel> FavouriteItems { get; set; }
        public DbSet<FlipModel> Flips { get; set; }
        public DbSet<SkillAction> SkillActions { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FavouriteItemModel>()
                .HasKey(favItem => new { favItem.UserID, favItem.ItemID });
        }
    }
}
