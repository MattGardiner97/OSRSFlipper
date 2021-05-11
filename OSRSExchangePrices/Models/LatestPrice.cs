using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Models
{
    public class LatestPrice
    {
        public string ID { get; set; }

        [JsonProperty("high",NullValueHandling =NullValueHandling.Ignore)]
        public int HighPrice { get; set; }

        [JsonProperty("highTime", NullValueHandling = NullValueHandling.Ignore)]
        public long HighTimestamp { get; set; }

        [JsonProperty("low", NullValueHandling = NullValueHandling.Ignore)]
        public int LowPrice { get; set; }

        [JsonProperty("lowTime", NullValueHandling = NullValueHandling.Ignore)]
        public long LowTimestamp { get; set; }

        public int Margin { get { return HighPrice - LowPrice; } }

        public DateTime HighDateTime { get { return new DateTime(1970, 1, 1).AddSeconds(HighTimestamp); } }
        public DateTime LowDateTime { get { return new DateTime(1970, 1, 1).AddSeconds(LowTimestamp); } }

    }
}
