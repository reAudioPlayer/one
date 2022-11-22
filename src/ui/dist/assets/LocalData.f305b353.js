import{_ as w,X as h,o,c,a as e,F as l,h as r,u,t as v,f,j as x,k as L,l as C}from"./index.8fd665a1.js";import{T as g}from"./TrackCompact.c94f885c.js";import"./AddAlbumToPlaylist.bb843629.js";import"./MiniPlayer.cc5dcaa5.js";import"./FindSources.1e41b288.js";import"./AddSongToPlaylist.818a2025.js";const k=i=>(L("data-v-bd33d40b"),i=i(),C(),i),E={class:"wrap"},j={class:"covers"},D=k(()=>e("h2",null,"Local covers",-1)),S={class:"items grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"},T=["src"],B={class:"flex justify-between w-full mb-4"},I=["onClick"],N={class:"tracks"},F=k(()=>e("h2",null,"Local tracks",-1)),J={class:"items grid grid-cols-2 md:grid-cols-4 gap-4"},O={class:"flex justify-between w-full mb-4"},$=["onClick"],V={class:"flex justify-center w-full mb-4"},X=["src"],q={__name:"LocalData",setup(i){const p=h([]),m=h([]),n=()=>{fetch("/api/config/images").then(t=>t.json()).then(t=>p.value=t),fetch("/api/config/tracks").then(t=>t.json()).then(t=>m.value=t)},y=async t=>{await fetch("/api/config/images",{method:"DELETE",body:JSON.stringify({name:t})}),n()},b=async t=>{fetch("/api/config/tracks",{method:"DELETE",body:JSON.stringify({name:t})}),n()};return n(),(t,z)=>(o(),c("div",E,[e("div",j,[D,e("div",S,[(o(!0),c(l,null,r(p.value,(a,d)=>(o(),c("div",{class:"cover",key:d},[e("img",{src:"/api/"+u(x)(a.name),class:"rounded-xl mb-4"},null,8,T),e("div",B,[e("p",null,v(a.name),1),e("span",{class:"material-symbols-rounded cursor-pointer",onClick:s=>y(a.name)},"delete",8,I)]),(o(!0),c(l,null,r(a.songs,(s,_)=>(o(),f(u(g),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id},null,8,["artist","title","cover","id"]))),128))]))),128))])]),e("div",N,[F,e("div",J,[(o(!0),c(l,null,r(m.value,(a,d)=>(o(),c("div",{class:"track",key:d},[e("div",O,[e("p",null,v(a.name),1),e("span",{class:"material-symbols-rounded cursor-pointer",onClick:s=>b(a.name)},"delete",8,$)]),e("div",V,[e("audio",{controls:"",src:"/api/"+a.name.replace("local:","/src/tracks/")},null,8,X)]),(o(!0),c(l,null,r(a.songs,(s,_)=>(o(),f(u(g),{key:_,artist:s.artist,title:s.title,cover:s.cover,id:s.id},null,8,["artist","title","cover","id"]))),128))]))),128))])])]))}},Q=w(q,[["__scopeId","data-v-bd33d40b"]]);export{Q as default};
