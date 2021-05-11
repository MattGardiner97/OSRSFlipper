//CONSTANTS
const GetAllItemsEndpoint = "/Items/GetAllItems";
const GetFavouriteItemsEndpoint = "/Favourites/GetFavouriteItems";
const SaveFavouriteItemEndpoint = "/Favourites/SaveFavouriteItem";
const RemoveFavouriteItemEndpoint = "/Favourites/RemoveFavouriteItem";

const AllItemsTableName = "AllItemsTable";
const FavouriteItemsTableName = "FavouriteItemsTable";

//PAGE ELEMENTS
var favouriteItemTable = $("#favouriteItemTable");

//PAGE STATE
var allItems = [];
var favouriteItems = [];

//PAGE FUNCTIONS
function UpdateAllItemsTable(Data) {
    window[AllItemsTableName].UpdateItems(Data);
    if (window.IsLoggedIn == true)
        UpdateFavouritesTable();
}

function UpdateFavouritesTable() {
    var items = allItems.filter(item => favouriteItems.includes(item.id));
    window[FavouriteItemsTableName].UpdateItems(items);
}

function GetAllItems() {
    $.get(GetAllItemsEndpoint).done((Data) => {
        allItems = Object.values(Data);
        UpdateAllItemsTable(allItems);
    });
}

function GetFavouriteItems() {
    $.get(GetFavouriteItemsEndpoint).done((ItemIDs) => {
        favouriteItems = ItemIDs;
        UpdateFavouritesTable();
    }).fail((response) => {
        if (response.status === 401)
            window.IsLoggedIn = false;
    });
}

function UpdateAllItems() {
    GetAllItems();
    GetFavouriteItems();
}


//EVENT HANDLERS
function RowAddFavouriteActionLink_Clicked(RowData) {
    if (window.IsLoggedIn == false) {
        ShowLoginModal("Login to save favourites");
        return;
    }

    var payload = { ItemID: RowData.id };
    $.post(SaveFavouriteItemEndpoint, payload).done(() => {
        GetFavouriteItems();
    }).fail((response) => {
        if (response.status === 401) {
            ShowLoginModal("Login to save favourites");
        }
    });
}

function RowRemoveFavouriteActionLink_Clicked(RowData) {
    if (window.IsLoggedIn == false)
        return;

    var payload = { ItemID: RowData.id };
    $.post(RemoveFavouriteItemEndpoint, payload).done(() => {
        favouriteItems.splice(favouriteItems.indexOf(RowData.id), 1);
        UpdateFavouritesTable();
    }).fail((response) => {
        if (response.status === 401) {
            ShowLoginModal("Login to save favourites");
        }
    });
}

function GetLastTradedString(RowData) {
    var buyTimeSeconds = Math.round((new Date().valueOf() - (RowData.lastBuyTime * 1000)) / 1000);
    var sellTimeSeconds = Math.round((new Date().valueOf() - (RowData.lastSellTime * 1000)) / 1000);

    var buyTimeResult = "0m";
    var sellTimeResult = "0m";

    if (buyTimeSeconds > 60 && buyTimeSeconds < 60 * 60)
        buyTimeResult = `${Math.round(buyTimeSeconds / 60)}m`;
    if (sellTimeSeconds > 60 && sellTimeSeconds < 60 * 60)
        sellTimeResult = `${Math.round(sellTimeSeconds / 60)}m`;

    return `${buyTimeResult}/${sellTimeResult} ago`;
}

$(document).ready(function () {
    var itemsTableColumns = [
        { Name: "name", Type: "link", Header: "Item", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.itemID; }, DataType: "string" },
        { Name: "buyPrice", Type: "label", Header: "Buy Price", DataType: "number" },
        { Name: "sellPrice", Type: "label", Header: "Sell Price", DataType: "number" },
        { Name: "lastTradeTime", Type: "customLabel", Header: "Last Traded", DataType: "string", GetCustomLabel: GetLastTradedString },
        { Name: "margin", Type: "label", Header: "Margin", DataType: "number" },
        { Name: "volume", Type: "label", Header: "Volume", DataType: "number" },
        { Name: "highAlch", Type: "label", Header: "High Alch", DataType: "number" },
        { Name: "highAlchMargin", Type: "label", Header: "High Alch Margin", DataType: "number" },
        { Name: "addFavourite", Type: "actionlink", Header: "", CanFilter: false, ClickHandler: RowAddFavouriteActionLink_Clicked, GetActionLinkText: (RowData) => "Favourite" }
    ];

    var favouritesTableColumns = [
        { Name: "name", Type: "link", Header: "Item", GetLinkURL: (RowData) => { return "https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=" + RowData.id; }, DataType: "string" },
        { Name: "buyPrice", Type: "label", Header: "Buy Price", DataType: "number" },
        { Name: "sellPrice", Type: "label", Header: "Sell Price", DataType: "number" },
        { Name: "lastTradeTime", Type: "customLabel", Header: "Last Traded", DataType: "string", GetCustomLabel: GetLastTradedString },
        { Name: "margin", Type: "label", Header: "Margin", DataType: "number" },
        { Name: "volume", Type: "label", Header: "Volume", DataType: "number" },
        { Name: "highAlch", Type: "label", Header: "High Alch", DataType: "number" },
        { Name: "highAlchMargin", Type: "label", Header: "High Alch Margin", DataType: "number" },
        { Name: "removeFavourite", Type: "actionlink", Header: "", CanFilter: false, ClickHandler: RowRemoveFavouriteActionLink_Clicked, GetActionLinkText: (RowData) => "Remove" }

    ]

    ReactDOM.render(<ItemTable WindowName={FavouriteItemsTableName} Columns={favouritesTableColumns} PageSize="20" SortColumn="Volume" SortAscending={false} />, $("#FavouritesTableContainer")[0]);
    ReactDOM.render(<CountdownLabel IntervalTime={30} LabelFormat="Next update in {0}" CountdownCompleteHandler={UpdateAllItems} />, $("#CountdownContainer")[0]);
    ReactDOM.render(<ItemTable id="FavouriteItemTable" WindowName={AllItemsTableName} Columns={itemsTableColumns} PageSize="20" SortColumn="volume" SortAscending={false} />, $("#MarginTableContainer")[0]);


    UpdateAllItems();

});