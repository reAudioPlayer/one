import{F as m,G as v}from"./FixedPlaylistHeader.2772a387.js";import{P as b}from"./PlaylistEntry.a9a6d9e3.js";import{_ as k,s as x,o as l,c as r,g as n,k as P,m as S,w as H,b as N,a as i,t as p,F as C,i as w,f as I,e as o,l as B,p as V,h as E}from"./index.f115d27f.js";import"./EditSong.48ffc584.js";import"./FindSources.746e29fb.js";const F={components:{PlaylistEntry:b,FixedPlaylistHeader:m,GridHeader:v},data(){return this.updateTracks(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A"}},computed:x("player",{currentSong:e=>e.song.id}),watch:{currentSong(){this.updateIsPlaying()}},methods:{updateIsPlaying(){console.log("Updating is playing",this.currentSong),this.playlist.forEach(e=>{e.playing=e.id==this.currentSong})},headerVisibilityChanged(e){this.fixedHeaderHidden=e},updateTracks(){fetch("/api/me/new").then(e=>e.json()).then(e=>{this.playlist=e.songs,this.playlistName=e.name,this.updateIsPlaying()})},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({type:"collection/breaking"})})}}},_=e=>(V("data-v-61d00be7"),e=e(),E(),e),T={class:"playlist"},D={class:"padding-20"},G=_(()=>i("hr",null,null,-1)),O={class:"padding-20"},j={class:"grid"},z=_(()=>i("hr",null,null,-1)),A={class:"playlistEntries"};function J(e,d,L,U,s,a){const u=o("fixed-playlist-header"),y=o("h7"),h=o("grid-header"),g=o("playlist-entry"),f=B("observe-visibility");return l(),r("div",T,[n(u,{onClick:a.loadPlaylist,ref:"fixedHeading",class:P({hidden:s.fixedHeaderHidden}),title:s.playlistName},null,8,["onClick","class","title"]),S((l(),r("div",D,[n(y,null,{default:H(()=>[N("Playlist")]),_:1}),i("h1",null,p(s.playlistName),1),i("h5",null,"Your "+p(s.playlist.length)+" newest tracks, auto-generated just for you",1)])),[[f,a.headerVisibilityChanged]]),G,i("div",O,[i("span",{id:"loadPlaylist",onClick:d[0]||(d[0]=(...t)=>a.loadPlaylist&&a.loadPlaylist(...t)),class:"material-icons-outlined"},"play_circle_filled"),i("div",j,[n(h),z,i("div",A,[(l(!0),r(C,null,w(s.playlist,(t,c)=>(l(),I(g,{key:c,index:c,source:t.source,id:t.id,title:t.title,playing:t.playing,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"]))),128))])])])])}const R=k(F,[["render",J],["__scopeId","data-v-61d00be7"]]);export{R as default};