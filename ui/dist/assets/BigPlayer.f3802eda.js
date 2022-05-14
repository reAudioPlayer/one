import{S,E as x}from"./EditSong.022ccc4b.js";import{H as k,_,M as w,g as d,o as c,e as P,w as p,b as r,a as l,n as y,t as v,c as f,Z as b,F as N,d as O,f as A}from"./index.962c26c9.js";import{S as M}from"./SpotifyPlaylistHeader.02808e31.js";import"./FindSources.2496ca74.js";const C=new k("reapOne.track",22),B={name:"LightPlaylistEntry",components:{SongCtx:S,EditSong:x,Marquee:w},props:{index:Number,id:Number,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},source:String,album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1},playing:{type:Boolean,default:!1}},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},computed:{trackId(){return C.encode(this.id)}},methods:{download(){window.open("/api/download/"+this.id)},addToPlaylist(t){fetch("/api/add",{method:"POST",body:JSON.stringify({id:t,source:this.source})}).then(e=>{e.status==200&&this.$emit("requestUpdate")})},update(){this.$refs.editSongPopup.showModal=!0},remove(){fetch("/api/remove",{method:"POST",body:JSON.stringify({songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){console.log(this.$route.path);const t={index:this.index};fetch("/api/at",{method:"POST",body:JSON.stringify(t)})},setFavourite(){fetch("/api/updateSong",{method:"POST",body:JSON.stringify({id:this.id,favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover,source:this.source})})},displayPlay(){const t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId(){const t=this.$refs.idOrPlay;t.innerHTML=this.index+1,t.classList.remove("material-icons-round")}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"},favourited(){this.setFavourite()},favourite(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}},T={class:"track"},L=["src"],E={class:"trackwrapper"},I={class:"duration"};function D(t,e,s,h,a,i){const g=d("EditSong"),u=d("Marquee"),o=d("router-link"),m=d("SongCtx");return c(),P(m,{onDownload:i.download,onAddto:i.addToPlaylist,onRemove:i.remove,onUpdate:i.update,onLike:e[5]||(e[5]=n=>a.favourited=!a.favourited),isAutoPlaylist:a.isAutoPlaylist,liked:a.favourited,ref:"ctxMenu"},{default:p(()=>[r(g,{onClose:t.updatePlaylist,ref:"editSongPopup",cover:s.cover,id:s.id,title:s.title,album:s.album,artist:s.artist,source:s.source},null,8,["onClose","cover","id","title","album","artist","source"]),l("div",{onDblclick:e[1]||(e[1]=()=>{i.playAt(),i.onselect()}),onClick:e[2]||(e[2]=(...n)=>i.onselect&&i.onselect(...n)),onMouseover:e[3]||(e[3]=(...n)=>i.displayPlay&&i.displayPlay(...n)),onMouseleave:e[4]||(e[4]=(...n)=>i.displayId&&i.displayId(...n)),class:y(["playlistEntry",{selected:a.highlighted}])},[l("span",{onClick:e[0]||(e[0]=(...n)=>i.playAt&&i.playAt(...n)),ref:"idOrPlay",class:y([{playing:s.playing},"id"])},v(s.index+1),3),l("div",T,[l("img",{src:s.cover||"/assets/img/music_placeholder.png"},null,8,L),l("div",E,[l("span",{class:y(["title",{playing:s.playing}])},[r(o,{class:"linkOnHover",to:`/track/${i.trackId}`},{default:p(()=>[r(u,{text:s.title},null,8,["text"])]),_:1},8,["to"])],2),l("span",{class:y(["artist",{playing:s.playing}])},[r(o,{class:"linkOnHover",to:`/search/${s.artist}`},{default:p(()=>[r(u,{text:s.artist},null,8,["text"])]),_:1},8,["to"])],2)])]),l("span",I,v(s.duration),1)],34)]),_:1},8,["onDownload","onAddto","onRemove","onUpdate","isAutoPlaylist","liked"])}var H=_(B,[["render",D],["__scopeId","data-v-36120bd4"]]);const q={components:{LightPlaylistEntry:H,SpotifyPlaylistHeader:M},name:"BigPlayer",methods:{toggleMaximise(){this.maximised=!this.maximised,this.$emit("maximise",this.maximised)},fetchPlaylist(){fetch("/api/playlist",{method:"POST"}).then(t=>t.json()).then(t=>this.playlist=t)},updateData(t){var e,s;if(t.path=="player.song"){this.cover=((e=t==null?void 0:t.data)==null?void 0:e.cover)||"/assets/img/music_placeholder.png",this.currentSongName=((s=t==null?void 0:t.data)==null?void 0:s.title)||"";return}}},data(){const t=()=>{console.log("attempting reconnect");let e=new WebSocket("ws://localhost:1234/ws");e.onclose=()=>{console.log("ws closed"),setTimeout(t,1e3)},e.onopen=()=>{console.log("ws connected")},e.onmessage=s=>{const h=JSON.parse(s.data);this.updateData(h)}};return t(),this.fetchPlaylist(),{cover:"/assets/img/music_placeholder.png",playlist:[],currentSongName:"",maximised:!1,noPlaylist:!1}}},J={class:"bigPlayer"},U={class:"settings"},F={class:"upNow"},R=["src"],V={key:0,class:"playlistOverflow"},z={class:"playlist"};function W(t,e,s,h,a,i){const g=d("spotify-playlist-header"),u=d("light-playlist-entry");return c(),f("div",J,[l("div",U,[l("span",{onClick:e[0]||(e[0]=(...o)=>i.toggleMaximise&&i.toggleMaximise(...o)),class:"iconButton material-symbols-rounded"},v(a.maximised?"fullscreen_exit":"fullscreen"),1),l("span",{onClick:e[1]||(e[1]=()=>a.noPlaylist=!a.noPlaylist),class:"iconButton material-symbols-rounded",style:b({transform:`rotate(${a.noPlaylist?0:180}deg)`})},"menu_open",4)]),l("div",F,[l("img",{src:a.cover},null,8,R)]),a.noPlaylist?A("",!0):(c(),f("div",V,[l("div",z,[r(g),(c(!0),f(N,null,O(a.playlist.songs,o=>(c(),P(u,{key:o.source,onDownload:t.download,onRequestUpdate:t.updatePlaylist,index:a.playlist.songs.findIndex(m=>m.source==o.source),source:o.source,playing:o.title==a.currentSongName,id:o.id,title:o.title,album:o.album,artist:o.artist,cover:o.cover,favourite:o.favourite,duration:o.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))])]))])}var X=_(q,[["render",W],["__scopeId","data-v-06c348f5"]]);export{X as default};
