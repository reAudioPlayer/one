import{F as l}from"./FullShelf.6d582a9b.js";import{A as d}from"./ArtistItem.a8c9b721.js";import{C as m}from"./CollectionHeader.07f815e8.js";import{_ as f,o as s,c as r,g as i,a as u,w as h,F as v,i as y,f as A,e as o}from"./index.e2c20db6.js";import"./FindSources.035a65df.js";import"./SpotifyPlaylistEntry.acb35f37.js";import"./MiniPlayer.2867c956.js";import"./SpotifyPlaylistHeader.040c1af3.js";const g={components:{CollectionHeader:m,ArtistItem:d,FullShelf:l},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,a,H){const n=o("CollectionHeader"),c=o("artist-item"),p=o("full-shelf");return s(),r("div",C,[i(n),u("div",x,[i(p,{heading:"Following on Spotify"},{default:h(()=>[(s(!0),r(v,null,y(a.spotifyArtists,(e,_)=>(s(),A(c,{key:_,cover:e.cover,description:e.description,name:e.name,id:e.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}var b=f(g,[["render",F],["__scopeId","data-v-a55ee8c8"]]);export{b as default};
