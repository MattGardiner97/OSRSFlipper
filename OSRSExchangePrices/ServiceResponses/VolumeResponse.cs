using OSRSExchangePrices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.ServiceResponses
{
    public class VolumeResponse
    {
        public long Timestamp { get; set; }
        public Dictionary<string, int> Data { get; set; }

    }
}
