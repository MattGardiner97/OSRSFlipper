using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices.Interfaces
{
    public interface IFlipService
    {
        Task<SaveResponse> SaveFlip(FlipModel Flip);
        Task<FlipModel[]> ReadFlips(string UserID);

    }
}
