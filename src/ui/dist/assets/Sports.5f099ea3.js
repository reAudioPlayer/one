import{F as x}from"./FullShelf.58f1a4bd.js";import{_ as D,o as u,c as g,a as r,t as m,x as A,C,D as F,F as y,i as M,f as T,w as k,d as N,e as I,k as B,l as H}from"./index.a65878b2.js";const O={name:"FootballItem",methods:{redirect(){window.open(this.oref)},remove(e){e.stopPropagation(),this.$emit("remove")}},props:{result:String,date:String,competition:String,href:String,oref:String,team1:String,team2:String,progress:String}},j={class:"itemBig"},L={class:"wrapper topalign"},V={class:"wrapper"},$=["innerHTML"],b=["innerHTML"],J=["innerHTML"],P={class:"wrapper bottomalign"},U={class:"small"};function E(e,s,t,a,n,o){var d;return u(),g("div",j,[r("div",{class:"item",onClick:s[1]||(s[1]=(...p)=>o.redirect&&o.redirect(...p))},[r("div",L,[r("p",null,m(t.competition),1),r("p",{class:A(["right progress",{accent:(d=t.progress)==null?void 0:d.includes("'")}])},m(t.progress),3)]),r("div",V,[r("p",{innerHTML:t.team1,class:"team"},null,8,$),r("h4",{class:"result",innerHTML:t.result},null,8,b),r("p",{innerHTML:t.team2,class:"team"},null,8,J)]),r("div",P,[r("p",U,m(t.date)+", "+m(t.href),1),r("span",{onClick:s[0]||(s[0]=(...p)=>o.remove&&o.remove(...p)),class:"deleteIcon small material-icons-round"},"clear")])])])}const R=D(O,[["render",E],["__scopeId","data-v-11518eec"]]);const W={components:{FullShelf:x,FootballItem:R},name:"Sports",data(){return{sports:[],watchMatches:[],sourceToAdd:"",supportedSources:["https://onefootball.com/en/team/","https://onefootball.com/en/match/","https://onefootball.com/en/competition/"]}},mounted(){this.watchMatches=JSON.parse(window.localStorage.getItem("sports.watchMatches"))||[],this.updateMatches()},computed:{volleyMatches(){return this.watchMatches.filter(e=>e.includes("cev")).map(e=>{let s=e;return e.includes("nex.tk")&&(s=e.split("/match/")[1]),{src:s,ref:e}})},notVolleyMatches(){return this.watchMatches.filter(e=>!e.includes("cev"))}},methods:{removeSource(e,s,t){this.watchMatches.splice(this.watchMatches.indexOf(e),1),this.sports[s].items.splice(t,1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},removeSourceD(e){this.watchMatches.splice(this.watchMatches.indexOf(e),1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},tryAddSource(){for(const e of this.supportedSources)if(this.sourceToAdd.startsWith(e)){this.addSource();return}alert("unsupported source")},addSource(){this.watchMatches.push(this.sourceToAdd),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches)),this.sourceToAdd=""},updateMatches(){if(!(this.$route.path=="/sports"||this.$route.path=="/sports/")){console.log("not update",this.$route.path);return}fetch("/api/sports",{method:"POST",body:JSON.stringify({urls:this.notVolleyMatches})}).then(e=>e.json()).then(e=>{this.sports=[];for(const s of e){const t=this.sports.findIndex(a=>a.sport==s.sport);t>=0?this.sports[t].items.push(s):this.sports.push({sport:s.sport,icon:s.sportIcon,items:[s]})}for(const s of this.sports)s.items.sort((t,a)=>{if(t.progress=t.progress.replace("Half time","45'"),a.progress=a.progress.replace("Half time","45'"),(t.progress.includes("Pens")||t.progress.includes("N/A"))&&(t.progress="Full time"),(a.progress.includes("Pens")||a.progress.includes("N/A"))&&(a.progress="Full time"),t.progress.includes("'")&&!a.progress.includes("'"))return-1;if(!t.progress.includes("'")&&a.progress.includes("'"))return 1;if(t.progress.includes("'")&&a.progress.includes("'")){const _=Number(t.progress.replace("'","").replace("+","")),S=Number(a.progress.replace("'","").replace("+",""));return _<S?-1:_==S?0:1}let n=t.date.split(" ")[0],o=a.date.split(" ")[0],d=t.progress.replace("'","").replace("Full time","24:00").replace(" ",""),p=a.progress.replace("'","").replace("Full time","24:00").replace(" ",""),i=new Date,h=new Date;h.setUTCDate(i.getUTCDate()+1);let l=new Date;l.setUTCDate(i.getUTCDate()-1);const c=_=>_.toISOString().split("T")[0];n=n.replace("Today",c(i)).split("/").reverse().join("-"),n=n.replace("Tomorrow",c(h)).split("/").reverse().join("-"),n=n.replace("Yesterday",c(l)).split("/").reverse().join("-"),o=o.replace("Today",c(i)).split("/").reverse().join("-"),o=o.replace("Tomorrow",c(h)).split("/").reverse().join("-"),o=o.replace("Yesterday",c(l)).split("/").reverse().join("-");let v=new Date(`${n}T${d}`.replace(" ","")),w=new Date(`${o}T${p}`.replace(" ",""));return v>w?-1:v==w?0:1})}),setTimeout(this.updateMatches,1e3*45)}}},f=e=>(B("data-v-56ee9057"),e=e(),H(),e),Y={class:"news"},z=f(()=>r("div",{class:"padding-20"},[r("h1",null,"Sports")],-1)),K=f(()=>r("hr",null,null,-1)),q={class:"padding-20"},G={class:"small"},Q=f(()=>r("p",{class:"small"},"CEV matches are currently not supported, because Heroku removed its free plan.",-1)),X={class:"addWrapper"},Z=f(()=>r("hr",null,null,-1));function ee(e,s,t,a,n,o){const d=I("football-item"),p=I("full-shelf");return u(),g("div",Y,[z,K,r("div",q,[r("p",G,"Supported urls: "+m(n.supportedSources.join("*, ")),1),Q,r("div",X,[C(r("input",{onKeyup:s[0]||(s[0]=(...i)=>e.enterText&&e.enterText(...i)),"onUpdate:modelValue":s[1]||(s[1]=i=>n.sourceToAdd=i),type:"text"},null,544),[[F,n.sourceToAdd]]),r("span",{id:"addToPlaylist",onClick:s[2]||(s[2]=(...i)=>o.tryAddSource&&o.tryAddSource(...i)),class:"material-icons-outlined"},"add_circle")]),Z,(u(!0),g(y,null,M(n.sports,(i,h)=>(u(),T(p,{key:i.sport,heading:i.sport,icon:i.icon},{default:k(()=>[(u(!0),g(y,null,M(i.items,(l,c)=>(u(),T(d,{key:l.href,onRemove:()=>o.removeSource(l.sref,h,c),competition:l.competition,team1:l.team1,team2:l.team2,result:l.result,date:l.date,href:l.href,oref:l.oref,progress:l.progress},null,8,["onRemove","competition","team1","team2","result","date","href","oref","progress"]))),128))]),_:2},1032,["heading","icon"]))),128)),N("",!0)])])}const re=D(W,[["render",ee],["__scopeId","data-v-56ee9057"]]);export{re as default};
