import{P as i}from"./PlaylistEntry-d67c06f5.js";import{P as o}from"./PlaylistHeader-274e9464.js";import{n as c,q as n,c as t,g as u,F as d,i as y,d as f,o as l,f as p}from"./index-3fbaa329.js";const m={key:0,ref:"playlist-scroll",class:"playlist"},C=c({__name:"Playlist",props:{playlist:{type:Object,required:!1},useQueue:{type:Boolean,required:!1,default:!1}},setup(s){const a=n(-1);return(k,v)=>s.playlist?(l(),t("div",m,[u(o),(l(!0),t(d,null,y(s.useQueue?s.playlist.queue:s.playlist.songs,(e,r)=>(l(),p(i,{id:"bplayer-entry-"+e.id,key:e.source,index:r,selected:a.value==e.id,song:e,"with-cover":"",onClick:g=>a.value==e.id?a.value=-1:a.value=e.id},null,8,["id","index","selected","song","onClick"]))),128))],512)):f("",!0)}});export{C as _};