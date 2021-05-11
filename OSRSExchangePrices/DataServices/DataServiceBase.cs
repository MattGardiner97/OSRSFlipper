using Newtonsoft.Json;
using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.DataServices
{
    public abstract class DataServiceBase<TResponse,TResponseItem>
    {
        private DataReader dataReader;
        private DataServiceParameters parameters;

        public DataServiceBase(ServiceManager<IService> Services)
        {
            this.dataReader = new DataReader(Services.Get<CacheService>());
            this.parameters = GetParameters();
        }

        public async Task<Dictionary<string,TResponseItem>> Read()
        {
            string dataString = await dataReader.ReadURL(parameters.APIBase, parameters.Endpoint, parameters.MaxAge, parameters.QueryParameters);
            TResponse response = JsonConvert.DeserializeObject<TResponse>(dataString);
            return GetFinalResult(response);
        }

        protected abstract DataServiceParameters GetParameters(); 
        protected abstract Dictionary<string, TResponseItem> GetFinalResult(TResponse Response);

    }

    public class DataServiceParameters
    {
        public string APIBase { get; init; }
        public string Endpoint { get; init; }
        public int MaxAge { get; init; }
        public (string,string)[] QueryParameters { get; init; }

        public DataServiceParameters(string APIBase, string Endpoint, int MaxAge, (string, string)[] QueryParameters)
        {
            this.APIBase = APIBase;
            this.Endpoint = Endpoint;
            this.MaxAge = MaxAge;
            this.QueryParameters = QueryParameters;
        }
    } 
        
}
