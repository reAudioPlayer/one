import{_,o as i,c,a as e,n as y,bI as v,v as C,bJ as g,F as S,h as T,f as w,b as p,B as a,C as h,d as b,e as k,k as I,l as R}from"./index.dbea350e.js";const x={name:"ThemeSmall",props:{name:String},methods:{selected(){return window.getCurrentTheme()==this.name},select(){window.setTheme(this.name),this.$emit("selected")}}},A=["src"];function B(n,s,u,m,o,l){return i(),c("div",{onClick:s[0]||(s[0]=(...r)=>l.select&&l.select(...r)),class:"wrapper"},[e("img",{src:`/assets/img/themes/${this.name}.svg`,class:y({selected:l.selected()})},null,10,A)])}const E=_(x,[["render",B],["__scopeId","data-v-479f3651"]]);const N={components:{ThemeSmall:E},methods:{updateThemes(){this.mode++},redirect(n){window.open(n)},finalRedirectRestricted(){this.spotifyClientId||this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:"restricted",secret:"restricted"})}).then(n=>{n.status==200&&(setTimeout(()=>fetch("/api/releases"),1e3),this.mode++,setTimeout(()=>{this.$router.push("/")},6*1e3))})},async finalRedirect(){!this.spotifyClientId||!this.spotifyClientSecret||(await v(this.spotifyClientId,this.spotifyClientSecret),setTimeout(()=>fetch("/api/releases"),1e3),setTimeout(()=>fetch("/api/news/articles"),1e3),this.mode++,setTimeout(async()=>{await C(),this.$router.push("/")},6*1e3))}},data(){setInterval(()=>{if(this.mode<3){this.mode++;return}},7*1e3);const n=["jade","dark","light"],s=window.getCurrentTheme();return{mode:0,themes:n,themeSelected:s,spotifyClientId:"",spotifyClientSecret:""}},async mounted(){await g()||this.$router.push("/")}},t=n=>(I("data-v-69b9220c"),n=n(),R(),n),V={class:"welcome bouncy centred-column"},Y={key:0,class:"first centred-column"},O=t(()=>e("p",null,"Welcome to",-1)),D=t(()=>e("h1",null,"reAudioPlayer ONE",-1)),F=[O,D],L={key:1,class:"first centred-column"},P=t(()=>e("p",null,"The free audio player with the most extensive catalogue",-1)),U=t(()=>e("h1",null,"ARE YOU READY?",-1)),W=[P,U],H={key:2,class:"first centred-column"},J=t(()=>e("h1",null,"Almost There",-1)),M=t(()=>e("p",null,"After a few configurations you're ready to go",-1)),j=[J,M],z={key:3,class:"permanent centred-column"},G=t(()=>e("h1",null,"Pick a Theme",-1)),q=t(()=>e("p",null,"You'll be able to change the theme at any point later on",-1)),K=t(()=>e("br",null,null,-1)),Q={class:"centred-column appear-delayed"},X={key:4,class:"permanent centred-column"},Z=t(()=>e("h1",null,"Let's integrate Spotify then!",-1)),$=t(()=>e("p",null,"You'll be able to change the tokens at any point later on",-1)),ee=t(()=>e("br",null,null,-1)),te={class:"centred-column appear-delayed"},se=t(()=>e("p",null,"2) Create An App",-1)),oe=t(()=>e("p",null,"3) Enter any name and any description",-1)),ne=t(()=>e("p",null,[p("4) Edit the settings: set the redirect url to "),e("a",{href:"http://reap.ml/"},"http://reap.ml/")],-1)),ie=t(()=>e("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),le=t(()=>e("br",null,null,-1)),ce={class:"wrapTogether"},de=t(()=>e("p",null,"Client ID: ",-1)),re={class:"wrapTogether"},ae=t(()=>e("p",null,"Client Secret: ",-1)),he={class:"wrapTogether spaceBetween"},_e={key:5,class:"centred-column"},pe=t(()=>e("h1",null,"ALRIGHT!",-1)),ue=t(()=>e("p",null,"You're ready to go",-1)),me=[pe,ue];function fe(n,s,u,m,o,l){const r=k("theme-small");return i(),c("div",V,[o.mode==0?(i(),c("div",Y,F)):o.mode==1?(i(),c("div",L,W)):o.mode==2?(i(),c("div",H,j)):o.mode==3?(i(),c("div",z,[G,q,K,e("div",Q,[(i(),c("div",{class:"themes",key:o.themeSelected},[(i(!0),c(S,null,T(o.themes,(d,f)=>(i(),w(r,{onSelected:l.updateThemes,key:f,name:d},null,8,["onSelected","name"]))),128))]))])])):o.mode==4?(i(),c("div",X,[Z,$,ee,e("div",te,[e("p",null,[p("1) Head over to the "),e("a",{onClick:s[0]||(s[0]=()=>l.redirect("https://developer.spotify.com/dashboard/applications"))},"spotify developer dashboard")]),se,oe,ne,ie,le,e("div",ce,[de,a(e("input",{type:"text","onUpdate:modelValue":s[1]||(s[1]=d=>o.spotifyClientId=d)},null,512),[[h,o.spotifyClientId]])]),e("div",re,[ae,a(e("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=d=>o.spotifyClientSecret=d)},null,512),[[h,o.spotifyClientSecret]])]),e("div",he,[e("button",{onClick:s[3]||(s[3]=(...d)=>l.finalRedirect&&l.finalRedirect(...d))},"continue"),e("button",{onClick:s[4]||(s[4]=(...d)=>l.finalRedirectRestricted&&l.finalRedirectRestricted(...d)),class:"restrictedMode"},"enter restricted mode")])])])):o.mode==5?(i(),c("div",_e,me)):b("",!0)])}const ve=_(N,[["render",fe],["__scopeId","data-v-69b9220c"]]);export{ve as default};
