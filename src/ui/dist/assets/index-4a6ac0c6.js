import{n as O,o as b,c as x,a,t as w,aH as $,_ as P,q as k,G as q,d as C,bD as j,br as F,c4 as T,A as N,c5 as H,c6 as M,g as s,w as _,C as g,b as E,u as r,F as z,i as K,f as I,T as B,c7 as L,l as R,m as Q}from"./index-90f156f1.js";import{I as y}from"./IconButton-fd5e5c4b.js";import{D}from"./Dropdown-5aecfda8.js";import{G as X}from"./gistClient-50d43557.js";const Y={class:"material-symbols-rounded ms-wght-300 cursor-pointer"},Z={class:"checkbox__label"},ee={class:"checkbox__label__title"},le={class:"checkbox__label__sublabel italic"},te=O({__name:"Checkbox",props:{modelValue:{type:Boolean,required:!0},label:{type:String,required:!1,default:""},disabled:{type:Boolean,required:!1,default:!1},sublabel:{type:String,required:!1,default:""}},emits:["update:modelValue"],setup(i,{emit:d}){const n=i,p=m=>d("update:modelValue",m),c=()=>{n.disabled||p(!n.modelValue)};return(m,l)=>(b(),x("div",{class:$([{"opacity-50":i.disabled},"checkbox"]),onClick:c},[a("span",Y,w(i.modelValue?"check_box":"check_box_outline_blank"),1),a("div",Z,[a("div",ee,w(i.label),1),a("div",le,w(i.sublabel),1)])],2))}});const V=P(te,[["__scopeId","data-v-982c4110"]]);const ae={key:0,class:"material-symbols-rounded"},se=["disabled","placeholder","type"],oe={__name:"PasswordInputWithIcon",props:{icon:String,placeholder:String,modelValue:String,disabled:Boolean},emits:["update:modelValue","change","submit"],setup(i,{emit:d}){const n=i,p=k(n.modelValue);q(()=>n.modelValue,h=>{p.value=h});const c=()=>{d("update:modelValue",p.value),d("change",p.value)},m=h=>{h.key==="Enter"&&d("submit",p)},l=k(!1);return(h,f)=>(b(),x("div",{class:$([{disabled:i.disabled},"text-input-with-icon rounded-3xl flex items-center px-4"])},[i.icon?(b(),x("span",ae,w(i.icon),1)):C("",!0),j(a("input",{"onUpdate:modelValue":f[0]||(f[0]=S=>p.value=S),disabled:i.disabled,placeholder:i.placeholder,type:l.value?"text":"password",onInput:c,onKeyup:m},null,40,se),[[F,p.value]]),a("span",{class:"material-symbols-rounded cursor-pointer",onClick:f[1]||(f[1]=S=>l.value=!l.value)},w(l.value?"visibility":"visibility_off"),1)],2))}},A=P(oe,[["__scopeId","data-v-5e026540"]]);const ne={name:"Theme",props:{name:String},methods:{selected(){return T.getCurrentTheme()==this.name},select(){T.setTheme(this.name),this.$emit("selected")}}},ie=["src"];function de(i,d,n,p,c,m){return b(),x("div",{onClick:d[0]||(d[0]=(...l)=>m.select&&m.select(...l)),class:"wrapper"},[a("p",{class:$(["mb-4",{selected:m.selected()}])},w(n.name),3),a("img",{src:`/assets/img/themes/${this.name}.svg`,class:$({selected:m.selected()})},null,10,ie)])}const ue=P(ne,[["render",de],["__scopeId","data-v-74855c2d"]]),u=i=>(R("data-v-519432f4"),i=i(),Q(),i),re={class:"p-[10px] preferences"},ce=u(()=>a("summary",{class:"cursor-pointer"},"How to",-1)),pe=u(()=>a("p",null,[E("1) Head over to the "),a("a",{href:"https://developer.spotify.com/dashboard/applications",target:"_blank"},"spotify developer dashboard")],-1)),me=u(()=>a("p",null,"2) Create An App",-1)),ve=u(()=>a("p",null,"3) Enter any name and any description",-1)),be=u(()=>a("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),he=u(()=>a("hr",{class:"my-4"},null,-1)),fe=u(()=>a("h5",null,"Client ID: ",-1)),_e=u(()=>a("h5",{class:"mt-4"},"Client Secret: ",-1)),ge=u(()=>a("h2",{class:"mt-[10px]"},"Player",-1)),ye=u(()=>a("h2",{class:"mt-[10px]"},"Theme",-1)),Ve={class:"themes"},ke=u(()=>a("h2",{class:"mt-[10px]"},"Sidebar",-1)),we=u(()=>a("h2",{class:"mt-[10px]"},"Cache Behaviour",-1)),Ce=u(()=>a("h2",{class:"mt-[10px]"},"Github",-1)),xe=u(()=>a("h5",{class:"mt-4"},"PAT: ",-1)),Se=u(()=>a("h5",{class:"mt-4"},"Gist ID: ",-1)),Ie=u(()=>a("h2",{class:"mt-[10px]"},"My Data",-1)),$e=O({__name:"index",setup(i){const d=k(!1),n=k({id:"",secret:""}),p=N(()=>d.value?Object.values(n.value).some(o=>o==="")?!1:n.value.id!==c.value.id||n.value.secret!==c.value.secret||d.value!==c.value.enabled:c.value.enabled),c=k({id:"",secret:"",enabled:!1});fetch("/api/config/spotify").then(async o=>{let e={id:"",secret:"",enabled:!1};if(o.status==200)e=await o.json();else if([204,401].includes(o.status))e={id:"restricted",secret:"restricted",enabled:!1};else throw new Error("Failed to fetch spotify config");c.value=e,c.value.enabled=![e.id,e.secret].includes("restricted"),d.value=c.value.enabled,n.value.id=e.id.replace("restricted",""),n.value.secret=e.secret.replace("restricted","")});const m=async()=>{if(!p.value)return;let o=n.value.id,e=n.value.secret;d.value||(e=o="restricted"),(await fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:o,secret:e})})).ok&&(c.value={id:o,secret:e,enabled:d.value})},l=k(null),h=k("");H().then(o=>{l.value=o,h.value=JSON.stringify(o)});const f=N(()=>l.value?JSON.stringify(l.value)!==h.value:!1),S=async()=>{f.value&&(await L(l.value),h.value=JSON.stringify(l.value))},v=M(),G=["dynamic","light","dark"],W=()=>{localStorage.clear(),sessionStorage.clear(),window.location.reload()},U=`http://${window.location.host}/api/spotify/callback`;return q(()=>{var o,e;return(e=(o=l.value)==null?void 0:o.github)==null?void 0:e.githubPat},async()=>{var o,e;(e=(o=l.value)==null?void 0:o.github)!=null&&e.githubPat&&(l.value.github.gistId||(l.value.github.gistId=await X.search(l.value.github.githubPat),console.log(l.value.github.gistId)))}),(o,e)=>(b(),x("div",re,[s(g,{"aria-description":"spotify",class:"p-4 pt-0"},{default:_(()=>[s(V,{modelValue:d.value,"onUpdate:modelValue":e[0]||(e[0]=t=>d.value=t),class:"h2 mb-2",label:"Spotify"},null,8,["modelValue"]),a("details",null,[ce,pe,me,ve,a("p",null,[E("4) Edit the settings: set the redirect url to "),a("a",{href:U},w(U))]),be]),he,fe,s(A,{modelValue:n.value.id,"onUpdate:modelValue":e[1]||(e[1]=t=>n.value.id=t),disabled:!d.value,icon:"token"},null,8,["modelValue","disabled"]),_e,s(A,{modelValue:n.value.secret,"onUpdate:modelValue":e[2]||(e[2]=t=>n.value.secret=t),disabled:!d.value,icon:"lock"},null,8,["modelValue","disabled"]),s(y,{disabled:!r(p),class:"ml-auto mt-4",icon:"save",label:"Save",onClick:m},null,8,["disabled"])]),_:1}),s(g,{"aria-description":"player",class:"p-4 pt-0"},{default:_(()=>[ge,s(V,{modelValue:r(v).player.pictureInPicture,"onUpdate:modelValue":e[3]||(e[3]=t=>r(v).player.pictureInPicture=t),label:"Support Picture in Picture",sublabel:"this will slightly reduce performance"},null,8,["modelValue"]),s(D,{modelValue:r(v).player.type,"onUpdate:modelValue":e[4]||(e[4]=t=>r(v).player.type=t),options:[{value:"web",label:"Native player",icon:"horizontal_rule"},{value:"web/wave",label:"Wave player",icon:"graphic_eq"}],icon:"music_note"},null,8,["modelValue"])]),_:1}),s(g,{"aria-description":"theme",class:"p-4 pt-0"},{default:_(()=>[ye,s(V,{modelValue:r(v).ambient,"onUpdate:modelValue":e[5]||(e[5]=t=>r(v).ambient=t),disabled:!r(v).themeSupportsAmbient,label:"Ambient"},null,8,["modelValue","disabled"]),a("div",Ve,[(b(),x(z,null,K(G,(t,J)=>s(ue,{key:J,name:t},null,8,["name"])),64))])]),_:1}),s(g,{"aria-description":"sidebar",class:"p-4 pt-0"},{default:_(()=>[ke,s(V,{modelValue:r(v).sidebar.news,"onUpdate:modelValue":e[6]||(e[6]=t=>r(v).sidebar.news=t),label:"Show 'News' Tab"},null,8,["modelValue"]),s(V,{modelValue:r(v).sidebar.sports,"onUpdate:modelValue":e[7]||(e[7]=t=>r(v).sidebar.sports=t),label:"Show 'Sports' Tab"},null,8,["modelValue"])]),_:1}),s(g,{"aria-description":"cache behaviour",class:"p-4 pt-0"},{default:_(()=>[we,l.value?(b(),I(V,{key:0,modelValue:l.value.cache.preserve,"onUpdate:modelValue":e[8]||(e[8]=t=>l.value.cache.preserve=t),label:"Preserve cache"},null,8,["modelValue"])):C("",!0),l.value?(b(),I(V,{key:1,modelValue:l.value.cache.preserveInSession,"onUpdate:modelValue":e[9]||(e[9]=t=>l.value.cache.preserveInSession=t),disabled:l.value.cache.preserve,label:"Preserve cache in session"},null,8,["modelValue","disabled"])):C("",!0),l.value?(b(),I(D,{key:2,modelValue:l.value.cache.strategy,"onUpdate:modelValue":e[10]||(e[10]=t=>l.value.cache.strategy=t),options:[{value:"all",label:"All Songs"},{value:"playlist",label:"Current Playlist"},{value:"currentNext",label:"Current + Next Song "},{value:"current",label:"Current Song Only"}],icon:"cached"},null,8,["modelValue"])):C("",!0),s(y,{disabled:!l.value||!r(f),class:"ml-auto mt-4",icon:"save",label:"Save",onClick:S},null,8,["disabled"])]),_:1}),s(g,{"aria-description":"github settings",class:"p-4 pt-0"},{default:_(()=>[Ce,xe,l.value?(b(),I(B,{key:0,modelValue:l.value.github.githubPat,"onUpdate:modelValue":e[11]||(e[11]=t=>l.value.github.githubPat=t),icon:"lock"},null,8,["modelValue"])):C("",!0),Se,l.value?(b(),I(B,{key:1,modelValue:l.value.github.gistId,"onUpdate:modelValue":e[12]||(e[12]=t=>l.value.github.gistId=t),icon:"numbers"},null,8,["modelValue"])):C("",!0),s(y,{disabled:!l.value||!r(f),class:"ml-auto mt-4",icon:"save",label:"Save",onClick:S},null,8,["disabled"])]),_:1}),s(g,{"aria-description":"my data",class:"p-4 pt-0"},{default:_(()=>[Ie,s(y,{class:"mx-auto mt-4",icon:"backup",label:"Back up database",onClick:e[13]||(e[13]=t=>o.$router.push("/export"))}),s(y,{class:"mx-auto mt-4",icon:"cloud_download",label:"Import database",onClick:e[14]||(e[14]=t=>o.$router.push("/import"))}),s(y,{class:"mx-auto mt-4",icon:"delete",label:"Clean browser settings",onClick:W}),s(y,{class:"mx-auto mt-4",icon:"folder",label:"Manage files",onClick:e[15]||(e[15]=t=>o.$router.push("/preferences/my-data"))})]),_:1})]))}});const De=P($e,[["__scopeId","data-v-519432f4"]]);export{De as default};