import{F as d}from"./FullShelf.d5f5d714.js";import{A as l}from"./ArtistItem.f4ca1e5a.js";import{C as m}from"./CollectionHeader.57686fdb.js";import{_ as f,o as s,c as r,b as i,a as u,w as h,F as v,d as y,e as A,g as o}from"./index.450f4d87.js";import"./FindSources.8dccc6fe.js";import"./SpotifyPlaylistEntry.610d209a.js";import"./MiniPlayer.ee1a3e92.js";import"./SpotifyPlaylistHeader.b9497735.js";const g={components:{CollectionHeader:m,ArtistItem:l,FullShelf:d},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,a,H){const n=o("CollectionHeader"),c=o("artist-item"),p=o("full-shelf");return s(),r("div",C,[i(n),u("div",x,[i(p,{heading:"Following on Spotify"},{default:h(()=>[(s(!0),r(v,null,y(a.spotifyArtists,(e,_)=>(s(),A(c,{key:_,cover:e.cover,description:e.description,name:e.name,id:e.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}var L=f(g,[["render",F],["__scopeId","data-v-0f6232ee"]]);export{L as default};
