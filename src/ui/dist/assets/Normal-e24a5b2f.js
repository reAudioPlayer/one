import{i as n,B as i,k as p,D as m,o as c,f as l}from"./index-effe4d2f.js";import{T as d}from"./Template-e0818326.js";import"./PlaylistEntry-9c8199d3.js";import"./EditSong.vue_vue_type_script_setup_true_lang-a1ca5b19.js";import"./playerInPicture-af203fdf.js";import"./FactCard-e9e3d5c4.js";import"./gistClient-63edeca1.js";import"./Markdown.vue_vue_type_style_index_0_lang-bbb35b77.js";const B=n({__name:"Normal",setup(u){const e=i(),s=p(),t=m(()=>e.params.id),r=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await s.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:r},null,8,["id"]))}});export{B as default};
