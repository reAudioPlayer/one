import{cd as g,ci as d}from"./index-103cc068.js";const r=async(t=null)=>{const a=await g(),n=t??a.github.githubPat;if(!n)throw new Error("No GitHub PAT found");return{Authorization:"Bearer "+n}},w=(t,a="reAudioPlayer One",n="Fully managed with reAudioPlayer One",e=!1)=>{const s={public:e,description:n,files:{[`_${a}.md`]:{content:`# reAudioPlayer One

This gist was created with reAudioPlayer One

https://reaudioplayer.github.io/one/`}}};for(const[i,o]of Object.entries(t))s.files[i]={content:JSON.stringify(o,null,4)};return JSON.stringify(s)},u=async()=>(await g()).github.gistId,c=async()=>{const t=await r(),a=await fetch(`https://api.github.com/gists/${await u()}`,{headers:t});try{return await a.json()}catch{return null}},l=async(t,a="one.lib.json")=>{const n=await r(),e=await fetch(`https://api.github.com/gists/${await u()}`,{method:"PATCH",headers:n,body:w(t,a)});if(!e.ok)return d.addError("Failed to update gist","",3e3),null;const s=await e.json();return d.addSuccess("Gist updated","",3e3),s},h=async(t,a="reAudioPlayer One",n=!1,e="Fully managed with reAudioPlayer One")=>{const s=await r(),i=await fetch("https://api.github.com/gists",{method:"POST",headers:s,body:w(t,a,e,n)});if(console.log(i),!i.ok)return d.addError("Failed to create gist","",3e3),null;const o=await i.json();return!n&&o.id&&await fetch("/api/config",{method:"PUT",body:JSON.stringify({github:{gistId:o.id}})}),d.addSuccess("Gist created","",3e3),o},f={connected:async()=>!!await u(),get:c,getContent:async(t="my.one.collection")=>{var e,s;const n=(s=(e=(await c()).files)==null?void 0:e[t])==null?void 0:s.content;return n?JSON.parse(n):[]},saveOrUpdate:async(t,a="reAudioPlayer One",n=!1)=>{const e=await c();return e!=null&&e.files?await l(t,a):await h(t,a,n)},save:h,update:l,delete:async()=>{const t=await r();return await(await fetch(`https://api.github.com/gists/${await u()}`,{method:"DELETE",headers:t})).json()},search:async(t=null)=>{var s;const a=await r(t),e=await(await fetch("https://api.github.com/gists?filename=one.lib.json",{headers:a})).json();return(s=e==null?void 0:e[0])==null?void 0:s.id},gistUrl:async()=>{const t=await c();return t==null?void 0:t.html_url}};export{f as G};
