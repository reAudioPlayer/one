import{_ as y,p as h,o as n,c,a as l,t as i,b as d,F as p,d as u}from"./index.a65878b2.js";const _={name:"cloudPlaylist",props:{playlist:Object,localPlaylists:Array,cloudPlaylists:Array},data(){return{statusText:""}},methods:{parseCover:h,import(){this.statusIcon!="cloud_done"&&this.statusIcon=="cloud"&&(this.statusText="creating playlist...",fetch("/api/playlists/new").then(async e=>{this.statusText="updating playlist...";const t=Number(await e.text());await fetch(`/api/playlists/${t}`,{method:"POST",body:JSON.stringify({name:this.playlist.name,description:this.playlist.description})});for(let s=0;s<this.playlist.songs.length;s++){const a=this.playlist.songs[s];this.statusText=`adding song ${s} / ${this.playlist.songs.length-1}...`,await fetch(`/api/playlists/${t}/tracks`,{method:"POST",body:JSON.stringify({source:a.source,title:a.title,artist:a.artist,album:a.album,cover:a.cover,favourite:a.favourite,duration:a.duration})})}this.statusText=""}))}},computed:{cover(){var e,t;return this.playlist.cover||((t=(e=this.playlist.songs)==null?void 0:e[0])==null?void 0:t.cover)||"/assets/img/music_placeholder.png"},statusIcon(){if(this.statusText)return"cloud_sync";const e=this.localPlaylists||this.cloudPlaylists;return e.filter(t=>JSON.stringify(t)==JSON.stringify(this.playlist)).length?"cloud_done":e.filter(t=>t.name==this.playlist.name).length?"cloud_sync":this.localPlaylists?"cloud":"cloud_off"}}},m={class:"cloudPlaylist"},g=["src"],f={class:"data"},v={class:"lead"},x={class:"status"},P={class:"material-symbols-rounded"},T={key:0,class:"lead"};function b(e,t,s,a,r,o){return n(),c("div",m,[l("span",{onClick:t[0]||(t[0]=()=>e.$emit("remove")),class:"close material-symbols-rounded"},"close"),l("img",{src:o.parseCover(o.cover)},null,8,g),l("div",f,[l("h2",null,i(s.playlist.name),1),l("div",v,[d(i(s.playlist.songs.length)+" "+i(s.playlist.songs.length==1?"song":"songs"),1),s.playlist.description?(n(),c(p,{key:0},[d(" \u2022 "),l("i",null,i(s.playlist.description),1)],64)):u("",!0)]),l("div",x,[l("span",P,i(o.statusIcon),1),r.statusText?(n(),c("div",T,[l("i",null,i(r.statusText),1)])):u("",!0)])])])}const C=y(_,[["render",b],["__scopeId","data-v-917a200e"]]);export{C};
