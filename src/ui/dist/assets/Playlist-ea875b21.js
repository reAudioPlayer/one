import{P as r}from"./PlaylistHeader-dcd775c6.js";import{E as l}from"./ExternalEntry-74801bac.js";import{l as i,o as s,c as a,g as c,a as n,F as _,h as p,f as u,j as m,k as y,_ as h}from"./index-24e68ff2.js";const v=e=>(m("data-v-43692079"),e=e(),y(),e),f={class:"playlist"},g=v(()=>n("hr",null,null,-1)),P={class:"entries"},B=i({__name:"Playlist",props:{songs:{type:Array,required:!0},noCover:{type:Boolean,default:!1}},setup(e){return(d,w)=>(s(),a("div",f,[c(r,{"without-duration":""}),g,n("div",P,[(s(!0),a(_,null,p(e.songs,(t,o)=>(s(),u(l,{key:t.source,added:t.added,index:o,song:t,title:t.title,"with-cover":!e.noCover,onAdd:x=>d.$emit("add",o)},null,8,["added","index","song","title","with-cover","onAdd"]))),128))])]))}});const C=h(B,[["__scopeId","data-v-43692079"]]);export{C as P};