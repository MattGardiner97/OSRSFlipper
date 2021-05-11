//CONSTANTS
const GetAllItemsEndpoint = "/Items/GetAllItems";
const SaveFlipEndpoint = "/Flips/SaveFlip";
const GetFlipsEndpoint = "/Flips/GetFlips";

const FlipModalID = "NewFlipModal";
const TopFlipsTableID = "TopFlipsTable";
const TopItemsTableID = "TopItemsTable";
const AllFlipsTableID = "AllFlipsTable";

//PAGE STATE
var allItems = {};

function UpdateAllItems(Data) {
    allItems = Data;
    GetAllFlips();
}

function GetAllItems() {
    $.get(GetAllItemsEndpoint).done((Data) => {
        UpdateAllItems(Data);
    });
}

function GetTopItems(Flips) {
    var result = [];
    var grouped = GroupBy(Flips, "itemID");

    result = Object.values(grouped).map((items) => {
        //Item, Avg Marign, Total Quantity, Average profit, total profit
        var name = items[0].name;
        var averageMargin = items.reduce((sum, item) => sum + item.margin, 0) / items.length;
        var totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        var averageProfit = items.reduce((sum, item) => sum + item.profit, 0) / items.length;
        var totalProfit = items.reduce((sum, item) => sum + item.profit, 0);

        return {
            id: items[0].itemID,
            name: name,
            averageMargin: averageMargin,
            totalQuantity: totalQuantity,
            averageProfit: averageProfit,
            totalProfit: totalProfit
        };
    });

    result = SortArrayDescending(result, "totalProfit");

    return result;
}

function UpdateFlips(Data) {
    if (Data == null || Data.length == 0 || allItems == null || allItems.length == 0)
        return;

    Data = Data.map((item) => {
        item.name = allItems[item.itemID].name;
        item.margin = item.sellPrice - item.buyPrice;
        item.profit = item.margin * item.quantity;
        return item;
    });

    var totalProfit = Data.reduce((total, item) => {
        return total + item.profit;
    }, 0);
    var averageProfit = totalProfit / Data.length;

    $("#AllTimeProfit").text(totalProfit.toLocaleString(undefined));
    $("#AverageProfit").text(Math.round(averageProfit).toLocaleString(undefined));

    var topFlips = SortArrayDescending(Data, "profit").slice(0, 8);
    var topItems = GetTopItems(Data).slice(0, 8);
    window[TopFlipsTableID].UpdateItems(topFlips);
    window[TopItemsTableID].UpdateItems(topItems);
    window[AllFlipsTableID].UpdateItems(Data);
}

function GetAllFlips() {
    $.get(GetFlipsEndpoint).done((data) => {
        UpdateFlips(data);
    });
}

function PerformSearch(SearchTerm) {
    var searchResult = Object.values(allItems).filter(item => item.name.toLowerCase().includes(SearchTerm.toLowerCase()));
    return searchResult;
}

function ModalSaveButtonClickHandler(SaveData) {
    var newFlipModal = bootstrap.Modal.getInstance($("#" + FlipModalID)[0]);
    newFlipModal.hide();
    $.post(SaveFlipEndpoint, SaveData).done(() => {
        GetAllFlips();
    });
}

function NewFlipButtonClickHandler() {
    window[FlipModalID].Reset();
}


$(document).ready(function () {
    var topFlipsTable = [
        { Name: "name", Type: "link", Header: "Item", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.id; }, DataType: "string" },
        { Name: "buyPrice", Type: "label", Header: "Buy Price", DataType: "number" },
        { Name: "sellPrice", Type: "label", Header: "Sell Price", DataType: "number" },
        { Name: "margin", Type: "label", Header: "Margin", DataType: "number" },
        { Name: "quantity", Type: "label", Header: "Quantity", DataType: "number" },
        { Name: "profit", Type: "label", Header: "Profit", DataType: "number" }
    ];

    var topItemsTable = [
        { Name: "name", Type: "link", Header: "Item", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.id; }, DataType: "string" },
        { Name: "averageMargin", Type: "label", Header: "Margin (Avg)", DataType: "number" },
        { Name: "totalQuantity", Type: "label", Header: "Quantity (Total)", DataType: "number" },
        { Name: "averageProfit", Type: "label", Header: "Profit (Avg)", DataType: "number" },
        { Name: "totalProfit", Type: "label", Header: "Profit (Total)", DataType: "number" }
    ];

    var allFlipsTable = [
        { Name: "name", Type: "link", Header: "Item", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.id; }, DataType: "string" },
        { Name: "buyPrice", Type: "label", Header: "Buy Price", DataType: "number" },
        { Name: "sellPrice", Type: "label", Header: "Sell Price", DataType: "number" },
        { Name: "margin", Type: "label", Header: "Margin", DataType: "number" },
        { Name: "quantity", Type: "label", Header: "Quantity", DataType: "number" },
        { Name: "profit", Type: "label", Header: "Profit", DataType: "number" },
        { Name: "date", Type: "customLabel", Header: "Date", DataType: "date", GetCustomLabel: (RowData) => { var date = new Date(RowData.date); return `${date.getDate()}/${date.getMonth() +1}/${date.getYear() + 1900}`; } }
    ];

    ReactDOM.render(<NewFlipModal ModalID={FlipModalID} ModalTitle="New Flip" PerformSearchCallback={PerformSearch} SaveButtonClickHandler={ModalSaveButtonClickHandler} WindowID={FlipModalID} />, $("#NewFlipModalContainer")[0]);
    ReactDOM.render(<ItemTable WindowName={TopFlipsTableID} Columns={topFlipsTable} CanFilter={false} CanSort={false} />, $(`#${TopFlipsTableID}`)[0]);
    ReactDOM.render(<ItemTable WindowName={TopItemsTableID} Columns={topItemsTable} CanFilter={false} CanSort={false} />, $(`#${TopItemsTableID}`)[0]);
    ReactDOM.render(<ItemTable WindowName={AllFlipsTableID} Columns={allFlipsTable} CanFilter={true} CanSort={true} SortColumn="date" SortAscending={false} />, $(`#${AllFlipsTableID}`)[0]);


    GetAllItems();
});