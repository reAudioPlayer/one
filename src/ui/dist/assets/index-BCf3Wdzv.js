import{e as S,o as s,c as p,t as k,Q as B,_ as A,n as _,y as X,D as N,i as g,d as P,a as t,b as D,F as w,l as U,m as E,a7 as Z,g as m,I as $,h as V,w as G,H as ee,M as q,C as j,as as te,at as F,au as M,av as W,aw as R,ax as O,u as b,E as Y,$ as T,N as ae,B as le,q as se,U as oe}from"./index-DnhwPdfm.js";import{_ as ne}from"./Markdown.vue_vue_type_style_index_0_lang-fjKVBP59.js";import{T as J}from"./TrackCompact-sXOejxe1.js";import{G as ie}from"./gistClient-BQBNGijJ.js";const re=S({__name:"TabButton",props:{name:{type:String,required:!0},active:{type:Boolean,default:!1}},setup(o){return(e,l)=>(s(),p("button",{class:B(["btn",{active:o.active}])},k(o.name),3))}}),ce=A(re,[["__scopeId","data-v-3f038910"]]),ue="1.1.0",z=o=>(U("data-v-5c362a3b"),o=o(),E(),o),de={class:"flex flex-col"},pe={key:0,class:"text-sm flex items-center gap-2 latest"},me=z(()=>t("span",{class:"material-symbols-rounded"},"check",-1)),he={key:1,class:"text-sm flex items-center gap-2 update"},ve=z(()=>t("span",{class:"material-symbols-rounded"},"update",-1)),H="1.1.0",_e=S({__name:"About",setup(o){const e=_(""),l=_("");X(async()=>{const c=await(await fetch("https://api.github.com/repos/reAudioPlayer/one/releases/latest")).json();e.value=c.tag_name,l.value=c.body});const h=N(()=>e.value===H),n=N(()=>ue.split(".").pop()),u=_(null);return(a,c)=>(s(),p("div",de,[l.value?(s(),g(ne,{key:0,content:l.value,title:"What's new in "+e.value,ref_key:"changelog",ref:u,onClose:c[0]||(c[0]=()=>l.value="")},null,8,["content","title"])):P("",!0),t("span",null,[t("strong",null,"v"+k(H)),D(" (Build "+k(n.value)+") ",1)]),e.value?(s(),p(w,{key:1},[h.value?(s(),p("span",pe,[me,D(" You're on the latest version "),t("a",{class:"cursor-pointer",onClick:c[1]||(c[1]=f=>{var d;return(d=u.value)==null?void 0:d.show()})}," What's changed? ")])):(s(),p("span",he,[ve,D(" Update available: "+k(e.value)+" ",1),t("a",{class:"cursor-pointer",onClick:c[2]||(c[2]=f=>{var d;return(d=u.value)==null?void 0:d.show()})}," What's changed? ")]))],64)):P("",!0)]))}}),fe=A(_e,[["__scopeId","data-v-5c362a3b"]]),L=o=>(U("data-v-4062735d"),o=o(),E(),o),ye={class:"wrap"},be=L(()=>t("h3",null,"Browser Data",-1)),ge=L(()=>t("h3",null,"Import / Export",-1)),ke={class:"flex gap-4 mb-4"},we={class:"covers mb-2"},$e=L(()=>t("h3",null,"Local covers",-1)),Se={key:0,class:"items gap-4"},Ce={class:"flex justify-between w-full mb-4"},xe={class:"overflow-hidden"},Ve=["onClick"],Pe={key:1,class:"text-muted italic"},Ie={class:"tracks"},Ae=L(()=>t("h3",null,"Local tracks",-1)),Ne={key:0,class:"items gap-4"},De={class:"flex justify-between w-full mb-4"},Te={class:"overflow-hidden"},Be=["onClick"],Ue={class:"flex justify-center w-full mb-4"},Ee=["src"],Oe={key:1,class:"text-muted italic"},Le={__name:"LocalData",setup(o){const e=_([]),l=_([]),h=Z(),n=()=>{fetch("/api/config/images").then(d=>d.json()).then(d=>e.value=d),fetch("/api/config/tracks").then(d=>d.json()).then(d=>l.value=d)},u=async d=>{await fetch("/api/config/images",{method:"DELETE",body:JSON.stringify({name:d})}),n()},a=async d=>{fetch("/api/config/tracks",{method:"DELETE",body:JSON.stringify({name:d})}),n()},c=d=>{h.loadPlaylist("track",d)};n();const f=()=>{localStorage.clear(),sessionStorage.clear(),window.location.reload()};return(d,C)=>(s(),p("div",ye,[be,m($,{class:"mb-4",icon:"delete",label:"Clean browser settings",onClick:f}),ge,t("div",ke,[m($,{icon:"backup",label:"Back up / Export",onClick:C[0]||(C[0]=v=>d.$router.push("/export"))}),m($,{icon:"cloud_download",label:"Import",onClick:C[1]||(C[1]=v=>d.$router.push("/import"))})]),t("div",we,[$e,e.value.length?(s(),p("div",Se,[(s(!0),p(w,null,V(e.value,(v,x)=>(s(),g(j,{key:x,class:"cover-wrapper p-4"},{default:G(()=>[m(ee,{src:v.name,class:"rounded-xl mb-4"},null,8,["src"]),t("div",Ce,[t("p",xe,[m(q,{text:v.name},null,8,["text"])]),t("span",{class:"ml-2 material-symbols-rounded cursor-pointer",onClick:i=>u(v.name)},"delete",8,Ve)]),(s(!0),p(w,null,V(v.songs,(i,r)=>(s(),g(J,{id:i.id,key:r,artist:i.artist,cover:i.cover,title:i.title,onPlay:y=>c(i.id)},null,8,["id","artist","cover","title","onPlay"]))),128))]),_:2},1024))),128))])):(s(),p("span",Pe,"No local covers"))]),t("div",Ie,[Ae,l.value.length?(s(),p("div",Ne,[(s(!0),p(w,null,V(l.value,(v,x)=>(s(),g(j,{key:x,class:"track p-4"},{default:G(()=>[t("div",De,[t("p",Te,[m(q,{text:v.name},null,8,["text"])]),t("span",{class:"material-symbols-rounded cursor-pointer",onClick:i=>a(v.name)},"delete",8,Be)]),t("div",Ue,[t("audio",{src:"/api/"+v.name.replace("local:","/src/tracks/"),controls:""},null,8,Ee)]),(s(!0),p(w,null,V(v.songs,(i,r)=>(s(),g(J,{id:i.id,key:r,artist:i.artist,cover:i.cover,title:i.title,onPlay:y=>c(i.id)},null,8,["id","artist","cover","title","onPlay"]))),128))]),_:2},1024))),128))])):(s(),p("span",Oe,"No local tracks"))])]))}},Ge=A(Le,[["__scopeId","data-v-4062735d"]]),je={class:"markdown-body"},qe=te("<p>By default, reAudioPlayer does not share any data with third parties.</p><p>Optionally, when entering your Spotify credentials, reAudioPlayer can access your Spotify data to offer the following features:</p><ul><li>Display your Spotify playlists and offer importing them</li><li>Search songs on Spotify without leaving reAudioPlayer and adding them to your playlists</li><li>Display song information (BPM, key, etc.) from Spotify</li><li>Search artists on Spotify without leaving reAudioPlayer to display their information and follow them on Spotify</li><li>Display artist information (genres, popularity, etc.) from Spotify</li><li>Provide the release radar</li></ul><p>Optionally, when entering your GitHub credentials, reAudioPlayer can access your GitHub data to offer the following features:</p><ul><li>Storing your library in a GitHub Gist</li><li>Importing your library from a GitHub Gist</li></ul><p>All data stays between your device and Spotify or Github, respectively.</p><p>Depending on the cache policy, reAudioPlayer stores songs locally to improve performance and reduce network traffic. The browser additionally stores the following user preferences in local storage:</p><ul><li>Theme</li><li>Selected audio player</li><li>Volume</li><li>Repeat mode</li><li>Picture in Picture mode</li><li>pre-rendered placeholder images</li></ul><p>You can manage your local data, that you manually uploaded to reAudioPlayer, in section “Local Data”. None of this data left or will leave your device.</p>",9),Re=[qe],Je={__name:"Privacy",setup(o,{expose:e}){return e({frontmatter:{}}),(h,n)=>(s(),p("div",je,Re))}},He={class:"material-symbols-rounded ms-wght-300 cursor-pointer"},Fe={class:"checkbox__label"},Me={class:"checkbox__label__title"},We={class:"checkbox__label__sublabel italic"},Ye=S({__name:"Checkbox",props:{modelValue:{type:Boolean,required:!0},label:{type:String,required:!1,default:""},disabled:{type:Boolean,required:!1,default:!1},sublabel:{type:String,required:!1,default:""}},emits:["update:modelValue"],setup(o,{emit:e}){const l=o,h=e,n=a=>h("update:modelValue",a),u=()=>{l.disabled||n(!l.modelValue)};return(a,c)=>(s(),p("div",{class:B([{"opacity-50":o.disabled},"checkbox"]),onClick:u},[t("span",He,k(o.modelValue?"check_box":"check_box_outline_blank"),1),t("div",Fe,[t("div",Me,k(o.label),1),t("div",We,k(o.sublabel),1)])],2))}}),I=A(Ye,[["__scopeId","data-v-be9fa887"]]),ze={class:"relative"},Ke=S({__name:"Cache",setup(o){const e=_(null),l=_("");F().then(u=>{e.value=u,l.value=JSON.stringify(u)});const h=N(()=>e.value?JSON.stringify(e.value)!==l.value:!1),n=async()=>{h.value&&(await W(e.value),l.value=JSON.stringify(e.value))};return(u,a)=>(s(),p("div",ze,[e.value?(s(),g(I,{key:0,modelValue:e.value.cache.preserve,"onUpdate:modelValue":a[0]||(a[0]=c=>e.value.cache.preserve=c),label:"Preserve cache"},null,8,["modelValue"])):P("",!0),e.value?(s(),g(I,{key:1,modelValue:e.value.cache.preserveInSession,"onUpdate:modelValue":a[1]||(a[1]=c=>e.value.cache.preserveInSession=c),disabled:e.value.cache.preserve,label:"Preserve cache in session"},null,8,["modelValue","disabled"])):P("",!0),e.value?(s(),g(M,{key:2,modelValue:e.value.cache.strategy,"onUpdate:modelValue":a[2]||(a[2]=c=>e.value.cache.strategy=c),options:[{value:"all",label:"All Songs"},{value:"playlist",label:"Current Playlist"},{value:"currentNext",label:"Current + Next Song "},{value:"current",label:"Current Song Only"}],icon:"cached"},null,8,["modelValue"])):P("",!0),m($,{disabled:!e.value||!h.value,class:"ml-auto mt-4",icon:"save",label:"Save",onClick:n},null,8,["disabled"])]))}}),Qe={name:"Theme",props:{name:String},methods:{selected(){return R.getCurrentTheme()==this.name},select(){R.setTheme(this.name),this.$emit("selected")}}},Xe=["src"];function Ze(o,e,l,h,n,u){return s(),p("div",{onClick:e[0]||(e[0]=(...a)=>u.select&&u.select(...a)),class:"wrapper"},[t("p",{class:B(["mb-4",{selected:u.selected()}])},k(l.name),3),t("img",{src:`/assets/img/themes/${this.name}.svg`,class:B({selected:u.selected()})},null,10,Xe)])}const et=A(Qe,[["render",Ze],["__scopeId","data-v-74855c2d"]]),K=o=>(U("data-v-5cc6477c"),o=o(),E(),o),tt=K(()=>t("h3",{class:"mt-[10px]"},"Theme",-1)),at={class:"themes"},lt=K(()=>t("h3",{class:"mt-[10px]"},"Sidebar",-1)),st=S({__name:"Appearance",setup(o){const e=O(),l=["dynamic","light","dark"];return(h,n)=>(s(),p(w,null,[tt,m(I,{modelValue:b(e).ambient,"onUpdate:modelValue":n[0]||(n[0]=u=>b(e).ambient=u),disabled:!b(e).themeSupportsAmbient,label:"Ambient"},null,8,["modelValue","disabled"]),t("div",at,[(s(),p(w,null,V(l,(u,a)=>m(et,{key:a,name:u},null,8,["name"])),64))]),lt,m(I,{modelValue:b(e).sidebar.news,"onUpdate:modelValue":n[1]||(n[1]=u=>b(e).sidebar.news=u),label:"Show 'News' Tab"},null,8,["modelValue"]),m(I,{modelValue:b(e).sidebar.sports,"onUpdate:modelValue":n[2]||(n[2]=u=>b(e).sidebar.sports=u),label:"Show 'Sports' Tab"},null,8,["modelValue"])],64))}}),ot=A(st,[["__scopeId","data-v-5cc6477c"]]),nt={class:"relative"},it=S({__name:"Player",setup(o){const e=O();return(l,h)=>(s(),p("div",nt,[m(I,{modelValue:b(e).player.pictureInPicture,"onUpdate:modelValue":h[0]||(h[0]=n=>b(e).player.pictureInPicture=n),label:"Support Picture in Picture",sublabel:"this will slightly reduce performance"},null,8,["modelValue"]),m(M,{modelValue:b(e).player.type,"onUpdate:modelValue":h[1]||(h[1]=n=>b(e).player.type=n),options:[{value:"web",label:"Native player",icon:"horizontal_rule"},{value:"web/wave",label:"Wave player",icon:"graphic_eq"}],icon:"music_note"},null,8,["modelValue"])]))}}),Q="reAudioPlayer One",rt=`https://audius.co/oauth/auth?scope=read&app_name=${Q}&redirect_uri=`,ct="/audius/callback",ut=()=>{const o=encodeURIComponent(`${window.location.origin}${ct}`),e=`${rt}${o}`;window.open(e,Q,"width=500,height=800")},dt=t("summary",{class:"cursor-pointer"},"How to",-1),pt=t("p",null,[D(" 1) Head over to the "),t("a",{href:"https://developer.spotify.com/dashboard/applications",target:"_blank"},"spotify developer dashboard")],-1),mt=t("p",null,"2) Create An App",-1),ht=t("p",null,"3) Enter any name and any description",-1),vt=t("p",null," 5) Copy and enter the client id and secret into the corresponding input field ",-1),_t=t("hr",{class:"my-4"},null,-1),ft=t("h5",null,"Client ID:",-1),yt=t("h5",{class:"mt-4"},"Client Secret:",-1),bt=t("h3",{class:"mt-[10px]"},"Github",-1),gt=t("h5",{class:"mt-4"},"PAT:",-1),kt=t("h5",{class:"mt-4"},"Gist ID:",-1),wt={class:"flex gap-4 justify-end mt-4"},$t=t("h3",{class:"mt-[10px]"},"Audius",-1),St=S({__name:"Integration",setup(o){const e=_(!1),l=_({id:"",secret:""}),h=N(()=>e.value?Object.values(l.value).some(i=>i==="")?!1:l.value.id!==n.value.id||l.value.secret!==n.value.secret||e.value!==n.value.enabled:n.value.enabled),n=_({id:"",secret:"",enabled:!1});fetch("/api/config/spotify").then(async i=>{let r={id:"",secret:"",enabled:!1};if(i.status==200)r=await i.json();else if([204,401].includes(i.status))r={id:"restricted",secret:"restricted",enabled:!1};else throw new Error("Failed to fetch spotify config");n.value=r,n.value.enabled=![r.id,r.secret].includes("restricted"),e.value=n.value.enabled,l.value.id=r.id.replace("restricted",""),l.value.secret=r.secret.replace("restricted","")});const u=async()=>{if(!h.value)return;let i=l.value.id,r=l.value.secret;e.value||(r=i="restricted"),(await fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:i,secret:r})})).ok&&(n.value={id:i,secret:r,enabled:e.value})},a=_(null),c=_("");F().then(i=>{a.value=i,c.value=JSON.stringify(i)});const f=N(()=>a.value?JSON.stringify(a.value)!==c.value:!1),d=async()=>{f.value&&(await W(a.value),c.value=JSON.stringify(a.value))},v=`http://${window.location.host}/api/spotify/callback`,x=async()=>{var i,r;(r=(i=a.value)==null?void 0:i.github)!=null&&r.githubPat&&(a.value.github.gistId||(a.value.github.gistId=await ie.search(a.value.github.githubPat),a.value.github.gistId||ae.addError("Failed to find gist","You can start syncing directly in 'Local Data' (a Gist will be created for you) or enter the gist id manually")))};return Y(()=>{var i,r;return(r=(i=a.value)==null?void 0:i.github)==null?void 0:r.githubPat},x),(i,r)=>(s(),p(w,null,[m(I,{modelValue:e.value,"onUpdate:modelValue":r[0]||(r[0]=y=>e.value=y),class:"h3 mb-2",label:"Spotify"},null,8,["modelValue"]),t("details",null,[dt,pt,mt,ht,t("p",null,[D(" 4) Edit the settings: set the redirect url to "),t("a",{href:v},k(v))]),vt]),_t,ft,m(T,{modelValue:l.value.id,"onUpdate:modelValue":r[1]||(r[1]=y=>l.value.id=y),disabled:!e.value,type:"password",icon:"token"},null,8,["modelValue","disabled"]),yt,m(T,{modelValue:l.value.secret,"onUpdate:modelValue":r[2]||(r[2]=y=>l.value.secret=y),disabled:!e.value,type:"password",icon:"lock"},null,8,["modelValue","disabled"]),m($,{disabled:!h.value,class:"ml-auto mt-4",icon:"save",label:"Save",onClick:u},null,8,["disabled"]),bt,gt,a.value?(s(),g(T,{key:0,modelValue:a.value.github.githubPat,"onUpdate:modelValue":r[3]||(r[3]=y=>a.value.github.githubPat=y),icon:"lock",type:"password"},null,8,["modelValue"])):P("",!0),kt,a.value?(s(),g(T,{key:1,modelValue:a.value.github.gistId,"onUpdate:modelValue":r[4]||(r[4]=y=>a.value.github.gistId=y),icon:"numbers"},null,8,["modelValue"])):P("",!0),t("div",wt,[m($,{disabled:!a.value||!a.value.github.githubPat||!!a.value.github.gistId,icon:"search",label:"Search",onClick:x},null,8,["disabled"]),m($,{disabled:!a.value||!f.value,icon:"save",label:"Save",onClick:d},null,8,["disabled"])]),$t,m($,{icon:"link",label:"Connect",onClick:b(ut)},null,8,["onClick"])],64))}}),Ct={class:"flex items-center gap-2"},xt=S({__name:"Developer",setup(o){O();const e=()=>{fetch("/api/system/kill")},l=()=>{fetch("/api/system/restart/nginx")};return(h,n)=>(s(),p("div",Ct,[m($,{icon:"refresh",label:"Restart",onClick:e,type:"danger"}),m($,{icon:"refresh",label:"Restart Nginx",onClick:l})]))}}),Vt=o=>(U("data-v-2a5c5e34"),o=o(),E(),o),Pt={class:"p-[10px] preferences"},It=Vt(()=>t("h1",{class:"w-full"},"Preferences",-1)),At={class:"wrapper"},Nt={class:"sections flex flex-col"},Dt={class:"section p-2"},Tt={class:"h5 text-sm"},Bt=S({__name:"index",setup(o){const e=O(),l={About:fe,Privacy:Je,"Local Data":Ge,Integrations:St,"Cache Policy":Ke,Appearance:ot,Player:it,Developer:xt},h=N(()=>{const f=[{name:"General",items:["About"]},{name:"My Data",items:["Privacy","Local Data","Integrations"]},{name:"Player",items:["Player","Cache Policy"]},{name:"Appearance",items:["Appearance"]}];return e.mode.dev&&f.push({name:"Developer",items:["Developer"]}),f}),n=le(),u=se();let a=n.query.tab;const c=_("About");return Object.keys(l).includes(a)&&(c.value=a),Y(c,f=>{const d={tab:f};u.replace({query:d})}),(f,d)=>(s(),p("div",Pt,[It,t("div",At,[t("div",Nt,[(s(!0),p(w,null,V(h.value,C=>(s(),p("div",Dt,[t("span",Tt,k(C.name),1),(s(!0),p(w,null,V(C.items,v=>(s(),g(ce,{key:v,name:v,active:c.value===v,onClick:x=>c.value=v},null,8,["name","active","onClick"]))),128))]))),256))]),m(j,{class:"content h-max p-4 pt-0"},{default:G(()=>[t("h2",null,k(c.value),1),(s(),g(oe(l[c.value])))]),_:1})])]))}}),Gt=A(Bt,[["__scopeId","data-v-2a5c5e34"]]);export{Gt as default};
