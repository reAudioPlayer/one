import{_ as f,o as r,c,a as t,j as m,n as p,g as h,F as v,i as S,f as b,d as x,t as y,p as w,h as P,e as u}from"./index.2e71dd7d.js";import{L as k}from"./LightPlaylistEntry.52e4d1fc.js";import{S as B}from"./SpotifyPlaylistHeader.64f43971.js";import"./EditSong.cecb325e.js";import"./FindSources.20bff8bd.js";const N={components:{LightPlaylistEntry:k,SpotifyPlaylistHeader:B},name:"BigPlayer",methods:{toggleMaximise(){this.maximised=!this.maximised,this.$emit("maximise",this.maximised)},fetchPlaylist(){fetch("/api/me/player/current-playlist").then(s=>s.json()).then(s=>this.playlist=s)},updateData(s){var o,n,a,e;if(console.log(s),s.path=="player.song"){if(this.cover=((o=s==null?void 0:s.data)==null?void 0:o.cover)||"/assets/img/music_placeholder.png",this.currentSongName=((n=s==null?void 0:s.data)==null?void 0:n.title)||"",this.$refs.playlistScroll.scrollTop)return;const i=(e=document.getElementById(`bplayer-entry-${(a=s==null?void 0:s.data)==null?void 0:a.id}`))==null?void 0:e.offsetTop;!i&&i!=0&&window.setTimeout(()=>this.updateData(s),1e3),i>=354&&(this.$refs.playlistScroll.scrollTop=i-354);return}if(s.path=="player.playState"){this.playing=(s==null?void 0:s.data)||!1;return}}},data(){const s=()=>{console.log("attempting reconnect");let o=new WebSocket("ws://localhost:1234/ws");o.onclose=()=>{console.log("ws closed"),setTimeout(s,1e3)},o.onopen=()=>{console.log("ws connected")},o.onmessage=n=>{const a=JSON.parse(n.data);this.updateData(a)}};return s(),this.fetchPlaylist(),{cover:"/assets/img/music_placeholder.png",playlist:[],currentSongName:"",maximised:!1,noPlaylist:!1,playing:!1,animate:!1}}},C=s=>(w("data-v-690eb2d6"),s=s(),P(),s),D={class:"bigPlayer"},I={class:"upNow"},T=["src"],E=C(()=>t("div",{class:"block",style:{"animation-delay":"0s"}},null,-1)),L={key:0,class:"playlistOverflow"},M={class:"playlist",ref:"playlistScroll"},V={class:"settings"};function q(s,o,n,a,e,i){const d=u("spotify-playlist-header"),g=u("light-playlist-entry");return r(),c("div",D,[t("div",I,[t("img",{src:e.cover,class:m({playing:e.playing,animate:e.animate})},null,10,T),t("div",{class:m(["blocks",{playing:e.playing,animate:e.animate}])},[E,t("div",{class:"block",style:p({"animation-delay":".25s"})},null,4),t("div",{class:"block",style:p({"animation-delay":".5s"})},null,4)],2)]),e.noPlaylist?x("",!0):(r(),c("div",L,[t("div",M,[h(d),(r(!0),c(v,null,S(e.playlist.songs,l=>(r(),b(g,{key:l.source,onDownload:s.download,onRequestUpdate:s.updatePlaylist,index:e.playlist.songs.findIndex(_=>_.source==l.source),source:l.source,playing:l.title==e.currentSongName,id:l.id,title:l.title,album:l.album,artist:l.artist,cover:l.cover,favourite:l.favourite,duration:l.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"]))),128))],512)])),t("div",V,[t("span",{onClick:o[0]||(o[0]=(...l)=>i.toggleMaximise&&i.toggleMaximise(...l)),class:"iconButton material-symbols-rounded"},y(e.maximised?"fullscreen_exit":"fullscreen"),1),t("span",{onClick:o[1]||(o[1]=()=>e.noPlaylist=!e.noPlaylist),class:"iconButton material-symbols-rounded",style:p({transform:`rotate(${e.noPlaylist?0:180}deg)`})},"menu_open",4),t("span",{onClick:o[2]||(o[2]=()=>e.animate=!e.animate),class:"iconButton material-symbols-rounded"},y(e.animate?"motion_photos_off":"animation"),1)])])}var H=f(N,[["render",q],["__scopeId","data-v-690eb2d6"]]);export{H as default};
