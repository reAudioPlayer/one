import{_ as S,o as a,c as o,a as s,b as D,t as P,d as h,r as E,e as I,f as j,g as i,w as d,F as m,h as _,i as p,P as O,u as $,p as R,j as H,N as q,k as g,l as N,m as F,n as y,q as T,s as M,v as V,I as G,C as x,x as L,y as J}from"./index-DnhwPdfm.js";import{P as B}from"./PlaylistCard-CMjdNIlB.js";import{T as b}from"./TrackCompact-sXOejxe1.js";import{P as C}from"./PlaylistEntry-B2l8v20L.js";import{s as W}from"./spotify-BVNWZn3O.js";import"./playerInPicture-Dfp9IAsf.js";import"./EditSong.vue_vue_type_script_setup_true_lang-C5fIPhus.js";const z={name:"FlexShelf",props:{heading:String,icon:String}},A={class:"shelf"},K={class:"header"},Q={key:0},U={key:0,class:"icon material-symbols-round"},X={class:"items"};function Y(e,t,r,c,l,n){return a(),o("div",A,[s("div",K,[r.heading||r.icon?(a(),o("h2",Q,[D(P(r.heading),1),r.icon?(a(),o("span",U,P(r.icon),1)):h("",!0)])):h("",!0)]),s("div",X,[E(e.$slots,"default",{},void 0,!0)])])}const f=S(z,[["render",Y],["__scopeId","data-v-27a92662"]]),u=e=>(N("data-v-b9b4d097"),e=e(),F(),e),Z={class:"home"},ee={class:"main"},te={key:0,class:"playlists"},se=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," library_music ",-1)),le=u(()=>s("span",{class:"hover:underline"}," Playlists ",-1)),ae={key:1,class:"breaking"},ne=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," trending_up ",-1)),oe=u(()=>s("span",{class:"hover:underline"}," Breaking Songs ",-1)),ie={key:2,class:"liked"},re=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," favorite ",-1)),ce=u(()=>s("span",{class:"hover:underline"}," Liked Songs ",-1)),de={class:"side"},ue={key:0,class:"releases"},pe=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," radar ",-1)),he=u(()=>s("span",{class:"hover:underline"}," Out now ",-1)),me={key:1,class:"disovery"},_e=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," explore ",-1)),fe=u(()=>s("span",{class:"hover:underline"}," Discover ",-1)),ye={key:2,class:"recommendations"},ve=u(()=>s("h2",{class:"flex items-center gap-2"},[s("span",{class:"material-symbols-rounded ms-fill"}," recommend "),D(" Suggested ")],-1)),ke={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],recommendations:[],data:H()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3);const t=e.filter(r=>new Date(r.releaseDate).toDateString()===new Date().toDateString());t.length&&q.addInfo("New releases",`There are ${t.length} new releases today`,5e3,void 0,"/collection/releases")}),this.pick()},computed:{playlists(){return this.data.playlists},liked(){return g("liked").songs.slice(0,3)},breaking(){return g("breaking").songs.slice(0,3)}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const t=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.source||e.url||e.href}});window.dispatchEvent(t)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=this.playlists.map(e=>{var t;return((t=g(e.id))==null?void 0:t.songs)||[]}).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},ge=I({...ke,setup(e){return(t,r)=>{const c=j("router-link");return a(),o("div",Z,[s("div",ee,[t.playlists.length?(a(),o("div",te,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/playlists"},{default:d(()=>[se,le]),_:1})]),i(f,null,{default:d(()=>[(a(!0),o(m,null,_(t.playlists,l=>(a(),p(B,{playlist:l},null,8,["playlist"]))),256))]),_:1})])):h("",!0),t.breaking.length?(a(),o("div",ae,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/tracks/breaking"},{default:d(()=>[ne,oe]),_:1})]),i(O),(a(!0),o(m,null,_(t.breaking,(l,n)=>(a(),p(C,{key:n,index:n,"playlist-id":"breaking",song:l,"with-cover":""},null,8,["index","song"]))),128))])):h("",!0),t.liked.length?(a(),o("div",ie,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/tracks"},{default:d(()=>[re,ce]),_:1})]),i(O),(a(!0),o(m,null,_(t.liked,(l,n)=>(a(),p(C,{key:n,index:n,"playlist-id":"liked",song:l,"with-cover":""},null,8,["index","song"]))),128))])):h("",!0)]),s("div",de,[t.releases.length?(a(),o("div",ue,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/releases"},{default:d(()=>[pe,he]),_:1})]),i(f,null,{default:d(()=>[(a(!0),o(m,null,_(t.releases,(l,n)=>(a(),p(b,{key:n,artist:l.artist,cover:l.cover,href:l.url,title:l.title,onPlay:()=>t.playRecommendation(l)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):h("",!0),t.picks.length?(a(),o("div",me,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/discover"},{default:d(()=>[_e,fe]),_:1})]),i(f,null,{default:d(()=>[(a(!0),o(m,null,_(t.picks,(l,n)=>(a(),p(b,{id:l.id,key:n,artist:l.artist,cover:$(R)(l.cover),href:l.href,title:l.title,onPlay:()=>t.playDiscover(l)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):h("",!0),t.recommendations.length?(a(),o("div",ye,[ve,i(f,null,{default:d(()=>[(a(!0),o(m,null,_(t.recommendations,(l,n)=>(a(),p(b,{key:n,artist:l.artist,cover:l.cover,href:l.href,title:l.title,onPlay:()=>t.playRecommendation(l)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):h("",!0)])])}}}),be=S(ge,[["__scopeId","data-v-b9b4d097"]]),v=e=>(N("data-v-2c465748"),e=e(),F(),e),Se={class:"onboarding p-4"},$e=v(()=>s("h1",null,"So nice to meet you!",-1)),we=v(()=>s("p",null,"Let's get you set up",-1)),Pe={class:"grid grid-cols-2 gap-4 mt-8"},Oe=v(()=>s("div",{class:"flex flex-row items-center"},[s("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),s("h2",null,"Create your first playlist")],-1)),xe={class:"flex flex-row justify-end w-full"},Ce={class:"flex flex-row items-center"},De=v(()=>s("h2",null,"Import from Spotify",-1)),Ie={class:"spotify-playlists"},He=I({__name:"Onboarding",setup(e){const t=y([]),r=y(!1),c=y(null);T(),M().then(n=>{r.value=n}),fetch("/api/spotify/playlists").then(n=>n.json()).then(n=>{t.value=n});const l={fields:[{name:"name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const n=c.value.toObject();await L(n.name,n.description)}}};return(n,w)=>(a(),o("div",Se,[$e,we,s("div",Pe,[i(x,{class:"p-4"},{default:d(()=>[Oe,i(V,{ref_key:"createForm",ref:c,options:l.fields},null,8,["options"]),s("div",xe,[i(G,{onClick:w[0]||(w[0]=k=>l.submit.action()),icon:"add",label:l.submit.label},null,8,["label"])])]),_:1}),t.value.length?(a(),p(x,{key:0,class:"p-4"},{default:d(()=>[s("div",Ce,[i($(W),{class:"spotify mr-4"}),De]),s("div",Ie,[(a(!0),o(m,null,_(t.value,k=>(a(),p(B,{playlist:{...k,type:"classic",plays:0,href:`https://open.spotify.com/playlist/${k.id}`},"is-spotify":""},null,8,["playlist"]))),256))])]),_:1})):h("",!0)])]))}}),Ne=S(He,[["__scopeId","data-v-2c465748"]]),Me={__name:"index",setup(e){const t=H(),r=y(!1),c=T();return J(()=>{document.body.clientWidth<768&&(r.value=!0,c.push("/collection/playlist"))}),(l,n)=>$(t).notEmpty||r.value?(a(),p(be,{key:0})):(a(),p(Ne,{key:1}))}};export{Me as default};