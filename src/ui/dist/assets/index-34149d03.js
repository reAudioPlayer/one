import{i as q,cz as N,q as x,c3 as S,o as s,c as n,a as o,F as r,j as B,f as C,w as y,b as t,t as a,C as h,g as p,h as z,d,u as f,cA as D,z as F,L as O,O as T,x as V,I as $,cr as j,m as L,n as A,_ as E}from"./index-d16bcb03.js";const i=v=>(L("data-v-cad4addf"),v=v(),A(),v),M={class:"downloader py-2 pr-2 grid gap-4 grid-cols-2 items-start"},P={class:"downloads"},Y={class:"main"},G={class:"m-0 mb-4"},H={class:"status"},J={class:"flex flex-col"},K={key:0,class:"info"},Q=i(()=>o("span",{class:"material-symbols-rounded"},"cloud",-1)),R={key:1,class:"info"},U=i(()=>o("span",{class:"material-symbols-rounded"},"file_download",-1)),W={class:"info"},X=i(()=>o("span",{class:"material-symbols-rounded"},"percent",-1)),Z={key:2,class:"info"},ee=i(()=>o("span",{class:"material-symbols-rounded"},"speed",-1)),oe={key:3,class:"info"},se=i(()=>o("span",{class:"material-symbols-rounded"},"timer",-1)),ne=i(()=>o("div",{class:"error"},[o("span",null,"This song could not be downloaded:"),o("ul",{class:"block list-disc ml-8"},[o("li",null," verify that the source link is working "),o("li",null,"try again later")])],-1)),ae={key:0,class:"info"},le=i(()=>o("span",{class:"material-symbols-rounded"},"link",-1)),de=["href"],re={class:"wrap-progress"},te=["aria-valuenow"],ie={key:1,class:"material-symbols-rounded downloading"},ce=["onClick"],ue=["onClick"],_e=["onClick"],me={key:1,class:"col-span-2 flex flex-row justify-center items-center"},pe={class:"new-download"},fe=q({__name:"index",setup(v){const _=N(),g=l=>{j.addYesNo("Are you sure you want to redownload this song?",null,null,()=>{console.log("[downloader] reDownload",l),_.downloadFromDb(l)})},m={title:"",artist:"",album:"",cover:"",source:"",href:""},w=x(null),c=x([{name:"source",type:"text",accept:"audio/mp3",required:!0,onChange:async l=>{const u=await S(l);c.value.find(e=>e.name==="title").value=u.title,c.value.find(e=>e.name==="artist").value=u.artist,c.value.find(e=>e.name==="album").value=u.album,c.value.find(e=>e.name==="cover").value=u.cover,c.value.find(e=>e.name==="source").value=u.source},value:m.source},{name:"title",type:"text",icon:"title",required:!0,value:m.title},{name:"artist",type:"text",icon:"person",required:!0,value:m.artist},{name:"album",type:"text",icon:"album",value:m.album},{name:"cover",type:"upload",accept:"image/*",imagePreview:!0,value:m.cover}]),I=async()=>{const l=w.value.toObject();l.id=new Date().getTime(),console.log("[downloader] requestDownload",l),_.downloadOther(l)};return(l,u)=>(s(),n("div",M,[o("div",P,[(s(!0),n(r,null,B(f(_).states,e=>{var k;return s(),n(r,{key:e.songId},[e.internal?d("",!0):(s(),C(h,{key:0,class:T([["song",{downloading:((k=f(_).states[e.songId])==null?void 0:k.status)=="downloading"}],"p-4 card items-center"])},{default:y(()=>[e.status!=="pending"?(s(),n(r,{key:0},[o("main",Y,[o("h2",G,[e.song?(s(),n(r,{key:0},[t(a(e.song.title),1)],64)):(s(),n(r,{key:1},[t(a(e.filename),1)],64))]),o("div",H,[e.song?(s(),C(h,{key:0,class:"info p-4"},{default:y(()=>[p(z,{src:e.song.cover,class:"cover"},null,8,["src"]),o("div",J,[o("span",null,a(e.song.album),1),o("span",null,a(e.song.artist),1)])]),_:2},1024)):d("",!0),e.status!=="error"?(s(),n(r,{key:1},[e.downloaded||e.total?(s(),n("div",K,[Q,t(" "+a(f(D)(e.downloaded))+" / "+a(f(D)(e.total)),1)])):d("",!0),e.chunk?(s(),n("div",R,[U,t(" "+a(e.chunk),1)])):d("",!0),o("div",W,[X,t(" "+a(e.status==="downloading"?e.percent:100)+"% ",1)]),e.speed!=="0"?(s(),n("div",Z,[ee,t(" "+a(e.speed),1)])):d("",!0),e.elapsed!=="0"||e.eta!==0?(s(),n("div",oe,[se,t(" "+a(e.elapsed)+" / "+a(e.eta)+"s ",1)])):d("",!0)],64)):(s(),n(r,{key:2},[ne,e.song?(s(),n("div",ae,[le,o("a",{href:e.song.source,target:"_blank",rel:"noopener noreferrer"},a(e.song.source),9,de)])):d("",!0)],64))])]),o("aside",null,[o("div",re,[e.status=="downloading"?(s(),n("div",{key:0,class:"progress-bar",role:"progressbar","aria-valuenow":e.percent,"aria-valuemin":"0","aria-valuemax":"100",style:F({"--progress":e.percent+"%"})},null,12,te)):d("",!0),e.status=="downloading"?(s(),n("span",ie," south ")):e.status=="finished"?(s(),n("span",{key:2,class:"material-symbols-rounded cursor-pointer finished",onClick:b=>f(_).download(e.songId)}," download_for_offline ",8,ce)):e.status=="downloaded"?(s(),n("span",{key:3,class:"material-symbols-rounded cursor-pointer downloaded",onClick:b=>g(e.songId)}," download_done ",8,ue)):e.status=="error"?(s(),n("span",{key:4,class:"material-symbols-rounded cursor-pointer error",onClick:b=>g(e.songId)}," error ",8,_e)):d("",!0)])])],64)):(s(),n("div",me,[p(O)]))]),_:2},1032,["class"]))],64)}),128))]),o("div",pe,[p(h,{class:"custom p-4 flex flex-col"},{default:y(()=>[p(V,{ref_key:"form",ref:w,options:c.value},null,8,["options"]),p($,{icon:"download_for_offline",label:"Download",class:"w-full mt-8",onClick:I})]),_:1})])]))}});const ye=E(fe,[["__scopeId","data-v-cad4addf"]]);export{ye as default};
