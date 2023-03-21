import{F as C}from"./FullShelf-096937df.js";import{_ as f,C as T,o as n,f as m,w,c as o,d as y,a as r,t as p,e as c,L as N,g as $,F as h,i as g,l as k,m as I}from"./index-13e752eb.js";const x={name:"NewsItemBig",components:{Card:T},methods:{redirect(){this.$router.push(this.href)}},computed:{updatedTimestamp(){const e=new Date(this.updated),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${s[e.getUTCDay()]} ${e.getUTCDate()} ${t[e.getUTCMonth()]} ${e.getUTCFullYear()} ${e.getUTCHours()}.${e.getUTCMinutes()} GMT`}},props:{image:String,title:String,summary:String,href:String,updated:String,source:String}},M=["src"],B=["innerHTML"],F={class:"small"};function L(e,s,t,i,d,u){const _=c("Card");return n(),m(_,{class:"p-4 col-span-2 cursor-pointer","with-hover":"",onClick:u.redirect},{default:w(()=>[t.image?(n(),o("img",{key:0,src:t.image},null,8,M)):y("",!0),r("h4",null,p(t.title),1),r("p",{class:"newsSummary",innerHTML:t.summary},null,8,B),r("p",F,p(`${u.updatedTimestamp}, ${t.source}`),1)]),_:1},8,["onClick"])}const D=f(x,[["render",L],["__scopeId","data-v-15299eaa"]]);const U={components:{Loader:N,FullShelf:C,NewsItemBig:D},name:"News",data(){return{news:[]}},mounted(){fetch("/api/news/articles").then(e=>e.json()).then(e=>{this.news.length=0;for(const s of e){const t=this.news.findIndex(i=>i.source==s.source);t>=0?this.news[t].items.push(s):this.news.push({source:s.source,items:[s]})}})}},H=e=>(k("data-v-55d1a00d"),e=e(),I(),e),b={class:"padding-20"},A={class:"news"},J=H(()=>r("h1",null,"News",-1)),V={key:0,class:"fillPage"};function O(e,s,t,i,d,u){const _=c("Loader"),S=c("news-item-big"),v=c("full-shelf");return n(),o("div",b,[r("div",A,[J,d.news.length?y("",!0):(n(),o("div",V,[$(_)])),(n(!0),o(h,null,g(d.news,l=>(n(),m(v,{key:l.source,heading:l.source,class:"mt-10"},{default:w(()=>[(n(!0),o(h,null,g(l.items,a=>(n(),m(S,{key:a.url,href:a.link,image:a.image,source:a.source,summary:a.summary,title:a.title,updated:a.updated},null,8,["href","image","source","summary","title","updated"]))),128))]),_:2},1032,["heading"]))),128))])])}const E=f(U,[["render",O],["__scopeId","data-v-55d1a00d"]]);export{E as default};
