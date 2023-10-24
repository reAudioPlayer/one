import{T as y}from"./Template-8dc9bafa.js";import{F as w}from"./Form-f3c0a1cb.js";import{i as b,q as s,G as _,o as h,f as x,w as S,g as k,cq as q,cg as F}from"./index-bd88f384.js";const B=b({__name:"EditSong",props:{song:{type:Object,required:!0}},emits:["close","update"],setup(u,{expose:p,emit:l}){const a=u,m=l,r=async(t,e)=>{const o=new FormData,v="."+e.name.split(".").pop();var f=e.slice(0,e.size,e.type),g=new File([f],a.song.id+v,{type:e.type});return o.append("file",g),await(await fetch(t,{method:"POST",body:o})).text()},n=s([{name:"source",type:"upload",icon:"music_note",accept:"audio/mp3",required:!0,onUpload:t=>{r("/api/config/tracks",t).then(e=>n.value.find(o=>o.name=="source").value=e)},value:a.song.source},{name:"title",type:"text",icon:"title",required:!0,value:a.song.title},{name:"artist",type:"text",icon:"person",required:!0,value:a.song.artist},{name:"album",type:"text",icon:"album",value:a.song.album},{name:"cover",type:"upload",icon:"art_track",accept:"image/*",imagePreview:!0,value:a.song.cover,onUpload:t=>{r("/api/config/images",t).then(e=>n.value.find(o=>o.name=="cover").value=e)}}]),d=async()=>{const t=c.value.toObject();await q({...a.song,...t}),m("update"),F.addSuccess(t.title,"Updated",3e3)},i=s(null),c=s(null);return p({show:()=>{i.value.show()}}),_(a,()=>{var t;for(const e of n.value.map(o=>o.name))n.value.find(o=>o.name==e).value=(t=a.song)==null?void 0:t[e]},{deep:!0}),(t,e)=>(h(),x(y,{ref_key:"modal",ref:i,submit:{label:"Save",icon:"save"},name:"Edit Song",onClose:e[0]||(e[0]=o=>t.$emit("close")),onSubmit:d},{default:S(()=>[k(w,{ref_key:"form",ref:c,options:n.value},null,8,["options"])]),_:1},512))}});export{B as _};
