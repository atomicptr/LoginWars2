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
