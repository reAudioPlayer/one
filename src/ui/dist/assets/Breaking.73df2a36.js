import{F as k,G as x}from"./FixedPlaylistHeader.72fdc21b.js";import{P as b}from"./PlaylistEntry.69546d1f.js";import{_ as w,o as r,c as d,g as p,k as N,m as P,w as H,b as C,a as i,t as y,F as S,i as B,f as T,e as c,l as D,p as V,h as F}from"./index.a74bbc0a.js";import"./EditSong.b22377bc.js";import"./FindSources.3ce57d46.js";const I={components:{PlaylistEntry:b,FixedPlaylistHeader:k,GridHeader:x},name:"Tracks",data(){return this.updateTracks(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A"}},methods:{connect(){const e=this;console.log("attempting reconnect");let s=new WebSocket("ws://localhost:1234/ws");s.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},s.onopen=()=>{console.log("ws connected")},s.onmessage=function(a){const l=JSON.parse(a.data);e.updateData(l)}},updateData(e){var s;if(e.path=="player.song"){let a=((s=e==null?void 0:e.data)==null?void 0:s.title)||"N/A";for(const l of this.playlist)l.playing=l.title==a}},headerVisibilityChanged(e){this.fixedHeaderHidden=e},updateTracks(){fetch("/api/me/new").then(e=>e.json()).then(e=>{this.playlist=e.songs,this.playlistName=e.name,console.log(this.playlist),this.connect()})},loadPlaylist(){console.log("hello"),fetch("/api/player/load",{method:"POST",body:JSON.stringify({type:"collection/breaking"})})}}},u=e=>(V("data-v-419f6fd7"),e=e(),F(),e),E={class:"playlist"},O={class:"padding-20"},A=u(()=>i("hr",null,null,-1)),G={class:"padding-20"},J={class:"grid"},z=u(()=>i("hr",null,null,-1)),L={class:"playlistEntries"};function W(e,s,a,l,o,n){const h=c("fixed-playlist-header"),f=c("h7"),g=c("grid-header"),m=c("playlist-entry"),v=D("observe-visibility");return r(),d("div",E,[p(h,{onClick:n.loadPlaylist,ref:"fixedHeading",class:N({hidden:o.fixedHeaderHidden}),title:o.playlistName},null,8,["onClick","class","title"]),P((r(),d("div",O,[p(f,null,{default:H(()=>[C("Playlist")]),_:1}),i("h1",null,y(o.playlistName),1),i("h5",null,"Your "+y(o.playlist.length)+" newest tracks, auto-generated just for you",1)])),[[v,n.headerVisibilityChanged]]),A,i("div",G,[i("span",{id:"loadPlaylist",onClick:s[0]||(s[0]=(...t)=>n.loadPlaylist&&n.loadPlaylist(...t)),class:"material-icons-outlined"},"play_circle_filled"),i("div",J,[p(g),z,i("div",L,[(r(!0),d(S,null,B(o.playlist,(t,_)=>(r(),T(m,{key:_,index:_,source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])])])])}const R=w(I,[["render",W],["__scopeId","data-v-419f6fd7"]]);export{R as default};