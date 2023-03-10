import{F as k,T as S}from"./Form-92818e8b.js";import{P as C}from"./Playlist-6be6df27.js";import{T}from"./ExternalEntry-e73c466b.js";import{m as B,j as P,n as m,o as w,f as b,w as v,g as d,u as j,L as F,a as c,_ as I,e as _,t as h,c as N,d as O}from"./index-2fc95183.js";import{a as D,c as E}from"./song-910f5498.js";import{C as L}from"./Card-3ca661b0.js";const x=c("br",null,null,-1),M=B({__name:"ImportSpotifyArtist",props:{artist:{type:Object,required:!0}},setup(s,{expose:n}){const t=s,f=P(),r=m([{name:"playlist",type:"dropdown",required:!0,value:null,options:f.playlistsAsDropdown}]),l=m(null),i=m(null),a=m([]),p=async()=>{if(l.value.load(),a.value.length==0){const o=await fetch(`/api/spotify/artists/${t.artist.id}`);a.value=await o.json()}l.value.show()},u=async o=>{if(o==="new"){const e=await E(t.artist.name,"",t.artist.image);return r.value[0].options=f.playlistsAsDropdown,r.value[0].value=e,e}return Number(o)},y=async(o,e=null)=>{a.value[o].added||(e??(e=i.value.toObject().playlist),e=await u(e),await D(e??i.value.toObject().playlist,a.value[o]),a.value[o].added=!0)},A=async()=>{let o=i.value.toObject().playlist;o=await u(o),a.value.forEach((e,g)=>{y(g,o)})};return n({show:p}),(o,e)=>(w(),b(S,{ref_key:"modal",ref:l,submit:{label:"Add All",icon:"add"},name:"Import Artist",onClose:e[0]||(e[0]=g=>o.$emit("close")),onSubmit:A},{default:v(()=>[d(T,{cover:s.artist.image,icons:[{name:"share",onClick:()=>j(F)(s.artist.href)}],title:s.artist.name},null,8,["cover","icons","title"]),d(k,{ref_key:"form",ref:i,options:r.value},null,8,["options"]),x,d(C,{songs:a.value,onAdd:y},null,8,["songs"])]),_:1},512))}});const V={components:{Card:L,AddArtistToPlaylist:M},name:"ArtistItem",methods:{follow(s){s.stopPropagation();const n=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:n,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}},q={class:"item"},H=["src"],J=["innerHTML"];function W(s,n,t,f,r,l){const i=_("add-artist-to-playlist"),a=_("Card"),p=_("router-link");return w(),b(p,{to:"/artist/"+t.name,class:"noLink"},{default:v(()=>[d(a,{class:"wrapper","with-hover":""},{default:v(()=>[d(i,{ref:"import",artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover}},null,8,["artist"]),c("div",q,[c("img",{src:t.cover},null,8,H),c("h4",null,h(t.name),1),c("p",{innerHTML:t.description},null,8,J),t.showFollowButton?(w(),N("button",{key:0,class:"followButton",onClick:n[0]||(n[0]=(...u)=>l.follow&&l.follow(...u))},h(r.following?"Following":"Follow"),1)):O("",!0)])]),_:1})]),_:1},8,["to"])}const X=I(V,[["render",W],["__scopeId","data-v-b1d601a3"]]);export{X as A};
