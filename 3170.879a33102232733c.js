"use strict";(self.webpackChunkstorj_cloud_browser=self.webpackChunkstorj_cloud_browser||[]).push([[3170],{3170:(Y,D,g)=>{g.r(D),g.d(D,{startInputShims:()=>W});var w=g(5861),v=g(1643);const b=new WeakMap,y=(t,n,e,o=0)=>{b.has(t)!==e&&(e?B(t,n,o):C(t,n))},T=t=>t===t.getRootNode().activeElement,B=(t,n,e)=>{const o=n.parentNode,r=n.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,o.appendChild(r),b.set(t,r);const s="rtl"===t.ownerDocument.dir?9999:-9999;t.style.pointerEvents="none",n.style.transform=`translate3d(${s}px,${e}px,0) scale(0)`},C=(t,n)=>{const e=b.get(t);e&&(b.delete(t),e.remove()),t.style.pointerEvents="",n.style.transform=""},A="input, textarea, [no-blur], [contenteditable]",F=function(){var t=(0,w.Z)(function*(n,e,o,r,a){if(!o&&!r)return;const s=((t,n,e)=>((t,n,e,o)=>{const r=t.top,a=t.bottom,s=n.top,i=s+15,f=.75*Math.min(n.bottom,o-e)-a,S=i-r,d=Math.round(f<0?-f:S>0?-S:0),c=Math.min(d,r-s),m=Math.abs(c)/.3;return{scrollAmount:c,scrollDuration:Math.min(400,Math.max(150,m)),scrollPadding:e,inputSafeY:4-(r-i)}})((t.closest("ion-item,[ion-item]")||t).getBoundingClientRect(),n.getBoundingClientRect(),e,t.ownerDocument.defaultView.innerHeight))(n,o||r,a);if(o&&Math.abs(s.scrollAmount)<4)e.focus();else if(y(n,e,!0,s.inputSafeY),e.focus(),(0,v.r)(()=>n.click()),"undefined"!=typeof window){let u;const i=function(){var f=(0,w.Z)(function*(){void 0!==u&&clearTimeout(u),window.removeEventListener("ionKeyboardDidShow",l),window.removeEventListener("ionKeyboardDidShow",i),o&&(yield o.scrollByPoint(0,s.scrollAmount,s.scrollDuration)),y(n,e,!1,s.inputSafeY),e.focus()});return function(){return f.apply(this,arguments)}}(),l=()=>{window.removeEventListener("ionKeyboardDidShow",l),window.addEventListener("ionKeyboardDidShow",i)};if(o){const f=yield o.getScrollElement();if(s.scrollAmount>f.scrollHeight-f.clientHeight-f.scrollTop)return"password"===e.type?(s.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",l)):window.addEventListener("ionKeyboardDidShow",i),void(u=setTimeout(i,1e3))}i()}});return function(e,o,r,a,s){return t.apply(this,arguments)}}(),I="$ionPaddingTimer",P=(t,n)=>{var e,o;if("INPUT"!==t.tagName||t.parentElement&&"ION-INPUT"===t.parentElement.tagName||"ION-SEARCHBAR"===(null===(o=null===(e=t.parentElement)||void 0===e?void 0:e.parentElement)||void 0===o?void 0:o.tagName))return;const r=t.closest("ion-content");if(null===r)return;const a=r[I];a&&clearTimeout(a),n>0?r.style.setProperty("--keyboard-offset",`${n}px`):r[I]=setTimeout(()=>{r.style.setProperty("--keyboard-offset","0px")},120)},W=t=>{const n=document,e=t.getNumber("keyboardHeight",290),o=t.getBoolean("scrollAssist",!0),r=t.getBoolean("hideCaretOnScroll",!0),a=t.getBoolean("inputBlurring",!0),s=t.getBoolean("scrollPadding",!0),u=Array.from(n.querySelectorAll("ion-input, ion-textarea")),i=new WeakMap,l=new WeakMap,f=function(){var d=(0,w.Z)(function*(c){yield new Promise(_=>(0,v.c)(c,_));const L=c.shadowRoot||c,m=L.querySelector("input")||L.querySelector("textarea"),h=c.closest("ion-content"),p=h?null:c.closest("ion-footer");if(m){if(h&&r&&!i.has(c)){const _=((t,n,e)=>{if(!e||!n)return()=>{};const o=u=>{T(n)&&y(t,n,u)},r=()=>y(t,n,!1),a=()=>o(!0),s=()=>o(!1);return(0,v.a)(e,"ionScrollStart",a),(0,v.a)(e,"ionScrollEnd",s),n.addEventListener("blur",r),()=>{(0,v.b)(e,"ionScrollStart",a),(0,v.b)(e,"ionScrollEnd",s),n.addEventListener("ionBlur",r)}})(c,m,h);i.set(c,_)}if((h||p)&&o&&!l.has(c)){const _=((t,n,e,o,r)=>{let a;const s=i=>{a=(0,v.p)(i)},u=i=>{if(!a)return;const l=(0,v.p)(i);!((t,n,e)=>{if(n&&e){const o=n.x-e.x,r=n.y-e.y;return o*o+r*r>t*t}return!1})(6,a,l)&&!T(n)&&(i.stopPropagation(),F(t,n,e,o,r))};return t.addEventListener("touchstart",s,!0),t.addEventListener("touchend",u,!0),()=>{t.removeEventListener("touchstart",s,!0),t.removeEventListener("touchend",u,!0)}})(c,m,h,p,e);l.set(c,_)}}});return function(L){return d.apply(this,arguments)}}();a&&(()=>{let t=!0,n=!1;const e=document;(0,v.a)(e,"ionScrollStart",()=>{n=!0}),e.addEventListener("focusin",()=>{t=!0},!0),e.addEventListener("touchend",s=>{if(n)return void(n=!1);const u=e.activeElement;if(!u||u.matches(A))return;const i=s.target;i!==u&&(i.matches(A)||i.closest(A)||(t=!1,setTimeout(()=>{t||u.blur()},50)))},!1)})(),s&&(t=>{const n=document;n.addEventListener("focusin",r=>{P(r.target,t)}),n.addEventListener("focusout",r=>{P(r.target,0)})})(e);for(const d of u)f(d);n.addEventListener("ionInputDidLoad",d=>{f(d.detail)}),n.addEventListener("ionInputDidUnload",d=>{(d=>{if(r){const c=i.get(d);c&&c(),i.delete(d)}if(o){const c=l.get(d);c&&c(),l.delete(d)}})(d.detail)})}}}]);