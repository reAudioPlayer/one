import{_ as m,o as d,c as h,a as e,t as v,s as _,bB as T,bC as w,x as p,bv as u,u as a,b as g,z as f,P as y,f as b,w as I,F as P,h as B,k as x,l as N}from"./index.8fd665a1.js";import{F as S}from"./FullShelf.b429de92.js";import{b as $}from"./index.b5a11ad3.js";const V={name:"Theme",props:{name:String},methods:{selected(){return window.getCurrentTheme()==this.name},select(){window.setTheme(this.name),this.$emit("selected")}}},M=["src"];function R(i,r,c,l,o,t){return d(),h("div",{onClick:r[0]||(r[0]=(...s)=>t.select&&t.select(...s)),class:"wrapper"},[e("p",{class:_({selected:t.selected()})},v(c.name),3),e("img",{src:`/assets/img/themes/${this.name}.svg`,class:_({selected:t.selected()})},null,10,M)])}const k=m(V,[["render",R],["__scopeId","data-v-0f8ac1ca"]]);const n=i=>(x("data-v-1de234f8"),i=i(),N(),i),O={class:"preferences"},U={class:"padding-10"},D={class:"sidebar"},F=n(()=>e("h2",null,"Sidebar",-1)),L={class:"checkbox"},A=n(()=>e("label",{for:"checkbox"},[e("span",null,'Show "News" tab')],-1)),E={class:"checkbox"},H=n(()=>e("label",{for:"checkbox2"},[e("span",null,'Show "Sports" tab')],-1)),j={class:"sidebar"},z=n(()=>e("h2",null,"Player",-1)),J=["disabled"],q={key:0,for:"checkbox3"},G=n(()=>e("span",null,"Play in browser",-1)),K=[G],Q={key:1,for:"checkbox3"},W=n(()=>e("span",null,"Play in browser (local playback not supported on this device)",-1)),X=[W],Y={class:"sidebar"},Z=n(()=>e("h2",null,"Data Backup",-1)),ee={class:"wrapTogether spaceBetween"},te={class:"spotify"},se=n(()=>e("h2",null,"Spotify",-1)),oe=n(()=>e("summary",null,"How to",-1)),ne=n(()=>e("p",null,[g("1) Head over to the "),e("a",{href:"https://developer.spotify.com/dashboard/applications",target:"_blank"},"spotify developer dashboard")],-1)),ie=n(()=>e("p",null,"2) Create An App",-1)),le=n(()=>e("p",null,"3) Enter any name and any description",-1)),ae=n(()=>e("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),de={class:"wrapTogether"},re=n(()=>e("p",null,"Client ID: ",-1)),ce={class:"wrapTogether"},pe=n(()=>e("p",null,"Client Secret: ",-1)),he={class:"wrapTogether spaceBetween"},ue=n(()=>e("h2",null,"Themes",-1));window.Buffer=$.Buffer;new T("reapApollo");const _e={components:{Theme:k,FullShelf:S},name:"Preferences",setup(){return{settings:w()}},methods:{updateThemes(){this.themeSelected=window.getCurrentTheme()},changeShowSportsTab(){},changeShowNewsTab(){},changePlayInBrowser(){},saveRestrictedMode(){this.spotifyClientId||this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:"restricted",secret:"restricted"})}).then(i=>console.log(i))},saveSpotify(){!this.spotifyClientId||!this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:this.spotifyClientId,secret:this.spotifyClientSecret})}).then(i=>console.log(i))}},data(){const i=["jade","dark","light"],r=window.getCurrentTheme();return{themes:i,themeSelected:r,spotifyClientId:"",spotifyClientSecret:""}}},fe=Object.assign(_e,{setup(i){const c=`http://${window.location.host}/api/spotify/callback`,l=w();return(o,t)=>(d(),h("div",O,[e("div",U,[e("div",D,[F,e("div",L,[p(e("input",{onChange:t[0]||(t[0]=(...s)=>o.changeShowNewsTab&&o.changeShowNewsTab(...s)),"onUpdate:modelValue":t[1]||(t[1]=s=>a(l).sidebar.news=s),type:"checkbox",id:"checkbox",name:"",value:""},null,544),[[u,a(l).sidebar.news]]),A]),e("div",E,[p(e("input",{onChange:t[2]||(t[2]=(...s)=>o.changeShowSportsTab&&o.changeShowSportsTab(...s)),"onUpdate:modelValue":t[3]||(t[3]=s=>a(l).sidebar.sports=s),type:"checkbox",id:"checkbox2",name:"",value:""},null,544),[[u,a(l).sidebar.sports]]),H])]),e("div",j,[z,e("div",{class:_(["checkbox",{disabled:!a(l).player.supportsLocalPlayback}])},[p(e("input",{onChange:t[4]||(t[4]=(...s)=>o.changePlayInBrowser&&o.changePlayInBrowser(...s)),disabled:!a(l).player.supportsLocalPlayback,"onUpdate:modelValue":t[5]||(t[5]=s=>a(l).player.inBrowser=s),type:"checkbox",id:"checkbox3",name:"",value:""},null,40,J),[[u,a(l).player.inBrowser]]),a(l).player.supportsLocalPlayback?(d(),h("label",q,K)):(d(),h("label",Q,X))],2)]),e("div",Y,[Z,e("div",ee,[e("button",{onClick:t[6]||(t[6]=s=>o.$router.push("/export"))},"Save"),e("button",{onClick:t[7]||(t[7]=s=>o.$router.push("/import"))},"Restore")])]),e("div",te,[se,e("details",null,[oe,ne,ie,le,e("p",null,[g("4) Edit the settings: set the redirect url to "),e("a",{href:c},v(c))]),ae]),e("div",de,[re,p(e("input",{type:"text","onUpdate:modelValue":t[8]||(t[8]=s=>y(spotifyClientId)?spotifyClientId.value=s:null)},null,512),[[f,o.spotifyClientId]])]),e("div",ce,[pe,p(e("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=s=>y(spotifyClientSecret)?spotifyClientSecret.value=s:null)},null,512),[[f,o.spotifyClientSecret]])]),e("div",he,[e("button",{onClick:t[10]||(t[10]=(...s)=>o.saveSpotify&&o.saveSpotify(...s))},"save"),e("button",{onClick:t[11]||(t[11]=(...s)=>o.saveRestrictedMode&&o.saveRestrictedMode(...s)),class:"restrictedMode"},"enter restricted mode")])])]),e("div",null,[ue,(d(),b(S,{key:o.themeSelected},{default:I(()=>[(d(!0),h(P,null,B(o.themes,(s,C)=>(d(),b(k,{onSelected:o.updateThemes,key:C,name:s},null,8,["onSelected","name"]))),128))]),_:1}))])]))}}),ve=m(fe,[["__scopeId","data-v-1de234f8"]]);export{ve as default};