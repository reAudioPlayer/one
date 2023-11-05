import{_ as g,o as s,c as a,a as i,b as m,t as k,d as _,r as j,e as w,f as d,w as r,g as l,C as O,h as B,i as D,F as p,j as h,P as C,u as x,p as E,k as F,l as S,m as H,n as q,q as $,s as T,v as R,x as V,I as G,y as L}from"./index-d16bcb03.js";import{T as P}from"./TrackCompact-42f75130.js";import{P as I}from"./PlaylistEntry-e0b64a47.js";import{s as M}from"./spotify-73bf4040.js";import{P as J}from"./PlaylistItem-490c43f4.js";import"./EditSong.vue_vue_type_script_setup_true_lang-9c401f51.js";import"./playerInPicture-af203fdf.js";const W={name:"FlexShelf",props:{heading:String,icon:String}},z={class:"shelf"},A={class:"header"},K={key:0},Q={key:0,class:"icon material-symbols-round"},U={class:"items"};function X(t,o,u,c,y,e){return s(),a("div",z,[i("div",A,[u.heading||u.icon?(s(),a("h2",K,[m(k(u.heading),1),u.icon?(s(),a("span",Q,k(u.icon),1)):_("",!0)])):_("",!0)]),i("div",U,[j(t.$slots,"default",{},void 0,!0)])])}const v=g(W,[["render",X],["__scopeId","data-v-c2d585d9"]]);const Y={class:"title"},Z={key:0,class:"material-symbols-rounded"},ee={__name:"Playlist",props:{name:{type:String,required:!0},cover:{type:String,required:!0},href:{type:String,required:!0},type:{type:String,default:"classic"}},setup(t){return(o,u)=>{const c=w("router-link");return s(),d(c,{to:t.href,class:"no-underline"},{default:r(()=>[l(O,{class:"home-playlist drop-shadow-md","with-hover":""},{default:r(()=>[l(B,{src:t.cover,type:"playlist"},null,8,["src"]),i("div",Y,[t.type!="classic"?(s(),a("span",Z,k(t.type=="smart"?"neurology":"bolt"),1)):_("",!0),i("h4",null,k(t.name),1)])]),_:1})]),_:1},8,["to"])}}},te=g(ee,[["__scopeId","data-v-dbaefeb5"]]),se=t=>(H("data-v-eefbdd0a"),t=t(),q(),t),oe={class:"home"},ie={class:"main"},ae={key:0,class:"playlists"},ne={key:1,class:"liked"},le={key:2,class:"breaking"},re={class:"side"},ce={key:0,class:"releases"},de={key:1,class:"disovery"},ue={key:2,class:"recommendations"},_e=se(()=>i("h2",null,"Recommendations",-1)),pe={name:"Home",data(){const t=new Date;return{greeting:t.getHours()<12?"Good morning":t.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],recommendations:[],data:F()}},mounted(){fetch("/api/releases").then(t=>t.json()).then(t=>{this.releases=t.slice(0,3)}),this.pick()},computed:{playlists(){return this.data.playlists},liked(){return S("liked").songs.slice(0,3)},breaking(){return S("breaking").songs.slice(0,3)}},methods:{playDiscover(t){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:t.id,type:"track"})})},playRecommendation(t){const o=new CustomEvent("player.play",{detail:{artist:t.artist,title:t.title,source:t.source||t.url||t.href}});window.dispatchEvent(o)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=this.playlists.map(t=>{var o;return((o=S(t.id))==null?void 0:o.songs)||[]}).flat(),!(this.songs.length<3)){for(let t=0;t<3;t++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(t=>t.json()).then(t=>{this.recommendations=t.slice(0,3)})}}}},he=D({...pe,setup(t){return(o,u)=>{const c=w("router-link"),y=w("playlist-item");return s(),a("div",oe,[i("div",ie,[o.playlists.length?(s(),a("div",ae,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/playlists"},{default:r(()=>[m("Playlists")]),_:1})]),l(v,null,{default:r(()=>[(s(!0),a(p,null,h(o.playlists,(e,n)=>(s(),d(y,{key:n,href:e.href,cover:e.cover,description:e.description,title:e.name,type:e.type,spotify:!1},null,8,["href","cover","description","title","type"]))),128)),(s(!0),a(p,null,h(o.playlists,(e,n)=>(s(),d(te,{key:n,cover:e.cover,href:e==null?void 0:e.href,name:e.name,type:e.type},null,8,["cover","href","name","type"]))),128))]),_:1})])):_("",!0),o.liked.length?(s(),a("div",ne,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks"},{default:r(()=>[m("Liked Songs")]),_:1})]),l(C),(s(!0),a(p,null,h(o.liked,(e,n)=>(s(),d(I,{key:n,index:n,"playlist-id":-1,song:e,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0),o.breaking.length?(s(),a("div",le,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/tracks/breaking"},{default:r(()=>[m("Breaking Songs")]),_:1})]),l(C),(s(!0),a(p,null,h(o.breaking,(e,n)=>(s(),d(I,{key:n,index:n,"playlist-id":-2,song:e,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0)]),i("div",re,[o.releases.length?(s(),a("div",ce,[i("h2",null,[l(c,{class:"linkOnHover",to:"/collection/releases"},{default:r(()=>[m("Out now")]),_:1})]),l(v,null,{default:r(()=>[(s(!0),a(p,null,h(o.releases,(e,n)=>(s(),d(P,{key:n,artist:e.artist,cover:e.cover,href:e.url,title:e.title,onPlay:()=>o.playRecommendation(e)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),o.picks.length?(s(),a("div",de,[i("h2",null,[l(c,{class:"linkOnHover",to:"/discover"},{default:r(()=>[m("Discover")]),_:1})]),l(v,null,{default:r(()=>[(s(!0),a(p,null,h(o.picks,(e,n)=>(s(),d(P,{id:e.id,key:n,artist:e.artist,cover:x(E)(e.cover),href:e.href,title:e.title,onPlay:()=>o.playDiscover(e)},null,8,["id","artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0),o.recommendations.length?(s(),a("div",ue,[_e,l(v,null,{default:r(()=>[(s(!0),a(p,null,h(o.recommendations,(e,n)=>(s(),d(P,{key:n,artist:e.artist,cover:e.cover,href:e.href,title:e.title,onPlay:()=>o.playRecommendation(e)},null,8,["artist","cover","href","title","onPlay"]))),128))]),_:1})])):_("",!0)])])}}});const ye=g(he,[["__scopeId","data-v-eefbdd0a"]]),b=t=>(H("data-v-19a9c7d9"),t=t(),q(),t),fe={class:"onboarding p-4"},me=b(()=>i("h1",null,"So nice to meet you!",-1)),ve=b(()=>i("p",null,"Let's get you set up",-1)),ke={class:"grid grid-cols-2 gap-4 mt-8"},ge=b(()=>i("div",{class:"flex flex-row items-center"},[i("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),i("h2",null,"Create your first playlist")],-1)),be={class:"flex flex-row justify-end w-full"},Se={class:"flex flex-row items-center"},$e=b(()=>i("h2",null,"Import from Spotify",-1)),Pe={class:"spotify-playlists"},we=D({__name:"Onboarding",setup(t){const o=$([]),u=$(!1),c=$(null);T(),R().then(e=>{u.value=e}),fetch("/api/spotify/playlists").then(e=>e.json()).then(e=>{o.value=e});const y={fields:[{name:"name",label:"Name",placeholder:"Playlist name",icon:"title",type:"text",required:!0},{name:"description",label:"Description",placeholder:"Playlist description",icon:"description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const e=c.value.toObject();await L(e.name,e.description)}}};return(e,n)=>(s(),a("div",fe,[me,ve,i("div",ke,[l(O,{class:"p-4"},{default:r(()=>[ge,l(V,{ref_key:"createForm",ref:c,options:y.fields},null,8,["options"]),i("div",be,[l(G,{onClick:n[0]||(n[0]=f=>y.submit.action()),icon:"add",label:y.submit.label},null,8,["label"])])]),_:1}),o.value.length?(s(),d(O,{key:0,class:"p-4"},{default:r(()=>[i("div",Se,[l(x(M),{class:"spotify mr-4"}),$e]),i("div",Pe,[(s(!0),a(p,null,h(o.value,(f,N)=>(s(),d(J,{key:N,cover:f.cover,description:f.description,title:f.name,id:f.id,spotify:!0,href:`https://open.spotify.com/playlist/${f.id}`},null,8,["cover","description","title","id","href"]))),128))])]),_:1})):_("",!0)])]))}});const Oe=g(we,[["__scopeId","data-v-19a9c7d9"]]),Ne={__name:"index",setup(t){const o=F();return(u,c)=>x(o).notEmpty?(s(),d(ye,{key:0})):(s(),d(Oe,{key:1}))}};export{Ne as default};
