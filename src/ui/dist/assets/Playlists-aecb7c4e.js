import{F as c}from"./FullShelf-6ab0416c.js";import{P as p}from"./PlaylistItem-b5daefb7.js";import{C as y}from"./CollectionHeader-7ba06f8e.js";import{i as h,k as v,D as m,q as g,o as e,c as r,g as k,a as P,f as a,w as n,F as d,j as f,d as _,_ as x}from"./index-2dbf6c55.js";import"./playerInPicture-af203fdf.js";const C={class:"padding-20"},F={class:"playlists"},B=h({__name:"Playlists",setup(S){const u=v(),l=m(()=>u.playlists),o=g([]);return fetch("/api/spotify/playlists").then(s=>s.json()).then(s=>{o.value=s}),(s,I)=>(e(),r("div",C,[k(y),P("div",F,[l.value.length?(e(),a(c,{key:0,heading:"Playlists"},{default:n(()=>[(e(!0),r(d,null,f(l.value,(t,i)=>(e(),a(p,{key:i,href:t.href,cover:t.cover,description:t.description,title:t.name,type:t.type,spotify:!1},null,8,["href","cover","description","title","type"]))),128))]),_:1})):_("",!0),o.value.length?(e(),a(c,{key:1,heading:"Import From Spotify"},{default:n(()=>[(e(!0),r(d,null,f(o.value,(t,i)=>(e(),a(p,{key:i,cover:t.cover,description:t.description,title:t.name,id:t.id,spotify:!0,href:`https://open.spotify.com/playlist/${t.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})):_("",!0)])]))}});const q=x(B,[["__scopeId","data-v-8dcf0184"]]);export{q as default};
