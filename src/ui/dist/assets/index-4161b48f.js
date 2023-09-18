import{_ as v,o,c as n,a,b as f,t as S,d as _,r as H,e as C,f as d,w as r,g as l,h as q,C as P,F as h,i as p,u as $,p as N,j as I,k as B,l as F,m as j,n as E,q as g,s as T,v as R,x as V}from"./index-d3fba034.js";import{T as b}from"./TrackCompact-7a7a3cb3.js";import{P as O}from"./PlaylistHeader-8dd53ec0.js";import{P as x}from"./PlaylistEntry-0d2da2e2.js";import{s as G}from"./spotify-111ae6ad.js";import{F as L}from"./Form-f0cd8cf2.js";import{P as M}from"./PlaylistItem-a7b148e6.js";import{I as J}from"./IconButton-0d464118.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-8201752a.js";import"./Template-deebb6b8.js";import"./Playlist-8c4c6944.js";import"./ExternalEntry-8bf31741.js";import"./EditSong.vue_vue_type_script_setup_true_lang-28aa0cb5.js";import"./playerInPicture-af203fdf.js";import"./Dropdown-b2449fcb.js";const W={name:"FlexShelf",props:{heading:String,icon:String}},z={class:"shelf"},A={class:"header"},K={key:0},Q={key:0,class:"icon material-symbols-round"},U={class:"items"};function X(e,s,u,c,t,i){return o(),n("div",z,[a("div",A,[u.heading||u.icon?(o(),n("h2",K,[f(S(u.heading),1),u.icon?(o(),n("span",Q,S(u.icon),1)):_("",!0)])):_("",!0)]),a("div",U,[H(e.$slots,"default",{},void 0,!0)])])}const y=v(W,[["render",X],["__scopeId","data-v-3f16aa97"]]);const Y={__name:"Playlist",props:{name:{type:String,required:!0},cover:{type:String,required:!0},href:{type:String,required:!0}},setup(e){return(s,u)=>{const c=C("router-link");return o(),d(c,{to:e.href,class:"no-underline"},{default:r(()=>[l(P,{class:"home-playlist drop-shadow-md","with-hover":""},{default:r(()=>[l(q,{src:e.cover,type:"playlist"},null,8,["src"]),a("h2",null,S(e.name),1)]),_:1})]),_:1},8,["to"])}}},Z=v(Y,[["__scopeId","data-v-771b12c3"]]);const ee=e=>(F("data-v-ea6291c9"),e=e(),j(),e),te={class:"home"},se={class:"main"},oe={key:0,class:"playlists"},ie={key:1,class:"liked"},ae={key:2,class:"breaking"},ne={class:"side"},le={key:0,class:"releases"},re={key:1,class:"disovery"},ce={key:2,class:"recommendations"},de=ee(()=>a("h2",null,"Recommendations",-1)),ue={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],liked:[],breaking:[],recommendations:[],data:I()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),fetch("/api/me/liked").then(e=>e.json()).then(e=>{this.liked=e.songs.slice(0,3)}),fetch("/api/me/new").then(e=>e.json()).then(e=>{this.breaking=e.songs.slice(0,3)}),this.pick()},computed:{playlists(){return this.data.playlists}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const s=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.source||e.url||e.href}});window.dispatchEvent(s)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=(await Promise.all(this.playlists.map(async e=>{var s;return((s=await B(e.id))==null?void 0:s.songs)||[]}))).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},_e=Object.assign(ue,{setup(e){return(s,u)=>{const c=C("router-link");return o(),n("div",te,[a("div",se,[s.playlists.length?(o(),n("div",oe,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/playlists"},{default:r(()=>[f("Playlists")]),_:1})]),l(y,null,{default:r(()=>[(o(!0),n(h,null,p(s.playlists,(t,i)=>(o(),d(Z,{key:i,cover:t.cover,href:t==null?void 0:t.href,name:t.name},null,8,["cover","href","name"]))),128))]),_:1})])):_("",!0),s.liked.length?(o(),n("div",ie,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks"},{default:r(()=>[f("Liked Songs")]),_:1})]),l(O),(o(!0),n(h,null,p(s.liked,(t,i)=>(o(),d(x,{key:i,index:i,"playlist-id":-1,song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0),s.breaking.length?(o(),n("div",ae,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks/breaking"},{default:r(()=>[f("Breaking Songs")]),_:1})]),l(O),(o(!0),n(h,null,p(s.breaking,(t,i)=>(o(),d(x,{key:i,index:i,"playlist-id":-2,song:t,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0)]),a("div",ne,[s.releases.length?(o(),n("div",le,[a("h2",null,[l(c,{class:"linkOnHover",to:"/collection/releases"},{default:r(()=>[f("Out now")]),_:1})]),l(y,null,{default:r(()=>[(o(!0),n(h,null,p(s.releases,(t,i)=>(o(),d(b,{key:i,artist:t.artist,cover:t.cover,href:t.url,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.picks.length?(o(),n("div",re,[a("h2",null,[l(c,{class:"linkOnHover",to:"/discover"},{default:r(()=>[f("Discover")]),_:1})]),l(y,null,{default:r(()=>[(o(!0),n(h,null,p(s.picks,(t,i)=>(o(),d(b,{id:t.id,key:i,artist:t.artist,cover:$(N)(t.cover),href:t.href,title:t.title,onPlay:()=>s.playDiscover(t)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),s.recommendations.length?(o(),n("div",ce,[de,l(y,null,{default:r(()=>[(o(!0),n(h,null,p(s.recommendations,(t,i)=>(o(),d(b,{key:i,artist:t.artist,cover:t.cover,href:t.href,title:t.title,onPlay:()=>s.playRecommendation(t)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0)])])}}}),he=v(_e,[["__scopeId","data-v-ea6291c9"]]),k=e=>(F("data-v-c0ed4691"),e=e(),j(),e),pe={class:"onboarding p-4"},me=k(()=>a("h1",null,"So nice to meet you!",-1)),fe=k(()=>a("p",null,"Let's get you set up",-1)),ye={class:"grid grid-cols-2 gap-4 mt-8"},ve=k(()=>a("div",{class:"flex flex-row items-center"},[a("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),a("h2",null,"Create your first playlist")],-1)),ke={class:"flex flex-row justify-end w-full"},ge={class:"flex flex-row items-center"},be=k(()=>a("h2",null,"Import from Spotify",-1)),Se={class:"spotify-playlists"},Pe=E({__name:"Onboarding",setup(e){const s=g([]),u=g(!1),c=g(null);T(),R().then(i=>{u.value=i}),fetch("/api/spotify/playlists").then(i=>i.json()).then(i=>{s.value=i});const t={fields:[{name:"name",label:"Name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",label:"Description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const i=c.value.toObject();await V(i.name,i.description)}}};return(i,w)=>(o(),n("div",pe,[me,fe,a("div",ye,[l(P,{class:"p-4"},{default:r(()=>[ve,l(L,{ref_key:"createForm",ref:c,options:t.fields},null,8,["options"]),a("div",ke,[l(J,{onClick:w[0]||(w[0]=m=>t.submit.action()),icon:"add",label:t.submit.label},null,8,["label"])])]),_:1}),s.value.length?(o(),d(P,{key:0,class:"p-4"},{default:r(()=>[a("div",ge,[l($(G),{class:"spotify mr-4"}),be]),a("div",Se,[(o(!0),n(h,null,p(s.value,(m,D)=>(o(),d(M,{key:D,cover:m.cover,description:m.description,title:m.name,id:m.id,spotify:!0,href:`https://open.spotify.com/playlist/${m.id}`},null,8,["cover","description","title","id","href"]))),128))])]),_:1})):_("",!0)])]))}});const $e=v(Pe,[["__scopeId","data-v-c0ed4691"]]),Ve={__name:"index",setup(e){const s=I();return(u,c)=>$(s).notEmpty?(o(),d(he,{key:0})):(o(),d($e,{key:1}))}};export{Ve as default};
