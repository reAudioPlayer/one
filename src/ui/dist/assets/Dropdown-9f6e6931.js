import{l as g,m as p,y as m,z as k,o as l,c as n,a as d,t as r,d as _,u as x,D as b,L as v,F as B,h as D,R as V,_ as C}from"./index-2f307979.js";const S={class:"dropdown"},L={class:"flex flex-row gap-2"},q={key:0,class:"material-symbols-rounded ms-wght-200"},z={class:"material-symbols-rounded"},E=["onClick"],F={class:"material-symbols-rounded"},N={key:0,class:"material-symbols-rounded"},R=g({__name:"Dropdown",props:{modelValue:{type:String,required:!0},options:{type:Array,required:!0},icon:{type:String,required:!1}},emits:["update:modelValue"],setup(c,{emit:w}){const i=c,u=p(i.modelValue),s=p(!1);m(i,e=>{u.value=e.modelValue},{deep:!0});const y=e=>{u.value=e,w("update:modelValue",e),s.value=!1},f=k(()=>{const e=i.options.find(o=>o.value==u.value);return e?e.label:""}),a=p(null);return m(s,e=>{V(()=>{if(e){const o=a.value.getBoundingClientRect();window.innerHeight-o.top>o.height?(a.value.style.top="100%",a.value.style.bottom="auto"):(a.value.style.top="auto",a.value.style.bottom="100%")}})}),window.addEventListener("click",()=>{s.value=!1}),(e,o)=>(l(),n("div",S,[d("div",{class:b([{expanded:s.value},"dropdown__selected"]),onClick:o[0]||(o[0]=v(t=>s.value=!s.value,["stop"]))},[d("div",L,[c.icon?(l(),n("span",q,r(c.icon),1)):_("",!0),d("span",null,r(x(f)),1)]),d("i",z,r(s.value?"expand_less":"expand_more"),1)],2),s.value?(l(),n("div",{key:0,ref_key:"trueDropdown",ref:a,class:"dropdown__options"},[(l(!0),n(B,null,D(c.options,t=>(l(),n("div",{key:t.value,class:"dropdown__option",onClick:v(h=>y(t.value),["stop"])},[d("span",F,r(t.icon),1),d("span",null,r(t.label),1),u.value==t.value?(l(),n("span",N,"check")):_("",!0)],8,E))),128))],512)):_("",!0)]))}});const A=C(R,[["__scopeId","data-v-a013f094"]]);export{A as D};