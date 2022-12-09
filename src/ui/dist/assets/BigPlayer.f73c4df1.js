import{_ as q,H as E,i as L,A as n,C as y,K as M,aT as V,o as e,c as r,u as t,F as v,a as o,s as k,n as _,g as z,h,f as w,d as F,t as b,q as H,k as R,l as U}from"./index.12f03f32.js";import{S as A,L as K}from"./LightPlaylistEntry.005e54ea.js";import{P as O}from"./PlaylistItem.1493a894.js";import"./EditSong.vue_vue_type_script_setup_true_lang.2b98b6dd.js";import"./song.e52b21df.js";import"./TrackInfo.517dd8b6.js";import"./AlbumHeader.71370c16.js";import"./MiniPlayer.833aaa56.js";const x=d=>(R("data-v-e7a77dd2"),d=d(),U(),d),j={class:"bigPlayer"},G={class:"upNow"},J=["src"],Q=x(()=>o("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),W={key:0,class:"playlistOverflow drop-shadow-2xl"},X={class:"settings"},Y={key:1,class:"no-playlist-selected"},Z={class:"wrapper"},ss=x(()=>o("h2",null,"Nothing playing yet...",-1)),os={class:"playlists"},ts={__name:"BigPlayer",emits:["maximise"],setup(d,{emit:P}){const a=E(),S=L(),B=n(()=>a.song.title),g=n(()=>a.playing),C=n(()=>a.song.cover),I=n(()=>a.song.id),f=n(()=>a.playlist),N=n(()=>`${a.song.title} \u2022 ${a.song.artist}`),T=n(()=>S.playlists),m=y(null);M(N,l=>{document.title=l}),V(()=>{window.setTimeout(()=>{var i,s;if((i=m.value)!=null&&i.scrollTop)return;const l=(s=document.getElementById(`bplayer-entry-${I.value}`))==null?void 0:s.offsetTop;l>=354&&(m.value.scrollTop=l-354)},1e3)});const u=y(!1),D=()=>{u.value=!u.value,P("maximise",u.value)},p=y(!1),c=y(!1);return(l,i)=>(e(),r("div",j,[t(a).loaded?(e(),r(v,{key:0},[o("div",G,[o("img",{src:t(C),class:k([{playing:t(g),animate:c.value},"drop-shadow-2xl"])},null,10,J),o("div",{class:k(["blocks",{playing:t(g),animate:c.value}])},[Q,o("div",{class:"block",style:_({"animation-delay":".25s"})},null,4),o("div",{class:"block",style:_({"animation-delay":".5s"})},null,4)],2)]),p.value?F("",!0):(e(),r("div",W,[o("div",{class:"playlist",ref_key:"playlistScroll",ref:m},[z(A),(e(!0),r(v,null,h(t(f).songs,s=>(e(),w(K,{key:s.source,onDownload:l.download,onRequestUpdate:l.updatePlaylist,index:t(f).songs.findIndex($=>$.source==s.source),source:s.source,playing:s.title==t(B),id:s.id,title:s.title,album:s.album,artist:s.artist,cover:s.cover,favourite:s.favourite,duration:s.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))],512)])),o("div",X,[o("span",{onClick:D,class:"iconButton material-symbols-rounded"},b(u.value?"fullscreen_exit":"fullscreen"),1),o("span",{onClick:i[0]||(i[0]=()=>p.value=!p.value),class:"iconButton material-symbols-rounded",style:_({transform:`rotate(${p.value?0:180}deg)`})},"menu_open",4),o("span",{onClick:i[1]||(i[1]=()=>c.value=!c.value),class:"iconButton material-symbols-rounded"},b(c.value?"motion_photos_off":"animation"),1)])],64)):(e(),r("div",Y,[o("div",Z,[ss,o("div",os,[(e(!0),r(v,null,h(t(T),s=>(e(),w(t(O),{key:s.id,cover:s.cover,title:s.name,description:s.description,onClick:H(()=>t(a).loadPlaylist(s.id),["stop"])},null,8,["cover","title","description","onClick"]))),128))])])]))]))}},us=q(ts,[["__scopeId","data-v-e7a77dd2"]]);export{us as default};
