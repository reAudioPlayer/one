import{n as T,B as D,j as M,A as r,q as m,D as V,Q as q,c as u,u as t,F as h,a as s,g as k,I as w,h as z,y,f as x,w as A,d as E,t as B,i as F,e as j,l as K,m as L,o,bK as O,_ as Q}from"./index-65db2c2c.js";import{_ as G}from"./Playlist.vue_vue_type_script_setup_true_lang-48a72acb.js";import{P as H}from"./PlaylistItem-3ab14f55.js";import"./PlaylistEntry-e002ad41.js";import"./EditSong.vue_vue_type_script_setup_true_lang-8ac27373.js";import"./Template-a1dab28f.js";import"./IconButton-4d0597f4.js";import"./Form-bbb0f63a.js";import"./Dropdown-62bf446a.js";import"./playerInPicture-af203fdf.js";import"./PlaylistHeader-9a7963bc.js";import"./Playlist-b8ab18f3.js";import"./ExternalEntry-d20220ec.js";const C=c=>(K("data-v-a333f56f"),c=c(),L(),c),J={class:"bigPlayer"},R={class:"upNow"},U=C(()=>s("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),W={class:"settings"},X={key:1,class:"no-playlist-selected"},Y={class:"wrapper"},Z=C(()=>s("h2",null,"Nothing playing yet...",-1)),ss={class:"playlists"},es=T({__name:"BigPlayer",emits:["maximise"],setup(c,{emit:b}){const e=D(),P=M(),v=r(()=>e.playing),I=r(()=>e.song.cover),S=r(()=>e.song.id),f=r(()=>e.loaded?`${e.song.title} • ${e.song.artist}`:"reAudioPlayer One"),$=r(()=>P.playlists),g=m(null);document.title=f.value,V(f,i=>{document.title=i}),q(()=>{window.setTimeout(()=>{var a,p;if((a=g.value)!=null&&a.scrollTop)return;const i=(p=document.getElementById(`bplayer-entry-${S.value}`))==null?void 0:p.offsetTop;i>=354&&(g.value.scrollTop=i-354)},1e3)});let d=m(!1);const N=()=>{d.value=!d.value,b("maximise",d.value)},_=m(!1),l=m(!1);return(i,a)=>{const p=j("Card");return o(),u("div",J,[t(e).loaded?(o(),u(h,{key:0},[s("div",R,[k(z,{class:w([{playing:t(v),animate:l.value},"drop-shadow-2xl"]),src:t(I),type:"track","with-ambient":""},null,8,["class","src"]),s("div",{class:w([{playing:t(v),animate:l.value},"blocks"])},[U,s("div",{style:y({"animation-delay":".25s"}),class:"block"},null,4),s("div",{style:y({"animation-delay":".5s"}),class:"block"},null,4)],2)]),t(e).playlist?(o(),x(p,{class:"playlist-overflow drop-shadow-2xl relative",key:t(e).playlist.id},{default:A(()=>[k(G,{playlist:t(e).playlist,"use-queue":""},null,8,["playlist"])]),_:1})):E("",!0),s("div",W,[s("span",{class:"iconButton material-symbols-rounded",onClick:N},B(t(d)?"fullscreen_exit":"fullscreen"),1),s("span",{style:y({transform:`rotate(${_.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:a[0]||(a[0]=()=>_.value=!_.value)},"menu_open",4),s("span",{class:"iconButton material-symbols-rounded",onClick:a[1]||(a[1]=()=>l.value=!l.value)},B(l.value?"motion_photos_off":"animation"),1)])],64)):(o(),u("div",X,[s("div",Y,[Z,s("div",ss,[(o(!0),u(h,null,F(t($),n=>(o(),x(H,{key:n.id,cover:n.cover,description:n.description,title:n.name,onClick:O(()=>t(e).loadPlaylist(n.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))])}}});const ys=Q(es,[["__scopeId","data-v-a333f56f"]]);export{ys as default};
