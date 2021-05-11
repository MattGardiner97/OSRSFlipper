class ItemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Columns: this.props.Columns,
            Items: null,
            DisplayItems: null,
            PageSize: this.props.PageSize,
            CurrentPage: 1,
            SortColumn: this.props.SortColumn,
            SortAscending: this.props.SortAscending,
            CurrentFilters: {}
        };
        window[this.props.WindowName] = this;

        //Header binds
        this.RenderHeaders = this.RenderHeaders.bind(this);
        this.HandleHeaderClick = this.HandleHeaderClick.bind(this);

        //Filter binds
        this.RenderFilterSection = this.RenderFilterSection.bind(this);
        this.HandleFilterChanged = this.HandleFilterChanged.bind(this);

        //Page number binds
        this.AddRenderPageNumber = this.AddRenderPageNumber.bind(this);
        this.HandlePageNumberClick = this.HandlePageNumberClick.bind(this);
    }

    ////////// Helpers //////////
    GetNumberOrString(Value) {
        var numValue = Number(Value);
        if (isNaN(numValue))
            return Value;
        return numValue;
    }

    SortData(Data, SortColumn, Ascending = true) {
        var result = Data.slice();

        result = result.sort((a, b) => {
            var aValue = this.GetNumberOrString(a[SortColumn]);
            var bValue = this.GetNumberOrString(b[SortColumn]);

            var result = 0;

            if (aValue < bValue)
                result = -1;
            else if (aValue > bValue)
                result = 1;
            else
                return 0;

            if (Ascending == false)
                result *= -1;
            return result;
        });
        return result;
    }

    Sort(Data) {
        if (this.state.SortColumn != null) {
            var sortColumn = this.state.SortColumn;
            var sortAscending = this.state.SortAscending;

            return this.SortData(Data, sortColumn, sortAscending);
        }
        return Data;

    }

    ApplyFilters(Data) {
        if (Data == null)
            return;

        var filters = this.state.CurrentFilters;
        var results = Data.slice();

        for (var f in filters) {
            var f = filters[f];
            if (f.Value == "")
                continue;

            if (f.Operator == "") {
                results = results.filter(item => item[f.ColumnName].toLowerCase().includes(f.Value.toLowerCase()));
            }
            else {
                switch (f.Operator) {
                    case "=":
                        results = results.filter(item => item[f.ColumnName] == f.Value);
                        break;
                    case "<":
                        results = results.filter(item => Number(item[f.ColumnName]) < Number(f.Value));
                        break;
                    case ">":
                        results = results.filter(item => Number(item[f.ColumnName]) > Number(f.Value));
                        break;
                }
            }
        }

        return results;
    }

    UpdateDisplayItems() {
        var data = this.state.Items;
        if (data == null)
            return;

        var filtered = this.ApplyFilters(data)
        var sorted = this.Sort(filtered);

        this.setState({ DisplayItems: sorted });
    }

    UpdateItems(Items) {
        this.setState({ Items: Items });
        this.UpdateDisplayItems();
    }

    ////////// Event Handlers //////////
    async HandleHeaderClick(ColumnName) {
        var sortAscending = this.state.SortAscending;

        if (this.state.SortColumn == ColumnName)
            sortAscending = !sortAscending;
        else
            sortAscending = true;

        await this.setState({
            SortColumn: ColumnName,
            SortAscending: sortAscending,
        });

        this.UpdateDisplayItems();
    }

    async HandleFilterChanged(ColumnIndex, Operator, NewValue) {
        var columnName = this.state.Columns[ColumnIndex].Name;
        var newFilter = { ColumnName: columnName, Operator: Operator, Value: NewValue };
        var currentFilters = this.state.CurrentFilters;
        currentFilters[ColumnIndex] = newFilter;
        await this.setState({ CurrentFilters: currentFilters });

        this.UpdateDisplayItems();
    }

    HandlePageNumberClick(LabelText) {
        var pageNumber = Number(LabelText);
        if (isNaN(pageNumber) == false)
            this.setState({ CurrentPage: pageNumber });
        else if (LabelText.includes("Next"))
            this.setState({ CurrentPage: this.state.CurrentPage + 1 });
        else if (LabelText.includes("Prev"))
            this.setState({ CurrentPage: this.state.CurrentPage - 1 });
    }

    componentDidMount() {
        //this.UpdateDisplayItems();
    }

    ////////// Render functions //////////
    RenderHeaders() {
        var results = [];
        for (var i = 0; i < this.state.Columns.length; i++) {
            if (this.state.Columns[i].Name == this.state.SortColumn)
                results.push(<ItemTableHeader Text={this.state.Columns[i].Header} SortAscending={this.state.SortAscending} ColumnName={this.state.Columns[i].Name} key={i} ClickHandler={this.HandleHeaderClick} />);
            else
                results.push(<ItemTableHeader Text={this.state.Columns[i].Header} key={i} ColumnName={this.state.Columns[i].Name} ClickHandler={this.HandleHeaderClick} />);
        }
        return results;

    }

    RenderBody() {
        if (this.state.DisplayItems != null) {
            var PageSize = Number(this.state.PageSize);
            var CurrentPage = Number(this.state.CurrentPage) - 1;

            var start = CurrentPage * PageSize;
            var end = start + PageSize;
            const result = this.state.DisplayItems
                .slice(start, end)
                .map((item, index) => <ItemTableRow key={item.id} RowData={item} Columns={this.state.Columns} />);
            return result;
        }
    }

    AddRenderPageNumber(Text, IsCurrent, ResultArray) {
        ResultArray.push(<PageNumber key={ResultArray.length} Text={Text} Current={IsCurrent} ClickHandler={this.HandlePageNumberClick} />);
    }

    RenderPageNumbers() {
        if (this.state.DisplayItems == null)
            return;

        var itemCount = this.state.DisplayItems.length;
        var totalPages = Math.ceil(itemCount / this.state.PageSize);

        const add = this.AddRenderPageNumber;

        var result = [];

        if (this.state.CurrentPage != 1)
            add("< Prev", false, result);

        if (totalPages <= 4) {
            for (var i = 1; i <= totalPages; i++)
                add(i, this.state.CurrentPage == i, result);
        }
        else {
            if (this.state.CurrentPage != 1)
                add(1, false, result);

            if (this.state.CurrentPage > 3)
                add("...", true, result);

            if (this.state.CurrentPage >= 3)
                add(this.state.CurrentPage - 1, false, result);

            add(this.state.CurrentPage, true, result);

            if (this.state.CurrentPage + 1 < totalPages)
                add(this.state.CurrentPage + 1, false, result);

            if (totalPages - 3 > this.state.CurrentPage)
                add("...", true, result);

            if (this.state.CurrentPage != totalPages)
                add(totalPages, false, result);
        }

        if (this.state.CurrentPage != totalPages)
            add("Next >", false, result);

        return result;
    }

    RenderFilterSection() {
        return (<FilterSection Columns={this.state.Columns} FilterChangedHandler={this.HandleFilterChanged} />);
    }

    render() {

        return (
            <div>
                {this.RenderFilterSection()}

                <table className="table table-hover">
                    <thead>
                        <tr>
                            {this.RenderHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderBody()}
                    </tbody>
                </table>
                <div>
                    {this.RenderPageNumbers()}
                </div>
            </div>
        );
    }


}

class ItemTableHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    RenderArrow() {
        if (this.props.SortAscending != null)
            return (<span className="ml-1" style={{ fontSize: "x-large" }}>{this.props.SortAscending ? "↑" : "↓"}</span>)
    }

    render() {
        return (
            <th style={{ cursor: "pointer", userSelect: "none" }} className="p-1" ref={this.ref} onClick={() => this.props.ClickHandler(this.props.ColumnName)}>{this.props.Text}{this.RenderArrow()}</th>
        );
    }
}

class ItemTableRow extends React.Component {
    RenderLabelCell(LabelText, Key) {
        return (<td className="p-1" key={Key}>{LabelText}</td>);
    }

    RenderImageCell(ImageURL, Key) {
        return (<td className="p-1" key={Key}><img src={ImageURL} /></td>);
    }

    RenderLinkCell(LinkURL, LinkText, Key) {
        return (<td className="p-1" key={Key}><a href={LinkURL}>{LinkText}</a></td>);
    }

    RenderCells() {
        const result = this.props.Columns.map((column, index) => {
            switch (column.Type) {
                case "label":
                    return this.RenderLabelCell(this.props.RowData[column.Name], index);
                case "image":
                    var imageURL = column.GetImageURL(this.props.RowData);
                    return this.RenderImageCell(imageURL, index);
                case "link":
                    var link = column.GetLinkURL(this.props.RowData);
                    return this.RenderLinkCell(link, this.props.RowData[column.Name], index);
            }
        });
        return result;
    }

    RenderRow() {
        return (<tr>{this.RenderCells()}</tr >);
    }

    render() {
        return (this.RenderRow())
    }
}


class PageNumber extends React.Component {
    render() {
        if (this.props.Current) {
            return (<span className='mx-1'>{this.props.Text}</span>);
        }
        else {
            return (<a className='mx-1' href="#" onClick={() => this.props.ClickHandler(this.props.Text)}>{this.props.Text}</a>);
        }
    }
}

class FilterOperatorDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.SelectChanged = this.SelectChanged.bind(this);
    }

    SelectChanged(Target) {
        var value = $(Target.currentTarget).val();
        this.props.SelectionChangedHandler(value);
    }

    render() {
        return (
            <select onChange={this.SelectChanged} disabled={this.props.Disabled}>
                <option value="=">=</option>
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
            </select>
        )
    }
}

class FilterTextbox extends React.Component {
    constructor(props) {
        super(props);

        this.InputHandler = this.InputHandler.bind(this);
    }

    InputHandler(Target) {
        var newValue = $(Target.currentTarget).val();
        this.props.TextInputHandler(newValue);
    }

    render() {
        return (
            <input type="text" onInput={this.InputHandler} />
        )
    }
}

class FilterItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnIndex: this.props.ColumnIndex,
            Operator: "=",
            Value: ""
        }

        this.HandleOperatorChanged = this.HandleOperatorChanged.bind(this);
        this.HandleTextInput = this.HandleTextInput.bind(this);
    }

    UpdateFilter() {
        var value = this.state.Value;
        var operator = this.state.Operator;
        if (isNaN(value))
            operator = "";
        this.props.FilterChangedHandler(this.state.ColumnIndex, operator, value);
    }

    async HandleOperatorChanged(NewOperator) {
        await this.setState({ Operator: NewOperator });
        this.UpdateFilter();
    }

    async HandleTextInput(NewValue) {
        await this.setState({ Value: NewValue });
        this.UpdateFilter();
    }

    render() {
        var result = [];

        result.push(<td key={this.props.ColumnIndex * 3}>{this.props.Label}</td>)
        if (this.props.DataType == "number")
            result.push(<td key={(this.props.ColumnIndex * 3) + 2}><FilterOperatorDropdown SelectionChangedHandler={this.HandleOperatorChanged} /></td>)
        else
            result.push(<td key={(this.props.ColumnIndex * 3) + 2}><FilterOperatorDropdown SelectionChangedHandler={this.HandleOperatorChanged} Disabled={true} /></td>)
        result.push(<td key={(this.props.ColumnIndex * 3) + 1}><FilterTextbox TextInputHandler={this.HandleTextInput} /></td>)


        return result;
    }
}

class FilterSection extends React.Component {
    constructor(props) {
        super(props);
    }

    RenderFilterRow(Columns, RowIndex) {
        var result = [];
        for (var i = 0; i < 3; i++) {
            var columnIndex = (RowIndex * 3) + i;
            if (columnIndex >= Columns.length)
                continue;
            var label = Columns[columnIndex].Header;
            var dataType = Columns[columnIndex].DataType;
            if (label == null)
                continue;
            result.push(<FilterItem key={columnIndex} ColumnIndex={columnIndex} Label={label} DataType={dataType} FilterChangedHandler={this.props.FilterChangedHandler} />);
        }

        return result;
    }

    RenderFilters() {
        var result = [];

        var rowCount = Math.ceil(this.props.Columns.length / 3);

        for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            result.push(
                (<tr key={rowIndex}>
                    {this.RenderFilterRow(this.props.Columns, rowIndex)}
                </tr>)
            );
        }

        return result;
    }

    render() {
        return (
            <div>
                <a data-toggle="collapse" href="#FilterCollapse" data-target="#FilterCollapse">
                    Filters
            </a>
                <div className="collapse" id="FilterCollapse">
                    <div className="card card-body">
                        <table>
                            <tbody>
                                {this.RenderFilters()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}