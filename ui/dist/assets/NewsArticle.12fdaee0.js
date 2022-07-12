import{L as m}from"./Loader.d00d9bd5.js";import{_ as d,o as s,c as i,a as r,i as l,t as n,g as v,j as c,n as y,b as _}from"./index.efc4c7de.js";const g={name:"Error",props:{msg:String},methods:{toggleSidebar(){this.$emit("toggleSidebar")}}},w={class:"error"},L=["innerHTML"];function k(t,o,a,u,e,h){return s(),i("div",w,[r("h1",{innerHTML:a.msg},null,8,L)])}var T=d(g,[["render",k],["__scopeId","data-v-7ba05e07"]]);const x={name:"NewsArticle",components:{Loader:m,Error:T},data(){return{error:"",article:{},fullWidth:!1}},methods:{updateData(){fetch(`/api/news/articles/${this.$route.params.url}`).then(async t=>{if(t.status==404){this.error="This wouldn't have happened if you had clicked on the links we provided!<br>\u30FD(\u0CA0_\u0CA0)\u30CE",setTimeout(this.updateData,1e3);return}if(t.status==400){window.open(await t.text()),this.$router.push("/news");return}if(t.status==200){if(this.article=await t.json(),this.article.headline==="N/A"){window.open(this.article.href),this.$router.push("/news");return}return}this.error=t.statusText})}},mounted(){this.updateData()}},b={key:2,class:"padding-20 newsArticle"},H=["innerHTML"],M={class:"headline"},N=["innerHTML"],E={key:0,class:"date"},A=["href"],W={key:1},B=["innerHTML"];function C(t,o,a,u,e,h){const p=_("Error"),f=_("Loader");return e.error?(s(),l(p,{key:0,msg:e.error},null,8,["msg"])):e.article.headline?(s(),i("div",b,[r("span",{onClick:o[0]||(o[0]=D=>e.fullWidth=!e.fullWidth),class:"toggleWidth material-icons-round"},n(e.fullWidth?"close_fullscreen":"open_in_full"),1),r("div",{class:y(["wrapper",{slim:!e.fullWidth}])},[r("h5",{class:"accentLink topic",innerHTML:e.article.topic},null,8,H),r("h1",M,n(e.article.headline),1),r("h4",{class:"standfirst",innerHTML:e.article.standfirst},null,8,N),e.article.date?(s(),i("h5",E,[v(n(e.article.date)+", ",1),r("a",{href:e.article.href},n(e.article.href),9,A)])):c("",!0),e.article.body?(s(),i("hr",W)):c("",!0),r("div",{class:"body",innerHTML:e.article.body},null,8,B)],2)])):(s(),l(f,{key:1}))}var j=d(x,[["render",C],["__scopeId","data-v-0dee3cc0"]]);export{j as default};
