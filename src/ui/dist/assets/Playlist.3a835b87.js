import{F,G as E}from"./FixedPlaylistHeader.58d75140.js";import{P as U}from"./PlaylistEntry.0ffdec53.js";import{F as O}from"./FindSources.1e41b288.js";import{_ as P,m as A,j as N,C,e as p,o as v,c as g,g as u,w as b,a as s,x as m,z as _,k as S,l as x,p as I,B as H,D as L,s as z,d as J,b as R,t as w,v as B}from"./index.8fd665a1.js";import{d as q}from"./vuedraggable.umd.94a5d781.js";import"./SongCtx.aba5533f.js";import"./EditSong.df0041e3.js";const G={name:"AddSong",components:{FindSources:O},data(){return{showModal:!1,cover:"",artist:"",title:""}},mounted(){const t=A(String(new Date().getTime()));this.$refs.upSong.addEventListener("change",()=>{const e=new FormData;var o=this.$refs.upSong.files[0],d=o.slice(0,o.size,o.type),i=new File([d],t+".mp3",{type:o.type});e.append("file",i),fetch("/api/config/tracks",{method:"POST",body:e}).then(l=>l.text()).then(l=>this.$refs.source.value=l)}),this.$refs.upCover.addEventListener("change",()=>{const e=new FormData;var o=this.$refs.upCover.files[0],d=o.slice(0,o.size,o.type);const i=o.name.split(".").pop();var l=new File([d],t+`.${i}`,{type:o.type});e.append("file",l),fetch("/api/config/images",{method:"POST",body:e}).then(c=>c.text()).then(c=>this.cover=c)})},watch:{showModal(){!this.showModal||navigator.clipboard.readText().then(t=>{!this.isValidHttpUrl(t)||(this.$refs.source.value=t,this.loadMetadata())})}},methods:{parseCover:N,isValidHttpUrl(t){let e;try{e=new URL(t)}catch{return!1}return e.protocol==="http:"||e.protocol==="https:"},opencontextmenu(t){this.$refs.findSources.show(t)},hideFindSourcesCtx(){this.$refs.findSources.hide()},getId(){return Number(C(this.$route.params.id))},add(){this.showModal=!1,console.log("fetch"),fetch(`/api/playlists/${this.getId()}/tracks`,{method:"POST",body:JSON.stringify({source:this.$refs.source.value,title:this.title,artist:this.artist,album:this.$refs.album.value,cover:this.cover})}).then(t=>{console.log(t),this.$emit("close")})},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(t=>t.json()).then(t=>{console.log(t),this.title=t.title,this.$refs.album.value=t.album,this.artist=t.artists.join(", "),this.cover=t.cover,this.$refs.source.value=t.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}}},h=t=>(S("data-v-264f144f"),t=t(),x(),t),j={class:"wrapper"},K={class:"header"},Q=h(()=>s("h3",null,"Add song",-1)),W=h(()=>s("span",{class:"material-icons-round"}," close ",-1)),X=[W],Y=h(()=>s("h4",null,"Source",-1)),Z={class:"content"},ee=h(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),te=[ee],se={type:"file",ref:"upSong",style:{display:"none"},accept:"audio/mp3"},le=h(()=>s("h4",null,"Title",-1)),ie={class:"content"},oe=h(()=>s("h4",null,"Album",-1)),ne={class:"content"},ae={type:"text",ref:"album"},re=h(()=>s("h4",null,"Artist",-1)),de={class:"content"},ce=h(()=>s("h4",null,"Cover",-1)),pe={class:"content"},ue=h(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),he=[ue],ye={type:"file",ref:"upCover",style:{display:"none"},accept:"image/*"},me=["src"],_e={class:"confirm"};function fe(t,e,o,d,i,l){const c=p("FindSources"),n=p("vue-final-modal");return v(),g("div",null,[u(n,{onClick:l.hideFindSourcesCtx,modelValue:i.showModal,"onUpdate:modelValue":e[10]||(e[10]=y=>i.showModal=y),classes:"modal-container","content-class":"modal-content"},{default:b(()=>{var y;return[s("div",j,[s("div",K,[Q,s("button",{class:"modal-close",onClick:e[0]||(e[0]=a=>i.showModal=!1)},X)]),Y,u(c,{ref:"findSources",src:(y=t.$refs.source)==null?void 0:y.value,title:i.title,artist:i.artist},{default:b(()=>[s("div",Z,[s("button",{onClick:e[1]||(e[1]=()=>t.$refs.upSong.click())},te),s("input",se,null,512),s("input",{onChange:e[2]||(e[2]=(...a)=>l.loadMetadata&&l.loadMetadata(...a)),type:"text",ref:"source"},null,544),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[3]||(e[3]=(...a)=>l.opencontextmenu&&l.opencontextmenu(...a))},"more_vert",512)])]),_:1},8,["src","title","artist"]),le,s("div",ie,[m(s("input",{"onUpdate:modelValue":e[4]||(e[4]=a=>i.title=a),type:"text"},null,512),[[_,i.title]])]),oe,s("div",ne,[s("input",ae,null,512)]),re,s("div",de,[m(s("input",{"onUpdate:modelValue":e[5]||(e[5]=a=>i.artist=a),type:"text"},null,512),[[_,i.artist]])]),ce,s("div",pe,[s("button",{onClick:e[6]||(e[6]=()=>t.$refs.upCover.click())},he),s("input",ye,null,512),m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[7]||(e[7]=a=>i.cover=a),ref:"cover"},null,512),[[_,i.cover]]),s("img",{onClick:e[8]||(e[8]=(...a)=>l.openInNewTab&&l.openInNewTab(...a)),class:"addSong cover",src:l.parseCover(i.cover)},null,8,me)]),s("div",_e,[s("button",{onClick:e[9]||(e[9]=(...a)=>l.add&&l.add(...a)),class:"negative"},"Add")])])]}),_:1},8,["onClick","modelValue"])])}const ve=P(G,[["render",fe],["__scopeId","data-v-264f144f"]]);const ge={name:"EditPlaylist",props:{playlistName:String,playlistDescription:String,playlistCover:String},mounted(){this.$refs.upCover.addEventListener("change",()=>{console.log("Cover changed");const t=new FormData;var e=this.$refs.upCover.files[0],o=e.slice(0,e.size,e.type);const d=e.name.split(".").pop();var i=new File([o],this.playlistName+`.${d}`,{type:e.type});t.append("file",i),fetch("/api/config/images",{method:"POST",body:t}).then(l=>l.text()).then(l=>this.cover=l),console.log("Cover uploaded")})},data(){return{showModal:!1,name:this.playlistName,description:this.playlistDescription,cover:this.playlistCover}},methods:{parsePlaylistCover:I,apply(){this.showModal=!1,fetch(`/api/playlists/${C(this.$route.params.id)}`,{method:"POST",body:JSON.stringify({name:this.name||"N/A",description:this.description||"N/A",cover:this.cover||"/assets/img/music_placeholder.png"})}).then(t=>{console.log(t),this.$emit("close")})},remove(){fetch(`/api/playlists/${Number(C(this.$route.params.id))}`,{method:"DELETE"}).then(()=>{this.$router.push("/")})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}},watch:{playlistName(){this.name=this.playlistName},playlistDescription(){this.description=this.playlistDescription},playlistCover(){this.cover=this.playlistCover}}},f=t=>(S("data-v-69cf1822"),t=t(),x(),t),be={class:"wrapper"},Ce={class:"header"},we=f(()=>s("h3",null,"Edit details",-1)),Pe=f(()=>s("span",{class:"material-symbols-rounded"},"close",-1)),Se=[Pe],xe=f(()=>s("h4",null,"Name",-1)),Ne={class:"content"},Ie=f(()=>s("h4",null,"Description",-1)),ke={class:"content"},$e=f(()=>s("h4",null,"Cover",-1)),De={class:"content"},Me=f(()=>s("span",{class:"material-symbols-rounded"},"file_upload",-1)),Te=[Me],Ve={type:"file",ref:"upCover",style:{display:"none"},accept:"image/*"},Fe=["src"],Ee={class:"confirm"};function Ue(t,e,o,d,i,l){const c=p("vue-final-modal");return v(),g("div",null,[u(c,{modelValue:i.showModal,"onUpdate:modelValue":e[8]||(e[8]=n=>i.showModal=n),classes:"modal-container","content-class":"modal-content"},{default:b(()=>[s("div",be,[s("div",Ce,[we,s("button",{class:"modal-close",onClick:e[0]||(e[0]=n=>i.showModal=!1)},Se)]),xe,s("div",Ne,[m(s("input",{"onUpdate:modelValue":e[1]||(e[1]=n=>i.name=n),type:"text",ref:"name"},null,512),[[_,i.name]])]),Ie,s("div",ke,[m(s("input",{"onUpdate:modelValue":e[2]||(e[2]=n=>i.description=n),type:"text",ref:"description"},null,512),[[_,i.description]])]),$e,s("div",De,[s("button",{onClick:e[3]||(e[3]=()=>t.$refs.upCover.click())},Te),s("input",Ve,null,512),m(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[4]||(e[4]=n=>i.cover=n),ref:"cover"},null,512),[[_,i.cover]]),s("img",{onClick:e[5]||(e[5]=(...n)=>l.openInNewTab&&l.openInNewTab(...n)),class:"addSong cover",src:l.parsePlaylistCover(i.cover)},null,8,Fe)]),s("div",Ee,[s("button",{onClick:e[6]||(e[6]=(...n)=>l.remove&&l.remove(...n)),class:"negative left"},"Delete"),s("button",{onClick:e[7]||(e[7]=(...n)=>l.apply&&l.apply(...n)),class:"negative"},"Save")])])]),_:1},8,["modelValue"])])}const Oe=P(ge,[["render",Ue],["__scopeId","data-v-69cf1822"]]);const Ae={components:{PlaylistEntry:U,FixedPlaylistHeader:F,GridHeader:E,AddSong:ve,EditPlaylist:Oe,draggable:q},name:"Playlist",data(){return this.updatePlaylist(),fetch("/api/playlists").then(t=>t.json()).then(t=>{this.playlists=t}),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A",playlistDescription:"",playlistCover:null,playlists:[],store:H()}},methods:{parseCover:N,parsePlaylistCover:I,getId(){return C(this.$route.params.id)},download(t){var o;const e=(o=this.playlist)==null?void 0:o[t];window.open(`/api/tracks/${e.id}/download`)},onPlaylistRearrange(t){const e=t.moved;!e||fetch(`/api/playlists/${this.getId()}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:e.oldIndex,songNewIndex:e.newIndex})})},headerVisibilityChanged(t){this.fixedHeaderHidden=t},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},editPlaylist(){this.$refs.editPlaylistPopup.showModal=!0},updateIsPlaying(){this.playlist.forEach(t=>{t.playing=t.id==this.currentSong})},updatePlaylist(){if(!!this.getId()&&!!this.$route.path.includes("/playlist/")){if(this.$route.params.id=="create"){fetch("/api/playlists/new").then(t=>t.text()).then(t=>{const e=L(t);this.$router.push(e)});return}fetch(`/api/playlists/${this.getId()}`).then(async t=>{if(t.status==404){this.$router.push("/");return}const e=await t.json();this.playlist=e.songs,this.playlistName=e.name,this.playlistDescription=e.description,this.playlistCover=e.cover,document.title=`${this.playlistName} - reAudioPlayer One`,this.updateIsPlaying()})}},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"playlist"})})}},computed:{autogeneratedDescription(){return`${this.playlist.length} ${this.playlist.length==1?"song":"songs"}${this.estimatedDuration}`},currentSong(){return this.store.song.id},estimatedDuration(){let t=0,e=!1;if(!this.playlist.length)return"";for(const c of this.playlist){e=e||c.duration=="-1:59";const n=c.duration=="-1:59"?"3:00":c.duration,[y,a]=n.split(":");t+=Number(y*60)+Number(a)}const o=t,d=Math.floor(o/60),i=Math.floor(d/60),l=e?", about ":", ";return i?l+`${i} hr ${d-i*60} min`:d?l+`${d} min ${o-d*60} sec`:l+t+" sec"}},mounted(){this.updatePlaylist()},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},k=t=>(S("data-v-b55b33d8"),t=t(),x(),t),He={class:"playlist"},Le=["src"],ze={class:"details"},Je={class:"muted description"},Re={class:"mobileMenu showIfMobile"},Be=k(()=>s("hr",null,null,-1)),qe={class:"padding-20"},Ge={class:"grid"},je=k(()=>s("hr",null,null,-1)),Ke={class:"playlistEntries"};function Qe(t,e,o,d,i,l){const c=p("AddSong"),n=p("EditPlaylist"),y=p("fixed-playlist-header"),a=p("h7"),$=p("grid-header"),D=p("playlist-entry"),M=p("draggable"),T=B("observe-visibility");return v(),g("div",He,[u(c,{onClose:l.updatePlaylist,ref:"addSongPopup"},null,8,["onClose"]),u(n,{onClose:l.updatePlaylist,playlistCover:i.playlistCover,playlistName:i.playlistName,playlistDescription:i.playlistDescription,ref:"editPlaylistPopup"},null,8,["onClose","playlistCover","playlistName","playlistDescription"]),u(y,{onLoadPlaylist:l.loadPlaylist,ref:"fixedHeading",class:z({hidden:i.fixedHeaderHidden}),title:i.playlistName},null,8,["onLoadPlaylist","class","title"]),m((v(),g("div",{class:"padding-20 playlisteditor",onClick:e[0]||(e[0]=(...r)=>l.editPlaylist&&l.editPlaylist(...r))},[i.playlistCover?(v(),g("img",{key:0,class:"cover",src:l.parsePlaylistCover(i.playlistCover)},null,8,Le)):J("",!0),s("div",ze,[u(a,{class:"hideIfMobile"},{default:b(()=>[R("Playlist")]),_:1}),s("h1",null,w(i.playlistName),1),s("h5",null,w(i.playlistDescription),1),s("p",Je,w(l.autogeneratedDescription),1)])])),[[T,l.headerVisibilityChanged]]),s("div",Re,[s("span",{onClick:e[1]||(e[1]=()=>t.$emit("toggleFullSidebar")),class:"material-symbols-rounded"},"menu")]),Be,s("div",qe,[s("span",{id:"loadPlaylist",onClick:e[2]||(e[2]=(...r)=>l.loadPlaylist&&l.loadPlaylist(...r)),class:"material-symbols-rounded"},"play_circle"),s("span",{id:"addToPlaylist",onClick:e[3]||(e[3]=(...r)=>l.addToPlaylist&&l.addToPlaylist(...r)),class:"material-symbols-rounded"},"add_circle"),s("div",Ge,[u($,{class:"hideIfMobile"}),je,s("div",Ke,[u(M,{modelValue:i.playlist,"onUpdate:modelValue":e[4]||(e[4]=r=>i.playlist=r),onChange:l.onPlaylistRearrange},{item:b(({element:r})=>[u(D,{playlists:i.playlists,onDownload:l.download,onRequestUpdate:l.updatePlaylist,index:i.playlist.findIndex(V=>V.source==r.source),source:r.source,playing:r.playing,id:r.id,title:r.title,album:r.album,artist:r.artist,cover:r.cover,favourite:r.favourite,duration:r.duration},null,8,["playlists","onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"])]),_:1},8,["modelValue","onChange"])])])])])}const lt=P(Ae,[["render",Qe],["__scopeId","data-v-b55b33d8"]]);export{lt as default};
