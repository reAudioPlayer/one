if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),a={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>a[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Albums-ca17326c.js",revision:null},{url:"assets/Albums-cd4d9140.css",revision:null},{url:"assets/Artist-8b6ab2f9.js",revision:null},{url:"assets/Artist-f38fcfe4.css",revision:null},{url:"assets/ArtistItem-076488d8.css",revision:null},{url:"assets/ArtistItem-a6248e86.js",revision:null},{url:"assets/Artists-23fe0882.js",revision:null},{url:"assets/Artists-9985c53f.css",revision:null},{url:"assets/BigPlayer-4e09ef04.css",revision:null},{url:"assets/BigPlayer-7f9a6473.js",revision:null},{url:"assets/Breaking-e7110be7.js",revision:null},{url:"assets/collection-a129c331.js",revision:null},{url:"assets/CollectionHeader-4888838c.js",revision:null},{url:"assets/CollectionHeader-d7b2d6c7.css",revision:null},{url:"assets/Create-175bc322.css",revision:null},{url:"assets/Create-e34efafc.js",revision:null},{url:"assets/Editor-29aa8a80.css",revision:null},{url:"assets/Editor-7e1dcc7b.js",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-317dc247.js",revision:null},{url:"assets/Explore-96d76571.js",revision:null},{url:"assets/Explore-e4c09a4f.css",revision:null},{url:"assets/Export-6ab8e043.css",revision:null},{url:"assets/Export-d32621b4.js",revision:null},{url:"assets/ExternalEntry-1ad4a4e1.css",revision:null},{url:"assets/ExternalEntry-ee6c0fc4.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-41997db0.js",revision:null},{url:"assets/Form-4382ae2c.css",revision:null},{url:"assets/Form-5ea1f8d4.js",revision:null},{url:"assets/FullShelf-261568ae.css",revision:null},{url:"assets/FullShelf-5df78564.js",revision:null},{url:"assets/gistClient-0aef1fc2.js",revision:null},{url:"assets/IconButton-08e87ae7.css",revision:null},{url:"assets/IconButton-f2c30e74.js",revision:null},{url:"assets/Import-26df420f.js",revision:null},{url:"assets/Import-5bb9c089.css",revision:null},{url:"assets/ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-b78e00ff.js",revision:null},{url:"assets/index-26630c6e.js",revision:null},{url:"assets/index-390c4fad.js",revision:null},{url:"assets/index-4e4ed216.css",revision:null},{url:"assets/index-84a1fb6c.js",revision:null},{url:"assets/index-8a85a67d.css",revision:null},{url:"assets/index-9c6564e7.css",revision:null},{url:"assets/index-a3310d8f.js",revision:null},{url:"assets/index-af92c933.js",revision:null},{url:"assets/index-e45f3ffd.css",revision:null},{url:"assets/index-f183e4ed.css",revision:null},{url:"assets/Liked-58c3a2c5.js",revision:null},{url:"assets/News-815a31c4.css",revision:null},{url:"assets/News-86da2ad0.js",revision:null},{url:"assets/NewsArticle-a6ae3d5c.js",revision:null},{url:"assets/NewsArticle-f71d5ef8.css",revision:null},{url:"assets/Normal-0cc1707e.js",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist-0e742198.js",revision:null},{url:"assets/Playlist-b839cbd8.css",revision:null},{url:"assets/Playlist.vue_vue_type_script_setup_true_lang-379fb136.js",revision:null},{url:"assets/PlaylistEntry-4058086a.css",revision:null},{url:"assets/PlaylistEntry-fe2c3bd9.js",revision:null},{url:"assets/PlaylistHeader-0a2fe8da.js",revision:null},{url:"assets/PlaylistHeader-107555cd.css",revision:null},{url:"assets/PlaylistItem-10853772.css",revision:null},{url:"assets/PlaylistItem-cfc0156c.js",revision:null},{url:"assets/Playlists-819d9966.css",revision:null},{url:"assets/Playlists-ba4442d1.js",revision:null},{url:"assets/ReleaseItem-8295fb04.js",revision:null},{url:"assets/ReleaseItem-874d3860.css",revision:null},{url:"assets/Releases-1bbac7cd.js",revision:null},{url:"assets/Releases-278373f4.css",revision:null},{url:"assets/Search-1508b50d.js",revision:null},{url:"assets/Search-25e5af5d.css",revision:null},{url:"assets/Sports-385f73f9.css",revision:null},{url:"assets/Sports-55ab9acb.js",revision:null},{url:"assets/spotify-7322c59c.js",revision:null},{url:"assets/Template-01430bb1.js",revision:null},{url:"assets/Template-28b2ed3d.js",revision:null},{url:"assets/Template-4cc17862.css",revision:null},{url:"assets/Template-d24c53e2.css",revision:null},{url:"assets/Track-50ce7320.css",revision:null},{url:"assets/Track-9bd6d666.js",revision:null},{url:"assets/TrackCompact-27e51e2b.js",revision:null},{url:"assets/TrackCompact-79c8b159.css",revision:null},{url:"assets/Welcome-4fa30b79.js",revision:null},{url:"assets/Welcome-5b21c29e.css",revision:null},{url:"index.html",revision:"0dd9e010f64f86f4d5957ba0123d0e34"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/^\/api/]}))}));
