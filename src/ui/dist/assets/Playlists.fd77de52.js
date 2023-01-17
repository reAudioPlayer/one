import{F as u}from"./FullShelf.4b16f4b2.js";import{P as h}from"./PlaylistItem.6a458317.js";import{_ as B,o as s,c,a,t as _,d as l,j,A as C,g as F,u as v,f as n,w as P,F as S,h as b}from"./index.53c4dab8.js";import{C as w}from"./CollectionHeader.3f6a3d1e.js";import"./song.914b8395.js";import"./TrackInfo.7f1d8d60.js";import"./MiniPlayer.2d59ea06.js";import"./playerInPicture.37a9ab56.js";const $={name:"ReleaseItemBig",methods:{redirect(){this.$router.push(this.href)}},props:{title:String,description:String,href:String,icon:String}},x={class:"itemBig drop-shadow-md"},N={key:0,class:"icon"},V={class:"material-symbols-rounded"},D={class:"wrapper"};function L(e,d,i,o,I,t){return s(),c("div",x,[a("div",{class:"item h-full flex justify-between",onClick:d[0]||(d[0]=(...r)=>t.redirect&&t.redirect(...r))},[i.icon?(s(),c("div",N,[a("span",V,_(i.icon),1)])):l("",!0),a("div",D,[a("h4",null,_(i.title),1),a("p",null,_(i.description),1)])])])}const f=B($,[["render",L],["__scopeId","data-v-862e12eb"]]);const A={class:"padding-20"},E={class:"playlists"},H={components:{CollectionHeader:w,PlaylistItem:h,FullShelf:u,PlaylistItemBig:f},data(){return fetch("/api/me/liked").then(e=>e.json()).then(e=>{this.likedTracks=e}),fetch("/api/me/new").then(e=>e.json()).then(e=>{this.breakingTracks=e}),fetch("/api/spotify/playlists").then(e=>e.json()).then(e=>{this.spotifyPlaylists=e}),{likedTracks:null,breakingTracks:null,spotifyPlaylists:[]}}},O=Object.assign(H,{__name:"Playlists",setup(e){const d=j(),i=C(()=>d.playlists);return(o,I)=>(s(),c("div",A,[F(w),a("div",E,[v(i).length?(s(),n(u,{key:0,heading:"Playlists"},{default:P(()=>{var t,r,y,g,k,m;return[(r=(t=o.likedTracks)==null?void 0:t.songs)!=null&&r.length?(s(),n(f,{key:0,title:"Liked Songs",icon:"favorite",description:`${(g=(y=o.likedTracks)==null?void 0:y.songs)==null?void 0:g.length} liked songs`,href:"/collection/tracks"},null,8,["description"])):l("",!0),(m=(k=o.breakingTracks)==null?void 0:k.songs)!=null&&m.length?(s(),n(f,{key:1,title:"Breaking Songs",description:"your 25 newest songs",icon:"trending_up",href:"/collection/tracks/breaking"})):l("",!0),(s(!0),c(S,null,b(v(i),(p,T)=>(s(),n(h,{key:T,href:p.href,cover:p.cover,description:p.description,title:p.name,spotify:!1},null,8,["href","cover","description","title"]))),128))]}),_:1})):l("",!0),o.spotifyPlaylists.length?(s(),n(u,{key:1,heading:"Import From Spotify"},{default:P(()=>[(s(!0),c(S,null,b(o.spotifyPlaylists,(t,r)=>(s(),n(h,{key:r,cover:t.cover,description:t.description,title:t.name,id:t.id,spotify:!0,href:`https://open.spotify.com/playlist/${t.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})):l("",!0)])]))}}),U=B(O,[["__scopeId","data-v-e9d2a481"]]);export{U as default};
