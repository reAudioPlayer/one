import{F as N}from"./FullShelf.d5f5d714.js";import{F}from"./FindSources.8dccc6fe.js";import{S as B}from"./SpotifyPlaylistEntry.610d209a.js";import{S as H}from"./SpotifyPlaylistHeader.b9497735.js";import{_ as A,g as c,i as O,o as n,c as r,b as _,w as S,a as s,j as m,v as j,F as T,d as C,t as P,k as g,e as b,p as U,h as L,l as J,f as V}from"./index.450f4d87.js";import{A as D}from"./AddAlbumToPlaylist.c8f3ef64.js";import{C as x}from"./CollectionHeader.57686fdb.js";import"./MiniPlayer.ee1a3e92.js";const E={name:"AddPlaylistToPlaylist",components:{FindSources:F,SpotifyPlaylistHeader:H,SpotifyPlaylistEntry:B},props:{cover:String,description:String,title:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.dTitle=t.title,this.$refs.album.value=t.album,this.dArtist=t.artists.join(", "),this.dCover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let t=0;t<this.playlist.length;t++)this.add(t)},add(t){const e=this.playlist[t],l=this.playlists.findIndex(a=>a==this.selectedPlaylist);if(console.log(e,l),l<0){alert("no playlist selected");return}fetch("/api/add",{method:"POST",body:JSON.stringify({id:l,source:e.src,title:e.title,artist:e.artists.join(", "),album:e.album,cover:e.cover})}).then(a=>{a.status==200&&(e.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("/api/playlists").then(t=>t.json()).then(t=>{this.playlists.length=0,this.playlists.push(...t)}),fetch("/api/spotify/playlist",{method:"POST",body:JSON.stringify({playlistId:this.id})}).then(t=>t.json()).then(t=>{this.playlist.length=0,this.playlist.push(...t)}))}}},p=t=>(U("data-v-0eb2ce0b"),t=t(),L(),t),R={class:"wrapper"},q={class:"header"},z=p(()=>s("h3",null,"Import playlist",-1)),G=p(()=>s("span",{class:"material-icons-round"}," close ",-1)),K=[G],Q=p(()=>s("h4",null,"To Playlist",-1)),W=p(()=>s("br",null,null,-1)),X={key:0},Y=p(()=>s("h4",null,"Source",-1)),Z={class:"content"},$=p(()=>s("h4",null,"Title",-1)),tt={class:"content"},et=p(()=>s("h4",null,"Album",-1)),st={class:"content"},it=p(()=>s("h4",null,"Artist",-1)),lt={class:"content"},ot=p(()=>s("h4",null,"Cover",-1)),nt={class:"content"},dt=["src"],rt={class:"confirm"},at={key:1},ct=["src"],pt={class:"details"},ut={class:"detailswrapper"},_t=J("Playlist"),ht=["innerHTML"],yt=p(()=>s("hr",null,null,-1)),mt=p(()=>s("hr",null,null,-1)),ft={class:"confirm"};function vt(t,e,l,a,d,o){const h=c("FindSources"),y=c("h7"),k=c("spotify-playlist-header"),w=c("spotify-playlist-entry"),u=c("vue-final-modal"),f=O("observe-visibility");return n(),r("div",null,[_(u,{onClick:t.hideFindSourcesCtx,modelValue:d.showModal,"onUpdate:modelValue":e[13]||(e[13]=i=>d.showModal=i),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:S(()=>[s("div",R,[s("div",q,[z,s("button",{class:"modal-close",onClick:e[0]||(e[0]=(...i)=>o.close&&o.close(...i))},K)]),Q,m(s("select",{"onUpdate:modelValue":e[1]||(e[1]=i=>d.selectedPlaylist=i)},[(n(!0),r(T,null,C(d.playlists,i=>(n(),r("option",{key:i},P(i),1))),128))],512),[[j,d.selectedPlaylist]]),W,d.editSong?(n(),r("div",X,[Y,_(h,{ref:"findSources",title:l.title,artist:t.artist},{default:S(()=>[s("div",Z,[m(s("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=i=>t.dSource=i),ref:"source"},null,512),[[g,t.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[3]||(e[3]=(...i)=>t.opencontextmenu&&t.opencontextmenu(...i))},"more_vert",512)])]),_:1},8,["title","artist"]),$,s("div",tt,[m(s("input",{"onUpdate:modelValue":e[4]||(e[4]=i=>t.dTitle=i),type:"text"},null,512),[[g,t.dTitle]])]),et,s("div",st,[m(s("input",{"onUpdate:modelValue":e[5]||(e[5]=i=>t.dAlbum=i),type:"text",ref:"album"},null,512),[[g,t.dAlbum]])]),it,s("div",lt,[m(s("input",{"onUpdate:modelValue":e[6]||(e[6]=i=>t.dArtist=i),type:"text"},null,512),[[g,t.dArtist]])]),ot,s("div",nt,[m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[7]||(e[7]=i=>t.dCover=i),ref:"cover"},null,512),[[g,t.dCover]]),s("img",{onClick:e[8]||(e[8]=(...i)=>o.openInNewTab&&o.openInNewTab(...i)),class:"addSong cover",src:t.dCover?t.dCover:"/assets/img/music_placeholder.png"},null,8,dt)]),s("div",rt,[s("button",{onClick:e[9]||(e[9]=(...i)=>o.add&&o.add(...i)),class:"negative"},"Add")])])):(n(),r("div",at,[m((n(),r("div",{class:"padding-20 playlisteditor",onClick:e[11]||(e[11]=(...i)=>t.editPlaylist&&t.editPlaylist(...i))},[s("img",{class:"cover",src:l.cover},null,8,ct),s("div",pt,[s("div",ut,[_(y,null,{default:S(()=>[_t]),_:1}),s("span",{class:"material-icons-round share",onClick:e[10]||(e[10]=(...i)=>o.share&&o.share(...i))},"share")]),s("h1",null,P(l.title),1),s("h5",{innerHTML:l.description},null,8,ht)])])),[[f,t.headerVisibilityChanged]]),yt,_(k),mt,(n(!0),r(T,null,C(d.playlist,(i,v)=>(n(),b(w,{onAdd:o.add,key:v,added:i.added,index:v,cover:i.cover,artist:i.artists.join(", "),title:i.title,source:i.source,album:i.album,preview:i.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128))])),s("div",ft,[s("button",{onClick:e[12]||(e[12]=(...i)=>o.addAll&&o.addAll(...i)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}var gt=A(E,[["render",vt],["__scopeId","data-v-0eb2ce0b"]]);const St={components:{AddPlaylistToPlaylist:gt},name:"PlaylistItem",methods:{redirect(){this.spotify?this.$refs.import.showModal=!0:this.$router.push(this.href)}},props:{cover:String,title:String,description:String,href:String,spotify:Boolean,id:String}},bt={class:"wrapper"},Pt=["src"],kt=["innerHTML"];function wt(t,e,l,a,d,o){const h=c("add-playlist-to-playlist");return n(),r("div",bt,[l.spotify?(n(),b(h,{key:0,cover:l.cover,href:l.href,title:l.title,description:l.description,id:l.id,ref:"import"},null,8,["cover","href","title","description","id"])):V("",!0),s("div",{class:"item",onClick:e[0]||(e[0]=(...y)=>o.redirect&&o.redirect(...y))},[s("img",{src:l.cover},null,8,Pt),s("h4",null,P(l.title),1),s("p",{innerHTML:l.description},null,8,kt)])])}var Tt=A(St,[["render",wt],["__scopeId","data-v-76a7596c"]]);const Ct={components:{AddAlbumToPlaylist:D},name:"ReleaseItemBig",methods:{redirect(){this.$router.push(this.href)}},props:{title:String,description:String,href:String}},At={class:"itemBig"},It={class:"wrapper"};function Mt(t,e,l,a,d,o){const h=c("add-album-to-playlist");return n(),r("div",At,[_(h,{id:this.href.replace("https://open.spotify.com/album/",""),cover:t.cover,title:l.title,artist:t.artist,ref:"addAlbum"},null,8,["id","cover","title","artist"]),s("div",{class:"item",onClick:e[0]||(e[0]=(...y)=>o.redirect&&o.redirect(...y))},[s("div",It,[s("h4",null,P(l.title),1),s("p",null,P(l.description),1)])])])}var Vt=A(Ct,[["render",Mt],["__scopeId","data-v-a5dc3564"]]);const Nt={components:{CollectionHeader:x,PlaylistItem:Tt,FullShelf:N,PlaylistItemBig:Vt},name:"Playlists",data(){return fetch("/api/playlists").then(t=>t.json()).then(async t=>{for(let e=0;e<t.length;e++){const a=await(await fetch("/api/playlist",{method:"POST",body:JSON.stringify({id:e})})).json();this.playlists.push({name:a.name,description:a.description,cover:a.songs[0].cover})}}),fetch("/api/collection/tracks").then(t=>t.json()).then(t=>{this.likedTracks=t}),fetch("/api/spotify/playlists").then(t=>t.json()).then(t=>{this.spotifyPlaylists=t}),{playlists:[],likedTracks:null,spotifyPlaylists:[]}}},Ft={class:"padding-20"},Bt={class:"playlists"};function Ht(t,e,l,a,d,o){const h=c("CollectionHeader"),y=c("playlist-item-big"),k=c("playlist-item"),w=c("full-shelf");return n(),r("div",Ft,[_(h),s("div",Bt,[_(w,{heading:"Playlists"},{default:S(()=>{var u,f,i,v;return[(f=(u=d.likedTracks)==null?void 0:u.songs)!=null&&f.length?(n(),b(y,{key:0,title:"Liked Songs",description:`${(v=(i=d.likedTracks)==null?void 0:i.songs)==null?void 0:v.length} liked Songs`,href:"/collection/tracks"},null,8,["description"])):V("",!0),(n(!0),r(T,null,C(d.playlists,(I,M)=>(n(),b(k,{key:M,href:`/playlist/${M}`,cover:I.cover,description:I.description,title:I.name,spotify:!1},null,8,["href","cover","description","title"]))),128))]}),_:1}),_(w,{heading:"Import From Spotify"},{default:S(()=>[(n(!0),r(T,null,C(d.spotifyPlaylists,(u,f)=>(n(),b(k,{key:f,cover:u.cover,description:u.description,title:u.name,id:u.id,spotify:!0,href:`https://open.spotify.com/playlist/${u.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})])])}var Rt=A(Nt,[["render",Ht],["__scopeId","data-v-1f09187a"]]);export{Rt as default};
