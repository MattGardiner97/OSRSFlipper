using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Utilities
{
    public static class ViewDataExtensions
    {
        private const string IS_LOGGED_IN = "IsLoggedIn";

        public static bool IsLoggedIn(this ViewDataDictionary ViewData)
        {
            if (ViewData.ContainsKey(IS_LOGGED_IN))
                return (bool)ViewData[IS_LOGGED_IN];

            return false;
        }

        public static void IsLoggedIn(this ViewDataDictionary ViewData, bool Value)
        {
            ViewData[IS_LOGGED_IN] = Value;
        }

    }
}
