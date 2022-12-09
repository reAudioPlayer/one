import{F as u}from"./FullShelf.c1e377c6.js";import{P as m}from"./PlaylistItem.1493a894.js";import{A as w}from"./AddAlbumToPlaylist.d86c6b0d.js";import{_ as b,e as C,o as s,c as l,g as a,a as r,t as _,d as P,i as A,A as F,w as g,f,F as k,h as v,u as T}from"./index.12f03f32.js";import{C as S}from"./CollectionHeader.134e93fb.js";import"./song.e52b21df.js";import"./TrackInfo.517dd8b6.js";import"./AlbumHeader.71370c16.js";import"./MiniPlayer.833aaa56.js";import"./FindSources.ffe3bb4a.js";const j={components:{AddAlbumToPlaylist:w},name:"ReleaseItemBig",methods:{redirect(){this.$router.push(this.href)}},props:{title:String,description:String,href:String,icon:String}},x={class:"itemBig drop-shadow-md"},N={key:0,class:"icon"},V={class:"material-symbols-rounded"},$={class:"wrapper"};function D(t,n,i,c,B,e){const o=C("add-album-to-playlist");return s(),l("div",x,[a(o,{id:this.href.replace("https://open.spotify.com/album/",""),cover:t.cover,title:i.title,artist:t.artist,ref:"addAlbum"},null,8,["id","cover","title","artist"]),r("div",{class:"item h-full flex justify-between",onClick:n[0]||(n[0]=(...d)=>e.redirect&&e.redirect(...d))},[i.icon?(s(),l("div",N,[r("span",V,_(i.icon),1)])):P("",!0),r("div",$,[r("h4",null,_(i.title),1),r("p",null,_(i.description),1)])])])}const h=b(j,[["render",D],["__scopeId","data-v-f45f5240"]]);const L={class:"padding-20"},E={class:"playlists"},H={components:{CollectionHeader:S,PlaylistItem:m,FullShelf:u,PlaylistItemBig:h},data(){return fetch("/api/me/liked").then(t=>t.json()).then(t=>{this.likedTracks=t}),fetch("/api/spotify/playlists").then(t=>t.json()).then(t=>{this.spotifyPlaylists=t}),{likedTracks:null,spotifyPlaylists:[]}}},O=Object.assign(H,{__name:"Playlists",setup(t){const n=A(),i=F(()=>n.playlists);return(c,B)=>(s(),l("div",L,[a(S),r("div",E,[a(u,{heading:"Playlists"},{default:g(()=>{var e,o,d,y;return[(o=(e=c.likedTracks)==null?void 0:e.songs)!=null&&o.length?(s(),f(h,{key:0,title:"Liked Songs",icon:"favorite",description:`${(y=(d=c.likedTracks)==null?void 0:d.songs)==null?void 0:y.length} liked songs`,href:"/collection/tracks"},null,8,["description"])):P("",!0),a(h,{title:"Breaking Songs",description:"your 25 newest songs",icon:"trending_up",href:"/collection/tracks/breaking"}),(s(!0),l(k,null,v(T(i),(p,I)=>(s(),f(m,{key:I,href:p.href,cover:p.cover,description:p.description,title:p.name,spotify:!1},null,8,["href","cover","description","title"]))),128))]}),_:1}),a(u,{heading:"Import From Spotify"},{default:g(()=>[(s(!0),l(k,null,v(c.spotifyPlaylists,(e,o)=>(s(),f(m,{key:o,cover:e.cover,description:e.description,title:e.name,id:e.id,spotify:!0,href:`https://open.spotify.com/playlist/${e.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})])]))}}),X=b(O,[["__scopeId","data-v-1bb482d7"]]);export{X as default};
