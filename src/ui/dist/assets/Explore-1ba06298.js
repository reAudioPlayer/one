import{_,o as r,c as n,a as t,r as u,y as h,l as f,m,F as y,i as k,p,z as v,g as o,w as c,M as d,u as g,e as S}from"./index-a21b7814.js";const $={props:{src:String}},x=s=>(f("data-v-34da3e65"),s=s(),m(),s),C=x(()=>t("div",{class:"filter"},null,-1)),I={class:"info"};function b(s,a,l,i,e,N){return r(),n("div",{class:"image",style:h({backgroundImage:"url("+l.src+")"})},[C,t("div",I,[u(s.$slots,"default",{},void 0,!0)])],4)}const O=_($,[["render",b],["__scopeId","data-v-34da3e65"]]);const w={class:"songContent"},E={class:"play"},H=["onClick"],M={class:"info"},P={data(){return fetch("/api/playlists").then(async s=>{this.playlists=await s.json(),this.pick()}),{playlists:[],picks:[]}},mounted(){},methods:{parseCover:p,pick(){console.log("pick"),this.songs=this.playlists.map(s=>s.songs).flat();for(let s=0;s<4;s++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)])},onScroll(){this.$refs.container.clientHeight+this.$refs.container.scrollTop>=this.$refs.container.scrollHeight-100&&this.pick()},href(s){return`/track/${v(s.id)}`},loadPlaylist(s){console.log(s),fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:s,type:"track"})})}}},B=Object.assign(P,{__name:"Explore",setup(s){return(a,l)=>{const i=S("router-link");return r(),n("div",{ref:"container",class:"explore",onScroll:l[0]||(l[0]=(...e)=>a.onScroll&&a.onScroll(...e))},[(r(!0),n(y,null,k(a.picks,e=>(r(),n("div",{key:e.name,class:"item"},[o(O,{src:g(p)(e.cover)},{default:c(()=>[t("div",w,[t("div",E,[t("span",{id:"loadPlaylist",class:"material-symbols-rounded play",onClick:()=>a.loadPlaylist(e.id)},"play_circle",8,H)]),t("div",M,[o(i,{to:a.href(e),class:"linkOnHover"},{default:c(()=>[t("h1",null,[o(d,{text:e.title},null,8,["text"])])]),_:2},1032,["to"]),o(i,{to:`/search/${e.artist}`,class:"linkOnHover"},{default:c(()=>[t("p",null,[o(d,{text:e.artist},null,8,["text"])])]),_:2},1032,["to"])])])]),_:2},1032,["src"])]))),128))],544)}}}),j=_(B,[["__scopeId","data-v-b3d4d2d3"]]);export{j as default};
