using Newtonsoft.Json;
using OSRSExchangePrices.Models;
using OSRSExchangePrices.ServiceResponses;
using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.DataServices
{
    public class LatestPriceService : DataServiceBase<LatestPriceResponse, LatestPrice>
    {
        public LatestPriceService(ServiceManager<IService> Services) : base(Services) { }

        protected override Dictionary<string, LatestPrice> GetFinalResult(LatestPriceResponse Response) => Response.Data;

        protected override DataServiceParameters GetParameters()
        {
            return new DataServiceParameters(Constants.RUNELITE_API_BASE, Constants.Endpoints.RuneLite.LATEST_PRICE, Constants.MaxCacheAges.RuneLite.LATEST_PRICE, null);
        }
    }
}
