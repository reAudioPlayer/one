import{e as B,B as j,q as A,D as S,n as i,E as D,y as F,f as L,o as l,c as n,i as m,a8 as P,d as h,g as _,L as U,a,H as q,K as H,t as I,P as M,F as y,h as $,a3 as V,w as R,am as z,N as J,aq as K,ah as O,l as G,m as Q,_ as T}from"./index-DnhwPdfm.js";import{P as W}from"./PlaylistEntry-B2l8v20L.js";import"./EditSong.vue_vue_type_script_setup_true_lang-C5fIPhus.js";import"./playerInPicture-Dfp9IAsf.js";const C=c=>(G("data-v-4203b278"),c=c(),Q(),c),X={key:1,class:"fill-page"},Y={key:2,class:"artist p-4"},Z={class:"wrap"},ee={class:"artist__data"},se={class:"upper"},ae={class:"track__info__details flex flex-col justify-end"},te={class:"text-secondary my-0 text-2xl font-bold"},le={key:0,class:"text-muted text-base ml-4 font-light"},oe={class:"trac__info__details__normal"},ie={class:"flex flew-row items-center"},ne={class:"font-black text-5xl"},re=C(()=>a("hr",{class:"mb-4"},null,-1)),ue={class:"items"},ce=C(()=>a("h2",null,"All songs from this album",-1)),de={class:"items"},pe=B({__name:"Album",setup(c){const b=j();A();const E=S(()=>b.params.hash),s=i(null),f=i([]),r=i(null),d=i(null),v=i("url"),w=i(!1),x=async()=>{const e=await(await fetch(`/api/albums/${E.value}`)).json();if(e.spotify=e.spotify?JSON.parse(e.spotify):null,e.spotify)try{e.spotify.releaseDate=new Date(e.spotify.releaseDate)}catch{e.spotify.releaseDate=null}s.value=e,r.value=null,d.value="",w.value=!1,s.value.spotify.url.length&&(d.value=s.value.spotify.url,N(s.value.spotify.id),w.value=!0),v.value="link"},N=async t=>{const e=await fetch(`/api/spotify/albums/${t}`);if(!e){J.addError("Failed to fetch album from Spotify",await e.text(),3e3);return}f.value=await e.json()};D(d,()=>{var t,e;if(((e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.id)==K(d.value,"album")){v.value="link";return}v.value="save"});const g=S(()=>{var t,e,p;return((p=(e=(t=s.value)==null?void 0:t.spotify)==null?void 0:e.releaseDate)==null?void 0:p.toLocaleDateString())??""});return F(x),D(()=>b.params.name,()=>{s.value=null,x()}),(t,e)=>{var k;const p=L("Card");return l(),n(y,null,[s.value?(l(),m(P,{key:0,src:s.value.image,class:"-z-10"},null,8,["src"])):h("",!0),s.value?(l(),n("div",Y,[a("div",Z,[a("div",ee,[a("div",se,[_(q,{src:s.value.image,class:"max-w-sm rounded-xl",placeholder:"library_music",name:s.value.name},null,8,["src","name"]),a("div",ae,[a("h3",te,[_(H,{artist:s.value.artists.join(", "),class:"inline"},null,8,["artist"]),g.value?(l(),n("span",le,I(g.value),1)):h("",!0)]),a("div",oe,[a("div",ie,[a("h1",ne,I(s.value.name),1)])])])]),_(M,{class:"hideIfMobile mt-8","with-more":""}),re,a("div",ue,[(l(!0),n(y,null,$(s.value.songs,o=>V((l(),m(W,{index:s.value.songs.findIndex(u=>u.source==o.source),selected:r.value==o.id,song:o,"playlist-id":"album","with-cover":"","with-more":"",album:s.value.id,onClick:u=>r.value==o.id?r.value=-1:r.value=o.id,onUpdate:e[0]||(e[0]=u=>t.$emit("update"))},null,8,["index","selected","song","album","onClick"])),[[O,!0]])),256))]),(k=f.value)!=null&&k.length?(l(),m(p,{key:0,class:"p-4"},{default:R(()=>[ce,a("div",de,[(l(!0),n(y,null,$(f.value,(o,u)=>(l(),m(z,{index:u,song:o,"can-import":"","cannot-add":"","with-cover":"","with-more":"",onUpdate:e[1]||(e[1]=me=>t.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):h("",!0)])])])):(l(),n("div",X,[_(U)]))],64)}}}),ye=T(pe,[["__scopeId","data-v-4203b278"]]);export{ye as default};
