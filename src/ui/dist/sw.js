if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),t={module:{uri:n},exports:u,require:a};e[n]=Promise.all(r.map((s=>t[s]||a(s)))).then((s=>(i(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-04b8b583.js",revision:null},{url:"assets/Album-8d95da06.css",revision:null},{url:"assets/Artist-597f0f7d.js",revision:null},{url:"assets/Artist-c9fc4a3d.css",revision:null},{url:"assets/BigPlayer-10770450.js",revision:null},{url:"assets/BigPlayer-199abb6d.css",revision:null},{url:"assets/Breaking-22cebe9b.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Create-f8ebfb9c.js",revision:null},{url:"assets/Editor-133a20fa.css",revision:null},{url:"assets/Editor-b43fa999.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-c48b0b31.js",revision:null},{url:"assets/Error-73853d36.js",revision:null},{url:"assets/Error-f18c7956.css",revision:null},{url:"assets/Explore-0fa6ebc9.js",revision:null},{url:"assets/Explore-d8c77810.css",revision:null},{url:"assets/Export-358f9c50.js",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/FactCard-2e77cd03.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FullShelf-58fce686.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/gistClient-6b75ed72.js",revision:null},{url:"assets/Import-15b3ffd5.css",revision:null},{url:"assets/Import-6eb305d2.js",revision:null},{url:"assets/ImportLink-24d182f7.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/index-0d19a1d6.css",revision:null},{url:"assets/index-1793e0dc.css",revision:null},{url:"assets/index-17ad748f.css",revision:null},{url:"assets/index-33e905a6.js",revision:null},{url:"assets/index-5b0a8702.js",revision:null},{url:"assets/index-798c9500.css",revision:null},{url:"assets/index-a342d73f.css",revision:null},{url:"assets/index-b9296d59.js",revision:null},{url:"assets/index-c6d68f4a.js",revision:null},{url:"assets/index-d74e16aa.js",revision:null},{url:"assets/index-e72ffb73.css",revision:null},{url:"assets/index-f27a6020.js",revision:null},{url:"assets/index-fa13274b.js",revision:null},{url:"assets/index-fd630165.css",revision:null},{url:"assets/Insight-1e4a2acb.js",revision:null},{url:"assets/Insight-ab13ce31.css",revision:null},{url:"assets/Liked-52cb33f8.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-2f60f1fe.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"a76396e9dbcc34f807d46db4fa29cee6"},{url:"assets/News-74fdeaa2.js",revision:null},{url:"assets/News-eb982e2f.css",revision:null},{url:"assets/NewsArticle-2facc133.css",revision:null},{url:"assets/NewsArticle-9d9878f1.js",revision:null},{url:"assets/Normal-181b4a3f.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-a20c8988.js",revision:null},{url:"assets/PlaylistCard-03dfa529.css",revision:null},{url:"assets/PlaylistCard-ebd3df2c.js",revision:null},{url:"assets/PlaylistEntry-6b17bd55.js",revision:null},{url:"assets/PlaylistEntry-7f3947eb.css",revision:null},{url:"assets/Sports-ad2591fa.css",revision:null},{url:"assets/Sports-b56c83da.js",revision:null},{url:"assets/spotify-8521fd92.js",revision:null},{url:"assets/Template-712f3eda.js",revision:null},{url:"assets/Template-db552157.css",revision:null},{url:"assets/Track-bb00f03c.js",revision:null},{url:"assets/Track-c081b8b5.css",revision:null},{url:"assets/TrackCompact-5cb8274f.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/vuedraggable.umd-0d609cce.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"assets/Welcome-e7cf464b.js",revision:null},{url:"index.html",revision:"bd71248bd580b1472ac68aefea37b876"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
