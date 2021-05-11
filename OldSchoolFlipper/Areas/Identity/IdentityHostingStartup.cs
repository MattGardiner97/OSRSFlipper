using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OldSchoolFlipper.Data;

[assembly: HostingStartup(typeof(OldSchoolFlipper.Areas.Identity.IdentityHostingStartup))]
namespace OldSchoolFlipper.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<OldSchoolFlipperContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("OldSchoolFlipperContextConnection")));

                //services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                //    .AddEntityFrameworkStores<OldSchoolFlipperContext>();
            });
        }
    }
}