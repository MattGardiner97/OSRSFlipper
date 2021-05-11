using System;
using System.Collections.Generic;
using System.Text;

namespace OSRSExchangePrices.Cache
{
    public class CacheItem
    {
        public long MaxAge { get; set; }
        public DateTime CreatedAt { get; set; }
        public object Data { get; set; }
    }
}
