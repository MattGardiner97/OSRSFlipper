using OSRSExchangePrices.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Services
{
    public class ServiceManager<TServiceInterface>
    {
        private Dictionary<Type, TServiceInterface> services;

        public  ServiceManager()
        {
            services = new Dictionary<Type, TServiceInterface>();
        }

        public TService Register<TService>() where TService : TServiceInterface
        {
            Type serviceType = typeof(TService);

            if (services.ContainsKey(serviceType))
                throw new InvalidOperationException($"{serviceType} has already been registered.");

            TService serviceInstance = (TService)Activator.CreateInstance(serviceType);
            services.Add(serviceType, serviceInstance);

            return serviceInstance;
        }

        public TService Register<TService>(object[] ConstructorParameters) where TService : TServiceInterface
        {
            Type serviceType = typeof(TService);

            if (services.ContainsKey(serviceType))
                throw new InvalidOperationException($"{serviceType} has already been registered.");

            TService serviceInstance = (TService)Activator.CreateInstance(serviceType,ConstructorParameters);
            services.Add(serviceType, serviceInstance);

            return serviceInstance;
        }

        public TService Register<TService>(TService Instance) where TService : TServiceInterface
        {
            Type serviceType = typeof(TService);

            if (services.ContainsKey(serviceType))
                throw new InvalidOperationException($"{serviceType} has already been registered.");

            services.Add(serviceType, Instance);
            return Instance;
        }

        public TService Get<TService>() where TService  : TServiceInterface
        {
            Type serviceType = typeof(TService);

            if (services.ContainsKey(serviceType) == false)
                throw new InvalidOperationException($"{serviceType} has not been registered yet.");

            return (TService)services[serviceType];
        }
    }
}
