import{S,E as x}from"./EditSong.54508eda.js";import{H as b,_ as P,M as w,b as d,o as u,i as k,f,e as r,a as o,n as c,t as m,c as v,Z as _,F as N,h as A,j as C,p as M,k as O}from"./index.cd4dc793.js";import{S as B}from"./SpotifyPlaylistHeader.ab0230b8.js";import"./FindSources.1e27d9d1.js";const I=new b("reapOne.track",22),L={name:"LightPlaylistEntry",components:{SongCtx:S,EditSong:x,Marquee:w},props:{index:Number,id:Number,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},source:String,album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1},playing:{type:Boolean,default:!1}},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},computed:{trackId(){return I.encode(this.id)}},methods:{download(){window.open(`/api/tracks/${this.id}/download`)},addToPlaylist(t){fetch(`/api/playlists/${t}/tracks`,{method:"POST",body:JSON.stringify({source:this.source})}).then(e=>{e.status==200&&this.$emit("requestUpdate")})},update(){this.$refs.editSongPopup.showModal=!0},remove(){},onselect(){this.highlighted=!this.highlighted},playAt(){console.log(this.$route.path);const t={index:this.index};fetch("/api/player/at",{method:"POST",body:JSON.stringify(t)})},setFavourite(){fetch(`/api/tracks/${this.id}`,{method:"PUT",body:JSON.stringify({favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover,source:this.source})})},displayPlay(){const t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId(){const t=this.$refs.idOrPlay;t.innerHTML=this.index+1,t.classList.remove("material-icons-round")}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"},favourited(){this.setFavourite()},favourite(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}},T={class:"track"},E=["src"],D={class:"trackwrapper"},H={class:"duration"};function q(t,e,i,p,s,l){const h=d("EditSong"),y=d("Marquee"),a=d("router-link"),g=d("SongCtx");return u(),k(g,{onDownload:l.download,onAddto:l.addToPlaylist,onRemove:l.remove,onUpdate:l.update,onLike:e[5]||(e[5]=n=>s.favourited=!s.favourited),isAutoPlaylist:s.isAutoPlaylist,liked:s.favourited,ref:"ctxMenu"},{default:f(()=>[r(h,{onClose:t.updatePlaylist,ref:"editSongPopup",cover:i.cover,id:i.id,title:i.title,album:i.album,artist:i.artist,source:i.source},null,8,["onClose","cover","id","title","album","artist","source"]),o("div",{onDblclick:e[1]||(e[1]=()=>{l.playAt(),l.onselect()}),onClick:e[2]||(e[2]=(...n)=>l.onselect&&l.onselect(...n)),onMouseover:e[3]||(e[3]=(...n)=>l.displayPlay&&l.displayPlay(...n)),onMouseleave:e[4]||(e[4]=(...n)=>l.displayId&&l.displayId(...n)),class:c(["playlistEntry",{selected:s.highlighted}])},[o("span",{onClick:e[0]||(e[0]=(...n)=>l.playAt&&l.playAt(...n)),ref:"idOrPlay",class:c([{playing:i.playing},"id"])},m(i.index+1),3),o("div",T,[o("img",{src:i.cover||"/assets/img/music_placeholder.png"},null,8,E),o("div",D,[o("span",{class:c(["title",{playing:i.playing}])},[r(a,{class:"linkOnHover",to:`/track/${l.trackId}`},{default:f(()=>[r(y,{text:i.title},null,8,["text"])]),_:1},8,["to"])],2),o("span",{class:c(["artist",{playing:i.playing}])},[r(a,{class:"linkOnHover",to:`/search/${i.artist}`},{default:f(()=>[r(y,{text:i.artist},null,8,["text"])]),_:1},8,["to"])],2)])]),o("span",H,m(i.duration),1)],34)]),_:1},8,["onDownload","onAddto","onRemove","onUpdate","isAutoPlaylist","liked"])}var U=P(L,[["render",q],["__scopeId","data-v-24409e84"]]);const F={components:{LightPlaylistEntry:U,SpotifyPlaylistHeader:B},name:"BigPlayer",methods:{toggleMaximise(){this.maximised=!this.maximised,this.$emit("maximise",this.maximised)},fetchPlaylist(){fetch("/api/playlists/id",{method:"POST"}).then(t=>t.json()).then(t=>this.playlist=t)},updateData(t){var e,i;if(t.path=="player.song"){this.cover=((e=t==null?void 0:t.data)==null?void 0:e.cover)||"/assets/img/music_placeholder.png",this.currentSongName=((i=t==null?void 0:t.data)==null?void 0:i.title)||"";return}if(t.path=="player.playState"){this.playing=(t==null?void 0:t.data)||!1;return}}},data(){const t=()=>{console.log("attempting reconnect");let e=new WebSocket("ws://localhost:1234/ws");e.onclose=()=>{console.log("ws closed"),setTimeout(t,1e3)},e.onopen=()=>{console.log("ws connected")},e.onmessage=i=>{const p=JSON.parse(i.data);this.updateData(p)}};return t(),this.fetchPlaylist(),{cover:"/assets/img/music_placeholder.png",playlist:[],currentSongName:"",maximised:!1,noPlaylist:!1,playing:!1,animate:!1}}},J=t=>(M("data-v-40916ac0"),t=t(),O(),t),R={class:"bigPlayer"},V={class:"upNow"},z=["src"],W=J(()=>o("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),Z={key:0,class:"playlistOverflow"},G={class:"playlist"},K={class:"settings"};function Q(t,e,i,p,s,l){const h=d("spotify-playlist-header"),y=d("light-playlist-entry");return u(),v("div",R,[o("div",V,[o("img",{src:s.cover,class:c({playing:s.playing,animate:s.animate})},null,10,z),o("div",{class:c(["blocks",{playing:s.playing,animate:s.animate}])},[W,o("div",{class:"block",style:_({"animation-delay":".25s"})},null,4),o("div",{class:"block",style:_({"animation-delay":".5s"})},null,4)],2)]),s.noPlaylist?C("",!0):(u(),v("div",Z,[o("div",G,[r(h),(u(!0),v(N,null,A(s.playlist.songs,a=>(u(),k(y,{key:a.source,onDownload:t.download,onRequestUpdate:t.updatePlaylist,index:s.playlist.songs.findIndex(g=>g.source==a.source),source:a.source,playing:a.title==s.currentSongName,id:a.id,title:a.title,album:a.album,artist:a.artist,cover:a.cover,favourite:a.favourite,duration:a.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))])])),o("div",K,[o("span",{onClick:e[0]||(e[0]=(...a)=>l.toggleMaximise&&l.toggleMaximise(...a)),class:"iconButton material-symbols-rounded"},m(s.maximised?"fullscreen_exit":"fullscreen"),1),o("span",{onClick:e[1]||(e[1]=()=>s.noPlaylist=!s.noPlaylist),class:"iconButton material-symbols-rounded",style:_({transform:`rotate(${s.noPlaylist?0:180}deg)`})},"menu_open",4),o("span",{onClick:e[2]||(e[2]=()=>s.animate=!s.animate),class:"iconButton material-symbols-rounded"},m(s.animate?"motion_photos_off":"animation"),1)])])}var tt=P(F,[["render",Q],["__scopeId","data-v-40916ac0"]]);export{tt as default};
