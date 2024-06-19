import{_ as p,o as r,c as i,a as e,r as _,z as u,l as f,m,F as k,h as y,p as h,A as v,f as S,g as o,w as c,M as d,u as $}from"./index-CHcGmgsV.js";const g={props:{src:String}},C=s=>(f("data-v-0c755b69"),s=s(),m(),s),I=C(()=>e("div",{class:"filter"},null,-1)),b={class:"info"};function x(s,a,l,n,t,N){return r(),i("div",{class:"image",style:u({backgroundImage:"url("+l.src+")"})},[I,e("div",b,[_(s.$slots,"default",{},void 0,!0)])],4)}const O=p(g,[["render",x],["__scopeId","data-v-0c755b69"]]),w={class:"songContent"},H={class:"play"},M=["onClick"],P={class:"info"},B={data(){return fetch("/api/playlists").then(async s=>{this.playlists=await s.json(),this.pick()}),{playlists:[],picks:[]}},mounted(){},methods:{parseCover:h,pick(){this.songs=this.playlists.map(s=>s.songs).flat();for(let s=0;s<4;s++)this.picks.push(this.songs[Math.floor(Math.random()*this.songs.length)])},onScroll(){this.$refs.container.clientHeight+this.$refs.container.scrollTop>=this.$refs.container.scrollHeight-100&&this.pick()},href(s){return`/track/${v(s.id)}`},loadPlaylist(s){fetch("/api/player/load",{method:"POST",body:JSON.stringify({id:s,type:"track"})})}}},E=Object.assign(B,{__name:"Explore",setup(s){return(a,l)=>{const n=S("router-link");return r(),i("div",{ref:"container",class:"explore",onScroll:l[0]||(l[0]=(...t)=>a.onScroll&&a.onScroll(...t))},[(r(!0),i(k,null,y(a.picks,t=>(r(),i("div",{key:t.name,class:"item"},[o(O,{src:$(h)(t.cover)},{default:c(()=>[e("div",w,[e("div",H,[e("span",{id:"loadPlaylist",class:"material-symbols-rounded play",onClick:()=>a.loadPlaylist(t.id)},"play_circle",8,M)]),e("div",P,[o(n,{to:a.href(t),class:"linkOnHover"},{default:c(()=>[e("h1",null,[o(d,{text:t.title},null,8,["text"])])]),_:2},1032,["to"]),o(n,{to:`/search/${t.artist}`,class:"linkOnHover"},{default:c(()=>[e("p",null,[o(d,{text:t.artist},null,8,["text"])])]),_:2},1032,["to"])])])]),_:2},1032,["src"])]))),128))],544)}}}),j=p(E,[["__scopeId","data-v-51105a59"]]);export{j as default};
