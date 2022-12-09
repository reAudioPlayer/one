import{F as I,G as E}from"./FixedPlaylistHeader.ca1a986e.js";import{F}from"./FindSources.086862af.js";import{_ as S,j as y,e as r,o as g,c as b,g as d,w as m,a as s,x as p,z as h,q as M,k as C,l as w,bD as U,s as H,b as O,t as v,v as D}from"./index.6f3ae9d0.js";import{d as q}from"./vuedraggable.umd.915eecc3.js";import{S as z}from"./SpotifyPlaylistEntry.5c580e40.js";import{A as J}from"./AddSongToPlaylist.5c26a1f1.js";import"./MiniPlayer.b80f9ee9.js";const L={name:"EditSong",components:{FindSources:F},props:{cover:String,album:String,artist:String,source:String,title:String,id:Number},mounted(){this.$refs.upSong.addEventListener("change",()=>{const i=new FormData;var t=this.$refs.upSong.files[0],u=t.slice(0,t.size,t.type),c=new File([u],this.id+".mp3",{type:t.type});i.append("file",c),fetch("/api/config/tracks",{method:"POST",body:i}).then(e=>e.text()).then(e=>this.dSource=e)}),this.$refs.upCover.addEventListener("change",()=>{const i=new FormData;var t=this.$refs.upCover.files[0],u=t.slice(0,t.size,t.type);const c=t.name.split(".").pop();var e=new File([u],this.id+`.${c}`,{type:t.type});i.append("file",e),fetch("/api/config/images",{method:"POST",body:i}).then(o=>o.text()).then(o=>this.dCover=o)})},data(){return{showModal:!1,dCover:this.cover,dAlbum:this.album,dArtist:this.artist,dTitle:this.title,dSource:this.source}},methods:{parseCover:y,opencontextmenu(i){this.$refs.findSourcesEdit.show(i)},hideFindSourcesCtx(){this.$refs.findSourcesEdit.hide()},add(){this.showModal=!1,console.log("fetch"),fetch(`/api/tracks/${this.id}`,{method:"PUT",body:JSON.stringify({source:this.dSource,title:this.dTitle,artist:this.dArtist,album:this.dAlbum,cover:this.dCover})}).then(i=>{console.log(i),this.$emit("close")})},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(i=>i.json()).then(i=>{console.log(i),this.dTitle=i.title,this.dAlbum=i.album,this.dArtist=i.artists.join(", "),this.dCover=i.cover,this.dSource=i.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}},watch:{id(){this.dCover=this.cover,this.dAlbum=this.album,this.dArtist=this.artist,this.dTitle=this.title,this.dSource=this.source}}},a=i=>(C("data-v-53f22ab0"),i=i(),w(),i),R={class:"wrapper"},B={class:"header"},j=a(()=>s("h3",null,"Edit song",-1)),G=a(()=>s("span",{class:"material-icons-round"}," close ",-1)),K=[G],Q=a(()=>s("h4",null,"Source",-1)),W={class:"content"},X=a(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),Y=[X],Z={type:"file",ref:"upSong",style:{display:"none"},accept:"audio/mp3"},$=a(()=>s("h4",null,"Title",-1)),tt={class:"content"},et=a(()=>s("h4",null,"Album",-1)),st={class:"content"},it=a(()=>s("h4",null,"Artist",-1)),ot={class:"content"},lt=a(()=>s("h4",null,"Cover",-1)),nt={class:"content"},rt=a(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),dt=[rt],at={type:"file",ref:"upCover",style:{display:"none"},accept:"image/*"},ct=["src"],ut={class:"confirm"};function pt(i,t,u,c,e,o){const _=r("FindSources"),f=r("vue-final-modal");return g(),b("div",null,[d(f,{onContextmenu:t[11]||(t[11]=M(()=>{},["stop"])),onClick:o.hideFindSourcesCtx,modelValue:e.showModal,"onUpdate:modelValue":t[12]||(t[12]=l=>e.showModal=l),classes:"modal-container","content-class":"modal-content"},{default:m(()=>[s("div",R,[s("div",B,[j,s("button",{class:"modal-close",onClick:t[0]||(t[0]=l=>e.showModal=!1)},K)]),Q,d(_,{ref:"findSourcesEdit",src:e.dSource,title:e.dTitle,artist:e.dArtist},{default:m(()=>[s("div",W,[s("button",{onClick:t[1]||(t[1]=()=>i.$refs.upSong.click())},Y),s("input",Z,null,512),p(s("input",{"onUpdate:modelValue":t[2]||(t[2]=l=>e.dSource=l),type:"text",ref:"source"},null,512),[[h,e.dSource]]),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:t[3]||(t[3]=(...l)=>o.opencontextmenu&&o.opencontextmenu(...l))},"more_vert",512)])]),_:1},8,["src","title","artist"]),$,s("div",tt,[p(s("input",{"onUpdate:modelValue":t[4]||(t[4]=l=>e.dTitle=l),type:"text"},null,512),[[h,e.dTitle]])]),et,s("div",st,[p(s("input",{"onUpdate:modelValue":t[5]||(t[5]=l=>e.dAlbum=l),type:"text",ref:"album"},null,512),[[h,e.dAlbum]])]),it,s("div",ot,[p(s("input",{"onUpdate:modelValue":t[6]||(t[6]=l=>e.dArtist=l),type:"text"},null,512),[[h,e.dArtist]])]),lt,s("div",nt,[s("button",{onClick:t[7]||(t[7]=()=>i.$refs.upCover.click())},dt),s("input",at,null,512),p(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":t[8]||(t[8]=l=>e.dCover=l),ref:"cover"},null,512),[[h,e.dCover]]),s("img",{onClick:t[9]||(t[9]=(...l)=>o.openInNewTab&&o.openInNewTab(...l)),class:"addSong cover",src:o.parseCover(e.dCover)},null,8,ct)]),s("div",ut,[s("button",{onClick:t[10]||(t[10]=(...l)=>o.add&&o.add(...l)),class:"negative"},"Save")])])]),_:1},8,["onClick","modelValue"])])}const ht=S(L,[["render",pt],["__scopeId","data-v-53f22ab0"]]);const mt={components:{AddSongToPlaylist:J,FixedPlaylistHeader:I,GridHeader:E,draggable:q,SpotifyPlaylistEntry:z,EditSong:ht},data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,title:"N/A",artist:"N/A",album:"N/A",cover:y(null),src:"",id:-1,recommendations:[]}},methods:{getId(){return U(this.$route.params.id)},onPlaylistRearrange(i){i.moved},headerVisibilityChanged(i){this.fixedHeaderHidden=i},editSong(){this.$refs.editSongPopup.showModal=!0},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},updatePlaylist(){!this.getId()||!this.$route.path.includes("/track/")||fetch(`/api/tracks/${this.getId()}`).then(async i=>{if(i.status==404){this.$router.push("/");return}const t=await i.json();console.log(t),this.title=t.title||"N/A",this.artist=t.artist||"N/A",this.cover=y(t.cover),this.src=t.source,this.album=t.album||"N/A",this.id=t.id,document.title=`${this.title} \u2022 ${this.artist}`;const c=await(await fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.artist} ${this.title}`})})).json();this.recommendations.push(...c)})},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"track"})})}},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},P=i=>(C("data-v-8fc42bfd"),i=i(),w(),i),_t={class:"playlist"},ft=["src"],vt={class:"details"},yt=P(()=>s("hr",null,null,-1)),gt={class:"padding-20"},bt={class:"grid"},St=P(()=>s("hr",null,null,-1)),Ct={class:"playlistEntries"};function wt(i,t,u,c,e,o){const _=r("AddSongToPlaylist"),f=r("EditSong"),l=r("fixed-playlist-header"),x=r("h7"),T=r("grid-header"),k=r("spotify-playlist-entry"),A=r("draggable"),N=D("observe-visibility");return g(),b("div",_t,[d(_,{cover:e.cover,title:e.title,artist:e.artist,ref:"addSongPopup",href:e.src,exists:""},null,8,["cover","title","artist","href"]),d(f,{onClose:o.updatePlaylist,ref:"editSongPopup",cover:e.cover,id:e.id,title:e.title,album:e.album,artist:e.artist,source:e.src},null,8,["onClose","cover","id","title","album","artist","source"]),d(l,{onLoadPlaylist:o.loadPlaylist,ref:"fixedHeading",class:H({hidden:e.fixedHeaderHidden}),title:`${e.artist} - ${e.title}`},null,8,["onLoadPlaylist","class","title"]),p((g(),b("div",{class:"padding-20 songdetails",onClick:t[0]||(t[0]=(...n)=>o.editSong&&o.editSong(...n))},[s("img",{class:"cover",src:e.cover},null,8,ft),s("div",vt,[d(x,null,{default:m(()=>[O("Song")]),_:1}),s("h1",null,v(e.title),1),s("h5",null,v(e.artist),1)])])),[[N,o.headerVisibilityChanged]]),yt,s("div",gt,[s("span",{id:"loadPlaylist",onClick:t[1]||(t[1]=(...n)=>o.loadPlaylist&&o.loadPlaylist(...n)),class:"material-icons-outlined"},"play_circle_filled"),s("span",{id:"addToPlaylist",onClick:t[2]||(t[2]=(...n)=>o.addToPlaylist&&o.addToPlaylist(...n)),class:"material-icons-outlined"},"add_circle"),s("div",bt,[s("h2",null,v("Recommendations based on "+e.title),1),d(T),St,s("div",Ct,[d(A,{modelValue:e.recommendations,"onUpdate:modelValue":t[3]||(t[3]=n=>e.recommendations=n)},{item:m(({element:n})=>[d(k,{onRequestUpdate:o.updatePlaylist,index:e.recommendations.findIndex(V=>V.src==n.src),source:n.src,id:n.id,title:n.title,album:n.album,artist:n.artists.join(", "),preview:n.preview,cover:n.cover,favourite:n.favourite,duration:n.duration},null,8,["onRequestUpdate","index","source","id","title","album","artist","preview","cover","favourite","duration"])]),_:1},8,["modelValue"])])])])])}const It=S(mt,[["render",wt],["__scopeId","data-v-8fc42bfd"]]);export{It as default};
