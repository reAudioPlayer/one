import{F as N}from"./FullShelf.09e50460.js";import{F}from"./FindSources.654050db.js";import{S as B}from"./SpotifyPlaylistEntry.e306e11e.js";import{S as H}from"./SpotifyPlaylistHeader.73d2ef83.js";import{_ as A,g as c,i as O,o as n,c as r,b as h,w as S,a as s,j as m,v as j,F as T,d as C,t as P,k as g,e as b,p as U,h as L,l as J,f as V}from"./index.3ba6d211.js";import{A as D}from"./AddAlbumToPlaylist.f87b21ef.js";import{C as x}from"./CollectionHeader.78de7748.js";import"./MiniPlayer.416aaa7c.js";const E={name:"AddPlaylistToPlaylist",components:{FindSources:F,SpotifyPlaylistHeader:H,SpotifyPlaylistEntry:B},props:{cover:String,description:String,title:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("http://localhost:1234/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.dTitle=t.title,this.$refs.album.value=t.album,this.dArtist=t.artists.join(", "),this.dCover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let t=0;t<this.playlist.length;t++)this.add(t)},add(t){const e=this.playlist[t],i=this.playlists.findIndex(a=>a==this.selectedPlaylist);if(console.log(e,i),i<0){alert("no playlist selected");return}fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:i,source:e.src,title:e.title,artist:e.artists.join(", "),album:e.album,cover:e.cover})}).then(a=>{a.status==200&&(e.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("http://localhost:1234/api/playlists").then(t=>t.json()).then(t=>{this.playlists.length=0,this.playlists.push(...t)}),fetch("http://localhost:1234/api/spotify/playlist",{method:"POST",body:JSON.stringify({playlistId:this.id})}).then(t=>t.json()).then(t=>{this.playlist.length=0,this.playlist.push(...t)}))}}},p=t=>(U("data-v-bc5343ae"),t=t(),L(),t),R={class:"wrapper"},q={class:"header"},z=p(()=>s("h3",null,"Import playlist",-1)),G=p(()=>s("span",{class:"material-icons-round"}," close ",-1)),K=[G],Q=p(()=>s("h4",null,"To Playlist",-1)),W=p(()=>s("br",null,null,-1)),X={key:0},Y=p(()=>s("h4",null,"Source",-1)),Z={class:"content"},$=p(()=>s("h4",null,"Title",-1)),tt={class:"content"},et=p(()=>s("h4",null,"Album",-1)),st={class:"content"},lt=p(()=>s("h4",null,"Artist",-1)),it={class:"content"},ot=p(()=>s("h4",null,"Cover",-1)),nt={class:"content"},dt=["src"],rt={class:"confirm"},at={key:1},ct=["src"],pt={class:"details"},ut={class:"detailswrapper"},ht=J("Playlist"),_t=["innerHTML"],yt=p(()=>s("hr",null,null,-1)),mt=p(()=>s("hr",null,null,-1)),ft={class:"confirm"};function vt(t,e,i,a,d,o){const _=c("FindSources"),y=c("h7"),k=c("spotify-playlist-header"),w=c("spotify-playlist-entry"),u=c("vue-final-modal"),f=O("observe-visibility");return n(),r("div",null,[h(u,{onClick:t.hideFindSourcesCtx,modelValue:d.showModal,"onUpdate:modelValue":e[13]||(e[13]=l=>d.showModal=l),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:S(()=>[s("div",R,[s("div",q,[z,s("button",{class:"modal-close",onClick:e[0]||(e[0]=(...l)=>o.close&&o.close(...l))},K)]),Q,m(s("select",{"onUpdate:modelValue":e[1]||(e[1]=l=>d.selectedPlaylist=l)},[(n(!0),r(T,null,C(d.playlists,l=>(n(),r("option",{key:l},P(l),1))),128))],512),[[j,d.selectedPlaylist]]),W,d.editSong?(n(),r("div",X,[Y,h(_,{ref:"findSources",title:i.title,artist:t.artist},{default:S(()=>[s("div",Z,[m(s("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=l=>t.dSource=l),ref:"source"},null,512),[[g,t.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[3]||(e[3]=(...l)=>t.opencontextmenu&&t.opencontextmenu(...l))},"more_vert",512)])]),_:1},8,["title","artist"]),$,s("div",tt,[m(s("input",{"onUpdate:modelValue":e[4]||(e[4]=l=>t.dTitle=l),type:"text"},null,512),[[g,t.dTitle]])]),et,s("div",st,[m(s("input",{"onUpdate:modelValue":e[5]||(e[5]=l=>t.dAlbum=l),type:"text",ref:"album"},null,512),[[g,t.dAlbum]])]),lt,s("div",it,[m(s("input",{"onUpdate:modelValue":e[6]||(e[6]=l=>t.dArtist=l),type:"text"},null,512),[[g,t.dArtist]])]),ot,s("div",nt,[m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[7]||(e[7]=l=>t.dCover=l),ref:"cover"},null,512),[[g,t.dCover]]),s("img",{onClick:e[8]||(e[8]=(...l)=>o.openInNewTab&&o.openInNewTab(...l)),class:"addSong cover",src:t.dCover?t.dCover:"/assets/img/music_placeholder.png"},null,8,dt)]),s("div",rt,[s("button",{onClick:e[9]||(e[9]=(...l)=>o.add&&o.add(...l)),class:"negative"},"Add")])])):(n(),r("div",at,[m((n(),r("div",{class:"padding-20 playlisteditor",onClick:e[11]||(e[11]=(...l)=>t.editPlaylist&&t.editPlaylist(...l))},[s("img",{class:"cover",src:i.cover},null,8,ct),s("div",pt,[s("div",ut,[h(y,null,{default:S(()=>[ht]),_:1}),s("span",{class:"material-icons-round share",onClick:e[10]||(e[10]=(...l)=>o.share&&o.share(...l))},"share")]),s("h1",null,P(i.title),1),s("h5",{innerHTML:i.description},null,8,_t)])])),[[f,t.headerVisibilityChanged]]),yt,h(k),mt,(n(!0),r(T,null,C(d.playlist,(l,v)=>(n(),b(w,{onAdd:o.add,key:v,added:l.added,index:v,cover:l.cover,artist:l.artists.join(", "),title:l.title,source:l.source,album:l.album,preview:l.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128))])),s("div",ft,[s("button",{onClick:e[12]||(e[12]=(...l)=>o.addAll&&o.addAll(...l)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}var gt=A(E,[["render",vt],["__scopeId","data-v-bc5343ae"]]);const St={components:{AddPlaylistToPlaylist:gt},name:"PlaylistItem",methods:{redirect(){this.spotify?this.$refs.import.showModal=!0:this.$router.push(this.href)}},props:{cover:String,title:String,description:String,href:String,spotify:Boolean,id:String}},bt={class:"wrapper"},Pt=["src"],kt=["innerHTML"];function wt(t,e,i,a,d,o){const _=c("add-playlist-to-playlist");return n(),r("div",bt,[i.spotify?(n(),b(_,{key:0,cover:i.cover,href:i.href,title:i.title,description:i.description,id:i.id,ref:"import"},null,8,["cover","href","title","description","id"])):V("",!0),s("div",{class:"item",onClick:e[0]||(e[0]=(...y)=>o.redirect&&o.redirect(...y))},[s("img",{src:i.cover},null,8,Pt),s("h4",null,P(i.title),1),s("p",{innerHTML:i.description},null,8,kt)])])}var Tt=A(St,[["render",wt],["__scopeId","data-v-76a7596c"]]);const Ct={components:{AddAlbumToPlaylist:D},name:"ReleaseItemBig",methods:{redirect(){this.$router.push(this.href)}},props:{title:String,description:String,href:String}},At={class:"itemBig"},It={class:"wrapper"};function Mt(t,e,i,a,d,o){const _=c("add-album-to-playlist");return n(),r("div",At,[h(_,{id:this.href.replace("https://open.spotify.com/album/",""),cover:t.cover,title:i.title,artist:t.artist,ref:"addAlbum"},null,8,["id","cover","title","artist"]),s("div",{class:"item",onClick:e[0]||(e[0]=(...y)=>o.redirect&&o.redirect(...y))},[s("div",It,[s("h4",null,P(i.title),1),s("p",null,P(i.description),1)])])])}var Vt=A(Ct,[["render",Mt],["__scopeId","data-v-a5dc3564"]]);const Nt={components:{CollectionHeader:x,PlaylistItem:Tt,FullShelf:N,PlaylistItemBig:Vt},name:"Playlists",data(){return fetch("http://localhost:1234/api/playlists").then(t=>t.json()).then(async t=>{for(let e=0;e<t.length;e++){const a=await(await fetch("http://localhost:1234/api/playlist",{method:"POST",body:JSON.stringify({id:e})})).json();this.playlists.push({name:a.name,description:a.description,cover:a.songs[0].cover})}}),fetch("http://localhost:1234/api/collection/tracks").then(t=>t.json()).then(t=>{this.likedTracks=t}),fetch("http://localhost:1234/api/spotify/playlists").then(t=>t.json()).then(t=>{this.spotifyPlaylists=t}),{playlists:[],likedTracks:null,spotifyPlaylists:[]}}},Ft={class:"padding-20"},Bt={class:"playlists"};function Ht(t,e,i,a,d,o){const _=c("CollectionHeader"),y=c("playlist-item-big"),k=c("playlist-item"),w=c("full-shelf");return n(),r("div",Ft,[h(_),s("div",Bt,[h(w,{heading:"Playlists"},{default:S(()=>{var u,f,l,v;return[(f=(u=d.likedTracks)==null?void 0:u.songs)!=null&&f.length?(n(),b(y,{key:0,title:"Liked Songs",description:`${(v=(l=d.likedTracks)==null?void 0:l.songs)==null?void 0:v.length} liked Songs`,href:"/collection/tracks"},null,8,["description"])):V("",!0),(n(!0),r(T,null,C(d.playlists,(I,M)=>(n(),b(k,{key:M,href:`/playlist/${M}`,cover:I.cover,description:I.description,title:I.name,spotify:!1},null,8,["href","cover","description","title"]))),128))]}),_:1}),h(w,{heading:"Import From Spotify"},{default:S(()=>[(n(!0),r(T,null,C(d.spotifyPlaylists,(u,f)=>(n(),b(k,{key:f,cover:u.cover,description:u.description,title:u.name,id:u.id,spotify:!0,href:`https://open.spotify.com/playlist/${u.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})])])}var Rt=A(Nt,[["render",Ht],["__scopeId","data-v-e4a49c24"]]);export{Rt as default};
