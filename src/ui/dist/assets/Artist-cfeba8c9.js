import{n as F,o as t,f as r,w as x,b as H,t as v,C as w,_ as L,A as R,q as h,D as U,aU as j,c as o,H as D,d as i,g as y,a,h as V,I as A,F as _,i as g,u as q,T as z,R as J,bX as M,bW as E,l as W,m as O,L as X,J as Y,s as G,N as K}from"./index-9b66f4b7.js";import{F as B}from"./FactCard-958d9c90.js";import{P as Q}from"./PlaylistHeader-2908cf18.js";import{P as Z}from"./PlaylistEntry-aac3c7b3.js";import{E as ee}from"./ExternalEntry-a83cab4c.js";import{s as te}from"./spotify-a83f1c3c.js";import"./EditSong.vue_vue_type_script_setup_true_lang-7999b78b.js";import"./Template-9f1b9544.js";import"./IconButton-2c78005e.js";import"./Form-8c5e0247.js";import"./Dropdown-622e9bc6.js";import"./playerInPicture-af203fdf.js";const ae=F({__name:"Tag",props:{tag:{type:String,required:!0},withHash:{type:Boolean,default:!1}},setup(c){return(b,C)=>(t(),r(w,{class:"tag px-4 py-2 cursor-pointer","with-hover":""},{default:x(()=>[H(v(c.withHash?"#":"")+v(c.tag),1)]),_:1}))}});const se=L(ae,[["__scopeId","data-v-2712639d"]]),k=c=>(W("data-v-49f5db63"),c=c(),O(),c),le={key:1,class:"fill-page"},oe={key:2,class:"artist p-4"},re={class:"wrap"},ne={class:"artist__data"},ie={class:"upper"},ue={class:"trac__info__details__normal"},de={key:0,class:"mt-0 mb-2 flex flex-row gap-2"},ce={class:"flex flew-row items-center"},pe={class:"font-black text-5xl ml-4"},_e={class:"features flex flex-row gap-4 mt-4 overflow-x-auto"},ve={class:"spotify-infos pt-4 pb-2"},me={class:"meta items-center"},fe={key:0,class:"flex flex-row align-items"},he=k(()=>a("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),ye={class:"font-bold"},ge=k(()=>a("hr",{class:"mb-4"},null,-1)),xe={class:"items"},we={key:0,class:"spotify-suggestions mt-4"},ke=k(()=>a("h2",null,"Top Tracks",-1)),be={class:"items"},Ce=k(()=>a("h2",null,"Related Artists",-1)),Ie={class:"flex flex-row items-center gap-4"},$e={class:"flex flex-col"},Te={class:"font-bold"},Se=F({__name:"Artist",setup(c){const b=J();G();const C=R(()=>b.params.name),e=h(null),m=h(null),u=h(null),f=h("url"),d=h(!1),I=async()=>{const n=await fetch(`/api/artists/${C.value}`);e.value=await n.json(),m.value=null,u.value="",d.value=!1,e.value.metadata.id.length==22&&(u.value="https://open.spotify.com/artist/"+e.value.metadata.id,d.value=!0),f.value="link"},$=async n=>{await fetch(`/api/artists/${C.value}`,{method:"PUT",body:JSON.stringify({spotifyId:n})}),e.value=null,await I()};U(u,()=>{var n,l;if(((l=(n=e.value)==null?void 0:n.metadata)==null?void 0:l.id)==E(u.value,"artist")){f.value="link";return}f.value="save"});const P=()=>{if(f.value=="link"){M(u.value);return}$(E(u.value,"artist"))};return j(I),U(()=>b.params.name,()=>{e.value=null,I()}),(n,l)=>{var T,S,N;return t(),o(_,null,[e.value?(t(),r(D,{key:0,src:e.value.cover,class:"-z-10"},null,8,["src"])):i("",!0),e.value?(t(),o("div",oe,[a("div",re,[a("div",ne,[a("div",ie,[y(V,{src:e.value.cover,class:"max-w-sm rounded-xl",placeholder:"person"},null,8,["src"]),a("div",{class:A([{"justify-end":e.value.metadata,"justify-center":!e.value.metadata},"track__info__details flex flex-col"])},[a("div",ue,[(T=e.value.metadata)!=null&&T.genres?(t(),o("div",de,[(t(!0),o(_,null,g(e.value.metadata.genres,s=>(t(),r(se,{tag:s,"with-hash":""},null,8,["tag"]))),256))])):i("",!0),a("div",ce,[a("h1",pe,v(e.value.name),1)])]),e.value.metadata?(t(),o(_,{key:0},[a("div",_e,[e.value.metadata.followers?(t(),r(B,{key:0,"primary-text":e.value.metadata.followers.toLocaleString(),class:"w-full","secondary-text":"Followers"},null,8,["primary-text"])):i("",!0),e.value.songs.length?(t(),r(B,{key:1,"primary-text":e.value.songs.length,class:"w-full","secondary-text":"Tracks in Your Library"},null,8,["primary-text"])):i("",!0)]),a("div",ve,[a("div",me,[e.value.metadata.popularity?(t(),o("span",fe,[he,a("span",ye,v(e.value.metadata.popularity),1)])):i("",!0)]),y(q(te),{class:A([{enabled:d.value},"spotify-enable"]),onClick:l[0]||(l[0]=s=>d.value=!d.value)},null,8,["class"]),d.value?(t(),r(z,{key:0,modelValue:u.value,"onUpdate:modelValue":l[1]||(l[1]=s=>u.value=s),icon:f.value,onClick:P},null,8,["modelValue","icon"])):i("",!0),a("span",{class:"material-symbols-rounded cursor-pointer",onClick:l[2]||(l[2]=s=>d.value?$(!1):$(!0))},v(d.value?"delete":"search"),1)])],64)):i("",!0)],2)]),y(Q,{class:"hideIfMobile mt-8","with-album":"","with-more":""}),ge,a("div",xe,[(t(!0),o(_,null,g(e.value.songs,s=>Y((t(),r(Z,{index:e.value.songs.findIndex(p=>p.source==s.source),selected:m.value==s.id,song:s,"playlist-id":"track","with-album":"","with-cover":"","with-more":"",onClick:p=>m.value==s.id?m.value=-1:m.value=s.id,onUpdate:l[3]||(l[3]=p=>n.$emit("update"))},null,8,["index","selected","song","onClick"])),[[K,!0]])),256))]),e.value.metadata?(t(),o("div",we,[(S=e.value.metadata.topTracks)!=null&&S.length?(t(),r(w,{key:0,class:"p-4"},{default:x(()=>[ke,a("div",be,[(t(!0),o(_,null,g(e.value.metadata.topTracks,(s,p)=>(t(),r(ee,{index:p,song:s,"can-import":"","cannot-add":"","with-album":"","with-cover":"","with-more":"",onUpdate:l[4]||(l[4]=Ne=>n.$emit("update"))},null,8,["index","song"]))),256))])]),_:1})):i("",!0),(N=e.value.metadata.related)!=null&&N.length?(t(),r(w,{key:1,class:"p-4 flex flex-col gap-2 related overflow-y-auto"},{default:x(()=>[Ce,(t(!0),o(_,null,g(e.value.metadata.related,s=>(t(),r(w,{class:"cursor-pointer px-4 py-2","with-hover":"",onClick:p=>n.$router.push(`/artist/${s.name}`)},{default:x(()=>[a("div",Ie,[y(V,{src:s.cover,class:"w-8 h-8 rounded-xl",placeholder:"person"},null,8,["src"]),a("div",$e,[a("h3",Te,v(s.name),1)])])]),_:2},1032,["onClick"]))),256))]),_:1})):i("",!0)])):i("",!0)])])])):(t(),o("div",le,[y(X)]))],64)}}});const qe=L(Se,[["__scopeId","data-v-49f5db63"]]);export{qe as default};
