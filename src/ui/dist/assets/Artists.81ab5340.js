import{F as l}from"./FullShelf.588ba2a0.js";import{A as d}from"./ArtistItem.8010f36c.js";import{C as f}from"./CollectionHeader.52889266.js";import{_ as m,o as s,c as r,g as i,a as u,w as h,F as v,j as y,f as A,e as o}from"./index.c601bd9b.js";import"./FindSources.76c75593.js";import"./SpotifyPlaylistEntry.03d140a3.js";import"./MiniPlayer.c07b36ee.js";import"./SpotifyPlaylistHeader.d146c4ed.js";const g={components:{CollectionHeader:f,ArtistItem:d,FullShelf:l},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,a,H){const n=o("CollectionHeader"),c=o("artist-item"),p=o("full-shelf");return s(),r("div",C,[i(n),u("div",x,[i(p,{heading:"Following on Spotify"},{default:h(()=>[(s(!0),r(v,null,y(a.spotifyArtists,(e,_)=>(s(),A(c,{key:_,cover:e.cover,description:e.description,name:e.name,id:e.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}const b=m(g,[["render",F],["__scopeId","data-v-f8aeae99"]]);export{b as default};