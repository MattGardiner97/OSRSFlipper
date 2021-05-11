using OSRSExchangePrices;
using OSRSExchangePrices.DataServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSExchangePrices_CLI
{
    public class ExchangeItem
    {
        public string ID;
        public string Name;
        public int Volume;
        public int Margin;
        public int BuyPrice;
        public int SellPrice;
        public float Score;
    }

    public class Program
    {
        public static async Task Main(string[] args)
        {
            RuneLiteAPI runeLiteAPI = new RuneLiteAPI();

            while (true)
            {
                var latestPrices = await runeLiteAPI.LatestPriceService.Read();
                var last5MinutePrices = await runeLiteAPI.Last5MinutePriceService.Read();
                var mappings = await runeLiteAPI.MappingService.Read();
                var volumes = await runeLiteAPI.VolumeService.Read();

                List<ExchangeItem> items = latestPrices.Select(p =>
                new ExchangeItem()
                {
                    ID = p.Key,
                    Name = mappings[p.Key].Name,
                    Volume = volumes.ContainsKey(p.Key) ? volumes[p.Key] : 0,
                    Margin = p.Value.Margin,
                    BuyPrice = latestPrices[p.Key].HighPrice,
                    SellPrice = latestPrices[p.Key].LowPrice
                }).ToList();

                int maxVolume = items.Max(i => i.Volume);
                int maxMargin = items.Max(i => i.Margin);

                foreach (var item in items)
                {
                    item.Score = ((float)item.Volume / maxVolume) * ((float)item.Margin / maxMargin);
                }

                Console.WriteLine();
                Console.ForegroundColor = ConsoleColor.White;

                foreach (var item in items.Where(i => i.Margin > 2 && i.Volume > 1000).OrderByDescending(i => i.Volume).ThenByDescending(i => i.Margin).Take(60))
                //foreach(var item in items.OrderByDescending(i => i.Score))
                {
                    string name = item.Name;
                    int margin = item.Margin;
                    int volume = item.Volume;
                    float score = item.Score;
                    //Console.WriteLine($"{name}: Margin: {margin}, Volume: {volume}, Buy Price: {item.SellPrice}, Sell Price: {item.BuyPrice}");

                    void WriteGreen(string Text)
                    {
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.Write(Text);
                        Console.ForegroundColor = ConsoleColor.White;
                    }

                    Console.Write($"{name}: Margin: ");
                    WriteGreen(margin.ToString());

                    Console.Write(", Volume: ");
                    WriteGreen(volume.ToString());

                    Console.Write(", Buy Price: ");
                    WriteGreen(item.SellPrice.ToString());

                    Console.Write(", Sell Price: ");
                    WriteGreen(item.BuyPrice.ToString());

                    Console.WriteLine();
                }

                Console.ReadLine();
            }
        }
    }
}
