if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),t={module:{uri:n},exports:u,require:a};e[n]=Promise.all(r.map((s=>t[s]||a(s)))).then((s=>(i(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-5fb371f1.js",revision:null},{url:"assets/Album-8d95da06.css",revision:null},{url:"assets/Artist-c9fc4a3d.css",revision:null},{url:"assets/Artist-d2328ef7.js",revision:null},{url:"assets/Breaking-13631c55.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Create-94fb37b6.js",revision:null},{url:"assets/Editor-133a20fa.css",revision:null},{url:"assets/Editor-9039d788.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-9a75ae68.js",revision:null},{url:"assets/Error-2e067158.js",revision:null},{url:"assets/Error-f18c7956.css",revision:null},{url:"assets/Explore-0108bc5a.js",revision:null},{url:"assets/Explore-d8c77810.css",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/Export-a9d8764b.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-50ae1b4b.js",revision:null},{url:"assets/FullShelf-5daf648c.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/gistClient-7df74aef.js",revision:null},{url:"assets/Import-15b3ffd5.css",revision:null},{url:"assets/Import-c7d39841.js",revision:null},{url:"assets/ImportLink-f4438033.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/index-01717b01.js",revision:null},{url:"assets/index-0d19a1d6.css",revision:null},{url:"assets/index-1781bcd0.css",revision:null},{url:"assets/index-1793e0dc.css",revision:null},{url:"assets/index-2ebd8df7.js",revision:null},{url:"assets/index-64274d5d.css",revision:null},{url:"assets/index-782f704e.js",revision:null},{url:"assets/index-8b9bc207.js",revision:null},{url:"assets/index-a342d73f.css",revision:null},{url:"assets/index-b86b6324.css",revision:null},{url:"assets/index-c7b070b4.js",revision:null},{url:"assets/index-c9d26ea7.css",revision:null},{url:"assets/index-cc427a55.js",revision:null},{url:"assets/index-cdac5e5c.js",revision:null},{url:"assets/index-e72ffb73.css",revision:null},{url:"assets/index-f3d66bbb.js",revision:null},{url:"assets/Insight-3f658490.js",revision:null},{url:"assets/Insight-ab13ce31.css",revision:null},{url:"assets/Liked-e916e7ad.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-59e9784d.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"a76396e9dbcc34f807d46db4fa29cee6"},{url:"assets/News-eb982e2f.css",revision:null},{url:"assets/News-f485017d.js",revision:null},{url:"assets/NewsArticle-2facc133.css",revision:null},{url:"assets/NewsArticle-c6786c84.js",revision:null},{url:"assets/Normal-becc2626.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-afb1dbfc.js",revision:null},{url:"assets/PlaylistCard-03dfa529.css",revision:null},{url:"assets/PlaylistCard-7f3ff271.js",revision:null},{url:"assets/PlaylistEntry-14284315.js",revision:null},{url:"assets/PlaylistEntry-7f3947eb.css",revision:null},{url:"assets/Sports-a30dbc1c.js",revision:null},{url:"assets/Sports-ad2591fa.css",revision:null},{url:"assets/spotify-d4f3a730.js",revision:null},{url:"assets/Template-138978fa.js",revision:null},{url:"assets/Template-f6af7ee3.css",revision:null},{url:"assets/Track-ab339db6.js",revision:null},{url:"assets/Track-c081b8b5.css",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/TrackCompact-8910eaa9.js",revision:null},{url:"assets/vuedraggable.umd-a43d2b78.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"assets/Welcome-e2c39805.js",revision:null},{url:"index.html",revision:"432d7a8727d8623cab622b52ea728b16"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
