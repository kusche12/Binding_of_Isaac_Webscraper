// remove all html tags from a string
function cleanText(str) {
    return str.replace(/<\/?[^>]+>/gi, '').replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/\s\s+/g, ' ').trim();
}

function isEmpty(obj) {
    if (obj === null) return false;
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = { cleanText, isEmpty };