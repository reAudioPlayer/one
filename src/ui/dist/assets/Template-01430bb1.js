import{i as S,q as y,o,f as c,a,A as r,t as B,L as T,c as f,r as q,d as i,Z as j,m as D,n as L,_ as M}from"./index-84a1fb6c.js";import{I as h}from"./IconButton-f2c30e74.js";const N=s=>(D("data-v-faea87bd"),s=s(),L(),s),O={class:"header bg-secondary rounded-t-2xl p-3"},V={class:"title font-black"},$=N(()=>a("span",{class:"title material-icons-round"}," close ",-1)),A=[$],E={key:1},Z={key:2,class:"p-4 pt-0 flex flex-col overflow-x-hidden overflow-y-auto"},z={key:0,class:"confirm"},F=S({__name:"Template",props:{name:{type:String,required:!0},submit:{type:Object,required:!1},secondary:{type:Object,required:!1,default:null}},emits:["submit","close","secondary"],setup(s,{expose:w,emit:x}){const e=s,d=y(!1),n=y(!1),v=y(""),_=()=>n.value=!1,b=()=>{d.value=!1,n.value=!0},k=()=>{d.value=!0,n.value=!0},C=async(m,t)=>{k();const l=await window.fetch(m,t);return b(),l.ok?l:(v.value=await l.text(),null)},u=x,p=()=>{_(),u("close")},g=()=>{u("submit"),p()},I=()=>{u("secondary"),p()};return w({show:b,hide:_,load:k,fetch:C}),(m,t)=>n.value?(o(),c(j,{key:0,to:"#popup-target"},[a("div",{class:"modal",onClick:t[1]||(t[1]=r(l=>n.value=!1,["stop"])),onContextmenu:t[2]||(t[2]=r(()=>{},["stop"])),onDrag:t[3]||(t[3]=r(()=>{},["stop"]))},[a("div",{class:"modal-content",onClick:t[0]||(t[0]=r(()=>{},["stop"]))},[a("div",O,[a("h3",V,B(s.name),1),a("button",{class:"modal-close",onClick:p},A)]),d.value?(o(),c(T,{key:0})):v.value?(o(),f("div",E)):(o(),f("div",Z,[q(m.$slots,"default",{},void 0,!0),e.submit||e.secondary?(o(),f("div",z,[e.secondary?(o(),c(h,{key:0,icon:e.secondary.icon,label:e.secondary.label,type:e.secondary.type,onClick:I},null,8,["icon","label","type"])):i("",!0),e.submit?(o(),c(h,{key:1,icon:e.submit.icon,label:e.submit.label,type:e.submit.type,onClick:g},null,8,["icon","label","type"])):i("",!0)])):i("",!0)]))])],32)])):i("",!0)}});const J=M(F,[["__scopeId","data-v-faea87bd"]]);export{J as T};
