import{e as S,A as x,q as I,B as E,j as B,n as _,E as $,W as A,X as U,D as F,Y as R,o as i,c as n,a as l,g as s,I as d,Z as L,t as f,$ as y,F as b,h,w as M,C as N,a0 as O,a1 as T,_ as W}from"./index-c248245e.js";import{_ as j}from"./Playlist.vue_vue_type_script_setup_true_lang-6273848c.js";import"./PlaylistEntry-1c179b4a.js";import"./EditSong.vue_vue_type_script_setup_true_lang-e324b708.js";import"./playerInPicture-af203fdf.js";import"./vuedraggable.umd-bf984027.js";const q={class:"playlist-editor"},X={class:"editor"},Y={class:"sort my-2"},Z={class:"filters"},z={class:"uppercase mt-0"},G={class:"items"},H={class:"item"},J=["onClick"],K={class:"preview"},Q=S({__name:"Editor",setup(ee){const w=x(),V=I(),r=E(()=>w.params.id),c=B(),e=_({name:"",description:"",direction:"asc",sort:"id",filter:{title:[],artist:[],album:[],duration:{}}}),p=_();$([()=>e.value.sort,()=>e.value.filter,()=>e.value.direction],A.debounce(async()=>{p.value=await U(e.value)},3*1e3),{deep:!0});const C=[{value:"title",label:"Title",icon:"title"},{value:"artist",label:"Artist",icon:"person"},{value:"album",label:"Album",icon:"album"},{value:"duration",label:"Duration",icon:"timer"},{value:"id",label:"Added",icon:"date_range"}],m=["title","artist","album"],k={title:"title",artist:"person",album:"album"};F(async()=>{e.value=await R(r.value),e.value.filter||(e.value.filter={});const o=e.value.filter;for(const a of m)o[a]||(o[a]=[]);e.value.filter=o});const g=async()=>{await O(r.value,e.value),c.fetchPlaylists()},D=async()=>{await T(r.value),c.fetchPlaylists(),V.push("/")};return(o,a)=>(i(),n("div",q,[l("div",X,[l("div",Y,[s(d,{label:"Save",icon:"save",type:"success",class:"!mt-0",onClick:g}),s(d,{label:"Delete",icon:"delete",type:"danger",class:"!mt-0",onClick:D}),s(L,{modelValue:e.value.sort,"onUpdate:modelValue":a[0]||(a[0]=t=>e.value.sort=t),options:C,icon:"filter_list"},null,8,["modelValue"]),l("span",{class:"cursor-pointer material-symbols-rounded ms-wght-100 text-5xl",onClick:a[1]||(a[1]=t=>e.value.direction=e.value.direction=="asc"?"desc":"asc")},f(e.value.direction=="asc"?"arrow_drop_up":"arrow_drop_down"),1),s(y,{modelValue:e.value.limit,"onUpdate:modelValue":a[2]||(a[2]=t=>e.value.limit=t),type:"number",placeholder:"Limit...",icon:"123"},null,8,["modelValue"])]),l("div",Z,[(i(),n(b,null,h(m,t=>s(N,{class:"filter"},{default:M(()=>[l("h4",z,f(t),1),l("div",G,[(i(!0),n(b,null,h(e.value.filter[t],(P,u)=>(i(),n("div",H,[s(y,{modelValue:e.value.filter[t][u],"onUpdate:modelValue":v=>e.value.filter[t][u]=v,icon:k[t]},null,8,["modelValue","onUpdate:modelValue","icon"]),l("span",{class:"material-symbols-rounded",onClick:v=>e.value.filter[t].splice(u,1)}," delete ",8,J)]))),256)),s(d,{label:"OR",icon:"add",onClick:P=>e.value.filter[t].push("")},null,8,["onClick"])])]),_:2},1024)),64))])]),l("div",K,[s(j,{playlist:p.value},null,8,["playlist"])])]))}});const ne=W(Q,[["__scopeId","data-v-51eda3dd"]]);export{ne as default};
