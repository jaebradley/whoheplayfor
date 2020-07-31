!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=22)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(2);const s=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class r extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);const s=null},function(e,t,n){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(2);const s={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[s.prefix,e,s.suffix].filter(e=>e&&e.length>0).join("-"),a={updateDetails:e=>{(e=>{for(const t of Object.keys(s))e(t)})(t=>{"string"==typeof e[t]&&(s[t]=e[t])})},getGoogleAnalyticsName:e=>e||r(s.googleAnalytics),getPrecacheName:e=>e||r(s.precache),getPrefix:()=>s.prefix,getRuntimeName:e=>e||r(s.runtime),getSuffix:()=>s.suffix}},function(e,t,n){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(0),n(2);const s=null},function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));n(5);var s=n(14),r=n(7),a=(n(1),n(12)),i=n(0);n(2);const c=async({request:e,mode:t,plugins:n=[]})=>{const s=a.a.filter(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},o=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const a=await self.caches.open(e),i=await c({plugins:r,request:t,mode:"read"});let o=await a.match(i,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:i})}return o},u={put:async({cacheName:e,request:t,response:n,event:u,plugins:h=[],matchOptions:l})=>{const d=await c({plugins:h,request:t,mode:"write"});if(!n)throw new i.a("cache-put-with-no-response",{url:Object(r.a)(d.url)});const f=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,a=!1;for(const t of s)if("cacheWillUpdate"in t){a=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:u,plugins:h,response:n,request:d});if(!f)return void 0;const p=await self.caches.open(e),m=a.a.filter(h,"cacheDidUpdate"),g=m.length>0?await o({cacheName:e,matchOptions:l,request:d}):null;try{await p.put(d,f)}catch(e){throw"QuotaExceededError"===e.name&&await Object(s.a)(),e}for(const t of m)await t.cacheDidUpdate.call(t,{cacheName:e,event:u,oldResponse:g,newResponse:f,request:d})},match:o}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);const s=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"")},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var s=n(0),r=(n(1),n(5),n(7),n(12));n(2);const a={fetch:async({request:e,fetchOptions:t,event:n,plugins:a=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=r.a.filter(a,"fetchDidFail"),c=i.length>0?e.clone():null;try{for(const t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new s.a("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let s;s="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of a)"fetchDidSucceed"in e&&(s=await e.fetchDidSucceed.call(e,{event:n,request:o,response:s}));return s}catch(e){0;for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:o.clone()});throw e}}}},function(e,t,n){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);function s(e){e.then(()=>{})}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);const s={filter:(e,t)=>e.filter(e=>t in e)}},function(e,t,n){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(1);var s=n(20);n(2);async function r(){for(const e of s.a)await e()}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var s=n(16);n(2);async function r(e,t){const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},a=t?t(r):r,i=Object(s.a)()?n.body:await n.blob();return new Response(i,a)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(2);let s;function r(){if(void 0===s){const e=new Response("");if("body"in e)try{new Response(e.body),s=!0}catch(e){s=!1}s=!1}return s}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(1),n(5);var s=n(20);n(2);function r(e){s.a.add(e)}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);class s{constructor(e,t,{onupgradeneeded:n,onversionchange:s}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=n,this._onversionchange=s||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const s=indexedDB.open(this._name,this._version);s.onerror=()=>t(s.error),s.onupgradeneeded=e=>{n?(s.transaction.abort(),s.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},s.onsuccess=()=>{const t=s.result;n?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){return(await this.getAllMatching(e,{query:t,count:n,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:n=null,direction:s="next",count:r,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(i,c)=>{const o=i.objectStore(e),u=t?o.index(t):o,h=[],l=u.openCursor(n,s);l.onsuccess=()=>{const e=l.result;e?(h.push(a?e:e.value),r&&h.length>=r?c(h):e.continue()):c(h)}})}async transaction(e,t,n){return await this.open(),await new Promise((s,r)=>{const a=this._db.transaction(e,t);a.onabort=()=>r(a.error),a.oncomplete=()=>s(),n(a,e=>s(e))})}async _call(e,t,n,...s){return await this.transaction([t],n,(n,r)=>{const a=n.objectStore(t),i=a[e].apply(a,s);i.onsuccess=()=>r(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}s.prototype.OPEN_TIMEOUT=2e3;const r={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(r))for(const n of t)n in IDBObjectStore.prototype&&(s.prototype[n]=async function(t,...s){return await this._call(n,t,e,...s)})},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);const s=async e=>{await new Promise((t,n)=>{const s=indexedDB.deleteDatabase(e);s.onerror=()=>{n(s.error)},s.onblocked=()=>{n(new Error("Delete blocked"))},s.onsuccess=()=>{t()}})}},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(2);const s=new Set},function(e,t,n){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,r=n(24),a=n(26),i=n(28),c=n(23),o=n(25),u=n(27);!function(e){e.Data="data-cache",e.TeamImages="team-images-cache"}(s||(s={})),o.skipWaiting(),o.clientsClaim(),c.precacheAndRoute([{'revision':'db51b424d94eab3c9b984f02d11d5ded','url':'07a5a6a3638a3ac7a3564f79e15df15a.gif'},{'revision':'ff1025a433409277e7ab2187fc28ab5c','url':'app.6792b9ffa0efeb2e2352.js'},{'revision':'27e0ad630a88599fa7fbf370dd8a3641','url':'index.html'},{'revision':'f7ea6ff8baea2c2e558af6724dba2f24','url':'vendors~app.2a005fc3b2ad50fafa59.js'}]||[]),r.registerRoute((function(e){return"https://cors-anywhere.herokuapp.com"===e.url.origin}),new a.CacheFirst({cacheName:s.Data,plugins:[new i.CacheableResponsePlugin({statuses:[0,200]})]})),r.registerRoute((function(e){var t=e.url;return"https://stats.nba.com"===t.origin&&t.pathname.startsWith("/media/img/teams/logos")}),new a.CacheFirst({cacheName:s.TeamImages,plugins:[new i.CacheableResponsePlugin({statuses:[0,200]}),new u.ExpirationPlugin({maxAgeSeconds:604800})]}))},function(e,t,n){"use strict";n.r(t),n.d(t,"addPlugins",(function(){return a})),n.d(t,"addRoute",(function(){return w})),n.d(t,"cleanupOutdatedCaches",(function(){return _})),n.d(t,"createHandler",(function(){return y})),n.d(t,"createHandlerBoundToURL",(function(){return v})),n.d(t,"getCacheKeyForURL",(function(){return R})),n.d(t,"matchPrecache",(function(){return x})),n.d(t,"precache",(function(){return N})),n.d(t,"precacheAndRoute",(function(){return O})),n.d(t,"PrecacheController",(function(){return d}));n(4);const s=[],r={get:()=>s,add(e){s.push(...e)}};function a(e){r.add(e)}var i=n(3),c=(n(7),n(1),n(5),n(6)),o=n(8),u=n(0),h=n(15);function l(e){if(!e)throw new u.a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new u.a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:r.href}}class d{constructor(e){this._cacheName=i.a.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=l(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new u.a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new u.a("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),a=await r.keys(),i=new Set(a.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)i.has(t)?s.push(e):n.push({cacheKey:t,url:e});const c=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),a=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:a,event:e,integrity:r,plugins:t,url:s})});await Promise.all(c);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:a}){const i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let l,d=await o.a.fetch({event:s,plugins:r,request:i});for(const e of r||[])"cacheWillUpdate"in e&&(l=e);if(!(l?await l.cacheWillUpdate({event:s,request:i,response:d}):d.status<400))throw new u.a("bad-precaching-response",{url:t,status:d.status});d.redirected&&(d=await Object(h.a)(d)),await c.a.put({event:s,plugins:r,response:d,request:e===t?i:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new u.a("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new u.a("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let f;const p=()=>(f||(f=new d),f);const m=(e,t)=>{const n=p().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(a,t);if(yield i.href,n&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=n,yield e.href}if(s){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let g=!1;function w(e){g||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=i.a.getPrecacheName();self.addEventListener("fetch",a=>{const i=m(a.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!i)return void 0;let c=self.caches.open(r).then(e=>e.match(i)).then(e=>e||fetch(i));a.respondWith(c)})})(e),g=!0)}function _(){self.addEventListener("activate",e=>{const t=i.a.getPrecacheName();e.waitUntil((async(e,t="-precache-")=>{const n=(await self.caches.keys()).filter(n=>n.includes(t)&&n.includes(self.registration.scope)&&n!==e);return await Promise.all(n.map(e=>self.caches.delete(e))),n})(t).then(e=>{0}))})}function y(e=!0){return p().createHandler(e)}function v(e){return p().createHandlerBoundToURL(e)}function R(e){return p().getCacheKeyForURL(e)}function x(e){return p().matchPrecache(e)}const b=e=>{const t=p(),n=r.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},q=e=>{const t=p();e.waitUntil(t.activate())};function N(e){p().addToCacheList(e),e.length>0&&(self.addEventListener("install",b),self.addEventListener("activate",q))}function O(e,t){N(e),w(t)}},function(e,t,n){"use strict";n.r(t),n.d(t,"NavigationRoute",(function(){return a})),n.d(t,"RegExpRoute",(function(){return i})),n.d(t,"registerRoute",(function(){return l})),n.d(t,"Route",(function(){return r})),n.d(t,"Router",(function(){return o})),n.d(t,"setCatchHandler",(function(){return d})),n.d(t,"setDefaultHandler",(function(){return f}));n(5),n(1),n(9);const s=e=>e&&"object"==typeof e?e:{handle:e};class r{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class a extends r{constructor(e,{allowlist:t=[/./],denylist:n=[]}={}){super(e=>this._match(e),e),this._allowlist=t,this._denylist=n}_match({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const n=e.pathname+e.search;for(const e of this._denylist)if(e.test(n))return!1;return!!this._allowlist.some(e=>e.test(n))}}class i extends r{constructor(e,t,n){super(({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)},t,n)}}var c=n(0);n(7);class o{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const n=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:s,route:r}=this.findMatchingRoute({url:n,request:e,event:t});let a=r&&r.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),!a)return void 0;let i;try{i=a.handle({url:n,request:e,event:t,params:s})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(s=>this._catchHandler.handle({url:n,request:e,event:t}))),i}findMatchingRoute({url:e,request:t,event:n}){const s=this._routes.get(t.method)||[];for(const r of s){let s;const a=r.match({url:e,request:t,event:n});if(a)return s=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(s=void 0),{route:r,params:s}}return{}}setDefaultHandler(e){this._defaultHandler=s(e)}setCatchHandler(e){this._catchHandler=s(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new c.a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new c.a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let u;const h=()=>(u||(u=new o,u.addFetchListener(),u.addCacheListener()),u);function l(e,t,n){let s;if("string"==typeof e){const a=new URL(e,location.href);0;s=new r(({url:e})=>e.href===a.href,t,n)}else if(e instanceof RegExp)s=new i(e,t,n);else if("function"==typeof e)s=new r(e,t,n);else{if(!(e instanceof r))throw new c.a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return h().registerRoute(s),s}function d(e){h().setCatchHandler(e)}function f(e){h().setDefaultHandler(e)}},function(e,t,n){"use strict";n.r(t),n.d(t,"_private",(function(){return s})),n.d(t,"cacheNames",(function(){return x})),n.d(t,"clientsClaim",(function(){return q})),n.d(t,"copyResponse",(function(){return b.a})),n.d(t,"registerQuotaErrorCallback",(function(){return r.a})),n.d(t,"setCacheNameDetails",(function(){return N})),n.d(t,"skipWaiting",(function(){return O}));var s={};n.r(s),n.d(s,"assert",(function(){return a.a})),n.d(s,"cacheNames",(function(){return i.a})),n.d(s,"cacheWrapper",(function(){return c.a})),n.d(s,"canConstructReadableStream",(function(){return u})),n.d(s,"canConstructResponseFromBodyStream",(function(){return h.a})),n.d(s,"dontWaitFor",(function(){return l.a})),n.d(s,"DBWrapper",(function(){return d.a})),n.d(s,"Deferred",(function(){return f})),n.d(s,"deleteDatabase",(function(){return p.a})),n.d(s,"executeQuotaErrorCallbacks",(function(){return m.a})),n.d(s,"fetchWrapper",(function(){return g.a})),n.d(s,"getFriendlyURL",(function(){return w.a})),n.d(s,"logger",(function(){return _.a})),n.d(s,"resultingClientExists",(function(){return v})),n.d(s,"timeout",(function(){return y})),n.d(s,"WorkboxError",(function(){return R.a}));var r=n(17),a=n(5),i=n(3),c=n(6);n(2);let o;function u(){if(void 0===o)try{new ReadableStream({start(){}}),o=!0}catch(e){o=!1}return o}var h=n(16),l=n(11),d=n(18);class f{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}var p=n(19),m=n(14),g=n(8),w=n(7),_=n(1);function y(e){return new Promise(t=>setTimeout(t,e))}async function v(e){if(!e)return;let t=await self.clients.matchAll({type:"window"});const n=new Set(t.map(e=>e.id));let s;const r=performance.now();for(;performance.now()-r<2e3&&(t=await self.clients.matchAll({type:"window"}),s=t.find(t=>e?t.id===e:!n.has(t.id)),!s);)await y(100);return s}var R=n(0);const x={get googleAnalytics(){return i.a.getGoogleAnalyticsName()},get precache(){return i.a.getPrecacheName()},get prefix(){return i.a.getPrefix()},get runtime(){return i.a.getRuntimeName()},get suffix(){return i.a.getSuffix()}};var b=n(15);function q(){self.addEventListener("activate",()=>self.clients.claim())}function N(e){i.a.updateDetails(e)}function O(){self.addEventListener("install",()=>self.skipWaiting())}},function(e,t,n){"use strict";n.r(t),n.d(t,"CacheFirst",(function(){return c})),n.d(t,"CacheOnly",(function(){return o})),n.d(t,"NetworkFirst",(function(){return h})),n.d(t,"NetworkOnly",(function(){return l})),n.d(t,"StaleWhileRevalidate",(function(){return d}));n(5);var s=n(3),r=n(6),a=n(8),i=(n(7),n(1),n(0));n(10);class c{constructor(e={}){this._cacheName=s.a.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let n,s=await r.a.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(s)0;else{0;try{s=await this._getFromNetwork(t,e)}catch(e){n=e}0}if(!s)throw new i.a("no-response",{url:t.url,error:n});return s}async _getFromNetwork(e,t){const n=await a.a.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),s=n.clone(),i=r.a.put({cacheName:this._cacheName,request:e,response:s,event:t,plugins:this._plugins});if(t)try{t.waitUntil(i)}catch(e){0}return n}}class o{constructor(e={}){this._cacheName=s.a.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const n=await r.a.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(!n)throw new i.a("no-response",{url:t.url});return n}}const u={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class h{constructor(e={}){if(this._cacheName=s.a.getRuntimeName(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[u,...e.plugins]}else this._plugins=[u];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const n=[];"string"==typeof t&&(t=new Request(t));const s=[];let r;if(this._networkTimeoutSeconds){const{id:a,promise:i}=this._getTimeoutPromise({request:t,event:e,logs:n});r=a,s.push(i)}const a=this._getNetworkPromise({timeoutId:r,request:t,event:e,logs:n});s.push(a);let c=await Promise.race(s);if(c||(c=await a),!c)throw new i.a("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,event:n}){let s;return{promise:new Promise(t=>{s=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:n}))},1e3*this._networkTimeoutSeconds)}),id:s}}async _getNetworkPromise({timeoutId:e,request:t,logs:n,event:s}){let i,c;try{c=await a.a.fetch({request:t,event:s,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){i=e}if(e&&clearTimeout(e),i||!c)c=await this._respondFromCache({request:t,event:s});else{const e=c.clone(),n=r.a.put({cacheName:this._cacheName,request:t,response:e,event:s,plugins:this._plugins});if(s)try{s.waitUntil(n)}catch(e){0}}return c}_respondFromCache({event:e,request:t}){return r.a.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class l{constructor(e={}){this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions}async handle({event:e,request:t}){let n,s;"string"==typeof t&&(t=new Request(t));try{s=await a.a.fetch({request:t,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){n=e}if(!s)throw new i.a("no-response",{url:t.url,error:n});return s}}class d{constructor(e={}){if(this._cacheName=s.a.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[u,...e.plugins]}else this._plugins=[u];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const n=this._getFromNetwork({request:t,event:e});let s,a=await r.a.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(a){if(e)try{e.waitUntil(n)}catch(s){0}}else{0;try{a=await n}catch(e){s=e}}if(!a)throw new i.a("no-response",{url:t.url,error:s});return a}async _getFromNetwork({request:e,event:t}){const n=await a.a.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),s=r.a.put({cacheName:this._cacheName,request:e,response:n.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(s)}catch(e){0}return n}}},function(e,t,n){"use strict";n.r(t),n.d(t,"CacheExpiration",(function(){return u})),n.d(t,"ExpirationPlugin",(function(){return d}));n(5);var s=n(11),r=(n(1),n(0)),a=n(18),i=n(19);n(13);const c=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class o{constructor(e){this._cacheName=e,this._db=new a.a("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),Object(i.a)(this._cacheName)}async setTimestamp(e,t){const n={url:e=c(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",n)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const n=await this._db.transaction("cache-entries","readwrite",(n,s)=>{const r=n.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let i=0;r.onsuccess=()=>{const n=r.result;if(n){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?a.push(n.value):i++),n.continue()}else s(a)}}),s=[];for(const e of n)await this._db.delete("cache-entries",e.id),s.push(e.url);return s}_getId(e){return this._cacheName+"|"+c(e)}}class u{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new o(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),n=await self.caches.open(this._cacheName);for(const e of t)await n.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,Object(s.a)(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}var h=n(3),l=(n(7),n(17));class d{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:n,cachedResponse:r})=>{if(!r)return null;const a=this._isResponseDateFresh(r),i=this._getCacheExpiration(n);Object(s.a)(i.expireEntries());const c=i.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){0}return a?r:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const n=this._getCacheExpiration(e);await n.updateTimestamp(t.url),await n.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&Object(l.a)(()=>this.deleteCacheAndMetadata())}_getCacheExpiration(e){if(e===h.a.getRuntimeName())throw new r.a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new u(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),n=new Date(t).getTime();return isNaN(n)?null:n}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}},function(e,t,n){"use strict";n.r(t),n.d(t,"CacheableResponse",(function(){return s})),n.d(t,"CacheableResponsePlugin",(function(){return r}));n(5),n(0),n(7),n(1),n(21);class s{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}class r{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new s(e)}}}]);
//# sourceMappingURL=serviceWorker.js.map