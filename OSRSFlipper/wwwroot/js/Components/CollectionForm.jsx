class CollectionForm extends React.Component {
    constructor(props) {
        super(props);

        var items = this.props.Items;
        if (items == null) {
            items = [];
            items.push(this.GetNewItem());
        }

        this.state = {
            Items: items
        };

        window[this.props.VariableID] = this;

        this.CellValueChangedHandler = this.CellValueChangedHandler.bind(this);
        this.LastCellInputHandler = this.LastCellInputHandler.bind(this);
    }

    //FUNCTIONS
    GetNewItem() {
        var newItem = {};
        for (var i = 0; i < this.props.Columns.length; i++) {
            var col = this.props.Columns[i];
            switch (col.DataType) {
                case "text":
                    newItem[col.Name] = "";
                    break;
                case "number":
                    newItem[col.Name] = 0;
                    break;
            }
        }
        return newItem;
    }

    CreateNewItem() {
        var newItem = this.GetNewItem();

        var items = this.state.Items;
        items.push(newItem);
        this.setState({ Items: items });
    }

    IsItemEmpty(Item) {
        var result = true;
        var allStringsEmpty = true;
        var allNumbersZero = true;

        Object.keys(Item).forEach(key => {
            var value = Item[key];
            if (value == null)
                return;

            switch (typeof (Item[key])) {
                case "string":
                    if (value === "")
                        return;
                    allStringsEmpty = false;
                    break;
                case "number":
                    if (value === 0)
                        return;
                    allNumbersZero = false;
                    break;
            }
        });

        if (allStringsEmpty === false)
            return false;

        if (allStringsEmpty === true) {
            if (allNumbersZero === true)
                return true;
            else
                return false;
        }

    }

    GetItems() {
        if (this.state.Items == null)
            return [];

        var result = this.state.Items.slice();
        if (result.length == 0)
            return result;

        var last = result[result.length - 1];

        if (this.IsItemEmpty(last))
            return result.slice(0, -1);
        else
            return result;
    }

    SetItems(Data) {
        this.setState({ Items: Data });
        this.CreateNewItem();
    }

    //EVENT HANDLERS
    CellValueChangedHandler(Event) {
        var element = $(Event.currentTarget);

        var colName = element.data("columnname");
        var itemIndex = element.data("itemindex");
        var value = element.val();

        var items = this.state.Items;
        var item = items[itemIndex];
        item[colName] = value;
        items[itemIndex] = item;

        this.setState({ Items: items });
    }

    LastCellInputHandler(Event) {
        if (Event.key == "Tab") {
            this.CreateNewItem();
        }
    }

    RemoveRowButtonHandler(Event) {
        var itemIndex = $(Event.currentTarget).data("itemindex");

        var items = this.state.Items;
        item.splice(itemIndex, 1);
        this.setState({ Items: items });
    }

    //RENDER METHODS
    RenderHeader() {
        var result = [];
        for (var i = 0; i < this.props.Columns.length; i++) {
            var column = this.props.Columns[i];
            result.push(<th key={i}>{column.Header}</th>);
        }

        return result;
    }

    RenderBodyCell(Value, ColumnName, ItemIndex, Last = false) {
        return (
            <td key={ColumnName + ItemIndex}>
                <input className="form-control"
                    type="text"
                    value={Value}
                    data-columnname={ColumnName}
                    data-itemindex={ItemIndex}
                    onChange={this.CellValueChangedHandler}
                    onKeyDown={Last != false ? this.LastCellInputHandler : null}
                />
            </td>);
    }

    RenderDeleteCell(ItemIndex) {
        return (
            <td key={"RemoveRow" + ItemIndex}>
                <button className="btn btn-danger"
                    data-itemindex={ItemIndex}
                    onChange={this.RemoveRowButtonHandler}>
                    Remove
                    </button>
            </td>
        )
    }

    RenderBodyRow(Index, Last = false) {
        var cells = [];

        for (var i = 0; i < this.props.Columns.length; i++) {
            var colName = this.props.Columns[i].Name;
            var item = this.state.Items[Index];
            cells.push(this.RenderBodyCell(item[colName], colName, Index, Last && i == this.props.Columns.length - 1));
        }

        cells.push()

        return (<tr>{cells}</tr>);
    }

    RenderBody() {
        var rows = [];

        for (var i = 0; i < this.state.Items.length; i++) {
            rows.push(this.RenderBodyRow(i, i == this.state.Items.length - 1));
        }

        return (<tbody>{rows}</tbody>);
    }

    RenderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {this.RenderHeader()}
                    </tr>
                </thead>
                {this.RenderBody()}
            </table>
        )
    }

    render() {
        return (this.RenderTable())
    }
}