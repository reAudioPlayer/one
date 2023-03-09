import{m as U,n as v,z as P,aU as E,o as t,c as p,_ as B,f as n,w as S,a as s,t as m,d as u,H as L,A as F,bP as H,g as x,h as A,D as K,b as I,u as h,F as C,T as O,i as T,bS as D,L as R,k as W,l as G,bO as J,P as Q,bT as X,K as Y,bU as Z}from"./index-63840441.js";import{d as ee,k as ae,l as te,m as se}from"./song-6bfd6160.js";import{C as $}from"./Card-1541fb70.js";import{E as le}from"./ExternalEntry-25c642db.js";import{F as k}from"./FactCard-06787258.js";import{_ as oe}from"./EditSong.vue_vue_type_script_setup_true_lang-8ac2ca3b.js";import"./Form-c1908040.js";import"./IconButton-fd8d7fa0.js";import"./Dropdown-685e63fc.js";const ne=["aria-valuemax","aria-valuenow"],re=U({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(r){const _=r,i=v(null),g=()=>{if(i.value){const d=_.modelValue/_.max*100;i.value.style.setProperty("--progress",`${d}%`),i.value.innerHTML=_.displayValue}};P(_,g,{deep:!0});const o=()=>{i.value&&(i.value.style.height=i.value.offsetWidth+"px")};return E(()=>{o(),g()}),window.addEventListener("resize",o),(d,f)=>(t(),p("div",{ref_key:"radialProgress",ref:i,"aria-valuemax":r.max,"aria-valuenow":r.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,ne))}});const M=B(re,[["__scopeId","data-v-2329319f"]]),ue={class:"material-symbols-rounded ms-fill"},ie={key:0,class:"text-muted"},de=U({__name:"ButtonCard",props:{icon:{type:String,required:!0},label:{type:String,required:!1}},setup(r){return(_,i)=>(t(),n($,{class:"p-4 flex flex-col w-full items-center justify-center"},{default:S(()=>[s("span",ue,m(r.icon),1),r.label?(t(),p("span",ie,m(r.label),1)):u("",!0)]),_:1}))}});const N=B(de,[["__scopeId","data-v-1b7199f2"]]),j=r=>(W("data-v-d39be7e6"),r=r(),G(),r),ce={class:"track p-4"},pe={key:2},me={class:"track__data"},_e={class:"upper"},ve={class:"trac__info__details__normal"},fe={class:"text-secondary my-0 text-2xl font-bold"},ye={class:"text-muted text-base ml-2 font-light"},xe={class:"flex flew-row items-center"},he={class:"font-black text-5xl ml-4"},ke={key:0,class:"features flex flex-row gap-4 pt-4 pb-2 overflow-x-auto"},ge={class:"spotify-infos mt-4"},be={class:"meta items-center"},we={class:"text-muted"},Ce={key:0,class:"material-symbols-rounded ms-fill"},Ve={class:"flex flex-row align-items"},Pe=j(()=>s("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),Se={class:"font-bold"},$e={class:"relative w-full mt-4"},Ue={class:"spotify__features__circles"},Be={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Ie={class:"material-symbols-rounded mr-2"},Te=j(()=>s("h2",{class:"!text-left"},"Similar Songs",-1)),De=U({__name:"Track",setup(r){const _=J(),i=L(),g=F(()=>_.params.hash),o=v(null),d=v(null),f=v("url"),e=v(null),b=v([]),V=v([]),q={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},w=async(c=null)=>{o.value=null,e.value=null,b.value=[],o.value=await ae(g.value),window.document.title=`${o.value.title} - reAudioPlayer One`,e.value=await te(o.value.id,!!c,c),d.value=`https://open.spotify.com/track/${e.value.spotify.id}`,f.value="link",b.value=await se(o.value.id),V.value=[];for(let[a,l]of Object.entries(e.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(a)||typeof l=="number"&&(a=a.replaceAll("_"," "),a=a.replace("valence","happiness"),a==="loudness"&&(l=60+l),V.value.push({key:a,value:l,icon:q[a]}))};E(w),P(_,()=>w(),{deep:!0}),P(d,()=>{var c,a;if(((a=(c=e.value)==null?void 0:c.spotify)==null?void 0:a.id)==D(d.value,"track")){f.value="link";return}f.value="save"});const z=()=>{if(f.value==="save"){const c=D(d.value,"track");if(!c)return;w(c);return}R(d.value)};return(c,a)=>(t(),p(C,null,[o.value?(t(),n(H,{key:0,src:o.value.cover,class:"-z-10"},null,8,["src"])):u("",!0),s("div",ce,[o.value?(t(),n(oe,{key:0,ref:"updatePopup",song:o.value,onUpdate:a[0]||(a[0]=()=>w())},null,8,["song"])):u("",!0),o.value?(t(),p("div",pe,[s("div",me,[s("div",_e,[x(A,{src:o.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),s("div",{class:K([{"justify-end":e.value,"justify-center":!e.value},"track__info__details flex flex-col"])},[s("div",ve,[s("h3",fe,[I(m(o.value.artist)+" ",1),s("span",ye,"• "+m(o.value.album),1)]),s("div",xe,[s("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:a[1]||(a[1]=l=>h(i).loadPlaylist("track",o.value.id))}," play_circle "),s("h1",he,m(o.value.title),1)])]),e.value&&e.value.spotify.features?(t(),p(C,{key:0},[e.value&&e.value.spotify.features?(t(),p("div",ke,[e.value?(t(),n(k,{key:0,"primary-text":e.value.spotify.features.key+" "+e.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"])):u("",!0),e.value?(t(),n(k,{key:1,"primary-text":h(X)(e.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"])):u("",!0),e.value?(t(),n(k,{key:2,"primary-text":Math.round(e.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"])):u("",!0),x(k,{"primary-text":h(Y)(o.value.duration),class:"w-full","secondary-text":"Duration"},null,8,["primary-text"]),e.value?(t(),n(k,{key:3,"primary-text":e.value.plays,class:"w-full","secondary-text":"Plays"},null,8,["primary-text"])):u("",!0),x(N,{icon:"edit",label:"Edit",onClick:a[2]||(a[2]=l=>c.$refs.updatePopup.show())}),x(N,{icon:"download",label:"Download",onClick:a[3]||(a[3]=l=>h(ee)(o.value.id))})])):u("",!0),s("div",ge,[s("div",be,[s("span",we,m(h(Z)(e.value.spotify.releaseDate)),1),e.value.spotify.explicit?(t(),p("span",Ce,"explicit")):u("",!0),s("span",Ve,[Pe,s("span",Se,m(e.value.spotify.popularity),1)])]),x(O,{modelValue:d.value,"onUpdate:modelValue":a[4]||(a[4]=l=>d.value=l),icon:f.value,onClick:z},null,8,["modelValue","icon"])])],64)):u("",!0)],2)])]),s("div",$e,[s("div",Ue,[(t(!0),p(C,null,T(V.value,l=>(t(),n($,{class:"p-2"},{default:S(()=>[l.key==="loudness"?(t(),n(M,{key:0,modelValue:l.value,"onUpdate:modelValue":y=>l.value=y,"display-value":Math.round(-60+l.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(t(),n(M,{key:1,modelValue:l.value,"onUpdate:modelValue":y=>l.value=y,"display-value":Math.round(l.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),s("p",Be,[s("span",Ie,m(l.icon),1),I(" "+m(l.key),1)])]),_:2},1024))),256))])]),b.value.length?(t(),n($,{key:0,class:"p-4 mt-4"},{default:S(()=>[Te,(t(!0),p(C,null,T(b.value,(l,y)=>(t(),n(le,{key:y,index:y,song:l,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):u("",!0)])):(t(),n(Q,{key:1}))])],64))}});const Ae=B(De,[["__scopeId","data-v-d39be7e6"]]);export{Ae as default};
