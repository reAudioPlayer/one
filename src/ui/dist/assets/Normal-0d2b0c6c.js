import{e as n,A as i,j as p,B as m,o as c,i as l}from"./index-fdf9afdc.js";import{T as d}from"./Template-49ab11eb.js";import"./PlaylistEntry-3f47c638.js";import"./EditSong.vue_vue_type_script_setup_true_lang-ad04c38d.js";import"./playerInPicture-af203fdf.js";import"./FactCard-c9fc801e.js";import"./gistClient-322b524d.js";import"./Markdown.vue_vue_type_style_index_0_lang-f9fc4ca7.js";const B=n({__name:"Normal",setup(u){const o=i(),s=p(),t=m(()=>o.params.id),r=async(a,e)=>{await fetch(`/api/playlists/${t.value}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:a,songNewIndex:e})}),await s.fetchPlaylists()};return(a,e)=>(c(),l(d,{id:t.value,onRearrange:r},null,8,["id"]))}});export{B as default};
