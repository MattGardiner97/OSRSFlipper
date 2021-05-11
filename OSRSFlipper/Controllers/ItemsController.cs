using Microsoft.AspNetCore.Mvc;
using OSRSExchangePrices;
using OSRSExchangePrices.Models;
using OSRSFlipper.Models;
using OSRSFlipper.StorageServices;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Controllers
{
    public class ItemsController : Controller
    {
        private IAllItemsService itemMarginService;

        public ItemsController(IAllItemsService ItemMarginService)
        {
            this.itemMarginService = ItemMarginService;
        }

        public async Task<Dictionary<string,ItemViewModel>> GetAllItems()
        {
            var response = await itemMarginService.ReadAllItems();

            return response;
        }
    }
}
