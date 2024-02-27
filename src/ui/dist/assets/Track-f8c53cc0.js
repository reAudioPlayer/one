import{e as U,n as m,E as B,D as j,o as a,c as _,_ as M,i as n,w as P,a as s,t as f,d as r,C as I,A as H,K as O,B as R,f as K,cg as W,g as y,J,Q as T,O as Q,b as q,u as k,F as $,ch as Z,ci as G,cj as X,ck as Y,Z as ee,h as D,cl as ae,cm as te,cn as se,co as le,cp as E,cq as oe,L as ne,l as ue,m as re}from"./index-ca817924.js";import{F as b}from"./FactCard-d172b831.js";import{_ as ie}from"./EditSong.vue_vue_type_script_setup_true_lang-ec9862b2.js";import{s as ce}from"./spotify-43f8bee5.js";const de=["aria-valuemax","aria-valuenow"],pe=U({__name:"ProgressCircle",props:{max:{type:Number,required:!1,default:100},modelValue:{type:Number,required:!1,default:0},displayValue:{type:String,required:!0}},setup(u){const v=u,i=m(null),w=()=>{if(i.value){const c=v.modelValue/v.max*100;i.value.style.setProperty("--progress",`${c}%`),i.value.innerHTML=v.displayValue}};B(v,w,{deep:!0});const l=()=>{i.value&&(i.value.style.height=i.value.offsetWidth+"px")};return j(()=>{l(),w()}),window.addEventListener("resize",l),(c,x)=>(a(),_("div",{ref_key:"radialProgress",ref:i,"aria-valuemax":u.max,"aria-valuenow":u.modelValue,"aria-valuemin":"0",class:"radialProgress",role:"progressbar"},null,8,de))}});const L=M(pe,[["__scopeId","data-v-6e1a8d6b"]]),_e={class:"material-symbols-rounded ms-fill"},ve={key:0,class:"text-muted"},me=U({__name:"ButtonCard",props:{icon:{type:String,required:!0},label:{type:String,required:!1}},setup(u){return(v,i)=>(a(),n(I,{class:"p-4 flex flex-col w-full items-center justify-center"},{default:P(()=>[s("span",_e,f(u.icon),1),u.label?(a(),_("span",ve,f(u.label),1)):r("",!0)]),_:1}))}});const N=M(me,[["__scopeId","data-v-98bfdf17"]]),z=u=>(ue("data-v-ea0397be"),u=u(),re(),u),fe={class:"track p-4"},ye={key:2},xe={class:"track__data"},he={class:"upper"},ke={class:"trac__info__details__normal"},ge={class:"text-secondary my-0 text-2xl font-bold"},be={class:"text-muted text-base ml-4 font-light"},we={class:"flex flew-row items-center"},Ce={class:"font-black text-5xl ml-4"},Ve={key:0,class:"features flex flex-row gap-4 pt-4 pb-2 overflow-x-auto"},$e={class:"spotify-infos mt-4"},Pe={class:"meta items-center"},Se={class:"text-muted"},Be={key:0,class:"material-symbols-rounded ms-fill"},Ie={class:"flex flex-row align-items"},Ue=z(()=>s("span",{class:"material-symbols-rounded ms-fill mr-2"},"local_fire_department",-1)),Me={class:"font-bold"},Te={class:"relative w-full mt-4"},qe={class:"spotify__features__circles"},De={class:"text-muted mb-0 text-center text-sm capitalize flex justify-center"},Ee={class:"material-symbols-rounded mr-2"},Le=z(()=>s("h2",{class:"!text-left"},"Similar Songs",-1)),Ne=U({__name:"Track",setup(u){const v=H(),i=O(),w=R(()=>v.params.hash),l=m(null),c=m(null),x=m("url"),e=m(null),C=m([]),S=m([]),g=m(!1),A={acousticness:"piano",danceability:"nightlife",energy:"electric_bolt",happiness:"mood",instrumentalness:"mic_off",liveness:"groups_2",speechiness:"mic",loudness:"volume_up"},V=async(d=null)=>{var o;l.value=null,e.value=null,C.value=[],l.value=await te(w.value),window.document.title=`${l.value.title} - reAudioPlayer One`,e.value=await se(l.value.id,!!d,d),c.value=`https://open.spotify.com/track/${e.value.spotify.id}`,x.value="link",g.value=((o=e.value.spotify.id)==null?void 0:o.length)==22,C.value=await le(l.value.id),S.value=[];for(let[p,t]of Object.entries(e.value.spotify.features))["key","mode","tempo","duration_ms","time_signature"].includes(p)||typeof t=="number"&&(p=p.replaceAll("_"," "),p=p.replace("valence","happiness"),p==="loudness"&&(t=60+t),S.value.push({key:p,value:t,icon:A[p]}))};j(V),B(v,()=>V(),{deep:!0}),B(c,()=>{var d,o;if(((o=(d=e.value)==null?void 0:d.spotify)==null?void 0:o.id)==E(c.value,"track")){x.value="link";return}x.value="save"});const F=()=>{if(x.value==="save"){const d=E(c.value,"track");if(!d)return;V(d);return}oe(c.value)};return(d,o)=>{const p=K("RouterLink");return a(),_($,null,[l.value?(a(),n(W,{key:0,src:l.value.cover,class:"-z-10"},null,8,["src"])):r("",!0),s("div",fe,[l.value?(a(),n(ie,{key:0,ref:"updatePopup",song:l.value,onUpdate:o[0]||(o[0]=()=>V())},null,8,["song"])):r("",!0),l.value?(a(),_("div",ye,[s("div",xe,[s("div",he,[y(J,{src:l.value.cover,class:"max-w-sm rounded-xl"},null,8,["src"]),s("div",{class:T([{"justify-end":e.value,"justify-center":!e.value},"track__info__details flex flex-col"])},[s("div",ke,[s("h3",ge,[y(Q,{artist:l.value.artist,class:"inline"},null,8,["artist"]),s("span",be,[y(p,{to:l.value.album.href,class:"linkOnHover"},{default:P(()=>[q(f(l.value.album.name),1)]),_:1},8,["to"])])]),s("div",we,[s("span",{class:"text-5xl cursor-pointer material-symbols-rounded ms-fill my-auto",onClick:o[1]||(o[1]=t=>k(i).loadPlaylist("track",l.value.id))}," play_circle "),s("h1",Ce,f(l.value.title),1)])]),e.value&&e.value.spotify.features?(a(),_($,{key:0},[e.value&&e.value.spotify.features?(a(),_("div",Ve,[e.value?(a(),n(b,{key:0,"primary-text":e.value.spotify.features.key+" "+e.value.spotify.features.mode,class:"w-full","secondary-text":"Key"},null,8,["primary-text"])):r("",!0),e.value?(a(),n(b,{key:1,"primary-text":k(Z)(e.value),class:"w-full","secondary-text":"Camelot"},null,8,["primary-text"])):r("",!0),e.value?(a(),n(b,{key:2,"primary-text":Math.round(e.value.spotify.features.tempo),class:"w-full","secondary-text":"BPM"},null,8,["primary-text"])):r("",!0),y(b,{"primary-text":k(G)(l.value.duration),class:"w-full","secondary-text":"Duration"},null,8,["primary-text"]),e.value?(a(),n(b,{key:3,"primary-text":e.value.plays,class:"w-full","secondary-text":"Plays"},null,8,["primary-text"])):r("",!0),y(N,{icon:"edit",label:"Edit",onClick:o[2]||(o[2]=t=>d.$refs.updatePopup.show())}),y(N,{icon:"download",label:"Download",onClick:o[3]||(o[3]=t=>k(X)(l.value.id))})])):r("",!0),s("div",$e,[s("div",Pe,[s("span",Se,f(k(Y)(e.value.spotify.releaseDate)),1),e.value.spotify.explicit?(a(),_("span",Be,"explicit")):r("",!0),s("span",Ie,[Ue,s("span",Me,f(e.value.spotify.popularity),1)])]),y(k(ce),{class:T([{enabled:g.value},"spotify-enable"]),onClick:o[4]||(o[4]=t=>g.value=!g.value)},null,8,["class"]),g.value?(a(),n(ee,{key:0,modelValue:c.value,"onUpdate:modelValue":o[5]||(o[5]=t=>c.value=t),icon:x.value,onClick:F},null,8,["modelValue","icon"])):r("",!0)])],64)):r("",!0)],2)])]),s("div",Te,[s("div",qe,[(a(!0),_($,null,D(S.value,t=>(a(),n(I,{class:"p-2"},{default:P(()=>[t.key==="loudness"?(a(),n(L,{key:0,modelValue:t.value,"onUpdate:modelValue":h=>t.value=h,"display-value":Math.round(-60+t.value)+"dB",class:"circle",max:"60"},null,8,["modelValue","onUpdate:modelValue","display-value"])):(a(),n(L,{key:1,modelValue:t.value,"onUpdate:modelValue":h=>t.value=h,"display-value":Math.round(t.value*100)+"%",class:"circle",max:"1"},null,8,["modelValue","onUpdate:modelValue","display-value"])),s("p",De,[s("span",Ee,f(t.icon),1),q(" "+f(t.key),1)])]),_:2},1024))),256))])]),C.value.length?(a(),n(I,{key:0,class:"p-4 mt-4"},{default:P(()=>[Le,(a(!0),_($,null,D(C.value,(t,h)=>(a(),n(ae,{key:h,index:h,song:t,"can-import":"","cannot-add":"","with-album":"","with-cover":""},null,8,["index","song"]))),128))]),_:1})):r("",!0)])):(a(),n(ne,{key:1}))])],64)}}});const He=M(Ne,[["__scopeId","data-v-ea0397be"]]);export{He as default};