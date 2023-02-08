import{m as C,j as S,n as c,o as f,f as w,w as b,g as d,u as k,B as T,a as u,_ as A,h as j,p as x,e as h,c as B,d as N,t as D}from"./index.458fd4ed.js";import{F as M,T as O,a as V,c as q}from"./song.d5ee386f.js";import{P as E}from"./Playlist.07136cc4.js";import{T as F}from"./TrackInfo.3d368c6c.js";import{p as H}from"./playerInPicture.37a9ab56.js";const L=u("br",null,null,-1),W=C({__name:"ImportSpotifyPlaylist",props:{playlist:{type:Object,required:!0}},setup(n,{expose:i}){const e=n,p=S(),r=c([{name:"playlist",type:"dropdown",required:!0,value:null,options:p.playlistsAsDropdown}]),o=c(null),l=c(null),s=c([]),m=async()=>{if(o.value.load(),s.value.length==0){const a=await fetch(`/api/spotify/playlists/${e.playlist.id}`);s.value=await a.json()}o.value.show()},P=()=>{H("Spotify Playlist",e.playlist.name,e.playlist.href)},y=async a=>{if(a==="new"){const t=await q(e.playlist.name,e.playlist.description,e.playlist.cover);return r.value[0].options=p.playlistsAsDropdown,r.value[0].value=t,t}return Number(a)},v=async(a,t=null)=>{s.value[a].added||(t!=null||(t=l.value.toObject().playlist),t=await y(t),await V(t!=null?t:l.value.toObject().playlist,s.value[a]),s.value[a].added=!0)},g=async()=>{let a=l.value.toObject().playlist;a=await y(a),s.value.forEach((t,_)=>{v(_,a)})};return i({show:m}),(a,t)=>(f(),w(O,{ref_key:"modal",ref:o,submit:{label:"Add All",icon:"add"},name:"Import Playlist",onClose:t[0]||(t[0]=_=>a.$emit("close")),onSubmit:g},{default:b(()=>[d(F,{cover:n.playlist.cover,icons:[{name:"share",onClick:()=>k(T)(n.playlist.href)},{name:"play_arrow",onClick:P}],title:n.playlist.name},null,8,["cover","icons","title"]),d(M,{ref_key:"form",ref:l,options:r.value},null,8,["options"]),L,d(E,{songs:s.value,onAdd:v},null,8,["songs"])]),_:1},512))}});const $={components:{Cover:j,AddPlaylistToPlaylist:W},name:"PlaylistItem",methods:{parseCover:x,redirect(){this.spotify?this.$refs.import.show():this.$router.push(this.href)}},props:{cover:String,title:String,description:String,href:String,spotify:Boolean,id:String}},z={class:"wrapper drop-shadow-md"},G=["innerHTML"];function J(n,i,e,p,r,o){const l=h("add-playlist-to-playlist"),s=h("Cover");return f(),B("div",z,[e.spotify?(f(),w(l,{key:0,ref:"import",playlist:{cover:e.cover,name:e.title,description:e.description,id:e.id,href:e.href}},null,8,["playlist"])):N("",!0),u("div",{class:"item",onClick:i[0]||(i[0]=(...m)=>o.redirect&&o.redirect(...m))},[d(s,{src:o.parseCover(e.cover),type:"playlist"},null,8,["src"]),u("h4",null,D(e.title),1),u("p",{class:"text-muted text-xs hideIfMobile",innerHTML:e.description},null,8,G)])])}const Y=A($,[["render",J],["__scopeId","data-v-008cdf52"]]);export{Y as P};
