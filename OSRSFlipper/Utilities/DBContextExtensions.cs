using OSRSFlipper.Data;
using OSRSFlipper.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Utilities
{
    public static class DBContextExtensions
    {
        public static async Task<SaveResponse> SaveWithResponseAsync(this ApplicationDbContext DBContext)
        {
            SaveResponse response = new SaveResponse();

            await DBContext.SaveWithResponse(response);

            return response;
        }

        public static async Task SaveWithResponse(this ApplicationDbContext DBContext, SaveResponse Response)
        {
            try
            {
                await DBContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Response.Messages.AddMessage(ex.Message);
            }
        }


    }
}
