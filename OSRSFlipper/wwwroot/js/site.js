//PAGE ELEMENTS
var LoginModal = $("#LoginModal");
var LoginModalHeader = LoginModal.find("#ModalHeader");

function ShowLoginModal(Message) {
    if (Message == "")
        Message = "Log in to continue";

    LoginModalHeader.text(Message);
    LoginModal.modal();
}

function FormatDateForHTML(DateValue) {
    if (DateValue == null)
        return "";

    DateValue = new Date(DateValue);

    var year = String(DateValue.getYear() + 1900);
    var month = String(DateValue.getMonth() + 1);
    var day = String(DateValue.getDate());

    if (month.length == 1)
        month = "0" + month;

    if (day.length == 1)
        day = "0" + day;

    var result = year + "-" + month + "-" + day;
    return result;
}

function SortArray(Array, FieldName) {
    var result = Array.slice();
    result.sort((a, b) => {
        if (a[FieldName] == b[FieldName])
            return 0;
        return a[FieldName] < b[FieldName] ? -1 : 1;
    });
    return result;
}

function SortArrayDescending(Array, FieldName) {
    var result = Array.slice();
    result.sort((a, b) => {
        if (a[FieldName] == b[FieldName])
            return 0;
        return a[FieldName] > b[FieldName] ? -1 : 1;
    });
    return result;
}

function GroupBy(Array, Key) {
    var dict = {};

    Array.forEach((item) => {
        var keyValue = item[Key];
        if (dict[keyValue] == undefined) {
            dict[keyValue] = [];
        }

        dict[keyValue].push(item);
    });

    return dict;
}

function LoadRequiredCSS(Filenames) {
    Filenames.forEach((file) => {
        var existing = $("link[href='/css/" + file + "']");           
        if (existing.length == 0)
            $("head").append(`<link rel="stylesheet" href="/css/${file}"/>`);
    });
}

function LoadRequiredJS(Filenames) {
    Filenames.forEach((file) => {
        var existing = $("script[src='/js/" + file + "']");
        if (existing.length == 0)
            $("head").append(`<script src="/js/${file}"></script>`);
    });
}