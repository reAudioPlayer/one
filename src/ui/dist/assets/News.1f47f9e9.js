import{F as v}from"./FullShelf.13880daa.js";import{C as T}from"./Card.d68bcee4.js";import{_ as f,e as r,o as n,f as m,w,c as a,d as y,a as c,t as p,L as N,g as $,F as h,i as g,k,l as I}from"./index.c970909a.js";const x={name:"NewsItemBig",components:{Card:T},methods:{redirect(){this.$router.push(this.href)}},computed:{updatedTimestamp(){const e=new Date(this.updated),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${s[e.getUTCDay()]} ${e.getUTCDate()} ${t[e.getUTCMonth()]} ${e.getUTCFullYear()} ${e.getUTCHours()}.${e.getUTCMinutes()} GMT`}},props:{image:String,title:String,summary:String,href:String,updated:String,source:String}},M=["src"],B=["innerHTML"],b={class:"small"};function F(e,s,t,i,u,_){const d=r("Card");return n(),m(d,{class:"p-4 col-span-2 cursor-pointer",onClick:_.redirect},{default:w(()=>[t.image?(n(),a("img",{key:0,src:t.image},null,8,M)):y("",!0),c("h4",null,p(t.title),1),c("p",{class:"newsSummary",innerHTML:t.summary},null,8,B),c("p",b,p(`${_.updatedTimestamp}, ${t.source}`),1)]),_:1},8,["onClick"])}const L=f(x,[["render",F],["__scopeId","data-v-65bb62e7"]]);const D={components:{Loader:N,FullShelf:v,NewsItemBig:L},name:"News",data(){return{news:[]}},mounted(){fetch("/api/news/articles").then(e=>e.json()).then(e=>{this.news.length=0;for(const s of e){const t=this.news.findIndex(i=>i.source==s.source);t>=0?this.news[t].items.push(s):this.news.push({source:s.source,items:[s]})}})}},U=e=>(k("data-v-cf4ce161"),e=e(),I(),e),H={class:"padding-20"},A={class:"news"},J=U(()=>c("h1",null,"News",-1)),V={key:0,class:"fillPage"};function O(e,s,t,i,u,_){const d=r("Loader"),S=r("news-item-big"),C=r("full-shelf");return n(),a("div",H,[c("div",A,[J,u.news.length?y("",!0):(n(),a("div",V,[$(d)])),(n(!0),a(h,null,g(u.news,l=>(n(),m(C,{key:l.source,heading:l.source,class:"mt-10"},{default:w(()=>[(n(!0),a(h,null,g(l.items,o=>(n(),m(S,{key:o.url,href:o.link,image:o.image,source:o.source,summary:o.summary,title:o.title,updated:o.updated},null,8,["href","image","source","summary","title","updated"]))),128))]),_:2},1032,["heading"]))),128))])])}const G=f(D,[["render",O],["__scopeId","data-v-cf4ce161"]]);export{G as default};
