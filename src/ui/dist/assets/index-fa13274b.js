import{_ as S,o as n,c as o,a as s,b as C,t as P,d as p,r as E,e as I,f as j,g as i,w as d,F as h,h as m,i as _,P as x,u as $,p as R,j as F,N as q,k,l as H,m as N,n as f,q as T,s as M,v as V,I as G,C as O,x as L,y as J}from"./index-b9296d59.js";import{P as B}from"./PlaylistCard-ebd3df2c.js";import{T as b}from"./TrackCompact-5cb8274f.js";import{P as D}from"./PlaylistEntry-6b17bd55.js";import{s as W}from"./spotify-8521fd92.js";import"./playerInPicture-af203fdf.js";import"./EditSong.vue_vue_type_script_setup_true_lang-c48b0b31.js";const z={name:"FlexShelf",props:{heading:String,icon:String}},A={class:"shelf"},K={class:"header"},Q={key:0},U={key:0,class:"icon material-symbols-round"},X={class:"items"};function Y(e,t,r,c,l,a){return n(),o("div",A,[s("div",K,[r.heading||r.icon?(n(),o("h2",Q,[C(P(r.heading),1),r.icon?(n(),o("span",U,P(r.icon),1)):p("",!0)])):p("",!0)]),s("div",X,[E(e.$slots,"default",{},void 0,!0)])])}const y=S(z,[["render",Y],["__scopeId","data-v-3f16aa97"]]),u=e=>(H("data-v-b9b4d097"),e=e(),N(),e),Z={class:"home"},ee={class:"main"},te={key:0,class:"playlists"},se=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," library_music ",-1)),le=u(()=>s("span",{class:"hover:underline"}," Playlists ",-1)),ne={key:1,class:"breaking"},ae=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," trending_up ",-1)),oe=u(()=>s("span",{class:"hover:underline"}," Breaking Songs ",-1)),ie={key:2,class:"liked"},re=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," favorite ",-1)),ce=u(()=>s("span",{class:"hover:underline"}," Liked Songs ",-1)),de={class:"side"},ue={key:0,class:"releases"},_e=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," radar ",-1)),pe=u(()=>s("span",{class:"hover:underline"}," Out now ",-1)),he={key:1,class:"disovery"},me=u(()=>s("span",{class:"material-symbols-rounded ms-fill"}," explore ",-1)),ye=u(()=>s("span",{class:"hover:underline"}," Discover ",-1)),fe={key:2,class:"recommendations"},ve=u(()=>s("h2",{class:"flex items-center gap-2"},[s("span",{class:"material-symbols-rounded ms-fill"}," recommend "),C(" Suggested ")],-1)),ge={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],recommendations:[],data:F()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3);const t=e.filter(r=>new Date(r.releaseDate).toDateString()===new Date().toDateString());t.length&&q.addInfo("New releases",`There are ${t.length} new releases today`,5e3,void 0,"/collection/releases")}),this.pick()},computed:{playlists(){return this.data.playlists},liked(){return k("liked").songs.slice(0,3)},breaking(){return k("breaking").songs.slice(0,3)}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const t=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.source||e.url||e.href}});window.dispatchEvent(t)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=this.playlists.map(e=>{var t;return((t=k(e.id))==null?void 0:t.songs)||[]}).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},ke=I({...ge,setup(e){return(t,r)=>{const c=j("router-link");return n(),o("div",Z,[s("div",ee,[t.playlists.length?(n(),o("div",te,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/playlists"},{default:d(()=>[se,le]),_:1})]),i(y,null,{default:d(()=>[(n(!0),o(h,null,m(t.playlists,l=>(n(),_(B,{playlist:l},null,8,["playlist"]))),256))]),_:1})])):p("",!0),t.breaking.length?(n(),o("div",ne,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/tracks/breaking"},{default:d(()=>[ae,oe]),_:1})]),i(x),(n(!0),o(h,null,m(t.breaking,(l,a)=>(n(),_(D,{key:a,index:a,"playlist-id":"breaking",song:l,"with-cover":""},null,8,["index","song"]))),128))])):p("",!0),t.liked.length?(n(),o("div",ie,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/tracks"},{default:d(()=>[re,ce]),_:1})]),i(x),(n(!0),o(h,null,m(t.liked,(l,a)=>(n(),_(D,{key:a,index:a,"playlist-id":"liked",song:l,"with-cover":""},null,8,["index","song"]))),128))])):p("",!0)]),s("div",de,[t.releases.length?(n(),o("div",ue,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/releases"},{default:d(()=>[_e,pe]),_:1})]),i(y,null,{default:d(()=>[(n(!0),o(h,null,m(t.releases,(l,a)=>(n(),_(b,{key:a,artist:l.artist,cover:l.cover,href:l.url,title:l.title,onPlay:()=>t.playRecommendation(l)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):p("",!0),t.picks.length?(n(),o("div",he,[s("h2",null,[i(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/discover"},{default:d(()=>[me,ye]),_:1})]),i(y,null,{default:d(()=>[(n(!0),o(h,null,m(t.picks,(l,a)=>(n(),_(b,{id:l.id,key:a,artist:l.artist,cover:$(R)(l.cover),href:l.href,title:l.title,onPlay:()=>t.playDiscover(l)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):p("",!0),t.recommendations.length?(n(),o("div",fe,[ve,i(y,null,{default:d(()=>[(n(!0),o(h,null,m(t.recommendations,(l,a)=>(n(),_(b,{key:a,artist:l.artist,cover:l.cover,href:l.href,title:l.title,onPlay:()=>t.playRecommendation(l)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):p("",!0)])])}}});const be=S(ke,[["__scopeId","data-v-b9b4d097"]]),v=e=>(H("data-v-2c465748"),e=e(),N(),e),Se={class:"onboarding p-4"},$e=v(()=>s("h1",null,"So nice to meet you!",-1)),we=v(()=>s("p",null,"Let's get you set up",-1)),Pe={class:"grid grid-cols-2 gap-4 mt-8"},xe=v(()=>s("div",{class:"flex flex-row items-center"},[s("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),s("h2",null,"Create your first playlist")],-1)),Oe={class:"flex flex-row justify-end w-full"},De={class:"flex flex-row items-center"},Ce=v(()=>s("h2",null,"Import from Spotify",-1)),Ie={class:"spotify-playlists"},Fe=I({__name:"Onboarding",setup(e){const t=f([]),r=f(!1),c=f(null);T(),M().then(a=>{r.value=a}),fetch("/api/spotify/playlists").then(a=>a.json()).then(a=>{t.value=a});const l={fields:[{name:"name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const a=c.value.toObject();await L(a.name,a.description)}}};return(a,w)=>(n(),o("div",Se,[$e,we,s("div",Pe,[i(O,{class:"p-4"},{default:d(()=>[xe,i(V,{ref_key:"createForm",ref:c,options:l.fields},null,8,["options"]),s("div",Oe,[i(G,{onClick:w[0]||(w[0]=g=>l.submit.action()),icon:"add",label:l.submit.label},null,8,["label"])])]),_:1}),t.value.length?(n(),_(O,{key:0,class:"p-4"},{default:d(()=>[s("div",De,[i($(W),{class:"spotify mr-4"}),Ce]),s("div",Ie,[(n(!0),o(h,null,m(t.value,g=>(n(),_(B,{playlist:{...g,type:"classic",plays:0,href:`https://open.spotify.com/playlist/${g.id}`},"is-spotify":""},null,8,["playlist"]))),256))])]),_:1})):p("",!0)])]))}});const He=S(Fe,[["__scopeId","data-v-2c465748"]]),Me={__name:"index",setup(e){const t=F(),r=f(!1),c=T();return J(()=>{document.body.clientWidth<768&&(r.value=!0,c.push("/collection/playlist"))}),(l,a)=>$(t).notEmpty||r.value?(n(),_(be,{key:0})):(n(),_(He,{key:1}))}};export{Me as default};
