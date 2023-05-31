import{T as g}from"./Template-59011f9c.js";import{F as y}from"./Form-fb09f2bd.js";import{n as b,q as s,bs as w,f as _,w as h,cf as x,bM as S,o as k,g as q}from"./index-e23b36b9.js";const j=b({__name:"EditSong",props:{song:{type:Object,required:!0}},emits:["close","update"],setup(c,{expose:l,emit:p}){const a=c,r=async(t,e)=>{const o=new FormData,d="."+e.name.split(".").pop();var v=e.slice(0,e.size,e.type),f=new File([v],a.song.id+d,{type:e.type});return o.append("file",f),await(await fetch(t,{method:"POST",body:o})).text()},n=s([{name:"source",type:"upload",icon:"music_note",accept:"audio/mp3",required:!0,onUpload:t=>{r("/api/config/tracks",t).then(e=>n.value.find(o=>o.name=="source").value=e)},value:a.song.source},{name:"title",type:"text",icon:"title",required:!0,value:a.song.title},{name:"artist",type:"text",icon:"person",required:!0,value:a.song.artist},{name:"album",type:"text",icon:"album",value:a.song.album},{name:"cover",type:"upload",icon:"art_track",accept:"image/*",imagePreview:!0,value:a.song.cover,onUpload:t=>{r("/api/config/images",t).then(e=>n.value.find(o=>o.name=="cover").value=e)}}]),m=async()=>{const t=u.value.toObject();await x({...a.song,...t}),p("update"),S.addSuccess(t.title,"Updated",3e3)},i=s(null),u=s(null);return l({show:()=>{i.value.show()}}),w(a,()=>{var t;for(const e of n.value.map(o=>o.name))n.value.find(o=>o.name==e).value=(t=a.song)==null?void 0:t[e]},{deep:!0}),(t,e)=>(k(),_(g,{ref_key:"modal",ref:i,submit:{label:"Save",icon:"save"},name:"Edit Song",onClose:e[0]||(e[0]=o=>t.$emit("close")),onSubmit:m},{default:h(()=>[q(y,{ref_key:"form",ref:u,options:n.value},null,8,["options"])]),_:1},512))}});export{j as _};
