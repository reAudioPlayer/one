import{i as T,b_ as M,k as V,B as c,q as p,G as q,J as z,e as A,o,c as u,u as a,F as h,a as s,g as k,aS as w,h as D,f as x,w as E,d as F,t as B,y as j,j as G,A as J,m as L,n as O,_ as H}from"./index-f1eb661c.js";import{_ as K}from"./Playlist.vue_vue_type_script_setup_true_lang-6e5264ff.js";import{P as Q}from"./PlaylistItem-8c7cea30.js";import"./PlaylistEntry-3eada459.js";import"./EditSong.vue_vue_type_script_setup_true_lang-cb18c76e.js";import"./Template-7123ef05.js";import"./IconButton-b26e0bb5.js";import"./Form-fbf7830f.js";import"./playerInPicture-af203fdf.js";import"./collection-b1c10a16.js";import"./PlaylistHeader-4db33a04.js";import"./Playlist-b6d34a34.js";import"./ExternalEntry-2831c335.js";const _=r=>(L("data-v-a333f56f"),r=r(),O(),r),R={class:"bigPlayer"},U={class:"upNow"},W=_(()=>s("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),X=_(()=>s("div",{style:{"animation-delay":".25s"},class:"block"},null,-1)),Y=_(()=>s("div",{style:{"animation-delay":".5s"},class:"block"},null,-1)),Z=[W,X,Y],ss={class:"settings"},es={key:1,class:"no-playlist-selected"},ts={class:"wrapper"},os=_(()=>s("h2",null,"Nothing playing yet...",-1)),as={class:"playlists"},ls=T({__name:"BigPlayer",emits:["maximise"],setup(r,{emit:C}){const e=M(),b=V(),v=c(()=>e.playing),P=c(()=>e.song.cover),S=c(()=>e.song.id),f=c(()=>e.loaded?`${e.song.title} • ${e.song.artist}`:"reAudioPlayer One"),I=c(()=>b.playlists),g=p(null),$=C;document.title=f.value,q(f,i=>{document.title=i}),z(()=>{window.setTimeout(()=>{var t,m;if((t=g.value)!=null&&t.scrollTop)return;const i=(m=document.getElementById(`bplayer-entry-${S.value}`))==null?void 0:m.offsetTop;i>=354&&(g.value.scrollTop=i-354)},1e3)});let d=p(!1);const N=()=>{d.value=!d.value,$("maximise",d.value)},y=p(!1),l=p(!1);return(i,t)=>{const m=A("Card");return o(),u("div",R,[a(e).loaded?(o(),u(h,{key:0},[s("div",U,[k(D,{class:w([{playing:v.value,animate:l.value},"drop-shadow-2xl"]),src:P.value,type:"track","with-ambient":""},null,8,["class","src"]),s("div",{class:w([{playing:v.value,animate:l.value},"blocks"])},Z,2)]),a(e).playlist?(o(),x(m,{class:"playlist-overflow drop-shadow-2xl relative",key:a(e).playlist.id},{default:E(()=>[k(K,{playlist:a(e).playlist,"use-queue":""},null,8,["playlist"])]),_:1})):F("",!0),s("div",ss,[s("span",{class:"iconButton material-symbols-rounded",onClick:N},B(a(d)?"fullscreen_exit":"fullscreen"),1),s("span",{style:j({transform:`rotate(${y.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:t[0]||(t[0]=()=>y.value=!y.value)},"menu_open",4),s("span",{class:"iconButton material-symbols-rounded",onClick:t[1]||(t[1]=()=>l.value=!l.value)},B(l.value?"motion_photos_off":"animation"),1)])],64)):(o(),u("div",es,[s("div",ts,[os,s("div",as,[(o(!0),u(h,null,G(I.value,n=>(o(),x(Q,{key:n.id,cover:n.cover,description:n.description,title:n.name,onClick:J(()=>a(e).loadPlaylist(n.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))])}}});const hs=H(ls,[["__scopeId","data-v-a333f56f"]]);export{hs as default};