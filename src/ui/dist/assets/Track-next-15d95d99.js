import{m as M,n as m,D as P,aR as $,o,c,_ as E,K as F,E as H,f as v,a,g as f,h as R,I as q,b as S,t as p,u as V,F as C,d as g,T as z,w as I,i as N,bP as B,B as K,k as A,l as O,bH as W,L as Q,bQ as G,bR as J}from"./index-e1e1fd02.js";import{j as X,k as Y,l as Z}from"./song-1aa9c723.js";import{C as T}from"./Card-820873da.js";import{E as ee}from"./ExternalEntry-c3bba58e.js";import{F as k}from"./FactCard-c30989cc.js";import"./IconButton-e9ef882b.js";import"./Dropdown-e153a54f.js";const ae=["aria-valuemax","aria-valuenow"],te=M({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(i){const d=i,r=m(null),x=()=>{if(r.value){const n=d.modelValue/d.max*100;r.value.style.setProperty("--progress",`${n}%`),r.value.innerHTML=d.displayValue}};P(d,x,{deep:!0});const s=()=>{r.value&&(r.value.style.height=r.value.offsetWidth+"px")};return $(()=>{s(),x()}),window.addEventListener("resize",s),(n,y)=>(o(),c("div",{ref_key:"radialProgress",ref:r,"aria-valuemax":i.max,"aria-valuenow":i.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,ae))}});const U=E(te,[["__scopeId","data-v-6e1a8d6b"]]),j=i=>(A("data-v-05057a47"),i=i(),O(),i),se={class:"track p-4"},le={key:1,class:"wrap"},oe={class:"track__data"},ne={class:"upper"},re={class:"trac__info__details__normal"},ue={class:"text-secondary my-0 text-2xl font-bold"},ie={class:"text-muted text-base ml-2 font-light"},ce={class:"flex flew-row items-center"},de={class:"font-black text-5xl ml-4"},pe={key:0,class:"features flex flex-row gap-4 mt-4"},me={class:"spotify-infos mt-4"},_e={class:"meta items-center"},ve={class:"text-muted"},fe={key:0,class:"material-symbols-rounded ms-fill"},ye={class:"flex flex-row align-items"},xe=j(()=>a("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),he={class:"font-bold"},ge=j(()=>a("h2",{class:"!text-left"},"Similar Songs",-1)),ke={class:"spotify__features__circles mt-4"},be={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},we={class:"material-symbols-rounded mr-2"},Ve=M({__name:"Track-next",setup(i){const d=W(),r=F(),x=H(()=>d.params.hash),s=m(null),n=m(null),y=m("url"),t=m(null),h=m([]),b=m([]),D={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},w=async(u=null)=>{s.value=null,t.value=null,h.value=[],s.value=await X(x.value),window.document.title=`${s.value.title} - reAudioPlayer One`,t.value=await Y(s.value.id,!!u,u),n.value=`https://open.spotify.com/track/${t.value.spotify.id}`,h.value=await Z(s.value.id),b.value=[];for(let[l,e]of Object.entries(t.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(l)||typeof e=="number"&&(l=l.replaceAll("_"," "),l=l.replace("valence","happiness"),l==="loudness"&&(e=60+e),b.value.push({key:l,value:e,icon:D[l]}))};$(w),P(d,w,{deep:!0}),P(n,()=>{var u,l,e;if(((e=(l=(u=s.value)==null?void 0:u.metadata)==null?void 0:l.spotify)==null?void 0:e.id)==B(n.value,"track")){y.value="link";return}y.value="save"});const L=()=>{if(y.value==="save"){const u=B(n.value,"track");if(!u)return;w(u);return}K(n.value)};return(u,l)=>(o(),c("div",se,[s.value?(o(),c("div",le,[a("div",oe,[a("div",ne,[f(R,{src:s.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),a("div",{class:q([{"justify-end":t.value,"justify-center":!t.value},"track__info__details flex flex-col"])},[a("div",re,[a("h3",ue,[S(p(s.value.artist)+" ",1),a("span",ie,"• "+p(s.value.album),1)]),a("div",ce,[a("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:l[0]||(l[0]=e=>V(r).loadPlaylist("track",s.value.id))}," play_circle "),a("h1",de,p(s.value.title),1)])]),t.value&&t.value.spotify.features?(o(),c(C,{key:0},[t.value&&t.value.spotify.features?(o(),c("div",pe,[f(k,{"primary-text":t.value.spotify.features.key+" "+t.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"]),f(k,{"primary-text":V(G)(t.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"]),f(k,{"primary-text":Math.round(t.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"]),f(k,{"primary-text":s.value.duration,class:"w-full","secondary-text":"Duration"},null,8,["primary-text"])])):g("",!0),a("div",me,[a("div",_e,[a("span",ve,p(V(J)(t.value.spotify.releaseDate)),1),t.value.spotify.explicit?(o(),c("span",fe,"explicit")):g("",!0),a("span",ye,[xe,a("span",he,p(t.value.spotify.popularity),1)])]),f(z,{modelValue:n.value,"onUpdate:modelValue":l[1]||(l[1]=e=>n.value=e),icon:y.value,onClick:L},null,8,["modelValue","icon"])])],64)):g("",!0)],2)]),h.value.length?(o(),v(T,{key:0,class:"p-4 mt-8"},{default:I(()=>[ge,(o(!0),c(C,null,N(h.value,(e,_)=>(o(),v(ee,{key:_,index:_,song:e,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):g("",!0)]),a("aside",ke,[(o(!0),c(C,null,N(b.value,e=>(o(),v(T,{class:"p-2"},{default:I(()=>[e.key==="loudness"?(o(),v(U,{key:0,modelValue:e.value,"onUpdate:modelValue":_=>e.value=_,"display-value":Math.round(-60+e.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(o(),v(U,{key:1,modelValue:e.value,"onUpdate:modelValue":_=>e.value=_,"display-value":Math.round(e.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),a("p",be,[a("span",we,p(e.icon),1),S(" "+p(e.key),1)])]),_:2},1024))),256))])])):(o(),v(Q,{key:0}))]))}});const Ue=E(Ve,[["__scopeId","data-v-05057a47"]]);export{Ue as default};
