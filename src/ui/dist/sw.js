if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),t={module:{uri:n},exports:u,require:a};e[n]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-39696330.css",revision:null},{url:"assets/Album-e93e4ab4.js",revision:null},{url:"assets/Albums-a3f0c13c.js",revision:null},{url:"assets/Albums-c2cb712e.css",revision:null},{url:"assets/Artist-a6b528f5.css",revision:null},{url:"assets/Artist-ce00c0ba.js",revision:null},{url:"assets/Artists-b5b7c792.js",revision:null},{url:"assets/Artists-bd87c507.css",revision:null},{url:"assets/BigPlayer-0892b052.js",revision:null},{url:"assets/BigPlayer-aabd95ce.css",revision:null},{url:"assets/Breaking-7c72346c.js",revision:null},{url:"assets/CardWithImageAndText-ab667909.js",revision:null},{url:"assets/CardWithImageAndText-af12f13a.css",revision:null},{url:"assets/CollectionHeader-478147b2.js",revision:null},{url:"assets/CollectionHeader-f7f1bd89.css",revision:null},{url:"assets/Create-1e562b7c.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Editor-29aa8a80.css",revision:null},{url:"assets/Editor-aa824ddc.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-734fce54.js",revision:null},{url:"assets/Explore-1b45015b.css",revision:null},{url:"assets/Explore-5390af5b.js",revision:null},{url:"assets/Export-02e29928.js",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-c3ef3821.js",revision:null},{url:"assets/FullShelf-058f98d1.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/gistClient-f2b2b602.js",revision:null},{url:"assets/Import-5bb9c089.css",revision:null},{url:"assets/Import-8bf0a8e2.js",revision:null},{url:"assets/ImportLink-4a91cf42.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/index-2f9f0259.css",revision:null},{url:"assets/index-3d76937e.css",revision:null},{url:"assets/index-46ddc341.js",revision:null},{url:"assets/index-58d888b4.css",revision:null},{url:"assets/index-5c208734.js",revision:null},{url:"assets/index-7521b0a2.css",revision:null},{url:"assets/index-87a693f0.js",revision:null},{url:"assets/index-8e12dc4a.css",revision:null},{url:"assets/index-933bdda4.js",revision:null},{url:"assets/index-96e8d1b0.js",revision:null},{url:"assets/index-a3947853.js",revision:null},{url:"assets/index-bd89c879.css",revision:null},{url:"assets/Insight-8c46a3d4.css",revision:null},{url:"assets/Insight-a51aa626.js",revision:null},{url:"assets/Liked-9f4260a4.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-d2a06bf7.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"5d9e2eedeab164e3b968a86bdf450d2f"},{url:"assets/News-99169f9d.css",revision:null},{url:"assets/News-c7826ca2.js",revision:null},{url:"assets/NewsArticle-03a45240.css",revision:null},{url:"assets/NewsArticle-e89d6d5f.js",revision:null},{url:"assets/Normal-0a2e3d0c.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-6bbd0e9f.js",revision:null},{url:"assets/PlaylistEntry-294dcc5d.js",revision:null},{url:"assets/PlaylistEntry-7f3947eb.css",revision:null},{url:"assets/PlaylistItem-1de8bde1.css",revision:null},{url:"assets/PlaylistItem-e7c17082.js",revision:null},{url:"assets/Playlists-cb788b08.css",revision:null},{url:"assets/Playlists-f52df1d2.js",revision:null},{url:"assets/Releases-1241d86a.css",revision:null},{url:"assets/Releases-c8ac8b3c.js",revision:null},{url:"assets/Sports-385f73f9.css",revision:null},{url:"assets/Sports-e58c74dd.js",revision:null},{url:"assets/spotify-538e4a64.js",revision:null},{url:"assets/Template-01e8e5fe.css",revision:null},{url:"assets/Template-f2f3f4ca.js",revision:null},{url:"assets/Track-5eeebad7.css",revision:null},{url:"assets/Track-c18fbc90.js",revision:null},{url:"assets/TrackCompact-5fa60d27.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"assets/Welcome-74ccd813.js",revision:null},{url:"index.html",revision:"033c94b87b3306dc689a71184530938e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
