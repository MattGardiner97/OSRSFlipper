using OSRSExchangePrices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.ServiceResponses
{
    public class LatestPriceResponse
    {
        public Dictionary<string, LatestPrice> Data { get; set; }
    }
}
