import{_ as y,o as t,c as a,a as i,b as f,t as v,d as _,r as I,e as C,f as u,w as c,g as l,h as H,F as h,i as p,u as S,p as N,j,k as F,l as q,m as B,n as E,q as b,s as T,v as z}from"./index.4e1aa6fb.js";import{g as R,F as L,c as M}from"./song.6a8a1dc6.js";import{T as $}from"./TrackCompact.b4cf2f93.js";import{P,a as x}from"./PlaylistEntry.06cb17aa.js";import{P as V}from"./PlaylistItem.94b56af8.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang.815f7542.js";import"./TrackInfo.2eb080de.js";import"./MiniPlayer.26dbe90d.js";import"./ImportSpotifySong.vue_vue_type_script_setup_true_lang.daa84418.js";import"./EditSong.vue_vue_type_script_setup_true_lang.b46bc146.js";import"./playerInPicture.37a9ab56.js";const G={name:"FlexShelf",props:{heading:String,icon:String}},J={class:"shelf"},W={class:"header"},A={key:0},K={key:0,class:"icon material-symbols-round"},Q={class:"items"};function U(e,n,d,r,s,o){return t(),a("div",J,[i("div",W,[d.heading||d.icon?(t(),a("h2",A,[f(v(d.heading),1),d.icon?(t(),a("span",K,v(d.icon),1)):_("",!0)])):_("",!0)]),i("div",Q,[I(e.$slots,"default",{},void 0,!0)])])}const g=y(G,[["render",U],["__scopeId","data-v-b884f5aa"]]);const X={class:"home-playlist drop-shadow-md"},Y={__name:"Playlist",props:{name:{type:String,required:!0},cover:{type:String,required:!0},href:{type:String,required:!0}},setup(e){return(n,d)=>{const r=C("router-link");return t(),u(r,{to:e.href,class:"no-underline"},{default:c(()=>[i("div",X,[l(H,{src:e.cover,type:"playlist"},null,8,["src"]),i("h2",null,v(e.name),1)])]),_:1},8,["to"])}}},Z=y(Y,[["__scopeId","data-v-fa98544f"]]);const ee=e=>(F("data-v-8c3f59c5"),e=e(),q(),e),te={class:"home"},se={class:"main"},ne={key:0,class:"playlists"},oe={key:1,class:"liked"},ae={key:2,class:"breaking"},ie={class:"side"},le={key:0,class:"releases"},re={key:1,class:"disovery"},ce={key:2,class:"recommendations"},de=ee(()=>i("h2",null,"Recommendations",-1)),_e={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],picks:[],songs:[],liked:[],breaking:[],recommendations:[],data:j()}},mounted(){fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),fetch("/api/me/liked").then(e=>e.json()).then(e=>{this.liked=e.songs.slice(0,3)}),fetch("/api/me/new").then(e=>e.json()).then(e=>{this.breaking=e.songs.slice(0,3)}),this.pick()},computed:{playlists(){return this.data.playlists}},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const n=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.src||e.url}});window.dispatchEvent(n)},async pick(){if(!this.data.playlists.length){setTimeout(()=>this.pick(),2e3);return}if(this.songs=(await Promise.all(this.playlists.map(async e=>{var n;return((n=await R(e.id))==null?void 0:n.songs)||[]}))).flat(),!(this.songs.length<3)){for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}}},ue=Object.assign(_e,{setup(e){return(n,d)=>{const r=C("router-link");return t(),a("div",te,[i("div",se,[n.playlists.length?(t(),a("div",ne,[i("h2",null,[l(r,{to:"/collection/playlists",class:"linkOnHover"},{default:c(()=>[f("Playlists")]),_:1})]),l(g,null,{default:c(()=>[(t(!0),a(h,null,p(n.playlists,(s,o)=>(t(),u(Z,{key:o,name:s.name,cover:s.cover,href:s==null?void 0:s.href},null,8,["name","cover","href"]))),128))]),_:1})])):_("",!0),n.liked.length?(t(),a("div",oe,[i("h2",null,[l(r,{to:"/collection/tracks",class:"linkOnHover"},{default:c(()=>[f("Liked Songs")]),_:1})]),l(P),(t(!0),a(h,null,p(n.liked,(s,o)=>(t(),u(x,{key:o,index:o,song:s,"playlist-id":-1,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0),n.breaking.length?(t(),a("div",ae,[i("h2",null,[l(r,{to:"/collection/tracks/breaking",class:"linkOnHover"},{default:c(()=>[f("Breaking Songs")]),_:1})]),l(P),(t(!0),a(h,null,p(n.breaking,(s,o)=>(t(),u(x,{key:o,index:o,song:s,"playlist-id":-2,"with-cover":""},null,8,["index","song"]))),128))])):_("",!0)]),i("div",ie,[n.releases.length?(t(),a("div",le,[i("h2",null,[l(r,{to:"/collection/releases",class:"linkOnHover"},{default:c(()=>[f("Out now")]),_:1})]),l(g,null,{default:c(()=>[(t(!0),a(h,null,p(n.releases,(s,o)=>(t(),u($,{onPlay:()=>n.playRecommendation(s),key:o,artist:s.artist,title:s.title,cover:s.cover,href:s.url},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):_("",!0),n.picks.length?(t(),a("div",re,[i("h2",null,[l(r,{to:"/discover",class:"linkOnHover"},{default:c(()=>[f("Discover")]),_:1})]),l(g,null,{default:c(()=>[(t(!0),a(h,null,p(n.picks,(s,o)=>(t(),u($,{onPlay:()=>n.playDiscover(s),key:o,artist:s.artist,title:s.title,cover:S(N)(s.cover),id:s.id,href:s.href},null,8,["onPlay","artist","title","cover","id","href"]))),128))]),_:1})])):_("",!0),n.recommendations.length?(t(),a("div",ce,[de,l(g,null,{default:c(()=>[(t(!0),a(h,null,p(n.recommendations,(s,o)=>(t(),u($,{onPlay:()=>n.playRecommendation(s),key:o,artist:s.artist,title:s.title,cover:s.cover,href:s.src},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):_("",!0)])])}}}),he=y(ue,[["__scopeId","data-v-8c3f59c5"]]);const pe={},me={class:"card"};function fe(e,n){return t(),a("div",me,[I(e.$slots,"default",{},void 0,!0)])}const O=y(pe,[["render",fe],["__scopeId","data-v-a2964c73"]]),ye={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 168 168"},ve=i("path",{fill:"#111",d:"M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 0 1-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 0 1-6.249-3.93 5.213 5.213 0 0 1 3.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 0 1 4.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 0 1 5.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 0 1 2.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"},null,-1),ge=[ve];function ke(e,n){return t(),a("svg",ye,ge)}const be={render:ke},$e={class:"flex items-center justify-center h-12 p-4 mt-4 bg-fg text-bg rounded-full"},Se={key:1},we=B({__name:"IconButton",props:{icon:{type:String,required:!1},label:{type:String,required:!1}},setup(e){return(n,d)=>(t(),a("button",$e,[e.icon?(t(),a("span",{key:0,class:E(["material-symbols-rounded",{"mr-2":e.label}])},v(e.icon),3)):_("",!0),e.label?(t(),a("span",Se,v(e.label),1)):_("",!0)]))}});const Pe=y(we,[["__scopeId","data-v-cb9d7d79"]]),k=e=>(F("data-v-47650245"),e=e(),q(),e),xe={class:"onboarding p-4"},Oe=k(()=>i("h1",null,"So nice to meet you!",-1)),Ie=k(()=>i("p",null,"Let's get you set up",-1)),Ce={class:"grid grid-cols-2 gap-4 mt-8"},je=k(()=>i("div",{class:"flex flex-row items-center"},[i("span",{class:"material-symbols-rounded ms-wght-700 text-4xl mr-4"},"add"),i("h2",null,"Create your first playlist")],-1)),Fe={class:"flex flex-row justify-end w-full"},qe={class:"flex flex-row items-center"},Be=k(()=>i("h2",null,"Import from Spotify",-1)),De={class:"spotify-playlists"},He=B({__name:"Onboarding",setup(e){const n=b([]),d=b(!1),r=b(null);T(),z().then(o=>{d.value=o}),fetch("/api/spotify/playlists").then(o=>o.json()).then(o=>{n.value=o});const s={fields:[{name:"name",label:"Name",placeholder:"Playlist name",type:"text",required:!0},{name:"description",label:"Description",placeholder:"Playlist description",type:"text",required:!1}],submit:{label:"Create",action:async()=>{const o=r.value.toObject();await M(o.name,o.description)}}};return(o,w)=>(t(),a("div",xe,[Oe,Ie,i("div",Ce,[l(O,null,{default:c(()=>[je,l(L,{ref_key:"createForm",ref:r,options:s.fields},null,8,["options"]),i("div",Fe,[l(Pe,{onClick:w[0]||(w[0]=m=>s.submit.action()),icon:"add",label:s.submit.label},null,8,["label"])])]),_:1}),n.value.length?(t(),u(O,{key:0},{default:c(()=>[i("div",qe,[l(S(be),{class:"spotify mr-4"}),Be]),i("div",De,[(t(!0),a(h,null,p(n.value,(m,D)=>(t(),u(V,{key:D,cover:m.cover,description:m.description,title:m.name,id:m.id,spotify:!0,href:`https://open.spotify.com/playlist/${m.id}`},null,8,["cover","description","title","id","href"]))),128))])]),_:1})):_("",!0)])]))}});const Ne=y(He,[["__scopeId","data-v-47650245"]]),Ke={__name:"index",setup(e){const n=j();return(d,r)=>S(n).notEmpty?(t(),u(he,{key:0})):(t(),u(Ne,{key:1}))}};export{Ke as default};
