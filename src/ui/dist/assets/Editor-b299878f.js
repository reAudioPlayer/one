import{I as V}from"./IconButton-f37a9ebc.js";import{n as w,E as I,q as C,G as k,H as x,I as E,c as i,a as l,g as s,T as d,J as g,t as p,F as m,i as _,l as S,m as P,o as n,w as U,C as B,_ as $}from"./index-fe2c9584.js";import{_ as A}from"./Playlist.vue_vue_type_script_setup_true_lang-82d587cd.js";import"./PlaylistEntry-a7c7e55a.js";import"./EditSong.vue_vue_type_script_setup_true_lang-ab4bffaa.js";import"./Template-f7fd23e9.js";import"./Form-6220abd3.js";import"./Dropdown-489f43f3.js";import"./playerInPicture-af203fdf.js";import"./PlaylistHeader-1850e9b2.js";const v=a=>(S("data-v-bb487a54"),a=a(),P(),a),D={class:"playlist-editor"},T=v(()=>l("h1",null,"Smart Playlist Editor",-1)),F={class:"editor"},N=v(()=>l("hr",null,null,-1)),O={class:"sort"},q={class:"filters"},G={class:"items"},H={class:"item"},J=["onClick"],L={class:"preview"},R=w({__name:"Editor",setup(a){const t=I({name:"",description:"",direction:"asc",sort:"id",filter:{title:[],artist:[],album:[],duration:{}}}),c=C();k([()=>t.sort,()=>t.filter,()=>t.direction],x.debounce(async()=>{c.value=await E(t)},3*1e3),{deep:!0});const b=[{value:"title",label:"Title",icon:"title"},{value:"artist",label:"Artist",icon:"person"},{value:"album",label:"Album",icon:"album"},{value:"duration",label:"Duration",icon:"timer"},{value:"index",label:"Added",icon:"date_range"}],h=["title","artist","album"],f={title:"title",artist:"person",album:"album"};return(W,o)=>(n(),i("div",D,[T,l("div",F,[l("h2",null,[s(d,{modelValue:t.name,"onUpdate:modelValue":o[0]||(o[0]=e=>t.name=e),placeholder:"Playlist title..."},null,8,["modelValue"])]),l("p",null,[s(d,{modelValue:t.description,"onUpdate:modelValue":o[1]||(o[1]=e=>t.description=e),placeholder:"Playlist description..."},null,8,["modelValue"])]),N,l("div",O,[s(g,{modelValue:t.sort,"onUpdate:modelValue":o[2]||(o[2]=e=>t.sort=e),options:b,icon:"filter_list"},null,8,["modelValue"]),l("span",{class:"cursor-pointer material-symbols-rounded ms-wght-100 text-5xl",onClick:o[3]||(o[3]=e=>t.direction=t.direction=="asc"?"desc":"asc")},p(t.direction=="asc"?"arrow_drop_up":"arrow_drop_down"),1)]),l("div",q,[(n(),i(m,null,_(h,e=>s(B,{class:"filter"},{default:U(()=>[l("h3",null,p(e),1),l("div",G,[(n(!0),i(m,null,_(t.filter[e],(y,r)=>(n(),i("div",H,[s(d,{modelValue:t.filter[e][r],"onUpdate:modelValue":u=>t.filter[e][r]=u,icon:f[e]},null,8,["modelValue","onUpdate:modelValue","icon"]),l("span",{class:"material-symbols-rounded",onClick:u=>t.filter[e].splice(r,1)}," delete ",8,J)]))),256)),s(V,{label:"OR",icon:"add",onClick:y=>t.filter[e].push("")},null,8,["onClick"])])]),_:2},1024)),64))])]),l("div",L,[s(A,{playlist:c.value},null,8,["playlist"])])]))}});const lt=$(R,[["__scopeId","data-v-bb487a54"]]);export{lt as default};
