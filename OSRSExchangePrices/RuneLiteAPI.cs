using OSRSExchangePrices.Cache;
using OSRSExchangePrices.DataServices;
using OSRSExchangePrices.Models;
using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices
{
    public class RuneLiteAPI
    {
        private ServiceManager<IService> services;

        public LatestPriceService LatestPriceService { get; private set; }
        public Last5MinutePriceService Last5MinutePriceService { get; private set; }
        public MappingService MappingService { get; private set; }
        public VolumeService VolumeService { get; private set; }

        public RuneLiteAPI()
        {
            services = new ServiceManager<IService>();

            CacheService cacheService = new CacheService();
            cacheService.AddCache<MemoryCache>().AddCache<FileCache>();

            services.Register(cacheService);

            LatestPriceService = new LatestPriceService(services);
            Last5MinutePriceService = new Last5MinutePriceService(services);
            MappingService = new MappingService(services);
            VolumeService = new VolumeService(services);
        }
    }
}
