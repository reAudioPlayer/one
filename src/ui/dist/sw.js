if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),t={module:{uri:n},exports:u,require:a};e[n]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-35bb302f.js",revision:null},{url:"assets/Album-abfacc7e.css",revision:null},{url:"assets/Albums-9ae263d8.js",revision:null},{url:"assets/Albums-c2cb712e.css",revision:null},{url:"assets/Artist-a6b528f5.css",revision:null},{url:"assets/Artist-ee092ce0.js",revision:null},{url:"assets/Artists-31be4267.js",revision:null},{url:"assets/Artists-bd87c507.css",revision:null},{url:"assets/BigPlayer-47c62a60.js",revision:null},{url:"assets/BigPlayer-aabd95ce.css",revision:null},{url:"assets/Breaking-6a081e45.js",revision:null},{url:"assets/CardWithImageAndText-accd19c8.js",revision:null},{url:"assets/CardWithImageAndText-af12f13a.css",revision:null},{url:"assets/CollectionHeader-07417047.js",revision:null},{url:"assets/CollectionHeader-f7f1bd89.css",revision:null},{url:"assets/Create-394ed375.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Editor-0f5020e8.js",revision:null},{url:"assets/Editor-29aa8a80.css",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-9a25cc67.js",revision:null},{url:"assets/Explore-1b45015b.css",revision:null},{url:"assets/Explore-686d3471.js",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/Export-deec1f78.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-e307b3b6.js",revision:null},{url:"assets/FullShelf-2cd30592.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/gistClient-d894ef53.js",revision:null},{url:"assets/Import-5bb9c089.css",revision:null},{url:"assets/Import-c8f7dbf9.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/ImportLink-feb8e2b8.js",revision:null},{url:"assets/index-207ef6a3.js",revision:null},{url:"assets/index-2f9f0259.css",revision:null},{url:"assets/index-54fbb58c.js",revision:null},{url:"assets/index-5643e77f.js",revision:null},{url:"assets/index-58d888b4.css",revision:null},{url:"assets/index-62e9fb65.css",revision:null},{url:"assets/index-6abcc8de.js",revision:null},{url:"assets/index-6ee18a0b.js",revision:null},{url:"assets/index-8e12dc4a.css",revision:null},{url:"assets/index-bd89c879.css",revision:null},{url:"assets/index-c4e3b4e7.js",revision:null},{url:"assets/index-eb110fc1.css",revision:null},{url:"assets/Insight-6c8b8403.js",revision:null},{url:"assets/Insight-ab13ce31.css",revision:null},{url:"assets/Liked-e65fe58a.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-d2e23db9.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"5d9e2eedeab164e3b968a86bdf450d2f"},{url:"assets/News-99169f9d.css",revision:null},{url:"assets/News-ae4dd016.js",revision:null},{url:"assets/NewsArticle-03a45240.css",revision:null},{url:"assets/NewsArticle-7779bdce.js",revision:null},{url:"assets/Normal-e69ed8de.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-80b7d203.js",revision:null},{url:"assets/PlaylistEntry-7f3947eb.css",revision:null},{url:"assets/PlaylistEntry-8857a937.js",revision:null},{url:"assets/PlaylistItem-1de8bde1.css",revision:null},{url:"assets/PlaylistItem-f30c5a1e.js",revision:null},{url:"assets/Playlists-04e89ea5.js",revision:null},{url:"assets/Playlists-cb788b08.css",revision:null},{url:"assets/Releases-1241d86a.css",revision:null},{url:"assets/Releases-b2b55664.js",revision:null},{url:"assets/Sports-385f73f9.css",revision:null},{url:"assets/Sports-f5af4436.js",revision:null},{url:"assets/spotify-5dd8e26b.js",revision:null},{url:"assets/Template-01e8e5fe.css",revision:null},{url:"assets/Template-d4bd01d0.js",revision:null},{url:"assets/Track-5eeebad7.css",revision:null},{url:"assets/Track-6a56a7a5.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/TrackCompact-8765641a.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"assets/Welcome-8be658aa.js",revision:null},{url:"index.html",revision:"05701a32049bc99ded2fa1944ddf6c4b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
