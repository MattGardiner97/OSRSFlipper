$('head').append('<link rel="stylesheet" type="text/css" href="/css/NewFlipModal.css">');

class NewFlipModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ItemID: "",
            BuyPrice: 0,
            SellPrice: 0,
            Quantity: 0,
            Date: FormatDateForHTML(new Date()),
            TextboxKeyCounter: 0,
            itemIDErrors: false, buyPriceErrors: false, sellPriceErrors: false, quantityErrors: false, dateErrors: false
        };

        window[this.props.WindowID] = this;

        this.SelectedItemChangedHandler = this.SelectedItemChangedHandler.bind(this);
        this.SaveButtonClickHandler = this.SaveButtonClickHandler.bind(this);
        this.FormValueChangedHandler = this.FormValueChangedHandler.bind(this);
    }

    ValidateSaveData(SaveData) {
        var intMax = Math.pow(2,32) - 1;

        var itemID = SaveData.ItemID;
        var buyPrice = SaveData.BuyPrice;
        var sellPrice = SaveData.SellPrice;
        var quantity = SaveData.Quantity;
        var date = new Date(SaveData.Date);

        var itemErrors = false;
        var buyPriceErrors = false;
        var sellPriceErrors = false;
        var quantityErrors = false;
        var dateErrors = false;

        itemErrors = itemID < 1 || itemID > intMax;
        buyPriceErrors = buyPrice < 1 || buyPrice > intMax;
        sellPriceErrors = sellPrice < 1 || sellPrice > intMax;
        quantityErrors = quantity < 1 || quantity > intMax;
        dateErrors = Number(date) > Number(new Date());

        this.setState({
            itemIDErrors: itemErrors,
            buyPriceErrors: buyPriceErrors,
            sellPriceErrors: sellPriceErrors,
            quantityErrors: quantityErrors,
            dateErrors: dateErrors
        });

        if (itemErrors || buyPriceErrors || sellPriceErrors || quantityErrors || dateErrors)
            return false;

        return true;
    }

    SaveButtonClickHandler() {
        var saveData = {
            ItemID: this.state.ItemID,
            BuyPrice: this.state.BuyPrice,
            SellPrice: this.state.SellPrice,
            Quantity: this.state.Quantity,
            Date: this.state.Date
        };

        if (this.ValidateSaveData(saveData))
            this.props.SaveButtonClickHandler(saveData);
    }

    SelectedItemChangedHandler(itemID) {
        this.setState({
            ItemID: itemID
        });
    }

    FormValueChangedHandler(event) {
        var fieldName = $(event.currentTarget).attr("name");
        var newValue = $(event.currentTarget).val();

        switch (fieldName.toLowerCase()) {
            case "buyprice":
                this.setState({ BuyPrice: newValue });
                break;
            case "sellprice":
                this.setState({ SellPrice: newValue });
                break;
            case "quantity":
                this.setState({ Quantity: newValue });
                break;
            case "date":
                this.setState({ Date: newValue });
                break;
        }
    }

    Reset() {
        this.setState({
            ItemID: "",
            BuyPrice: 0,
            SellPrice: 0,
            Quantity: 0,
            Date: FormatDateForHTML(new Date()),
            TextboxKeyCounter: this.state.TextboxKeyCounter + 1
        })
    }

    render() {
        var buyPriceClass = this.state.buyPriceErrors ? "form-control border-danger" : "form-control";
        var sellPriceClass = this.state.sellPriceErrors ? "form-control border-danger" : "form-control";
        var quantityClass = this.state.quantityErrors ? "form-control border-danger" : "form-control";
        var dateClass = this.state.dateErrors ? "form-control border-danger" : "form-control";

        return <div className="modal fade" id={this.props.ModalID}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.ModalTitle}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Item</label>
                            <ItemSearchTextbox PerformSearchCallback={this.props.PerformSearchCallback} HasErrors={this.state.itemIDErrors} SelectedItemChangedHandler={this.SelectedItemChangedHandler} key={this.state.TextboxKeyCounter} />
                        </div>
                        <div className="d-flex">
                            <div className="mb-3 flex-grow-1 me-1">
                                <label className="form-label">Buy Price</label>
                                <input type="number" className={buyPriceClass} min="1" name="BuyPrice" onChange={this.FormValueChangedHandler} value={this.state.BuyPrice} />
                            </div>
                            <div className="form-group flex-grow-1 ms-1 me-1">
                                <label className="form-label">Sell Price</label>
                                <input type="number" className={sellPriceClass} min="1" name="SellPrice" onChange={this.FormValueChangedHandler} value={this.state.SellPrice} />
                            </div>
                            <div className="mb-3 flex-grow-1 me-1">
                                <label className="form-label">Quantity</label>
                                <input type="number" className={quantityClass} min="1" name="Quantity" onChange={this.FormValueChangedHandler} value={this.state.Quantity} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Flip Date</label>
                            <input type="date" className={dateClass} name="Date" onChange={this.FormValueChangedHandler} value={FormatDateForHTML(this.state.Date)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="float-right">
                            <button className="btn btn-secondary me-1" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={this.SaveButtonClickHandler}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

class ItemSearchTextbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchResults: [],
            ShowDropdown: false,
            SelectedItemID: "",
            SelectedItemName: ""
        };

        this.ValueChanged = this.ValueChanged.bind(this);
        this.InputFocused = this.InputFocused.bind(this);
        this.InputUnfocused = this.InputUnfocused.bind(this);
        this.DropdownItemClickHandler = this.DropdownItemClickHandler.bind(this);
    }


    ValueChanged(event) {
        var searchTerm = $(event.currentTarget).val();
        if (searchTerm == "") {
            this.setState({ SearchResults: null });
            return;
        }

        var searchResults = this.props.PerformSearchCallback(searchTerm);
        this.setState({ SearchResults: searchResults, SelectedItemName: searchTerm });
    }

    InputFocused(event) {
        this.setState({ ShowDropdown: true });
    }

    InputUnfocused(event) {
        setTimeout(() => {
            this.setState({ ShowDropdown: false });
        }, 100);
    }

    DropdownItemClickHandler(itemID) {
        var item = this.state.SearchResults.filter(i => i.id == itemID)[0];
        this.setState({
            SelectedItemID: item.id,
            SelectedItemName: item.name
        });
        this.props.SelectedItemChangedHandler(item.id);
    }

    render() {
        var inputClass = this.props.HasErrors ? "form-control dropdown-toggle border-danger" : "form-control dropdown-toggle";

        return (
            <div>
                <input type="text" className={inputClass} data-bs-toggle="dropdown" placeholder="Search for an item..." onChange={this.ValueChanged} onFocus={this.InputFocused} onBlur={this.InputUnfocused} value={this.state.SelectedItemName} />
                <ItemDropdownList Show={this.state.ShowDropdown} Items={this.state.SearchResults} DropdownItemClickHandler={this.DropdownItemClickHandler} />
            </div>)
    }
}

class ItemDropdownLine extends React.Component {
    render() {
        return (<li className="itemDropdownLine" onClick={() => this.props.DropdownItemClickHandler(this.props.Item.id)}>{this.props.Item.name}</li>)
    }
}

class ItemDropdownList extends React.Component {
    RenderItems() {
        var result = [];

        for (var i = 0; i < Math.min(this.props.Items.length, 10); i++) {
            var item = this.props.Items[i];
            result.push(<ItemDropdownLine key={item.id} Item={item} DropdownItemClickHandler={this.props.DropdownItemClickHandler} />)
        }

        return result;
    }

    render() {
        if (this.props.Items == null || this.props.Items.length == 0)
            return null;

        var className = this.props.Show ? "itemDropdown" : "d-none";

        return (
            <ul className={className} >
                {this.RenderItems()}
            </ul>
        )
    }
}