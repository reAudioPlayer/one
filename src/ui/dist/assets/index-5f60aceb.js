import{i as E,B as N,q as y,D as o,S as P,T as R,E as T,G as j,o as s,c as a,g as b,L as C,a as n,t as L,F as i,H as c,j as p,f as v,d as h,m as O,n as V,_ as A}from"./index-d16bcb03.js";const r=_=>(O("data-v-99a1f210"),_=_(),V(),_),D={class:"search"},F={key:0,class:"fill-page"},G={key:1,class:"fill-page"},H=r(()=>n("h1",null,"Something went wrong",-1)),J={class:"top flex gap-8"},M={class:"top min-w-max"},Y=r(()=>n("h2",null,"Top Result",-1)),z={key:0,class:"list songs flex-1"},K=r(()=>n("h2",null,"Songs",-1)),Q={key:0,class:"list artists"},U=r(()=>n("h2",null,"Artists",-1)),W={key:1,class:"list playlists"},X=r(()=>n("h2",null,"Playlists",-1)),Z={key:2,class:"list albums"},$=r(()=>n("h2",null,"Albums",-1)),ee=E({__name:"index",setup(_){const B=N(),m=y(!0),d=y(null),u=y(null),I=o(()=>{var e,t;return(t=(e=u.value)==null?void 0:e.items)==null?void 0:t[0]}),f=o(()=>{var e,t;return(t=(e=u.value)==null?void 0:e.items)==null?void 0:t.filter(l=>l.type==="song")}),g=o(()=>{var e,t;return(t=(e=u.value)==null?void 0:e.items)==null?void 0:t.filter(l=>l.type==="artist")}),S=o(()=>{var e,t;return(t=(e=u.value)==null?void 0:e.items)==null?void 0:t.filter(l=>l.type==="playlist")}),k=o(()=>{var e,t;return(t=(e=u.value)==null?void 0:e.items)==null?void 0:t.filter(l=>l.type==="album")}),x=o(()=>B.params.query),q=o(()=>[...P,...R]),w=async()=>{m.value=!0,d.value=null;const e=await fetch("/api/search",{method:"POST",body:JSON.stringify({query:x.value,scope:q.value})});if(m.value=!1,!e.ok){d.value=await e.text();return}const t=await e.json();u.value=t};return T(w),j(x,w),(e,t)=>(s(),a("div",D,[m.value?(s(),a("div",F,[b(C)])):d.value?(s(),a("div",G,[H,n("p",null,L(d.value),1)])):(s(),a(i,{key:2},[n("div",J,[n("div",M,[Y,b(c,{item:I.value,large:""},null,8,["item"])]),f.value.length?(s(),a("div",z,[K,(s(!0),a(i,null,p(f.value,l=>(s(),v(c,{item:l},null,8,["item"]))),256))])):h("",!0)]),g.value.length?(s(),a("div",Q,[U,(s(!0),a(i,null,p(g.value,l=>(s(),v(c,{item:l},null,8,["item"]))),256))])):h("",!0),S.value.length?(s(),a("div",W,[X,(s(!0),a(i,null,p(S.value,l=>(s(),v(c,{item:l},null,8,["item"]))),256))])):h("",!0),k.value.length?(s(),a("div",Z,[$,(s(!0),a(i,null,p(k.value,l=>(s(),v(c,{item:l},null,8,["item"]))),256))])):h("",!0)],64))]))}});const se=A(ee,[["__scopeId","data-v-99a1f210"]]);export{se as default};
