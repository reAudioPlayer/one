import{e as i,B as n,j as p,D as m,o as c,i as l}from"./index-2d688a36.js";import{T as d}from"./Template-5034e970.js";import"./PlaylistEntry-87c53dc9.js";import"./EditSong.vue_vue_type_script_setup_true_lang-20543fe4.js";import"./playerInPicture-af203fdf.js";import"./vuedraggable.umd-95161848.js";import"./FactCard-b7c97f00.js";import"./gistClient-911eb9cb.js";import"./Markdown.vue_vue_type_style_index_0_lang-a6296692.js";const N=i({__name:"Normal",setup(u){const e=n(),r=p(),t=m(()=>e.params.id),s=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await r.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:s},null,8,["id"]))}});export{N as default};
