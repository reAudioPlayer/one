if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>l(s,n),t={module:{uri:n},exports:u,require:a};e[n]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Album-15e8f09e.js",revision:null},{url:"assets/Album-abfacc7e.css",revision:null},{url:"assets/Albums-ccf1fb3c.css",revision:null},{url:"assets/Albums-f2d8c1be.js",revision:null},{url:"assets/Artist-8adace4a.js",revision:null},{url:"assets/Artist-a6b528f5.css",revision:null},{url:"assets/Artists-c119f0ae.js",revision:null},{url:"assets/Artists-fad94a65.css",revision:null},{url:"assets/BigPlayer-1816fe53.js",revision:null},{url:"assets/BigPlayer-e60e67be.css",revision:null},{url:"assets/Breaking-a853f0c4.js",revision:null},{url:"assets/CardWithImageAndText-af12f13a.css",revision:null},{url:"assets/CardWithImageAndText-cd964a0e.js",revision:null},{url:"assets/CollectionHeader-7eda27b4.js",revision:null},{url:"assets/CollectionHeader-f7f1bd89.css",revision:null},{url:"assets/Create-50789436.js",revision:null},{url:"assets/Create-8ab3526b.css",revision:null},{url:"assets/Editor-07c20c7b.js",revision:null},{url:"assets/Editor-29aa8a80.css",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-074f578e.js",revision:null},{url:"assets/Explore-d8c77810.css",revision:null},{url:"assets/Explore-e0332a13.js",revision:null},{url:"assets/Export-a03f6dd4.css",revision:null},{url:"assets/Export-ace89050.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-aa6a056a.js",revision:null},{url:"assets/FullShelf-62d1d109.css",revision:null},{url:"assets/FullShelf-b1a8ed9d.js",revision:null},{url:"assets/gistClient-b136b67c.js",revision:null},{url:"assets/Import-5bb9c089.css",revision:null},{url:"assets/Import-7d77dc9c.js",revision:null},{url:"assets/ImportLink-709bc6f2.js",revision:null},{url:"assets/ImportLink-fa9af2ae.css",revision:null},{url:"assets/index-2f9f0259.css",revision:null},{url:"assets/index-3a7e465c.js",revision:null},{url:"assets/index-4998897c.js",revision:null},{url:"assets/index-4aca7212.css",revision:null},{url:"assets/index-58d888b4.css",revision:null},{url:"assets/index-5e57bc8b.js",revision:null},{url:"assets/index-62e9fb65.css",revision:null},{url:"assets/index-86bac054.js",revision:null},{url:"assets/index-8e12dc4a.css",revision:null},{url:"assets/index-ce9df5e7.js",revision:null},{url:"assets/index-d5372e4a.js",revision:null},{url:"assets/index-e4f7a7a4.css",revision:null},{url:"assets/Insight-ab13ce31.css",revision:null},{url:"assets/Insight-af2f4430.js",revision:null},{url:"assets/Liked-9777ceb1.js",revision:null},{url:"assets/Markdown-d883632e.css",revision:null},{url:"assets/Markdown.vue_vue_type_style_index_0_lang-072ae418.js",revision:null},{url:"assets/needles/needles-worker.js",revision:"a76396e9dbcc34f807d46db4fa29cee6"},{url:"assets/News-99169f9d.css",revision:null},{url:"assets/News-efc46aaf.js",revision:null},{url:"assets/NewsArticle-0199b383.js",revision:null},{url:"assets/NewsArticle-03a45240.css",revision:null},{url:"assets/Normal-a8b4a465.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist-3d5d7dca.css",revision:null},{url:"assets/Playlist-94fabc99.js",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-039036ee.js",revision:null},{url:"assets/PlaylistEntry-034039e0.js",revision:null},{url:"assets/PlaylistEntry-7f3947eb.css",revision:null},{url:"assets/PlaylistItem-1de8bde1.css",revision:null},{url:"assets/PlaylistItem-b0eac7c2.js",revision:null},{url:"assets/Playlists-3b1dd24c.js",revision:null},{url:"assets/Playlists-97d85c3b.css",revision:null},{url:"assets/Releases-00581a0c.js",revision:null},{url:"assets/Releases-14c14094.css",revision:null},{url:"assets/Sports-b3dad1cb.css",revision:null},{url:"assets/Sports-de3fde1c.js",revision:null},{url:"assets/spotify-13045449.js",revision:null},{url:"assets/Template-d87508ac.js",revision:null},{url:"assets/Template-f9d18466.css",revision:null},{url:"assets/Track-5eeebad7.css",revision:null},{url:"assets/Track-9b93742b.js",revision:null},{url:"assets/TrackCompact-3aff4ede.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/Welcome-42b4107d.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"index.html",revision:"8d70bc2e7c9f4e8f7a867bcdcc1ac51e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
