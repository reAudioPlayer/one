import{F}from"./FixedPlaylistHeader.25f2b10c.js";import{a as H,P as O}from"./PlaylistEntry.57562802.js";import{F as C,T as N,a as V,b as M,e as q,h as A,i as U,g as B}from"./song.0328dbbf.js";import{m as I,q as _,o as P,f as k,w as b,g as u,K as z,N as D,x as R,z as J,s as L,_ as K,j,J as G,i as Q,p as W,O as X,c as S,n as Y,B as Z,d as $,a as c,b as ee,t as x,e as g,I as te,k as se,l as ae}from"./index.a83ce700.js";import{d as le}from"./vuedraggable.umd.a0c14494.js";import"./EditSong.vue_vue_type_script_setup_true_lang.3c2803b2.js";import"./playerInPicture.37a9ab56.js";const ie=I({__name:"AddNewSong",setup(a,{expose:i}){const o=z(),r={title:"",artist:"",album:"",cover:"",src:""},l=async(d,e)=>{const t=R(String(new Date().getTime())),m=new FormData,n="."+e.name.split(".").pop();var f=e.slice(0,e.size,e.type),w=new File([f],t+n,{type:e.type});return m.append("file",w),await(await fetch(d,{method:"POST",body:m})).text()},s=_([{name:"src",type:"upload",accept:"audio/mp3",required:!0,onUpload:d=>{l("/api/config/tracks",d).then(e=>r.src=e)},onChange:async d=>{const e=await M(d);s.value.find(t=>t.name==="title").value=e.title,s.value.find(t=>t.name==="artist").value=e.artist,s.value.find(t=>t.name==="album").value=e.album,s.value.find(t=>t.name==="cover").value=e.cover,s.value.find(t=>t.name==="src").value=e.src},value:r.src},{name:"title",type:"text",required:!0,value:r.title},{name:"artist",type:"text",required:!0,value:r.artist},{name:"album",type:"text",value:r.album},{name:"cover",type:"upload",accept:"image/*",imagePreview:!0,value:r.cover,onUpload:d=>{l("/api/config/images",d).then(e=>r.cover=e)}}]),p=_(null),y=_(null),h=()=>{p.value.show()},v=async d=>{const e=Number(D(String(o.params.id)));await V(e,y.value.toObject())};return i({show:h}),(d,e)=>(P(),k(N,{ref_key:"modal",ref:p,name:"Add Song",submitName:"Save",onSubmit:v,onClose:e[0]||(e[0]=t=>d.$emit("close"))},{default:b(()=>[u(C,{ref_key:"form",ref:y,options:s.value},null,8,["options"])]),_:1},512))}}),oe=I({__name:"EditPlaylist",props:{playlist:{type:Object,required:!0}},setup(a,{expose:i}){const o=a,r=async(e,t)=>{const m=new FormData,n="."+t.name.split(".").pop();var f=t.slice(0,t.size,t.type),w=new File([f],o.playlist.name+n,{type:t.type});return m.append("file",w),await(await fetch(e,{method:"POST",body:m})).text()};J(()=>o.playlist,e=>{l.value.find(t=>t.name=="name").value=e.name,l.value.find(t=>t.name=="description").value=e.description,l.value.find(t=>t.name=="cover").value=e.cover},{deep:!0});const l=_([{name:"name",type:"text",required:!0,value:o.playlist.name},{name:"description",type:"text",required:!0,value:o.playlist.description},{name:"cover",type:"upload",accept:"image/*",imagePreview:!0,value:o.playlist.cover,onUpload:e=>{r("/api/config/images",e).then(t=>o.playlist.cover=t)}}]),s=_(null),p=_(null),y=L(),h=()=>{s.value.show()},v=async()=>{await q({...o.playlist,...p.value.toObject()})},d=async()=>{await A(o.playlist.id),await y.push("/collection/playlists")};return i({show:h}),(e,t)=>(P(),k(N,{ref_key:"modal",ref:s,name:"Edit Playlist",submitName:"Save",onSubmit:v,onClose:t[0]||(t[0]=m=>e.$emit("close")),secondaryName:"Delete",secondaryType:"danger",onSecondary:d},{default:b(()=>[u(C,{ref_key:"form",ref:p,options:l.value},null,8,["options"])]),_:1},512))}});j();const ne={components:{PlaylistEntry:H,FixedPlaylistHeader:F,PlaylistHeader:O,AddSong:ie,EditPlaylist:oe,draggable:le},name:"Playlist",data(){return this.updatePlaylist(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A",playlistDescription:"",playlistCover:null,store:G(),selectedSongId:-1}},methods:{parseCover:Q,parsePlaylistCover:W,download(a){var o;const i=(o=this.playlist)==null?void 0:o[a];window.open(`/api/tracks/${i.id}/download`)},onPlaylistRearrange(a){const i=a.moved;!i||fetch(`/api/playlists/${this.id}/tracks`,{method:"PUT",body:JSON.stringify({songOldIndex:i.oldIndex,songNewIndex:i.newIndex})})},headerVisibilityChanged(a){this.fixedHeaderHidden=a},addToPlaylist(){this.$refs.addSongPopup.show()},editPlaylist(){this.$refs.editPlaylistPopup.show()},updateIsPlaying(){this.playlist.forEach(a=>{a.playing=a.id==this.currentSong})},updatePlaylist(){if(!!this.id&&!!this.$route.path.includes("/playlist/")){if(this.$route.params.id=="create"){U().then(a=>{const i=X(a);this.$router.push(i)});return}B(this.id).then(async a=>{if(!a){this.$router.push("/");return}this.playlist=a.songs,this.playlistName=a.name,this.playlistDescription=a.description,this.playlistCover=a.cover,document.title=`${this.playlistName} - reAudioPlayer One`,this.updateIsPlaying()})}},loadPlaylist(){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:Number(this.id),type:"playlist"})})}},computed:{id(){return D(this.$route.params.id)},autogeneratedDescription(){return`${this.playlist.length} ${this.playlist.length==1?"song":"songs"}${this.estimatedDuration}`},currentSong(){return this.store.song.id},estimatedDuration(){let a=0,i=!1;if(!this.playlist.length)return"";for(const p of this.playlist){i=i||p.duration=="-1:59";const y=p.duration=="-1:59"?"3:00":p.duration,[h,v]=y.split(":");a+=Number(h*60)+Number(v)}const o=a,r=Math.floor(o/60),l=Math.floor(r/60),s=i?", about ":", ";return l?s+`${l} hr ${r-l*60} min`:r?s+`${r} min ${o-r*60} sec`:s+a+" sec"}},mounted(){this.updatePlaylist()},watch:{$route(){this.updatePlaylist()},currentSong(){this.updateIsPlaying()}}},T=a=>(se("data-v-ca412dd1"),a=a(),ae(),a),re={class:"playlist"},de=["src"],ce={class:"details"},pe={class:"muted description"},ue={class:"mobileMenu showIfMobile"},ye=T(()=>c("hr",null,null,-1)),me={class:"padding-20"},he={class:"grid"},ve=T(()=>c("hr",null,null,-1)),ge={class:"playlistEntries"};function fe(a,i,o,r,l,s){const p=g("AddSong"),y=g("EditPlaylist"),h=g("fixed-playlist-header"),v=g("h7"),d=g("PlaylistHeader"),e=g("PlaylistEntry"),t=g("draggable"),m=te("observe-visibility");return P(),S("div",re,[u(p,{onClose:s.updatePlaylist,ref:"addSongPopup"},null,8,["onClose"]),u(y,{onClose:s.updatePlaylist,playlist:{name:l.playlistName,description:l.playlistDescription,cover:l.playlistCover,id:s.id},ref:"editPlaylistPopup"},null,8,["onClose","playlist"]),u(h,{onLoadPlaylist:s.loadPlaylist,ref:"fixedHeading",class:Y({hidden:l.fixedHeaderHidden}),title:l.playlistName},null,8,["onLoadPlaylist","class","title"]),Z((P(),S("div",{class:"padding-20 playlisteditor",onClick:i[0]||(i[0]=(...n)=>s.editPlaylist&&s.editPlaylist(...n))},[l.playlistCover?(P(),S("img",{key:0,class:"cover",src:s.parsePlaylistCover(l.playlistCover)},null,8,de)):$("",!0),c("div",ce,[u(v,{class:"hideIfMobile"},{default:b(()=>[ee("Playlist")]),_:1}),c("h1",null,x(l.playlistName),1),c("h5",null,x(l.playlistDescription),1),c("p",pe,x(s.autogeneratedDescription),1)])])),[[m,s.headerVisibilityChanged]]),c("div",ue,[c("span",{onClick:i[1]||(i[1]=()=>a.$emit("toggleFullSidebar")),class:"material-symbols-rounded"},"menu")]),ye,c("div",me,[c("span",{id:"loadPlaylist",onClick:i[2]||(i[2]=(...n)=>s.loadPlaylist&&s.loadPlaylist(...n)),class:"material-symbols-rounded"},"play_circle"),c("span",{id:"addToPlaylist",onClick:i[3]||(i[3]=(...n)=>s.addToPlaylist&&s.addToPlaylist(...n)),class:"material-symbols-rounded"},"add_circle"),c("div",he,[u(d,{class:"hideIfMobile","with-more":""}),ve,c("div",ge,[u(t,{modelValue:l.playlist,"onUpdate:modelValue":i[4]||(i[4]=n=>l.playlist=n),onChange:s.onPlaylistRearrange},{item:b(({element:n})=>[u(e,{index:l.playlist.findIndex(f=>f.source==n.source),song:n,"with-cover":"","with-album":"","with-more":"","playlist-id":Number(s.id),onClick:f=>l.selectedSongId==n.id?l.selectedSongId=-1:l.selectedSongId=n.id,onUpdate:s.updatePlaylist,selected:l.selectedSongId==n.id},null,8,["index","song","playlist-id","onClick","onUpdate","selected"])]),_:1},8,["modelValue","onChange"])])])])])}const Ne=K(ne,[["render",fe],["__scopeId","data-v-ca412dd1"]]);export{Ne as default};
