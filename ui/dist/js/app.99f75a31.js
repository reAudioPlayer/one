(function(t){function e(e){for(var a,i,l=e[0],s=e[1],o=e[2],u=0,b=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&b.push(c[i][0]),c[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(b.length)b.shift()();return r.push.apply(r,o||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,l=1;l<n.length;l++){var s=n[l];0!==c[s]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},c={app:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var o=0;o<l.length;o++)e(l[o]);var d=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("c275")},1169:function(t,e,n){},"1b93":function(t,e,n){"use strict";n("32c9")},2875:function(t,e,n){"use strict";n("7d60")},"2cc2":function(t,e,n){"use strict";n("754d")},"32c9":function(t,e,n){},"3c9f":function(t,e,n){"use strict";n("67ea")},"4b1b":function(t,e,n){},"67ea":function(t,e,n){},"6ae5":function(t,e,n){"use strict";n("a1d1")},"73da":function(t,e,n){},"754d":function(t,e,n){},"7d60":function(t,e,n){},"9f1c":function(t,e,n){"use strict";n("ff9f")},a1d1:function(t,e,n){},a4fe:function(t,e,n){},c275:function(t,e,n){"use strict";n.r(e);var a=n("69be"),c={class:"appRoot"},r={class:"interface"};function i(t,e,n,i,l,s){var o=Object(a["G"])("Sidebar"),d=Object(a["G"])("Body"),u=Object(a["G"])("Player");return Object(a["y"])(),Object(a["g"])("div",c,[Object(a["h"])("div",r,[Object(a["l"])(o),Object(a["l"])(d)]),Object(a["l"])(u)])}var l={class:"body"};function s(t,e,n,c,r,i){var s=Object(a["G"])("router-view");return Object(a["y"])(),Object(a["g"])("div",l,[Object(a["l"])(s)])}var o={name:"Body"},d=(n("2875"),n("1c27")),u=n.n(d);const b=u()(o,[["render",s],["__scopeId","data-v-26006ec5"]]);var p=b,f=function(t){return Object(a["B"])("data-v-23261155"),t=t(),Object(a["z"])(),t},h={class:"player"},O=Object(a["j"])('<div class="left" data-v-23261155><img src="/assets/img/music_placeholder.png" data-v-23261155><div class="titleartist" data-v-23261155><span class="title" data-v-23261155>N/A</span><span class="artist" data-v-23261155>N/A</span></div></div>',1),j={class:"centre"},y={class:"upper"},v=f((function(){return Object(a["h"])("span",{class:"material-icons-round defaultbtn"},"shuffle",-1)})),m=f((function(){return Object(a["h"])("span",{class:"material-icons-round defaultbtn"},"repeat",-1)})),g=f((function(){return Object(a["h"])("div",{class:"lower"},[Object(a["h"])("span",{class:"positionLabel"},"0:00"),Object(a["h"])("input",{type:"range",class:"progress"}),Object(a["h"])("span",{class:"positionLabel"},"-3:00")],-1)})),P=f((function(){return Object(a["h"])("div",{class:"right"},[Object(a["h"])("span",{class:"material-icons-round defaultbtn"},"volume_up"),Object(a["h"])("input",{type:"range",class:"volume"})],-1)}));function _(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",h,[O,Object(a["h"])("div",j,[Object(a["h"])("div",y,[v,Object(a["h"])("span",{onClick:e[0]||(e[0]=function(t){return i.get("last")}),class:"material-icons-round defaultbtn"},"skip_previous"),Object(a["h"])("span",{onClick:e[1]||(e[1]=function(t){return i.get("playPause")}),class:"material-icons-round circle"},"play_circle"),Object(a["h"])("span",{onClick:e[2]||(e[2]=function(t){return i.get("next")}),class:"material-icons-round defaultbtn"},"skip_next"),m]),g]),P])}n("3efd");var k={name:"Player",methods:{get:function(t){fetch("http://localhost:1234/api/".concat(t))}}};n("6ae5");const S=u()(k,[["render",_],["__scopeId","data-v-23261155"]]);var w=S,H=(n("a15b"),function(t){return Object(a["B"])("data-v-051dd71b"),t=t(),Object(a["z"])(),t}),A={class:"sidebar"},N=H((function(){return Object(a["h"])("h2",null,"reAudioPlayer Online",-1)})),x=H((function(){return Object(a["h"])("br",null,null,-1)})),L=H((function(){return Object(a["h"])("br",null,null,-1)})),G=H((function(){return Object(a["h"])("hr",null,null,-1)})),M={class:"playlistList"};function C(t,e,n,c,r,i){var l=Object(a["G"])("nav-entry"),s=Object(a["G"])("router-link");return Object(a["y"])(),Object(a["g"])("div",A,[N,x,Object(a["l"])(l,{href:"/",icon:"home",name:"Home"}),Object(a["l"])(l,{href:"/search",icon:"search",name:"Search"}),Object(a["l"])(l,{href:"/collection/playlists",icon:"library_music",name:"Your Library"}),L,Object(a["l"])(l,{href:"/playlist/create",icon:"add_circle",name:"Create Playlist"}),Object(a["l"])(l,{href:"/collection/tracks",icon:"favorite",name:"Liked Songs"}),G,Object(a["h"])("div",M,[(Object(a["y"])(!0),Object(a["g"])(a["a"],null,Object(a["E"])(r.playlists,(function(t,e){return Object(a["y"])(),Object(a["e"])(s,{key:e,to:t.href},{default:Object(a["Q"])((function(){return[Object(a["k"])(Object(a["L"])(t.name),1)]})),_:2},1032,["to"])})),128))])])}var T={class:"navEntry"},I={class:"material-icons-round icon"},E={class:"name"};function $(t,e,n,c,r,i){var l=Object(a["G"])("router-link");return Object(a["y"])(),Object(a["e"])(l,{class:"link",to:n.href},{default:Object(a["Q"])((function(){return[Object(a["h"])("div",T,[Object(a["h"])("span",I,Object(a["L"])(n.icon),1),Object(a["h"])("span",E,Object(a["L"])(n.name),1)])]})),_:1},8,["to"])}var B={name:"NavEntry",props:{icon:String,name:String,href:String}};n("1b93");const J=u()(B,[["render",$],["__scopeId","data-v-293d8dd9"]]);var V=J,z={name:"Sidebar",components:{NavEntry:V},data:function(){var t=this;return fetch("http://localhost:1234/api/playlists").then((function(t){return t.json()})).then((function(e){for(var n=0;n<e.length;n++)t.playlists.push({name:e[n],href:"/playlist/".concat(n)})})),{playlists:[]}}};n("3c9f");const Q=u()(z,[["render",C],["__scopeId","data-v-051dd71b"]]);var R=Q,D={name:"App",components:{Sidebar:R,Body:p,Player:w}};n("2cc2");const F=u()(D,[["render",i]]);var U=F,W=n("50c9"),Y=n("5e83"),q=n("5211"),K={class:"home"};function X(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",K," Home ")}var Z={name:"Home"};const tt=u()(Z,[["render",X]]);var et=tt,nt=function(t){return Object(a["B"])("data-v-8b12962a"),t=t(),Object(a["z"])(),t},at={class:"playlist"},ct={class:"padding-20"},rt=Object(a["k"])("Playlist"),it=nt((function(){return Object(a["h"])("h5",null,"My Description",-1)})),lt=nt((function(){return Object(a["h"])("hr",null,null,-1)})),st={class:"padding-20"},ot={class:"grid"},dt=nt((function(){return Object(a["h"])("hr",null,null,-1)})),ut={class:"playlistEntries"};function bt(t,e,n,c,r,i){var l=Object(a["G"])("AddSong"),s=Object(a["G"])("fixed-playlist-header"),o=Object(a["G"])("h7"),d=Object(a["G"])("grid-header"),u=Object(a["G"])("playlist-entry"),b=Object(a["H"])("observe-visibility");return Object(a["y"])(),Object(a["g"])("div",at,[Object(a["l"])(l,{ref:"addSongPopup"},null,512),Object(a["l"])(s,{onClick:i.loadPlaylist,ref:"fixedHeading",class:Object(a["s"])({hidden:r.fixedHeaderHidden}),title:r.playlistName},null,8,["onClick","class","title"]),Object(a["R"])((Object(a["y"])(),Object(a["g"])("div",ct,[Object(a["l"])(o,null,{default:Object(a["Q"])((function(){return[rt]})),_:1}),Object(a["h"])("h1",null,Object(a["L"])(r.playlistName),1),it])),[[b,i.headerVisibilityChanged]]),lt,Object(a["h"])("div",st,[Object(a["h"])("span",{id:"loadPlaylist",onClick:e[0]||(e[0]=function(){return i.loadPlaylist&&i.loadPlaylist.apply(i,arguments)}),class:"material-icons-outlined"},"play_circle_filled"),Object(a["h"])("span",{id:"addToPlaylist",onClick:e[1]||(e[1]=function(){return i.addToPlaylist&&i.addToPlaylist.apply(i,arguments)}),class:"material-icons-outlined"},"add_circle"),Object(a["h"])("div",ot,[Object(a["l"])(d),dt,Object(a["h"])("div",ut,[(Object(a["y"])(!0),Object(a["g"])(a["a"],null,Object(a["E"])(r.playlist,(function(t,e){return Object(a["y"])(),Object(a["e"])(u,{key:e,id:e,title:t.title,album:t.album,artist:t.artist,cover:t.cover},null,8,["id","title","album","artist","cover"])})),128))])])])])}n("f258"),n("dfac");var pt={class:"fixedPlaylistHeader"},ft={class:"upperWrapper"};function ht(t,e,n,c,r,i){var l=this,s=Object(a["G"])("grid-header");return Object(a["y"])(),Object(a["g"])("div",pt,[Object(a["h"])("div",ft,[Object(a["h"])("span",{id:"loadPlaylist",onClick:e[0]||(e[0]=function(t){return l.$emit("click")}),class:"material-icons-outlined"},"play_circle_filled"),Object(a["h"])("h3",null,Object(a["L"])(n.title),1)]),Object(a["l"])(s,{class:"padding-20"})])}var Ot=function(t){return Object(a["B"])("data-v-cafd1246"),t=t(),Object(a["z"])(),t},jt={class:"gridHeader"},yt=Ot((function(){return Object(a["h"])("span",{class:"id"},"#",-1)})),vt=Ot((function(){return Object(a["h"])("span",{class:"title"},"Title",-1)})),mt=Ot((function(){return Object(a["h"])("span",{class:"album"},"Album",-1)})),gt=[yt,vt,mt];function Pt(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",jt,gt)}var _t={name:"GridHeader"};n("fc72");const kt=u()(_t,[["render",Pt],["__scopeId","data-v-cafd1246"]]);var St=kt,wt={name:"FixedPlaylistHeader",components:{GridHeader:St},props:{title:String}};n("d1c7");const Ht=u()(wt,[["render",ht],["__scopeId","data-v-de1340fa"]]);var At=Ht,Nt={class:"track"},xt=["src"],Lt={class:"trackwrapper"},Gt={class:"title"},Mt={class:"artist"},Ct={class:"album"};function Tt(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",{onDblclick:e[1]||(e[1]=function(){i.playAt(),i.onselect()}),onClick:e[2]||(e[2]=function(){return i.onselect&&i.onselect.apply(i,arguments)}),onMouseover:e[3]||(e[3]=function(){return i.displayPlay&&i.displayPlay.apply(i,arguments)}),onMouseleave:e[4]||(e[4]=function(){return i.displayId&&i.displayId.apply(i,arguments)}),class:Object(a["s"])(["playlistEntry",{selected:r.highlighted}])},[Object(a["h"])("span",{onClick:e[0]||(e[0]=function(){return i.playAt&&i.playAt.apply(i,arguments)}),ref:"idOrPlay",class:"id"},Object(a["L"])(n.id+1),513),Object(a["h"])("div",Nt,[Object(a["h"])("img",{src:n.cover},null,8,xt),Object(a["h"])("div",Lt,[Object(a["h"])("span",Gt,Object(a["L"])(n.title),1),Object(a["h"])("span",Mt,Object(a["L"])(n.artist),1)])]),Object(a["h"])("span",Ct,Object(a["L"])(n.album),1)],34)}var It={name:"PlaylistEntry",props:{id:Number,artist:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},title:{type:String,default:"N/A"},album:{type:String,default:"N/A"}},data:function(){return{highlighted:!1}},methods:{onselect:function(){this.highlighted=!this.highlighted},displayPlay:function(){var t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId:function(){var t=this.$refs.idOrPlay;t.innerHTML=this.id,t.classList.remove("material-icons-round")},playAt:function(){fetch("http://localhost:1234/api/at",{method:"POST",body:JSON.stringify({index:this.id})})}}};n("e1ff");const Et=u()(It,[["render",Tt],["__scopeId","data-v-aebab660"]]);var $t=Et,Bt={class:"wrapper"},Jt={class:"header"},Vt=Object(a["h"])("h3",null,"Add Song",-1),zt=Object(a["h"])("span",{class:"material-icons-round"}," close ",-1),Qt=[zt],Rt={class:"content"},Dt={type:"text",ref:"input"},Ft={class:"confirm"};function Ut(t,e,n,c,r,i){var l=Object(a["G"])("vue-final-modal");return Object(a["y"])(),Object(a["g"])("div",null,[Object(a["l"])(l,{modelValue:r.showModal,"onUpdate:modelValue":e[2]||(e[2]=function(t){return r.showModal=t}),classes:"modal-container","content-class":"modal-content"},{default:Object(a["Q"])((function(){return[Object(a["h"])("div",Bt,[Object(a["h"])("div",Jt,[Vt,Object(a["h"])("button",{class:"modal-close",onClick:e[0]||(e[0]=function(t){return r.showModal=!1})},Qt)]),Object(a["h"])("div",Rt,[Object(a["h"])("input",Dt,null,512)]),Object(a["h"])("div",Ft,[Object(a["h"])("button",{onClick:e[1]||(e[1]=function(){return i.add&&i.add.apply(i,arguments)}),class:"negative"},"Add")])])]})),_:1},8,["modelValue"])])}var Wt={name:"AddSong",data:function(){return{showModal:!1}},methods:{add:function(){console.log("fetch"),fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),link:this.$refs.input.value})}).then((function(t){return console.log(t)})),this.showModal=!1}}};n("9f1c");const Yt=u()(Wt,[["render",Ut]]);var qt=Yt,Kt={components:{PlaylistEntry:$t,FixedPlaylistHeader:At,GridHeader:St,AddSong:qt},name:"Playlist",data:function(){return this.updatePlaylist(),{fixedHeaderHidden:!1,playlist:[],playlistName:"N/A"}},methods:{headerVisibilityChanged:function(t){this.fixedHeaderHidden=t},addToPlaylist:function(){this.$refs.addSongPopup.showModal=!0},updatePlaylist:function(){var t=this;fetch("http://localhost:1234/api/playlist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})}).then((function(t){return t.json()})).then((function(e){t.playlist=e.songs,t.playlistName=e.name,console.log(t.playlist)}))},loadPlaylist:function(){fetch("http://localhost:1234/api/loadPlaylist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})})}},watch:{$route:function(){this.updatePlaylist()}}};n("d8ec");const Xt=u()(Kt,[["render",bt],["__scopeId","data-v-8b12962a"]]);var Zt=Xt,te={class:"search"};function ee(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",te," Search ")}var ne={name:"Search"};const ae=u()(ne,[["render",ee]]);var ce=ae,re={class:"albums"};function ie(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",re," Albums ")}var le={name:"Albums"};const se=u()(le,[["render",ie]]);var oe=se,de={class:"artists"};function ue(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",de," Home ")}var be={name:"artists"};const pe=u()(be,[["render",ue]]);var fe=pe,he={class:"playlists"};function Oe(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",he," Playlists ")}var je={name:"Playlists"};const ye=u()(je,[["render",Oe]]);var ve=ye,me={class:"releases"};function ge(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",me," Releases ")}var Pe={name:"Releases"};const _e=u()(Pe,[["render",ge]]);var ke=_e,Se={class:"tracks"};function we(t,e,n,c,r,i){return Object(a["y"])(),Object(a["g"])("div",Se," Tracks ")}var He={name:"Tracks"};const Ae=u()(He,[["render",we]]);var Ne=Ae,xe=Object(a["d"])(U);xe.directive("observe-visibility",{beforeMount:function(t,e,n){n.context=e.instance,W["a"].bind(t,e,n)},updated:W["a"].update,unmounted:W["a"].unbind}),xe.use(Object(Y["a"])());var Le=[{path:"/",component:et},{path:"/search",component:ce},{path:"/collection/albums",component:oe},{path:"/collection/artists",component:fe},{path:"/collection/playlists",component:ve},{path:"/collection/releases",component:ke},{path:"/collection/tracks",component:Ne},{path:"/playlist/:id",component:Zt}],Ge=Object(q["a"])({history:Object(q["b"])(),routes:Le});xe.use(Ge),xe.mount("#app")},d1c7:function(t,e,n){"use strict";n("73da")},d8ec:function(t,e,n){"use strict";n("a4fe")},e1ff:function(t,e,n){"use strict";n("1169")},fc72:function(t,e,n){"use strict";n("4b1b")},ff9f:function(t,e,n){}});
//# sourceMappingURL=app.99f75a31.js.map