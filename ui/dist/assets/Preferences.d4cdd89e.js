import{F as g}from"./FullShelf.473b4125.js";import{_ as b,o as a,c as u,a as e,t as T,j as _,H as C,l as i,bn as p,m as w,f as m,w as k,F as I,i as x,p as B,h as N,b as y,e as f}from"./index.475ed424.js";import{b as P}from"./index.11d3b0f3.js";const V={name:"Theme",props:{name:String},methods:{selected(){return window.getCurrentTheme()==this.name},select(){window.setTheme(this.name),this.$emit("selected")}}},M=["src"];function A(r,t,d,c,l,o){return a(),u("div",{onClick:t[0]||(t[0]=(...h)=>o.select&&o.select(...h)),class:"wrapper"},[e("p",{class:_({selected:o.selected()})},T(d.name),3),e("img",{src:`/assets/img/themes/${this.name}.svg`,class:_({selected:o.selected()})},null,10,M)])}var U=b(V,[["render",A],["__scopeId","data-v-19ce98eb"]]);window.Buffer=P.Buffer;new C("reapApollo");const D={components:{Theme:U,FullShelf:g},name:"Preferences",methods:{updateThemes(){this.themeSelected=window.getCurrentTheme()},changeShowSportsTab(){window.localStorage.setItem("sidebar.showSportsTab",this.showSportsTab?"true":"false")},changeShowNewsTab(){window.localStorage.setItem("sidebar.showNewsTab",this.showNewsTab?"true":"false")},changePlayInBrowser(){window.localStorage.setItem("player.inBrowser",this.playInBrowser?"true":"false")},saveRestrictedMode(){this.spotifyClientId||this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:"restricted",secret:"restricted"})}).then(r=>console.log(r))},saveSpotify(){!this.spotifyClientId||!this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:this.spotifyClientId,secret:this.spotifyClientSecret})}).then(r=>console.log(r))}},data(){const r=["jade","dark","light"],t=window.getCurrentTheme();let d="",c="";return{coverAsBackground:window.localStorage.getItem("player.coverAsBackground")=="true",themes:r,themeSelected:t,showSportsTab:window.localStorage.getItem("sidebar.showSportsTab")=="true",showNewsTab:window.localStorage.getItem("sidebar.showNewsTab")=="true",playInBrowser:window.localStorage.getItem("player.inBrowser")=="true",spotifyClientId:d,spotifyClientSecret:c}}},n=r=>(B("data-v-1b37566a"),r=r(),N(),r),F={class:"preferences"},H={class:"padding-10"},O={class:"sidebar"},R=n(()=>e("h2",null,"Sidebar",-1)),E={class:"checkbox"},j=n(()=>e("label",{for:"checkbox"},[e("span",null,'Show "News" tab')],-1)),J={class:"checkbox"},z=n(()=>e("label",{for:"checkbox2"},[e("span",null,'Show "Sports" tab')],-1)),L={class:"sidebar"},q=n(()=>e("h2",null,"Player",-1)),G={class:"checkbox"},K=n(()=>e("label",{for:"checkbox3"},[e("span",null,"Play in browser")],-1)),Q={class:"sidebar"},W=n(()=>e("h2",null,"Data Backup",-1)),X={class:"wrapTogether spaceBetween"},Y={class:"spotify"},Z=n(()=>e("h2",null,"Spotify",-1)),$=n(()=>e("summary",null,"How to",-1)),ee=y("1) Head over to the "),te=n(()=>e("p",null,"2) Create An App",-1)),se=n(()=>e("p",null,"3) Enter any name and any description",-1)),oe=n(()=>e("p",null,[y("4) Edit the settings: set the redirect url to "),e("a",{href:"http://reap.ml/"},"http://reap.ml/")],-1)),ne=n(()=>e("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),re={class:"wrapTogether"},le=n(()=>e("p",null,"Client ID: ",-1)),ie={class:"wrapTogether"},ae=n(()=>e("p",null,"Client Secret: ",-1)),de={class:"wrapTogether spaceBetween"},ce=n(()=>e("h2",null,"Themes",-1));function he(r,t,d,c,l,o){const h=f("theme"),S=f("full-shelf");return a(),u("div",F,[e("div",H,[e("div",O,[R,e("div",E,[i(e("input",{onChange:t[0]||(t[0]=(...s)=>o.changeShowNewsTab&&o.changeShowNewsTab(...s)),"onUpdate:modelValue":t[1]||(t[1]=s=>l.showNewsTab=s),type:"checkbox",id:"checkbox",name:"",value:""},null,544),[[p,l.showNewsTab]]),j]),e("div",J,[i(e("input",{onChange:t[2]||(t[2]=(...s)=>o.changeShowSportsTab&&o.changeShowSportsTab(...s)),"onUpdate:modelValue":t[3]||(t[3]=s=>l.showSportsTab=s),type:"checkbox",id:"checkbox2",name:"",value:""},null,544),[[p,l.showSportsTab]]),z])]),e("div",L,[q,e("div",G,[i(e("input",{onChange:t[4]||(t[4]=(...s)=>o.changePlayInBrowser&&o.changePlayInBrowser(...s)),"onUpdate:modelValue":t[5]||(t[5]=s=>l.playInBrowser=s),type:"checkbox",id:"checkbox3",name:"",value:""},null,544),[[p,l.playInBrowser]]),K])]),e("div",Q,[W,e("div",X,[e("button",{onClick:t[6]||(t[6]=s=>r.$router.push("/export"))},"Save"),e("button",{onClick:t[7]||(t[7]=s=>r.$router.push("/import"))},"Restore")])]),e("div",Y,[Z,e("details",null,[$,e("p",null,[ee,e("a",{onClick:t[8]||(t[8]=()=>r.redirect("https://developer.spotify.com/dashboard/applications"))},"spotify developer dashboard")]),te,se,oe,ne]),e("div",re,[le,i(e("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=s=>l.spotifyClientId=s)},null,512),[[w,l.spotifyClientId]])]),e("div",ie,[ae,i(e("input",{type:"text","onUpdate:modelValue":t[10]||(t[10]=s=>l.spotifyClientSecret=s)},null,512),[[w,l.spotifyClientSecret]])]),e("div",de,[e("button",{onClick:t[11]||(t[11]=(...s)=>o.saveSpotify&&o.saveSpotify(...s))},"save"),e("button",{onClick:t[12]||(t[12]=(...s)=>o.saveRestrictedMode&&o.saveRestrictedMode(...s)),class:"restrictedMode"},"enter restricted mode")])])]),e("div",null,[ce,(a(),m(S,{key:l.themeSelected},{default:k(()=>[(a(!0),u(I,null,x(l.themes,(s,v)=>(a(),m(h,{onSelected:o.updateThemes,key:v,name:s},null,8,["onSelected","name"]))),128))]),_:1}))])])}var we=b(D,[["render",he],["__scopeId","data-v-1b37566a"]]);export{we as default};
