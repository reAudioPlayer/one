import{F as k}from"./FullShelf.83d67d69.js";import{_ as T,a as x,b as B,c as I,d as N,e as A,f as V,g as H,h as M,i as O,j as P,k as U,l as R,m as F,n as J,o as j}from"./underground.24e9c135.js";import{_ as y,o as c,c as p,a as e,t as D,n as m,H as E,w as d,bn as g,l as f,i as b,f as L,F as q,h as z,p as G,k as K,g as S,b as v}from"./index.caf9dd62.js";import{b as u}from"./index.11d3b0f3.js";const Q={name:"Theme",props:{name:String},data(){return{src:new URL({"/src/assets/images/themes/apollo.svg":T,"/src/assets/images/themes/default.svg":x,"/src/assets/images/themes/extraction.svg":B,"/src/assets/images/themes/gradient.svg":I,"/src/assets/images/themes/light-royal.svg":N,"/src/assets/images/themes/light-ruby.svg":A,"/src/assets/images/themes/light.svg":V,"/src/assets/images/themes/neon.svg":H,"/src/assets/images/themes/night-cobalt.svg":M,"/src/assets/images/themes/night-crimson.svg":O,"/src/assets/images/themes/night-fire.svg":P,"/src/assets/images/themes/night-jade.svg":U,"/src/assets/images/themes/quarantine.svg":R,"/src/assets/images/themes/royal.svg":F,"/src/assets/images/themes/ruby.svg":J,"/src/assets/images/themes/underground.svg":j}[`/src/assets/images/themes/${this.name}.svg`],self.location).href}},methods:{selected(){return window.getCurrentTheme()==this.name},select(){window.setTheme(this.name),this.$emit("selected")}}},W=["src"];function X(n,s,l,h,a,o){return c(),p("div",{onClick:s[0]||(s[0]=(...i)=>o.select&&o.select(...i)),class:"wrapper"},[e("p",{class:m({selected:o.selected()})},D(l.name),3),e("img",{src:a.src,class:m({selected:o.selected()})},null,10,W)])}var Y=y(Q,[["render",X],["__scopeId","data-v-0dceb582"]]);window.Buffer=u.Buffer;const w=new E("reapApollo"),Z={components:{Theme:Y,FullShelf:k},name:"Preferences",methods:{updateThemes(){this.themeSelected=window.getCurrentTheme()},changeCoverAsBackground(){window.localStorage.setItem("player.coverAsBackground",this.coverAsBackground?"true":"false")},changeShowSportsTab(){window.localStorage.setItem("sidebar.showSportsTab",this.showSportsTab?"true":"false")},changeShowNewsTab(){window.localStorage.setItem("sidebar.showNewsTab",this.showNewsTab?"true":"false")},saveRestrictedMode(){this.spotifyClientId||this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:"restricted",secret:"restricted"})}).then(n=>console.log(n))},saveSpotify(){!this.spotifyClientId||!this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:this.spotifyClientId,secret:this.spotifyClientSecret})}).then(n=>console.log(n))}},data(){const n=["night-jade","night-cobalt","night-crimson","night-fire","apollo","gradient","underground","default","royal","ruby","light","light-royal","light-ruby"],s=window.getCurrentTheme();let l="",h="";if(this.$route.params.data){const a=w.decodeHex(this.$route.params.data),o=u.Buffer.from(a,"hex").toString("utf8"),i=JSON.parse(o);l=i.data.spotifyApiId,h=i.data.spotifyApiSecret,console.warn(i),i.data.hello={world:"how are you"};const _=u.Buffer.from(JSON.stringify(i),"utf8").toString("hex"),t=w.encodeHex(_);console.warn(t)}return{coverAsBackground:window.localStorage.getItem("player.coverAsBackground")=="true",themes:n,themeSelected:s,showSportsTab:window.localStorage.getItem("sidebar.showSportsTab")=="true",showNewsTab:window.localStorage.getItem("sidebar.showNewsTab")=="true",spotifyClientId:l,spotifyClientSecret:h}}},r=n=>(G("data-v-0449eb23"),n=n(),K(),n),$={class:"preferences"},ee={class:"padding-10"},se={class:"sidebar"},te=r(()=>e("h2",null,"Sidebar",-1)),oe={class:"checkbox"},ae=r(()=>e("label",{for:"checkbox"},[e("span",null,'Show "News" tab')],-1)),ne={class:"checkbox"},re=r(()=>e("label",{for:"checkbox2"},[e("span",null,'Show "Sports" tab')],-1)),ie={class:"sidebar"},le=r(()=>e("h2",null,"Cloud Synchronisation",-1)),de={class:"wrapTogether spaceBetween"},ce={class:"spotify"},he=r(()=>e("h2",null,"Spotify",-1)),_e=r(()=>e("summary",null,"How to",-1)),ge=S("1) Head over to the "),pe=r(()=>e("p",null,"2) Create An App",-1)),ue=r(()=>e("p",null,"3) Enter any name and any description",-1)),me=r(()=>e("p",null,[S("4) Edit the settings: set the redirect url to "),e("a",{href:"http://reap.ml/"},"http://reap.ml/")],-1)),fe=r(()=>e("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),be={class:"wrapTogether"},ve=r(()=>e("p",null,"Client ID: ",-1)),we={class:"wrapTogether"},ye=r(()=>e("p",null,"Client Secret: ",-1)),Se={class:"wrapTogether spaceBetween"},Ce=r(()=>e("h2",null,"Themes",-1)),ke={class:"checkbox"},Te=r(()=>e("label",{for:"checkbox3"},[e("span",null,"Cover as background")],-1));function xe(n,s,l,h,a,o){const i=v("theme"),_=v("full-shelf");return c(),p("div",$,[e("div",ee,[e("div",se,[te,e("div",oe,[d(e("input",{onChange:s[0]||(s[0]=(...t)=>o.changeShowNewsTab&&o.changeShowNewsTab(...t)),"onUpdate:modelValue":s[1]||(s[1]=t=>a.showNewsTab=t),type:"checkbox",id:"checkbox",name:"",value:""},null,544),[[g,a.showNewsTab]]),ae]),e("div",ne,[d(e("input",{onChange:s[2]||(s[2]=(...t)=>o.changeShowSportsTab&&o.changeShowSportsTab(...t)),"onUpdate:modelValue":s[3]||(s[3]=t=>a.showSportsTab=t),type:"checkbox",id:"checkbox2",name:"",value:""},null,544),[[g,a.showSportsTab]]),re])]),e("div",ie,[le,e("div",de,[e("button",{onClick:s[4]||(s[4]=t=>n.$router.push("/export"))},"Save"),e("button",{onClick:s[5]||(s[5]=t=>n.$router.push("/import"))},"Restore")])]),e("div",ce,[he,e("details",null,[_e,e("p",null,[ge,e("a",{onClick:s[6]||(s[6]=()=>n.redirect("https://developer.spotify.com/dashboard/applications"))},"spotify developer dashboard")]),pe,ue,me,fe]),e("div",be,[ve,d(e("input",{type:"text","onUpdate:modelValue":s[7]||(s[7]=t=>a.spotifyClientId=t)},null,512),[[f,a.spotifyClientId]])]),e("div",we,[ye,d(e("input",{type:"text","onUpdate:modelValue":s[8]||(s[8]=t=>a.spotifyClientSecret=t)},null,512),[[f,a.spotifyClientSecret]])]),e("div",Se,[e("button",{onClick:s[9]||(s[9]=(...t)=>o.saveSpotify&&o.saveSpotify(...t))},"save"),e("button",{onClick:s[10]||(s[10]=(...t)=>o.saveRestrictedMode&&o.saveRestrictedMode(...t)),class:"restrictedMode"},"enter restricted mode")])])]),e("div",null,[Ce,e("div",ke,[d(e("input",{onChange:s[11]||(s[11]=(...t)=>o.changeCoverAsBackground&&o.changeCoverAsBackground(...t)),"onUpdate:modelValue":s[12]||(s[12]=t=>a.coverAsBackground=t),type:"checkbox",id:"checkbox3",name:"",value:""},null,544),[[g,a.coverAsBackground]]),Te]),(c(),b(_,{key:a.themeSelected},{default:L(()=>[(c(!0),p(q,null,z(a.themes,(t,C)=>(c(),b(i,{onSelected:o.updateThemes,key:C,name:t},null,8,["onSelected","name"]))),128))]),_:1}))])])}var Ve=y(Z,[["render",xe],["__scopeId","data-v-0449eb23"]]);export{Ve as default};
