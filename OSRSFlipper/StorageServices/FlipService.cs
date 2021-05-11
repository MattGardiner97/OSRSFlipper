using Microsoft.EntityFrameworkCore;
using OSRSFlipper.Data;
using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.StorageServices
{
    public class FlipService : IFlipService
    {
        private ApplicationDbContext dbContext;

        public FlipService(ApplicationDbContext DBContext)
        {
            this.dbContext = DBContext;
        }

        public async Task<FlipModel[]> ReadFlips(string UserID)
        {
            FlipModel[] readResult = await dbContext.Flips
                .Where(flip => flip.UserID == UserID)
                .ToArrayAsync();

            return readResult;
        }

        public async Task<SaveResponse> SaveFlip(FlipModel Flip)
        {
            dbContext.Flips.Add(Flip);
            SaveResponse response = await dbContext.SaveWithResponseAsync();
            return response;
        }
    }
}
