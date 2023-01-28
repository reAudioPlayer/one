import{T as h}from"./TrackCompact.76ef2626.js";import{_ as C,n as v,N as P,o,c,a as t,F as i,i as r,g as u,h as S,M as y,f as k,u as g,k as j,l as D}from"./index.a65878b2.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang.f892c59a.js";import"./song.1fa02944.js";import"./TrackInfo.a3e84021.js";import"./MiniPlayer.fe92982a.js";import"./ImportSpotifySong.vue_vue_type_script_setup_true_lang.4777e922.js";const b=l=>(j("data-v-525fe5be"),l=l(),D(),l),N={class:"wrap"},T={class:"covers"},$=b(()=>t("h2",null,"Local covers",-1)),B={class:"items grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"},I={class:"flex justify-between w-full mb-4"},F={class:"overflow-hidden"},J=["onClick"],M={class:"tracks"},O=b(()=>t("h2",null,"Local tracks",-1)),V={class:"items grid grid-cols-2 md:grid-cols-4 gap-4"},q={class:"flex justify-between w-full mb-4"},z={class:"overflow-hidden"},A=["onClick"],G={class:"flex justify-center w-full mb-4"},H=["src"],K={__name:"LocalData",setup(l){const p=v([]),m=v([]),x=P(),n=()=>{fetch("/api/config/images").then(e=>e.json()).then(e=>p.value=e),fetch("/api/config/tracks").then(e=>e.json()).then(e=>m.value=e)},w=async e=>{await fetch("/api/config/images",{method:"DELETE",body:JSON.stringify({name:e})}),n()},L=async e=>{fetch("/api/config/tracks",{method:"DELETE",body:JSON.stringify({name:e})}),n()},f=e=>{x.loadPlaylist("track",e)};return n(),(e,Q)=>(o(),c("div",N,[t("div",T,[$,t("div",B,[(o(!0),c(i,null,r(p.value,(a,d)=>(o(),c("div",{class:"cover-wrapper",key:d},[u(S,{src:a.name,class:"rounded-xl mb-4"},null,8,["src"]),t("div",I,[t("p",F,[u(y,{text:a.name},null,8,["text"])]),t("span",{class:"ml-2 material-symbols-rounded cursor-pointer",onClick:s=>w(a.name)},"delete",8,J)]),(o(!0),c(i,null,r(a.songs,(s,_)=>(o(),k(g(h),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id,onPlay:E=>f(s.id)},null,8,["artist","title","cover","id","onPlay"]))),128))]))),128))])]),t("div",M,[O,t("div",V,[(o(!0),c(i,null,r(m.value,(a,d)=>(o(),c("div",{class:"track",key:d},[t("div",q,[t("p",z,[u(y,{text:a.name},null,8,["text"])]),t("span",{class:"material-symbols-rounded cursor-pointer",onClick:s=>L(a.name)},"delete",8,A)]),t("div",G,[t("audio",{controls:"",src:"/api/"+a.name.replace("local:","/src/tracks/")},null,8,H)]),(o(!0),c(i,null,r(a.songs,(s,_)=>(o(),k(g(h),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id,onPlay:E=>f(s.id)},null,8,["artist","title","cover","id","onPlay"]))),128))]))),128))])])]))}},te=C(K,[["__scopeId","data-v-525fe5be"]]);export{te as default};
