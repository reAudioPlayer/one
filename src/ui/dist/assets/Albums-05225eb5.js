import{F as c}from"./FullShelf-220c9780.js";import{C as i}from"./CollectionHeader-939ae1f5.js";import{C as d}from"./CardWithImageAndText-c397e9a2.js";import{e as _,n as u,D as m,o as a,c as t,g as o,a as p,w as f,F as h,h as v,i as g,L as C,_ as b}from"./index-ca817924.js";const y={key:0,class:"padding-20"},k={class:"albums"},x={key:1,class:"fill-page"},w=_({__name:"Albums",setup(A){const s=u([]);return m(async()=>{const r=await(await fetch("/api/albums")).json();s.value=r.sort((e,l)=>e.name.localeCompare(l.name))}),(n,r)=>s.value.length?(a(),t("div",y,[o(i),p("div",k,[o(c,{heading:"In your library"},{default:f(()=>[(a(!0),t(h,null,v(s.value,e=>(a(),g(d,{title:e.name,description:e.artists.join(", "),cover:e.image,onClick:l=>n.$router.push(e.href),imageType:"album"},null,8,["title","description","cover","onClick"]))),256))]),_:1})])])):(a(),t("div",x,[o(C)]))}});const j=b(w,[["__scopeId","data-v-3ed3d18a"]]);export{j as default};