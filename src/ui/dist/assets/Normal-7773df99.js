import{i as n,B as i,k as p,D as m,o as c,f as l}from"./index-92721eeb.js";import{T as d}from"./Template-9be1aa38.js";import"./PlaylistEntry-e8974bf7.js";import"./EditSong.vue_vue_type_script_setup_true_lang-9a07a160.js";import"./playerInPicture-af203fdf.js";import"./FactCard-0c1c6b41.js";import"./gistClient-390b56cd.js";import"./Markdown.vue_vue_type_style_index_0_lang-9f46689a.js";const B=n({__name:"Normal",setup(u){const e=i(),s=p(),t=m(()=>e.params.id),r=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await s.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:r},null,8,["id"]))}});export{B as default};
