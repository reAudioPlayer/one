import{F as w,G as k}from"./FixedPlaylistHeader.131dd058.js";import{E as N}from"./EditSong.2e047ad9.js";import{d as T}from"./vuedraggable.umd.287e5079.js";import{S as H}from"./SpotifyPlaylistEntry.527cf64c.js";import{_ as I,H as A,s as C,o as c,c as u,g as r,k as E,m as V,a as o,w as p,b as O,t as d,e as l,l as j,p as R,h as U}from"./index.fc9bdca8.js";import{A as q}from"./AddSongToPlaylist.755da81d.js";import"./FindSources.26858312.js";import"./MiniPlayer.5b94a8e6.js";const B=new A("reapOne.track",22),D={components:{AddSongToPlaylist:q,FixedPlaylistHeader:w,GridHeader:k,draggable:T,SpotifyPlaylistEntry:H,EditSong:N},data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,title:"N/A",artist:"N/A",album:"N/A",cover:"/assets/img/music_placeholder.png",src:"",id:-1,recommendations:[]}},computed:C("player",{currentSong:s=>s.song.id}),methods:{getId(){return B.decode(this.$route.params.id)},onPlaylistRearrange(s){s.moved},headerVisibilityChanged(s){this.fixedHeaderHidden=s},editSong(){this.$refs.editSongPopup.showModal=!0},addToPlaylist(){this.$refs.addSongPopup.showModal=!0},updateIsPlaying(){console.log("Updating is playing",this.currentSong),this.playlist.forEach(s=>{s.playing=s.id==this.currentSong})},updatePlaylist(){!this.getId()||!this.$route.path.includes("/track/")||fetch(`/api/tracks/${this.getId()}`).then(async s=>{if(s.status==404){this.$router.push("/");return}const i=await s.json();console.log(i),this.title=i.title||"N/A",this.artist=i.artist||"N/A",this.cover=i.cover||"/assets/img/music_placeholder.png",this.src=i.source,this.album=i.album||"N/A",this.id=i.id,document.title=`${this.title} \u2022 ${this.artist}`;const n=await(await fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.artist} ${this.title}`})})).json();this.recommendations.push(...n)})},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"track"})})}},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},h=s=>(R("data-v-81e704c6"),s=s(),U(),s),F={class:"playlist"},G=["src"],J={class:"details"},L=h(()=>o("hr",null,null,-1)),M={class:"padding-20"},z={class:"grid"},K=h(()=>o("hr",null,null,-1)),Q={class:"playlistEntries"};function W(s,i,m,n,t,a){const _=l("AddSongToPlaylist"),y=l("EditSong"),g=l("fixed-playlist-header"),f=l("h7"),v=l("grid-header"),P=l("spotify-playlist-entry"),S=l("draggable"),b=j("observe-visibility");return c(),u("div",F,[r(_,{cover:t.cover,title:t.title,artist:t.artist,ref:"addSongPopup",href:t.src,exists:""},null,8,["cover","title","artist","href"]),r(y,{onClose:a.updatePlaylist,ref:"editSongPopup",cover:t.cover,id:t.id,title:t.title,album:t.album,artist:t.artist,source:t.src},null,8,["onClose","cover","id","title","album","artist","source"]),r(g,{onLoadPlaylist:a.loadPlaylist,ref:"fixedHeading",class:E({hidden:t.fixedHeaderHidden}),title:`${t.artist} - ${t.title}`},null,8,["onLoadPlaylist","class","title"]),V((c(),u("div",{class:"padding-20 songdetails",onClick:i[0]||(i[0]=(...e)=>a.editSong&&a.editSong(...e))},[o("img",{class:"cover",src:t.cover},null,8,G),o("div",J,[r(f,null,{default:p(()=>[O("Song")]),_:1}),o("h1",null,d(t.title),1),o("h5",null,d(t.artist),1)])])),[[b,a.headerVisibilityChanged]]),L,o("div",M,[o("span",{id:"loadPlaylist",onClick:i[1]||(i[1]=(...e)=>a.loadPlaylist&&a.loadPlaylist(...e)),class:"material-icons-outlined"},"play_circle_filled"),o("span",{id:"addToPlaylist",onClick:i[2]||(i[2]=(...e)=>a.addToPlaylist&&a.addToPlaylist(...e)),class:"material-icons-outlined"},"add_circle"),o("div",z,[o("h2",null,d("Recommendations based on "+t.title),1),r(v),K,o("div",Q,[r(S,{modelValue:t.recommendations,"onUpdate:modelValue":i[3]||(i[3]=e=>t.recommendations=e)},{item:p(({element:e})=>[r(P,{onRequestUpdate:a.updatePlaylist,index:t.recommendations.findIndex(x=>x.src==e.src),source:e.src,id:e.id,title:e.title,album:e.album,artist:e.artists.join(", "),preview:e.preview,cover:e.cover,favourite:e.favourite,duration:e.duration},null,8,["onRequestUpdate","index","source","id","title","album","artist","preview","cover","favourite","duration"])]),_:1},8,["modelValue"])])])])])}const ot=I(D,[["render",W],["__scopeId","data-v-81e704c6"]]);export{ot as default};
