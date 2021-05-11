using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OSRSFlipper.Models;
using OSRSFlipper.Requests;
using OSRSFlipper.Responses;
using OSRSFlipper.StorageServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OSRSFlipper.Utilities;
using OSRSFlipper.ViewModels;
using OSRSFlipper.Common;

namespace OSRSFlipper.Controllers
{
    public class SkillsCalculatorController : Controller
    {
        private static readonly string[] AllSkillNames = new string[] { "Magic", "Runecrafting", "Construction", "Agility", "Herblore", "Thieving", "Crafting", "Fletching", "Hunter", "Mining", "Smithing", "Fishing", "Cooking", "Firemaking", "Woodcutting", "Farming" };

        private SkillsActionService skillsActionService;

        public SkillsCalculatorController(SkillsActionService SkillsActionService)
        {
            skillsActionService = SkillsActionService;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        [Authorize]
        public async Task<IActionResult> Edit()
        {
            return View();
        }

        public string[] GetAllSkillNames()
        {
            return AllSkillNames;
        }
        
        [Authorize]
        public async Task<SaveResponse> Save(SkillActionViewModel[] Actions)
        {
            var skillNames = Actions.Select(action => action.SkillName).Distinct();

            SaveRequest<SkillActionViewModel[]> request = new SaveRequest<SkillActionViewModel[]>();
            request.ViewModel = Actions;
            this.ValidateSaveRequest(request);

            SaveResponse response = new SaveResponse();
            if (request.Messages.HasErrors)
            {
                response.Messages.AddMessages(request.Messages);
                return response;
            }

            SkillAction[] actionModels = ModelConverter.Convert<SkillActionViewModel, SkillAction>(Actions);

            foreach (string skillName in skillNames)
                await skillsActionService.DeleteAllForSkill(skillName);

            response = await skillsActionService.Save(actionModels);

            return response;
        }

        public async Task<SkillActionViewModel[]> GetActionsForSkill(string SkillName)
        {
            SkillAction[] actions = await skillsActionService.GetAllForSkill(SkillName);
            SkillActionViewModel[] result = ModelConverter.Convert<SkillAction, SkillActionViewModel>(actions);
            return result;
        }

    }
}
