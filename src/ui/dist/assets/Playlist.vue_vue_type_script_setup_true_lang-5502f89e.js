import{P as d}from"./PlaylistEntry-2cba4ecd.js";import{e as y,v as c,o as t,c as n,h as p,P as f,F as v,l as g,g as k,d as m}from"./index-48f244c4.js";const C=y({__name:"Playlist",props:{playlist:{type:Object,required:!1},useQueue:{type:Boolean,required:!1,default:!1}},setup(l,{expose:i}){const o=c(null),s=c(-1);return i({scrollToSong:r=>{var e;const a=(e=document.getElementById(`bplayer-entry-${r}`))==null?void 0:e.offsetTop;a>=150&&(o.value.scrollTop=a-150)}}),(r,a)=>l.playlist?(t(),n("div",{key:0,ref_key:"playlistScroll",ref:o,class:"playlist"},[p(f),(t(!0),n(v,null,g(l.useQueue?l.playlist.queue:l.playlist.songs,(e,u)=>(t(),k(d,{id:"bplayer-entry-"+e.id,key:e.source,index:u,selected:s.value==e.id,song:e,"with-cover":"",onClick:B=>s.value==e.id?s.value=-1:s.value=e.id},null,8,["id","index","selected","song","onClick"]))),128))],512)):m("",!0)}});export{C as _};
