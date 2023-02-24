import{l as I,m as f,y as P,aT as D,o as s,c as m,_ as T,f as n,w as $,a as l,t as _,d as i,H as F,z as H,bO as L,g as x,C as O,D as K,b as U,u as w,F as C,T as R,h as N,bR as S,K as A,j as W,k as G,bN as J,O as Q,bS as X,bT as Y}from"./index-24e68ff2.js";import{d as Z,k as ee,l as ae,m as te}from"./song-ff103b64.js";import{C as B}from"./Card-255768fd.js";import{E as se}from"./ExternalEntry-74801bac.js";import{F as h}from"./FactCard-33dd77c4.js";import{_ as le}from"./EditSong.vue_vue_type_script_setup_true_lang-8abc43d2.js";import"./Form-fa2b8928.js";import"./IconButton-7756cddf.js";import"./Dropdown-229ee4f5.js";const oe=["aria-valuemax","aria-valuenow"],ne=I({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(r){const v=r,d=f(null),k=()=>{if(d.value){const u=v.modelValue/v.max*100;d.value.style.setProperty("--progress",`${u}%`),d.value.innerHTML=v.displayValue}};P(v,k,{deep:!0});const o=()=>{d.value&&(d.value.style.height=d.value.offsetWidth+"px")};return D(()=>{o(),k()}),window.addEventListener("resize",o),(u,y)=>(s(),m("div",{ref_key:"radialProgress",ref:d,"aria-valuemax":r.max,"aria-valuenow":r.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,oe))}});const M=T(ne,[["__scopeId","data-v-2329319f"]]),re={class:"material-symbols-rounded ms-fill"},ue={key:0,class:"text-muted"},ie=I({__name:"ButtonCard",props:{icon:{type:String,required:!0},label:{type:String,required:!1}},setup(r){return(v,d)=>(s(),n(B,{class:"p-4 flex flex-col w-full items-center justify-center"},{default:$(()=>[l("span",re,_(r.icon),1),r.label?(s(),m("span",ue,_(r.label),1)):i("",!0)]),_:1}))}});const j=T(ie,[["__scopeId","data-v-1b7199f2"]]),E=r=>(W("data-v-0fefec7b"),r=r(),G(),r),de={class:"track p-4"},ce={key:2},pe={class:"track__data"},me={class:"upper"},_e={class:"trac__info__details__normal"},ve={class:"text-secondary my-0 text-2xl font-bold"},fe={class:"text-muted text-base ml-2 font-light"},ye={class:"flex flew-row items-center"},xe={class:"font-black text-5xl ml-4"},he={key:0,class:"features flex flex-row gap-4 mt-4 overflow-x-auto"},ke={class:"spotify-infos mt-4"},ge={class:"meta items-center"},be={class:"text-muted"},we={key:0,class:"material-symbols-rounded ms-fill"},Ce={class:"flex flex-row align-items"},Ve=E(()=>l("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),Se={class:"font-bold"},Pe={class:"relative w-full mt-4"},$e={class:"spotify__features__circles"},Be={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Ie={class:"material-symbols-rounded mr-2"},Te=E(()=>l("h2",{class:"!text-left"},"Similar Songs",-1)),Ue=I({__name:"Track",setup(r){const v=J(),d=F(),k=H(()=>v.params.hash),o=f(null),u=f(null),y=f("url"),e=f(null),g=f([]),V=f([]),q={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},b=async(c=null)=>{o.value=null,e.value=null,g.value=[],o.value=await ee(k.value),window.document.title=`${o.value.title} - reAudioPlayer One`,e.value=await ae(o.value.id,!!c,c),u.value=`https://open.spotify.com/track/${e.value.spotify.id}`,y.value="link",g.value=await te(o.value.id),V.value=[];for(let[t,a]of Object.entries(e.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(t)||typeof a=="number"&&(t=t.replaceAll("_"," "),t=t.replace("valence","happiness"),t==="loudness"&&(a=60+a),V.value.push({key:t,value:a,icon:q[t]}))};D(b),P(v,()=>b(),{deep:!0}),P(u,()=>{var c,t,a,p;if(console.log(S(u.value,"track"),(t=(c=e.value)==null?void 0:c.spotify)==null?void 0:t.id),((p=(a=e.value)==null?void 0:a.spotify)==null?void 0:p.id)==S(u.value,"track")){y.value="link";return}y.value="save"});const z=()=>{if(y.value==="save"){const c=S(u.value,"track");if(!c)return;b(c);return}A(u.value)};return(c,t)=>(s(),m(C,null,[o.value?(s(),n(L,{key:0,src:o.value.cover},null,8,["src"])):i("",!0),l("div",de,[o.value?(s(),n(le,{key:0,ref:"updatePopup",song:o.value,onUpdate:t[0]||(t[0]=()=>b())},null,8,["song"])):i("",!0),o.value?(s(),m("div",ce,[l("div",pe,[l("div",me,[x(O,{src:o.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),l("div",{class:K([{"justify-end":e.value,"justify-center":!e.value},"track__info__details flex flex-col"])},[l("div",_e,[l("h3",ve,[U(_(o.value.artist)+" ",1),l("span",fe,"• "+_(o.value.album),1)]),l("div",ye,[l("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:t[1]||(t[1]=a=>w(d).loadPlaylist("track",o.value.id))}," play_circle "),l("h1",xe,_(o.value.title),1)])]),e.value&&e.value.spotify.features?(s(),m(C,{key:0},[e.value&&e.value.spotify.features?(s(),m("div",he,[e.value?(s(),n(h,{key:0,"primary-text":e.value.spotify.features.key+" "+e.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"])):i("",!0),e.value?(s(),n(h,{key:1,"primary-text":w(X)(e.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"])):i("",!0),e.value?(s(),n(h,{key:2,"primary-text":Math.round(e.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"])):i("",!0),x(h,{"primary-text":o.value.duration,class:"w-full","secondary-text":"Duration"},null,8,["primary-text"]),e.value?(s(),n(h,{key:3,"primary-text":e.value.plays,class:"w-full","secondary-text":"Plays"},null,8,["primary-text"])):i("",!0),x(j,{icon:"edit",label:"Edit",onClick:t[2]||(t[2]=a=>c.$refs.updatePopup.show())}),x(j,{icon:"download",label:"Download",onClick:t[3]||(t[3]=a=>w(Z)(o.value.id))})])):i("",!0),l("div",ke,[l("div",ge,[l("span",be,_(w(Y)(e.value.spotify.releaseDate)),1),e.value.spotify.explicit?(s(),m("span",we,"explicit")):i("",!0),l("span",Ce,[Ve,l("span",Se,_(e.value.spotify.popularity),1)])]),x(R,{modelValue:u.value,"onUpdate:modelValue":t[4]||(t[4]=a=>u.value=a),icon:y.value,onClick:z},null,8,["modelValue","icon"])])],64)):i("",!0)],2)])]),l("div",Pe,[l("div",$e,[(s(!0),m(C,null,N(V.value,a=>(s(),n(B,{class:"p-2"},{default:$(()=>[a.key==="loudness"?(s(),n(M,{key:0,modelValue:a.value,"onUpdate:modelValue":p=>a.value=p,"display-value":Math.round(-60+a.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(s(),n(M,{key:1,modelValue:a.value,"onUpdate:modelValue":p=>a.value=p,"display-value":Math.round(a.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),l("p",Be,[l("span",Ie,_(a.icon),1),U(" "+_(a.key),1)])]),_:2},1024))),256))])]),g.value.length?(s(),n(B,{key:0,class:"p-4 mt-4"},{default:$(()=>[Te,(s(!0),m(C,null,N(g.value,(a,p)=>(s(),n(se,{key:p,index:p,song:a,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):i("",!0)])):(s(),n(Q,{key:1}))])],64))}});const Le=T(Ue,[["__scopeId","data-v-0fefec7b"]]);export{Le as default};
