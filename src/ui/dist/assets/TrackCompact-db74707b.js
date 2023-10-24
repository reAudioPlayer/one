import{_ as I,s as $,z as B,q as n,G as T,B as H,cf as i,e as N,o as r,c as y,f as u,d as g,g as l,w as d,a,y as D,u as p,M as _,t as M,C as O,m as R,n as V}from"./index-bd88f384.js";import{_ as q}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-874a7159.js";import{_ as z}from"./ExternalEntry-b3093208.js";const E=e=>(R("data-v-20c91b79"),e=e(),V(),e),A={class:"home-track-compact-wrapper"},G=["src"],P=E(()=>a("div",{class:"play"},[a("span",{class:"material-symbols-rounded"},"play_arrow")],-1)),j={class:"info"},F={class:"title"},J=["href"],K={class:"artist"},L={__name:"TrackCompact",props:{title:String,artist:String,cover:String,id:Number,href:String},emits:["play"],setup(e,{emit:S}){const t=e,b=S,C=$(),m=`/track/${B(String(t.id))}`,f=n(null),h=n(null),w=c=>{c.stopPropagation(),b("play")},x=()=>{var c,o;if(!((c=t==null?void 0:t.href)!=null&&c.includes("spotify.com"))){C.push(m);return}if((o=t==null?void 0:t.href)!=null&&o.includes("spotify.com/album/")){h.value.show();return}f.value.show()},s=n(t.cover);T(()=>t.cover,()=>{s.value=t.cover});const v=H(()=>i(s.value));return(c,o)=>{const k=N("router-link");return r(),y("div",A,[e.href.includes("spotify.com/album/")?(r(),u(q,{key:0,ref_key:"addRelease",ref:h,album:{cover:v.value,name:e.title,artist:e.artist,id:e.href.replace("https://open.spotify.com/album/",""),href:e.href,releaseDate:null}},null,8,["album"])):g("",!0),e.href.includes("spotify.com/track/")?(r(),u(z,{key:1,ref_key:"addSong",ref:f,song:{cover:v.value,title:e.title,artist:e.artist,id:e.href.replace("https://open.spotify.com/track/",""),href:e.href,releaseDate:null}},null,8,["song"])):g("",!0),l(O,{class:"home-track-compact","with-hover":"",onClick:x},{default:d(()=>[a("div",{style:D({backgroundImage:`url(${p(i)(s.value)})`}),class:"cover",onClick:w},[a("img",{src:p(i)(s.value),class:"hidden",onError:o[0]||(o[0]=U=>s.value=null)},null,40,G),P],4),a("div",j,[a("span",F,[e.href?(r(),y("a",{key:1,href:e.href,class:"linkOnHover"},[l(_,{text:e.title},null,8,["text"])],8,J)):(r(),u(k,{key:0,to:m,class:"linkOnHover"},{default:d(()=>[l(_,{text:e.title},null,8,["text"])]),_:1}))]),l(k,{to:`/search/artist:${e.artist}`,class:"linkOnHover"},{default:d(()=>[a("span",K,M(e.artist),1)]),_:1},8,["to"])])]),_:1})])}}},Z=I(L,[["__scopeId","data-v-20c91b79"]]);export{Z as T};
