Element.prototype.Remove = function () {
    this.parentElement.removeChild(this);
};
Element.prototype.MoveElementUp = function (times = 1) {
    while (times > 0) {
        if (this.previousElementSibling)
            this.parentNode.insertBefore(this, this.previousElementSibling);
        else
            break;
        times--;
    }
};
Element.prototype.MoveElementDown = function (times = 1) {
    while (times > 0) {
        if (this.nextElementSibling)
            this.parentNode.insertBefore(this.nextElementSibling, this);
        else
            break;
        times--;
    }
};
NodeList.prototype.Remove = HTMLCollection.prototype.Remove = function () {
    for (let i = this.length - 1; i >= 0; i--)
        if (this[i] && this[i].parentElement)
            this[i].parentElement.removeChild(this[i]);
};
String.prototype.replaceAll = function (find, replace) {
    let str = this;
    while (true) {
        if (str.indexOf(find) >= 0)
            str = str.replace(find, replace);
        else
            return str;
    }
};
String.prototype.format = function (...args) {
    return args.reduce((p, c) => p.replace(/%s/, c), this);
};
String.prototype.getASCII = function () {
    return this.replace(/[^\x00-\x7F]/g, "");
};
String.prototype.getParameterByName = function (name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(this);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
Number.prototype.zeroPad = function (length) {
    return String(this).padStart(length, '0');
};
Number.prototype.GetTimeTextFromMiliSecondLeft = function () {
    return Math.round(this / 1000).GetTimeTextFromSecondLeft();
};
Number.prototype.GetTimeTextFromSecondLeft = function () {
    let sec_ = this % 60;
    let temp_ = (this - sec_) / 60;
    let min_ = temp_ % 60;
    let hour_ = (temp_ - min_) / 60;
    let text_ = sec_.zeroPad(2);
    text_ = min_.zeroPad(2) + ":" + text_;
    if (hour_ > 0)
        text_ = hour_.zeroPad(2) + ":" + text_;
    return text_;
};
Number.prototype.GetTimeTextFromHour = function () {
    let hour_ = Math.floor(this);
    let min = (this - hour_) * 60;
    let min_ = Math.floor(min);
    let sec = (min - min_) * 60;
    //let sec_ = sec.toFixed(3);
    let text_ = sec.zeroPad(2);
    text_ = min_.zeroPad(2) + ":" + text_;
    if (hour_ > 0)
        text_ = hour_.zeroPad(2) + ":" + text_;
    return text_;
};
