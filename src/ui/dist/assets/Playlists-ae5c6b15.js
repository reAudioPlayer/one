import{F as p}from"./FullShelf-42de2919.js";import{P as c}from"./PlaylistItem-84e5afb8.js";import{C as m}from"./CollectionHeader-d83da25d.js";import{i as h,k as v,B as g,q as k,c as r,g as P,a as x,u as n,f as o,w as d,d as f,o as e,F as _,j as u,_ as B}from"./index-3242661c.js";import"./Template-3349c536.js";import"./IconButton-7653a4c9.js";import"./Form-43cfe527.js";import"./Dropdown-fe54ca26.js";import"./Playlist-a3af7c1e.js";import"./PlaylistHeader-dc82fa38.js";import"./ExternalEntry-864d066e.js";import"./playerInPicture-af203fdf.js";const C={class:"padding-20"},F={class:"playlists"},S=h({__name:"Playlists",setup(I){const y=v(),l=g(()=>y.playlists),a=k([]);return fetch("/api/spotify/playlists").then(s=>s.json()).then(s=>{a.value=s}),(s,N)=>(e(),r("div",C,[P(m),x("div",F,[n(l).length?(e(),o(p,{key:0,heading:"Playlists"},{default:d(()=>[(e(!0),r(_,null,u(n(l),(t,i)=>(e(),o(c,{key:i,href:t.href,cover:t.cover,description:t.description,title:t.name,type:t.type,spotify:!1},null,8,["href","cover","description","title","type"]))),128))]),_:1})):f("",!0),a.value.length?(e(),o(p,{key:1,heading:"Import From Spotify"},{default:d(()=>[(e(!0),r(_,null,u(a.value,(t,i)=>(e(),o(c,{key:i,cover:t.cover,description:t.description,title:t.name,id:t.id,spotify:!0,href:`https://open.spotify.com/playlist/${t.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})):f("",!0)])]))}});const G=B(S,[["__scopeId","data-v-8dcf0184"]]);export{G as default};
