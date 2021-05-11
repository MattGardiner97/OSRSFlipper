using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Models
{
    public class FlipModel
    {
        public int ID { get; set; }

        [Required]
        public string UserID { get; set; }

        [Required]
        [MinLength(1)]
        public string ItemID { get; set; }

        [Required]
        [Range(1,int.MaxValue)]
        public int BuyPrice { get; set; }

        [Required]
        [Range(1, int.MaxValue)]

        public int SellPrice { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public DateTime Date { get; set; }

    }
}
