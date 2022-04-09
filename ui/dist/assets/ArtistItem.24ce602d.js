import{F as I}from"./FindSources.654050db.js";import{S as V}from"./SpotifyPlaylistEntry.e306e11e.js";import{S as N}from"./SpotifyPlaylistHeader.73d2ef83.js";import{_ as T,g as c,i as F,o as d,c as a,b as h,w as f,a as s,j as u,v as O,F as g,d as w,t as v,k as _,e as A,p as B,h as U,l as k,f as H}from"./index.3ba6d211.js";const J={name:"AddArtistToPlaylist",components:{FindSources:I,SpotifyPlaylistHeader:N,SpotifyPlaylistEntry:V},props:{cover:String,description:String,name:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],recommendations:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("http://localhost:1234/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.dTitle=t.title,this.$refs.album.value=t.album,this.dArtist=t.artists.join(", "),this.dCover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let t=0;t<this.playlist.length;t++)this.add(t)},add(t){this.addTrack(this.playlist[t])},addRec(t){this.addTrack(this.recommendations[t])},addTrack(t){const o=this.playlists.findIndex(l=>l==this.selectedPlaylist);if(console.log(t,o),o<0){alert("no playlist selected");return}fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:o,source:t.src,title:t.title,artist:t.artists.join(", "),album:t.album,cover:t.cover})}).then(l=>{l.status==200&&(t.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("http://localhost:1234/api/playlists").then(t=>t.json()).then(t=>{this.playlists.length=0,this.playlists.push(...t)}),fetch("http://localhost:1234/api/spotify/artist",{method:"POST",body:JSON.stringify({artistId:this.id})}).then(t=>t.json()).then(t=>{this.playlist.length=0,this.playlist.push(...t)}),fetch("http://localhost:1234/api/spotify/recommend",{method:"POST",body:JSON.stringify({artists:[this.id]})}).then(t=>t.json()).then(t=>{this.recommendations.length=0,this.recommendations.push(...t)}))}}},n=t=>(B("data-v-240d1eac"),t=t(),U(),t),L={class:"wrapper"},j={class:"header"},D=n(()=>s("h3",null,"Import playlist",-1)),R=n(()=>s("span",{class:"material-icons-round"}," close ",-1)),E=[R],x=n(()=>s("h4",null,"To Playlist",-1)),q=n(()=>s("br",null,null,-1)),z={key:0},G=n(()=>s("h4",null,"Source",-1)),K={class:"content"},Q=n(()=>s("h4",null,"Title",-1)),W={class:"content"},X=n(()=>s("h4",null,"Album",-1)),Y={class:"content"},Z=n(()=>s("h4",null,"Artist",-1)),$={class:"content"},tt=n(()=>s("h4",null,"Cover",-1)),et={class:"content"},st=["src"],ot={class:"confirm"},lt={key:1},it=["src"],nt={class:"details"},dt={class:"detailswrapper"},rt=k("Artist"),at=["innerHTML"],ut=n(()=>s("hr",null,null,-1)),ct=n(()=>s("hr",null,null,-1)),ht=n(()=>s("hr",null,null,-1)),pt=n(()=>s("hr",null,null,-1)),mt={class:"confirm"};function _t(t,o,l,C,r,i){const y=c("FindSources"),p=c("h7"),S=c("spotify-playlist-header"),b=c("spotify-playlist-entry"),P=c("vue-final-modal"),M=F("observe-visibility");return d(),a("div",null,[h(P,{onClick:t.hideFindSourcesCtx,modelValue:r.showModal,"onUpdate:modelValue":o[13]||(o[13]=e=>r.showModal=e),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:f(()=>[s("div",L,[s("div",j,[D,s("button",{class:"modal-close",onClick:o[0]||(o[0]=(...e)=>i.close&&i.close(...e))},E)]),x,u(s("select",{"onUpdate:modelValue":o[1]||(o[1]=e=>r.selectedPlaylist=e)},[(d(!0),a(g,null,w(r.playlists,e=>(d(),a("option",{key:e},v(e),1))),128))],512),[[O,r.selectedPlaylist]]),q,r.editSong?(d(),a("div",z,[G,h(y,{ref:"findSources",title:t.title,artist:t.artist},{default:f(()=>[s("div",K,[u(s("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=e=>t.dSource=e),ref:"source"},null,512),[[_,t.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:o[3]||(o[3]=(...e)=>t.opencontextmenu&&t.opencontextmenu(...e))},"more_vert",512)])]),_:1},8,["title","artist"]),Q,s("div",W,[u(s("input",{"onUpdate:modelValue":o[4]||(o[4]=e=>t.dTitle=e),type:"text"},null,512),[[_,t.dTitle]])]),X,s("div",Y,[u(s("input",{"onUpdate:modelValue":o[5]||(o[5]=e=>t.dAlbum=e),type:"text",ref:"album"},null,512),[[_,t.dAlbum]])]),Z,s("div",$,[u(s("input",{"onUpdate:modelValue":o[6]||(o[6]=e=>t.dArtist=e),type:"text"},null,512),[[_,t.dArtist]])]),tt,s("div",et,[u(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":o[7]||(o[7]=e=>t.dCover=e),ref:"cover"},null,512),[[_,t.dCover]]),s("img",{onClick:o[8]||(o[8]=(...e)=>i.openInNewTab&&i.openInNewTab(...e)),class:"addSong cover",src:t.dCover?t.dCover:"/assets/img/music_placeholder.png"},null,8,st)]),s("div",ot,[s("button",{onClick:o[9]||(o[9]=(...e)=>i.add&&i.add(...e)),class:"negative"},"Add")])])):(d(),a("div",lt,[u((d(),a("div",{class:"padding-20 playlisteditor",onClick:o[11]||(o[11]=(...e)=>t.editPlaylist&&t.editPlaylist(...e))},[s("img",{class:"cover",src:l.cover},null,8,it),s("div",nt,[s("div",dt,[h(p,null,{default:f(()=>[rt]),_:1}),s("span",{class:"material-icons-round share",onClick:o[10]||(o[10]=(...e)=>i.share&&i.share(...e))},"share")]),s("h1",null,v(l.name),1),s("h5",{innerHTML:l.description},null,8,at)])])),[[M,t.headerVisibilityChanged]]),ut,h(S),ct,(d(!0),a(g,null,w(r.playlist,(e,m)=>(d(),A(b,{onAdd:i.add,key:m,added:e.added,index:m,cover:e.cover,artist:e.artists.join(", "),title:e.title,source:e.source,album:e.album,preview:e.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128)),s("h5",null,v("Recommendations based on "+l.name),1),ht,h(S),pt,(d(!0),a(g,null,w(r.recommendations,(e,m)=>(d(),A(b,{onAdd:i.addRec,key:m,added:e.added,index:m,cover:e.cover,artist:e.artists.join(", "),title:e.title,source:e.source,album:e.album,preview:e.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"]))),128))])),s("div",mt,[s("button",{onClick:o[12]||(o[12]=(...e)=>i.addAll&&i.addAll(...e)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}var vt=T(J,[["render",_t],["__scopeId","data-v-240d1eac"]]);const yt={components:{AddArtistToPlaylist:vt},name:"ArtistItem",methods:{redirect(){this.$refs.import.showModal=!0},follow(t){t.stopPropagation();const o=this.following?"unfollow":"follow";fetch("http://localhost:1234/api/spotify/"+o,{method:"POST",body:JSON.stringify({artistId:this.id})}).then(l=>{l.status==200&&(this.following=!this.following)})}},data(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}},ft={class:"wrapper"},gt=["src"],wt=["innerHTML"];function St(t,o,l,C,r,i){const y=c("add-artist-to-playlist");return d(),a("div",ft,[h(y,{cover:l.cover,name:l.name,description:l.description,id:l.id,href:`https://open.spotify.com/artist/${l.id}`,ref:"import"},null,8,["cover","name","description","id","href"]),s("div",{class:"item",onClick:o[1]||(o[1]=(...p)=>i.redirect&&i.redirect(...p))},[s("img",{src:l.cover},null,8,gt),s("h4",null,v(l.name),1),s("p",{innerHTML:l.description},null,8,wt),l.showFollowButton?(d(),a("button",{key:0,onClick:o[0]||(o[0]=(...p)=>i.follow&&i.follow(...p)),class:"followButton"},v(r.following?"Following":"Follow"),1)):H("",!0)])])}var Pt=T(yt,[["render",St],["__scopeId","data-v-8201f244"]]);export{Pt as A};
