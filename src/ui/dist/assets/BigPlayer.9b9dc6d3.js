import{_ as q,B as z,z as E,A as n,X as y,bb as L,aO as M,o as e,c as r,u as t,F as v,a as o,q as k,n as _,g as V,j as h,f as b,d as F,t as w,m as O,p as R,i as U}from"./index.d3105e36.js";import{L as j}from"./LightPlaylistEntry.28630d03.js";import{S as A}from"./SpotifyPlaylistHeader.be7fdf13.js";import{P as H}from"./PlaylistItem.ce5f1cfe.js";import"./SongCtx.5a31453f.js";import"./EditSong.690d5862.js";import"./FindSources.f3980392.js";import"./SpotifyPlaylistEntry.365a9cc0.js";import"./MiniPlayer.8a4ed7d6.js";const x=d=>(R("data-v-e7a77dd2"),d=d(),U(),d),X={class:"bigPlayer"},G={class:"upNow"},J=["src"],K=x(()=>o("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),Q={key:0,class:"playlistOverflow drop-shadow-2xl"},W={class:"settings"},Y={key:1,class:"no-playlist-selected"},Z={class:"wrapper"},ss=x(()=>o("h2",null,"Nothing playing yet...",-1)),os={class:"playlists"},ts={__name:"BigPlayer",emits:["maximise"],setup(d,{emit:B}){const a=z(),P=E(),S=n(()=>a.song.title),g=n(()=>a.playing),I=n(()=>a.song.cover),C=n(()=>a.song.id),f=n(()=>a.playlist),N=n(()=>`${a.song.title} \u2022 ${a.song.artist}`),D=n(()=>P.playlists),m=y(null);L(N,l=>{document.title=l}),M(()=>{window.setTimeout(()=>{var i,s;if((i=m.value)!=null&&i.scrollTop)return;const l=(s=document.getElementById(`bplayer-entry-${C.value}`))==null?void 0:s.offsetTop;l>=354&&(m.value.scrollTop=l-354)},1e3)});const u=y(!1),T=()=>{u.value=!u.value,B("maximise",u.value)},p=y(!1),c=y(!1);return(l,i)=>(e(),r("div",X,[t(a).loaded?(e(),r(v,{key:0},[o("div",G,[o("img",{src:t(I),class:k([{playing:t(g),animate:c.value},"drop-shadow-2xl"])},null,10,J),o("div",{class:k(["blocks",{playing:t(g),animate:c.value}])},[K,o("div",{class:"block",style:_({"animation-delay":".25s"})},null,4),o("div",{class:"block",style:_({"animation-delay":".5s"})},null,4)],2)]),p.value?F("",!0):(e(),r("div",Q,[o("div",{class:"playlist",ref_key:"playlistScroll",ref:m},[V(A),(e(!0),r(v,null,h(t(f).songs,s=>(e(),b(j,{key:s.source,onDownload:l.download,onRequestUpdate:l.updatePlaylist,index:t(f).songs.findIndex($=>$.source==s.source),source:s.source,playing:s.title==t(S),id:s.id,title:s.title,album:s.album,artist:s.artist,cover:s.cover,favourite:s.favourite,duration:s.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))],512)])),o("div",W,[o("span",{onClick:T,class:"iconButton material-symbols-rounded"},w(u.value?"fullscreen_exit":"fullscreen"),1),o("span",{onClick:i[0]||(i[0]=()=>p.value=!p.value),class:"iconButton material-symbols-rounded",style:_({transform:`rotate(${p.value?0:180}deg)`})},"menu_open",4),o("span",{onClick:i[1]||(i[1]=()=>c.value=!c.value),class:"iconButton material-symbols-rounded"},w(c.value?"motion_photos_off":"animation"),1)])],64)):(e(),r("div",Y,[o("div",Z,[ss,o("div",os,[(e(!0),r(v,null,h(t(D),s=>(e(),b(t(H),{key:s.id,cover:s.cover,title:s.name,description:s.description,onClick:O(()=>t(a).loadPlaylist(s.id),["stop"])},null,8,["cover","title","description","onClick"]))),128))])])]))]))}},ps=q(ts,[["__scopeId","data-v-e7a77dd2"]]);export{ps as default};
