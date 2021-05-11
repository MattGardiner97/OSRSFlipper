using OSRSFlipper.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Responses
{
    public class SaveResponse
    {
        public MessageCollection Messages { get; private set; } = new MessageCollection();
    }
}
