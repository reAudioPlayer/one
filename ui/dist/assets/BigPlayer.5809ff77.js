import{S as b,E as k}from"./EditSong.1f273c75.js";import{H as x,_ as S,M as w,g as d,o as u,e as P,w as f,b as r,a as o,n as c,t as m,c as v,Z as _,F as N,d as O,f as A,p as C,h as M}from"./index.8323245e.js";import{S as B}from"./SpotifyPlaylistHeader.2c824f0f.js";import"./FindSources.b942a4be.js";const I=new x("reapOne.track",22),T={name:"LightPlaylistEntry",components:{SongCtx:b,EditSong:k,Marquee:w},props:{index:Number,id:Number,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},source:String,album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1},playing:{type:Boolean,default:!1}},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},computed:{trackId(){return I.encode(this.id)}},methods:{download(){window.open("/api/download/"+this.id)},addToPlaylist(t){fetch("/api/add",{method:"POST",body:JSON.stringify({id:t,source:this.source})}).then(e=>{e.status==200&&this.$emit("requestUpdate")})},update(){this.$refs.editSongPopup.showModal=!0},remove(){fetch("/api/remove",{method:"POST",body:JSON.stringify({songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){console.log(this.$route.path);const t={index:this.index};fetch("/api/at",{method:"POST",body:JSON.stringify(t)})},setFavourite(){fetch("/api/updateSong",{method:"POST",body:JSON.stringify({id:this.id,favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover,source:this.source})})},displayPlay(){const t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId(){const t=this.$refs.idOrPlay;t.innerHTML=this.index+1,t.classList.remove("material-icons-round")}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"},favourited(){this.setFavourite()},favourite(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}},L={class:"track"},E=["src"],D={class:"trackwrapper"},H={class:"duration"};function q(t,e,i,h,s,l){const p=d("EditSong"),y=d("Marquee"),a=d("router-link"),g=d("SongCtx");return u(),P(g,{onDownload:l.download,onAddto:l.addToPlaylist,onRemove:l.remove,onUpdate:l.update,onLike:e[5]||(e[5]=n=>s.favourited=!s.favourited),isAutoPlaylist:s.isAutoPlaylist,liked:s.favourited,ref:"ctxMenu"},{default:f(()=>[r(p,{onClose:t.updatePlaylist,ref:"editSongPopup",cover:i.cover,id:i.id,title:i.title,album:i.album,artist:i.artist,source:i.source},null,8,["onClose","cover","id","title","album","artist","source"]),o("div",{onDblclick:e[1]||(e[1]=()=>{l.playAt(),l.onselect()}),onClick:e[2]||(e[2]=(...n)=>l.onselect&&l.onselect(...n)),onMouseover:e[3]||(e[3]=(...n)=>l.displayPlay&&l.displayPlay(...n)),onMouseleave:e[4]||(e[4]=(...n)=>l.displayId&&l.displayId(...n)),class:c(["playlistEntry",{selected:s.highlighted}])},[o("span",{onClick:e[0]||(e[0]=(...n)=>l.playAt&&l.playAt(...n)),ref:"idOrPlay",class:c([{playing:i.playing},"id"])},m(i.index+1),3),o("div",L,[o("img",{src:i.cover||"/assets/img/music_placeholder.png"},null,8,E),o("div",D,[o("span",{class:c(["title",{playing:i.playing}])},[r(a,{class:"linkOnHover",to:`/track/${l.trackId}`},{default:f(()=>[r(y,{text:i.title},null,8,["text"])]),_:1},8,["to"])],2),o("span",{class:c(["artist",{playing:i.playing}])},[r(a,{class:"linkOnHover",to:`/search/${i.artist}`},{default:f(()=>[r(y,{text:i.artist},null,8,["text"])]),_:1},8,["to"])],2)])]),o("span",H,m(i.duration),1)],34)]),_:1},8,["onDownload","onAddto","onRemove","onUpdate","isAutoPlaylist","liked"])}var J=S(T,[["render",q],["__scopeId","data-v-36120bd4"]]);const U={components:{LightPlaylistEntry:J,SpotifyPlaylistHeader:B},name:"BigPlayer",methods:{toggleMaximise(){this.maximised=!this.maximised,this.$emit("maximise",this.maximised)},fetchPlaylist(){fetch("/api/playlist",{method:"POST"}).then(t=>t.json()).then(t=>this.playlist=t)},updateData(t){var e,i;if(t.path=="player.song"){this.cover=((e=t==null?void 0:t.data)==null?void 0:e.cover)||"/assets/img/music_placeholder.png",this.currentSongName=((i=t==null?void 0:t.data)==null?void 0:i.title)||"";return}if(t.path=="player.playState"){this.playing=(t==null?void 0:t.data)||!1;return}}},data(){const t=()=>{console.log("attempting reconnect");let e=new WebSocket("ws://localhost:1234/ws");e.onclose=()=>{console.log("ws closed"),setTimeout(t,1e3)},e.onopen=()=>{console.log("ws connected")},e.onmessage=i=>{const h=JSON.parse(i.data);this.updateData(h)}};return t(),this.fetchPlaylist(),{cover:"/assets/img/music_placeholder.png",playlist:[],currentSongName:"",maximised:!1,noPlaylist:!1,playing:!1,animate:!1}}},F=t=>(C("data-v-f2b85cac"),t=t(),M(),t),R={class:"bigPlayer"},V={class:"upNow"},z=["src"],W=F(()=>o("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),Z={key:0,class:"playlistOverflow"},G={class:"playlist"},K={class:"settings"};function Q(t,e,i,h,s,l){const p=d("spotify-playlist-header"),y=d("light-playlist-entry");return u(),v("div",R,[o("div",V,[o("img",{src:s.cover,class:c({playing:s.playing,animate:s.animate})},null,10,z),o("div",{class:c(["blocks",{playing:s.playing,animate:s.animate}])},[W,o("div",{class:"block",style:_({"animation-delay":".25s"})},null,4),o("div",{class:"block",style:_({"animation-delay":".5s"})},null,4)],2)]),s.noPlaylist?A("",!0):(u(),v("div",Z,[o("div",G,[r(p),(u(!0),v(N,null,O(s.playlist.songs,a=>(u(),P(y,{key:a.source,onDownload:t.download,onRequestUpdate:t.updatePlaylist,index:s.playlist.songs.findIndex(g=>g.source==a.source),source:a.source,playing:a.title==s.currentSongName,id:a.id,title:a.title,album:a.album,artist:a.artist,cover:a.cover,favourite:a.favourite,duration:a.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))])])),o("div",K,[o("span",{onClick:e[0]||(e[0]=(...a)=>l.toggleMaximise&&l.toggleMaximise(...a)),class:"iconButton material-symbols-rounded"},m(s.maximised?"fullscreen_exit":"fullscreen"),1),o("span",{onClick:e[1]||(e[1]=()=>s.noPlaylist=!s.noPlaylist),class:"iconButton material-symbols-rounded",style:_({transform:`rotate(${s.noPlaylist?0:180}deg)`})},"menu_open",4),o("span",{onClick:e[2]||(e[2]=()=>s.animate=!s.animate),class:"iconButton material-symbols-rounded"},m(s.animate?"motion_photos_off":"animation"),1)])])}var tt=S(U,[["render",Q],["__scopeId","data-v-f2b85cac"]]);export{tt as default};
