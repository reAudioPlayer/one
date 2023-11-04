import{i as F,o as t,f as n,w as x,b as j,t as p,C as w,_ as L,B as D,s as H,D as R,q as h,G as U,E as Y,c as o,cb as q,d as i,g as y,L as z,a,h as V,N as B,F as v,j as g,u as M,Y as G,P as J,bY as O,cg as Q,cl as W,ck as E,bQ as K,m as X,n as Z}from"./index-2c0fdb7d.js";import{F as A}from"./FactCard-6f067db7.js";import{P as ee}from"./PlaylistEntry-047fb97d.js";import{s as te}from"./spotify-4c071502.js";import"./EditSong.vue_vue_type_script_setup_true_lang-7e266a05.js";import"./playerInPicture-af203fdf.js";const ae=F({__name:"Tag",props:{tag:{type:String,required:!0},withHash:{type:Boolean,default:!1}},setup(d){return(b,C)=>(t(),n(w,{class:"tag px-4 py-2 cursor-pointer","with-hover":""},{default:x(()=>[j(p(d.withHash?"#":"")+p(d.tag),1)]),_:1}))}});const se=L(ae,[["__scopeId","data-v-2712639d"]]),k=d=>(X("data-v-58a94783"),d=d(),Z(),d),le={key:1,class:"fill-page"},oe={key:2,class:"artist p-4"},ne={class:"wrap"},re={class:"artist__data"},ie={class:"upper"},ue={class:"trac__info__details__normal"},ce={key:0,class:"mt-0 mb-2 flex flex-row gap-2"},de={class:"flex flew-row items-center"},_e={class:"font-black text-5xl ml-4"},ve={class:"features flex flex-row gap-4 mt-4 overflow-x-auto"},pe={class:"spotify-infos pt-4 pb-2"},me={class:"meta items-center"},fe={key:0,class:"flex flex-row align-items"},he=k(()=>a("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),ye={class:"font-bold"},ge=k(()=>a("hr",{class:"mb-4"},null,-1)),xe={class:"items"},we={key:0,class:"spotify-suggestions mt-4"},ke=k(()=>a("h2",null,"Top Tracks",-1)),be={class:"items"},Ce=k(()=>a("h2",null,"Related Artists",-1)),$e={class:"flex flex-row items-center gap-4"},Ie={class:"flex flex-col"},Se={class:"font-bold"},Te=F({__name:"Artist",setup(d){const b=D();H();const C=R(()=>b.params.name),e=h(null),m=h(null),u=h(null),f=h("url"),c=h(!1),$=async()=>{const r=await fetch(`/api/artists/${C.value}`);e.value=await r.json(),m.value=null,u.value="",c.value=!1,e.value.metadata.id.length==22&&(u.value="https://open.spotify.com/artist/"+e.value.metadata.id,c.value=!0),f.value="link"},I=async r=>{await fetch(`/api/artists/${C.value}`,{method:"PUT",body:JSON.stringify({spotifyId:r})}),e.value=null,await $()};U(u,()=>{var r,l;if(((l=(r=e.value)==null?void 0:r.metadata)==null?void 0:l.id)==E(u.value,"artist")){f.value="link";return}f.value="save"});const P=()=>{if(f.value=="link"){W(u.value);return}I(E(u.value,"artist"))};return Y($),U(()=>b.params.name,()=>{e.value=null,$()}),(r,l)=>{var S,T,N;return t(),o(v,null,[e.value?(t(),n(q,{key:0,src:e.value.cover,class:"-z-10"},null,8,["src"])):i("",!0),e.value?(t(),o("div",oe,[a("div",ne,[a("div",re,[a("div",ie,[y(V,{src:e.value.cover,class:"max-w-sm rounded-xl",placeholder:"person"},null,8,["src"]),a("div",{class:B([{"justify-end":e.value.metadata,"justify-center":!e.value.metadata},"track__info__details flex flex-col"])},[a("div",ue,[(S=e.value.metadata)!=null&&S.genres?(t(),o("div",ce,[(t(!0),o(v,null,g(e.value.metadata.genres,s=>(t(),n(se,{tag:s,"with-hash":""},null,8,["tag"]))),256))])):i("",!0),a("div",de,[a("h1",_e,p(e.value.name),1)])]),e.value.metadata?(t(),o(v,{key:0},[a("div",ve,[e.value.metadata.followers?(t(),n(A,{key:0,"primary-text":e.value.metadata.followers.toLocaleString(),class:"w-full","secondary-text":"Followers"},null,8,["primary-text"])):i("",!0),e.value.songs.length?(t(),n(A,{key:1,"primary-text":e.value.songs.length,class:"w-full","secondary-text":"Tracks in Your Library"},null,8,["primary-text"])):i("",!0)]),a("div",pe,[a("div",me,[e.value.metadata.popularity?(t(),o("span",fe,[he,a("span",ye,p(e.value.metadata.popularity),1)])):i("",!0)]),y(M(te),{class:B([{enabled:c.value},"spotify-enable"]),onClick:l[0]||(l[0]=s=>c.value=!c.value)},null,8,["class"]),c.value?(t(),n(G,{key:0,modelValue:u.value,"onUpdate:modelValue":l[1]||(l[1]=s=>u.value=s),icon:f.value,onClick:P},null,8,["modelValue","icon"])):i("",!0),a("span",{class:"material-symbols-rounded cursor-pointer",onClick:l[2]||(l[2]=s=>c.value?I(!1):I(!0))},p(c.value?"delete":"search"),1)])],64)):i("",!0)],2)]),y(J,{class:"hideIfMobile mt-8","with-album":"","with-more":""}),ge,a("div",xe,[(t(!0),o(v,null,g(e.value.songs,s=>O((t(),n(ee,{index:e.value.songs.findIndex(_=>_.source==s.source),selected:m.value==s.id,song:s,"playlist-id":"artist","with-album":"","with-cover":"","with-more":"",artist:e.value.name,onClick:_=>m.value==s.id?m.value=-1:m.value=s.id,onUpdate:l[3]||(l[3]=_=>r.$emit("update"))},null,8,["index","selected","song","artist","onClick"])),[[K,!0]])),256))]),e.value.metadata?(t(),o("div",we,[(T=e.value.metadata.topTracks)!=null&&T.length?(t(),n(w,{key:0,class:"p-4"},{default:x(()=>[ke,a("div",be,[(t(!0),o(v,null,g(e.value.metadata.topTracks,(s,_)=>(t(),n(Q,{index:_,song:s,"can-import":"","cannot-add":"","with-album":"","with-cover":"","with-more":"",onUpdate:l[4]||(l[4]=Ne=>r.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):i("",!0),(N=e.value.metadata.related)!=null&&N.length?(t(),n(w,{key:1,class:"p-4 flex flex-col gap-2 related overflow-y-auto"},{default:x(()=>[Ce,(t(!0),o(v,null,g(e.value.metadata.related,s=>(t(),n(w,{class:"cursor-pointer px-4 py-2","with-hover":"",onClick:_=>r.$router.push(`/artist/${s.name}`)},{default:x(()=>[a("div",$e,[y(V,{src:s.cover,class:"w-8 h-8 rounded-xl",placeholder:"person"},null,8,["src"]),a("div",Ie,[a("h3",Se,p(s.name),1)])])]),_:2},1032,["onClick"]))),256))]),_:1})):i("",!0)])):i("",!0)])])])):(t(),o("div",le,[y(z)]))],64)}}});const Le=L(Te,[["__scopeId","data-v-58a94783"]]);export{Le as default};
