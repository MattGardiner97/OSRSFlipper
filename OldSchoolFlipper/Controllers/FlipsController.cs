using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OldSchoolFlipper.Controllers
{
    public class FlipsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
