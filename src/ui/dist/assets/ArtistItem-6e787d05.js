import{_ as w,C as g,o as a,f as h,w as l,g as r,a as e,t as c,c as p,d as y,e as n}from"./index-b250113a.js";const v={components:{Card:g},name:"ArtistItem",methods:{follow(s){s.stopPropagation();const o=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:o,body:JSON.stringify({artistId:this.id})}).then(t=>{t.status==200&&(this.following=!this.following)})}},data(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}},k={class:"item"},B=["src"],C=["innerHTML"];function S(s,o,t,x,_,i){const d=n("add-artist-to-playlist"),m=n("Card"),f=n("router-link");return a(),h(f,{to:"/artist/"+t.name,class:"noLink"},{default:l(()=>[r(m,{class:"wrapper","with-hover":""},{default:l(()=>[r(d,{ref:"import",artist:{id:t.id,name:t.name,href:`https://open.spotify.com/artist/${t.id}`,image:t.cover}},null,8,["artist"]),e("div",k,[e("img",{src:t.cover},null,8,B),e("h4",null,c(t.name),1),e("p",{innerHTML:t.description},null,8,C),t.showFollowButton?(a(),p("button",{key:0,class:"followButton",onClick:o[0]||(o[0]=(...u)=>i.follow&&i.follow(...u))},c(_.following?"Following":"Follow"),1)):y("",!0)])]),_:1})]),_:1},8,["to"])}const A=w(v,[["render",S],["__scopeId","data-v-c51c5ae4"]]);export{A};
