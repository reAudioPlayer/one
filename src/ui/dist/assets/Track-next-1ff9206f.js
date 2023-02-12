import{m as E,n as p,D as I,aR as M,o as n,c as _,_ as $,K as L,E as H,f as v,a as e,g as f,h as R,I as q,b as g,t as o,u as N,F as P,w as y,d as S,T as z,i as B,bP as T,B as K,k as A,l as F,bH as O,L as W,bQ as Q}from"./index-46f0a508.js";import{j as G,k as J,l as X}from"./song-3c56f591.js";import{C as h}from"./Card-1ba29db8.js";import{E as Y}from"./ExternalEntry-bf7c7568.js";import"./Dropdown-fb31760d.js";const Z=["aria-valuemax","aria-valuenow"],ee=E({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(c){const d=c,i=p(null),b=()=>{if(i.value){const u=d.modelValue/d.max*100;i.value.style.setProperty("--progress",`${u}%`),i.value.innerHTML=d.displayValue}};I(d,b,{deep:!0});const t=()=>{i.value&&(i.value.style.height=i.value.offsetWidth+"px")};return M(()=>{t(),b()}),window.addEventListener("resize",t),(u,x)=>(n(),_("div",{ref_key:"radialProgress",ref:i,"aria-valuemax":c.max,"aria-valuenow":c.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,Z))}});const U=$(ee,[["__scopeId","data-v-6e1a8d6b"]]),k=c=>(A("data-v-79a162cb"),c=c(),F(),c),ae={class:"track p-4"},se={key:1,class:"wrap"},te={class:"track__data"},le={class:"upper"},oe={class:"trac__info__details__normal"},ne={class:"text-secondary my-0 text-2xl font-bold"},ue={class:"text-muted text-base ml-2 font-light"},ie={class:"flex flew-row items-center"},re={class:"font-black text-5xl ml-4"},ce={key:0,class:"features flex flex-row gap-4 mt-4"},de={class:"mx-4"},pe=k(()=>e("p",{class:"my-0 text-muted"}," Key ",-1)),_e={class:"mx-4"},me=k(()=>e("p",{class:"my-0 text-muted"}," Camelot ",-1)),ve={class:"mx-4"},fe=k(()=>e("p",{class:"my-0 text-muted"}," BPM ",-1)),ye={class:"mx-4"},he=k(()=>e("p",{class:"my-0 text-muted"}," Duration ",-1)),xe={class:"spotify-infos flex flex-row justify-between items-center mt-4"},ge={class:"font-bold"},ke={class:"font-bold"},be={class:"font-bold"},we=k(()=>e("h2",{class:"!text-left"},"Similar Songs",-1)),Ve={class:"spotify__features__circles mt-4"},Ce={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Pe={class:"material-symbols-rounded mr-2"},Se=E({__name:"Track-next",setup(c){const d=O(),i=L(),b=H(()=>d.params.hash),t=p(null),u=p(null),x=p("url"),s=p(null),w=p([]),V=p([]),j={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},C=async(r=null)=>{t.value=null,s.value=null,w.value=[],t.value=await G(b.value),window.document.title=`${t.value.title} - reAudioPlayer One`,s.value=await J(t.value.id,!!r,r),u.value=`https://open.spotify.com/track/${s.value.spotify.id}`,w.value=await X(t.value.id),V.value=[];for(let[l,a]of Object.entries(s.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(l)||typeof a=="number"&&(l=l.replaceAll("_"," "),l=l.replace("valence","happiness"),l==="loudness"&&(a=60+a),V.value.push({key:l,value:a,icon:j[l]}))};M(C),I(d,C,{deep:!0}),I(u,()=>{var r,l,a;if(((a=(l=(r=t.value)==null?void 0:r.metadata)==null?void 0:l.spotify)==null?void 0:a.id)==T(u.value,"track")){x.value="link";return}x.value="save"});const D=()=>{if(x.value==="save"){const r=T(u.value,"track");if(!r)return;C(r);return}K(u.value)};return(r,l)=>(n(),_("div",ae,[t.value?(n(),_("div",se,[e("div",te,[e("div",le,[f(R,{src:t.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),e("div",{class:q([{"justify-end":s.value,"justify-center":!s.value},"track__info__details flex flex-col"])},[e("div",oe,[e("h3",ne,[g(o(t.value.artist)+" ",1),e("span",ue,"• "+o(t.value.album),1)]),e("div",ie,[e("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:l[0]||(l[0]=a=>N(i).loadPlaylist("track",t.value.id))}," play_circle "),e("h1",re,o(t.value.title),1)])]),s.value&&s.value.spotify.features?(n(),_(P,{key:0},[s.value&&s.value.spotify.features?(n(),_("div",ce,[f(h,{class:"p-4 w-full"},{default:y(()=>[e("h2",de,o(s.value.spotify.features.key)+" "+o(s.value.spotify.features.mode),1),pe]),_:1}),f(h,{class:"p-4 w-full"},{default:y(()=>[e("h2",_e,o(N(Q)(s.value)),1),me]),_:1}),f(h,{class:"p-4 w-full"},{default:y(()=>[e("h2",ve,o(Math.round(s.value.spotify.features.tempo)),1),fe]),_:1}),f(h,{class:"p-4 w-full"},{default:y(()=>[e("h2",ye,o(t.value.duration),1),he]),_:1})])):S("",!0),e("div",xe,[e("p",null,[g("Release Date: "),e("span",ge,o(s.value.spotify.releaseDate),1)]),e("p",null,[g("Explicit: "),e("span",ke,o(s.value.spotify.explicit),1)]),e("p",null,[g("Popularity: "),e("span",be,o(s.value.spotify.popularity),1)]),f(z,{modelValue:u.value,"onUpdate:modelValue":l[1]||(l[1]=a=>u.value=a),icon:x.value,onClick:D,class:"!w-72"},null,8,["modelValue","icon"])])],64)):S("",!0)],2)]),w.value.length?(n(),v(h,{key:0,class:"p-4 mt-8"},{default:y(()=>[we,(n(!0),_(P,null,B(w.value,(a,m)=>(n(),v(Y,{key:m,index:m,song:a,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):S("",!0)]),e("aside",Ve,[(n(!0),_(P,null,B(V.value,a=>(n(),v(h,{class:"p-2"},{default:y(()=>[a.key==="loudness"?(n(),v(U,{key:0,modelValue:a.value,"onUpdate:modelValue":m=>a.value=m,"display-value":Math.round(-60+a.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(n(),v(U,{key:1,modelValue:a.value,"onUpdate:modelValue":m=>a.value=m,"display-value":Math.round(a.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),e("p",Ce,[e("span",Pe,o(a.icon),1),g(" "+o(a.key),1)])]),_:2},1024))),256))])])):(n(),v(W,{key:0}))]))}});const Ee=$(Se,[["__scopeId","data-v-79a162cb"]]);export{Ee as default};
