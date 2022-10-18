import{F as S,G as w}from"./FixedPlaylistHeader.c279929c.js";import{d as x}from"./vuedraggable.umd.52d3130a.js";import{S as k}from"./SpotifyPlaylistEntry.54878a53.js";import{_ as H,H as I,s as N,o as c,c as p,g as l,k as T,m as C,a as i,w as u,b as V,t as r,e as d,l as O,p as j,h as A}from"./index.644d6423.js";import"./MiniPlayer.5afae591.js";const E=new I("reapOne.track",22),R={components:{FixedPlaylistHeader:S,GridHeader:w,draggable:x,SpotifyPlaylistEntry:k},data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,title:"N/A",artist:"N/A",cover:"/assets/img/music_placeholder.png",recommendations:[]}},computed:N("player",{currentSong:s=>s.song.id}),methods:{getId(){return E.decode(this.$route.params.id)},onPlaylistRearrange(s){s.moved},headerVisibilityChanged(s){this.fixedHeaderHidden=s},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},editPlaylist(){this.$refs.editPlaylistPopup.showModal=!0},updateIsPlaying(){console.log("Updating is playing",this.currentSong),this.playlist.forEach(s=>{s.playing=s.id==this.currentSong})},updatePlaylist(){!this.getId()||!this.$route.path.includes("/track/")||fetch(`/api/tracks/${this.getId()}`).then(async s=>{if(s.status==404){this.$router.push("/");return}const e=await s.json();console.log(e),this.title=e.title||"N/A",this.artist=e.artist||"N/A",this.cover=e.cover||"/assets/img/music_placeholder.png",document.title=`${this.title} \u2022 ${this.artist}`,this.connect();const n=await(await fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.artist} ${this.title}`})})).json();this.recommendations.push(...n)})},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"track"})})}},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},h=s=>(j("data-v-a7f51400"),s=s(),A(),s),U={class:"playlist"},q=["src"],B={class:"details"},D=h(()=>i("hr",null,null,-1)),F={class:"padding-20"},G={class:"grid"},J=h(()=>i("hr",null,null,-1)),L={class:"playlistEntries"};function M(s,e,y,n,o,a){const _=d("fixed-playlist-header"),m=d("h7"),g=d("grid-header"),f=d("spotify-playlist-entry"),v=d("draggable"),P=O("observe-visibility");return c(),p("div",U,[l(_,{onLoadPlaylist:a.loadPlaylist,ref:"fixedHeading",class:T({hidden:o.fixedHeaderHidden}),title:s.playlistName},null,8,["onLoadPlaylist","class","title"]),C((c(),p("div",{class:"padding-20 songdetails",onClick:e[0]||(e[0]=(...t)=>a.editPlaylist&&a.editPlaylist(...t))},[i("img",{class:"cover",src:o.cover},null,8,q),i("div",B,[l(m,null,{default:u(()=>[V("Song")]),_:1}),i("h1",null,r(o.title),1),i("h5",null,r(o.artist),1)])])),[[P,a.headerVisibilityChanged]]),D,i("div",F,[i("span",{id:"loadPlaylist",onClick:e[1]||(e[1]=(...t)=>a.loadPlaylist&&a.loadPlaylist(...t)),class:"material-icons-outlined"},"play_circle_filled"),i("span",{id:"addToPlaylist",onClick:e[2]||(e[2]=(...t)=>a.addToPlaylist&&a.addToPlaylist(...t)),class:"material-icons-outlined"},"add_circle"),i("div",G,[i("h2",null,r("Recommendations based on "+o.title),1),l(g),J,i("div",L,[l(v,{modelValue:o.recommendations,"onUpdate:modelValue":e[3]||(e[3]=t=>o.recommendations=t)},{item:u(({element:t})=>[l(f,{onRequestUpdate:a.updatePlaylist,index:o.recommendations.findIndex(b=>b.src==t.src),source:t.src,id:t.id,title:t.title,album:t.album,artist:t.artists.join(", "),preview:t.preview,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["onRequestUpdate","index","source","id","title","album","artist","preview","cover","favourite","duration"])]),_:1},8,["modelValue"])])])])])}const Y=H(R,[["render",M],["__scopeId","data-v-a7f51400"]]);export{Y as default};
