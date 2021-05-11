using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Models
{
    public class Mapping
    {
        public string ID { get; set; }

        [JsonProperty("examine",NullValueHandling =NullValueHandling.Ignore)]
        public string Examine { get; set; }

        [JsonProperty("members", NullValueHandling = NullValueHandling.Ignore)]
        public bool MembersOnly{ get; set; }

        [JsonProperty("lowalch", NullValueHandling = NullValueHandling.Ignore)]
        public int LowAlchValue{ get; set; }

        [JsonProperty("limit", NullValueHandling = NullValueHandling.Ignore)]
        public int ExchangeLimit { get; set; }

        [JsonProperty("value", NullValueHandling = NullValueHandling.Ignore)]
        public int ShopValue { get; set; }

        [JsonProperty("highalch", NullValueHandling = NullValueHandling.Ignore)]
        public int HighAlchValue { get; set; }

        [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
        public string Name { get; set; }

        [JsonProperty("icon", NullValueHandling = NullValueHandling.Ignore)]
        public string Icon { get; set; }

    }
}
