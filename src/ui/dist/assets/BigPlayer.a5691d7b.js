import{_ as q,G as z,i as E,z as n,x as y,J as L,aS as M,o as e,c as r,u as t,F as v,a as o,s as k,n as _,g as V,h,f as w,d as F,t as x,q as R,k as U,l as G}from"./index.789939b0.js";import{S as H,L as J}from"./LightPlaylistEntry.64eea6ca.js";import{P as O}from"./PlaylistItem.70d6710b.js";import"./SongCtx.e97d8c11.js";import"./EditSong.vue_vue_type_script_setup_true_lang.9b01811f.js";import"./song.21840599.js";import"./TrackInfo.2257f372.js";import"./MiniPlayer.d7ae9c7c.js";const S=d=>(U("data-v-e7a77dd2"),d=d(),G(),d),j={class:"bigPlayer"},A={class:"upNow"},K=["src"],Q=S(()=>o("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),W={key:0,class:"playlistOverflow drop-shadow-2xl"},X={class:"settings"},Y={key:1,class:"no-playlist-selected"},Z={class:"wrapper"},ss=S(()=>o("h2",null,"Nothing playing yet...",-1)),os={class:"playlists"},ts={__name:"BigPlayer",emits:["maximise"],setup(d,{emit:b}){const a=z(),P=E(),B=n(()=>a.song.title),g=n(()=>a.playing),I=n(()=>a.song.cover),C=n(()=>a.song.id),f=n(()=>a.playlist),N=n(()=>`${a.song.title} \u2022 ${a.song.artist}`),D=n(()=>P.playlists),m=y(null);L(N,l=>{document.title=l}),M(()=>{window.setTimeout(()=>{var i,s;if((i=m.value)!=null&&i.scrollTop)return;const l=(s=document.getElementById(`bplayer-entry-${C.value}`))==null?void 0:s.offsetTop;l>=354&&(m.value.scrollTop=l-354)},1e3)});const u=y(!1),T=()=>{u.value=!u.value,b("maximise",u.value)},p=y(!1),c=y(!1);return(l,i)=>(e(),r("div",j,[t(a).loaded?(e(),r(v,{key:0},[o("div",A,[o("img",{src:t(I),class:k([{playing:t(g),animate:c.value},"drop-shadow-2xl"])},null,10,K),o("div",{class:k(["blocks",{playing:t(g),animate:c.value}])},[Q,o("div",{class:"block",style:_({"animation-delay":".25s"})},null,4),o("div",{class:"block",style:_({"animation-delay":".5s"})},null,4)],2)]),p.value?F("",!0):(e(),r("div",W,[o("div",{class:"playlist",ref_key:"playlistScroll",ref:m},[V(H),(e(!0),r(v,null,h(t(f).songs,s=>(e(),w(J,{key:s.source,onDownload:l.download,onRequestUpdate:l.updatePlaylist,index:t(f).songs.findIndex($=>$.source==s.source),source:s.source,playing:s.title==t(B),id:s.id,title:s.title,album:s.album,artist:s.artist,cover:s.cover,favourite:s.favourite,duration:s.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))],512)])),o("div",X,[o("span",{onClick:T,class:"iconButton material-symbols-rounded"},x(u.value?"fullscreen_exit":"fullscreen"),1),o("span",{onClick:i[0]||(i[0]=()=>p.value=!p.value),class:"iconButton material-symbols-rounded",style:_({transform:`rotate(${p.value?0:180}deg)`})},"menu_open",4),o("span",{onClick:i[1]||(i[1]=()=>c.value=!c.value),class:"iconButton material-symbols-rounded"},x(c.value?"motion_photos_off":"animation"),1)])],64)):(e(),r("div",Y,[o("div",Z,[ss,o("div",os,[(e(!0),r(v,null,h(t(D),s=>(e(),w(t(O),{key:s.id,cover:s.cover,title:s.name,description:s.description,onClick:R(()=>t(a).loadPlaylist(s.id),["stop"])},null,8,["cover","title","description","onClick"]))),128))])])]))]))}},us=q(ts,[["__scopeId","data-v-e7a77dd2"]]);export{us as default};
