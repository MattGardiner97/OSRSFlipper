using OSRSFlipper.Data;
using OSRSFlipper.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OSRSFlipper.Models;
using OSRSFlipper.Utilities;

namespace OSRSFlipper.StorageServices
{
    public class SkillsActionService
    {
        private ApplicationDbContext dbContext;

        public SkillsActionService(ApplicationDbContext DBContext)
        {
            this.dbContext = DBContext;
        }

        public async Task<SaveResponse> DeleteAllForSkill(string SkillName)
        {
            SaveResponse response = new SaveResponse();

            try
            {
                await dbContext.Database.ExecuteSqlRawAsync("DELETE FROM dbo.SkillActions WHERE SkillName = {0}", SkillName);
            }
            catch(Exception ex)
            {
                response.Messages.AddMessage(ex.Message, Common.MessageLevel.Error);
            }
            return response;
        }

        public async Task<SkillAction[]> GetAllForSkill(string SkillName)
        {
            SkillAction[] response = await dbContext.SkillActions.Where(action => action.SkillName == SkillName).ToArrayAsync();
            return response;
        }

        public async Task<SaveResponse> Save(IEnumerable<SkillAction> SkillActions)
        {
            dbContext.SkillActions.AddRange(SkillActions);
            SaveResponse response = await dbContext.SaveWithResponseAsync();
            return response;
        }

    }
}
