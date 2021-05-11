using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OldSchoolFlipper.Models
{
    public class ItemMarginModel
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public int BuyPrice { get; set; }
        public int SellPrice { get; set; }
        public int Margin { get; set; }
        public int Volume { get; set; }
        public int HighAlch { get; set; }
        public int HighAlchMargin { get; set; }
    }
}
