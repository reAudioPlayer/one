import{_,o as i,c as d,a as e,j as y,F as v,i as g,f as C,l as a,m as h,d as T,p as S,h as w,b as p,e as k}from"./index.475ed424.js";const b={name:"ThemeSmall",props:{name:String},methods:{selected(){return window.getCurrentTheme()==this.name},select(){window.setTheme(this.name),this.$emit("selected")}}},I=["src"];function R(s,o,u,m,n,l){return i(),d("div",{onClick:o[0]||(o[0]=(...c)=>l.select&&l.select(...c)),class:"wrapper"},[e("img",{src:`/assets/img/themes/${this.name}.svg`,class:y({selected:l.selected()})},null,10,I)])}var x=_(b,[["render",R],["__scopeId","data-v-5d4dd3c8"]]);const A={components:{ThemeSmall:x},methods:{updateThemes(){this.mode++},redirect(s){window.open(s)},finalRedirectRestricted(){this.spotifyClientId||this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:"restricted",secret:"restricted"})}).then(s=>{s.status==200&&(setTimeout(()=>fetch("/api/releases"),1e3),this.mode++,setTimeout(()=>{this.$router.push("/")},6*1e3))})},finalRedirect(){!this.spotifyClientId||!this.spotifyClientSecret||fetch("/api/config/spotify",{method:"POST",body:JSON.stringify({id:this.spotifyClientId,secret:this.spotifyClientSecret})}).then(s=>{s.status==200&&(setTimeout(()=>fetch("/api/releases"),1e3),setTimeout(()=>fetch("/api/news/articles"),1e3),this.mode++,setTimeout(()=>{this.$router.push("/")},6*1e3))})}},data(){setInterval(()=>{if(this.mode<3){this.mode++;return}},7*1e3);const s=["jade","dark","light"],o=window.getCurrentTheme();return{mode:0,themes:s,themeSelected:o,spotifyClientId:"",spotifyClientSecret:""}},mounted(){fetch("/api/config").then(s=>{s.status==200&&this.$router.push("/")})}},t=s=>(S("data-v-0a791ae3"),s=s(),w(),s),E={class:"welcome bouncy centred-column"},N={key:0,class:"first centred-column"},O=t(()=>e("p",null,"Welcome to",-1)),B=t(()=>e("h1",null,"reAudioPlayer ONE",-1)),V=[O,B],Y={key:1,class:"first centred-column"},P=t(()=>e("p",null,"The free audio player with the most extensive catalogue",-1)),D=t(()=>e("h1",null,"ARE YOU READY?",-1)),L=[P,D],U={key:2,class:"first centred-column"},W=t(()=>e("h1",null,"Almost There",-1)),j=t(()=>e("p",null,"After a few configurations you're ready to go",-1)),F=[W,j],H={key:3,class:"permanent centred-column"},J=t(()=>e("h1",null,"Pick a Theme",-1)),M=t(()=>e("p",null,"You'll be able to change the theme at any point later on",-1)),z=t(()=>e("br",null,null,-1)),G={class:"centred-column appear-delayed"},q={key:4,class:"permanent centred-column"},K=t(()=>e("h1",null,"Let's integrate Spotify then!",-1)),Q=t(()=>e("p",null,"You'll be able to change the tokens at any point later on",-1)),X=t(()=>e("br",null,null,-1)),Z={class:"centred-column appear-delayed"},$=p("1) Head over to the "),ee=t(()=>e("p",null,"2) Create An App",-1)),te=t(()=>e("p",null,"3) Enter any name and any description",-1)),se=t(()=>e("p",null,[p("4) Edit the settings: set the redirect url to "),e("a",{href:"http://reap.ml/"},"http://reap.ml/")],-1)),oe=t(()=>e("p",null,"5) Copy and enter the client id and secret into the corresponding input field",-1)),ne=t(()=>e("br",null,null,-1)),ie={class:"wrapTogether"},le=t(()=>e("p",null,"Client ID: ",-1)),de={class:"wrapTogether"},re=t(()=>e("p",null,"Client Secret: ",-1)),ce={class:"wrapTogether spaceBetween"},ae={key:5,class:"centred-column"},he=t(()=>e("h1",null,"ALRIGHT!",-1)),_e=t(()=>e("p",null,"You're ready to go",-1)),pe=[he,_e];function ue(s,o,u,m,n,l){const c=k("theme-small");return i(),d("div",E,[n.mode==0?(i(),d("div",N,V)):n.mode==1?(i(),d("div",Y,L)):n.mode==2?(i(),d("div",U,F)):n.mode==3?(i(),d("div",H,[J,M,z,e("div",G,[(i(),d("div",{class:"themes",key:n.themeSelected},[(i(!0),d(v,null,g(n.themes,(r,f)=>(i(),C(c,{onSelected:l.updateThemes,key:f,name:r},null,8,["onSelected","name"]))),128))]))])])):n.mode==4?(i(),d("div",q,[K,Q,X,e("div",Z,[e("p",null,[$,e("a",{onClick:o[0]||(o[0]=()=>l.redirect("https://developer.spotify.com/dashboard/applications"))},"spotify developer dashboard")]),ee,te,se,oe,ne,e("div",ie,[le,a(e("input",{type:"text","onUpdate:modelValue":o[1]||(o[1]=r=>n.spotifyClientId=r)},null,512),[[h,n.spotifyClientId]])]),e("div",de,[re,a(e("input",{type:"text","onUpdate:modelValue":o[2]||(o[2]=r=>n.spotifyClientSecret=r)},null,512),[[h,n.spotifyClientSecret]])]),e("div",ce,[e("button",{onClick:o[3]||(o[3]=(...r)=>l.finalRedirect&&l.finalRedirect(...r))},"continue"),e("button",{onClick:o[4]||(o[4]=(...r)=>l.finalRedirectRestricted&&l.finalRedirectRestricted(...r)),class:"restrictedMode"},"enter restricted mode")])])])):n.mode==5?(i(),d("div",ae,pe)):T("",!0)])}var fe=_(A,[["render",ue],["__scopeId","data-v-0a791ae3"]]);export{fe as default};
