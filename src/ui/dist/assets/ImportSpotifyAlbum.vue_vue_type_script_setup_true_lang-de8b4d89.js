import{T as w}from"./Template-6d1fbb86.js";import{F as h}from"./Form-90b03f50.js";import{P as g}from"./Playlist-b3012551.js";import{T as A}from"./ExternalEntry-9173684c.js";import{n as $,j as k,q as n,o as C,f as j,w as S,g as m,u as N,bU as P,a as T,bK as D,x as O}from"./index-a21b7814.js";import{a as _}from"./song-09082ef7.js";const q=T("br",null,null,-1),K=$({__name:"ImportSpotifyAlbum",props:{album:{type:Object,required:!0}},setup(o,{expose:b}){const e=o,r=k(),u=n([{name:"playlist",type:"dropdown",icon:"playlist_add",required:!0,value:null,options:r.playlistsAsDropdown}]),i=n(null),s=n(null),l=n([]),f=async()=>{if(l.value.length>0){i.value.show();return}const a=await i.value.fetch(`/api/spotify/albums/${e.album.id}`);a&&(l.value=await a.json())},v=()=>{const a=new CustomEvent("player.play",{detail:{artist:e.album.artist,title:e.album.title,source:e.album.href}});window.dispatchEvent(a)},c=async a=>{if(a==="new"){const t=await O(e.album.title,`${e.album.releaseDate}, ${e.album.artist}`,e.album.cover);return u.value[0].options=r.playlistsAsDropdown,u.value[0].value=t,t}return Number(a)},d=async(a,t=null)=>{l.value[a].added||(t??(t=s.value.toObject().playlist),t=await c(t),await _(t??s.value.toObject().playlist,l.value[a]),l.value[a].added=!0)},y=async()=>{let a=s.value.toObject().playlist;a=await c(a),l.value.forEach((t,p)=>{d(p,a)}),D.addSuccess(e.album.title,`Added ${l.value.length} songs to ${r.playlists[a].name}`,3e3)};return b({show:f}),(a,t)=>(C(),j(w,{ref_key:"modal",ref:i,submit:{label:"Add All",icon:"add"},name:"Import Album",onClose:t[0]||(t[0]=p=>a.$emit("close")),onSubmit:y},{default:S(()=>[m(A,{cover:o.album.cover,icons:[{name:"share",onClick:()=>N(P)(o.album.href)},{name:"play_arrow",onClick:v}],subtitle:o.album.artist,title:o.album.title},null,8,["cover","icons","subtitle","title"]),m(h,{ref_key:"form",ref:s,options:u.value},null,8,["options"]),q,m(g,{songs:l.value,noCover:"",onAdd:d},null,8,["songs"])]),_:1},512))}});export{K as _};
