import{_ as p,o as r,c as i,a as o,r as h,B as u,j as f,k as y,F as m,h as k,g as n,w as c,M as d,u as v,p as _,v as g,e as $}from"./index-24e68ff2.js";const S={props:{src:String}},x=s=>(f("data-v-34da3e65"),s=s(),y(),s),b=x(()=>o("div",{class:"filter"},null,-1)),C={class:"info"};function I(s,t,a,l,e,P){return r(),i("div",{class:"image",style:u({backgroundImage:"url("+a.src+")"})},[b,o("div",C,[h(s.$slots,"default",{},void 0,!0)])],4)}const w=p(S,[["render",I],["__scopeId","data-v-34da3e65"]]);const O={class:"songContent"},j={class:"play"},B=["onClick"],E={class:"info"},H={data(){return fetch("/api/playlists").then(async s=>{const t=await s.json();for(let a=0;a<t.length;a++){const l=await fetch(`/api/playlists/${a}`);this.playlists.push(await l.json())}this.pick()}),{playlists:[],picks:[]}},mounted(){},methods:{parseCover:_,pick(){console.log("pick"),this.songs=this.playlists.map(s=>s.songs).flat();for(let s=0;s<4;s++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)])},onScroll(){this.$refs.container.clientHeight+this.$refs.container.scrollTop>=this.$refs.container.scrollHeight-100&&this.pick()},href(s){return`/track/${g(s.id)}`},loadPlaylist(s){console.log(s),fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:s,type:"track"})})}}},M=Object.assign(H,{__name:"Explore",setup(s){return(t,a)=>{const l=$("router-link");return r(),i("div",{class:"explore",ref:"container",onScroll:a[0]||(a[0]=(...e)=>t.onScroll&&t.onScroll(...e))},[(r(!0),i(m,null,k(t.picks,e=>(r(),i("div",{class:"item",key:e.name},[n(w,{src:v(_)(e.cover)},{default:c(()=>[o("div",O,[o("div",j,[o("span",{id:"loadPlaylist",onClick:()=>t.loadPlaylist(e.id),class:"material-symbols-rounded play"},"play_circle",8,B)]),o("div",E,[n(l,{class:"linkOnHover",to:t.href(e)},{default:c(()=>[o("h1",null,[n(d,{text:e.title},null,8,["text"])])]),_:2},1032,["to"]),n(l,{class:"linkOnHover",to:`/search/${e.artist}`},{default:c(()=>[o("p",null,[n(d,{text:e.artist},null,8,["text"])])]),_:2},1032,["to"])])])]),_:2},1032,["src"])]))),128))],544)}}}),T=p(M,[["__scopeId","data-v-2f8eb91b"]]);export{T as default};
