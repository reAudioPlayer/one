import{m as I,n as f,z as P,aT as E,o as s,c as m,_ as T,f as r,w as $,a as l,t as _,d as c,H as F,A as H,g as x,h as L,D as A,b as U,u as w,F as V,T as K,i as N,bQ as S,K as O,k as R,l as W,bN as Q,O as G,bR as J,bS as X}from"./index-28547dd7.js";import{d as Y,k as Z,l as ee,m as ae}from"./song-5d5c5080.js";import{C as B}from"./Card-c0caf969.js";import{E as te}from"./ExternalEntry-023ea621.js";import{F as h}from"./FactCard-3721c88e.js";import{_ as se}from"./EditSong.vue_vue_type_script_setup_true_lang-235dbdd1.js";import"./Form-61e9b8ee.js";import"./IconButton-6effd8ac.js";import"./Dropdown-868875b9.js";const le=["aria-valuemax","aria-valuenow"],oe=I({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(n){const v=n,i=f(null),k=()=>{if(i.value){const u=v.modelValue/v.max*100;i.value.style.setProperty("--progress",`${u}%`),i.value.innerHTML=v.displayValue}};P(v,k,{deep:!0});const o=()=>{i.value&&(i.value.style.height=i.value.offsetWidth+"px")};return E(()=>{o(),k()}),window.addEventListener("resize",o),(u,y)=>(s(),m("div",{ref_key:"radialProgress",ref:i,"aria-valuemax":n.max,"aria-valuenow":n.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,le))}});const M=T(oe,[["__scopeId","data-v-6e1a8d6b"]]),ne={class:"material-symbols-rounded ms-fill"},re={key:0,class:"text-muted"},ue=I({__name:"ButtonCard",props:{icon:{type:String,required:!0},label:{type:String,required:!1}},setup(n){return(v,i)=>(s(),r(B,{class:"p-4 flex flex-col w-full items-center justify-center"},{default:$(()=>[l("span",ne,_(n.icon),1),n.label?(s(),m("span",re,_(n.label),1)):c("",!0)]),_:1}))}});const D=T(ue,[["__scopeId","data-v-98bfdf17"]]),j=n=>(R("data-v-662be443"),n=n(),W(),n),ie={class:"track p-4"},de={key:2},ce={class:"track__data"},pe={class:"upper"},me={class:"trac__info__details__normal"},_e={class:"text-secondary my-0 text-2xl font-bold"},ve={class:"text-muted text-base ml-2 font-light"},fe={class:"flex flew-row items-center"},ye={class:"font-black text-5xl ml-4"},xe={key:0,class:"features flex flex-row gap-4 mt-4 overflow-x-auto"},he={class:"spotify-infos mt-4"},ke={class:"meta items-center"},ge={class:"text-muted"},be={key:0,class:"material-symbols-rounded ms-fill"},we={class:"flex flex-row align-items"},Ce=j(()=>l("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),Ve={class:"font-bold"},Se={class:"relative w-full mt-4"},Pe={class:"spotify__features__circles"},$e={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Be={class:"material-symbols-rounded mr-2"},Ie=j(()=>l("h2",{class:"!text-left"},"Similar Songs",-1)),Te=I({__name:"Track",setup(n){const v=Q(),i=F(),k=H(()=>v.params.hash),o=f(null),u=f(null),y=f("url"),e=f(null),g=f([]),C=f([]),q={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},b=async(d=null)=>{o.value=null,e.value=null,g.value=[],o.value=await Z(k.value),window.document.title=`${o.value.title} - reAudioPlayer One`,e.value=await ee(o.value.id,!!d,d),u.value=`https://open.spotify.com/track/${e.value.spotify.id}`,y.value="link",g.value=await ae(o.value.id),C.value=[];for(let[t,a]of Object.entries(e.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(t)||typeof a=="number"&&(t=t.replaceAll("_"," "),t=t.replace("valence","happiness"),t==="loudness"&&(a=60+a),C.value.push({key:t,value:a,icon:q[t]}))};E(b),P(v,()=>b(),{deep:!0}),P(u,()=>{var d,t,a,p;if(console.log(S(u.value,"track"),(t=(d=e.value)==null?void 0:d.spotify)==null?void 0:t.id),((p=(a=e.value)==null?void 0:a.spotify)==null?void 0:p.id)==S(u.value,"track")){y.value="link";return}y.value="save"});const z=()=>{if(y.value==="save"){const d=S(u.value,"track");if(!d)return;b(d);return}O(u.value)};return(d,t)=>(s(),m("div",ie,[o.value?(s(),r(se,{key:0,ref:"updatePopup",song:o.value,onUpdate:t[0]||(t[0]=()=>b())},null,8,["song"])):c("",!0),o.value?(s(),m("div",de,[l("div",ce,[l("div",pe,[x(L,{src:o.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),l("div",{class:A([{"justify-end":e.value,"justify-center":!e.value},"track__info__details flex flex-col"])},[l("div",me,[l("h3",_e,[U(_(o.value.artist)+" ",1),l("span",ve,"• "+_(o.value.album),1)]),l("div",fe,[l("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:t[1]||(t[1]=a=>w(i).loadPlaylist("track",o.value.id))}," play_circle "),l("h1",ye,_(o.value.title),1)])]),e.value&&e.value.spotify.features?(s(),m(V,{key:0},[e.value&&e.value.spotify.features?(s(),m("div",xe,[e.value?(s(),r(h,{key:0,"primary-text":e.value.spotify.features.key+" "+e.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"])):c("",!0),e.value?(s(),r(h,{key:1,"primary-text":w(J)(e.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"])):c("",!0),e.value?(s(),r(h,{key:2,"primary-text":Math.round(e.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"])):c("",!0),x(h,{"primary-text":o.value.duration,class:"w-full","secondary-text":"Duration"},null,8,["primary-text"]),e.value?(s(),r(h,{key:3,"primary-text":e.value.plays,class:"w-full","secondary-text":"Plays"},null,8,["primary-text"])):c("",!0),x(D,{icon:"edit",label:"Edit",onClick:t[2]||(t[2]=a=>d.$refs.updatePopup.show())}),x(D,{icon:"download",label:"Download",onClick:t[3]||(t[3]=a=>w(Y)(o.value.id))})])):c("",!0),l("div",he,[l("div",ke,[l("span",ge,_(w(X)(e.value.spotify.releaseDate)),1),e.value.spotify.explicit?(s(),m("span",be,"explicit")):c("",!0),l("span",we,[Ce,l("span",Ve,_(e.value.spotify.popularity),1)])]),x(K,{modelValue:u.value,"onUpdate:modelValue":t[4]||(t[4]=a=>u.value=a),icon:y.value,onClick:z},null,8,["modelValue","icon"])])],64)):c("",!0)],2)])]),l("div",Se,[l("div",Pe,[(s(!0),m(V,null,N(C.value,a=>(s(),r(B,{class:"p-2"},{default:$(()=>[a.key==="loudness"?(s(),r(M,{key:0,modelValue:a.value,"onUpdate:modelValue":p=>a.value=p,"display-value":Math.round(-60+a.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(s(),r(M,{key:1,modelValue:a.value,"onUpdate:modelValue":p=>a.value=p,"display-value":Math.round(a.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),l("p",$e,[l("span",Be,_(a.icon),1),U(" "+_(a.key),1)])]),_:2},1024))),256))])]),g.value.length?(s(),r(B,{key:0,class:"p-4 mt-4"},{default:$(()=>[Ie,(s(!0),m(V,null,N(g.value,(a,p)=>(s(),r(te,{key:p,index:p,song:a,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):c("",!0)])):(s(),r(G,{key:1}))]))}});const He=T(Te,[["__scopeId","data-v-662be443"]]);export{He as default};
