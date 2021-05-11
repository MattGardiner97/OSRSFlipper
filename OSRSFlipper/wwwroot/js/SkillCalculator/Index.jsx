//Constants
const SkillCalculatorID = "SkillCalculator";

const AllSkillNamesEndpoint = "/SkillsCalculator/GetAllSkillNames";
const GetActionsForSkillEndpoint = "SkillsCalculator/GetActionsForSkill";

function SkillChangedHandler(NewSkill) {
    $.get(GetActionsForSkillEndpoint, { SkillName: NewSkill }).done(actions => {
        window[SkillCalculatorID].SetSkillActions(actions);
    });
}

$(document).ready(() => {
    $.get(AllSkillNamesEndpoint).done(data => {
        ReactDOM.render(<SkillCalculator SkillNames={data} SkillChangedHandler={SkillChangedHandler} ObjectID={SkillCalculatorID} />, $(`#${SkillCalculatorID}`)[0]);
    });
});