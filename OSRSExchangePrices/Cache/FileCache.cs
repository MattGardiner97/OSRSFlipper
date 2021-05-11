using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSRSExchangePrices.Cache
{
    public class FileCache : ICache
    {
        private readonly string cachePath = Path.Join(AppContext.BaseDirectory, "cache");

        public CacheItem Get(string Key)
        {
            if (Directory.Exists(cachePath) == false)
                return null;

            string filename = GetFilename(Key);

            string fullPath = Path.Join(cachePath, filename);

            if (File.Exists(fullPath) == false)
                return null;

            string contentString = File.ReadAllText(fullPath);

            CacheItem result = JsonConvert.DeserializeObject<CacheItem>(contentString);
            return result;
        }

        public void Remove(string Key)
        {
            if (Directory.Exists(cachePath))
                return;

            string filename = GetFilename(Key);
            string fullPath = Path.Join(cachePath, filename);

            if (File.Exists(fullPath) == false)
                return;

            File.Delete(fullPath);
        }

        public void Store(string Key, CacheItem CacheItem)
        {
            if (Directory.Exists(cachePath) == false)
                Directory.CreateDirectory(cachePath);

            string filename = GetFilename(Key);
            string fullPath = Path.Join(cachePath, filename);

            string json = JsonConvert.SerializeObject(CacheItem);

            File.WriteAllText(fullPath, json);
        }

        private string GetFilename(string Key)
        {
            var invalidChars = Path.GetInvalidFileNameChars();

            foreach (char c in invalidChars)
                Key = Key.Replace(c, '_');

            return Key;
        }
    }
}
