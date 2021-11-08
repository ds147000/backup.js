window.addEventListener('error', function (e) {
    var target = e.target;
    if (!Boolean(target instanceof HTMLElement))
        return;
    if (target.tagName === 'LINK')
        Backup.handleLink(target);
    if (target.tagName === 'SCRIPT')
        Backup.handleScript(target);
}, true);
var Backup = /** @class */ (function () {
    function Backup() {
    }
    Backup.handleLink = function (target) {
        var oldUrl = target.href;
        var url = Backup.getNewUrl(oldUrl);
        if (Backup.isStop(oldUrl, url))
            return; // 相同地址，停止
        Backup.setNewLink(url);
    };
    Backup.handleScript = function (target) {
        var oldUrl = target.src;
        var url = Backup.getNewUrl(oldUrl);
        if (Backup.isStop(oldUrl, url))
            return; // 相同地址，停止
        Backup.setNewScript(url);
    };
    Backup.setNewLink = function (url) {
        Backup.number += 1;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    };
    Backup.setNewScript = function (url) {
        Backup.number += 1;
        var el = document.createElement('script');
        el.src = url;
        document.body.appendChild(el);
    };
    Backup.isStop = function (oldUrl, newUrl) {
        if (Backup.number >= 100)
            return true;
        if (!newUrl)
            return true;
        return oldUrl === newUrl;
    };
    Backup.getNewUrl = function (url) {
        return url;
    };
    Backup.number = 0;
    Backup.maxNumer = 20;
    return Backup;
}());

export { Backup as default };
//# sourceMappingURL=index.m.js.map
