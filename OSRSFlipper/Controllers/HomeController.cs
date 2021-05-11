using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using OSRSFlipper.Utilities;

namespace OSRSFlipper.Controllers
{
    public class HomeController : Controller
    {
        private SignInManager<IdentityUser> signInManager;
        private readonly ILogger<HomeController> logger;

        public HomeController(SignInManager<IdentityUser> SignInManager,ILogger<HomeController> Logger)
        {
            this.signInManager = SignInManager;
            this.logger = Logger;
        }

        public IActionResult Index()
        {
            ViewData.IsLoggedIn(signInManager.IsSignedIn(HttpContext.User));

            return View();
        }
    }
}
