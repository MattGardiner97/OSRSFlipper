using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Models
{
    public class Last5MinutePrice
    {
        public string ID { get; set; }

        [JsonProperty("avgHighPrice",NullValueHandling =NullValueHandling.Ignore)]
        public int AverageHighPrice { get; set; }

        [JsonProperty("highPriceVolume", NullValueHandling = NullValueHandling.Ignore)]
        public long HighPriceVolume { get; set; }

        [JsonProperty("low", NullValueHandling = NullValueHandling.Ignore)]
        public int AverageLowPrice { get; set; }

        [JsonProperty("lowTime", NullValueHandling = NullValueHandling.Ignore)]
        public long LowPriceVolume{ get; set; }

        public int Margin { get { return AverageHighPrice - AverageLowPrice; } }

      

    }
}
