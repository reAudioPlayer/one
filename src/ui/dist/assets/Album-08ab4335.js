import{e as B,B as N,q as j,D as S,n,E as D,y as F,f as L,o as l,c as i,i as p,a7 as P,d as y,g as v,L as U,a,H,K as M,t as I,P as V,F as h,h as $,a2 as q,w as R,al as z,ar as J,ap as K,ag as O,l as G,m as Q,_ as T}from"./index-ffaf8705.js";import{P as W}from"./PlaylistEntry-f28bfbb2.js";import"./EditSong.vue_vue_type_script_setup_true_lang-32414f57.js";import"./playerInPicture-af203fdf.js";const C=c=>(G("data-v-4203b278"),c=c(),Q(),c),X={key:1,class:"fill-page"},Y={key:2,class:"artist p-4"},Z={class:"wrap"},ee={class:"artist__data"},se={class:"upper"},ae={class:"track__info__details flex flex-col justify-end"},te={class:"text-secondary my-0 text-2xl font-bold"},le={key:0,class:"text-muted text-base ml-4 font-light"},oe={class:"trac__info__details__normal"},ne={class:"flex flew-row items-center"},ie={class:"font-black text-5xl"},re=C(()=>a("hr",{class:"mb-4"},null,-1)),ue={class:"items"},ce=C(()=>a("h2",null,"All songs from this album",-1)),de={class:"items"},_e=B({__name:"Album",setup(c){const b=N();j();const E=S(()=>b.params.hash),s=n(null),m=n([]),r=n(null),d=n(null),f=n("url"),g=n(!1),x=async()=>{const e=await(await fetch(`/api/albums/${E.value}`)).json();if(e.spotify=e.spotify?JSON.parse(e.spotify):null,e.spotify)try{e.spotify.releaseDate=new Date(e.spotify.releaseDate)}catch{e.spotify.releaseDate=null}s.value=e,r.value=null,d.value="",g.value=!1,s.value.spotify.url.length&&(d.value=s.value.spotify.url,A(s.value.spotify.id),g.value=!0),f.value="link"},A=async t=>{const e=await fetch(`/api/spotify/albums/${t}`);if(!e){J.addError("Failed to fetch album from Spotify",await e.text(),3e3);return}m.value=await e.json()};D(d,()=>{var t,e;if(((e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.id)==K(d.value,"album")){f.value="link";return}f.value="save"});const w=S(()=>{var t,e,_;return((_=(e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.releaseDate)==null?void 0:_.toLocaleDateString())??""});return F(x),D(()=>b.params.name,()=>{s.value=null,x()}),(t,e)=>{var k;const _=L("Card");return l(),i(h,null,[s.value?(l(),p(P,{key:0,src:s.value.image,class:"-z-10"},null,8,["src"])):y("",!0),s.value?(l(),i("div",Y,[a("div",Z,[a("div",ee,[a("div",se,[v(H,{src:s.value.image,class:"max-w-sm rounded-xl",placeholder:"library_music",name:s.value.name},null,8,["src","name"]),a("div",ae,[a("h3",te,[v(M,{artist:s.value.artists.join(", "),class:"inline"},null,8,["artist"]),w.value?(l(),i("span",le,I(w.value),1)):y("",!0)]),a("div",oe,[a("div",ne,[a("h1",ie,I(s.value.name),1)])])])]),v(V,{class:"hideIfMobile mt-8","with-more":""}),re,a("div",ue,[(l(!0),i(h,null,$(s.value.songs,o=>q((l(),p(W,{index:s.value.songs.findIndex(u=>u.source==o.source),selected:r.value==o.id,song:o,"playlist-id":"album","with-cover":"","with-more":"",album:s.value.id,onClick:u=>r.value==o.id?r.value=-1:r.value=o.id,onUpdate:e[0]||(e[0]=u=>t.$emit("update"))},null,8,["index","selected","song","album","onClick"])),[[O,!0]])),256))]),(k=m.value)!=null&&k.length?(l(),p(_,{key:0,class:"p-4"},{default:R(()=>[ce,a("div",de,[(l(!0),i(h,null,$(m.value,(o,u)=>(l(),p(z,{index:u,song:o,"can-import":"","cannot-add":"","with-cover":"","with-more":"",onUpdate:e[1]||(e[1]=pe=>t.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):y("",!0)])])])):(l(),i("div",X,[v(U)]))],64)}}});const he=T(_e,[["__scopeId","data-v-4203b278"]]);export{he as default};
