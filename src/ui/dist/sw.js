if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),a={module:{uri:n},exports:u,require:t};e[n]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Albums-9b5db7b3.css",revision:null},{url:"assets/Albums-dd96aaab.js",revision:null},{url:"assets/Artist-9635cdd4.js",revision:null},{url:"assets/Artist-a6b528f5.css",revision:null},{url:"assets/Artists-1b575078.js",revision:null},{url:"assets/Artists-45473996.css",revision:null},{url:"assets/BigPlayer-4db387e6.css",revision:null},{url:"assets/BigPlayer-7635f572.js",revision:null},{url:"assets/Breaking-4626a636.js",revision:null},{url:"assets/CollectionHeader-9c02c260.css",revision:null},{url:"assets/CollectionHeader-cdea75a8.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Create-ebf934c4.js",revision:null},{url:"assets/Editor-29aa8a80.css",revision:null},{url:"assets/Editor-c6eed543.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-f2217bd6.js",revision:null},{url:"assets/Explore-1b45015b.css",revision:null},{url:"assets/Explore-b768593c.js",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/Export-da699fb3.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-8121119b.js",revision:null},{url:"assets/FullShelf-4a144dd8.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/gistClient-2a4377f1.js",revision:null},{url:"assets/Import-4d55b33a.js",revision:null},{url:"assets/Import-5bb9c089.css",revision:null},{url:"assets/ImportLink-942b3659.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/index-1de74717.css",revision:null},{url:"assets/index-307c5ebf.js",revision:null},{url:"assets/index-3234d3f7.js",revision:null},{url:"assets/index-3d76937e.css",revision:null},{url:"assets/index-4e4ed216.css",revision:null},{url:"assets/index-69f072a1.css",revision:null},{url:"assets/index-7d12fc9d.js",revision:null},{url:"assets/index-a5b043e8.js",revision:null},{url:"assets/index-af72b1a0.js",revision:null},{url:"assets/index-bd89c879.css",revision:null},{url:"assets/index-c7c58561.css",revision:null},{url:"assets/index-d160e9d4.js",revision:null},{url:"assets/Insight-8c46a3d4.css",revision:null},{url:"assets/Insight-ae545ee7.js",revision:null},{url:"assets/Liked-6de17706.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-575fc4b4.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"5d9e2eedeab164e3b968a86bdf450d2f"},{url:"assets/News-99169f9d.css",revision:null},{url:"assets/News-a1c92c9e.js",revision:null},{url:"assets/NewsArticle-03a45240.css",revision:null},{url:"assets/NewsArticle-25c5a323.js",revision:null},{url:"assets/Normal-29a4ce91.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-b8cbafad.js",revision:null},{url:"assets/PlaylistEntry-4b74ffe1.css",revision:null},{url:"assets/PlaylistEntry-ec7be23c.js",revision:null},{url:"assets/PlaylistItem-1de8bde1.css",revision:null},{url:"assets/PlaylistItem-b3d86b0f.js",revision:null},{url:"assets/Playlists-bca52d32.js",revision:null},{url:"assets/Playlists-d44628c1.css",revision:null},{url:"assets/Releases-1fea8d44.js",revision:null},{url:"assets/Releases-b3f5cb50.css",revision:null},{url:"assets/Sports-385f73f9.css",revision:null},{url:"assets/Sports-e294317b.js",revision:null},{url:"assets/spotify-222f3760.js",revision:null},{url:"assets/Template-c7822d6a.css",revision:null},{url:"assets/Template-e263e64e.js",revision:null},{url:"assets/Track-7c1d0a5c.css",revision:null},{url:"assets/Track-852e6b5d.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/TrackCompact-9b407da8.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"assets/Welcome-e4a682d5.js",revision:null},{url:"index.html",revision:"1f51258b46061d272403418c3f229e11"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
