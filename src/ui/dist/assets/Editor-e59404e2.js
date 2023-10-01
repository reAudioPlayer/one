import{I as p}from"./IconButton-3d9d72f9.js";import{n as g,B as x,j as I,q as v,E as D,Q as E,R as P,S as B,U,c as i,a as l,g as s,N as $,t as _,T as f,F as y,i as b,V as A,o as n,w as F,C as N,W as R,_ as T}from"./index-5c7f0e31.js";import{_ as L}from"./Playlist.vue_vue_type_script_setup_true_lang-7fadae52.js";import"./PlaylistEntry-76a6d52d.js";import"./EditSong.vue_vue_type_script_setup_true_lang-11cb549e.js";import"./Template-de6f577d.js";import"./Form-0c0eece5.js";import"./Dropdown-f42ab8bd.js";import"./playerInPicture-af203fdf.js";import"./PlaylistHeader-c2199670.js";const O={class:"playlist-editor"},W={class:"editor"},j={class:"sort my-2"},q={class:"filters"},M={class:"uppercase mt-0"},Q={class:"items"},z={class:"item"},G=["onClick"],H={class:"preview"},J=g({__name:"Editor",setup(K){const h=A(),u=x(()=>h.params.id),V=I(),t=v({name:"",description:"",direction:"asc",sort:"id",filter:{title:[],artist:[],album:[],duration:{}}}),d=v();D([()=>t.value.sort,()=>t.value.filter,()=>t.value.direction],E.debounce(async()=>{d.value=await P(t.value)},3*1e3),{deep:!0});const w=[{value:"title",label:"Title",icon:"title"},{value:"artist",label:"Artist",icon:"person"},{value:"album",label:"Album",icon:"album"},{value:"duration",label:"Duration",icon:"timer"},{value:"id",label:"Added",icon:"date_range"}],c=["title","artist","album"],C={title:"title",artist:"person",album:"album"};B(async()=>{t.value=await U(u.value),t.value.filter||(t.value.filter={});const o=t.value.filter;for(const a of c)o[a]||(o[a]=[]);t.value.filter=o});const k=async()=>{await R(u.value,t.value),V.fetchPlaylists()};return(o,a)=>(n(),i("div",O,[l("div",W,[l("div",j,[s(p,{label:"Save",icon:"save",type:"success",class:"!mt-0",onClick:k}),s($,{modelValue:t.value.sort,"onUpdate:modelValue":a[0]||(a[0]=e=>t.value.sort=e),options:w,icon:"filter_list"},null,8,["modelValue"]),l("span",{class:"cursor-pointer material-symbols-rounded ms-wght-100 text-5xl",onClick:a[1]||(a[1]=e=>t.value.direction=t.value.direction=="asc"?"desc":"asc")},_(t.value.direction=="asc"?"arrow_drop_up":"arrow_drop_down"),1),s(f,{modelValue:t.value.limit,"onUpdate:modelValue":a[2]||(a[2]=e=>t.value.limit=e),type:"number",placeholder:"Limit...",icon:"123"},null,8,["modelValue"])]),l("div",q,[(n(),i(y,null,b(c,e=>s(N,{class:"filter"},{default:F(()=>[l("h4",M,_(e),1),l("div",Q,[(n(!0),i(y,null,b(t.value.filter[e],(S,r)=>(n(),i("div",z,[s(f,{modelValue:t.value.filter[e][r],"onUpdate:modelValue":m=>t.value.filter[e][r]=m,icon:C[e]},null,8,["modelValue","onUpdate:modelValue","icon"]),l("span",{class:"material-symbols-rounded",onClick:m=>t.value.filter[e].splice(r,1)}," delete ",8,G)]))),256)),s(p,{label:"OR",icon:"add",onClick:S=>t.value.filter[e].push("")},null,8,["onClick"])])]),_:2},1024)),64))])]),l("div",H,[s(L,{playlist:d.value},null,8,["playlist"])])]))}});const nt=T(J,[["__scopeId","data-v-dac9f8de"]]);export{nt as default};
