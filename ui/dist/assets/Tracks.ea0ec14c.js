import{F as m,G as k}from"./FixedPlaylistHeader.6286b9da.js";import{P as x}from"./PlaylistEntry.0d345d7d.js";import{_ as b,o as c,c as d,e as p,n as N,w as P,f as w,a as i,t as H,F as C,h as S,i as T,g as D,p as V,k as B,b as r,d as F}from"./index.10a92c10.js";import"./EditSong.806dd83c.js";import"./FindSources.998960d3.js";const I={components:{PlaylistEntry:x,FixedPlaylistHeader:m,GridHeader:k},name:"Tracks",data(){return this.updateTracks(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A"}},methods:{connect(){const t=this;console.log("attempting reconnect");let s=new WebSocket("ws://localhost:1234/ws");s.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},s.onopen=()=>{console.log("ws connected")},s.onmessage=function(l){const a=JSON.parse(l.data);t.updateData(a)}},updateData(t){var s;if(t.path=="player.song"){let l=((s=t==null?void 0:t.data)==null?void 0:s.title)||"N/A";for(const a of this.playlist)a.playing=a.title==l}},headerVisibilityChanged(t){this.fixedHeaderHidden=t},updateTracks(){fetch("/api/collection/tracks").then(t=>t.json()).then(t=>{this.playlist=t.songs,this.playlistName=t.name,console.log(this.playlist),this.connect()})},loadPlaylist(){fetch("/api/loadPlaylist",{method:"POST",body:JSON.stringify({type:"collection"})})}}},_=t=>(V("data-v-5a3c8f7b"),t=t(),B(),t),E={class:"playlist"},O={class:"padding-20"},A=D("Playlist"),G=_(()=>i("h5",null,"My Description",-1)),J=_(()=>i("hr",null,null,-1)),z={class:"padding-20"},L={class:"grid"},M=_(()=>i("hr",null,null,-1)),W={class:"playlistEntries"};function q(t,s,l,a,o,n){const h=r("fixed-playlist-header"),u=r("h7"),f=r("grid-header"),v=r("playlist-entry"),g=F("observe-visibility");return c(),d("div",E,[p(h,{onClick:n.loadPlaylist,ref:"fixedHeading",class:N({hidden:o.fixedHeaderHidden}),title:o.playlistName},null,8,["onClick","class","title"]),P((c(),d("div",O,[p(u,null,{default:w(()=>[A]),_:1}),i("h1",null,H(o.playlistName),1),G])),[[g,n.headerVisibilityChanged]]),J,i("div",z,[i("span",{id:"loadPlaylist",onClick:s[0]||(s[0]=(...e)=>n.loadPlaylist&&n.loadPlaylist(...e)),class:"material-icons-outlined"},"play_circle_filled"),i("div",L,[p(f),M,i("div",W,[(c(!0),d(C,null,S(o.playlist,(e,y)=>(c(),T(v,{key:y,index:y,source:e.source,id:e.id,title:e.title,playing:e.playing,album:e.album,artist:e.artist,cover:e.cover,favourite:e.favourite,duration:e.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])])])])}var Y=b(I,[["render",q],["__scopeId","data-v-5a3c8f7b"]]);export{Y as default};
