class SkillCalculator extends React.Component {
    constructor(props) {
        super(props);

        LoadRequiredJS(["ItemTable.jsx"]);

        this.state = {
            PlayerXP: { CurrentLevel: 1, CurrentXP: 0, TargetLevel: 2, TargetXP: 83, RequiredXP: 83 },
            ActionsTableID: this.props.ObjectID + "ActionsTable"
        };

        this.PlayerXPSectionValueChangedHandler = this.PlayerXPSectionValueChangedHandler.bind(this);
        this.SkillDropdownChangedHandler = this.SkillDropdownChangedHandler.bind(this);
        this.SetSkillActions = this.SetSkillActions.bind(this);

        window[this.props.ObjectID] = this;
    }

    GetXPRequiredForLevel(Level) {
        const xpRequirements = [0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842,
            8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
            111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445,
            899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831,
            6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];

        return xpRequirements[Level - 1];
    }

    GetLevelFromXP(XP) {
        for (var i = 1; i <= 99; i++) {
            if (XP >= this.GetXPRequiredForLevel(i) && XP < this.GetXPRequiredForLevel(i + 1))
                return i;
        }

        return 0;
    }

    SetSkillActions(SkillActions) {
        SkillActions = this.CalculateActionsRequired(SkillActions);

        this.setState({ SkillActions: SkillActions });
        window[this.state.ActionsTableID].UpdateItems(SkillActions);
    }

    CalculateActionsRequired(SkillActions) {
        if (SkillActions == null || SkillActions.length == 0)
            return SkillActions;

        var result = SkillActions.slice();
        var requiredXP = this.state.PlayerXP.RequiredXP;

        result.forEach(action => {
            var actionsRequired = Math.ceil(requiredXP / action.xp);
            action.actionsRequired = actionsRequired;
        });

        return result;
    }

    //Event Handlers
    PlayerXPSectionValueChangedHandler(ChangedFieldName, NewValue) {
        var newPlayerXP = this.state.PlayerXP;
        NewValue = Number(NewValue);

        switch (ChangedFieldName) {
            case "CurrentLevel":
                newPlayerXP.CurrentLevel = NewValue;
                newPlayerXP.CurrentXP = this.GetXPRequiredForLevel(NewValue);

                if (newPlayerXP.TargetLevel <= NewValue) {
                    newPlayerXP.TargetLevel = NewValue == 99 ? 99 : NewValue + 1;
                    newPlayerXP.TargetXP = this.GetXPRequiredForLevel(newPlayerXP.TargetLevel);
                }
                break;
            case "CurrentXP":
                newPlayerXP.CurrentLevel = this.GetLevelFromXP(NewValue);
                newPlayerXP.CurrentXP = NewValue;

                if (newPlayerXP.TargetLevel <= newPlayerXP.CurrentLevel) {
                    newPlayerXP.TargetLevel = NewValue == 99 ? 99 : NewValue + 1;
                    newPlayerXP.TargetXP = this.GetXPRequiredForLevel(newPlayerXP.TargetLevel);
                }
                break;
            case "TargetLevel":
                newPlayerXP.TargetLevel = NewValue;
                newPlayerXP.TargetXP = this.GetXPRequiredForLevel(NewValue);

                if (newPlayerXP.CurrentLevel >= NewValue) {
                    newPlayerXP.CurrentLevel = NewValue - 1;
                    newPlayerXP.CurrentXP = this.GetXPRequiredForLevel(newPlayerXP.CurrentLevel);
                }
                break;
            case "TargetXP":
                newPlayerXP.TargetLevel = this.GetLevelFromXP(NewValue);
                newPlayerXP.TargetXP = NewValue;

                if (newPlayerXP.CurrentLevel >= newPlayerXP.TargetLevel) {
                    newPlayerXP.CurrentLevel = NewValue - 1;
                    newPlayerXP.CurrentXP = this.GetXPRequiredForLevel(newPlayerXP.CurrentLevel);
                }
                break;
        }

        newPlayerXP.RequiredXP = newPlayerXP.TargetXP - newPlayerXP.CurrentXP;

        var skillActions = this.CalculateActionsRequired(this.state.SkillActions);
        this.SetSkillActions(skillActions);

        this.setState({ PlayerXP: newPlayerXP });

    }

    SkillDropdownChangedHandler(Event) {
        var skillname = $(Event.currentTarget).val();
        if (skillname == null || skillname == "")
            return;

        this.props.SkillChangedHandler(skillname);
    }

    //Render Methods
    RenderSkillNameDropdown() {
        var options = [];

        options.push(<option key={0}></option>)
        for (var i = 0; i < this.props.SkillNames.length; i++) {
            var name = this.props.SkillNames[i];
            options.push(<option key={i + 1} value={name}>{name}</option>);
        }

        return (<select key={0} onChange={this.SkillDropdownChangedHandler}>{options}</ select>);
    }

    render() {
        var result = [];

        var actionsColumns = [
            { Name: "levelRequired", Type: "label", Header: "Level Required", DataType: "number" },
            { Name: "name", Type: "label", Header: "Name", DataType: "string" },
            { Name: "xp", Type: "label", Header: "XP", DataType: "number" },
            { Name: "actionsRequired", Type: "label", Header: "Actions Required", DataType: "number" },
            { Name: "category", Type: "label", Header: "Category", DataType: "string" },
        ];

        result.push(this.RenderSkillNameDropdown());
        result.push(<PlayerXPSection key={1} PlayerXP={this.state.PlayerXP} ValueChangedHandler={this.PlayerXPSectionValueChangedHandler} />);
        result.push(<ItemTable key={2} WindowName={this.state.ActionsTableID} Columns={actionsColumns} PageSize="200" SortColumn="levelRequired" SortAscending={true} CanFilter="false" />)

        return result;
    }
}

class PlayerXPSection extends React.Component {
    constructor(props) {
        super(props);

        this.InputChangedHandler = this.InputChangedHandler.bind(this);
    }

    InputChangedHandler(Event) {
        var element = $(Event.currentTarget);
        var name = element.attr("name");
        var value = element.val();

        this.props.ValueChangedHandler(name, value);
    }

    render() {
        return (
            <div className="w-50 mx-auto">
                <div className="row">
                    <div className="col">
                        <div>
                            <label>Current Level</label>
                            <input className="form-control" type="number" min="1" max="99" value={this.props.PlayerXP.CurrentLevel} name="CurrentLevel" onChange={this.InputChangedHandler} />
                        </div>
                        <div>
                            <label>Current XP</label>
                            <input className="form-control" type="number" value={this.props.PlayerXP.CurrentXP} name="CurrentXP" onChange={this.InputChangedHandler} />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <label>Target Level</label>
                            <input className="form-control" type="number" min="2" max="99" value={this.props.PlayerXP.TargetLevel} name="TargetLevel" onChange={this.InputChangedHandler} />
                        </div>
                        <div>
                            <label>Target XP</label>
                            <input className="form-control" type="number" value={this.props.PlayerXP.TargetXP} name="TargetXP" onChange={this.InputChangedHandler} />
                        </div>
                    </div>
                </div>
                <div>
                    <label>Required XP</label>
                    <input className="form-control" type="number" value={this.props.PlayerXP.RequiredXP} readOnly={true} />
                </div>
            </div>
        )
    }
}