"use strict";var e=function(){function e(){}return e.handleLink=function(t){var n=t.href,r=e.getNewUrl(n,"LINK");e.isStop(n,r)||e.setNewLink(r)},e.handleScript=function(t){var n=t.src,r=e.getNewUrl(n,"SCRIPT");e.isStop(n,r)||e.setNewScript(r)},e.handleImage=function(t){var n=t.src,r=e.getNewUrl(n,"IMG");e.isStop(n,r)||(t.src=r)},e.setNewLink=function(t){var n;e.number+=1;var r=document.createElement("link");r.rel="stylesheet",r.href=t.trim(),null===(n=null===document||void 0===document?void 0:document.head)||void 0===n||n.appendChild(r)},e.setNewScript=function(t){var n;e.number+=1;var r=document.createElement("script");r.src=t.trim(),null===(n=null===document||void 0===document?void 0:document.body)||void 0===n||n.appendChild(r)},e.isStop=function(t,n){return e.number>=e.maxNumer||(!n||!t||t.trim()===n.trim())},e.getNewUrl=function(e,t){return e},e.number=0,e.maxNumer=20,e}();window.addEventListener("error",(function(t){var n=t.target;Boolean(n instanceof HTMLElement)&&("LINK"===n.tagName.toLocaleUpperCase()&&e.handleLink(n),"SCRIPT"===n.tagName.toLocaleUpperCase()&&e.handleScript(n),"IMG"===n.tagName.toLocaleUpperCase()&&e.handleImage(n))}),!0),module.exports=e;
//# sourceMappingURL=index.js.map
