using System;
using System.Collections.Generic;
using System.Text;

namespace OSRSExchangePrices
{
    public static class Helpers
    {
        public static long GetCurrentTimestamp()
        {
            return (long)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalMilliseconds;
        }
    }
}
