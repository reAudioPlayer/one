import{_ as P,o,c as a,a as i,b as f,t as O,d as _,r as E,e as D,f as T,g as l,w as d,F as h,h as p,i as u,P as x,u as $,p as q,j as F,k as b,l as H,m as N,n as k,q as j,s as M,v as R,I as V,C,x as G,y as L}from"./index-a3df88a3.js";import{P as J}from"./Playlist-2345d255.js";import{T as S}from"./TrackCompact-a0116da7.js";import{P as I}from"./PlaylistEntry-68e2ae82.js";import{s as W}from"./spotify-c0520e78.js";import{P as z}from"./PlaylistItem-f42b8f0b.js";import"./EditSong.vue_vue_type_script_setup_true_lang-500abb96.js";import"./playerInPicture-af203fdf.js";const A={name:"FlexShelf",props:{heading:String,icon:String}},K={class:"shelf"},Q={class:"header"},U={key:0},X={key:0,class:"icon material-symbols-round"},Y={class:"items"};function Z(e,s,r,c,t,n){return o(),a("div",K,[i("div",Q,[r.heading||r.icon?(o(),a("h2",U,[f(O(r.heading),1),r.icon?(o(),a("span",X,O(r.icon),1)):_("",!0)])):_("",!0)]),i("div",Y,[E(e.$slots,"default",{},void 0,!0)])])}const v=P(A,[["render",Z],["__scopeId","data-v-3f16aa97"]]),y=e=>(H("data-v-fe9bf624"),e=e(),N(),e),ee={class:"home"},te={class:"main"},se={key:0,class:"playlists"},oe={key:1,class:"breaking"},ne={key:2,class:"liked"},ie={class:"side"},ae={key:0,class:"releases"},le=y(()=>i("span",{class:"material-symbols-rounded ms-fill"}," radar ",-1)),re=y(()=>i("span",{class:"hover:underline"}," Out now ",-1)),ce={key:1,class:"disovery"},de=y(()=>i("span",{class:"material-symbols-rounded ms-fill"}," explore ",-1)),ue=y(()=>i("span",{class:"hover:underline"}," Discover ",-1)),_e={key:2,class:"recommendations"},he=y(()=>i("h2",{class:"flex items-center gap-2"},[i("span",{class:"material-symbols-rounded ms-fill"}," recommend "),f(" Suggested ")],-1)),pe={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],recommendations:[],data:F()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),this.pick()},computed:{playlists(){return this.data.playlists},liked(){return b("liked").songs.slice(0,3)},breaking(){return b("breaking").songs.slice(0,3)}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const s=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.source||e.url||e.href}});window.dispatchEvent(s)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=this.playlists.map(e=>{var s;return((s=b(e.id))==null?void 0:s.songs)||[]}).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},me=D({...pe,setup(e){return(s,r)=>{const c=T("router-link");return o(),a("div",ee,[i("div",te,[s.playlists.length?(o(),a("div",se,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/playlists"},{default:d(()=>[f("Playlists")]),_:1})]),l(v,null,{default:d(()=>[(o(!0),a(h,null,p(s.playlists,(t,n)=>(o(),u(J,{key:n,cover:t.cover,href:t==null?void 0:t.href,name:t.name,type:t.type,id:t.id},null,8,["cover","href","name","type","id"]))),128))]),_:1})])):_("",!0),s.breaking.length?(o(),a("div",oe,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks/breaking"},{default:d(()=>[f(" Breaking Songs ")]),_:1})]),l(x),(o(!0),a(h,null,p(s.breaking,(t,n)=>(o(),u(I,{key:n,index:n,"playlist-id":"breaking",song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0),s.liked.length?(o(),a("div",ne,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks"},{default:d(()=>[f("Liked Songs")]),_:1})]),l(x),(o(!0),a(h,null,p(s.liked,(t,n)=>(o(),u(I,{key:n,index:n,"playlist-id":"liked",song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0)]),i("div",ie,[s.releases.length?(o(),a("div",ae,[i("h2",null,[l(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/releases"},{default:d(()=>[le,re]),_:1})]),l(v,null,{default:d(()=>[(o(!0),a(h,null,p(s.releases,(t,n)=>(o(),u(S,{key:n,artist:t.artist,cover:t.cover,href:t.url,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.picks.length?(o(),a("div",ce,[i("h2",null,[l(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/discover"},{default:d(()=>[de,ue]),_:1})]),l(v,null,{default:d(()=>[(o(!0),a(h,null,p(s.picks,(t,n)=>(o(),u(S,{id:t.id,key:n,artist:t.artist,cover:$(q)(t.cover),href:t.href,title:t.title,onPlay:()=>s.playDiscover(t)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.recommendations.length?(o(),a("div",_e,[he,l(v,null,{default:d(()=>[(o(!0),a(h,null,p(s.recommendations,(t,n)=>(o(),u(S,{key:n,artist:t.artist,cover:t.cover,href:t.href,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0)])])}}});const fe=P(me,[["__scopeId","data-v-fe9bf624"]]),g=e=>(H("data-v-c0ed4691"),e=e(),N(),e),ye={class:"onboarding p-4"},ve=g(()=>i("h1",null,"So nice to meet you!",-1)),ke=g(()=>i("p",null,"Let's get you set up",-1)),ge={class:"grid grid-cols-2 gap-4 mt-8"},be=g(()=>i("div",{class:"flex flex-row items-center"},[i("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),i("h2",null,"Create your first playlist")],-1)),Se={class:"flex flex-row justify-end w-full"},Pe={class:"flex flex-row items-center"},$e=g(()=>i("h2",null,"Import from Spotify",-1)),we={class:"spotify-playlists"},Oe=D({__name:"Onboarding",setup(e){const s=k([]),r=k(!1),c=k(null);j(),M().then(n=>{r.value=n}),fetch("/api/spotify/playlists").then(n=>n.json()).then(n=>{s.value=n});const t={fields:[{name:"name",label:"Name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",label:"Description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const n=c.value.toObject();await G(n.name,n.description)}}};return(n,w)=>(o(),a("div",ye,[ve,ke,i("div",ge,[l(C,{class:"p-4"},{default:d(()=>[be,l(R,{ref_key:"createForm",ref:c,options:t.fields},null,8,["options"]),i("div",Se,[l(V,{onClick:w[0]||(w[0]=m=>t.submit.action()),icon:"add",label:t.submit.label},null,8,["label"])])]),_:1}),s.value.length?(o(),u(C,{key:0,class:"p-4"},{default:d(()=>[i("div",Pe,[l($(W),{class:"spotify mr-4"}),$e]),i("div",we,[(o(!0),a(h,null,p(s.value,(m,B)=>(o(),u(z,{key:B,cover:m.cover,description:m.description,title:m.name,id:m.id,spotify:!0,href:`https://open.spotify.com/playlist/${m.id}`},null,8,["cover","description","title","id","href"]))),128))])]),_:1})):_("",!0)])]))}});const xe=P(Oe,[["__scopeId","data-v-c0ed4691"]]),Ee={__name:"index",setup(e){const s=F(),r=k(!1),c=j();return L(()=>{document.body.clientWidth<768&&(r.value=!0,c.push("/collection/playlist"))}),(t,n)=>$(s).notEmpty||r.value?(o(),u(fe,{key:0})):(o(),u(xe,{key:1}))}};export{Ee as default};
