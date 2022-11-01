import{M as I}from"./MiniPlayer.35a65202.js";import{_ as b,e as p,o as d,c as r,g as _,k as y,t as m,d as E,a as s,p as C,h as k,l as F,w as f,m as u,v as U,F as w,i as S,q as v,b as B,f as D}from"./index.9ff56939.js";import{F as H}from"./FindSources.14616305.js";const O={components:{MiniPlayer:I},name:"AlbumEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,preview:String},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},methods:{remove(){fetch(`/api/playlists/${this.$route.params.id}/tracks`,{method:"DELETE",body:JSON.stringify({songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){this.$emit("edit",this.index)},add(){console.log("add"),this.$emit("add",this.index)}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},x={class:"track"},J={class:"trackwrapper"};function L(e,t,o,h,n,i){const g=p("mini-player");return d(),r("div",{onDblclick:t[2]||(t[2]=()=>{i.playAt(),i.onselect()}),onClick:t[3]||(t[3]=(...c)=>i.onselect&&i.onselect(...c)),onMouseover:t[4]||(t[4]=c=>n.hovering=!0),onMouseleave:t[5]||(t[5]=c=>n.hovering=!1),class:y(["albumEntry",{selected:n.highlighted}])},[_(g,{class:y(["miniPlayer",{hidden:!n.hovering}]),title:o.title,artist:o.artist,src:o.source},null,8,["class","title","artist","src"]),n.hovering?E("",!0):(d(),r("span",{key:0,onClick:t[0]||(t[0]=(...c)=>e.edit&&e.edit(...c)),class:"id"},m(o.index+1),1)),s("div",x,[s("div",J,[s("span",{class:y(["title",{playing:e.playing}])},m(o.title),3),s("span",{class:y(["artist",{playing:e.playing}])},m(o.artist),3)])]),s("span",{onClick:t[1]||(t[1]=(...c)=>i.add&&i.add(...c)),class:"material-icons-round edit",ref:"add"},"add",512)],34)}const j=b(O,[["render",L],["__scopeId","data-v-ac227c4d"]]);const q={name:"AlbumHeader"},T=e=>(C("data-v-a4397463"),e=e(),k(),e),z={class:"gridHeader"},G=T(()=>s("span",{class:"id"},"#",-1)),K=T(()=>s("span",{class:"title"},"Title",-1)),Q=[G,K];function R(e,t,o,h,n,i){return d(),r("div",z,Q)}const W=b(q,[["render",R],["__scopeId","data-v-a4397463"]]);const X={name:"AddAlbumToPlaylist",components:{FindSources:H,AlbumEntry:j,AlbumHeader:W},props:{cover:String,artist:String,title:String,href:String,id:String},data(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],editSong:!1}},methods:{share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close"),console.log(this.showModal)},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(e=>e.json()).then(e=>{console.log(e),this.dTitle=e.title,this.$refs.album.value=e.album,this.dArtist=e.artists.join(", "),this.dCover=e.cover,this.$refs.source.value=e.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll(){for(let e=0;e<this.playlist.length;e++)this.add(e)},preview(){const e=new CustomEvent("player.play",{detail:{artist:this.artist,title:this.title,source:this.href}});window.dispatchEvent(e)},add(e){const t=this.playlist[e],o=this.playlists.findIndex(h=>h==this.selectedPlaylist);if(console.log(t,o),o<0){alert("no playlist selected");return}fetch(`/api/playlists/${o}/tracks`,{method:"POST",body:JSON.stringify({source:t.src,title:t.title,artist:t.artists.join(", "),album:this.title,cover:this.cover})}).then(h=>{h.status==200&&(t.added=!0)})}},watch:{dSource(){this.loadMetadata()},showModal(){!this.showModal||(fetch("/api/playlists").then(e=>e.json()).then(e=>{this.playlists.length=0,this.playlists.push(...e)}),fetch(`/api/spotify/albums/${this.id}`).then(e=>e.json()).then(e=>{this.playlist.length=0,this.playlist.push(...e)}))}}},a=e=>(C("data-v-ea3787cd"),e=e(),k(),e),Y={class:"wrapper"},Z={class:"header"},$=a(()=>s("h3",null,"Add album",-1)),ee=a(()=>s("span",{class:"material-icons-round"}," close ",-1)),te=[ee],se=a(()=>s("h4",null,"To Playlist",-1)),le=a(()=>s("br",null,null,-1)),ie={key:0},oe=a(()=>s("h4",null,"Source",-1)),ne={class:"content"},de=a(()=>s("h4",null,"Title",-1)),ae={class:"content"},re=a(()=>s("h4",null,"Album",-1)),ce={class:"content"},ue=a(()=>s("h4",null,"Artist",-1)),he={class:"content"},pe=a(()=>s("h4",null,"Cover",-1)),me={class:"content"},ve=["src"],_e={class:"confirm"},ye={key:1},ge=["src"],fe={class:"details"},be={class:"detailswrapper"},Ae=a(()=>s("hr",null,null,-1)),we=a(()=>s("hr",null,null,-1)),Se={class:"confirm"};function Ce(e,t,o,h,n,i){const g=p("FindSources"),c=p("h7"),P=p("album-header"),M=p("album-entry"),N=p("vue-final-modal"),V=F("observe-visibility");return d(),r("div",null,[_(N,{onClick:e.hideFindSourcesCtx,modelValue:n.showModal,"onUpdate:modelValue":t[14]||(t[14]=l=>n.showModal=l),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:f(()=>[s("div",Y,[s("div",Z,[$,s("button",{class:"modal-close",onClick:t[0]||(t[0]=(...l)=>i.close&&i.close(...l))},te)]),se,u(s("select",{"onUpdate:modelValue":t[1]||(t[1]=l=>n.selectedPlaylist=l)},[(d(!0),r(w,null,S(n.playlists,l=>(d(),r("option",{key:l},m(l),1))),128))],512),[[U,n.selectedPlaylist]]),le,n.editSong?(d(),r("div",ie,[oe,_(g,{ref:"findSources",src:e.dSource,title:o.title,artist:o.artist},{default:f(()=>[s("div",ne,[u(s("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=l=>e.dSource=l),ref:"source"},null,512),[[v,e.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:t[3]||(t[3]=(...l)=>e.opencontextmenu&&e.opencontextmenu(...l))},"more_vert",512)])]),_:1},8,["src","title","artist"]),de,s("div",ae,[u(s("input",{"onUpdate:modelValue":t[4]||(t[4]=l=>e.dTitle=l),type:"text"},null,512),[[v,e.dTitle]])]),re,s("div",ce,[u(s("input",{"onUpdate:modelValue":t[5]||(t[5]=l=>e.dAlbum=l),type:"text",ref:"album"},null,512),[[v,e.dAlbum]])]),ue,s("div",he,[u(s("input",{"onUpdate:modelValue":t[6]||(t[6]=l=>e.dArtist=l),type:"text"},null,512),[[v,e.dArtist]])]),pe,s("div",me,[u(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":t[7]||(t[7]=l=>e.dCover=l),ref:"cover"},null,512),[[v,e.dCover]]),s("img",{onClick:t[8]||(t[8]=(...l)=>i.openInNewTab&&i.openInNewTab(...l)),class:"addSong cover",src:e.dCover?e.dCover:"/assets/img/music_placeholder.png"},null,8,ve)]),s("div",_e,[s("button",{onClick:t[9]||(t[9]=(...l)=>i.add&&i.add(...l)),class:"negative"},"Add")])])):(d(),r("div",ye,[u((d(),r("div",{class:"padding-20 playlisteditor",onClick:t[12]||(t[12]=(...l)=>e.editPlaylist&&e.editPlaylist(...l))},[s("img",{class:"cover",src:o.cover},null,8,ge),s("div",fe,[s("div",be,[_(c,null,{default:f(()=>[B("Album")]),_:1}),s("span",{class:"material-icons-round share",onClick:t[10]||(t[10]=(...l)=>i.share&&i.share(...l))},"share"),s("span",{class:"material-symbols-rounded share fill",onClick:t[11]||(t[11]=(...l)=>i.preview&&i.preview(...l))},"play_arrow")]),s("h1",null,m(o.title),1),s("h5",null,m(o.artist),1)])])),[[V,e.headerVisibilityChanged]]),Ae,_(P),we,(d(!0),r(w,null,S(n.playlist,(l,A)=>(d(),D(M,{onAdd:i.add,key:A,added:l.added,index:A,cover:l.cover,artist:l.artists.join(", "),title:l.title,source:l.src,preview:l.source},null,8,["onAdd","added","index","cover","artist","title","source","preview"]))),128))])),s("div",Se,[s("button",{onClick:t[13]||(t[13]=(...l)=>i.addAll&&i.addAll(...l)),class:"negative"},"Add All")])])]),_:1},8,["onClick","modelValue"])])}const Me=b(X,[["render",Ce],["__scopeId","data-v-ea3787cd"]]);export{Me as A};