import{_ as w,q as h,o as a,c,a as t,F as l,h as r,u,t as v,f,i as x,k as L,l as C}from"./index.137aa168.js";import{T as g}from"./TrackCompact.b2cb5016.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang.cc773221.js";import"./song.a7128768.js";import"./TrackInfo.18c3fb8a.js";import"./MiniPlayer.75ead41c.js";import"./ImportSpotifySong.vue_vue_type_script_setup_true_lang.7e7f61ec.js";const k=i=>(L("data-v-bd33d40b"),i=i(),C(),i),E={class:"wrap"},D={class:"covers"},S=k(()=>t("h2",null,"Local covers",-1)),j={class:"items grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"},T=["src"],B={class:"flex justify-between w-full mb-4"},I=["onClick"],N={class:"tracks"},F=k(()=>t("h2",null,"Local tracks",-1)),J={class:"items grid grid-cols-2 md:grid-cols-4 gap-4"},O={class:"flex justify-between w-full mb-4"},$=["onClick"],q={class:"flex justify-center w-full mb-4"},V=["src"],z={__name:"LocalData",setup(i){const p=h([]),m=h([]),n=()=>{fetch("/api/config/images").then(e=>e.json()).then(e=>p.value=e),fetch("/api/config/tracks").then(e=>e.json()).then(e=>m.value=e)},y=async e=>{await fetch("/api/config/images",{method:"DELETE",body:JSON.stringify({name:e})}),n()},b=async e=>{fetch("/api/config/tracks",{method:"DELETE",body:JSON.stringify({name:e})}),n()};return n(),(e,A)=>(a(),c("div",E,[t("div",D,[S,t("div",j,[(a(!0),c(l,null,r(p.value,(o,d)=>(a(),c("div",{class:"cover",key:d},[t("img",{src:"/api/"+u(x)(o.name),class:"rounded-xl mb-4"},null,8,T),t("div",B,[t("p",null,v(o.name),1),t("span",{class:"material-symbols-rounded cursor-pointer",onClick:s=>y(o.name)},"delete",8,I)]),(a(!0),c(l,null,r(o.songs,(s,_)=>(a(),f(u(g),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id},null,8,["artist","title","cover","id"]))),128))]))),128))])]),t("div",N,[F,t("div",J,[(a(!0),c(l,null,r(m.value,(o,d)=>(a(),c("div",{class:"track",key:d},[t("div",O,[t("p",null,v(o.name),1),t("span",{class:"material-symbols-rounded cursor-pointer",onClick:s=>b(o.name)},"delete",8,$)]),t("div",q,[t("audio",{controls:"",src:"/api/"+o.name.replace("local:","/src/tracks/")},null,8,V)]),(a(!0),c(l,null,r(o.songs,(s,_)=>(a(),f(u(g),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id},null,8,["artist","title","cover","id"]))),128))]))),128))])])]))}},U=w(z,[["__scopeId","data-v-bd33d40b"]]);export{U as default};
