import{T as w}from"./Template-7123ef05.js";import{F as h}from"./Form-fbf7830f.js";import{P as g}from"./Playlist-b6d34a34.js";import{T as A}from"./ExternalEntry-2831c335.js";import{i as k,k as $,q as n,o as C,f as S,w as j,g as c,u as P,ca as T,a as D,bZ as N,cg as O,x as _}from"./index-f1eb661c.js";const q=D("br",null,null,-1),I=k({__name:"ImportSpotifyAlbum",props:{album:{type:Object,required:!0}},setup(o,{expose:b}){const r=$(),t=o,i=n([{name:"playlist",type:"dropdown",icon:"playlist_add",required:!0,value:null,options:r.playlistsAsDropdown}]),u=n(null),s=n(null),l=n([]),f=async()=>{if(l.value.length>0){u.value.show();return}const a=await u.value.fetch(`/api/spotify/albums/${t.album.id}`);a&&(l.value=await a.json())},v=()=>{const a=new CustomEvent("player.play",{detail:{artist:t.album.artist,title:t.album.title,source:t.album.href}});window.dispatchEvent(a)},m=async a=>{if(a==="new"){const e=await _(t.album.title,`${t.album.releaseDate}, ${t.album.artist}`,t.album.cover);return i.value[0].options=r.playlistsAsDropdown,i.value[0].value=e,e}return a},d=async(a,e=null)=>{l.value[a].added||(e??(e=s.value.toObject().playlist),e=await m(e),await N(e??s.value.toObject().playlist,l.value[a]),l.value[a].added=!0)},y=async()=>{let a=s.value.toObject().playlist;a=await m(a),l.value.forEach((e,p)=>{d(p,a)}),O.addSuccess(t.album.title,`Added ${l.value.length} songs to ${r.playlists[a].name}`,3e3)};return b({show:f}),(a,e)=>(C(),S(w,{ref_key:"modal",ref:u,submit:{label:"Add All",icon:"add"},name:"Import Album",onClose:e[0]||(e[0]=p=>a.$emit("close")),onSubmit:y},{default:j(()=>[c(A,{cover:o.album.cover,icons:[{name:"share",onClick:()=>P(T)(o.album.href)},{name:"play_arrow",onClick:v}],subtitle:o.album.artist,title:o.album.title},null,8,["cover","icons","subtitle","title"]),c(h,{ref_key:"form",ref:s,options:i.value},null,8,["options"]),q,c(g,{songs:l.value,noCover:"",onAdd:d},null,8,["songs"])]),_:1},512))}});export{I as _};