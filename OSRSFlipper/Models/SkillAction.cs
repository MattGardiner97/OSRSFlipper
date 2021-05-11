using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Models
{
    public class SkillAction
    {
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string SkillName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public float LevelRequired { get; set; }

        [Required]
        public float XP { get; set; }
    }
}
