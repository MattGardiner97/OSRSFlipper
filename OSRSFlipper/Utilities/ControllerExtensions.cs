using Microsoft.AspNetCore.Mvc;
using OSRSFlipper.Common;
using OSRSFlipper.Requests;
using OSRSFlipper.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSRSFlipper.Utilities
{
    public static class ControllerExtensions
    {
        public static void ValidateSaveRequest<TViewModel>(this Controller Controller, SaveRequest<TViewModel> SaveRequest)
        { 
            Controller.ModelState.Clear();
            if (Controller.TryValidateModel(SaveRequest.ViewModel, nameof(SaveRequest.ViewModel)) == false)
            {
                foreach (var modelValue in Controller.ModelState.Values.Where(v => v.Errors.Count > 0))
                {
                    foreach (var error in modelValue.Errors)
                        SaveRequest.Messages.AddMessage(error.ErrorMessage, MessageLevel.Error);
                }
            }
        }

    }
}
