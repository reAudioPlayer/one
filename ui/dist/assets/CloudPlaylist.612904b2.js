import{_ as y,o,c as n,a as l,t as a,b as d,F as h,d as u}from"./index.7a0dd187.js";const _={name:"cloudPlaylist",props:{playlist:Object,localPlaylists:Array,cloudPlaylists:Array},data(){return{statusText:""}},methods:{import(){this.statusIcon!="cloud_done"&&this.statusIcon=="cloud"&&(this.statusText="creating playlist...",fetch("/api/playlists/new").then(async e=>{this.statusText="updating playlist...";const t=Number(await e.text());await fetch(`/api/playlists/${t}`,{method:"POST",body:JSON.stringify({name:this.playlist.name,description:this.playlist.description})});for(let s=0;s<this.playlist.songs.length;s++){const i=this.playlist.songs[s];this.statusText=`adding song ${s} / ${this.playlist.songs.length-1}...`,await fetch(`/api/playlists/${t}/tracks`,{method:"POST",body:JSON.stringify({source:i.source,title:i.title,artist:i.artist,album:i.album,cover:i.cover,favourite:i.favourite,duration:i.duration})})}this.statusText=""}))}},computed:{cover(){var e,t;return((t=(e=this.playlist.songs)==null?void 0:e[0])==null?void 0:t.cover)||"/assets/img/music_placeholder.png"},statusIcon(){if(this.statusText)return"cloud_sync";const e=this.localPlaylists||this.cloudPlaylists;return e.filter(t=>JSON.stringify(t)==JSON.stringify(this.playlist)).length?"cloud_done":e.filter(t=>t.name==this.playlist.name).length?"cloud_sync":this.localPlaylists?"cloud":"cloud_off"}}},p={class:"cloudPlaylist"},m=["src"],g={class:"data"},f={class:"lead"},v={class:"status"},x={class:"material-symbols-rounded"},P={key:0,class:"lead"};function T(e,t,s,i,c,r){return o(),n("div",p,[l("span",{onClick:t[0]||(t[0]=()=>e.$emit("remove")),class:"close material-symbols-rounded"},"close"),l("img",{src:r.cover},null,8,m),l("div",g,[l("h2",null,a(s.playlist.name),1),l("div",f,[d(a(s.playlist.songs.length)+" "+a(s.playlist.songs.length==1?"song":"songs"),1),s.playlist.description?(o(),n(h,{key:0},[d(" \u2022 "),l("i",null,a(s.playlist.description),1)],64)):u("",!0)]),l("div",v,[l("span",x,a(r.statusIcon),1),c.statusText?(o(),n("div",P,[l("i",null,a(c.statusText),1)])):u("",!0)])])])}const N=y(_,[["render",T],["__scopeId","data-v-820ce587"]]);export{N as C};
