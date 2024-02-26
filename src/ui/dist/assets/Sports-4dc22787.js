import{F as C}from"./FullShelf-7959dec9.js";import{_ as k,C as D,f as v,o as p,g as w,w as M,a as r,t as _,Q as A,Z as F,cr as N,c as m,h as b,F as S,l as y,d as V,q as B,s as O}from"./index-48f244c4.js";const j={name:"FootballItem",components:{Card:D},methods:{redirect(){window.open(this.oref)},remove(e){e.stopPropagation(),this.$emit("remove")}},props:{result:String,date:String,competition:String,href:String,oref:String,team1:String,team2:String,progress:String}},H={class:"wrapper topalign"},L={class:"wrapper"},J=["innerHTML"],P=["innerHTML"],U=["innerHTML"],W={class:"wrapper bottomalign"},$={class:"small"};function E(e,s,t,a,n,o){const h=v("Card");return p(),w(h,{class:"itemBig","with-hover":""},{default:M(()=>{var u;return[r("div",{class:"item",onClick:s[1]||(s[1]=(...i)=>o.redirect&&o.redirect(...i))},[r("div",H,[r("p",null,_(t.competition),1),r("p",{class:A([{accent:(u=t.progress)==null?void 0:u.includes("'")},"right progress"])},_(t.progress),3)]),r("div",L,[r("p",{class:"team",innerHTML:t.team1},null,8,J),r("h4",{class:"result",innerHTML:t.result},null,8,P),r("p",{class:"team",innerHTML:t.team2},null,8,U)]),r("div",W,[r("p",$,_(t.date)+", "+_(t.href),1),r("span",{class:"deleteIcon small material-icons-round",onClick:s[0]||(s[0]=(...i)=>o.remove&&o.remove(...i))},"clear")])])]}),_:1})}const K=k(j,[["render",E],["__scopeId","data-v-b3cf3eea"]]);const R={components:{TextInputWithIcon:F,FullShelf:C,FootballItem:K},name:"Sports",data(){return{sports:[],watchMatches:[],sourceToAdd:"",supportedSources:["https://onefootball.com/en/team/","https://onefootball.com/en/match/","https://onefootball.com/en/competition/","https://www.cev.eu/match-centres/","https://championsleague.cev.eu/en/match-centres/","https://www.cev.eu/calendar/","https://cev-nex.tk/#/match/","https://cevnex.tk/#/match/"]}},mounted(){this.watchMatches=JSON.parse(window.localStorage.getItem("sports.watchMatches"))||[],this.updateMatches()},computed:{volleyMatches(){return this.watchMatches.filter(e=>e.includes("cev")).map(e=>{let s=e;return e.includes("nex.tk")&&(s=e.split("/match/")[1]),{src:s,ref:e}})},notVolleyMatches(){return this.watchMatches.filter(e=>!e.includes("cev"))}},methods:{removeSource(e,s,t){this.watchMatches.splice(this.watchMatches.indexOf(e),1),this.sports[s].items.splice(t,1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},removeSourceD(e){this.watchMatches.splice(this.watchMatches.indexOf(e),1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},tryAddSource(){for(const e of this.supportedSources)if(this.sourceToAdd.startsWith(e)){this.addSource();return}N.addError("unsupported source")},addSource(){this.watchMatches.push(this.sourceToAdd),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches)),this.sourceToAdd=""},updateMatches(){(this.$route.path=="/sports"||this.$route.path=="/sports/")&&(fetch("/api/sports",{method:"POST",body:JSON.stringify({urls:this.notVolleyMatches})}).then(e=>e.json()).then(e=>{this.sports=[];for(const s of e){const t=this.sports.findIndex(a=>a.sport==s.sport);t>=0?this.sports[t].items.push(s):this.sports.push({sport:s.sport,icon:s.sportIcon,items:[s]})}for(const s of this.sports)s.items.sort((t,a)=>{if(t.progress=t.progress.replace("Half time","45'"),a.progress=a.progress.replace("Half time","45'"),(t.progress.includes("Pens")||t.progress.includes("N/A"))&&(t.progress="Full time"),(a.progress.includes("Pens")||a.progress.includes("N/A"))&&(a.progress="Full time"),t.progress.includes("'")&&!a.progress.includes("'"))return-1;if(!t.progress.includes("'")&&a.progress.includes("'"))return 1;if(t.progress.includes("'")&&a.progress.includes("'")){const g=Number(t.progress.replace("'","").replace("+","")),x=Number(a.progress.replace("'","").replace("+",""));return g<x?-1:g==x?0:1}let n=t.date.split(" ")[0],o=a.date.split(" ")[0],h=t.progress.replace("'","").replace("Full time","24:00").replace(" ",""),u=a.progress.replace("'","").replace("Full time","24:00").replace(" ",""),i=new Date,l=new Date;l.setUTCDate(i.getUTCDate()+1);let d=new Date;d.setUTCDate(i.getUTCDate()-1);const c=g=>g.toISOString().split("T")[0];n=n.replace("Today",c(i)).split("/").reverse().join("-"),n=n.replace("Tomorrow",c(l)).split("/").reverse().join("-"),n=n.replace("Yesterday",c(d)).split("/").reverse().join("-"),o=o.replace("Today",c(i)).split("/").reverse().join("-"),o=o.replace("Tomorrow",c(l)).split("/").reverse().join("-"),o=o.replace("Yesterday",c(d)).split("/").reverse().join("-");let f=new Date(`${n}T${h}`.replace(" ","")),I=new Date(`${o}T${u}`.replace(" ",""));return f>I?-1:f==I?0:1})}),setTimeout(this.updateMatches,1e3*45))}}},T=e=>(B("data-v-c7ef402c"),e=e(),O(),e),Y={class:"news"},q=T(()=>r("div",{class:"padding-20"},[r("h1",null,"Sports")],-1)),z=T(()=>r("hr",null,null,-1)),Q={class:"padding-20"},Z={class:"small"},G={class:"addWrapper"},X=T(()=>r("hr",null,null,-1)),ee=["src"],te=["onClick"];function se(e,s,t,a,n,o){const h=v("TextInputWithIcon"),u=v("football-item"),i=v("full-shelf");return p(),m("div",Y,[q,z,r("div",Q,[r("p",Z," Supported urls: "+_(n.supportedSources.join("*, ")),1),r("div",G,[b(h,{modelValue:n.sourceToAdd,"onUpdate:modelValue":s[0]||(s[0]=l=>n.sourceToAdd=l),icon:"link",onKeyup:e.enterText},null,8,["modelValue","onKeyup"]),r("span",{id:"addToPlaylist",class:"material-icons-outlined",onClick:s[1]||(s[1]=(...l)=>o.tryAddSource&&o.tryAddSource(...l))},"add_circle")]),X,(p(!0),m(S,null,y(n.sports,(l,d)=>(p(),w(i,{key:l.sport,heading:l.sport,icon:l.icon},{default:M(()=>[(p(!0),m(S,null,y(l.items,(c,f)=>(p(),w(u,{key:c.href,competition:c.competition,date:c.date,href:c.href,oref:c.oref,progress:c.progress,result:c.result,team1:c.team1,team2:c.team2,onRemove:()=>o.removeSource(c.sref,d,f)},null,8,["competition","date","href","oref","progress","result","team1","team2","onRemove"]))),128))]),_:2},1032,["heading","icon"]))),128)),o.volleyMatches.length?(p(),w(i,{key:0,heading:"Volleyball",icon:"sports_volleyball"},{default:M(()=>[(p(!0),m(S,null,y(o.volleyMatches,(l,d)=>(p(),m("div",{key:d,class:"wrapIframe"},[r("iframe",{src:`https://cev-nex.tk/#/embed?match=${l.src}`},null,8,ee),r("span",{class:"deleteIcon small material-symbols-rounded",onClick:()=>o.removeSourceD(l.ref)},"clear",8,te)]))),128))]),_:1})):V("",!0)])])}const ce=k(R,[["render",se],["__scopeId","data-v-c7ef402c"]]);export{ce as default};
