using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OSRSFlipper.Utilities
{
    public static class UserManagerExtensions
    {
        public static async Task<string> GetUserIDAsync(this UserManager<IdentityUser> UserManager,ClaimsPrincipal ClaimsPrincipal)
        {
            IdentityUser user = await UserManager.GetUserAsync(ClaimsPrincipal);
            return user.Id;
        }

    }
}
