import{F as E,G as I}from"./FixedPlaylistHeader.6e8358aa.js";import{_ as T}from"./EditSong.vue_vue_type_script_setup_true_lang.629ea41c.js";import{d as A}from"./vuedraggable.umd.ac7b9f65.js";import{M as H}from"./MiniPlayer.c46c7208.js";import{_ as b,e as d,o as u,c as h,g as n,x as _,t as c,d as y,a as s,p as g,bL as V,z as v,w as f,b as D,J as L,bG as M,k as O,l as j}from"./index.08918264.js";import"./song.ef42d390.js";import"./Dropdown.27fca163.js";const B={components:{MiniPlayer:H},name:"SpotifyPlaylistEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,cover:String,album:String,preview:String},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},methods:{remove(){fetch(`/api/playlists/${this.$route.params.id}/tracks`,{method:"DELETE",body:JSON.stringify({songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){this.$emit("edit",this.index)},add(){console.log("add"),this.$emit("add",this.index)}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},J={class:"track"},R=["src"],q={class:"trackwrapper"},G={class:"title"},U={class:"artist"};function z(l,t,a,p,e,o){const m=d("mini-player");return u(),h("div",{onDblclick:t[2]||(t[2]=()=>{o.playAt(),o.onselect()}),onClick:t[3]||(t[3]=(...r)=>o.onselect&&o.onselect(...r)),onMouseover:t[4]||(t[4]=r=>e.hovering=!0),onMouseleave:t[5]||(t[5]=r=>e.hovering=!1),class:_(["playlistEntry",{selected:e.highlighted}])},[n(m,{class:_(["miniPlayer",{hidden:!e.hovering}]),title:a.title,artist:a.artist,src:a.source},null,8,["class","title","artist","src"]),e.hovering?y("",!0):(u(),h("span",{key:0,onClick:t[0]||(t[0]=(...r)=>l.edit&&l.edit(...r)),class:"id"},c(a.index+1),1)),s("div",J,[s("img",{src:a.cover||"/assets/img/music_placeholder.png"},null,8,R),s("div",q,[s("span",G,c(a.title),1),s("span",U,c(a.artist),1)]),y("",!0)]),s("span",{onClick:t[1]||(t[1]=(...r)=>o.add&&o.add(...r)),class:"material-icons-round edit",ref:"add"},"add",512)],34)}const F=b(B,[["render",z],["__scopeId","data-v-d2738e1c"]]);const K={components:{FixedPlaylistHeader:E,GridHeader:I,draggable:A,SpotifyPlaylistEntry:F,EditSong:T},data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,title:"N/A",artist:"N/A",album:"N/A",cover:g(null),src:"",id:-1,recommendations:[]}},methods:{getId(){return V(this.$route.params.id)},onPlaylistRearrange(l){l.moved},headerVisibilityChanged(l){this.fixedHeaderHidden=l},editSong(){this.$refs.editSongPopup.show()},addToPlaylist(){},updatePlaylist(){!this.getId()||!this.$route.path.includes("/track/")||fetch(`/api/tracks/${this.getId()}`).then(async l=>{if(l.status==404){this.$router.push("/");return}const t=await l.json();console.log(t),this.title=t.title||"N/A",this.artist=t.artist||"N/A",this.cover=g(t.cover),this.src=t.source,this.album=t.album||"N/A",this.id=t.id,document.title=`${this.title} \u2022 ${this.artist}`;const p=await(await fetch("/api/spotify/recommendations",{method:"POST",body:JSON.stringify({query:`${this.artist} ${this.title}`})})).json();this.recommendations.push(...p)})},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.getId()),type:"track"})})}},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},P=l=>(O("data-v-92518461"),l=l(),j(),l),Q={class:"playlist"},W=["src"],X={class:"details"},Y=P(()=>s("hr",null,null,-1)),Z={class:"padding-20"},$={class:"grid"},tt=P(()=>s("hr",null,null,-1)),et={class:"playlistEntries"};function it(l,t,a,p,e,o){const m=d("EditSong"),r=d("fixed-playlist-header"),S=d("h7"),k=d("grid-header"),x=d("spotify-playlist-entry"),N=d("draggable"),w=L("observe-visibility");return u(),h("div",Q,[n(m,{onClose:o.updatePlaylist,ref:"editSongPopup",song:{cover:e.cover,album:e.album,title:e.title,artist:e.artist,source:e.src,id:e.id}},null,8,["onClose","song"]),n(r,{onLoadPlaylist:o.loadPlaylist,ref:"fixedHeading",class:_({hidden:e.fixedHeaderHidden}),title:`${e.artist} - ${e.title}`},null,8,["onLoadPlaylist","class","title"]),v((u(),h("div",{class:"padding-20 songdetails",onClick:t[0]||(t[0]=(...i)=>o.editSong&&o.editSong(...i))},[s("img",{class:"cover",src:e.cover},null,8,W),s("div",X,[n(S,null,{default:f(()=>[D("Song")]),_:1}),s("h1",null,c(e.title),1),s("h5",null,c(e.artist),1)])])),[[w,o.headerVisibilityChanged]]),Y,s("div",Z,[s("span",{id:"loadPlaylist",onClick:t[1]||(t[1]=(...i)=>o.loadPlaylist&&o.loadPlaylist(...i)),class:"material-icons-outlined"},"play_circle_filled"),v(s("span",{id:"addToPlaylist",onClick:t[2]||(t[2]=(...i)=>o.addToPlaylist&&o.addToPlaylist(...i)),class:"material-icons-outlined"},"add_circle",512),[[M,!1]]),s("div",$,[s("h2",null,c("Recommendations based on "+e.title),1),n(k),tt,s("div",et,[n(N,{modelValue:e.recommendations,"onUpdate:modelValue":t[3]||(t[3]=i=>e.recommendations=i)},{item:f(({element:i})=>[n(x,{onRequestUpdate:o.updatePlaylist,index:e.recommendations.findIndex(C=>C.src==i.src),source:i.src,id:i.id,title:i.title,album:i.album,artist:i.artists.join(", "),preview:i.preview,cover:i.cover,favourite:i.favourite,duration:i.duration},null,8,["onRequestUpdate","index","source","id","title","album","artist","preview","cover","favourite","duration"])]),_:1},8,["modelValue"])])])])])}const ct=b(K,[["render",it],["__scopeId","data-v-92518461"]]);export{ct as default};
