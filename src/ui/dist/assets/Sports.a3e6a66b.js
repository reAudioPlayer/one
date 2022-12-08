import{F as D}from"./FullShelf.fc4ab340.js";import{_ as k,o as i,c as m,a as r,t as _,s as A,x as C,z as F,F as f,h as v,f as w,w as I,d as b,e as x,k as N,l as B}from"./index.aa38e9d2.js";const O={name:"FootballItem",methods:{redirect(){window.open(this.oref)},remove(e){e.stopPropagation(),this.$emit("remove")}},props:{result:String,date:String,competition:String,href:String,oref:String,team1:String,team2:String,progress:String}},j={class:"itemBig"},H={class:"wrapper topalign"},L={class:"wrapper"},V=["innerHTML"],J=["innerHTML"],P=["innerHTML"],U={class:"wrapper bottomalign"},$={class:"small"};function z(e,s,t,l,n,o){var h;return i(),m("div",j,[r("div",{class:"item",onClick:s[1]||(s[1]=(...p)=>o.redirect&&o.redirect(...p))},[r("div",H,[r("p",null,_(t.competition),1),r("p",{class:A(["right progress",{accent:(h=t.progress)==null?void 0:h.includes("'")}])},_(t.progress),3)]),r("div",L,[r("p",{innerHTML:t.team1,class:"team"},null,8,V),r("h4",{class:"result",innerHTML:t.result},null,8,J),r("p",{innerHTML:t.team2,class:"team"},null,8,P)]),r("div",U,[r("p",$,_(t.date)+", "+_(t.href),1),r("span",{onClick:s[0]||(s[0]=(...p)=>o.remove&&o.remove(...p)),class:"deleteIcon small material-icons-round"},"clear")])])])}const R=k(O,[["render",z],["__scopeId","data-v-11518eec"]]);const W={components:{FullShelf:D,FootballItem:R},name:"Sports",data(){return{sports:[],watchMatches:[],sourceToAdd:"",supportedSources:["https://onefootball.com/en/team/","https://onefootball.com/en/match/","https://onefootball.com/en/competition/","https://www.cev.eu/match-centres/","https://championsleague.cev.eu/en/match-centres/","https://www.cev.eu/calendar/","https://cev-nex.tk/#/match/","https://cevnex.tk/#/match/"]}},mounted(){this.watchMatches=JSON.parse(window.localStorage.getItem("sports.watchMatches"))||[],this.updateMatches()},computed:{volleyMatches(){return this.watchMatches.filter(e=>e.includes("cev")).map(e=>{let s=e;return e.includes("nex.tk")&&(s=e.split("/match/")[1]),{src:s,ref:e}})},notVolleyMatches(){return this.watchMatches.filter(e=>!e.includes("cev"))}},methods:{removeSource(e,s,t){this.watchMatches.splice(this.watchMatches.indexOf(e),1),this.sports[s].items.splice(t,1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},removeSourceD(e){this.watchMatches.splice(this.watchMatches.indexOf(e),1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},tryAddSource(){for(const e of this.supportedSources)if(this.sourceToAdd.startsWith(e)){this.addSource();return}alert("unsupported source")},addSource(){this.watchMatches.push(this.sourceToAdd),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches)),this.sourceToAdd=""},updateMatches(){if(!(this.$route.path=="/sports"||this.$route.path=="/sports/")){console.log("not update",this.$route.path);return}fetch("/api/sports",{method:"POST",body:JSON.stringify({urls:this.notVolleyMatches})}).then(e=>e.json()).then(e=>{this.sports=[];for(const s of e){const t=this.sports.findIndex(l=>l.sport==s.sport);t>=0?this.sports[t].items.push(s):this.sports.push({sport:s.sport,icon:s.sportIcon,items:[s]})}for(const s of this.sports)s.items.sort((t,l)=>{if(t.progress=t.progress.replace("Half time","45'"),l.progress=l.progress.replace("Half time","45'"),(t.progress.includes("Pens")||t.progress.includes("N/A"))&&(t.progress="Full time"),(l.progress.includes("Pens")||l.progress.includes("N/A"))&&(l.progress="Full time"),t.progress.includes("'")&&!l.progress.includes("'"))return-1;if(!t.progress.includes("'")&&l.progress.includes("'"))return 1;if(t.progress.includes("'")&&l.progress.includes("'")){const g=Number(t.progress.replace("'","").replace("+","")),T=Number(l.progress.replace("'","").replace("+",""));return g<T?-1:g==T?0:1}let n=t.date.split(" ")[0],o=l.date.split(" ")[0],h=t.progress.replace("'","").replace("Full time","24:00").replace(" ",""),p=l.progress.replace("'","").replace("Full time","24:00").replace(" ",""),a=new Date,u=new Date;u.setUTCDate(a.getUTCDate()+1);let c=new Date;c.setUTCDate(a.getUTCDate()-1);const d=g=>g.toISOString().split("T")[0];n=n.replace("Today",d(a)).split("/").reverse().join("-"),n=n.replace("Tomorrow",d(u)).split("/").reverse().join("-"),n=n.replace("Yesterday",d(c)).split("/").reverse().join("-"),o=o.replace("Today",d(a)).split("/").reverse().join("-"),o=o.replace("Tomorrow",d(u)).split("/").reverse().join("-"),o=o.replace("Yesterday",d(c)).split("/").reverse().join("-");let y=new Date(`${n}T${h}`.replace(" ","")),M=new Date(`${o}T${p}`.replace(" ",""));return y>M?-1:y==M?0:1})}),setTimeout(this.updateMatches,1e3*45)}}},S=e=>(N("data-v-9429c5ab"),e=e(),B(),e),Y={class:"news"},E=S(()=>r("div",{class:"padding-20"},[r("h1",null,"Sports")],-1)),K=S(()=>r("hr",null,null,-1)),q={class:"padding-20"},G={class:"small"},Q={class:"addWrapper"},X=S(()=>r("hr",null,null,-1)),Z=["src"],ee=["onClick"];function te(e,s,t,l,n,o){const h=x("football-item"),p=x("full-shelf");return i(),m("div",Y,[E,K,r("div",q,[r("p",G,"Supported urls: "+_(n.supportedSources.join("*, ")),1),r("div",Q,[C(r("input",{onKeyup:s[0]||(s[0]=(...a)=>e.enterText&&e.enterText(...a)),"onUpdate:modelValue":s[1]||(s[1]=a=>n.sourceToAdd=a),type:"text"},null,544),[[F,n.sourceToAdd]]),r("span",{id:"addToPlaylist",onClick:s[2]||(s[2]=(...a)=>o.tryAddSource&&o.tryAddSource(...a)),class:"material-icons-outlined"},"add_circle")]),X,(i(!0),m(f,null,v(n.sports,(a,u)=>(i(),w(p,{key:a.sport,heading:a.sport,icon:a.icon},{default:I(()=>[(i(!0),m(f,null,v(a.items,(c,d)=>(i(),w(h,{key:c.href,onRemove:()=>o.removeSource(c.sref,u,d),competition:c.competition,team1:c.team1,team2:c.team2,result:c.result,date:c.date,href:c.href,oref:c.oref,progress:c.progress},null,8,["onRemove","competition","team1","team2","result","date","href","oref","progress"]))),128))]),_:2},1032,["heading","icon"]))),128)),o.volleyMatches.length?(i(),w(p,{key:0,heading:"Volleyball",icon:"sports_volleyball"},{default:I(()=>[(i(!0),m(f,null,v(o.volleyMatches,(a,u)=>(i(),m("div",{key:u,class:"wrapIframe"},[r("iframe",{src:`https://cev-nex.tk/#/embed?match=${a.src}`},null,8,Z),r("span",{onClick:()=>o.removeSourceD(a.ref),class:"deleteIcon small material-symbols-rounded"},"clear",8,ee)]))),128))]),_:1})):b("",!0)])])}const oe=k(W,[["render",te],["__scopeId","data-v-9429c5ab"]]);export{oe as default};
