import{F as $,G as U}from"./FixedPlaylistHeader.328f3c65.js";import{P as O}from"./PlaylistEntry.da960d90.js";import{F as A}from"./FindSources.cf012e68.js";import{H as C,_ as P,e as c,o as f,c as g,g as p,w as b,a as s,m,q as _,p as S,h as N,k as E,d as H,b as R,t as w,l as J}from"./index.7a0dd187.js";import{d as L}from"./vuedraggable.umd.2ea80cc8.js";import"./EditSong.32997447.js";const q=new C("reapOne.playlist",22),B={name:"AddSong",components:{FindSources:A},data(){return{showModal:!1,cover:"",artist:"",title:""}},watch:{showModal(){!this.showModal||navigator.clipboard.readText().then(t=>{!this.isValidHttpUrl(t)||(this.$refs.source.value=t,this.loadMetadata())})}},methods:{isValidHttpUrl(t){let e;try{e=new URL(t)}catch{return!1}return e.protocol==="http:"||e.protocol==="https:"},opencontextmenu(t){this.$refs.findSources.show(t)},hideFindSourcesCtx(){this.$refs.findSources.hide()},getId(){return Number(q.decode(this.$route.params.id))},add(){this.showModal=!1,console.log("fetch"),fetch(`/api/playlists/${this.getId()}/tracks`,{method:"POST",body:JSON.stringify({source:this.$refs.source.value,title:this.title,artist:this.artist,album:this.$refs.album.value,cover:this.cover})}).then(t=>{console.log(t),this.$emit("close")})},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.title=t.title,this.$refs.album.value=t.album,this.artist=t.artists.join(", "),this.cover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}}},v=t=>(S("data-v-4a2634cd"),t=t(),N(),t),G={class:"wrapper"},z={class:"header"},W=v(()=>s("h3",null,"Add song",-1)),K=v(()=>s("span",{class:"material-icons-round"}," close ",-1)),Q=[K],X=v(()=>s("h4",null,"Source",-1)),Y={class:"content"},Z=v(()=>s("h4",null,"Title",-1)),j={class:"content"},ee=v(()=>s("h4",null,"Album",-1)),te={class:"content"},se={type:"text",ref:"album"},le=v(()=>s("h4",null,"Artist",-1)),oe={class:"content"},ie=v(()=>s("h4",null,"Cover",-1)),ne={class:"content"},ae=["src"],de={class:"confirm"};function re(t,e,d,r,l,o){const u=c("FindSources"),i=c("vue-final-modal");return f(),g("div",null,[p(i,{onClick:o.hideFindSourcesCtx,modelValue:l.showModal,"onUpdate:modelValue":e[8]||(e[8]=h=>l.showModal=h),classes:"modal-container","content-class":"modal-content"},{default:b(()=>{var h;return[s("div",G,[s("div",z,[W,s("button",{class:"modal-close",onClick:e[0]||(e[0]=n=>l.showModal=!1)},Q)]),X,p(u,{ref:"findSources",src:(h=t.$refs.source)==null?void 0:h.value,title:l.title,artist:l.artist},{default:b(()=>[s("div",Y,[s("input",{onChange:e[1]||(e[1]=(...n)=>o.loadMetadata&&o.loadMetadata(...n)),type:"text",ref:"source"},null,544),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[2]||(e[2]=(...n)=>o.opencontextmenu&&o.opencontextmenu(...n))},"more_vert",512)])]),_:1},8,["src","title","artist"]),Z,s("div",j,[m(s("input",{"onUpdate:modelValue":e[3]||(e[3]=n=>l.title=n),type:"text"},null,512),[[_,l.title]])]),ee,s("div",te,[s("input",se,null,512)]),le,s("div",oe,[m(s("input",{"onUpdate:modelValue":e[4]||(e[4]=n=>l.artist=n),type:"text"},null,512),[[_,l.artist]])]),ie,s("div",ne,[m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[5]||(e[5]=n=>l.cover=n),ref:"cover"},null,512),[[_,l.cover]]),s("img",{onClick:e[6]||(e[6]=(...n)=>o.openInNewTab&&o.openInNewTab(...n)),class:"addSong cover",src:l.cover?l.cover:"/assets/img/music_placeholder.png"},null,8,ae)]),s("div",de,[s("button",{onClick:e[7]||(e[7]=(...n)=>o.add&&o.add(...n)),class:"negative"},"Add")])])]}),_:1},8,["onClick","modelValue"])])}const ce=P(B,[["render",re],["__scopeId","data-v-4a2634cd"]]);const x=new C("reapOne.playlist",22),pe={name:"EditPlaylist",props:{playlistName:String,playlistDescription:String,playlistCover:String},mounted(){this.$refs.upFile.addEventListener("change",()=>{var d,r,l,o;const t=(d=this.$refs.upFile.files)==null?void 0:d[0];if(!!t){this.uploadedCoverName=(o=(l=(r=this.$refs.upFile)==null?void 0:r.files)==null?void 0:l[0])==null?void 0:o.name;var e=new FileReader;e.onloadend=()=>{this.uploadedCover=e.result},e.readAsDataURL(t)}})},data(){return{showModal:!1,cover:"",name:this.playlistName,description:this.playlistDescription,cover:this.playlistCover,uploadedCover:null,uploadedCoverName:null}},methods:{uploadFile(){console.log(this.$refs.upFile);const t=new FormData;t.append("file",this.$refs.upFile.files[0]),t.append("user","hubot"),fetch("/api/config/images",{method:"POST",body:t}).then(e=>e.text()).then(e=>this.cover=e)},apply(){this.showModal=!1,console.log("fetch"),fetch(`/api/playlists/${x.decode(this.$route.params.id)}`,{method:"POST",body:JSON.stringify({name:this.name||"N/A",description:this.description||"N/A",cover:this.cover||"/assets/img/music_placeholder.png"})}).then(t=>{console.log(t),this.$emit("close")})},remove(){fetch(`/api/playlists/${Number(x.decode(this.$route.params.id))}`,{method:"DELETE"}).then(()=>{this.$router.push("/")})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}},watch:{playlistName(){this.name=this.playlistName},playlistDescription(){this.description=this.playlistDescription},playlistCover(){this.cover=this.playlistCover}}},y=t=>(S("data-v-9aad7b7c"),t=t(),N(),t),ue={class:"wrapper"},he={class:"header"},me=y(()=>s("h3",null,"Edit details",-1)),ye=y(()=>s("span",{class:"material-symbols-rounded"},"close",-1)),_e=[ye],ve=y(()=>s("h4",null,"Name",-1)),fe={class:"content"},ge=y(()=>s("h4",null,"Description",-1)),be={class:"content"},we=y(()=>s("h4",null,"Upload Cover",-1)),Ce={class:"content"},Pe=y(()=>s("span",{class:"material-symbols-rounded"},"search",-1)),Se=[Pe],Ne={type:"file",ref:"upFile",style:{display:"none"},accept:"image/*"},xe=["src"],Ie=y(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),ke=[Ie],De=y(()=>s("h4",null,"Cover",-1)),Me={class:"content"},Te=["src"],Ve={class:"confirm"};function Fe(t,e,d,r,l,o){const u=c("vue-final-modal");return f(),g("div",null,[p(u,{modelValue:l.showModal,"onUpdate:modelValue":e[11]||(e[11]=i=>l.showModal=i),classes:"modal-container","content-class":"modal-content"},{default:b(()=>[s("div",ue,[s("div",he,[me,s("button",{class:"modal-close",onClick:e[0]||(e[0]=i=>l.showModal=!1)},_e)]),ve,s("div",fe,[m(s("input",{"onUpdate:modelValue":e[1]||(e[1]=i=>l.name=i),type:"text",ref:"name"},null,512),[[_,l.name]])]),ge,s("div",be,[m(s("input",{"onUpdate:modelValue":e[2]||(e[2]=i=>l.description=i),type:"text",ref:"description"},null,512),[[_,l.description]])]),we,s("div",Ce,[s("button",{onClick:e[3]||(e[3]=()=>t.$refs.upFile.click())},Se),s("input",Ne,null,512),m(s("input",{type:"text",class:"addSong cover",readonly:"","onUpdate:modelValue":e[4]||(e[4]=i=>l.uploadedCoverName=i),ref:"cover"},null,512),[[_,l.uploadedCoverName]]),s("img",{onClick:e[5]||(e[5]=(...i)=>o.openInNewTab&&o.openInNewTab(...i)),class:"addSong cover",src:l.uploadedCover?l.uploadedCover:"/assets/img/music_placeholder.png"},null,8,xe),s("button",{onClick:e[6]||(e[6]=(...i)=>o.uploadFile&&o.uploadFile(...i))},ke)]),De,s("div",Me,[m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[7]||(e[7]=i=>l.cover=i),ref:"cover"},null,512),[[_,l.cover]]),s("img",{onClick:e[8]||(e[8]=(...i)=>o.openInNewTab&&o.openInNewTab(...i)),class:"addSong cover",src:l.cover?l.cover:"/assets/img/music_placeholder.png"},null,8,Te)]),s("div",Ve,[s("button",{onClick:e[9]||(e[9]=(...i)=>o.remove&&o.remove(...i)),class:"negative left"},"Delete"),s("button",{onClick:e[10]||(e[10]=(...i)=>o.apply&&o.apply(...i)),class:"negative"},"Save")])])]),_:1},8,["modelValue"])])}const $e=P(pe,[["render",Fe],["__scopeId","data-v-9aad7b7c"]]);const I=new C("reapOne.playlist",22),Ue={components:{PlaylistEntry:O,FixedPlaylistHeader:$,GridHeader:U,AddSong:ce,EditPlaylist:$e,draggable:L},name:"Playlist",data(){return this.updatePlaylist(),fetch("/api/playlists").then(t=>t.json()).then(t=>{this.playlists=t}),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A",playlistDescription:"",playlistCover:null,playlists:[]}},methods:{getId(){return I.decode(this.$route.params.id)},download(t){var d;const e=(d=this.playlist)==null?void 0:d[t];window.open(`/api/tracks/${e.id}/download`)},onPlaylistRearrange(t){const e=t.moved;!e||fetch(`/api/playlists/${this.getId()}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:e.oldIndex,songNewIndex:e.newIndex})})},connect(){const t=this;console.log("attempting reconnect");let e=new WebSocket("ws://localhost:1234/ws");e.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},e.onopen=()=>{console.log("ws connected")},e.onmessage=function(d){const r=JSON.parse(d.data);t.updateData(r)}},headerVisibilityChanged(t){this.fixedHeaderHidden=t},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},editPlaylist(){this.$refs.editPlaylistPopup.showModal=!0},updateData(t){var e;if(t.path=="player.song"){let d=((e=t==null?void 0:t.data)==null?void 0:e.title)||"N/A";for(const r of this.playlist)r.playing=r.title==d}},updatePlaylist(){if(!!this.getId()&&!!this.$route.path.includes("/playlist/")){if(this.$route.params.id=="create"){fetch("/api/playlists/new").then(t=>t.text()).then(t=>{const e=I.encode(t);console.log(e),this.$router.push(e)});return}fetch(`/api/playlists/${this.getId()}`).then(async t=>{if(t.status==404){this.$router.push("/");return}const e=await t.json();this.playlist=e.songs,this.playlistName=e.name,this.playlistDescription=e.description,this.playlistCover=e.cover,document.title=`${this.playlistName} - reAudioPlayer One`,console.log(this.playlist),this.connect()})}},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"playlist"})})}},computed:{autogeneratedDescription(){return`${this.playlist.length} ${this.playlist.length==1?"song":"songs"}${this.estimatedDuration}`},estimatedDuration(){let t=0,e=!1;if(!this.playlist.length)return"";for(const u of this.playlist){e=e||u.duration=="-1:59";const i=u.duration=="-1:59"?"3:00":u.duration,[h,n]=i.split(":");t+=Number(h*60)+Number(n)}const d=t,r=Math.floor(d/60),l=Math.floor(r/60),o=e?", about ":", ";return l?o+`${l} hr ${r-l*60} min`:r?o+`${r} min ${d-r*60} sec`:o+t+" sec"}},watch:{$route(){this.updatePlaylist()}}},k=t=>(S("data-v-852df116"),t=t(),N(),t),Oe={class:"playlist"},Ae=["src"],Ee={class:"details"},He={class:"muted description"},Re={class:"mobileMenu showIfMobile"},Je=k(()=>s("hr",null,null,-1)),Le={class:"padding-20"},qe={class:"grid"},Be=k(()=>s("hr",null,null,-1)),Ge={class:"playlistEntries"};function ze(t,e,d,r,l,o){const u=c("AddSong"),i=c("EditPlaylist"),h=c("fixed-playlist-header"),n=c("h7"),D=c("grid-header"),M=c("playlist-entry"),T=c("draggable"),V=J("observe-visibility");return f(),g("div",Oe,[p(u,{onClose:o.updatePlaylist,ref:"addSongPopup"},null,8,["onClose"]),p(i,{onClose:o.updatePlaylist,playlistCover:l.playlistCover,playlistName:l.playlistName,playlistDescription:l.playlistDescription,ref:"editPlaylistPopup"},null,8,["onClose","playlistCover","playlistName","playlistDescription"]),p(h,{onLoadPlaylist:o.loadPlaylist,ref:"fixedHeading",class:E({hidden:l.fixedHeaderHidden}),title:l.playlistName},null,8,["onLoadPlaylist","class","title"]),m((f(),g("div",{class:"padding-20 playlisteditor",onClick:e[0]||(e[0]=(...a)=>o.editPlaylist&&o.editPlaylist(...a))},[l.playlistCover?(f(),g("img",{key:0,class:"cover",src:l.playlistCover},null,8,Ae)):H("",!0),s("div",Ee,[p(n,{class:"hideIfMobile"},{default:b(()=>[R("Playlist")]),_:1}),s("h1",null,w(l.playlistName),1),s("h5",null,w(l.playlistDescription),1),s("p",He,w(o.autogeneratedDescription),1)])])),[[V,o.headerVisibilityChanged]]),s("div",Re,[s("span",{onClick:e[1]||(e[1]=()=>t.$emit("toggleFullSidebar")),class:"material-symbols-rounded"},"menu")]),Je,s("div",Le,[s("span",{id:"loadPlaylist",onClick:e[2]||(e[2]=(...a)=>o.loadPlaylist&&o.loadPlaylist(...a)),class:"material-symbols-rounded"},"play_circle"),s("span",{id:"addToPlaylist",onClick:e[3]||(e[3]=(...a)=>o.addToPlaylist&&o.addToPlaylist(...a)),class:"material-symbols-rounded"},"add_circle"),s("div",qe,[p(D,{class:"hideIfMobile"}),Be,s("div",Ge,[p(T,{modelValue:l.playlist,"onUpdate:modelValue":e[4]||(e[4]=a=>l.playlist=a),onChange:o.onPlaylistRearrange},{item:b(({element:a})=>[p(M,{playlists:l.playlists,onDownload:o.download,onRequestUpdate:o.updatePlaylist,index:l.playlist.findIndex(F=>F.source==a.source),source:a.source,playing:a.playing,id:a.id,title:a.title,album:a.album,artist:a.artist,cover:a.cover,favourite:a.favourite,duration:a.duration},null,8,["playlists","onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"])]),_:1},8,["modelValue","onChange"])])])])])}const je=P(Ue,[["render",ze],["__scopeId","data-v-852df116"]]);export{je as default};
