using OSRSFlipper.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Requests
{
    public class SaveRequest<TViewModel>
    {
        public MessageCollection Messages { get; private set; } = new MessageCollection();
        public TViewModel ViewModel { get; set; }

    }
}
