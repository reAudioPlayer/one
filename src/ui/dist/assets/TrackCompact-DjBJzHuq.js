import{_ as B,q as D,A as H,n,E as N,D as T,ay as i,f as z,o as r,c as S,i as u,J as E,d as p,az as M,g as l,w as d,a,z as O,u as b,M as C,t as R,C as V,l as q,m as A}from"./index-CHcGmgsV.js";const J=e=>(q("data-v-4c18b720"),e=e(),A(),e),P={class:"home-track-compact-wrapper"},j=["src"],F=J(()=>a("div",{class:"play"},[a("span",{class:"material-symbols-rounded"},"play_arrow")],-1)),G={class:"info"},K={class:"title"},L=["href"],Q={class:"artist"},U={__name:"TrackCompact",props:{title:String,artist:String,cover:String,id:Number,href:String},emits:["play"],setup(e,{emit:w}){const t=e,x=w,I=D(),f=`/track/${H(String(t.id))}`,m=n(null),h=n(null),$=c=>{c.stopPropagation(),x("play")},_=()=>{var c,o;if(!((c=t==null?void 0:t.href)!=null&&c.includes("spotify.com"))){I.push(f);return}if((o=t==null?void 0:t.href)!=null&&o.includes("spotify.com/album/")){h.value.show();return}m.value.show()},s=n(t.cover);N(()=>t.cover,()=>{s.value=t.cover});const v=T(()=>i(s.value));return(c,o)=>{var y,g;const k=z("router-link");return r(),S("div",P,[(y=e.href)!=null&&y.includes("spotify.com/album/")?(r(),u(E,{key:0,ref_key:"addRelease",ref:h,album:{cover:v.value,name:e.title,artist:e.artist,id:e.href.replace("https://open.spotify.com/album/",""),href:e.href,releaseDate:null}},null,8,["album"])):p("",!0),(g=e.href)!=null&&g.includes("spotify.com/track/")?(r(),u(M,{key:1,ref_key:"addSong",ref:m,song:{cover:v.value,title:e.title,artist:e.artist,id:e.href.replace("https://open.spotify.com/track/",""),href:e.href,releaseDate:null}},null,8,["song"])):p("",!0),l(V,{class:"home-track-compact","with-hover":"",onClick:_},{default:d(()=>[a("div",{style:O({backgroundImage:`url(${b(i)(s.value)})`}),class:"cover",onClick:$},[a("img",{src:b(i)(s.value),class:"hidden",onError:o[0]||(o[0]=X=>s.value=null)},null,40,j),F],4),a("div",G,[a("span",K,[e.href?(r(),S("a",{key:1,href:e.href,class:"linkOnHover"},[l(C,{text:e.title},null,8,["text"])],8,L)):(r(),u(k,{key:0,to:f,class:"linkOnHover"},{default:d(()=>[l(C,{text:e.title},null,8,["text"])]),_:1}))]),l(k,{to:`/search/artist:${e.artist}`,class:"linkOnHover"},{default:d(()=>[a("span",Q,R(e.artist),1)]),_:1},8,["to"])])]),_:1})])}}},Z=B(U,[["__scopeId","data-v-4c18b720"]]);export{Z as T};
