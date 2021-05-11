using Microsoft.AspNetCore.Mvc;
using OldSchoolFlipper.Models;
using OldSchoolFlipper.Responses;
using OSRSExchangePrices;
using OSRSExchangePrices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OldSchoolFlipper.Controllers
{
    public class APIController : Controller
    {
        private RuneLiteAPI runeliteAPI;

        public APIController(RuneLiteAPI RuneLiteAPI)
        {
            this.runeliteAPI = RuneLiteAPI;
        }

        public async Task<ItemMarginResponse> GetAllItems()
        {
            var latest = await runeliteAPI.LatestPriceService.Read();
            var mapping = await runeliteAPI.MappingService.Read();
            var volumes = await runeliteAPI.VolumeService.Read();

            LatestPrice natureRune = latest["561"];

            ItemMarginModel[] result = mapping.Select(mapping =>
            {
                ItemMarginModel model = new ItemMarginModel()
                {
                    ID = mapping.Key,
                    Name = mapping.Value.Name,
                    BuyPrice = latest.ContainsKey(mapping.Key) ? latest[mapping.Key].LowPrice : 0,
                    SellPrice = latest.ContainsKey(mapping.Key) ? latest[mapping.Key].HighPrice : 0,
                    Margin = latest.ContainsKey(mapping.Key) ? latest[mapping.Key].Margin : 0,
                    Volume = volumes.ContainsKey(mapping.Key) ? volumes[mapping.Key] : 0,
                    HighAlch = mapping.Value.HighAlchValue,
                    HighAlchMargin = mapping.Value.HighAlchValue - ((latest.ContainsKey(mapping.Key) ? latest[mapping.Key].LowPrice : 0) + natureRune.LowPrice),
                };

                return model;
            }).ToArray();

            return new ItemMarginResponse() { AllItems = result };
        }
    }
}
