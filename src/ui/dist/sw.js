if(!self.define){let s,l={};const e=(e,i)=>(e=new URL(e+".js",i).href,l[e]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=l,document.head.appendChild(s)}else s=e,importScripts(e),l()})).then((()=>{let s=l[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(l[n])return;let u={};const t=s=>e(s,n),o={module:{uri:n},exports:u,require:t};l[n]=Promise.all(i.map((s=>o[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-BkvN1zsQ.css",revision:null},{url:"assets/Album-BrmVp0db.js",revision:null},{url:"assets/Artist-DAREyzq0.css",revision:null},{url:"assets/Artist-DGOCqUc9.js",revision:null},{url:"assets/Breaking-Dfy-kiTd.js",revision:null},{url:"assets/Create-Cv1N05w-.css",revision:null},{url:"assets/Create-lkmKTJ0M.js",revision:null},{url:"assets/Editor-DJucXreQ.css",revision:null},{url:"assets/Editor-DVRjZhOR.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-BgSih-n7.js",revision:null},{url:"assets/Error-B3lyzTIr.js",revision:null},{url:"assets/Error-BUy8S0OX.css",revision:null},{url:"assets/Explore-BBlOvIn4.css",revision:null},{url:"assets/Explore-C_7JuoMq.js",revision:null},{url:"assets/Export-B0FayIqN.js",revision:null},{url:"assets/Export-DQXjuUsA.css",revision:null},{url:"assets/FactCard-BtvQXsd6.js",revision:null},{url:"assets/FactCard-ei9UWMOf.css",revision:null},{url:"assets/FullShelf-CoDkvkMi.css",revision:null},{url:"assets/FullShelf-Cr8zxNSi.js",revision:null},{url:"assets/gistClient-D2eon_Qy.js",revision:null},{url:"assets/Import-D3M1Q5kJ.css",revision:null},{url:"assets/Import-D9HWvNl8.js",revision:null},{url:"assets/ImportLink-_ubzvHnp.js",revision:null},{url:"assets/ImportLink-CQI6kQMZ.css",revision:null},{url:"assets/index-B283-cPw.css",revision:null},{url:"assets/index-B5v95inQ.js",revision:null},{url:"assets/index-BihJzoER.js",revision:null},{url:"assets/index-BQMKgi0Q.js",revision:null},{url:"assets/index-Bxln736l.css",revision:null},{url:"assets/index-C079_Y4G.css",revision:null},{url:"assets/index-CdmmmwlV.css",revision:null},{url:"assets/index-CFO58RnV.js",revision:null},{url:"assets/index-CJDXEJ6t.js",revision:null},{url:"assets/index-CKBj7YDf.css",revision:null},{url:"assets/index-CNVmat9Z.js",revision:null},{url:"assets/index-COFTvh56.css",revision:null},{url:"assets/index-DhF44VK8.js",revision:null},{url:"assets/index-DlDXuqe7.css",revision:null},{url:"assets/index-DxYRwVd6.css",revision:null},{url:"assets/index-pDGqEIWr.js",revision:null},{url:"assets/Insight-BJxao_m3.css",revision:null},{url:"assets/Insight-HPVLXfje.js",revision:null},{url:"assets/Liked-CCIE-Jwj.js",revision:null},{url:"assets/Markdown-BUqZ792e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-CQ3Cdunb.js",revision:null},{url:"assets/needles/needles-worker.js",revision:null},{url:"assets/News-BoNOrken.css",revision:null},{url:"assets/News-el1WpFRp.js",revision:null},{url:"assets/NewsArticle-DiVd0Z1i.js",revision:null},{url:"assets/NewsArticle-usse9HTo.css",revision:null},{url:"assets/Normal-B_WDZ1wt.js",revision:null},{url:"assets/playerInPicture-Dfp9IAsf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-Ik43L9y5.js",revision:null},{url:"assets/PlaylistCard-BehcPvLp.js",revision:null},{url:"assets/PlaylistCard-cgcHOGv5.css",revision:null},{url:"assets/PlaylistEntry-D6o1lH9d.css",revision:null},{url:"assets/PlaylistEntry-DVVJidqh.js",revision:null},{url:"assets/Sports-_g5alLYh.css",revision:null},{url:"assets/Sports-Wlwirz85.js",revision:null},{url:"assets/spotify--BNUbcU6.js",revision:null},{url:"assets/Template-Be5QxjXl.js",revision:null},{url:"assets/Template-CUtHidNi.css",revision:null},{url:"assets/Track-DHk9ReWZ.css",revision:null},{url:"assets/Track-lv5V1ARm.js",revision:null},{url:"assets/TrackCompact-BEkVSTOB.css",revision:null},{url:"assets/TrackCompact-BWM33Ceq.js",revision:null},{url:"assets/vuedraggable.umd-C6aSL6m9.js",revision:null},{url:"assets/Welcome-C-n9EV-1.css",revision:null},{url:"assets/Welcome-C6XMwAEZ.js",revision:null},{url:"index.html",revision:"82917f38528feb117b868a0f2b154aa6"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
