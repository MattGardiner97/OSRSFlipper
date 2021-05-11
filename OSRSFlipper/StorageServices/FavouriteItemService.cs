using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using OSRSExchangePrices;
using OSRSFlipper.Data;
using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices
{
    [Authorize]
    public class FavouriteItemService : IFavouriteItemService
    {
        private ApplicationDbContext dbContext;
        private IAllItemsService itemMarginService;

        public FavouriteItemService(ApplicationDbContext DBContext,IAllItemsService ItemMarginService)
        {
            this.dbContext = DBContext;
            this.itemMarginService = ItemMarginService;
        }

        public async Task<FavouriteItemModel[]> ReadForUser(string UserID)
        {
            FavouriteItemModel[] result = await dbContext.FavouriteItems.Where(fav => fav.UserID == UserID).ToArrayAsync();

            return result;
        }

        public async Task<SaveResponse> RemoveForUser(string UserID, string ItemID)
        {
            FavouriteItemModel favouriteItem = new FavouriteItemModel()
            {
                UserID = UserID,
                ItemID = ItemID
            };
            dbContext.Remove(favouriteItem);

            SaveResponse response = await dbContext.SaveWithResponseAsync();

            return response;
        }

        public async Task<SaveResponse> SaveForUser(string UserID, string ItemID)
        {
            FavouriteItemModel favouriteItem = new FavouriteItemModel()
            {
                UserID = UserID,
                ItemID = ItemID
            };
            dbContext.Add(favouriteItem);

            SaveResponse response = await dbContext.SaveWithResponseAsync();

            return response;
        }
    }
}
