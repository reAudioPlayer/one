import{i as T,c9 as z,k as D,D as c,q as m,G as E,E as M,e as V,o as a,c as p,u as o,F as h,a as s,g as k,O as w,h as q,f as x,w as F,d as O,t as C,z as j,j as A,J as G,m as J,n as L,_ as H}from"./index-d16bcb03.js";import{_ as K}from"./Playlist.vue_vue_type_script_setup_true_lang-76249584.js";import{P as Q}from"./PlaylistItem-490c43f4.js";import"./PlaylistEntry-e0b64a47.js";import"./EditSong.vue_vue_type_script_setup_true_lang-9c401f51.js";import"./playerInPicture-af203fdf.js";const _=r=>(J("data-v-a333f56f"),r=r(),L(),r),R={class:"bigPlayer"},U={class:"upNow"},W=_(()=>s("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),X=_(()=>s("div",{style:{"animation-delay":".25s"},class:"block"},null,-1)),Y=_(()=>s("div",{style:{"animation-delay":".5s"},class:"block"},null,-1)),Z=[W,X,Y],ss={class:"settings"},es={key:1,class:"no-playlist-selected"},ts={class:"wrapper"},as=_(()=>s("h2",null,"Nothing playing yet...",-1)),os={class:"playlists"},ls=T({__name:"BigPlayer",emits:["maximise"],setup(r,{emit:B}){const e=z(),b=D(),v=c(()=>e.playing),P=c(()=>e.song.cover),S=c(()=>e.song.id),f=c(()=>e.loaded?`${e.song.title} • ${e.song.artist}`:"reAudioPlayer One"),I=c(()=>b.playlists),g=m(null),$=B;document.title=f.value,E(f,n=>{document.title=n}),M(()=>{window.setTimeout(()=>{var t,u;if((t=g.value)!=null&&t.scrollTop)return;const n=(u=document.getElementById(`bplayer-entry-${S.value}`))==null?void 0:u.offsetTop;n>=354&&(g.value.scrollTop=n-354)},1e3)});let d=m(!1);const N=()=>{d.value=!d.value,$("maximise",d.value)},y=m(!1),l=m(!1);return(n,t)=>{const u=V("Card");return a(),p("div",R,[o(e).loaded?(a(),p(h,{key:0},[s("div",U,[k(q,{class:w([{playing:v.value,animate:l.value},"drop-shadow-2xl"]),src:P.value,type:"track","with-ambient":""},null,8,["class","src"]),s("div",{class:w([{playing:v.value,animate:l.value},"blocks"])},Z,2)]),o(e).playlist?(a(),x(u,{class:"playlist-overflow drop-shadow-2xl relative",key:o(e).playlist.id},{default:F(()=>[k(K,{playlist:o(e).playlist,"use-queue":""},null,8,["playlist"])]),_:1})):O("",!0),s("div",ss,[s("span",{class:"iconButton material-symbols-rounded",onClick:N},C(o(d)?"fullscreen_exit":"fullscreen"),1),s("span",{style:j({transform:`rotate(${y.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:t[0]||(t[0]=()=>y.value=!y.value)},"menu_open",4),s("span",{class:"iconButton material-symbols-rounded",onClick:t[1]||(t[1]=()=>l.value=!l.value)},C(l.value?"motion_photos_off":"animation"),1)])],64)):(a(),p("div",es,[s("div",ts,[as,s("div",os,[(a(!0),p(h,null,A(I.value,i=>(a(),x(Q,{key:i.id,cover:i.cover,description:i.description,title:i.name,onClick:G(()=>o(e).loadPlaylist(i.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))])}}});const ms=H(ls,[["__scopeId","data-v-a333f56f"]]);export{ms as default};
