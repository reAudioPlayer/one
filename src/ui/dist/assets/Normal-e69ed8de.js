import{i as n,B as i,k as p,D as m,o as c,f as l}from"./index-5643e77f.js";import{T as d}from"./Template-d4bd01d0.js";import"./PlaylistEntry-8857a937.js";import"./EditSong.vue_vue_type_script_setup_true_lang-9a25cc67.js";import"./playerInPicture-af203fdf.js";import"./FactCard-e307b3b6.js";import"./gistClient-d894ef53.js";import"./Markdown.vue_vue_type_style_index_0_lang-d2e23db9.js";const B=n({__name:"Normal",setup(u){const e=i(),s=p(),t=m(()=>e.params.id),r=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await s.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:r},null,8,["id"]))}});export{B as default};
