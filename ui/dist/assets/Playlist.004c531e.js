import{F as M,G as k}from"./FixedPlaylistHeader.b6306be2.js";import{P as O}from"./PlaylistEntry.cbea0de5.js";import{F as A}from"./FindSources.654050db.js";import{_ as P,g as d,o as v,c as f,b as r,w as y,a as s,j as h,k as m,p as w,h as S,n as E,t as x,l as U,i as H}from"./index.3ba6d211.js";import{d as F}from"./vuedraggable.umd.43a5f148.js";import"./EditSong.d8f4fadf.js";const $={name:"AddSong",components:{FindSources:A},data(){return{showModal:!1,cover:"",artist:"",title:""}},methods:{opencontextmenu(e){this.$refs.findSources.show(e)},hideFindSourcesCtx(){this.$refs.findSources.hide()},add(){this.showModal=!1,console.log("fetch"),fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),source:this.$refs.source.value,title:this.title,artist:this.artist,album:this.$refs.album.value,cover:this.cover})}).then(e=>{console.log(e),this.$emit("close")})},loadMetadata(){fetch("http://localhost:1234/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(e=>e.json()).then(e=>{console.log(e),this.title=e.title,this.$refs.album.value=e.album,this.artist=e.artists.join(", "),this.cover=e.cover,this.$refs.source.value=e.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}}},u=e=>(w("data-v-66395acc"),e=e(),S(),e),J={class:"wrapper"},R={class:"header"},B=u(()=>s("h3",null,"Add song",-1)),L=u(()=>s("span",{class:"material-icons-round"}," close ",-1)),q=[L],G=u(()=>s("h4",null,"Source",-1)),z={class:"content"},W=u(()=>s("h4",null,"Title",-1)),K={class:"content"},Q=u(()=>s("h4",null,"Album",-1)),X={class:"content"},Y={type:"text",ref:"album"},Z=u(()=>s("h4",null,"Artist",-1)),j={class:"content"},tt=u(()=>s("h4",null,"Cover",-1)),et={class:"content"},st=["src"],lt={class:"confirm"};function ot(e,t,c,p,l,o){const _=d("FindSources"),a=d("vue-final-modal");return v(),f("div",null,[r(a,{onClick:o.hideFindSourcesCtx,modelValue:l.showModal,"onUpdate:modelValue":t[8]||(t[8]=i=>l.showModal=i),classes:"modal-container","content-class":"modal-content"},{default:y(()=>[s("div",J,[s("div",R,[B,s("button",{class:"modal-close",onClick:t[0]||(t[0]=i=>l.showModal=!1)},q)]),G,r(_,{ref:"findSources",title:l.title,artist:l.artist},{default:y(()=>[s("div",z,[s("input",{onChange:t[1]||(t[1]=(...i)=>o.loadMetadata&&o.loadMetadata(...i)),type:"text",ref:"source"},null,544),s("span",{class:"material-icons-round more",ref:"sourceMore",onClick:t[2]||(t[2]=(...i)=>o.opencontextmenu&&o.opencontextmenu(...i))},"more_vert",512)])]),_:1},8,["title","artist"]),W,s("div",K,[h(s("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>l.title=i),type:"text"},null,512),[[m,l.title]])]),Q,s("div",X,[s("input",Y,null,512)]),Z,s("div",j,[h(s("input",{"onUpdate:modelValue":t[4]||(t[4]=i=>l.artist=i),type:"text"},null,512),[[m,l.artist]])]),tt,s("div",et,[h(s("input",{type:"text",class:"addSong cover","onUpdate:modelValue":t[5]||(t[5]=i=>l.cover=i),ref:"cover"},null,512),[[m,l.cover]]),s("img",{onClick:t[6]||(t[6]=(...i)=>o.openInNewTab&&o.openInNewTab(...i)),class:"addSong cover",src:l.cover?l.cover:"/assets/img/music_placeholder.png"},null,8,st)]),s("div",lt,[s("button",{onClick:t[7]||(t[7]=(...i)=>o.add&&o.add(...i)),class:"negative"},"Add")])])]),_:1},8,["onClick","modelValue"])])}var it=P($,[["render",ot],["__scopeId","data-v-66395acc"]]);const nt={name:"EditPlaylist",props:{playlistName:String,playlistDescription:String},data(){return{showModal:!1,cover:"",name:this.playlistName,description:this.playlistDescription}},methods:{apply(){this.showModal=!1,console.log("fetch"),fetch("http://localhost:1234/api/updatePlaylist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),name:this.name,description:this.description})}).then(e=>{console.log(e),this.$emit("close")})},remove(){fetch(`http://localhost:1234/api/playlist/${Number(this.$route.params.id)}`,{method:"DELETE"}).then(()=>{this.$router.push("/")})}},watch:{playlistName(){this.name=this.playlistName},playlistDescription(){this.description=this.playlistDescription}}},g=e=>(w("data-v-14a39040"),e=e(),S(),e),at={class:"wrapper"},dt={class:"header"},rt=g(()=>s("h3",null,"Edit details",-1)),ct=g(()=>s("span",{class:"material-icons-round"}," close ",-1)),pt=[ct],ut=g(()=>s("h4",null,"Name",-1)),ht={class:"content"},_t=g(()=>s("h4",null,"Description",-1)),mt={class:"content"},yt={class:"confirm"};function vt(e,t,c,p,l,o){const _=d("vue-final-modal");return v(),f("div",null,[r(_,{modelValue:l.showModal,"onUpdate:modelValue":t[5]||(t[5]=a=>l.showModal=a),classes:"modal-container","content-class":"modal-content"},{default:y(()=>[s("div",at,[s("div",dt,[rt,s("button",{class:"modal-close",onClick:t[0]||(t[0]=a=>l.showModal=!1)},pt)]),ut,s("div",ht,[h(s("input",{"onUpdate:modelValue":t[1]||(t[1]=a=>l.name=a),type:"text",ref:"name"},null,512),[[m,l.name]])]),_t,s("div",mt,[h(s("input",{"onUpdate:modelValue":t[2]||(t[2]=a=>l.description=a),type:"text",ref:"description"},null,512),[[m,l.description]])]),s("div",yt,[s("button",{onClick:t[3]||(t[3]=(...a)=>o.remove&&o.remove(...a)),class:"negative left"},"Delete"),s("button",{onClick:t[4]||(t[4]=(...a)=>o.apply&&o.apply(...a)),class:"negative"},"Save")])])]),_:1},8,["modelValue"])])}var ft=P(nt,[["render",vt],["__scopeId","data-v-14a39040"]]);const gt={components:{PlaylistEntry:O,FixedPlaylistHeader:M,GridHeader:k,AddSong:it,EditPlaylist:ft,draggable:F},name:"Playlist",data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A",playlistDescription:""}},methods:{download(e){var c;const t=(c=this.playlist)==null?void 0:c[e];window.open("http://localhost:1234/api/download/"+t.id)},onPlaylistRearrange(e){const t=e.moved;!t||fetch("http://localhost:1234/api/rearrange",{method:"POST",body:JSON.stringify({playlistIndex:Number(this.$route.params.id),songOldIndex:t.oldIndex,songNewIndex:t.newIndex})})},connect(){const e=this;console.log("attempting reconnect");let t=new WebSocket("ws://localhost:1234/ws");t.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},t.onopen=()=>{console.log("ws connected")},t.onmessage=function(c){const p=JSON.parse(c.data);e.updateData(p)}},headerVisibilityChanged(e){this.fixedHeaderHidden=e},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},editPlaylist(){this.$refs.editPlaylistPopup.showModal=!0},updateData(e){var t;if(e.path=="player.song"){let c=((t=e==null?void 0:e.data)==null?void 0:t.title)||"N/A";for(const p of this.playlist)p.playing=p.title==c}},updatePlaylist(){if(!!this.$route.params.id&&!!this.$route.path.includes("/playlist/")){if(this.$route.params.id=="create"){fetch("http://localhost:1234/api/playlist/create").then(e=>e.text()).then(e=>{console.log(e),this.$router.push(e)});return}fetch("http://localhost:1234/api/playlist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})}).then(async e=>{if(e.status==404){this.$router.push("/");return}const t=await e.json();this.playlist=t.songs,this.playlistName=t.name,this.playlistDescription=t.description,document.title=`${this.playlistName} - reAudioPlayer One`,console.log(this.playlist),this.connect()})}},loadPlaylist(){fetch("http://localhost:1234/api/loadPlaylist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),type:"playlist"})})}},watch:{$route(){this.updatePlaylist()}}},b=e=>(w("data-v-c8ac8c26"),e=e(),S(),e),Pt={class:"playlist"},wt=U("Playlist"),St=b(()=>s("hr",null,null,-1)),xt={class:"padding-20"},bt={class:"grid"},Nt=b(()=>s("hr",null,null,-1)),Ct={class:"playlistEntries"};function Dt(e,t,c,p,l,o){const _=d("AddSong"),a=d("EditPlaylist"),i=d("fixed-playlist-header"),N=d("h7"),C=d("grid-header"),D=d("playlist-entry"),V=d("draggable"),T=H("observe-visibility");return v(),f("div",Pt,[r(_,{onClose:o.updatePlaylist,ref:"addSongPopup"},null,8,["onClose"]),r(a,{onClose:o.updatePlaylist,playlistName:l.playlistName,playlistDescription:l.playlistDescription,ref:"editPlaylistPopup"},null,8,["onClose","playlistName","playlistDescription"]),r(i,{onLoadPlaylist:o.loadPlaylist,ref:"fixedHeading",class:E({hidden:l.fixedHeaderHidden}),title:l.playlistName},null,8,["onLoadPlaylist","class","title"]),h((v(),f("div",{class:"padding-20 playlisteditor",onClick:t[0]||(t[0]=(...n)=>o.editPlaylist&&o.editPlaylist(...n))},[r(N,null,{default:y(()=>[wt]),_:1}),s("h1",null,x(l.playlistName),1),s("h5",null,x(l.playlistDescription),1)])),[[T,o.headerVisibilityChanged]]),St,s("div",xt,[s("span",{id:"loadPlaylist",onClick:t[1]||(t[1]=(...n)=>o.loadPlaylist&&o.loadPlaylist(...n)),class:"material-icons-outlined"},"play_circle_filled"),s("span",{id:"addToPlaylist",onClick:t[2]||(t[2]=(...n)=>o.addToPlaylist&&o.addToPlaylist(...n)),class:"material-icons-outlined"},"add_circle"),s("div",bt,[r(C),Nt,s("div",Ct,[r(V,{modelValue:l.playlist,"onUpdate:modelValue":t[3]||(t[3]=n=>l.playlist=n),onChange:o.onPlaylistRearrange},{item:y(({element:n})=>[r(D,{onDownload:o.download,onRequestUpdate:o.updatePlaylist,index:l.playlist.findIndex(I=>I.source==n.source),source:n.source,playing:n.playing,id:n.id,title:n.title,album:n.album,artist:n.artist,cover:n.cover,favourite:n.favourite,duration:n.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"])]),_:1},8,["modelValue","onChange"])])])])])}var At=P(gt,[["render",Dt],["__scopeId","data-v-c8ac8c26"]]);export{At as default};
