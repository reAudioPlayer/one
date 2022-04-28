import{F as I}from"./FindSources.8dccc6fe.js";import{S as V}from"./SpotifyPlaylistEntry.610d209a.js";import{S as N}from"./SpotifyPlaylistHeader.b9497735.js";import{_ as T,g as c,i as F,o as d,c as a,b as h,w as f,a as s,j as u,v as O,F as g,d as w,t as v,k as _,e as A,p as B,h as U,l as k,f as H}from"./index.450f4d87.js";const J={name:"AddArtistToPlaylist",components:{FindSources:I,SpotifyPlaylistHeader:N,SpotifyPlaylistEntry:V},props:{cover:String,description:String,name:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],recommendations:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(e=>e.json()).then(e=>{console.log(e),this.dTitle=e.title,this.$refs.album.value=e.album,this.dArtist=e.artists.join(", "),this.dCover=e.cover,this.$refs.source.value=e.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let e=0;e<this.playlist.length;e++)this.add(e)},add(e){this.addTrack(this.playlist[e])},addRec(e){this.addTrack(this.recommendations[e])},addTrack(e){const o=this.playlists.findIndex(l=>l==this.selectedPlaylist);if(console.log(e,o),o<0){alert("no playlist selected");return}fetch("/api/add",{method:"POST",body:JSON.stringify({id:o,source:e.src,title:e.title,artist:e.artists.join(", "),album:e.album,cover:e.cover})}).then(l=>{l.status==200&&(e.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("/api/playlists").then(e=>e.json()).then(e=>{this.playlists.length=0,this.playlists.push(...e)}),fetch("/api/spotify/artist",{method:"POST",body:JSON.stringify({artistId:this.id})}).then(e=>e.json()).then(e=>{this.playlist.length=0,this.playlist.push(...e)}),fetch("/api/spotify/recommend",{method:"POST",body:JSON.stringify({artists:[this.id]})}).then(e=>e.json()).then(e=>{this.recommendations.length=0,this.recommendations.push(...e)}))}}},n=e=>(B("data-v-6c3c2d29"),e=e(),U(),e),L={class:"wrapper"},j={class:"header"},D=n(()=>s("h3",null,"Import playlist",-1)),R=n(()=>s("span",{class:"material-icons-round"}," close ",-1)),E=[R],x=n(()=>s("h4",null,"To Playlist",-1)),q=n(()=>s("br",null,null,-1)),z={key:0},G=n(()=>s("h4",null,"Source",-1)),K={class:"content"},Q=n(()=>s("h4",null,"Title",-1)),W={class:"content"},X=n(()=>s("h4",null,"Album",-1)),Y={class:"content"},Z=n(()=>s("h4",null,"Artist",-1)),$={class:"content"},ee=n(()=>s("h4",null,"Cover",-1)),te={class:"content"},se=["src"],oe={class:"confirm"},le={key:1},ie=["src"],ne={class:"details"},de={class:"detailswrapper"},re=k("Artist"),ae=["innerHTML"],ue=n(()=>s("hr",null,null,-1)),ce=n(()=>s("hr",null,null,-1)),he=n(()=>s("hr",null,null,-1)),me=n(()=>s("hr",null,null,-1)),pe={class:"confirm"};function _e(e,o,l,C,r,i){const y=c("FindSources"),m=c("h7"),S=c("spotify-playlist-header"),b=c("spotify-playlist-entry"),P=c("vue-final-modal"),M=F("observe-visibility");return d(),a("div",null,[h(P,{onClick:e.hideFindSourcesCtx,modelValue:r.showModal,"onUpdate:modelValue":o[13]||(o[13]=t=>r.showModal=t),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:f(()=>[s("div",L,[s("div",j,[D,s("button",{class:"modal-close",onClick:o[0]||(o[0]=(...t)=>i.close&&i.close(...t))},E)]),x,u(s("select",{"onUpdate:modelValue":o[1]||(o[1]=t=>r.selectedPlaylist=t)},[(d(!0),a(g,null,w(r.playlists,t=>(d(),a("option",{key:t},v(t),1))),128))],512),[[O,r.selectedPlaylist]]),q,r.editSong?(d(),a("div",z,[G,h(y,{ref:"findSources",title:e.title,artist:e.artist},{default:f(()=>[s("div",K,[u(s("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=t=>e.dSource=t),ref:"source"},null,512),[[_,e.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:o[3]||(o[3]=(...t)=>e.opencontextmenu&&e.opencontextmenu(...t))},"more_vert",512)])]),_:1},8,["title","artist"]),Q,s("div",W,[u(s("input",{"onUpdate:modelValue":o[4]||(o[4]=t=>e.dTitle=t),type:"text"},null,512),[[_,e.dTitle]])]),X,s("div",Y,[u(s("input",{"onUpdate:modelValue":o[5]||(o[5]=t=>e.dAlbum=t),type:"text",ref:"album"},null,512),[[_,e.dAlbum]])]),Z,s("div",$,[u(s("input",{"onUpdate:modelValue":o[6]||(o[6]=t=>e.dArtist=t),type:"text"},null,512),[[_,e.dArtist]])]),ee,s("div",te,[u(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":o[7]||(o[7]=t=>e.dCover=t),ref:"cover"},null,512),[[_,e.dCover]]),s("img",{onClick:o[8]||(o[8]=(...t)=>i.openInNewTab&&i.openInNewTab(...t)),class:"addSong cover",src:e.dCover?e.dCover:"/assets/img/music_placeholder.png"},null,8,se)]),s("div",oe,[s("button",{onClick:o[9]||(o[9]=(...t)=>i.add&&i.add(...t)),class:"negative"},"Add")])])):(d(),a("div",le,[u((d(),a("div",{class:"padding-20 playlisteditor",onClick:o[11]||(o[11]=(...t)=>e.editPlaylist&&e.editPlaylist(...t))},[s("img",{class:"cover",src:l.cover},null,8,ie),s("div",ne,[s("div",de,[h(m,null,{default:f(()=>[re]),_:1}),s("span",{class:"material-icons-round share",onClick:o[10]||(o[10]=(...t)=>i.share&&i.share(...t))},"share")]),s("h1",null,v(l.name),1),s("h5",{innerHTML:l.description},null,8,ae)])])),[[M,e.headerVisibilityChanged]]),ue,h(S),ce,(d(!0),a(g,null,w(r.playlist,(t,p)=>(d(),A(b,{onAdd:i.add,key:p,added:t.added,index:p,cover:t.cover,artist:t.artists.join(", "),title:t.title,source:t.source,album:t.album,preview:t.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128)),s("h5",null,v("Recommendations based on "+l.name),1),he,h(S),me,(d(!0),a(g,null,w(r.recommendations,(t,p)=>(d(),A(b,{onAdd:i.addRec,key:p,added:t.added,index:p,cover:t.cover,artist:t.artists.join(", "),title:t.title,source:t.source,album:t.album,preview:t.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128))])),s("div",pe,[s("button",{onClick:o[12]||(o[12]=(...t)=>i.addAll&&i.addAll(...t)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}var ve=T(J,[["render",_e],["__scopeId","data-v-6c3c2d29"]]);const ye={components:{AddArtistToPlaylist:ve},name:"ArtistItem",methods:{redirect(){this.$refs.import.showModal=!0},follow(e){e.stopPropagation();const o=this.following?"unfollow":"follow";fetch("/api/spotify/"+o,{method:"POST",body:JSON.stringify({artistId:this.id})}).then(l=>{l.status==200&&(this.following=!this.following)})}},data(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}},fe={class:"wrapper"},ge=["src"],we=["innerHTML"];function Se(e,o,l,C,r,i){const y=c("add-artist-to-playlist");return d(),a("div",fe,[h(y,{cover:l.cover,name:l.name,description:l.description,id:l.id,href:`https://open.spotify.com/artist/${l.id}`,ref:"import"},null,8,["cover","name","description","id","href"]),s("div",{class:"item",onClick:o[1]||(o[1]=(...m)=>i.redirect&&i.redirect(...m))},[s("img",{src:l.cover},null,8,ge),s("h4",null,v(l.name),1),s("p",{innerHTML:l.description},null,8,we),l.showFollowButton?(d(),a("button",{key:0,onClick:o[0]||(o[0]=(...m)=>i.follow&&i.follow(...m)),class:"followButton"},v(r.following?"Following":"Follow"),1)):H("",!0)])])}var Pe=T(ye,[["render",Se],["__scopeId","data-v-6fb14d4b"]]);export{Pe as A};