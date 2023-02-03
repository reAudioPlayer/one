import{F as T}from"./FullShelf.434ba053.js";import{C as v}from"./Card.4b544f8d.js";import{_ as f,e as r,o as n,f as c,w,c as i,d as y,a,t as p,F as h,i as g,k as $,l as N}from"./index.1d09503d.js";const k={name:"NewsItemBig",components:{Card:v},methods:{redirect(){this.$router.push(this.href)}},computed:{updatedTimestamp(){const e=new Date(this.updated),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${s[e.getUTCDay()]} ${e.getUTCDate()} ${t[e.getUTCMonth()]} ${e.getUTCFullYear()} ${e.getUTCHours()}.${e.getUTCMinutes()} GMT`}},props:{image:String,title:String,summary:String,href:String,updated:String,source:String}},b=["src"],I=["innerHTML"],x={class:"small"};function M(e,s,t,u,_,d){const l=r("Card");return n(),c(l,{class:"p-4 col-span-2 cursor-pointer",onClick:d.redirect},{default:w(()=>[t.image?(n(),i("img",{key:0,src:t.image},null,8,b)):y("",!0),a("h4",null,p(t.title),1),a("p",{class:"newsSummary",innerHTML:t.summary},null,8,I),a("p",x,p(`${d.updatedTimestamp}, ${t.source}`),1)]),_:1},8,["onClick"])}const B=f(k,[["render",M],["__scopeId","data-v-65bb62e7"]]);const F={components:{FullShelf:T,NewsItemBig:B},name:"News",data(){return{news:[]}},mounted(){fetch("/api/news/articles").then(e=>e.json()).then(e=>{this.news.length=0;for(const s of e){const t=this.news.findIndex(u=>u.source==s.source);t>=0?this.news[t].items.push(s):this.news.push({source:s.source,items:[s]})}})}},D=e=>($("data-v-3bae2738"),e=e(),N(),e),U={class:"padding-20"},L={class:"news"},H=D(()=>a("h1",null,"News",-1));function A(e,s,t,u,_,d){const l=r("Loading"),S=r("news-item-big"),C=r("full-shelf");return n(),i("div",U,[a("div",L,[H,_.news.length==0?(n(),c(l,{key:0})):y("",!0),(n(!0),i(h,null,g(_.news,m=>(n(),c(C,{key:m.source,heading:m.source,class:"mt-10"},{default:w(()=>[(n(!0),i(h,null,g(m.items,o=>(n(),c(S,{key:o.url,href:o.link,image:o.image,source:o.source,summary:o.summary,title:o.title,updated:o.updated},null,8,["href","image","source","summary","title","updated"]))),128))]),_:2},1032,["heading"]))),128))])])}const Y=f(F,[["render",A],["__scopeId","data-v-3bae2738"]]);export{Y as default};
