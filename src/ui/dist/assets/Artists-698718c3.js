import{F as C}from"./FullShelf-6ab0416c.js";import{_ as h,C as F,e as i,o as n,f as w,w as g,g as f,a as e,t as m,c as p,J as u,d as A,F as B,j as S}from"./index-2dbf6c55.js";import{C as k}from"./CollectionHeader-7ba06f8e.js";const x={components:{Card:F},name:"ArtistItem",methods:{follow(o){o.stopPropagation();const s=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:s,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:this.initiallyFollowing}},props:{cover:String,name:String,description:String,id:String,initiallyFollowing:Boolean,showFollowButton:Boolean}},I={class:"item"},b=["src"],H=["innerHTML"];function E(o,s,t,y,r,c){const d=i("add-artist-to-playlist"),_=i("Card");return n(),w(_,{class:"wrapper","with-hover":"",onClick:s[1]||(s[1]=u(l=>o.$router.push("/artist/"+t.name),["stop"]))},{default:g(()=>[f(d,{ref:"import",artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover}},null,8,["artist"]),e("div",I,[e("img",{src:t.cover},null,8,b),e("h4",null,m(t.name),1),e("p",{innerHTML:t.description},null,8,H),t.showFollowButton?(n(),p("button",{key:0,class:"followButton",onClick:s[0]||(s[0]=u((...l)=>c.follow&&c.follow(...l),["stop"]))},m(r.following?"unfollow":"Follow"),1)):A("",!0)])]),_:1})}const L=h(x,[["render",E],["__scopeId","data-v-353b4692"]]);const N={components:{CollectionHeader:k,ArtistItem:L,FullShelf:C},name:"Artists",data(){return fetch("/api/spotify/artists").then(o=>o.json()).then(o=>this.spotifyArtists.push(...o)),{spotifyArtists:[]}}},T={class:"padding-20"},M={class:"artists"};function V(o,s,t,y,r,c){const d=i("CollectionHeader"),_=i("artist-item"),l=i("full-shelf");return n(),p("div",T,[f(d),e("div",M,[f(l,{heading:"Following on Spotify"},{default:g(()=>[(n(!0),p(B,null,S(r.spotifyArtists,(a,v)=>(n(),w(_,{id:a.id,key:v,cover:a.cover,description:a.description,name:a.name,"initially-following":"","show-follow-button":""},null,8,["id","cover","description","name"]))),128))]),_:1})])])}const O=h(N,[["render",V],["__scopeId","data-v-f17668c2"]]);export{O as default};
