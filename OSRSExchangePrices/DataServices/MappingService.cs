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
    public class MappingService : DataServiceBase<Mapping[], Mapping>
    {
        public MappingService(ServiceManager<IService> Services) : base(Services) { }

        protected override Dictionary<string, Mapping> GetFinalResult(Mapping[] Response)
        {
            Dictionary<string, Mapping> result = new Dictionary<string, Mapping>();
            foreach (var mapping in Response)
                result.Add(mapping.ID, mapping);

            return result;
        }

        protected override DataServiceParameters GetParameters()
        {
            return new DataServiceParameters(Constants.RUNELITE_API_BASE, Constants.Endpoints.RuneLite.MAPPING, Constants.MaxCacheAges.RuneLite.MAPPING, null);
        }
    }
}
