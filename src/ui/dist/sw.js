if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),a={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>a[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-3625d7b0"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/Albums-5d1b26a1.js",revision:null},{url:"assets/Albums-cd4d9140.css",revision:null},{url:"assets/Artist-179b8122.js",revision:null},{url:"assets/Artist-f38fcfe4.css",revision:null},{url:"assets/ArtistItem-225fc333.js",revision:null},{url:"assets/ArtistItem-2a1e363c.css",revision:null},{url:"assets/Artists-57c2320a.css",revision:null},{url:"assets/Artists-c6857a74.js",revision:null},{url:"assets/BigPlayer-169a914e.js",revision:null},{url:"assets/BigPlayer-759bd479.css",revision:null},{url:"assets/Breaking-0bd2aae2.js",revision:null},{url:"assets/CollectionHeader-879e8bea.js",revision:null},{url:"assets/CollectionHeader-d7b2d6c7.css",revision:null},{url:"assets/Dropdown-3bb770a9.js",revision:null},{url:"assets/Dropdown-bc8d2dbe.css",revision:null},{url:"assets/EditSong.vue_vue_type_script_setup_true_lang-6a4dc867.js",revision:null},{url:"assets/Explore-1ba06298.js",revision:null},{url:"assets/Explore-1ec26fcf.css",revision:null},{url:"assets/Export-2eb801a3.js",revision:null},{url:"assets/Export-be0565cd.css",revision:null},{url:"assets/ExternalEntry-1ad4a4e1.css",revision:null},{url:"assets/ExternalEntry-9173684c.js",revision:null},{url:"assets/FactCard-3c5d1fcf.css",revision:null},{url:"assets/FactCard-bbceac27.js",revision:null},{url:"assets/Form-886284c9.css",revision:null},{url:"assets/Form-90b03f50.js",revision:null},{url:"assets/FullShelf-261568ae.css",revision:null},{url:"assets/FullShelf-b301c76a.js",revision:null},{url:"assets/gistClient-b05fe472.js",revision:null},{url:"assets/IconButton-d131a59b.js",revision:null},{url:"assets/IconButton-ff1e50bb.css",revision:null},{url:"assets/Import-7ebd3f2b.js",revision:null},{url:"assets/Import-a6f1cef5.css",revision:null},{url:"assets/ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-de8b4d89.js",revision:null},{url:"assets/index-3c790919.css",revision:null},{url:"assets/index-7d034b71.js",revision:null},{url:"assets/index-89b34ff5.css",revision:null},{url:"assets/index-8e11e78e.js",revision:null},{url:"assets/index-919334d6.js",revision:null},{url:"assets/index-97d03c40.css",revision:null},{url:"assets/index-a21b7814.js",revision:null},{url:"assets/index-a4d1dcb0.js",revision:null},{url:"assets/index-c785df37.css",revision:null},{url:"assets/index-cbca16ae.css",revision:null},{url:"assets/index-f90ed871.css",revision:null},{url:"assets/index-f91aa0d9.js",revision:null},{url:"assets/index.vue_vue_type_script_setup_true_lang-8a4a0653.js",revision:null},{url:"assets/LocalData-39abe7e8.css",revision:null},{url:"assets/LocalData-6493d510.js",revision:null},{url:"assets/News-815a31c4.css",revision:null},{url:"assets/News-eaeba09a.js",revision:null},{url:"assets/NewsArticle-cfd8fbaf.js",revision:null},{url:"assets/NewsArticle-f71d5ef8.css",revision:null},{url:"assets/playerInPicture-af203fdf.js",revision:null},{url:"assets/Playlist-b3012551.js",revision:null},{url:"assets/Playlist-b839cbd8.css",revision:null},{url:"assets/PlaylistEntry-11952707.css",revision:null},{url:"assets/PlaylistEntry-90cc3d14.js",revision:null},{url:"assets/PlaylistHeader-235481c1.js",revision:null},{url:"assets/PlaylistHeader-d0359b1d.css",revision:null},{url:"assets/PlaylistItem-a886fb81.js",revision:null},{url:"assets/PlaylistItem-dcaa4cde.css",revision:null},{url:"assets/Playlists-652c06ae.css",revision:null},{url:"assets/Playlists-c06fc0d1.js",revision:null},{url:"assets/ReleaseItem-874d3860.css",revision:null},{url:"assets/ReleaseItem-b0280589.js",revision:null},{url:"assets/Releases-46f16e90.css",revision:null},{url:"assets/Releases-b28738d7.js",revision:null},{url:"assets/Search-3323ab94.css",revision:null},{url:"assets/Search-bf69d9bc.js",revision:null},{url:"assets/song-09082ef7.js",revision:null},{url:"assets/Sports-385f73f9.css",revision:null},{url:"assets/Sports-e1749aca.js",revision:null},{url:"assets/spotify-7f3dce91.js",revision:null},{url:"assets/Template-6d1fbb86.js",revision:null},{url:"assets/Template-fe5eeb6e.css",revision:null},{url:"assets/Track-50ce7320.css",revision:null},{url:"assets/Track-b9925544.js",revision:null},{url:"assets/TrackCompact-d4a518cf.js",revision:null},{url:"assets/TrackCompact-ec18cf3e.css",revision:null},{url:"assets/Tracks-ed1881fb.js",revision:null},{url:"assets/Welcome-1d742ab1.css",revision:null},{url:"assets/Welcome-d86008aa.js",revision:null},{url:"index.html",revision:"c21cc0f83f3a20d4798e87f5736f8f82"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"81eb710c3fadc823ae3bb676eacf1795"},{url:"manifest.webmanifest",revision:"54fda1775a89a999bda4c67bd363bb64"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
