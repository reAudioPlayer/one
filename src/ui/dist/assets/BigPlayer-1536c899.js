import{e as q,K as D,j as M,B as c,n as u,E as T,D as V,f as z,o as n,c as m,u as t,F as g,a as s,g as h,Q as k,J as E,i as w,w as F,d as j,t as B,y as A,h as H,H as J,l as K,m as L,_ as O}from"./index-ca817924.js";import{_ as Q}from"./Playlist.vue_vue_type_script_setup_true_lang-e42222f2.js";import{P as G}from"./PlaylistItem-e4b582db.js";import"./PlaylistEntry-4e3879da.js";import"./EditSong.vue_vue_type_script_setup_true_lang-ec9862b2.js";import"./playerInPicture-af203fdf.js";const p=r=>(K("data-v-f609e621"),r=r(),L(),r),R={class:"bigPlayer"},U={class:"upNow"},W=p(()=>s("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),X=p(()=>s("div",{style:{"animation-delay":".25s"},class:"block"},null,-1)),Y=p(()=>s("div",{style:{"animation-delay":".5s"},class:"block"},null,-1)),Z=[W,X,Y],ee={class:"settings"},se={key:1,class:"no-playlist-selected"},te={class:"wrapper"},ae=p(()=>s("h2",null,"Nothing playing yet...",-1)),oe={class:"playlists"},le=q({__name:"BigPlayer",emits:["maximise"],setup(r,{emit:C}){const e=D(),x=M(),v=c(()=>e.playing),P=c(()=>e.song.cover),b=c(()=>e.song.id),f=c(()=>e.loaded?`${e.song.title} • ${e.song.artist}`:"reAudioPlayer One"),S=c(()=>x.playlists),_=u(null),$=C;document.title=f.value,T(f,a=>{document.title=a}),V(()=>{window.setTimeout(()=>{var a;(a=_.value)!=null&&a.scrollTop||_.value.scrollToSong(b.value)},1e3)});let d=u(!1);const I=()=>{d.value=!d.value,$("maximise",d.value)},y=u(!1),i=u(!1);return(a,o)=>{const N=z("Card");return n(),m("div",R,[t(e).loaded?(n(),m(g,{key:0},[s("div",U,[h(E,{class:k([{playing:v.value,animate:i.value},"drop-shadow-2xl"]),src:P.value,type:"track","with-ambient":"",name:t(e).song.title},null,8,["class","src","name"]),s("div",{class:k([{playing:v.value,animate:i.value},"blocks"])},Z,2)]),t(e).queue?(n(),w(N,{class:"playlist-overflow drop-shadow-2xl relative",key:t(e).playlist.id},{default:F(()=>[h(Q,{ref_key:"playlistScroll",ref:_,playlist:{...t(e).playlist,queue:t(e).queue},"use-queue":""},null,8,["playlist"])]),_:1})):j("",!0),s("div",ee,[s("span",{class:"iconButton material-symbols-rounded",onClick:I},B(t(d)?"fullscreen_exit":"fullscreen"),1),s("span",{style:A({transform:`rotate(${y.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:o[0]||(o[0]=()=>y.value=!y.value)},"menu_open",4),s("span",{class:"iconButton material-symbols-rounded",onClick:o[1]||(o[1]=()=>i.value=!i.value)},B(i.value?"motion_photos_off":"animation"),1),s("span",{class:"iconButton material-symbols-rounded",onClick:o[2]||(o[2]=l=>a.$router.push("/player/insights"))}," insights ")])],64)):(n(),m("div",se,[s("div",te,[ae,s("div",oe,[(n(!0),m(g,null,H(S.value,l=>(n(),w(G,{key:l.id,cover:l.cover,description:l.description,title:l.name,onClick:J(()=>t(e).loadPlaylist(l.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))])}}});const me=O(le,[["__scopeId","data-v-f609e621"]]);export{me as default};