import{F as g}from"./FullShelf-345254eb.js";import{_ as h,C as S,e as _,o as s,f as u,w as m,g as c,a as i,t as p,c as d,J as v,d as x,h as I,i as b,q as w,E as k,F as C,j as T}from"./index-ad5489f6.js";import{C as A}from"./CollectionHeader-f3b76d59.js";const F={components:{Card:S},name:"ArtistItem",methods:{follow(r){r.stopPropagation();const o=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:o,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:this.initiallyFollowing}},props:{cover:String,name:String,description:String,id:String,initiallyFollowing:Boolean,showFollowButton:Boolean}},B={class:"item"},M=["src"],L=["innerHTML"];function E(r,o,t,a,l,e){const n=_("add-artist-to-playlist"),f=_("Card");return s(),u(f,{class:"wrapper","with-hover":"",onClick:o[1]||(o[1]=v(y=>r.$router.push("/artist/"+t.name),["stop"]))},{default:m(()=>[c(n,{ref:"import",artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover}},null,8,["artist"]),i("div",B,[i("img",{src:t.cover},null,8,M),i("h4",null,p(t.name),1),i("p",{innerHTML:t.description},null,8,L),t.showFollowButton?(s(),d("button",{key:0,class:"followButton",onClick:o[0]||(o[0]=v((...y)=>e.follow&&e.follow(...y),["stop"]))},p(l.following?"unfollow":"Follow"),1)):x("",!0)])]),_:1})}const H=h(F,[["render",E],["__scopeId","data-v-353b4692"]]),N={components:{Card:S,Cover:I},name:"CardWithImageAndText",props:{cover:String,title:String,description:String,playlistType:{type:String,default:null},imageType:{type:String,default:"playlist"}}};const $={class:"item"},j={class:"title"},V={key:0,class:"material-symbols-rounded"},W=["innerHTML"];function D(r,o,t,a,l,e){const n=_("Cover"),f=_("Card");return s(),u(f,{class:"wrapper drop-shadow-md","with-hover":""},{default:m(()=>[i("div",$,[c(n,{src:t.cover,type:t.imageType,name:t.title},null,8,["src","type","name"]),i("div",j,[[null,"classic"].includes(t.playlistType)?x("",!0):(s(),d("span",V,p(t.playlistType=="smart"?"neurology":"bolt"),1)),i("h4",null,p(t.title),1)]),i("p",{class:"text-muted text-xs hideIfMobile",innerHTML:t.description},null,8,W)])]),_:1})}const J=h(N,[["render",D],["__scopeId","data-v-847f5a33"]]),O={class:"padding-20"},P={class:"artists"},q=b({__name:"Artists",setup(r){const o=w([]),t=w([]);return k(async()=>{let a=await fetch("/api/spotify/artists"),l=await a.json();o.value=l.sort((e,n)=>e.name.localeCompare(n.name)),a=await fetch("/api/artists"),l=await a.json(),t.value=l.sort((e,n)=>e.name.localeCompare(n.name))}),(a,l)=>(s(),d("div",O,[c(A),i("div",P,[c(g,{heading:"In your library"},{default:m(()=>[(s(!0),d(C,null,T(t.value,e=>(s(),u(J,{title:e.name,cover:e.image,onClick:n=>a.$router.push(`/artist/${e.name}`),imageType:"artist"},null,8,["title","cover","onClick"]))),256))]),_:1}),c(g,{heading:"Following on Spotify"},{default:m(()=>[(s(!0),d(C,null,T(o.value,(e,n)=>(s(),u(H,{id:e.id,key:n,cover:e.cover,description:e.description,name:e.name,"initially-following":"","show-follow-button":""},null,8,["id","cover","description","name"]))),128))]),_:1})])]))}});const Q=h(q,[["__scopeId","data-v-2b99d27f"]]);export{Q as default};
