import{e as i,B as n,j as p,D as m,o as c,i as l}from"./index-67bdff34.js";import{T as d}from"./Template-662e0f10.js";import"./PlaylistEntry-d68ace7e.js";import"./EditSong.vue_vue_type_script_setup_true_lang-536d357b.js";import"./playerInPicture-af203fdf.js";import"./vuedraggable.umd-f076cb1f.js";import"./FactCard-d16e54f5.js";import"./gistClient-1d9abc5c.js";import"./Markdown.vue_vue_type_style_index_0_lang-4f5ea139.js";const N=i({__name:"Normal",setup(u){const e=n(),r=p(),t=m(()=>e.params.id),s=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await r.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:s},null,8,["id"]))}});export{N as default};
