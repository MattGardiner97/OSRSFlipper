using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Cache
{
    public class MemoryCache : ICache
    {
        private Dictionary<string, CacheItem> cache = new Dictionary<string, CacheItem>();

        public CacheItem Get(string Key)
        {
            if (cache.ContainsKey(Key))
                return cache[Key];

            return null;
        }

        public void Remove(string Key)
        {
            if (cache.ContainsKey(Key))
                cache.Remove(Key);
        }

        public void Store(string Key, CacheItem CacheItem)
        {
            if (cache.ContainsKey(Key) == false)
                cache.Add(Key, CacheItem);
        }
    }
}
