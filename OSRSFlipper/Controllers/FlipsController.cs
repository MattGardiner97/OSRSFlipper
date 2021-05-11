using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OSRSFlipper.Common;
using OSRSFlipper.Data;
using OSRSFlipper.Models;
using OSRSFlipper.Responses;
using OSRSFlipper.Requests;
using OSRSFlipper.StorageServices.Interfaces;
using OSRSFlipper.Utilities;
using OSRSFlipper.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Controllers
{
    [Authorize]
    public class FlipsController : Controller
    {
        private UserManager<IdentityUser> userManager;
        private IFlipService flipService;


        public FlipsController(UserManager<IdentityUser> UserManager, IFlipService FlipService)
        {
            this.userManager = UserManager;
            this.flipService = FlipService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<SaveResponse> SaveFlip(FlipViewModel Item)
        {
            SaveRequest<FlipViewModel> saveRequest = new SaveRequest<FlipViewModel>()
            {
                ViewModel = Item
            };
            SaveResponse saveResponse = new SaveResponse();

            this.ValidateSaveRequest(saveRequest);
            if (saveRequest.Messages.HasErrors)
            {
                saveResponse.Messages.AddMessages(saveRequest.Messages);
                return saveResponse;
            }

            FlipModel flipModel = ModelConverter.Convert<FlipViewModel, FlipModel>(saveRequest.ViewModel);
            flipModel.UserID = await userManager.GetUserIDAsync(HttpContext.User);

            saveResponse = await flipService.SaveFlip(flipModel);

            return saveResponse;
        }

        public async Task<FlipViewModel[]> GetFlips()
        {
            string userID = await userManager.GetUserIDAsync(HttpContext.User);
            FlipModel[] model = await flipService.ReadFlips(userID);
            FlipViewModel[] result = ModelConverter.Convert<FlipModel, FlipViewModel>(model);
            return result;
        }
    }
}
