using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices.Interfaces
{
    public interface IFavouriteItemService
    {
        Task<FavouriteItemModel[]> ReadForUser(string UserID);
        Task<SaveResponse> SaveForUser(string UserID, string ItemID);
        Task<SaveResponse> RemoveForUser(string UserID, string ItemID);

    }
}
