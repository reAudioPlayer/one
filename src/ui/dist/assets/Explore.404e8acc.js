import{_ as p,o as i,c as r,a,r as _,n as h,p as u,i as f,F as y,j as m,g as n,w as c,M as d,h as k,e as v}from"./index.f2b9c799.js";const g={props:{src:String}},$=s=>(u("data-v-770bf737"),s=s(),f(),s),S=$(()=>a("div",{class:"filter"},null,-1)),b={class:"info"};function x(s,e,o,l,t,M){return i(),r("div",{class:"image",style:h({backgroundImage:"url("+o.src+")"})},[S,a("div",b,[_(s.$slots,"default",{},void 0,!0)])],4)}const I=p(g,[["render",x],["__scopeId","data-v-770bf737"]]);const C={class:"songContent"},w={class:"play"},O=["onClick"],j={class:"info"},E={data(){return fetch("/api/playlists").then(async s=>{const e=await s.json();for(let o=0;o<e.length;o++){const l=await fetch(`/api/playlists/${o}`);this.playlists.push(await l.json())}this.pick()}),{playlists:[],picks:[]}},mounted(){},methods:{pick(){console.log("pick"),this.songs=this.playlists.map(s=>s.songs).flat();for(let s=0;s<4;s++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)])},onScroll(){this.$refs.container.clientHeight+this.$refs.container.scrollTop>=this.$refs.container.scrollHeight-100&&this.pick()},href(s){return`/track/${k(s.id)}`},loadPlaylist(s){console.log(s),fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:s,type:"track"})})}}},H=Object.assign(E,{__name:"Explore",setup(s){return(e,o)=>{const l=v("router-link");return i(),r("div",{class:"explore",ref:"container",onScroll:o[0]||(o[0]=(...t)=>e.onScroll&&e.onScroll(...t))},[(i(!0),r(y,null,m(e.picks,t=>(i(),r("div",{class:"item",key:t.name},[n(I,{src:t.cover},{default:c(()=>[a("div",C,[a("div",w,[a("span",{id:"loadPlaylist",onClick:()=>e.loadPlaylist(t.id),class:"material-symbols-rounded play"},"play_circle",8,O)]),a("div",j,[n(l,{class:"linkOnHover",to:e.href(t)},{default:c(()=>[a("h1",null,[n(d,{text:t.title},null,8,["text"])])]),_:2},1032,["to"]),n(l,{class:"linkOnHover",to:`/search/${t.artist}`},{default:c(()=>[a("p",null,[n(d,{text:t.artist},null,8,["text"])])]),_:2},1032,["to"])])])]),_:2},1032,["src"])]))),128))],544)}}}),B=p(H,[["__scopeId","data-v-bd40810d"]]);export{B as default};
