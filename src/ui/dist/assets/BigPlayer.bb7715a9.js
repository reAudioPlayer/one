import{_ as E,K as M,j as V,A as n,n as d,z as q,aW as D,o as t,c,u as l,F as _,a as e,g as k,x as h,h as F,I as f,i as P,f as x,d as R,t as w,y as j,k as A,l as H}from"./index.f61d9b0b.js";import{P as K,a as L}from"./PlaylistEntry.49759404.js";import{P as O}from"./PlaylistItem.1ff9e50c.js";import"./EditSong.vue_vue_type_script_setup_true_lang.45a01e77.js";import"./song.14734b85.js";import"./playerInPicture.37a9ab56.js";import"./TrackInfo.1452ca48.js";import"./MiniPlayer.a1ba65d3.js";const B=u=>(A("data-v-5198f676"),u=u(),H(),u),W={class:"bigPlayer"},G={class:"upNow"},J=B(()=>e("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),Q={key:0,class:"playlistOverflow drop-shadow-2xl"},X={class:"settings"},Y={key:1,class:"no-playlist-selected"},Z={class:"wrapper"},ss=B(()=>e("h2",null,"Nothing playing yet...",-1)),es={class:"playlists"},as={__name:"BigPlayer",emits:["maximise"],setup(u,{emit:b}){const a=M(),S=V(),g=n(()=>a.playing),C=n(()=>a.song.cover),I=n(()=>a.song.id),$=n(()=>a.playlist),N=n(()=>`${a.song.title} \u2022 ${a.song.artist}`),T=n(()=>S.playlists),v=d(null);q(N,o=>{document.title=o}),D(()=>{window.setTimeout(()=>{var i,s;if((i=v.value)!=null&&i.scrollTop)return;const o=(s=document.getElementById(`bplayer-entry-${I.value}`))==null?void 0:s.offsetTop;o>=354&&(v.value.scrollTop=o-354)},1e3)});const p=d(!1),U=()=>{p.value=!p.value,b("maximise",p.value)},y=d(!1),r=d(!1),m=d(-1);return(o,i)=>(t(),c("div",W,[l(a).loaded?(t(),c(_,{key:0},[e("div",G,[k(F,{src:l(C),class:h([{playing:l(g),animate:r.value},"drop-shadow-2xl"]),type:"track"},null,8,["src","class"]),e("div",{class:h(["blocks",{playing:l(g),animate:r.value}])},[J,e("div",{class:"block",style:f({"animation-delay":".25s"})},null,4),e("div",{class:"block",style:f({"animation-delay":".5s"})},null,4)],2)]),y.value?R("",!0):(t(),c("div",Q,[e("div",{class:"playlist",ref_key:"playlistScroll",ref:v},[k(K),(t(!0),c(_,null,P(l($).songs,(s,z)=>(t(),x(L,{key:s.source,onRequestUpdate:o.updatePlaylist,song:s,index:z,onClick:ts=>m.value==s.id?m.value=-1:m.value=s.id,onUpdate:o.updatePlaylist,selected:m.value==s.id,"with-cover":"",id:"bplayer-entry-"+s.id},null,8,["onRequestUpdate","song","index","onClick","onUpdate","selected","id"]))),128))],512)])),e("div",X,[e("span",{onClick:U,class:"iconButton material-symbols-rounded"},w(p.value?"fullscreen_exit":"fullscreen"),1),e("span",{onClick:i[0]||(i[0]=()=>y.value=!y.value),class:"iconButton material-symbols-rounded",style:f({transform:`rotate(${y.value?0:180}deg)`})},"menu_open",4),e("span",{onClick:i[1]||(i[1]=()=>r.value=!r.value),class:"iconButton material-symbols-rounded"},w(r.value?"motion_photos_off":"animation"),1)])],64)):(t(),c("div",Y,[e("div",Z,[ss,e("div",es,[(t(!0),c(_,null,P(l(T),s=>(t(),x(l(O),{key:s.id,cover:s.cover,title:s.name,description:s.description,onClick:j(()=>l(a).loadPlaylist(s.id),["stop"])},null,8,["cover","title","description","onClick"]))),128))])])]))]))}},ps=E(as,[["__scopeId","data-v-5198f676"]]);export{ps as default};
