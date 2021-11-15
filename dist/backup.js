var backup = (function () {
  'use strict';

  var Backup = /** @class */ (function () {
      function Backup() {
      }
      Backup.handleLink = function (target) {
          var oldUrl = target.href;
          var url = Backup.getNewUrl(oldUrl, 'LINK');
          if (Backup.isStop(oldUrl, url))
              return false; // 相同地址，停止
          Backup.setNewLink(url);
          return true;
      };
      Backup.handleScript = function (target) {
          var oldUrl = target.src;
          var url = Backup.getNewUrl(oldUrl, 'SCRIPT');
          if (Backup.isStop(oldUrl, url))
              return false; // 相同地址，停止
          Backup.setNewScript(url);
          return true;
      };
      Backup.handleImage = function (target) {
          var oldUrl = target.src;
          var url = Backup.getNewUrl(oldUrl, 'IMG');
          if (Backup.isStop(oldUrl, url))
              return false; // 相同地址，停止
          target.src = url;
          return true;
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
          if (Backup.number >= Backup.max)
              return true;
          if (!newUrl || !oldUrl)
              return true;
          return oldUrl.trim() === newUrl.trim();
      };
      Backup.getNewUrl = function (url, tagName) {
          return url;
      };
      Backup.number = 0;
      Backup.max = 40;
      return Backup;
  }());

  listenerWindow();
  function handleWindowError(e) {
      var target = e.target;
      if (!Boolean(target instanceof HTMLElement))
          return; // 非元素错误，终止
      var isHandle = false;
      if (target.tagName.toLocaleUpperCase() === 'LINK')
          isHandle = Backup.handleLink(target);
      if (target.tagName.toLocaleUpperCase() === 'SCRIPT')
          isHandle = Backup.handleScript(target);
      if (target.tagName.toLocaleUpperCase() === 'IMG')
          isHandle = Backup.handleImage(target);
      if (isHandle)
          e.stopPropagation(); // 完成错误处理，阻止冒泡影响程序
  }
  function listenerWindow() {
      window.addEventListener('error', handleWindowError, true);
  }
  function removeListenerWindow() {
      window.removeEventListener('error', handleWindowError);
  }
  function listenerServiceWorker() {
      var ServiceWorkerApp;
      navigator.serviceWorker.register(window['backupWorkerUrl'], { scope: '/' })
          .then(function (res) {
          ServiceWorkerApp = res;
          removeListenerWindow();
      })["catch"](function (error) {
          console.error(error);
          listenerWindow();
      });
      if (ServiceWorkerApp)
          ServiceWorkerApp.update();
  }
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
          .then(function (res) {
          // 先开启全局服务
          if (!res)
              removeListenerWindow();
          // 当脚本路径被删除则卸载服务
          if (!window['backupWorkerUrl'] && res.active.scriptURL.indexOf('backup-wroker.js') !== -1)
              res.unregister();
          if (!window['backupWorkerUrl'])
              return;
          listenerServiceWorker();
      })["catch"](function (err) {
          console.error(err);
      });
  }

  return Backup;

})();
//# sourceMappingURL=backup.mini.js.map
