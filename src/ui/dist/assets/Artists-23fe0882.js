import{F as p}from"./FullShelf-5df78564.js";import{A as d}from"./ArtistItem-a6248e86.js";import{C as f}from"./CollectionHeader-4888838c.js";import{_ as m,e as o,c as i,g as n,a as u,w as h,o as e,F as v,j as y,f as A}from"./index-84a1fb6c.js";const g={components:{CollectionHeader:f,ArtistItem:d,FullShelf:p},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},w={class:"padding-20"},C={class:"artists"};function x(t,F,k,B,r,H){const a=o("CollectionHeader"),c=o("artist-item"),l=o("full-shelf");return e(),i("div",w,[n(a),u("div",C,[n(l,{heading:"Following on Spotify"},{default:h(()=>[(e(!0),i(v,null,y(r.spotifyArtists,(s,_)=>(e(),A(c,{id:s.id,key:_,cover:s.cover,description:s.description,name:s.name,"initially-following":"","show-follow-button":""},null,8,["id","cover","description","name"]))),128))]),_:1})])])}const S=m(g,[["render",x],["__scopeId","data-v-f17668c2"]]);export{S as default};
