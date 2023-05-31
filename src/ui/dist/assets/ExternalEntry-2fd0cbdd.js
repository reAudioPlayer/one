import{n as x,o as r,c as v,a as n,F as A,i as M,t as y,_ as I,j as N,q as m,f as k,w as B,g as f,u as _,bZ as O,bI as P,bM as T,x as j,B as D,A as S,d as w,aA as q,h as F,M as $,aX as V,bU as W,cd as z,bB as H,cg as J}from"./index-e23b36b9.js";import{T as L}from"./Template-59011f9c.js";import{F as U}from"./Form-fb09f2bd.js";const X={class:"padding-20 playlisteditor"},Z=["src"],G={class:"details"},K={class:"detailswrapper"},Q=["onClick"],R=x({__name:"TrackInfo",props:{title:{type:String,required:!0},subtitle:{type:String,required:!0},cover:{type:String,required:!0},icons:{type:Array,required:!0}},setup(e){return(g,t)=>(r(),v("div",X,[n("img",{src:e.cover,class:"cover"},null,8,Z),n("div",G,[n("div",K,[(r(!0),v(A,null,M(e.icons,(l,i)=>(r(),v("span",{key:i,class:"material-icons-round",onClick:l.onClick},y(l.name),9,Q))),128))]),n("h1",null,y(e.title),1),n("h6",null,y(e.subtitle),1)])]))}});const Y=I(R,[["__scopeId","data-v-eab2eaeb"]]),ee=x({__name:"ImportSpotifySong",props:{song:{type:Object,required:!0}},setup(e,{expose:g}){const t=e,l=N(),i=m([{name:"playlist",type:"dropdown",icon:"playlist_add",required:!0,value:null,options:l.playlistsAsDropdown}]),s=m(null),u=m(null),c=m(null),p=async()=>{if(c.value){s.value.show();return}const o=await s.value.fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:t.song.href})});o&&(s.value.load(),c.value=await o.json(),s.value.show())},C=()=>{const o=new CustomEvent("player.play",{detail:{artist:t.song.artist,title:t.song.title,source:t.song.href}});window.dispatchEvent(o)},d=async o=>{if(o==="new"){const a=await j(t.song.title,t.song.artist,t.song.cover);return i.value[0].options=l.playlistsAsDropdown,i.value[0].value=a,a}return Number(o)},h=async(o,a=null)=>{var b;a??(a=u.value.toObject().playlist),a=await d(a),await P(a??u.value.toObject().playlist,c.value),t.song.added=!0,T.addSuccess(c.value.title,`Added to ${(b=l.playlists.find(E=>E.id==a))==null?void 0:b.name}`,3e3)};return g({show:p}),(o,a)=>(r(),k(L,{ref_key:"modal",ref:s,submit:{label:"Add",icon:"add"},name:"Import Song",onClose:a[0]||(a[0]=b=>o.$emit("close")),onSubmit:h},{default:B(()=>[f(Y,{cover:e.song.cover,icons:[{name:"share",onClick:()=>_(O)(e.song.href)},{name:"play_arrow",onClick:C}],title:e.song.title},null,8,["cover","icons","title"]),f(U,{ref_key:"form",ref:u,options:i.value},null,8,["options"])]),_:1},512))}}),te={key:0,class:"cover"},se={class:"artist-title"},ae={class:"title"},ne={class:"artist"},oe={key:1,class:"album"},le=["onClick"],re=x({__name:"ExternalEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:Number,required:!1,default:null},canImport:{type:Boolean,required:!1,default:!1}},emits:["update","add"],setup(e,{emit:g}){const t=e,l=D(),i=S(()=>t.song.id==l.song.id),s=m(!1);S(()=>t.playlistId==null?l.playlist.id:t.playlistId);const u=()=>{J(t.song.title,t.song.artist,t.song.source||t.song.href)},c=m(null),p=()=>{t.canImport?c.value.show():g("add")};return(C,d)=>(r(),v(A,null,[e.canImport?(r(),k(ee,{key:0,ref_key:"updatePopup",ref:c,song:e.song},null,8,["song"])):w("",!0),n("div",{class:q([{playing:_(i),selected:e.selected,hovering:s.value,withCover:e.withCover,withAlbum:e.withAlbum},"playlist-entry"]),onDblclick:u,onMouseenter:d[0]||(d[0]=h=>s.value=!0),onMouseleave:d[1]||(d[1]=h=>s.value=!1)},[n("div",{class:q([{"material-symbols-rounded":s.value},"index text-right"]),onClick:u},y(s.value?"play_arrow":e.index+1),3),e.withCover?(r(),v("div",te,[f(F,{src:e.song.cover,type:"track"},null,8,["src"])])):w("",!0),n("div",se,[n("span",ae,[(r(),k(V(e.song.href.startsWith("http")?"a":"router-link"),{href:e.song.href,to:e.song.href,class:"linkOnHover"},{default:B(()=>[f($,{text:e.song.title},null,8,["text"])]),_:1},8,["href","to"]))]),n("span",ne,[f(W,{artist:e.song.artist,class:"text-muted text-xs"},null,8,["artist"])])]),e.withAlbum&&!_(z)?(r(),v("div",oe,[f($,{text:e.song.album},null,8,["text"])])):w("",!0),n("div",{class:"icon text-left material-symbols-rounded",onClick:H(p,["stop"])},y(e.song.added?"done":"add"),9,le)],34)],64))}});const de=I(re,[["__scopeId","data-v-2482bde4"]]);export{de as E,Y as T,ee as _};
