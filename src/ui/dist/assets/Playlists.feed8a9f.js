import{F as V}from"./FullShelf.dd766911.js";import{F as B}from"./FindSources.4e939ca1.js";import{S as F}from"./SpotifyPlaylistEntry.57c6fc96.js";import{S as N}from"./SpotifyPlaylistHeader.dbd804e9.js";import{_ as A,e as a,l as H,o as n,c as r,g as u,w as S,a as e,m as y,v as U,F as C,i as T,t as f,q as g,b as L,f as b,d as M,s as j}from"./index.c9ec6f55.js";import{A as O}from"./AddAlbumToPlaylist.e1ea9b3e.js";import{C as D}from"./CollectionHeader.cb3ebd43.js";import"./MiniPlayer.ec59e54c.js";const E={name:"AddPlaylistToPlaylist",components:{FindSources:B,SpotifyPlaylistHeader:N,SpotifyPlaylistEntry:F},props:{cover:String,description:String,title:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.dTitle=t.title,this.$refs.album.value=t.album,this.dArtist=t.artists.join(", "),this.dCover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let t=0;t<this.playlist.length;t++)this.add(t)},add(t){const s=this.playlist[t],l=this.playlists.findIndex(h=>h==this.selectedPlaylist);if(console.log(s,l),l<0){alert("no playlist selected");return}fetch(`/api/playlists/${l}/tracks`,{method:"POST",body:JSON.stringify({source:s.src,title:s.title,artist:s.artists.join(", "),album:s.album,cover:s.cover})}).then(h=>{h.status==200&&(s.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("/api/playlists").then(t=>t.json()).then(t=>{this.playlists.length=0,this.playlists.push(...t)}),fetch(`/api/spotify/playlists/${this.id}`).then(t=>t.json()).then(t=>{this.playlist.length=0,this.playlist.push(...t)}))}}},J={class:"wrapper"},q={class:"header"},x=e("h3",null,"Import playlist",-1),R=e("span",{class:"material-icons-round"}," close ",-1),z=[R],G=e("h4",null,"To Playlist",-1),K=e("br",null,null,-1),Q={key:0},W=e("h4",null,"Source",-1),X={class:"content"},Y=e("h4",null,"Title",-1),Z={class:"content"},$=e("h4",null,"Album",-1),tt={class:"content"},et=e("h4",null,"Artist",-1),st={class:"content"},it=e("h4",null,"Cover",-1),lt={class:"content"},ot=["src"],nt={class:"confirm"},dt={key:1},rt=["src"],at={class:"details"},ct={class:"detailswrapper"},ut=["innerHTML"],pt=e("hr",null,null,-1),ht=e("hr",null,null,-1),_t={class:"confirm"};function yt(t,s,l,h,d,o){const _=a("FindSources"),p=a("h7"),k=a("spotify-playlist-header"),P=a("spotify-playlist-entry"),c=a("vue-final-modal"),m=H("observe-visibility");return n(),r("div",null,[u(c,{onClick:t.hideFindSourcesCtx,modelValue:d.showModal,"onUpdate:modelValue":s[13]||(s[13]=i=>d.showModal=i),classes:"modal-container","content-class":"addAlbumToPlaylistPopup"},{default:S(()=>[e("div",J,[e("div",q,[x,e("button",{class:"modal-close",onClick:s[0]||(s[0]=(...i)=>o.close&&o.close(...i))},z)]),G,y(e("select",{"onUpdate:modelValue":s[1]||(s[1]=i=>d.selectedPlaylist=i)},[(n(!0),r(C,null,T(d.playlists,i=>(n(),r("option",{key:i},f(i),1))),128))],512),[[U,d.selectedPlaylist]]),K,d.editSong?(n(),r("div",Q,[W,u(_,{ref:"findSources",src:t.dSource,title:l.title,artist:t.artist},{default:S(()=>[e("div",X,[y(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=i=>t.dSource=i),ref:"source"},null,512),[[g,t.dSource]]),e("span",{class:"material-icons-round more",ref:"sourceMore",onClick:s[3]||(s[3]=(...i)=>t.opencontextmenu&&t.opencontextmenu(...i))},"more_vert",512)])]),_:1},8,["src","title","artist"]),Y,e("div",Z,[y(e("input",{"onUpdate:modelValue":s[4]||(s[4]=i=>t.dTitle=i),type:"text"},null,512),[[g,t.dTitle]])]),$,e("div",tt,[y(e("input",{"onUpdate:modelValue":s[5]||(s[5]=i=>t.dAlbum=i),type:"text",ref:"album"},null,512),[[g,t.dAlbum]])]),et,e("div",st,[y(e("input",{"onUpdate:modelValue":s[6]||(s[6]=i=>t.dArtist=i),type:"text"},null,512),[[g,t.dArtist]])]),it,e("div",lt,[y(e("input",{type:"text",class:"addSong cover","onUpdate:modelValue":s[7]||(s[7]=i=>t.dCover=i),ref:"cover"},null,512),[[g,t.dCover]]),e("img",{onClick:s[8]||(s[8]=(...i)=>o.openInNewTab&&o.openInNewTab(...i)),class:"addSong cover",src:t.dCover?t.dCover:"/assets/img/music_placeholder.png"},null,8,ot)]),e("div",nt,[e("button",{onClick:s[9]||(s[9]=(...i)=>o.add&&o.add(...i)),class:"negative"},"Add")])])):(n(),r("div",dt,[y((n(),r("div",{class:"padding-20 playlisteditor",onClick:s[11]||(s[11]=(...i)=>t.editPlaylist&&t.editPlaylist(...i))},[e("img",{class:"cover",src:l.cover},null,8,rt),e("div",at,[e("div",ct,[u(p,null,{default:S(()=>[L("Playlist")]),_:1}),e("span",{class:"material-icons-round share",onClick:s[10]||(s[10]=(...i)=>o.share&&o.share(...i))},"share")]),e("h1",null,f(l.title),1),e("h5",{innerHTML:l.description},null,8,ut)])])),[[m,t.headerVisibilityChanged]]),pt,u(k),ht,(n(!0),r(C,null,T(d.playlist,(i,v)=>(n(),b(P,{onAdd:o.add,key:v,added:i.added,index:v,cover:i.cover,artist:i.artists.join(", "),title:i.title,source:i.src,album:i.album,preview:i.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128))])),e("div",_t,[e("button",{onClick:s[12]||(s[12]=(...i)=>o.addAll&&o.addAll(...i)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}const mt=A(E,[["render",yt]]);const ft={components:{AddPlaylistToPlaylist:mt},name:"PlaylistItem",methods:{redirect(){this.spotify?this.$refs.import.showModal=!0:this.$router.push(this.href)}},props:{cover:String,title:String,description:String,href:String,spotify:Boolean,id:String}},vt={class:"wrapper drop-shadow-md"},gt=["src"],St=["innerHTML"];function bt(t,s,l,h,d,o){const _=a("add-playlist-to-playlist");return n(),r("div",vt,[l.spotify?(n(),b(_,{key:0,cover:l.cover,href:l.href,title:l.title,description:l.description,id:l.id,ref:"import"},null,8,["cover","href","title","description","id"])):M("",!0),e("div",{class:"item",onClick:s[0]||(s[0]=(...p)=>o.redirect&&o.redirect(...p))},[e("img",{src:l.cover},null,8,gt),e("h4",null,f(l.title),1),e("p",{class:"hideIfMobile",innerHTML:l.description},null,8,St)])])}const kt=A(ft,[["render",bt],["__scopeId","data-v-0946cc54"]]);const Pt={components:{AddAlbumToPlaylist:O},name:"ReleaseItemBig",methods:{redirect(){this.$router.push(this.href)}},props:{title:String,description:String,href:String,icon:String}},wt={class:"itemBig drop-shadow-md"},Ct={key:0,class:"icon"},Tt={class:"material-symbols-rounded"},At={class:"wrapper"};function Mt(t,s,l,h,d,o){const _=a("add-album-to-playlist");return n(),r("div",wt,[u(_,{id:this.href.replace("https://open.spotify.com/album/",""),cover:t.cover,title:l.title,artist:t.artist,ref:"addAlbum"},null,8,["id","cover","title","artist"]),e("div",{class:"item h-full flex justify-between",onClick:s[0]||(s[0]=(...p)=>o.redirect&&o.redirect(...p))},[l.icon?(n(),r("div",Ct,[e("span",Tt,f(l.icon),1)])):M("",!0),e("div",At,[e("h4",null,f(l.title),1),e("p",null,f(l.description),1)])])])}const It=A(Pt,[["render",Mt],["__scopeId","data-v-f45f5240"]]);const Vt={components:{CollectionHeader:D,PlaylistItem:kt,FullShelf:V,PlaylistItemBig:It},computed:j({playlists:t=>t.playlists}),data(){return fetch("/api/me/liked").then(t=>t.json()).then(t=>{this.likedTracks=t}),fetch("/api/spotify/playlists").then(t=>t.json()).then(t=>{this.spotifyPlaylists=t}),{likedTracks:null,spotifyPlaylists:[]}}},Bt={class:"padding-20"},Ft={class:"playlists"};function Nt(t,s,l,h,d,o){const _=a("CollectionHeader"),p=a("playlist-item-big"),k=a("playlist-item"),P=a("full-shelf");return n(),r("div",Bt,[u(_),e("div",Ft,[u(P,{heading:"Playlists"},{default:S(()=>{var c,m,i,v;return[(m=(c=d.likedTracks)==null?void 0:c.songs)!=null&&m.length?(n(),b(p,{key:0,title:"Liked Songs",icon:"favorite",description:`${(v=(i=d.likedTracks)==null?void 0:i.songs)==null?void 0:v.length} liked songs`,href:"/collection/tracks"},null,8,["description"])):M("",!0),u(p,{title:"Breaking Songs",description:"your 25 newest songs",icon:"trending_up",href:"/collection/tracks/breaking"}),(n(!0),r(C,null,T(t.playlists,(w,I)=>(n(),b(k,{key:I,href:w.href,cover:w.cover,description:w.description,title:w.name,spotify:!1},null,8,["href","cover","description","title"]))),128))]}),_:1}),u(P,{heading:"Import From Spotify"},{default:S(()=>[(n(!0),r(C,null,T(d.spotifyPlaylists,(c,m)=>(n(),b(k,{key:m,cover:c.cover,description:c.description,title:c.name,id:c.id,spotify:!0,href:`https://open.spotify.com/playlist/${c.id}`},null,8,["cover","description","title","id","href"]))),128))]),_:1})])])}const qt=A(Vt,[["render",Nt],["__scopeId","data-v-532d1157"]]);export{qt as default};
