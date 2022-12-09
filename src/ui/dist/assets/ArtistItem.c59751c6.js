import{F as v,T as y,a as A}from"./song.22c0d5cf.js";import{T as S,P as k}from"./TrackInfo.f16b2cd4.js";import{B as T,i as b,C as f,o as m,f as B,w as C,g as d,u as I,G as F,a as l,_ as N,e as E,c as _,t as w,d as P}from"./index.6f3ae9d0.js";const O=l("br",null,null,-1),j=T({__name:"ImportSpotifyArtist",props:{artist:{type:Object,required:!0}},setup(n,{expose:s}){const t=n,u=b(),c=[{name:"playlist",type:"dropdown",required:!0,value:null,options:u.playlists.map(o=>({label:o.name,value:o.id}))}],a=f(null),i=f(null),e=f([]),g=async()=>{if(a.value.load(),e.value.length==0){const o=await fetch(`/api/spotify/artists/${t.artist.id}`);e.value=await o.json()}a.value.show()},p=async o=>{e.value[o].added||(await A(i.value.toObject().playlist,e.value[o]),e.value[o].added=!0)},h=()=>{e.value.forEach((o,r)=>{p(r)})};return s({show:g}),(o,r)=>(m(),B(y,{ref_key:"modal",ref:a,name:"Import Artist",submitName:"Add All",onSubmit:h,onClose:r[0]||(r[0]=H=>o.$emit("close"))},{default:C(()=>[d(S,{title:n.artist.name,cover:n.artist.image,icons:[{name:"share",onClick:()=>I(F)(n.artist.href)}]},null,8,["title","cover","icons"]),d(v,{ref_key:"form",ref:i,options:c},null,512),O,d(k,{songs:e.value,onAdd:p},null,8,["songs"])]),_:1},512))}});const D={components:{AddArtistToPlaylist:j},name:"ArtistItem",methods:{redirect(){this.$refs.import.show()},follow(n){n.stopPropagation();const s=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:s,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}},L={class:"wrapper drop-shadow-md"},V=["src"],q=["innerHTML"];function x(n,s,t,u,c,a){const i=E("add-artist-to-playlist");return m(),_("div",L,[d(i,{artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover},ref:"import"},null,8,["artist"]),l("div",{class:"item",onClick:s[1]||(s[1]=(...e)=>a.redirect&&a.redirect(...e))},[l("img",{src:t.cover},null,8,V),l("h4",null,w(t.name),1),l("p",{innerHTML:t.description},null,8,q),t.showFollowButton?(m(),_("button",{key:0,onClick:s[0]||(s[0]=(...e)=>a.follow&&a.follow(...e)),class:"followButton"},w(c.following?"Following":"Follow"),1)):P("",!0)])])}const z=N(D,[["render",x],["__scopeId","data-v-fdf6f357"]]);export{z as A};
