import{i as n,B as i,k as p,D as m,o as c,f as l}from"./index-7c35142e.js";import{T as d}from"./Template-e359b61f.js";import"./PlaylistEntry-476b0617.js";import"./EditSong.vue_vue_type_script_setup_true_lang-d93a5faf.js";import"./playerInPicture-af203fdf.js";import"./FactCard-4a186d12.js";import"./gistClient-5239f7f2.js";import"./Markdown.vue_vue_type_style_index_0_lang-3b2cecd6.js";const B=n({__name:"Normal",setup(u){const e=i(),s=p(),t=m(()=>e.params.id),r=async(a,o)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:o})}),await s.fetchPlaylists()};return(a,o)=>(c(),l(d,{id:t.value,onRearrange:r},null,8,["id"]))}});export{B as default};
