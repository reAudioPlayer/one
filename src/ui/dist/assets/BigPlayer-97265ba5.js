import{_ as D,J as M,j as z,E as i,n as d,D as F,aV as H,o,c as n,u as t,F as _,a as e,g as h,C as x,h as j,H as f,i as P,f as w,d as J,t as B,x as L,k as O,l as q}from"./index-817bd093.js";import{P as A}from"./PlaylistEntry-dc974835.js";import{P as G}from"./song-c16c9c3c.js";import{P as K}from"./PlaylistItem-29748108.js";import"./EditSong.vue_vue_type_script_setup_true_lang-45fc013d.js";import"./playerInPicture-af203fdf.js";import"./Dropdown-88dae077.js";import"./Playlist-cd345dfe.js";import"./TrackInfo-150c1d8f.js";const b=u=>(O("data-v-f9fd69d2"),u=u(),q(),u),Q={class:"bigPlayer"},R={class:"upNow"},U=b(()=>e("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),W={key:0,class:"playlistOverflow drop-shadow-2xl"},X={class:"settings"},Y={key:1,class:"no-playlist-selected"},Z={class:"wrapper"},ss=b(()=>e("h2",null,"Nothing playing yet...",-1)),es={class:"playlists"},ts={__name:"BigPlayer",emits:["maximise"],setup(u,{emit:C}){const l=M(),S=z(),g=i(()=>l.playing),I=i(()=>l.song.cover),$=i(()=>l.song.id),N=i(()=>l.playlist),k=i(()=>`${l.song.title} • ${l.song.artist}`),E=i(()=>S.playlists),v=d(null);document.title=k.value,F(k,r=>{document.title=r}),H(()=>{window.setTimeout(()=>{var a,s;if((a=v.value)!=null&&a.scrollTop)return;const r=(s=document.getElementById(`bplayer-entry-${$.value}`))==null?void 0:s.offsetTop;r>=354&&(v.value.scrollTop=r-354)},1e3)});let p=d(!1);const T=()=>{p.value=!p.value,C("maximise",p.value)},y=d(!1),c=d(!1),m=d(-1);return(r,a)=>(o(),n("div",Q,[t(l).loaded?(o(),n(_,{key:0},[e("div",R,[h(j,{class:x([{playing:t(g),animate:c.value},"drop-shadow-2xl"]),src:t(I),type:"track"},null,8,["class","src"]),e("div",{class:x([{playing:t(g),animate:c.value},"blocks"])},[U,e("div",{style:f({"animation-delay":".25s"}),class:"block"},null,4),e("div",{style:f({"animation-delay":".5s"}),class:"block"},null,4)],2)]),y.value?J("",!0):(o(),n("div",W,[e("div",{ref_key:"playlistScroll",ref:v,class:"playlist"},[h(G),(o(!0),n(_,null,P(t(N).songs,(s,V)=>(o(),w(A,{id:"bplayer-entry-"+s.id,key:s.source,index:V,selected:m.value==s.id,song:s,"with-cover":"",onClick:ls=>m.value==s.id?m.value=-1:m.value=s.id},null,8,["id","index","selected","song","onClick"]))),128))],512)])),e("div",X,[e("span",{class:"iconButton material-symbols-rounded",onClick:T},B(t(p)?"fullscreen_exit":"fullscreen"),1),e("span",{style:f({transform:`rotate(${y.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:a[0]||(a[0]=()=>y.value=!y.value)},"menu_open",4),e("span",{class:"iconButton material-symbols-rounded",onClick:a[1]||(a[1]=()=>c.value=!c.value)},B(c.value?"motion_photos_off":"animation"),1)])],64)):(o(),n("div",Y,[e("div",Z,[ss,e("div",es,[(o(!0),n(_,null,P(t(E),s=>(o(),w(t(K),{key:s.id,cover:s.cover,description:s.description,title:s.name,onClick:L(()=>t(l).loadPlaylist(s.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))]))}},ys=D(ts,[["__scopeId","data-v-f9fd69d2"]]);export{ys as default};