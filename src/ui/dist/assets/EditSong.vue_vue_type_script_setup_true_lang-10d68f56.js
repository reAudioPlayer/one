import{e as y,n as u,E as b,o as w,i as _,w as h,g as x,v as S,a9 as k,cT as q,ar as F}from"./index-a96016e0.js";const T=y({__name:"EditSong",props:{song:{type:Object,required:!0}},emits:["close","update"],setup(p,{expose:m,emit:d}){const a=p,v=d,r=async(t,e)=>{const o=new FormData,i="."+e.name.split(".").pop();var n=e.slice(0,e.size,e.type),g=new File([n],a.song.id+i,{type:e.type});return o.append("file",g),await(await fetch(t,{method:"POST",body:o})).text()},s=u([{name:"source",type:"upload",icon:"music_note",accept:"audio/mp3",required:!0,onUpload:t=>{r("/api/config/tracks",t).then(e=>s.value.find(o=>o.name=="source").value=e)},value:a.song.source},{name:"title",type:"text",icon:"title",required:!0,value:a.song.title},{name:"artist",type:"text",icon:"person",required:!0,value:a.song.artist},{name:"album",type:"text",icon:"album",value:a.song.album.name},{name:"cover",type:"upload",icon:"art_track",accept:"image/*",imagePreview:!0,value:a.song.cover,onUpload:t=>{r("/api/config/images",t).then(e=>s.value.find(o=>o.name=="cover").value=e)}}]),f=async()=>{const t=l.value.toObject();await q({...a.song,...t}),v("update"),F.addSuccess(t.title,"Updated",3e3)},c=u(null),l=u(null);return m({show:()=>{c.value.show()}}),b(a,()=>{var t,e,o;for(const i of s.value.map(n=>n.name)){if(i=="album"){s.value.find(n=>n.name==i).value=(e=(t=a.song)==null?void 0:t.album)==null?void 0:e.name;continue}s.value.find(n=>n.name==i).value=(o=a.song)==null?void 0:o[i]}},{deep:!0}),(t,e)=>(w(),_(k,{ref_key:"modal",ref:c,submit:{label:"Save",icon:"save"},name:"Edit Song",onClose:e[0]||(e[0]=o=>t.$emit("close")),onSubmit:f},{default:h(()=>[x(S,{ref_key:"form",ref:l,options:s.value},null,8,["options"])]),_:1},512))}});export{T as _};
