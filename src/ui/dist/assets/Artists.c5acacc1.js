import{F as l}from"./FullShelf.5a02f94f.js";import{A as d}from"./ArtistItem.ecd519a8.js";import{C as f}from"./CollectionHeader.a937a6ae.js";import{_ as m,o as s,c as i,g as r,a as u,w as h,F as v,i as y,f as A,e as o}from"./index.4e1aa6fb.js";import"./song.6a8a1dc6.js";import"./TrackInfo.2eb080de.js";import"./MiniPlayer.26dbe90d.js";const g={components:{CollectionHeader:f,ArtistItem:d,FullShelf:l},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,a,H){const n=o("CollectionHeader"),c=o("artist-item"),p=o("full-shelf");return s(),i("div",C,[r(n),u("div",x,[r(p,{heading:"Following on Spotify"},{default:h(()=>[(s(!0),i(v,null,y(a.spotifyArtists,(e,_)=>(s(),A(c,{key:_,cover:e.cover,description:e.description,name:e.name,id:e.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}const L=m(g,[["render",F],["__scopeId","data-v-f8aeae99"]]);export{L as default};
