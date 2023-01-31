import{_ as M,J as V,j as z,E as i,n as d,D as F,aZ as H,o as a,c as n,u as t,F as _,a as e,g as h,C as x,h as j,H as f,i as b,f as P,d as J,t as w,x as L,k as O,l as Z}from"./index.287edd0f.js";import{P as q}from"./PlaylistEntry.3be00b6c.js";import{P as A}from"./song.d347a36d.js";import{P as G}from"./PlaylistItem.fe38a5e7.js";import"./EditSong.vue_vue_type_script_setup_true_lang.757fd74a.js";import"./playerInPicture.37a9ab56.js";import"./Dropdown.1957d047.js";import"./TrackInfo.e4c645e5.js";const B=u=>(O("data-v-d204b5f5"),u=u(),Z(),u),K={class:"bigPlayer"},Q={class:"upNow"},R=B(()=>e("div",{style:{"animation-delay":"0s"},class:"block"},null,-1)),U={key:0,class:"playlistOverflow drop-shadow-2xl"},W={class:"settings"},X={key:1,class:"no-playlist-selected"},Y={class:"wrapper"},ss=B(()=>e("h2",null,"Nothing playing yet...",-1)),es={class:"playlists"},ts={__name:"BigPlayer",emits:["maximise"],setup(u,{emit:C}){const l=V(),S=z(),g=i(()=>l.playing),I=i(()=>l.song.cover),$=i(()=>l.song.id),N=i(()=>l.playlist),k=i(()=>`${l.song.title} \u2022 ${l.song.artist}`),E=i(()=>S.playlists),v=d(null);document.title=k.value,F(k,r=>{document.title=r}),H(()=>{window.setTimeout(()=>{var o,s;if((o=v.value)!=null&&o.scrollTop)return;const r=(s=document.getElementById(`bplayer-entry-${$.value}`))==null?void 0:s.offsetTop;r>=354&&(v.value.scrollTop=r-354)},1e3)});let p=d(!1);const T=()=>{p.value=!p.value,C("maximise",p.value)},y=d(!1),c=d(!1),m=d(-1);return(r,o)=>(a(),n("div",K,[t(l).loaded?(a(),n(_,{key:0},[e("div",Q,[h(j,{class:x([{playing:t(g),animate:c.value},"drop-shadow-2xl"]),src:t(I),type:"track"},null,8,["class","src"]),e("div",{class:x([{playing:t(g),animate:c.value},"blocks"])},[R,e("div",{style:f({"animation-delay":".25s"}),class:"block"},null,4),e("div",{style:f({"animation-delay":".5s"}),class:"block"},null,4)],2)]),y.value?J("",!0):(a(),n("div",U,[e("div",{ref_key:"playlistScroll",ref:v,class:"playlist"},[h(A),(a(!0),n(_,null,b(t(N).songs,(s,D)=>(a(),P(q,{id:"bplayer-entry-"+s.id,key:s.source,index:D,selected:m.value==s.id,song:s,"with-cover":"",onClick:ls=>m.value==s.id?m.value=-1:m.value=s.id},null,8,["id","index","selected","song","onClick"]))),128))],512)])),e("div",W,[e("span",{class:"iconButton material-symbols-rounded",onClick:T},w(t(p)?"fullscreen_exit":"fullscreen"),1),e("span",{style:f({transform:`rotate(${y.value?0:180}deg)`}),class:"iconButton material-symbols-rounded",onClick:o[0]||(o[0]=()=>y.value=!y.value)},"menu_open",4),e("span",{class:"iconButton material-symbols-rounded",onClick:o[1]||(o[1]=()=>c.value=!c.value)},w(c.value?"motion_photos_off":"animation"),1)])],64)):(a(),n("div",X,[e("div",Y,[ss,e("div",es,[(a(!0),n(_,null,b(t(E),s=>(a(),P(t(G),{key:s.id,cover:s.cover,description:s.description,title:s.name,onClick:L(()=>t(l).loadPlaylist(s.id),["stop"])},null,8,["cover","description","title","onClick"]))),128))])])]))]))}},ps=M(ts,[["__scopeId","data-v-d204b5f5"]]);export{ps as default};
