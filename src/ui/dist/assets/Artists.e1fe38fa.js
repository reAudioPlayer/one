import{F as l}from"./FullShelf.7cabfb37.js";import{A as d}from"./ArtistItem.8f2d4dbb.js";import{C as f}from"./CollectionHeader.2b0c8d2e.js";import{_ as m,o as s,c as i,g as r,a as u,w as h,F as v,i as y,f as A,e as o}from"./index.f28a8d76.js";import"./FindSources.f009e7f4.js";import"./SpotifyPlaylistEntry.762b07cd.js";import"./MiniPlayer.34edf327.js";import"./SpotifyPlaylistHeader.19f90ed1.js";const g={components:{CollectionHeader:f,ArtistItem:d,FullShelf:l},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,a,H){const n=o("CollectionHeader"),c=o("artist-item"),p=o("full-shelf");return s(),i("div",C,[r(n),u("div",x,[r(p,{heading:"Following on Spotify"},{default:h(()=>[(s(!0),i(v,null,y(a.spotifyArtists,(e,_)=>(s(),A(c,{key:_,cover:e.cover,description:e.description,name:e.name,id:e.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}const b=m(g,[["render",F],["__scopeId","data-v-f8aeae99"]]);export{b as default};