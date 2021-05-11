using OSRSExchangePrices.Cache;
using System;
using System.Collections.Generic;

namespace OSRSExchangePrices.Services
{
    public class CacheService : IService
    {
        private List<ICache> caches = new List<ICache>();

        public CacheService AddCache<TCache>() where TCache : ICache
        {
            TCache cacheInstance = (TCache)Activator.CreateInstance(typeof(TCache));
            caches.Add(cacheInstance);
            return this;
        }

        public object Get(string Key)
        {
            for(int outerIndex = 0; outerIndex < caches.Count;outerIndex++)
            {
                CacheItem result = caches[outerIndex].Get(Key);

                if(result != null && ValidateCacheItem(result))
                {
                    for (int innerIndex = 0; innerIndex < outerIndex; innerIndex++)
                    {
                        ICache upperCache = caches[innerIndex];
                        upperCache.Remove(Key);
                        upperCache.Store(Key, result);
                    }
                    return result.Data;
                }
            }

            return null;
        }

        public TData Get<TData>(string Key)
        {
            object result = Get(Key);
            return (TData)result;
        }

        public void Init()
        {
            
        }

        public void Store(string Key, object Value, int MaxAgeSeconds)
        {
            CacheItem cacheItem = CreateCacheItem(Key, Value, MaxAgeSeconds);
            for (int i = 0; i < caches.Count; i++)
                caches[i].Store(Key, cacheItem);
        }

        private CacheItem CreateCacheItem(string Key, object Value, int MaxAgeSeconds)
        {
            return new CacheItem()
            {
                Data = Value,
                CreatedAt = DateTime.UtcNow,
                MaxAge = MaxAgeSeconds
            };
        }

        private bool ValidateCacheItem(CacheItem CacheItem)
        {
            int currentAge = (int)(DateTime.UtcNow - CacheItem.CreatedAt).TotalSeconds;
            return currentAge < CacheItem.MaxAge;
        }       
    }
}
