using System;
using System.Collections.Generic;
using System.Text;

namespace OSRSExchangePrices
{
    public static class Constants
    {
        public const string RUNELITE_API_BASE = "https://prices.runescape.wiki/api/v1/osrs";
        public const string OFFICIAL_API_BASE = "http://services.runescape.com/m=itemdb_oldschool";
        public const string USER_AGENT_STRING = "OSRSExchange Prices - @MattGardiner#6680";

        public static class Endpoints
        {
            public static class RuneLite
            {
                public const string LATEST_PRICE = "latest";
                public const string LAST_5_MINUTE_PRICE = "5m";
                public const string MAPPING = "mapping";
                public const string VOLUME = "volumes";
            }
        }


        public static class CachePrefixes
        {
            public const string RUNELITE = "rl";
        }

        public static class MaxCacheAges
        {
            public static class RuneLite
            {
                public const int LATEST_PRICE = 30; //30  seconds
                public const int LAST_5_MINUTE_PRICE = 60 * 5; //5 minutes;
                public const int MAPPING = 60 * 60 * 24; //24 hours
                public const int VOLUME = 60 * 60 * 12; //12 hours
            }
        }


    }
}
