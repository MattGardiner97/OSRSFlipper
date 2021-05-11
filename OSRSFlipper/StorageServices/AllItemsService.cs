using OSRSExchangePrices;
using OSRSExchangePrices.Models;
using OSRSFlipper.Models;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices
{
    public class AllItemsService : IAllItemsService
    {
        private RuneLiteAPI runeliteAPI;

        public AllItemsService(RuneLiteAPI RuneLiteAPI)
        {
            this.runeliteAPI = RuneLiteAPI;
        }

        public async Task<Dictionary<string,ItemViewModel>> ReadAllItems()
        {
            var latest = await runeliteAPI.LatestPriceService.Read();
            var mappings = await runeliteAPI.MappingService.Read();
            var volumes = await runeliteAPI.VolumeService.Read();

            LatestPrice natureRuneLatestPrice = latest["561"];

            Dictionary<string, ItemViewModel> result = new Dictionary<string, ItemViewModel>();
            foreach(Mapping mapping in mappings.Values)
            {
                ItemViewModel model = new ItemViewModel()
                {
                    ID = mapping.ID,
                    Name = mapping.Name,
                    BuyPrice = latest.ContainsKey(mapping.ID) ? latest[mapping.ID].HighPrice : 0,
                    SellPrice = latest.ContainsKey(mapping.ID) ? latest[mapping.ID].LowPrice : 0,
                    Margin = latest.ContainsKey(mapping.ID) ? latest[mapping.ID].Margin : 0,
                    Volume = volumes.ContainsKey(mapping.ID) ? volumes[mapping.ID] : 0,
                    HighAlch = mapping.HighAlchValue,
                    HighAlchMargin = mapping.HighAlchValue - ((latest.ContainsKey(mapping.ID) ? latest[mapping.ID].HighPrice : 0) + natureRuneLatestPrice.HighPrice),
                    LastBuyTime = latest.ContainsKey(mapping.ID) ? latest[mapping.ID].HighTimestamp : 0,
                    LastSellTime = latest.ContainsKey(mapping.ID) ? latest[mapping.ID].LowTimestamp : 0
                };

                result.Add(model.ID, model);
            }

            return result;
        }
    }
}
