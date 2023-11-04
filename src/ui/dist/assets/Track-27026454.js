import{i as I,q as m,G as P,E as D,o as t,c as _,_ as U,f as n,w as S,a as s,t as f,d as r,C as B,B as F,c9 as A,D as H,cb as O,g as x,h as K,N as M,O as R,u as h,F as V,cc as W,cd as G,ce as Y,cf as J,Y as Q,j as N,b as X,cg as Z,ch as ee,ci as ae,cj as te,ck as T,cl as se,L as le,m as oe,n as ne}from"./index-2c0fdb7d.js";import{F as g}from"./FactCard-6f067db7.js";import{_ as ue}from"./EditSong.vue_vue_type_script_setup_true_lang-7e266a05.js";import{s as re}from"./spotify-4c071502.js";const ie=["aria-valuemax","aria-valuenow"],ce=I({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(u){const v=u,c=m(null),b=()=>{if(c.value){const d=v.modelValue/v.max*100;c.value.style.setProperty("--progress",`${d}%`),c.value.innerHTML=v.displayValue}};P(v,b,{deep:!0});const l=()=>{c.value&&(c.value.style.height=c.value.offsetWidth+"px")};return D(()=>{l(),b()}),window.addEventListener("resize",l),(d,y)=>(t(),_("div",{ref_key:"radialProgress",ref:c,"aria-valuemax":u.max,"aria-valuenow":u.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,ie))}});const j=U(ce,[["__scopeId","data-v-2329319f"]]),de={class:"material-symbols-rounded ms-fill"},pe={key:0,class:"text-muted"},_e=I({__name:"ButtonCard",props:{icon:{type:String,required:!0},label:{type:String,required:!1}},setup(u){return(v,c)=>(t(),n(B,{class:"p-4 flex flex-col w-full items-center justify-center"},{default:S(()=>[s("span",de,f(u.icon),1),u.label?(t(),_("span",pe,f(u.label),1)):r("",!0)]),_:1}))}});const q=U(_e,[["__scopeId","data-v-1b7199f2"]]),E=u=>(oe("data-v-56a3b0f7"),u=u(),ne(),u),ve={class:"track p-4"},me={key:2},fe={class:"track__data"},ye={class:"upper"},xe={class:"trac__info__details__normal"},he={class:"text-secondary my-0 text-2xl font-bold"},ke={class:"text-muted text-base ml-4 font-light"},ge={class:"flex flew-row items-center"},be={class:"font-black text-5xl ml-4"},we={key:0,class:"features flex flex-row gap-4 pt-4 pb-2 overflow-x-auto"},Ce={class:"spotify-infos mt-4"},Ve={class:"meta items-center"},$e={class:"text-muted"},Pe={key:0,class:"material-symbols-rounded ms-fill"},Se={class:"flex flex-row align-items"},Be=E(()=>s("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),Ie={class:"font-bold"},Ue={class:"relative w-full mt-4"},Me={class:"spotify__features__circles"},Ne={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Te={class:"material-symbols-rounded mr-2"},je=E(()=>s("h2",{class:"!text-left"},"Similar Songs",-1)),qe=I({__name:"Track",setup(u){const v=F(),c=A(),b=H(()=>v.params.hash),l=m(null),d=m(null),y=m("url"),a=m(null),w=m([]),$=m([]),k=m(!1),L={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},C=async(p=null)=>{var o;l.value=null,a.value=null,w.value=[],l.value=await ee(b.value),window.document.title=`${l.value.title} - reAudioPlayer One`,a.value=await ae(l.value.id,!!p,p),d.value=`https://open.spotify.com/track/${a.value.spotify.id}`,y.value="link",k.value=((o=a.value.spotify.id)==null?void 0:o.length)==22,w.value=await te(l.value.id),$.value=[];for(let[e,i]of Object.entries(a.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(e)||typeof i=="number"&&(e=e.replaceAll("_"," "),e=e.replace("valence","happiness"),e==="loudness"&&(i=60+i),$.value.push({key:e,value:i,icon:L[e]}))};D(C),P(v,()=>C(),{deep:!0}),P(d,()=>{var p,o;if(((o=(p=a.value)==null?void 0:p.spotify)==null?void 0:o.id)==T(d.value,"track")){y.value="link";return}y.value="save"});const z=()=>{if(y.value==="save"){const p=T(d.value,"track");if(!p)return;C(p);return}se(d.value)};return(p,o)=>(t(),_(V,null,[l.value?(t(),n(O,{key:0,src:l.value.cover,class:"-z-10"},null,8,["src"])):r("",!0),s("div",ve,[l.value?(t(),n(ue,{key:0,ref:"updatePopup",song:l.value,onUpdate:o[0]||(o[0]=()=>C())},null,8,["song"])):r("",!0),l.value?(t(),_("div",me,[s("div",fe,[s("div",ye,[x(K,{src:l.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),s("div",{class:M([{"justify-end":a.value,"justify-center":!a.value},"track__info__details flex flex-col"])},[s("div",xe,[s("h3",he,[x(R,{artist:l.value.artist,class:"inline"},null,8,["artist"]),s("span",ke,f(l.value.album),1)]),s("div",ge,[s("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:o[1]||(o[1]=e=>h(c).loadPlaylist("track",l.value.id))}," play_circle "),s("h1",be,f(l.value.title),1)])]),a.value&&a.value.spotify.features?(t(),_(V,{key:0},[a.value&&a.value.spotify.features?(t(),_("div",we,[a.value?(t(),n(g,{key:0,"primary-text":a.value.spotify.features.key+" "+a.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"])):r("",!0),a.value?(t(),n(g,{key:1,"primary-text":h(W)(a.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"])):r("",!0),a.value?(t(),n(g,{key:2,"primary-text":Math.round(a.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"])):r("",!0),x(g,{"primary-text":h(G)(l.value.duration),class:"w-full","secondary-text":"Duration"},null,8,["primary-text"]),a.value?(t(),n(g,{key:3,"primary-text":a.value.plays,class:"w-full","secondary-text":"Plays"},null,8,["primary-text"])):r("",!0),x(q,{icon:"edit",label:"Edit",onClick:o[2]||(o[2]=e=>p.$refs.updatePopup.show())}),x(q,{icon:"download",label:"Download",onClick:o[3]||(o[3]=e=>h(Y)(l.value.id))})])):r("",!0),s("div",Ce,[s("div",Ve,[s("span",$e,f(h(J)(a.value.spotify.releaseDate)),1),a.value.spotify.explicit?(t(),_("span",Pe,"explicit")):r("",!0),s("span",Se,[Be,s("span",Ie,f(a.value.spotify.popularity),1)])]),x(h(re),{class:M([{enabled:k.value},"spotify-enable"]),onClick:o[4]||(o[4]=e=>k.value=!k.value)},null,8,["class"]),k.value?(t(),n(Q,{key:0,modelValue:d.value,"onUpdate:modelValue":o[5]||(o[5]=e=>d.value=e),icon:y.value,onClick:z},null,8,["modelValue","icon"])):r("",!0)])],64)):r("",!0)],2)])]),s("div",Ue,[s("div",Me,[(t(!0),_(V,null,N($.value,e=>(t(),n(B,{class:"p-2"},{default:S(()=>[e.key==="loudness"?(t(),n(j,{key:0,modelValue:e.value,"onUpdate:modelValue":i=>e.value=i,"display-value":Math.round(-60+e.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(t(),n(j,{key:1,modelValue:e.value,"onUpdate:modelValue":i=>e.value=i,"display-value":Math.round(e.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),s("p",Ne,[s("span",Te,f(e.icon),1),X(" "+f(e.key),1)])]),_:2},1024))),256))])]),w.value.length?(t(),n(B,{key:0,class:"p-4 mt-4"},{default:S(()=>[je,(t(!0),_(V,null,N(w.value,(e,i)=>(t(),n(Z,{key:i,index:i,song:e,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):r("",!0)])):(t(),n(le,{key:1}))])],64))}});const Fe=U(qe,[["__scopeId","data-v-56a3b0f7"]]);export{Fe as default};
