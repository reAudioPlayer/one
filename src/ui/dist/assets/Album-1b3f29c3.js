import{e as N,E as j,x as B,G as S,v as n,J as D,H as F,f as L,o as l,c as i,g as p,cg as P,d as h,h as v,L as U,a as t,i as H,O as M,t as I,P as V,F as y,l as $,c2 as q,w as J,cl as O,cr as R,cp as z,bW as G,q as W,s as K,_ as Q}from"./index-48f244c4.js";import{P as T}from"./PlaylistEntry-2cba4ecd.js";import"./EditSong.vue_vue_type_script_setup_true_lang-57f6a962.js";import"./playerInPicture-af203fdf.js";const C=c=>(W("data-v-97b83fd9"),c=c(),K(),c),X={key:1,class:"fill-page"},Y={key:2,class:"artist p-4"},Z={class:"wrap"},ee={class:"artist__data"},se={class:"upper"},te={class:"track__info__details flex flex-col justify-end"},ae={class:"text-secondary my-0 text-2xl font-bold"},le={key:0,class:"text-muted text-base ml-4 font-light"},oe={class:"trac__info__details__normal"},ne={class:"flex flew-row items-center"},ie={class:"font-black text-5xl"},re=C(()=>t("hr",{class:"mb-4"},null,-1)),ue={class:"items"},ce=C(()=>t("h2",null,"All songs from this album",-1)),de={class:"items"},_e=N({__name:"Album",setup(c){const b=j();B();const E=S(()=>b.params.hash),s=n(null),f=n([]),r=n(null),d=n(null),m=n("url"),x=n(!1),g=async()=>{const e=await(await fetch(`/api/albums/${E.value}`)).json();if(e.spotify=e.spotify?JSON.parse(e.spotify):null,e.spotify)try{e.spotify.releaseDate=new Date(e.spotify.releaseDate)}catch{e.spotify.releaseDate=null}s.value=e,r.value=null,d.value="",x.value=!1,s.value.spotify.url.length&&(d.value=s.value.spotify.url,A(s.value.spotify.id),x.value=!0),m.value="link"},A=async a=>{const e=await fetch(`/api/spotify/albums/${a}`);if(!e){R.addError("Failed to fetch album from Spotify",e.text,3e3);return}f.value=await e.json()};D(d,()=>{var a,e;if(((e=(a=s.value)==null?void 0:a.spotify)==null?void 0:e.id)==z(d.value,"album")){m.value="link";return}m.value="save"});const w=S(()=>{var a,e,_;return((_=(e=(a=s.value)==null?void 0:a.spotify)==null?void 0:e.releaseDate)==null?void 0:_.toLocaleDateString())??""});return F(g),D(()=>b.params.name,()=>{s.value=null,g()}),(a,e)=>{var k;const _=L("Card");return l(),i(y,null,[s.value?(l(),p(P,{key:0,src:s.value.image,class:"-z-10"},null,8,["src"])):h("",!0),s.value?(l(),i("div",Y,[t("div",Z,[t("div",ee,[t("div",se,[v(H,{src:s.value.image,class:"max-w-sm rounded-xl",placeholder:"library_music",name:s.value.name},null,8,["src","name"]),t("div",te,[t("h3",ae,[v(M,{artist:s.value.artists.join(", "),class:"inline"},null,8,["artist"]),w.value?(l(),i("span",le,I(w.value),1)):h("",!0)]),t("div",oe,[t("div",ne,[t("h1",ie,I(s.value.name),1)])])])]),v(V,{class:"hideIfMobile mt-8","with-more":""}),re,t("div",ue,[(l(!0),i(y,null,$(s.value.songs,o=>q((l(),p(T,{index:s.value.songs.findIndex(u=>u.source==o.source),selected:r.value==o.id,song:o,"playlist-id":"album","with-cover":"","with-more":"",album:s.value.id,onClick:u=>r.value==o.id?r.value=-1:r.value=o.id,onUpdate:e[0]||(e[0]=u=>a.$emit("update"))},null,8,["index","selected","song","album","onClick"])),[[G,!0]])),256))]),(k=f.value)!=null&&k.length?(l(),p(_,{key:0,class:"p-4"},{default:J(()=>[ce,t("div",de,[(l(!0),i(y,null,$(f.value,(o,u)=>(l(),p(O,{index:u,song:o,"can-import":"","cannot-add":"","with-cover":"","with-more":"",onUpdate:e[1]||(e[1]=pe=>a.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):h("",!0)])])])):(l(),i("div",X,[v(U)]))],64)}}});const ye=Q(_e,[["__scopeId","data-v-97b83fd9"]]);export{ye as default};