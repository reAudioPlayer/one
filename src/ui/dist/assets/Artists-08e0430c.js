import{F as m}from"./FullShelf-7959dec9.js";import{_ as C,C as b,f as p,o as s,g as _,w as u,h as l,a as r,t as h,c,j as g,d as F,e as B,v as w,H as S,F as v,l as y,L as A}from"./index-48f244c4.js";import{C as I}from"./CollectionHeader-6818c710.js";import{C as x}from"./CardWithImageAndText-aa79fb1c.js";const L={components:{Card:b},name:"ArtistItem",methods:{follow(d){d.stopPropagation();const o=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:o,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:this.initiallyFollowing}},props:{cover:String,name:String,description:String,id:String,initiallyFollowing:Boolean,showFollowButton:Boolean}},T={class:"item"},E=["src"],H=["innerHTML"];function M(d,o,t,i,n,e){const a=p("add-artist-to-playlist"),k=p("Card");return s(),_(k,{class:"wrapper","with-hover":"",onClick:o[1]||(o[1]=g(f=>d.$router.push("/artist/"+t.name),["stop"]))},{default:u(()=>[l(a,{ref:"import",artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover}},null,8,["artist"]),r("div",T,[r("img",{src:t.cover},null,8,E),r("h4",null,h(t.name),1),r("p",{innerHTML:t.description},null,8,H),t.showFollowButton?(s(),c("button",{key:0,class:"followButton",onClick:o[0]||(o[0]=g((...f)=>e.follow&&e.follow(...f),["stop"]))},h(n.following?"unfollow":"Follow"),1)):F("",!0)])]),_:1})}const N=C(L,[["render",M],["__scopeId","data-v-353b4692"]]),j={key:0,class:"padding-20"},V={class:"artists"},D={key:1,class:"fill-page"},O=B({__name:"Artists",setup(d){const o=w([]),t=w([]);return S(async()=>{let i=await fetch("/api/spotify/artists"),n=await i.json();o.value=n.sort((e,a)=>e.name.localeCompare(a.name)),i=await fetch("/api/artists"),n=await i.json(),t.value=n.sort((e,a)=>e.name.localeCompare(a.name))}),(i,n)=>t.value.length||o.value.length?(s(),c("div",j,[l(I),r("div",V,[l(m,{heading:"In your library"},{default:u(()=>[(s(!0),c(v,null,y(t.value,e=>(s(),_(x,{title:e.name,cover:e.image,onClick:a=>i.$router.push(`/artist/${e.name}`),imageType:"artist"},null,8,["title","cover","onClick"]))),256))]),_:1}),l(m,{heading:"Following on Spotify"},{default:u(()=>[(s(!0),c(v,null,y(o.value,(e,a)=>(s(),_(N,{id:e.id,key:a,cover:e.cover,description:e.description,name:e.name,"initially-following":"","show-follow-button":""},null,8,["id","cover","description","name"]))),128))]),_:1})])])):(s(),c("div",D,[l(A)]))}});const q=C(O,[["__scopeId","data-v-baafb4ee"]]);export{q as default};