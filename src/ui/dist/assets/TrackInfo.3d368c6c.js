import{m as c,o as s,c as r,a as e,F as o,i as l,t as a,_ as d}from"./index.458fd4ed.js";const _={class:"padding-20 playlisteditor"},u=["src"],p={class:"details"},m={class:"detailswrapper"},y=["onClick"],k=c({__name:"TrackInfo",props:{title:{type:String,required:!0},subtitle:{type:String,required:!0},cover:{type:String,required:!0},icons:{type:Array,required:!0}},setup(t){return(v,g)=>(s(),r("div",_,[e("img",{src:t.cover,class:"cover"},null,8,u),e("div",p,[e("div",m,[(s(!0),r(o,null,l(t.icons,(n,i)=>(s(),r("span",{key:i,class:"material-icons-round",onClick:n.onClick},a(n.name),9,y))),128))]),e("h1",null,a(t.title),1),e("h6",null,a(t.subtitle),1)])]))}});const f=d(k,[["__scopeId","data-v-eab2eaeb"]]);export{f as T};
