var AES = {};

AES.encrypt = function(string, password) {
    return CryptoJS.AES.encrypt(string, password).toString();
};

AES.decrypt = function(string, password) {
    return CryptoJS.AES.decrypt(string, password).toString(CryptoJS.enc.Utf8);
}

function query(queryString) {
    return document.querySelector(queryString);
}

function decodeHtml(html) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
}

function openUrl(url) {
    // is OS X
    if(process.platform == "darwin") {
        spawn("open", [url]);
    } else { // is Windows
        spawn("explorer.exe", [url]);
    }
}

function convertToGw2Money(coins) {
    result = {};

    result.gold = Math.floor(coins / 100 / 100);

    coins -= result.gold * 100 * 100;

    result.silver = Math.floor(coins / 100);

    coins -= result.silver * 100;

    result.copper = coins;

    return result;
}

if(!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;

        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
