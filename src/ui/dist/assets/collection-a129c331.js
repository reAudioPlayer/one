import{K as c}from"./index-84a1fb6c.js";const o=1,r=1,i=async e=>{const n={type:"playlist",version:o};if(e.type==="special")return null;if(e.type==="classic"){const t=Object.assign({},e);return delete t.queue,delete t.cursor,{...n,playlist:t}}if(e.type==="smart"){const t=await c(e.id);return{...n,playlist:{name:e.name,description:e.description,cover:e.cover,type:e.type,definition:t,plays:e.plays,id:e.id,href:e.href}}}},s=async e=>({type:"collection",version:r,collection:await Promise.all(e.filter(n=>n.type!="special").map(i))});export{s as a};
