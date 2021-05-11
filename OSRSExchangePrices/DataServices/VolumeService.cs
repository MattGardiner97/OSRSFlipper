using Newtonsoft.Json;
using OSRSExchangePrices.Models;
using OSRSExchangePrices.ServiceResponses;
using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.DataServices
{
    public class VolumeService : DataServiceBase<VolumeResponse, int>
    {
        public VolumeService(ServiceManager<IService> Services) : base(Services) { }

        protected override Dictionary<string, int> GetFinalResult(VolumeResponse Response) => Response.Data;

        protected override DataServiceParameters GetParameters()
        {
            return new DataServiceParameters(Constants.RUNELITE_API_BASE, Constants.Endpoints.RuneLite.VOLUME, Constants.MaxCacheAges.RuneLite.VOLUME, null);
        }
    }
}
