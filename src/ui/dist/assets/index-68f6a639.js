import{_ as P,o,c as n,a,b as f,t as O,d as _,r as B,e as D,f as E,g as l,w as r,F as h,h as p,i as d,P as x,u as $,p as T,j as F,k as g,l as H,m as N,n as b,q,s as R,v as V,I as G,C,x as L}from"./index-ca817924.js";import{P as M}from"./Playlist-1290b31f.js";import{T as S}from"./TrackCompact-fd8b79fb.js";import{P as I}from"./PlaylistEntry-4e3879da.js";import{s as J}from"./spotify-43f8bee5.js";import{P as W}from"./PlaylistItem-e4b582db.js";import"./EditSong.vue_vue_type_script_setup_true_lang-ec9862b2.js";import"./playerInPicture-af203fdf.js";const z={name:"FlexShelf",props:{heading:String,icon:String}},A={class:"shelf"},K={class:"header"},Q={key:0},U={key:0,class:"icon material-symbols-round"},X={class:"items"};function Y(e,s,u,c,t,i){return o(),n("div",A,[a("div",K,[u.heading||u.icon?(o(),n("h2",Q,[f(O(u.heading),1),u.icon?(o(),n("span",U,O(u.icon),1)):_("",!0)])):_("",!0)]),a("div",X,[B(e.$slots,"default",{},void 0,!0)])])}const v=P(z,[["render",Y],["__scopeId","data-v-3f16aa97"]]),y=e=>(H("data-v-e67f7cde"),e=e(),N(),e),Z={class:"home"},ee={class:"main"},te={key:0,class:"playlists"},se={key:1,class:"liked"},oe={key:2,class:"breaking"},ae={class:"side"},ie={key:0,class:"releases"},ne=y(()=>a("span",{class:"material-symbols-rounded ms-fill"}," radar ",-1)),le=y(()=>a("span",{class:"hover:underline"}," Out now ",-1)),re={key:1,class:"disovery"},ce=y(()=>a("span",{class:"material-symbols-rounded ms-fill"}," explore ",-1)),de=y(()=>a("span",{class:"hover:underline"}," Discover ",-1)),ue={key:2,class:"recommendations"},_e=y(()=>a("h2",{class:"flex items-center gap-2"},[a("span",{class:"material-symbols-rounded ms-fill"}," recommend "),f(" Suggested ")],-1)),he={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],recommendations:[],data:F()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),this.pick()},computed:{playlists(){return this.data.playlists},liked(){return g("liked").songs.slice(0,3)},breaking(){return g("breaking").songs.slice(0,3)}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const s=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.source||e.url||e.href}});window.dispatchEvent(s)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=this.playlists.map(e=>{var s;return((s=g(e.id))==null?void 0:s.songs)||[]}).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},pe=D({...he,setup(e){return(s,u)=>{const c=E("router-link");return o(),n("div",Z,[a("div",ee,[s.playlists.length?(o(),n("div",te,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/playlists"},{default:r(()=>[f("Playlists")]),_:1})]),l(v,null,{default:r(()=>[(o(!0),n(h,null,p(s.playlists,(t,i)=>(o(),d(M,{key:i,cover:t.cover,href:t==null?void 0:t.href,name:t.name,type:t.type,id:t.id},null,8,["cover","href","name","type","id"]))),128))]),_:1})])):_("",!0),s.liked.length?(o(),n("div",se,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks"},{default:r(()=>[f("Liked Songs")]),_:1})]),l(x),(o(!0),n(h,null,p(s.liked,(t,i)=>(o(),d(I,{key:i,index:i,"playlist-id":-1,song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0),s.breaking.length?(o(),n("div",oe,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks/breaking"},{default:r(()=>[f("Breaking Songs")]),_:1})]),l(x),(o(!0),n(h,null,p(s.breaking,(t,i)=>(o(),d(I,{key:i,index:i,"playlist-id":-2,song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0)]),a("div",ae,[s.releases.length?(o(),n("div",ie,[a("h2",null,[l(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/collection/releases"},{default:r(()=>[ne,le]),_:1})]),l(v,null,{default:r(()=>[(o(!0),n(h,null,p(s.releases,(t,i)=>(o(),d(S,{key:i,artist:t.artist,cover:t.cover,href:t.url,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.picks.length?(o(),n("div",re,[a("h2",null,[l(c,{class:"linkOnHover flex items-center gap-2 !no-underline",to:"/discover"},{default:r(()=>[ce,de]),_:1})]),l(v,null,{default:r(()=>[(o(!0),n(h,null,p(s.picks,(t,i)=>(o(),d(S,{id:t.id,key:i,artist:t.artist,cover:$(T)(t.cover),href:t.href,title:t.title,onPlay:()=>s.playDiscover(t)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.recommendations.length?(o(),n("div",ue,[_e,l(v,null,{default:r(()=>[(o(!0),n(h,null,p(s.recommendations,(t,i)=>(o(),d(S,{key:i,artist:t.artist,cover:t.cover,href:t.href,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0)])])}}});const me=P(pe,[["__scopeId","data-v-e67f7cde"]]),k=e=>(H("data-v-c0ed4691"),e=e(),N(),e),fe={class:"onboarding p-4"},ye=k(()=>a("h1",null,"So nice to meet you!",-1)),ve=k(()=>a("p",null,"Let's get you set up",-1)),ke={class:"grid grid-cols-2 gap-4 mt-8"},ge=k(()=>a("div",{class:"flex flex-row items-center"},[a("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),a("h2",null,"Create your first playlist")],-1)),be={class:"flex flex-row justify-end w-full"},Se={class:"flex flex-row items-center"},Pe=k(()=>a("h2",null,"Import from Spotify",-1)),$e={class:"spotify-playlists"},we=D({__name:"Onboarding",setup(e){const s=b([]),u=b(!1),c=b(null);q(),R().then(i=>{u.value=i}),fetch("/api/spotify/playlists").then(i=>i.json()).then(i=>{s.value=i});const t={fields:[{name:"name",label:"Name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",label:"Description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const i=c.value.toObject();await L(i.name,i.description)}}};return(i,w)=>(o(),n("div",fe,[ye,ve,a("div",ke,[l(C,{class:"p-4"},{default:r(()=>[ge,l(V,{ref_key:"createForm",ref:c,options:t.fields},null,8,["options"]),a("div",be,[l(G,{onClick:w[0]||(w[0]=m=>t.submit.action()),icon:"add",label:t.submit.label},null,8,["label"])])]),_:1}),s.value.length?(o(),d(C,{key:0,class:"p-4"},{default:r(()=>[a("div",Se,[l($(J),{class:"spotify mr-4"}),Pe]),a("div",$e,[(o(!0),n(h,null,p(s.value,(m,j)=>(o(),d(W,{key:j,cover:m.cover,description:m.description,title:m.name,id:m.id,spotify:!0,href:`https://open.spotify.com/playlist/${m.id}`},null,8,["cover","description","title","id","href"]))),128))])]),_:1})):_("",!0)])]))}});const Oe=P(we,[["__scopeId","data-v-c0ed4691"]]),Be={__name:"index",setup(e){const s=F();return(u,c)=>$(s).notEmpty?(o(),d(me,{key:0})):(o(),d(Oe,{key:1}))}};export{Be as default};