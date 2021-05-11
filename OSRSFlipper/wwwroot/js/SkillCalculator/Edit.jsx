//Constants
const ActionsFormID = "SkillsForm";

const AllSkillNamesEndpoint = "/SkillsCalculator/GetAllSkillNames";
const GetSkillActionsEndpoint = "/SkillsCalculator/GetActionsForSkill";
const SaveSkillActionsEndpoint = "/SkillsCalculator/Save";

//Page elements
var SkillNameDropdown = $("#SkillNameDropdown");

function GetAllSkillNames() {
    $.get(AllSkillNamesEndpoint).done(data => {
        data.forEach(skillname => {
            SkillNameDropdown.append(`<option value='${skillname}'>${skillname}</option>`);
        });
        GetExistingActions();
    });
}

function GetExistingActions() {
    var skillName = SkillNameDropdown.val();
    $.get(GetSkillActionsEndpoint, { SkillName: skillName }).done(actions => {
        window[ActionsFormID].SetItems(actions);
    });
}

//Event Handlers
function SkillNameDropdownChangeHandler() {
    GetExistingActions();
}

function SaveButtonClickHandler() {
    var items = window[ActionsFormID].GetItems();
    var skillName = SkillNameDropdown.val();
    items.forEach(item => item.SkillName = skillName);

    $.post(SaveSkillActionsEndpoint, { Actions: items });
}

$(document).ready(() => {
    var columns = [
        { Name: "name", Header: "Action", DataType: "text" },
        { Name: "levelRequired", Header: "Required Level", DataType: "number" },
        { Name: "xp", Header:"XP", DataType:"number" },
        { Name: "category", Header:"Category", DataType:"text" }
    ];

    GetAllSkillNames();

    ReactDOM.render(<CollectionForm Columns={columns} VariableID={ActionsFormID} />, $(`#${ActionsFormID}`)[0]);

});
