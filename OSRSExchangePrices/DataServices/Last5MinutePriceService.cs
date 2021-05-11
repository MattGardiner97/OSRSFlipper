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
    public class Last5MinutePriceService : DataServiceBase<Last5MinutePriceResponse, Last5MinutePrice>
    {
        public Last5MinutePriceService(ServiceManager<IService> Services) : base(Services) { }

        protected override Dictionary<string, Last5MinutePrice> GetFinalResult(Last5MinutePriceResponse Response) => Response.Data;

        protected override DataServiceParameters GetParameters()
        {
            return new DataServiceParameters(Constants.RUNELITE_API_BASE, Constants.Endpoints.RuneLite.LAST_5_MINUTE_PRICE, Constants.MaxCacheAges.RuneLite.LAST_5_MINUTE_PRICE, null);
        }
    }
}
