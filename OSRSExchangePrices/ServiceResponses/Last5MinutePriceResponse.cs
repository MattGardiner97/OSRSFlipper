using OSRSExchangePrices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.ServiceResponses
{
    public class Last5MinutePriceResponse
    {
        public Dictionary<string, Last5MinutePrice> Data { get; set; }

    }
}
