import{e as N,B,q as j,D as S,n,E as D,y as F,f as L,o as l,c as i,i as p,a8 as P,d as h,g as v,L as U,a,H as q,K as H,t as I,P as M,F as y,h as $,a3 as V,w as R,am as z,N as J,aq as K,ah as O,l as G,m as Q,_ as T}from"./index-b9296d59.js";import{P as W}from"./PlaylistEntry-6b17bd55.js";import"./EditSong.vue_vue_type_script_setup_true_lang-c48b0b31.js";import"./playerInPicture-af203fdf.js";const C=c=>(G("data-v-4203b278"),c=c(),Q(),c),X={key:1,class:"fill-page"},Y={key:2,class:"artist p-4"},Z={class:"wrap"},ee={class:"artist__data"},se={class:"upper"},ae={class:"track__info__details flex flex-col justify-end"},te={class:"text-secondary my-0 text-2xl font-bold"},le={key:0,class:"text-muted text-base ml-4 font-light"},oe={class:"trac__info__details__normal"},ne={class:"flex flew-row items-center"},ie={class:"font-black text-5xl"},ue=C(()=>a("hr",{class:"mb-4"},null,-1)),re={class:"items"},ce=C(()=>a("h2",null,"All songs from this album",-1)),de={class:"items"},_e=N({__name:"Album",setup(c){const b=B();j();const E=S(()=>b.params.hash),s=n(null),m=n([]),u=n(null),d=n(null),f=n("url"),x=n(!1),g=async()=>{const e=await(await fetch(`/api/albums/${E.value}`)).json();if(e.spotify=e.spotify?JSON.parse(e.spotify):null,e.spotify)try{e.spotify.releaseDate=new Date(e.spotify.releaseDate)}catch{e.spotify.releaseDate=null}s.value=e,u.value=null,d.value="",x.value=!1,s.value.spotify.url.length&&(d.value=s.value.spotify.url,A(s.value.spotify.id),x.value=!0),f.value="link"},A=async t=>{const e=await fetch(`/api/spotify/albums/${t}`);if(!e){J.addError("Failed to fetch album from Spotify",await e.text(),3e3);return}m.value=await e.json()};D(d,()=>{var t,e;if(((e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.id)==K(d.value,"album")){f.value="link";return}f.value="save"});const w=S(()=>{var t,e,_;return((_=(e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.releaseDate)==null?void 0:_.toLocaleDateString())??""});return F(g),D(()=>b.params.name,()=>{s.value=null,g()}),(t,e)=>{var k;const _=L("Card");return l(),i(y,null,[s.value?(l(),p(P,{key:0,src:s.value.image,class:"-z-10"},null,8,["src"])):h("",!0),s.value?(l(),i("div",Y,[a("div",Z,[a("div",ee,[a("div",se,[v(q,{src:s.value.image,class:"max-w-sm rounded-xl",placeholder:"library_music",name:s.value.name},null,8,["src","name"]),a("div",ae,[a("h3",te,[v(H,{artist:s.value.artists.join(", "),class:"inline"},null,8,["artist"]),w.value?(l(),i("span",le,I(w.value),1)):h("",!0)]),a("div",oe,[a("div",ne,[a("h1",ie,I(s.value.name),1)])])])]),v(M,{class:"hideIfMobile mt-8","with-more":""}),ue,a("div",re,[(l(!0),i(y,null,$(s.value.songs,o=>V((l(),p(W,{index:s.value.songs.findIndex(r=>r.source==o.source),selected:u.value==o.id,song:o,"playlist-id":"album","with-cover":"","with-more":"",album:s.value.id,onClick:r=>u.value==o.id?u.value=-1:u.value=o.id,onUpdate:e[0]||(e[0]=r=>t.$emit("update"))},null,8,["index","selected","song","album","onClick"])),[[O,!0]])),256))]),(k=m.value)!=null&&k.length?(l(),p(_,{key:0,class:"p-4"},{default:R(()=>[ce,a("div",de,[(l(!0),i(y,null,$(m.value,(o,r)=>(l(),p(z,{index:r,song:o,"can-import":"","cannot-add":"","with-cover":"","with-more":"",onUpdate:e[1]||(e[1]=pe=>t.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):h("",!0)])])])):(l(),i("div",X,[v(U)]))],64)}}});const ye=T(_e,[["__scopeId","data-v-4203b278"]]);export{ye as default};
