//CONSTANTS
const AllItemsEndpoint = "/API/GetAllItems";

function UpdateMarginTable(Data) {
    window.ItemMarginTable.UpdateItems(Data);
}

function UpdateAllItems() {
    $.get(AllItemsEndpoint).done((Data) => {
        UpdateMarginTable(Data.allItems);
    });

}

$(document).ready(function () {
    var itemsTableColumns = [
        { Name: "id", Type: "link", Header: "ID", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.id; }, DataType: "number" },
        { Name: "name", Type: "label", Header: "Item", DataType: "string"  },
        { Name: "buyPrice", Type: "label", Header: "Buy Price", DataType: "number"  },
        { Name: "sellPrice", Type: "label", Header: "Sell Price", DataType: "number"  },
        { Name: "margin", Type: "label", Header: "Margin", DataType: "number"  },
        { Name: "volume", Type: "label", Header: "Volume", DataType: "number"  },
        { Name: "highAlch", Type: "label", Header: "High Alch", DataType: "number"  },
        { Name: "highAlchMargin", Type: "label", Header: "High Alch Margin", DataType: "number"  }
    ];

    ReactDOM.render(<CountdownLabel IntervalTime={30} LabelFormat="Next update in {0}" CountdownCompleteHandler={UpdateAllItems} />, $("#CountdownContainer")[0]);
    ReactDOM.render(<ItemTable WindowName="ItemMarginTable" Columns={itemsTableColumns} PageSize="20" SortColumn="volume" SortAscending={false} />, $("#MarginTableContainer")[0]);


    UpdateAllItems();
    //setInterval(UpdateAllItems, 30 * 1000);
});