using OSRSFlipper.Models;
using OSRSFlipper.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices.Interfaces
{
    public interface IAllItemsService
    {
        Task<Dictionary<string,ItemViewModel>> ReadAllItems();
    }
}
