var backup = (function () {
  'use strict';

  var Backup = /** @class */ (function () {
      function Backup() {
      }
      Backup.handleLink = function (target) {
          var oldUrl = target.href;
          var url = Backup.getNewUrl(oldUrl, 'LINK');
          if (Backup.isStop(oldUrl, url))
              return; // 相同地址，停止
          Backup.setNewLink(url);
      };
      Backup.handleScript = function (target) {
          var oldUrl = target.src;
          var url = Backup.getNewUrl(oldUrl, 'SCRIPT');
          if (Backup.isStop(oldUrl, url))
              return; // 相同地址，停止
          Backup.setNewScript(url);
      };
      Backup.handleImage = function (target) {
          var oldUrl = target.src;
          var url = Backup.getNewUrl(oldUrl, 'IMG');
          if (Backup.isStop(oldUrl, url))
              return; // 相同地址，停止
          target.src = url;
      };
      Backup.setNewLink = function (url) {
          var _a;
          Backup.number += 1;
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url.trim();
          (_a = document === null || document === void 0 ? void 0 : document.head) === null || _a === void 0 ? void 0 : _a.appendChild(link);
      };
      Backup.setNewScript = function (url) {
          var _a;
          Backup.number += 1;
          var el = document.createElement('script');
          el.src = url.trim();
          (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.appendChild(el);
      };
      Backup.isStop = function (oldUrl, newUrl) {
          if (Backup.number >= Backup.maxNumer)
              return true;
          if (!newUrl || !oldUrl)
              return true;
          return oldUrl.trim() === newUrl.trim();
      };
      Backup.getNewUrl = function (url, tagName) {
          return url;
      };
      Backup.number = 0;
      Backup.maxNumer = 20;
      return Backup;
  }());

  window.addEventListener('error', function (e) {
      var target = e.target;
      if (!Boolean(target instanceof HTMLElement))
          return;
      if (target.tagName.toLocaleUpperCase() === 'LINK')
          Backup.handleLink(target);
      if (target.tagName.toLocaleUpperCase() === 'SCRIPT')
          Backup.handleScript(target);
      if (target.tagName.toLocaleUpperCase() === 'IMG')
          Backup.handleImage(target);
  }, true);

  return Backup;

})();
//# sourceMappingURL=index.mini.js.map
