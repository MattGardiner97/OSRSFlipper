using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Cache
{
    public interface ICache
    {
        public CacheItem Get(string Key);
        public void Store(string Key, CacheItem CacheItem);
        public void Remove(string Key);
       
    }
}
