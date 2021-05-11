using Newtonsoft.Json;
using OSRSExchangePrices.Cache;
using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices
{
    public class DataReader
    {
        private HttpClient client;
        private CacheService cacheService;

        public DataReader(CacheService CacheService)
        {
            client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.TryParseAdd(Constants.USER_AGENT_STRING);
            this.cacheService = CacheService;
        }

        public async Task<string> ReadURL(string APIBase, string Endpoint, int MaxAge, (string Key, string Value)[] Parameters = null)
        {
            string URL = string.Join("/", APIBase, Endpoint);

            string result = cacheService.Get<string>(Endpoint);
            if (result != null)
                return result;


            if (Parameters != null)
            {
                foreach (var param in Parameters)
                {
                    client.DefaultRequestHeaders.Add(param.Key, param.Value);
                }
            }

            result = await client.GetStringAsync(URL);
            cacheService.Store(Endpoint, result, MaxAge);


            return result;
        }
    }
}
