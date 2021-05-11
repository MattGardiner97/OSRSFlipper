using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Controllers
{
    [Authorize]
    public class FavouritesController : Controller
    {
        private UserManager<IdentityUser> userManager;
        private IFavouriteItemService favouriteItemService;

        private IMemoryCache cache;
        private MemoryCacheEntryOptions cacheEntryOptions = new MemoryCacheEntryOptions()
        {
            SlidingExpiration = TimeSpan.FromSeconds(60)
        };

        public FavouritesController(UserManager<IdentityUser> UserManager,IFavouriteItemService FavouriteItemService)
        {
            this.userManager = UserManager;
            this.favouriteItemService = FavouriteItemService;
            this.cache = new MemoryCache(new MemoryCacheOptions()
            {
                ExpirationScanFrequency = TimeSpan.FromSeconds(60)
            });
        }

        public async Task<string[]> GetFavouriteItems()
        {
            string userID = await userManager.GetUserIDAsync(HttpContext.User);
            
            if(cache.TryGetValue(userID,out string[] result) == false)
            {
                FavouriteItemModel[] favouriteItems = await favouriteItemService.ReadForUser(userID);
                result = favouriteItems.Select(fi => fi.ItemID).ToArray();
                cache.Set(userID, favouriteItems,cacheEntryOptions);
            }

            return result;
        }

        public async Task<SaveResponse> SaveFavouriteItem(string ItemID)
        {
            string userID = await userManager.GetUserIDAsync(HttpContext.User);

            SaveResponse response = await favouriteItemService.SaveForUser(userID, ItemID);

            cache.Remove(userID);

            return response;
        }

        public async Task<SaveResponse> RemoveFavouriteItem(string ItemID)
        {
            string userID = await userManager.GetUserIDAsync(HttpContext.User);

            SaveResponse response = await favouriteItemService.RemoveForUser(userID, ItemID);
            cache.Remove(userID);
            return response;
        }
    }
}
