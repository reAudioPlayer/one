import{_ as d,o as c,c as n,k as p,l as h,a as e,e as u,t as m,g as f}from"./index.137aa168.js";const y={name:"GridHeader"},t=s=>(p("data-v-165e0554"),s=s(),h(),s),$={class:"gridHeader"},v=t(()=>e("span",{class:"id"},"#",-1)),x=t(()=>e("span",{class:"title"},"Title",-1)),g=t(()=>e("span",{class:"album"},"Album",-1)),b=t(()=>e("span",null,null,-1)),H=t(()=>e("span",{class:"clock material-symbols-rounded"},"schedule",-1)),k=[v,x,g,b,H];function I(s,a,o,_,i,l){return c(),n("div",$,k)}const P=d(y,[["render",I],["__scopeId","data-v-165e0554"]]);const S={name:"FixedPlaylistHeader",components:{GridHeader:P},props:{title:String}},F={class:"fixedPlaylistHeader"},G={class:"upperWrapper"},B={class:"font-bold"};function C(s,a,o,_,i,l){const r=u("grid-header");return c(),n("div",F,[e("div",G,[e("span",{id:"loadPlaylist",onClick:a[0]||(a[0]=M=>this.$emit("loadPlaylist")),class:"material-symbols-rounded hideIfMobile"},"play_circle"),e("h3",B,m(o.title),1)]),f(r,{class:"padding-20 darkback hideIfMobile"})])}const V=d(S,[["render",C],["__scopeId","data-v-2ffcc213"]]);export{V as F,P as G};
