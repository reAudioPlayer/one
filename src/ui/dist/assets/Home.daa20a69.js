import{_,o as i,c as o,a as r,b as p,t as y,d as h,r as C,e as H,f as u,n as j,w as d,g as c,M as $,h as M,p as P,i as O,F as f,j as v,u as k,k as T,l as g}from"./index.e4364b30.js";import{A}from"./AddAlbumToPlaylist.d131e3de.js";import{A as F}from"./AddSongToPlaylist.ae7ae457.js";import{S as b}from"./SpotifyPlaylistHeader.ef155c3a.js";import{L as w}from"./LightPlaylistEntry.8a0df939.js";import"./MiniPlayer.caa2b0a7.js";import"./FindSources.f9fa1aa0.js";import"./SongCtx.1f40c4bc.js";import"./EditSong.0fe6a16c.js";const N={name:"FlexShelf",props:{heading:String,icon:String}},R={class:"shelf"},B={class:"header"},D={key:0},E={key:0,class:"icon material-symbols-round"},L={class:"items"};function V(e,s,l,n,t,a){return i(),o("div",R,[r("div",B,[l.heading||l.icon?(i(),o("h2",D,[p(y(l.heading),1),l.icon?(i(),o("span",E,y(l.icon),1)):h("",!0)])):h("",!0)]),r("div",L,[C(e.$slots,"default",{},void 0,!0)])])}const m=_(N,[["render",V],["__scopeId","data-v-b884f5aa"]]);const G={name:"FlexShelf",props:{name:String,cover:String,href:String},methods:{redirect(){this.$router.push(this.href)}}},q=["src"];function J(e,s,l,n,t,a){return i(),o("div",{onClick:s[0]||(s[0]=(...I)=>a.redirect&&a.redirect(...I)),class:"home-playlist drop-shadow-md"},[r("img",{src:l.cover},null,8,q),r("h2",null,y(l.name),1)])}const x=_(G,[["render",J],["__scopeId","data-v-8c3205be"]]);const z=e=>(P("data-v-c4761ef4"),e=e(),O(),e),K={class:"home-track-compact-wrapper drop-shadow-md"},Q=z(()=>r("div",{class:"play"},[r("span",{class:"material-symbols-rounded"},"play_arrow")],-1)),U=[Q],W={class:"info"},X={class:"title"},Y=["href"],Z={class:"artist"},ee={name:"FlexShelf",props:{title:String,artist:String,cover:String,id:Number,href:String},methods:{play(e){e.stopPropagation(),this.$emit("play")},openModal(){var e;console.log(this.href),this.href||this.$router.push(this.trackHref),(e=this.href)!=null&&e.includes("spotify")?this.$refs.addRelease.showModal=!0:this.$refs.addSong.showModal=!0}},computed:{trackId(){return M(this.id)},trackHref(){return`/track/${this.trackId}`}}},te=Object.assign(ee,{setup(e){return(s,l)=>{const n=H("router-link");return i(),o("div",K,[e.href?(i(),u(A,{key:0,id:e.href.replace("https://open.spotify.com/album/",""),cover:e.cover,title:e.title,artist:e.artist,href:e.href,ref:"addRelease"},null,8,["id","cover","title","artist","href"])):h("",!0),e.href?(i(),u(F,{key:1,href:e.href,cover:e.cover,title:e.title,artist:e.artist,preview:s.preview,ref:"addSong"},null,8,["href","cover","title","artist","preview"])):h("",!0),r("div",{class:"home-track-compact",onClick:l[1]||(l[1]=(...t)=>s.openModal&&s.openModal(...t))},[r("div",{onClick:l[0]||(l[0]=(...t)=>s.play&&s.play(...t)),class:"cover",style:j({backgroundImage:`url(${e.cover})`})},U,4),r("div",W,[r("span",X,[e.href?(i(),o("a",{key:1,href:e.href,class:"linkOnHover"},[c($,{text:e.title},null,8,["text"])],8,Y)):(i(),u(n,{key:0,class:"linkOnHover",to:s.trackHref},{default:d(()=>[c($,{text:e.title},null,8,["text"])]),_:1},8,["to"]))]),c(n,{class:"linkOnHover",to:`/search/artist:${e.artist}`},{default:d(()=>[r("span",Z,y(e.artist),1)]),_:1},8,["to"])])])])}}}),S=_(te,[["__scopeId","data-v-c4761ef4"]]);const se=e=>(P("data-v-bc0c23d3"),e=e(),O(),e),ie={class:"home"},ae={class:"main"},oe={key:0,class:"playlists"},re={key:1,class:"liked"},le={key:2,class:"breaking"},ne={class:"side"},ce={key:0,class:"releases"},de={key:1,class:"disovery"},he={key:2,class:"recommendations"},ue=se(()=>r("h2",null,"Recommendations",-1)),fe={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],playlists:[],picks:[],songs:[],liked:[],breaking:[],recommendations:[]}},mounted(){fetch("/api/config").then(e=>{e.status==400&&this.$router.push("/welcome")}),fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),fetch("/api/playlists").then(e=>e.json()).then(async e=>{var s,l;for(let n=0;n<e.length;n++){const a=await(await fetch(`/api/playlists/${n}`)).json();this.playlists.push({name:a.name,description:a.description,cover:a.cover||((l=(s=a.songs)==null?void 0:s[0])==null?void 0:l.cover)||"/assets/img/music_placeholder.png",href:`/playlist/${T(n)}`,songs:a.songs})}this.pick()}),fetch("/api/me/liked").then(e=>e.json()).then(e=>{this.liked=e.songs.slice(0,3)}),fetch("/api/me/new").then(e=>e.json()).then(e=>{this.breaking=e.songs.slice(0,3)})},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const s=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.src||e.url}});window.dispatchEvent(s)},pick(){this.songs=this.playlists.map(e=>e.songs).flat();for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}},ve=Object.assign(fe,{setup(e){return(s,l)=>{const n=H("router-link");return i(),o("div",ie,[r("div",ae,[s.playlists.length?(i(),o("div",oe,[r("h2",null,[c(n,{to:"/collection/playlists",class:"linkOnHover"},{default:d(()=>[p("Playlists")]),_:1})]),c(m,null,{default:d(()=>[(i(!0),o(f,null,v(s.playlists,(t,a)=>(i(),u(x,{key:a,name:t.name,cover:t.cover,href:t==null?void 0:t.href},null,8,["name","cover","href"]))),128))]),_:1})])):h("",!0),s.liked.length?(i(),o("div",re,[r("h2",null,[c(n,{to:"/collection/tracks",class:"linkOnHover"},{default:d(()=>[p("Liked Songs")]),_:1})]),c(b),(i(!0),o(f,null,v(s.liked,(t,a)=>(i(),u(w,{key:a,index:a,loadAt:{type:"collection"},source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:k(g)(t.cover),favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])):h("",!0),s.breaking.length?(i(),o("div",le,[r("h2",null,[c(n,{to:"/collection/tracks/breaking",class:"linkOnHover"},{default:d(()=>[p("Breaking Songs")]),_:1})]),c(b),(i(!0),o(f,null,v(s.breaking,(t,a)=>(i(),u(w,{key:a,index:a,loadAt:{type:"collection/breaking"},source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:k(g)(t.cover),favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])):h("",!0)]),r("div",ne,[s.releases.length?(i(),o("div",ce,[r("h2",null,[c(n,{to:"/collection/releases",class:"linkOnHover"},{default:d(()=>[p("Out now")]),_:1})]),c(m,null,{default:d(()=>[(i(!0),o(f,null,v(s.releases,(t,a)=>(i(),u(S,{onPlay:()=>s.playRecommendation(t),key:a,artist:t.artist,title:t.title,cover:t.cover,href:t.url},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):h("",!0),s.picks.length?(i(),o("div",de,[r("h2",null,[c(n,{to:"/discover",class:"linkOnHover"},{default:d(()=>[p("Discover")]),_:1})]),c(m,null,{default:d(()=>[(i(!0),o(f,null,v(s.picks,(t,a)=>(i(),u(S,{onPlay:()=>s.playDiscover(t),key:a,artist:t.artist,title:t.title,cover:k(g)(t.cover),id:t.id},null,8,["onPlay","artist","title","cover","id"]))),128))]),_:1})])):h("",!0),s.recommendations.length?(i(),o("div",he,[ue,c(m,null,{default:d(()=>[(i(!0),o(f,null,v(s.recommendations,(t,a)=>(i(),u(S,{onPlay:()=>s.playRecommendation(t),key:a,artist:t.artist,title:t.title,cover:t.cover,href:t.src},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):h("",!0)])])}}}),we=_(ve,[["__scopeId","data-v-bc0c23d3"]]);export{we as default};