(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sports"],{"0e37":function(e,t,r){"use strict";var n=r("fcf6"),o=r("edd6"),c=r("23ae"),a=r("9a1e"),i=r("117f"),s=r("572d"),l=r("809c"),u=r("ff59"),d=r("d95e"),f=r("8c1c"),p=r("03b9"),h=r("9be3"),v=r("c30e"),m=r("ab4b"),b=r("4a04"),g=r("9c06"),j=g("replace"),O=Math.max,w=Math.min,y=c([].concat),S=c([].push),E=c("".indexOf),N=c("".slice),T=function(e){return void 0===e?e:String(e)},k=function(){return"$0"==="a".replace(/./,"$0")}(),M=function(){return!!/./[j]&&""===/./[j]("a","$0")}(),x=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));a("replace",(function(e,t,r){var c=M?"$":"$0";return[function(e,r){var n=p(this),c=void 0==e?void 0:v(e,j);return c?o(c,e,n,r):o(t,f(n),e,r)},function(e,o){var a=s(this),i=f(e);if("string"==typeof o&&-1===E(o,c)&&-1===E(o,"$<")){var p=r(t,a,i,o);if(p.done)return p.value}var v=l(o);v||(o=f(o));var g=a.global;if(g){var j=a.unicode;a.lastIndex=0}var k=[];while(1){var M=b(a,i);if(null===M)break;if(S(k,M),!g)break;var x=f(M[0]);""===x&&(a.lastIndex=h(i,d(a.lastIndex),j))}for(var V="",I=0,A=0;A<k.length;A++){M=k[A];for(var B=f(M[0]),D=O(w(u(M.index),i.length),0),$=[],C=1;C<M.length;C++)S($,T(M[C]));var F=M.groups;if(v){var H=y([B],$,D,i);void 0!==F&&S(H,F);var L=f(n(o,void 0,H))}else L=m(B,i,D,$,F,o);D>=I&&(V+=N(i,I,D)+L,I=D+B.length)}return V+N(i,I)}]}),!x||!k||M)},1494:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));r("4228"),r("526b"),r("3efd"),r("5b8c"),r("2670"),r("324c");var n=r("4e3d");function o(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=Object(n["a"])(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var o=0,c=function(){};return{s:c,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==r["return"]||r["return"]()}finally{if(s)throw a}}}}},"20a3":function(e,t,r){"use strict";var n=r("e6df"),o=r("23ae"),c=r("fd04"),a=r("2841"),i=r("da53"),s=r("8c1c"),l=r("117f"),u=r("6f61"),d=r("c0b8"),f=r("4a99"),p=r("ed24"),h=r("fab1"),v=r("b93b"),m=[],b=o(m.sort),g=o(m.push),j=l((function(){m.sort(void 0)})),O=l((function(){m.sort(null)})),w=d("sort"),y=!l((function(){if(h)return h<70;if(!(f&&f>3)){if(p)return!0;if(v)return v<603;var e,t,r,n,o="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(n=0;n<47;n++)m.push({k:t+n,v:r})}for(m.sort((function(e,t){return t.v-e.v})),n=0;n<m.length;n++)t=m[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}})),S=j||!O||!w||!y,E=function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:s(t)>s(r)?1:-1}};n({target:"Array",proto:!0,forced:S},{sort:function(e){void 0!==e&&c(e);var t=a(this);if(y)return void 0===e?b(t):b(t,e);var r,n,o=[],s=i(t);for(n=0;n<s;n++)n in t&&g(o,t[n]);u(o,E(e)),r=o.length,n=0;while(n<r)t[n]=o[n++];while(n<s)delete t[n++];return t}})},2354:function(e,t,r){},"32fa":function(e,t,r){},"338d":function(e,t,r){"use strict";r("32fa")},"3c42":function(e,t,r){},4105:function(e,t,r){"use strict";var n=r("e6df"),o=r("23ae"),c=r("564d").f,a=r("d95e"),i=r("8c1c"),s=r("7558"),l=r("03b9"),u=r("4e93"),d=r("d463"),f=o("".startsWith),p=o("".slice),h=Math.min,v=u("startsWith"),m=!d&&!v&&!!function(){var e=c(String.prototype,"startsWith");return e&&!e.writable}();n({target:"String",proto:!0,forced:!m&&!v},{startsWith:function(e){var t=i(l(this));s(e);var r=a(h(arguments.length>1?arguments[1]:void 0,t.length)),n=i(e);return f?f(t,n,r):p(t,r,r+n.length)===n}})},"41a1":function(e,t,r){},"433a":function(e,t,r){"use strict";r("3c42")},"4a99":function(e,t,r){var n=r("691e"),o=n.match(/firefox\/(\d+)/i);e.exports=!!o&&+o[1]},"58d2":function(e,t,r){},"68e0":function(e,t,r){"use strict";var n=r("69be"),o={class:"shelf"},c={class:"header"},a={key:0,class:"icon material-icons-outlined"},i={class:"items"};function s(e,t,r,s,l,u){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",o,[Object(n["createElementVNode"])("div",c,[Object(n["createElementVNode"])("h2",null,[Object(n["createTextVNode"])(Object(n["toDisplayString"])(r.heading),1),r.icon?(Object(n["openBlock"])(),Object(n["createElementBlock"])("span",a,Object(n["toDisplayString"])(r.icon),1)):Object(n["createCommentVNode"])("",!0)])]),Object(n["createElementVNode"])("div",i,[Object(n["renderSlot"])(e.$slots,"default",{},void 0,!0)])])}var l={name:"FullShelf",props:{heading:String,icon:String}},u=(r("338d"),r("1c27")),d=r.n(u);const f=d()(l,[["render",s],["__scopeId","data-v-1a1df171"]]);t["a"]=f},"6f61":function(e,t,r){var n=r("edaa"),o=Math.floor,c=function(e,t){var r=e.length,s=o(r/2);return r<8?a(e,t):i(e,c(n(e,0,s),t),c(n(e,s),t),t)},a=function(e,t){var r,n,o=e.length,c=1;while(c<o){n=c,r=e[c];while(n&&t(e[n-1],r)>0)e[n]=e[--n];n!==c++&&(e[n]=r)}return e},i=function(e,t,r,n){var o=t.length,c=r.length,a=0,i=0;while(a<o||i<c)e[a+i]=a<o&&i<c?n(t[a],r[i])<=0?t[a++]:r[i++]:a<o?t[a++]:r[i++];return e};e.exports=c},"778e":function(e,t,r){"use strict";r("2354")},8161:function(e,t,r){"use strict";var n=r("e6df"),o=r("dc2f"),c=r("d101"),a=r("ff59"),i=r("da53"),s=r("2841"),l=r("a4e0"),u=r("75db"),d=r("f458"),f=d("splice"),p=o.TypeError,h=Math.max,v=Math.min,m=9007199254740991,b="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f},{splice:function(e,t){var r,n,o,d,f,g,j=s(this),O=i(j),w=c(e,O),y=arguments.length;if(0===y?r=n=0:1===y?(r=0,n=O-w):(r=y-2,n=v(h(a(t),0),O-w)),O+r-n>m)throw p(b);for(o=l(j,n),d=0;d<n;d++)f=w+d,f in j&&u(o,d,j[f]);if(o.length=n,r<n){for(d=w;d<O-n;d++)f=d+n,g=d+r,f in j?j[g]=j[f]:delete j[g];for(d=O;d>O-n+r;d--)delete j[d-1]}else if(r>n)for(d=O-n;d>w;d--)f=d+n-1,g=d+r-1,f in j?j[g]=j[f]:delete j[g];for(d=0;d<r;d++)j[d+w]=arguments[d+2];return j.length=O-n+r,o}})},"867d":function(e,t,r){"use strict";var n=r("e6df"),o=r("fe06").findIndex,c=r("513e"),a="findIndex",i=!0;a in[]&&Array(1)[a]((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{findIndex:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c(a)},aa0e:function(e,t,r){"use strict";r.r(t);r("ed98");var n=r("69be"),o=function(e){return Object(n["pushScopeId"])("data-v-6b2181e4"),e=e(),Object(n["popScopeId"])(),e},c={class:"news"},a=o((function(){return Object(n["createElementVNode"])("div",{class:"padding-20"},[Object(n["createElementVNode"])("h1",null,"Sports")],-1)})),i=o((function(){return Object(n["createElementVNode"])("hr",null,null,-1)})),s={class:"padding-20"},l={class:"small"},u={class:"addWrapper"},d=o((function(){return Object(n["createElementVNode"])("hr",null,null,-1)}));function f(e,t,r,o,f,p){var h=Object(n["resolveComponent"])("football-item"),v=Object(n["resolveComponent"])("full-shelf");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",c,[a,i,Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("p",l,"Supported urls: "+Object(n["toDisplayString"])(f.supportedSources.join("*, ")),1),Object(n["createElementVNode"])("div",u,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{onKeyup:t[0]||(t[0]=function(){return e.enterText&&e.enterText.apply(e,arguments)}),"onUpdate:modelValue":t[1]||(t[1]=function(e){return f.sourceToAdd=e}),type:"text"},null,544),[[n["vModelText"],f.sourceToAdd]]),Object(n["createElementVNode"])("span",{id:"addToPlaylist",onClick:t[2]||(t[2]=function(){return p.tryAddSource&&p.tryAddSource.apply(p,arguments)}),class:"material-icons-outlined"},"add_circle")]),d,(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(f.sports,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(v,{key:e.sport,heading:e.sport,icon:e.icon},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.items,(function(e,r){return Object(n["openBlock"])(),Object(n["createBlock"])(h,{key:e.href,onRemove:function(){return p.removeSource(e.sref,t,r)},competition:e.competition,team1:e.team1,team2:e.team2,result:e.result,date:e.date,href:e.href,oref:e.oref,progress:e.progress},null,8,["onRemove","competition","team1","team2","result","date","href","oref","progress"])})),128))]})),_:2},1032,["heading","icon"])})),128))])])}var p=r("1494"),h=(r("8161"),r("f258"),r("4105"),r("3efd"),r("867d"),r("20a3"),r("07e6"),r("0e37"),r("89b1"),r("1c6f"),r("dfac"),r("e932"),r("500c"),r("68e0")),v={class:"itemBig"},m={class:"wrapper topalign"},b={class:"wrapper"},g=["innerHTML"],j=["innerHTML"],O=["innerHTML"],w={class:"wrapper bottomalign"},y={class:"small"};function S(e,t,r,o,c,a){var i;return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",v,[Object(n["createElementVNode"])("div",{class:"item",onClick:t[1]||(t[1]=function(){return a.redirect&&a.redirect.apply(a,arguments)})},[Object(n["createElementVNode"])("div",m,[Object(n["createElementVNode"])("p",null,Object(n["toDisplayString"])(r.competition),1),Object(n["createElementVNode"])("p",{class:Object(n["normalizeClass"])(["right progress",{accent:null===(i=r.progress)||void 0===i?void 0:i.includes("'")}])},Object(n["toDisplayString"])(r.progress),3)]),Object(n["createElementVNode"])("div",b,[Object(n["createElementVNode"])("p",{innerHTML:r.team1,class:"team"},null,8,g),Object(n["createElementVNode"])("h4",{class:"result",innerHTML:r.result},null,8,j),Object(n["createElementVNode"])("p",{innerHTML:r.team2,class:"team"},null,8,O)]),Object(n["createElementVNode"])("div",w,[Object(n["createElementVNode"])("p",y,Object(n["toDisplayString"])(r.date)+", "+Object(n["toDisplayString"])(r.href),1),Object(n["createElementVNode"])("span",{onClick:t[0]||(t[0]=function(){return a.remove&&a.remove.apply(a,arguments)}),class:"deleteIcon small material-icons-round"},"clear")])])])}var E={name:"FootballItem",methods:{redirect:function(){window.open(this.oref)},remove:function(e){e.stopPropagation(),this.$emit("remove")}},props:{result:String,date:String,competition:String,href:String,oref:String,team1:String,team2:String,progress:String}},N=(r("cfa8"),r("778e"),r("c498"),r("1c27")),T=r.n(N);const k=T()(E,[["render",S],["__scopeId","data-v-babd1c8e"]]);var M=k,x={components:{FullShelf:h["a"],FootballItem:M},name:"Sports",data:function(){return{sports:[],watchMatches:[],sourceToAdd:"",supportedSources:["https://onefootball.com/en/team/","https://onefootball.com/en/match/","https://onefootball.com/en/competition/","https://www.cev.eu/match-centres/","https://championsleague.cev.eu/en/match-centres/","https://www.cev.eu/calendar/"]}},mounted:function(){this.watchMatches=JSON.parse(window.localStorage.getItem("sports.watchMatches"))||[],this.updateMatches()},methods:{removeSource:function(e,t,r){this.watchMatches.splice(this.watchMatches.indexOf(e),1),this.sports[t].items.splice(r,1),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches))},tryAddSource:function(){var e,t=Object(p["a"])(this.supportedSources);try{for(t.s();!(e=t.n()).done;){var r=e.value;if(this.sourceToAdd.startsWith(r))return void this.addSource()}}catch(n){t.e(n)}finally{t.f()}alert("unsupported source")},addSource:function(){this.watchMatches.push(this.sourceToAdd),window.localStorage.setItem("sports.watchMatches",JSON.stringify(this.watchMatches)),this.sourceToAdd=""},updateMatches:function(){var e=this;"/sports"==this.$route.path||"/sports/"==this.$route.path?(fetch("http://localhost:1234/api/match",{method:"POST",body:JSON.stringify({urls:this.watchMatches})}).then((function(e){return e.json()})).then((function(t){e.sports=[];var r,n=Object(p["a"])(t);try{var o=function(){var t=r.value,n=e.sports.findIndex((function(e){return e.sport==t.sport}));n>=0?e.sports[n].items.push(t):e.sports.push({sport:t.sport,icon:t.sportIcon,items:[t]})};for(n.s();!(r=n.n()).done;)o()}catch(s){n.e(s)}finally{n.f()}var c,a=Object(p["a"])(e.sports);try{for(a.s();!(c=a.n()).done;){var i=c.value;i.items.sort((function(e,t){if(e.progress=e.progress.replace("Half time","45'"),t.progress=t.progress.replace("Half time","45'"),(e.progress.includes("Pens")||e.progress.includes("N/A"))&&(e.progress="Full time"),(t.progress.includes("Pens")||t.progress.includes("N/A"))&&(t.progress="Full time"),e.progress.includes("'")&&!t.progress.includes("'"))return-1;if(!e.progress.includes("'")&&t.progress.includes("'"))return 1;if(e.progress.includes("'")&&t.progress.includes("'")){var r=Number(e.progress.replace("'","").replace("+","")),n=Number(t.progress.replace("'","").replace("+",""));return r<n?-1:r==n?0:1}var o=e.date.split(" ")[0],c=t.date.split(" ")[0],a=e.progress.replace("'","").replace("Full time","24:00").replace(" ",""),i=t.progress.replace("'","").replace("Full time","24:00").replace(" ",""),s=new Date,l=new Date;l.setUTCDate(s.getUTCDate()+1);var u=new Date;u.setUTCDate(s.getUTCDate()-1);var d=function(e){return e.toISOString().split("T")[0]};o=o.replace("Today",d(s)).split("/").reverse().join("-"),o=o.replace("Tomorrow",d(l)).split("/").reverse().join("-"),o=o.replace("Yesterday",d(u)).split("/").reverse().join("-"),c=c.replace("Today",d(s)).split("/").reverse().join("-"),c=c.replace("Tomorrow",d(l)).split("/").reverse().join("-"),c=c.replace("Yesterday",d(u)).split("/").reverse().join("-");var f=new Date("".concat(o,"T").concat(a).replace(" ","")),p=new Date("".concat(c,"T").concat(i).replace(" ",""));return f>p?-1:f==p?0:1}))}}catch(s){a.e(s)}finally{a.f()}})),setTimeout(this.updateMatches,45e3)):console.log("not update",this.$route.path)}}};r("433a");const V=T()(x,[["render",f],["__scopeId","data-v-6b2181e4"]]);t["default"]=V},ab4b:function(e,t,r){var n=r("23ae"),o=r("2841"),c=Math.floor,a=n("".charAt),i=n("".replace),s=n("".slice),l=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,u=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,n,d,f){var p=r+e.length,h=n.length,v=u;return void 0!==d&&(d=o(d),v=l),i(f,v,(function(o,i){var l;switch(a(i,0)){case"$":return"$";case"&":return e;case"`":return s(t,0,r);case"'":return s(t,p);case"<":l=d[s(i,1,-1)];break;default:var u=+i;if(0===u)return o;if(u>h){var f=c(u/10);return 0===f?o:f<=h?void 0===n[f-1]?a(i,1):n[f-1]+a(i,1):o}l=n[u-1]}return void 0===l?"":l}))}},b93b:function(e,t,r){var n=r("691e"),o=n.match(/AppleWebKit\/(\d+)\./);e.exports=!!o&&+o[1]},c0b8:function(e,t,r){"use strict";var n=r("117f");e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},c498:function(e,t,r){"use strict";r("58d2")},cfa8:function(e,t,r){"use strict";r("41a1")},ed24:function(e,t,r){var n=r("691e");e.exports=/MSIE|Trident/.test(n)},ed98:function(e,t,r){"use strict";var n=r("e6df"),o=r("23ae"),c=r("00d8"),a=r("4deb"),i=r("c0b8"),s=o([].join),l=c!=Object,u=i("join",",");n({target:"Array",proto:!0,forced:l||!u},{join:function(e){return s(a(this),void 0===e?",":e)}})}}]);
//# sourceMappingURL=sports.db215fa9.js.map