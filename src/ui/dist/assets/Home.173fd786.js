import{_,o as i,c as o,a as r,b as m,t as y,d as h,r as O,e as b,f as u,n as I,w as d,g as c,M as g,h as j,p as w,i as H,F as f,j as v,k as C}from"./index.c601bd9b.js";import{A as M}from"./AddAlbumToPlaylist.d9e2972a.js";import{A as T}from"./AddSongToPlaylist.f919d23c.js";import{S}from"./SpotifyPlaylistHeader.d146c4ed.js";import{L as $}from"./LightPlaylistEntry.022ae5fe.js";import"./MiniPlayer.c07b36ee.js";import"./FindSources.76c75593.js";import"./SongCtx.8a758f9e.js";import"./EditSong.e6229178.js";const A={name:"FlexShelf",props:{heading:String,icon:String}},F={class:"shelf"},N={class:"header"},R={key:0},B={key:0,class:"icon material-symbols-round"},D={class:"items"};function E(e,s,l,n,t,a){return i(),o("div",F,[r("div",N,[l.heading||l.icon?(i(),o("h2",R,[m(y(l.heading),1),l.icon?(i(),o("span",B,y(l.icon),1)):h("",!0)])):h("",!0)]),r("div",D,[O(e.$slots,"default",{},void 0,!0)])])}const p=_(A,[["render",E],["__scopeId","data-v-b884f5aa"]]);const L={name:"FlexShelf",props:{name:String,cover:String,href:String},methods:{redirect(){this.$router.push(this.href)}}},V=["src"];function G(e,s,l,n,t,a){return i(),o("div",{onClick:s[0]||(s[0]=(...P)=>a.redirect&&a.redirect(...P)),class:"home-playlist drop-shadow-md"},[r("img",{src:l.cover},null,8,V),r("h2",null,y(l.name),1)])}const q=_(L,[["render",G],["__scopeId","data-v-8c3205be"]]);const J=e=>(w("data-v-c4761ef4"),e=e(),H(),e),x={class:"home-track-compact-wrapper drop-shadow-md"},z=J(()=>r("div",{class:"play"},[r("span",{class:"material-symbols-rounded"},"play_arrow")],-1)),K=[z],Q={class:"info"},U={class:"title"},W=["href"],X={class:"artist"},Y={name:"FlexShelf",props:{title:String,artist:String,cover:String,id:Number,href:String},methods:{play(e){e.stopPropagation(),this.$emit("play")},openModal(){var e;console.log(this.href),this.href||this.$router.push(this.trackHref),(e=this.href)!=null&&e.includes("spotify")?this.$refs.addRelease.showModal=!0:this.$refs.addSong.showModal=!0}},computed:{trackId(){return j(this.id)},trackHref(){return`/track/${this.trackId}`}}},Z=Object.assign(Y,{setup(e){return(s,l)=>{const n=b("router-link");return i(),o("div",x,[e.href?(i(),u(M,{key:0,id:e.href.replace("https://open.spotify.com/album/",""),cover:e.cover,title:e.title,artist:e.artist,href:e.href,ref:"addRelease"},null,8,["id","cover","title","artist","href"])):h("",!0),e.href?(i(),u(T,{key:1,href:e.href,cover:e.cover,title:e.title,artist:e.artist,preview:s.preview,ref:"addSong"},null,8,["href","cover","title","artist","preview"])):h("",!0),r("div",{class:"home-track-compact",onClick:l[1]||(l[1]=(...t)=>s.openModal&&s.openModal(...t))},[r("div",{onClick:l[0]||(l[0]=(...t)=>s.play&&s.play(...t)),class:"cover",style:I({backgroundImage:`url(${e.cover})`})},K,4),r("div",Q,[r("span",U,[e.href?(i(),o("a",{key:1,href:e.href,class:"linkOnHover"},[c(g,{text:e.title},null,8,["text"])],8,W)):(i(),u(n,{key:0,class:"linkOnHover",to:s.trackHref},{default:d(()=>[c(g,{text:e.title},null,8,["text"])]),_:1},8,["to"]))]),c(n,{class:"linkOnHover",to:`/search/artist:${e.artist}`},{default:d(()=>[r("span",X,y(e.artist),1)]),_:1},8,["to"])])])])}}}),k=_(Z,[["__scopeId","data-v-c4761ef4"]]);const ee=e=>(w("data-v-5e67c870"),e=e(),H(),e),te={class:"home"},se={class:"main"},ie={key:0,class:"playlists"},ae={key:1,class:"liked"},oe={key:2,class:"breaking"},re={class:"side"},le={key:0,class:"releases"},ne={key:1,class:"disovery"},ce={key:2,class:"recommendations"},de=ee(()=>r("h2",null,"Recommendations",-1)),he={name:"Home",data(){const e=new Date;return{greeting:e.getHours()<12?"Good morning":e.getHours()<18?"Good afternoon":"Good evening",releases:[],playlists:[],picks:[],songs:[],liked:[],breaking:[],recommendations:[]}},mounted(){fetch("/api/config").then(e=>{e.status==400&&this.$router.push("/welcome")}),fetch("/api/releases").then(e=>e.json()).then(e=>{this.releases=e.slice(0,3)}),fetch("/api/playlists").then(e=>e.json()).then(async e=>{var s,l;for(let n=0;n<e.length;n++){const a=await(await fetch(`/api/playlists/${n}`)).json();this.playlists.push({name:a.name,description:a.description,cover:a.cover||((l=(s=a.songs)==null?void 0:s[0])==null?void 0:l.cover)||"/assets/img/music_placeholder.png",href:`/playlist/${C(n)}`,songs:a.songs})}this.pick()}),fetch("/api/me/liked").then(e=>e.json()).then(e=>{this.liked=e.songs.slice(0,3)}),fetch("/api/me/new").then(e=>e.json()).then(e=>{this.breaking=e.songs.slice(0,3)})},methods:{playDiscover(e){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:e.id,type:"track"})})},playRecommendation(e){const s=new CustomEvent("player.play",{detail:{artist:e.artist,title:e.title,source:e.src||e.url}});window.dispatchEvent(s)},pick(){this.songs=this.playlists.map(e=>e.songs).flat();for(let e=0;e<3;e++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)]);fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.picks[0].artist} ${this.picks[0].title}`})}).then(e=>e.json()).then(e=>{this.recommendations=e.slice(0,3)})}}},ue=Object.assign(he,{setup(e){return(s,l)=>{const n=b("router-link");return i(),o("div",te,[r("div",se,[s.playlists.length?(i(),o("div",ie,[r("h2",null,[c(n,{to:"/collection/playlists",class:"linkOnHover"},{default:d(()=>[m("Playlists")]),_:1})]),c(p,null,{default:d(()=>[(i(!0),o(f,null,v(s.playlists,(t,a)=>(i(),u(q,{key:a,name:t.name,cover:t.cover,href:t==null?void 0:t.href},null,8,["name","cover","href"]))),128))]),_:1})])):h("",!0),s.liked.length?(i(),o("div",ae,[r("h2",null,[c(n,{to:"/collection/tracks",class:"linkOnHover"},{default:d(()=>[m("Liked Songs")]),_:1})]),c(S),(i(!0),o(f,null,v(s.liked,(t,a)=>(i(),u($,{key:a,index:a,loadAt:{type:"collection"},source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])):h("",!0),s.breaking.length?(i(),o("div",oe,[r("h2",null,[c(n,{to:"/collection/tracks/breaking",class:"linkOnHover"},{default:d(()=>[m("Breaking Songs")]),_:1})]),c(S),(i(!0),o(f,null,v(s.breaking,(t,a)=>(i(),u($,{key:a,index:a,loadAt:{type:"collection/breaking"},source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])):h("",!0)]),r("div",re,[s.releases.length?(i(),o("div",le,[r("h2",null,[c(n,{to:"/collection/releases",class:"linkOnHover"},{default:d(()=>[m("Out now")]),_:1})]),c(p,null,{default:d(()=>[(i(!0),o(f,null,v(s.releases,(t,a)=>(i(),u(k,{onPlay:()=>s.playRecommendation(t),key:a,artist:t.artist,title:t.title,cover:t.cover,href:t.url},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):h("",!0),s.picks.length?(i(),o("div",ne,[r("h2",null,[c(n,{to:"/discover",class:"linkOnHover"},{default:d(()=>[m("Discover")]),_:1})]),c(p,null,{default:d(()=>[(i(!0),o(f,null,v(s.picks,(t,a)=>(i(),u(k,{onPlay:()=>s.playDiscover(t),key:a,artist:t.artist,title:t.title,cover:t.cover,id:t.id},null,8,["onPlay","artist","title","cover","id"]))),128))]),_:1})])):h("",!0),s.recommendations.length?(i(),o("div",ce,[de,c(p,null,{default:d(()=>[(i(!0),o(f,null,v(s.recommendations,(t,a)=>(i(),u(k,{onPlay:()=>s.playRecommendation(t),key:a,artist:t.artist,title:t.title,cover:t.cover,href:t.src},null,8,["onPlay","artist","title","cover","href"]))),128))]),_:1})])):h("",!0)])])}}}),$e=_(ue,[["__scopeId","data-v-5e67c870"]]);export{$e as default};