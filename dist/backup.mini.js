var backup=function(){"use strict";var e=function(){function e(){}return e.handleLink=function(r){var n=r.href,t=e.getNewUrl(n,"LINK");return!e.isStop(n,t)&&(e.setNewLink(t),!0)},e.handleScript=function(r){var n=r.src,t=e.getNewUrl(n,"SCRIPT");return!e.isStop(n,t)&&(e.setNewScript(t),!0)},e.handleImage=function(r){var n=r.src,t=e.getNewUrl(n,"IMG");return!e.isStop(n,t)&&(r.src=t,!0)},e.setNewLink=function(r){var n;e.number+=1;var t=document.createElement("link");t.rel="stylesheet",t.href=r.trim(),null===(n=document.head)||void 0===n||n.appendChild(t)},e.setNewScript=function(r){var n;e.number+=1;var t=document.createElement("script");t.src=r.trim(),null===(n=document.body)||void 0===n||n.appendChild(t)},e.isStop=function(r,n){return e.number>=e.max||(!n||!r||r.trim()===n.trim())},e.getNewUrl=function(e,r){return e},e.number=0,e.max=40,e}();function r(r){var n=r.target;if(Boolean(n instanceof HTMLElement)){var t=!1;"LINK"===n.tagName.toLocaleUpperCase()&&(t=e.handleLink(n)),"SCRIPT"===n.tagName.toLocaleUpperCase()&&(t=e.handleScript(n)),"IMG"===n.tagName.toLocaleUpperCase()&&(t=e.handleImage(n)),t&&r.stopPropagation()}}function n(){window.addEventListener("error",r,!0)}function t(){window.removeEventListener("error",r,!0),navigator.serviceWorker.register(window.backupWorkerUrl,{scope:"/"}).then((function(e){var r;r=e,setTimeout((function(){r.update()}),2e3)})).catch((function(e){console.error(e),n()}))}return n(),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then((function(e){var r,n;window.backupWorkerUrl&&-1!==(null===(n=null===(r=null==e?void 0:e.active)||void 0===r?void 0:r.scriptURL)||void 0===n?void 0:n.indexOf("backup-wroker.js"))?t():null==e||e.unregister()})).catch((function(e){console.error(e)})),e}();
//# sourceMappingURL=backup.mini.js.map
