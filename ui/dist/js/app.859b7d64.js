(function(t){function e(e){for(var i,o,l=e[0],r=e[1],s=e[2],d=0,b=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&b.push(c[o][0]),c[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);u&&u(e);while(b.length)b.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,l=1;l<n.length;l++){var r=n[l];0!==c[r]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},c={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=e,l=l.slice();for(var s=0;s<l.length;s++)e(l[s]);var u=r;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("c275")},"03a4":function(t,e,n){"use strict";n("6f76")},"045d":function(t,e,n){},"0a93":function(t,e,n){},"0aaf":function(t,e,n){},"0f93":function(t,e,n){"use strict";n("9420")},"149e":function(t,e,n){"use strict";n("8853")},"15e1":function(t,e,n){"use strict";n("5805")},1683:function(t,e,n){"use strict";n("0aaf")},1980:function(t,e,n){},"1b93":function(t,e,n){"use strict";n("32c9")},2875:function(t,e,n){"use strict";n("7d60")},"32c9":function(t,e,n){},"36de":function(t,e,n){"use strict";n("1980")},"420a":function(t,e,n){},"466a":function(t,e,n){"use strict";n("420a")},"4b5e":function(t,e,n){},5717:function(t,e,n){"use strict";n("4b5e")},5805:function(t,e,n){},"5d5b":function(t,e,n){"use strict";n("0a93")},"6f76":function(t,e,n){},"7d60":function(t,e,n){},"819a":function(t,e,n){},8435:function(t,e,n){"use strict";n("a90a")},8853:function(t,e,n){},"8e7f":function(t,e,n){"use strict";n("045d")},9116:function(t,e,n){"use strict";n("819a")},9420:function(t,e,n){},a90a:function(t,e,n){},b896:function(t,e,n){},c15e:function(t,e,n){"use strict";n("b896")},c275:function(t,e,n){"use strict";n.r(e);var i=n("69be"),c={class:"appRoot"},a={class:"interface"};function o(t,e,n,o,l,r){var s=Object(i["I"])("Sidebar"),u=Object(i["I"])("Body"),d=Object(i["I"])("Player");return Object(i["A"])(),Object(i["h"])("div",c,[Object(i["i"])("div",a,[Object(i["l"])(s),Object(i["l"])(u)]),Object(i["l"])(d)])}var l={class:"body"};function r(t,e,n,c,a,o){var r=Object(i["I"])("router-view");return Object(i["A"])(),Object(i["h"])("div",l,[Object(i["l"])(r)])}var s={name:"Body"},u=(n("2875"),n("1c27")),d=n.n(u);const b=d()(s,[["render",r],["__scopeId","data-v-26006ec5"]]);var f=b,p=function(t){return Object(i["D"])("data-v-6de997ac"),t=t(),Object(i["B"])(),t},h={class:"player"},O={class:"left"},j=["src"],v={class:"titleartist"},m={class:"title"},y={class:"artist"},g={class:"centre"},k={class:"upper"},S=p((function(){return Object(i["i"])("span",{class:"material-icons-round defaultbtn"},"shuffle",-1)})),x=p((function(){return Object(i["i"])("span",{class:"material-icons-round defaultbtn"},"repeat",-1)})),_={class:"lower"},P={class:"positionLabel"},w={class:"positionLabel"},N={class:"right"},A=p((function(){return Object(i["i"])("span",{class:"material-icons-round defaultbtn"},"volume_up",-1)}));function C(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",h,[Object(i["i"])("div",O,[Object(i["i"])("img",{src:a.cover},null,8,j),Object(i["i"])("div",v,[Object(i["i"])("span",m,Object(i["N"])(a.title),1),Object(i["i"])("span",y,Object(i["N"])(a.artist),1)]),Object(i["i"])("span",{onClick:e[0]||(e[0]=function(t){return a.favourited=!a.favourited}),class:"favourite material-icons-round"},Object(i["N"])(a.favourited?"favorite":"favorite_border"),1)]),Object(i["i"])("div",g,[Object(i["i"])("div",k,[S,Object(i["i"])("span",{onClick:e[1]||(e[1]=function(t){return o.get("last")}),class:"material-icons-round defaultbtn"},"skip_previous"),Object(i["i"])("span",{onClick:e[2]||(e[2]=function(t){return o.get("playPause")}),class:"material-icons-round circle"},Object(i["N"])(a.playing?"pause_circle":"play_circle"),1),Object(i["i"])("span",{onClick:e[3]||(e[3]=function(t){return o.get("next")}),class:"material-icons-round defaultbtn"},"skip_next"),x]),Object(i["i"])("div",_,[Object(i["i"])("span",P,Object(i["N"])(a.progresslbl),1),Object(i["U"])(Object(i["i"])("input",{"onUpdate:modelValue":e[4]||(e[4]=function(t){return a.progress=t}),max:"1000",type:"range",class:"progress"},null,512),[[i["Q"],a.progress]]),Object(i["i"])("span",w,Object(i["N"])(a.durationStr),1)])]),Object(i["i"])("div",N,[A,Object(i["i"])("input",{onChange:e[5]||(e[5]=function(){return o.volumechange&&o.volumechange.apply(o,arguments)}),ref:"volume",type:"range",class:"volume"},null,544)])])}n("c7c6"),n("dfac"),n("07e6"),n("e932"),n("500c"),n("3efd"),n("f258");var I={name:"Player",props:{favourite:{type:Boolean,default:!1}},data:function(){var t=this;function e(){console.log("attempting reconnect");var n=new WebSocket("ws://localhost:1234/ws");n.onclose=function(){console.log("ws closed"),setTimeout(e,1e3)},n.onopen=function(){console.log("ws connected")},n.onmessage=function(e){var n=JSON.parse(e.data);t.updateData(n)}}e();var n=function(t,e){return String(t).padStart(e,"0")};return setInterval((function(){if(t.playing){var e=60*Number(t.durationStr.split(":")[0])+Number(t.durationStr.split(":")[1]),i=60*Number(t.progresslbl.split(":")[0])+Number(t.progresslbl.split(":")[1]);i+=1,t.progress=i/e*1e3,t.progresslbl="".concat(Math.floor(i/60),":").concat(n(i%60,2))}}),1e3),{favourited:this.favourite,title:"N/A",artist:"N/A",durationStr:"0:00",cover:"/assets/img/music_placeholder.png",playing:!1,progress:0,progresslbl:"0:00"}},methods:{get:function(t){fetch("http://localhost:1234/api/".concat(t))},volumechange:function(){fetch("http://localhost:1234/api/setVolume",{method:"POST",body:JSON.stringify({value:this.$refs.volume.value})})},updateData:function(t){var e,n,i,c;if("player.song"==t.path)return this.title=(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.title)||"N/A",this.artist=(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.artist)||"N/A",this.durationStr=(null===t||void 0===t||null===(i=t.data)||void 0===i?void 0:i.duration)||"N/A",this.cover=(null===t||void 0===t||null===(c=t.data)||void 0===c?void 0:c.cover)||"/assets/img/music_placeholder.png",void(this.progresslbl="0:00");"player.playState"==t.path&&(this.playing=(null===t||void 0===t?void 0:t.data)||!1)}}};n("8435");const T=d()(I,[["render",C],["__scopeId","data-v-6de997ac"]]);var M=T,$=(n("a15b"),function(t){return Object(i["D"])("data-v-51f3f4a2"),t=t(),Object(i["B"])(),t}),H={class:"sidebar"},D=$((function(){return Object(i["i"])("h2",null,"reAudioPlayer Online",-1)})),U=$((function(){return Object(i["i"])("br",null,null,-1)})),V=$((function(){return Object(i["i"])("br",null,null,-1)})),B=$((function(){return Object(i["i"])("hr",null,null,-1)})),J={class:"playlistList"};function E(t,e,n,c,a,o){var l=Object(i["I"])("nav-entry"),r=Object(i["I"])("router-link");return Object(i["A"])(),Object(i["h"])("div",H,[D,U,Object(i["l"])(l,{href:"/",icon:"home",name:"Home"}),Object(i["l"])(l,{href:"/search",icon:"search",name:"Search"}),Object(i["l"])(l,{href:"/collection/playlists",icon:"library_music",name:"Your Library"}),V,Object(i["l"])(l,{href:"/playlist/create",icon:"add_circle",name:"Create Playlist"}),Object(i["l"])(l,{href:"/collection/tracks",icon:"favorite",name:"Liked Songs"}),B,Object(i["i"])("div",J,[(Object(i["A"])(!0),Object(i["h"])(i["a"],null,Object(i["G"])(a.playlists,(function(t,e){return Object(i["A"])(),Object(i["f"])(r,{key:e,to:t.href},{default:Object(i["T"])((function(){return[Object(i["k"])(Object(i["N"])(t.name),1)]})),_:2},1032,["to"])})),128))])])}var L={class:"navEntry"},F={class:"material-icons-round icon"},G={class:"name"};function R(t,e,n,c,a,o){var l=Object(i["I"])("router-link");return Object(i["A"])(),Object(i["f"])(l,{class:"link",to:n.href},{default:Object(i["T"])((function(){return[Object(i["i"])("div",L,[Object(i["i"])("span",F,Object(i["N"])(n.icon),1),Object(i["i"])("span",G,Object(i["N"])(n.name),1)])]})),_:1},8,["to"])}var Q={name:"NavEntry",props:{icon:String,name:String,href:String}};n("1b93");const Y=d()(Q,[["render",R],["__scopeId","data-v-293d8dd9"]]);var q=Y,W={name:"Sidebar",components:{NavEntry:q},data:function(){var t=this;return fetch("http://localhost:1234/api/playlists").then((function(t){return t.json()})).then((function(e){for(var n=0;n<e.length;n++)t.playlists.push({name:e[n],href:"/playlist/".concat(n)})})),{playlists:[]}}};n("c15e");const X=d()(W,[["render",E],["__scopeId","data-v-51f3f4a2"]]);var z=X,K=(n("1a57"),{name:"App",components:{Sidebar:z,Body:f,Player:M}});n("5717"),n("0f93");const Z=d()(K,[["render",o]]);var tt=Z,et=n("50c9"),nt=n("5e83"),it=n("5211"),ct={class:"home"};function at(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",ct," Home ")}var ot={name:"Home"};const lt=d()(ot,[["render",at]]);var rt=lt,st=function(t){return Object(i["D"])("data-v-2ab252cb"),t=t(),Object(i["B"])(),t},ut={class:"playlist"},dt=Object(i["k"])("Playlist"),bt=st((function(){return Object(i["i"])("hr",null,null,-1)})),ft={class:"padding-20"},pt={class:"grid"},ht=st((function(){return Object(i["i"])("hr",null,null,-1)})),Ot={class:"playlistEntries"};function jt(t,e,n,c,a,o){var l=Object(i["I"])("AddSong"),r=Object(i["I"])("EditPlaylist"),s=Object(i["I"])("fixed-playlist-header"),u=Object(i["I"])("h7"),d=Object(i["I"])("grid-header"),b=Object(i["I"])("playlist-entry"),f=Object(i["J"])("observe-visibility");return Object(i["A"])(),Object(i["h"])("div",ut,[Object(i["l"])(l,{ref:"addSongPopup"},null,512),Object(i["l"])(r,{playlistName:a.playlistName,playlistDescription:a.playlistDescription,ref:"editPlaylistPopup"},null,8,["playlistName","playlistDescription"]),Object(i["l"])(s,{onClick:o.loadPlaylist,ref:"fixedHeading",class:Object(i["u"])({hidden:a.fixedHeaderHidden}),title:a.playlistName},null,8,["onClick","class","title"]),Object(i["U"])((Object(i["A"])(),Object(i["h"])("div",{class:"padding-20 playlisteditor",onClick:e[0]||(e[0]=function(){return o.editPlaylist&&o.editPlaylist.apply(o,arguments)})},[Object(i["l"])(u,null,{default:Object(i["T"])((function(){return[dt]})),_:1}),Object(i["i"])("h1",null,Object(i["N"])(a.playlistName),1),Object(i["i"])("h5",null,Object(i["N"])(a.playlistDescription),1)])),[[f,o.headerVisibilityChanged]]),bt,Object(i["i"])("div",ft,[Object(i["i"])("span",{id:"loadPlaylist",onClick:e[1]||(e[1]=function(){return o.loadPlaylist&&o.loadPlaylist.apply(o,arguments)}),class:"material-icons-outlined"},"play_circle_filled"),Object(i["i"])("span",{id:"addToPlaylist",onClick:e[2]||(e[2]=function(){return o.addToPlaylist&&o.addToPlaylist.apply(o,arguments)}),class:"material-icons-outlined"},"add_circle"),Object(i["i"])("div",pt,[Object(i["l"])(d),ht,Object(i["i"])("div",Ot,[(Object(i["A"])(!0),Object(i["h"])(i["a"],null,Object(i["G"])(a.playlist,(function(t,e){return Object(i["A"])(),Object(i["f"])(b,{key:e,index:e,id:t.id,title:t.title,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","id","title","album","artist","cover","favourite","duration"])})),128))])])])])}var vt={class:"fixedPlaylistHeader"},mt={class:"upperWrapper"};function yt(t,e,n,c,a,o){var l=this,r=Object(i["I"])("grid-header");return Object(i["A"])(),Object(i["h"])("div",vt,[Object(i["i"])("div",mt,[Object(i["i"])("span",{id:"loadPlaylist",onClick:e[0]||(e[0]=function(t){return l.$emit("click")}),class:"material-icons-outlined"},"play_circle_filled"),Object(i["i"])("h3",null,Object(i["N"])(n.title),1)]),Object(i["l"])(r,{class:"padding-20"})])}var gt=function(t){return Object(i["D"])("data-v-e629699e"),t=t(),Object(i["B"])(),t},kt={class:"gridHeader"},St=gt((function(){return Object(i["i"])("span",{class:"id"},"#",-1)})),xt=gt((function(){return Object(i["i"])("span",{class:"title"},"Title",-1)})),_t=gt((function(){return Object(i["i"])("span",{class:"album"},"Album",-1)})),Pt=gt((function(){return Object(i["i"])("span",{class:"clock material-icons-round"},"schedule",-1)})),wt=[St,xt,_t,Pt];function Nt(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",kt,wt)}var At={name:"GridHeader"};n("466a");const Ct=d()(At,[["render",Nt],["__scopeId","data-v-e629699e"]]);var It=Ct,Tt={name:"FixedPlaylistHeader",components:{GridHeader:It},props:{title:String}};n("8e7f");const Mt=d()(Tt,[["render",yt],["__scopeId","data-v-2c045561"]]);var $t=Mt,Ht={class:"track"},Dt=["src"],Ut={class:"trackwrapper"},Vt={class:"title"},Bt={class:"artist"},Jt={class:"album"},Et={class:"duration"};function Lt(t,e,n,c,a,o){var l=Object(i["I"])("SongCtx");return Object(i["A"])(),Object(i["f"])(l,{onLike:e[7]||(e[7]=function(t){return a.favourited=!a.favourited}),liked:a.favourited,ref:"ctxMenu"},{default:Object(i["T"])((function(){return[Object(i["i"])("div",{onDblclick:e[3]||(e[3]=function(){o.playAt(),o.onselect()}),onClick:e[4]||(e[4]=function(){return o.onselect&&o.onselect.apply(o,arguments)}),onMouseover:e[5]||(e[5]=function(){return o.displayPlay&&o.displayPlay.apply(o,arguments)}),onMouseleave:e[6]||(e[6]=function(){return o.displayId&&o.displayId.apply(o,arguments)}),class:Object(i["u"])(["playlistEntry",{selected:a.highlighted}])},[Object(i["i"])("span",{onClick:e[0]||(e[0]=function(){return o.playAt&&o.playAt.apply(o,arguments)}),ref:"idOrPlay",class:"id"},Object(i["N"])(n.index+1),513),Object(i["i"])("div",Ht,[Object(i["i"])("img",{src:n.cover||"/assets/img/music_placeholder.png"},null,8,Dt),Object(i["i"])("div",Ut,[Object(i["i"])("span",Vt,Object(i["N"])(n.title),1),Object(i["i"])("span",Bt,Object(i["N"])(n.artist),1)])]),Object(i["i"])("span",Jt,Object(i["N"])(n.album),1),Object(i["i"])("span",{onClick:e[1]||(e[1]=function(t){return a.favourited=!a.favourited}),class:Object(i["u"])(["favourite material-icons-round",{showfavourite:a.favourited||a.highlighted}])},Object(i["N"])(a.favourited?"favorite":"favorite_border"),3),Object(i["i"])("span",Et,Object(i["N"])(n.duration),1),Object(i["i"])("span",{onClick:e[2]||(e[2]=function(){return o.showCtxMenu&&o.showCtxMenu.apply(o,arguments)}),class:Object(i["u"])(["more material-icons-round",{hidden:!a.highlighted}])},"more_horiz",2)],34)]})),_:1},8,["liked"])}var Ft={ref:"box"},Gt=Object(i["k"])("Remove from this playlist"),Rt=Object(i["k"])("Add to playlist"),Qt=Object(i["k"])("Share");function Yt(t,e,n,c,a,o){var l=Object(i["I"])("v-contextmenu-item"),r=Object(i["I"])("v-contextmenu-divider"),s=Object(i["I"])("v-contextmenu"),u=Object(i["J"])("contextmenu");return Object(i["U"])((Object(i["A"])(),Object(i["h"])("div",Ft,[Object(i["H"])(t.$slots,"default"),Object(i["l"])(s,{ref:"contextmenu"},{default:Object(i["T"])((function(){return[Object(i["l"])(l,{onClick:o.like},{default:Object(i["T"])((function(){return[Object(i["k"])(Object(i["N"])((n.liked?"Remove from":"Save to")+" your Liked Songs"),1)]})),_:1},8,["onClick"]),Object(i["l"])(l,{onClick:o.remove},{default:Object(i["T"])((function(){return[Gt]})),_:1},8,["onClick"]),Object(i["l"])(l,{onClick:o.addto},{default:Object(i["T"])((function(){return[Rt]})),_:1},8,["onClick"]),Object(i["l"])(r),Object(i["l"])(l,{onClick:o.share},{default:Object(i["T"])((function(){return[Qt]})),_:1},8,["onClick"])]})),_:1},512)])),[[u,void 0,"contextmenu"]])}var qt={name:"SongCtx",props:{artist:String,title:String,liked:Boolean},methods:{hide:function(){this.$refs.contextmenu.hide()},show:function(t){var e=this.$refs.box.getBoundingClientRect(),n={top:e.height+e.top+window.scrollY,left:e.width+e.left+window.scrollX};this.$refs.contextmenu.show(n),null===t||void 0===t||t.stopPropagation()},like:function(){this.$emit("like")},remove:function(){this.$emit("remove")},addto:function(){this.$emit("addto")},share:function(){this.$emit("share")}}};const Wt=d()(qt,[["render",Yt]]);var Xt=Wt,zt={name:"PlaylistEntry",components:{SongCtx:Xt},props:{index:Number,id:Number,artist:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},title:{type:String,default:"N/A"},album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1}},data:function(){return{highlighted:!1,favourited:this.favourite}},methods:{hideCtxMenu:function(){this.$refs.ctxMenu.hide()},showCtxMenu:function(t){console.log("show"),this.$refs.ctxMenu.show(t)},onselect:function(){this.highlighted=!this.highlighted,this.hideCtxMenu()},displayPlay:function(){var t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId:function(){var t=this.$refs.idOrPlay;t.innerHTML=this.index+1,t.classList.remove("material-icons-round")},playAt:function(){fetch("http://localhost:1234/api/at",{method:"POST",body:JSON.stringify({index:this.index})})},setFavourite:function(){fetch("http://localhost:1234/api/updateSong",{method:"POST",body:JSON.stringify({id:this.id,favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover})})}},watch:{favourited:function(){this.setFavourite()},favourite:function(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}};n("15e1");const Kt=d()(zt,[["render",Lt],["__scopeId","data-v-cd35468c"]]);var Zt=Kt,te=function(t){return Object(i["D"])("data-v-76cc2ae8"),t=t(),Object(i["B"])(),t},ee={class:"wrapper"},ne={class:"header"},ie=te((function(){return Object(i["i"])("h3",null,"Add song",-1)})),ce=te((function(){return Object(i["i"])("span",{class:"material-icons-round"}," close ",-1)})),ae=[ce],oe=te((function(){return Object(i["i"])("h4",null,"Source",-1)})),le={class:"content"},re=te((function(){return Object(i["i"])("h4",null,"Title",-1)})),se={class:"content"},ue=te((function(){return Object(i["i"])("h4",null,"Album",-1)})),de={class:"content"},be={type:"text",ref:"album"},fe=te((function(){return Object(i["i"])("h4",null,"Artist",-1)})),pe={class:"content"},he=te((function(){return Object(i["i"])("h4",null,"Cover",-1)})),Oe={class:"content"},je=["src"],ve={class:"confirm"};function me(t,e,n,c,a,o){var l=Object(i["I"])("FindSources"),r=Object(i["I"])("vue-final-modal");return Object(i["A"])(),Object(i["h"])("div",null,[Object(i["l"])(r,{onClick:o.hideFindSourcesCtx,modelValue:a.showModal,"onUpdate:modelValue":e[8]||(e[8]=function(t){return a.showModal=t}),classes:"modal-container","content-class":"modal-content"},{default:Object(i["T"])((function(){return[Object(i["i"])("div",ee,[Object(i["i"])("div",ne,[ie,Object(i["i"])("button",{class:"modal-close",onClick:e[0]||(e[0]=function(t){return a.showModal=!1})},ae)]),oe,Object(i["l"])(l,{ref:"findSources",title:a.title,artist:a.artist},{default:Object(i["T"])((function(){return[Object(i["i"])("div",le,[Object(i["i"])("input",{onChange:e[1]||(e[1]=function(){return o.loadMetadata&&o.loadMetadata.apply(o,arguments)}),type:"text",ref:"source"},null,544),Object(i["i"])("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[2]||(e[2]=function(){return o.opencontextmenu&&o.opencontextmenu.apply(o,arguments)})},"more_vert",512)])]})),_:1},8,["title","artist"]),re,Object(i["i"])("div",se,[Object(i["U"])(Object(i["i"])("input",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return a.title=t}),type:"text"},null,512),[[i["Q"],a.title]])]),ue,Object(i["i"])("div",de,[Object(i["i"])("input",be,null,512)]),fe,Object(i["i"])("div",pe,[Object(i["U"])(Object(i["i"])("input",{"onUpdate:modelValue":e[4]||(e[4]=function(t){return a.artist=t}),type:"text"},null,512),[[i["Q"],a.artist]])]),he,Object(i["i"])("div",Oe,[Object(i["U"])(Object(i["i"])("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[5]||(e[5]=function(t){return a.cover=t}),ref:"cover"},null,512),[[i["Q"],a.cover]]),Object(i["i"])("img",{onClick:e[6]||(e[6]=function(){return o.openInNewTab&&o.openInNewTab.apply(o,arguments)}),class:"addSong cover",src:a.cover?a.cover:"/assets/img/music_placeholder.png"},null,8,je)]),Object(i["i"])("div",ve,[Object(i["i"])("button",{onClick:e[7]||(e[7]=function(){return o.add&&o.add.apply(o,arguments)}),class:"negative"},"Add")])])]})),_:1},8,["onClick","modelValue"])])}n("ed98");var ye={ref:"box"},ge=Object(i["k"])("Soundcloud"),ke=Object(i["k"])("Audius"),Se=Object(i["k"])("Youtube Music"),xe=Object(i["k"])("Spotify");function _e(t,e,n,c,a,o){var l=Object(i["I"])("v-contextmenu-item"),r=Object(i["I"])("v-contextmenu-submenu"),s=Object(i["I"])("v-contextmenu"),u=Object(i["J"])("contextmenu");return Object(i["U"])((Object(i["A"])(),Object(i["h"])("div",ye,[Object(i["H"])(t.$slots,"default"),Object(i["l"])(s,{ref:"contextmenu"},{default:Object(i["T"])((function(){return[Object(i["l"])(r,{title:"Search on"},{default:Object(i["T"])((function(){return[Object(i["l"])(l,{onClick:o.openSoundcloud},{default:Object(i["T"])((function(){return[ge]})),_:1},8,["onClick"]),Object(i["l"])(l,{onClick:o.openAudius},{default:Object(i["T"])((function(){return[ke]})),_:1},8,["onClick"]),Object(i["l"])(l,{onClick:o.openYoutubeMusic},{default:Object(i["T"])((function(){return[Se]})),_:1},8,["onClick"]),Object(i["l"])(l,{onClick:o.openSpotify},{default:Object(i["T"])((function(){return[xe]})),_:1},8,["onClick"])]})),_:1})]})),_:1},512)])),[[u,void 0,"contextmenu"]])}var Pe={name:"FindSources",props:{artist:String,title:String},methods:{hide:function(){this.$refs.contextmenu.hide()},show:function(t){var e=this.$refs.box.getBoundingClientRect(),n={top:e.height+e.top+window.scrollY,left:e.width+e.left+window.scrollX};this.$refs.contextmenu.show(n),null===t||void 0===t||t.stopPropagation()},openSoundcloud:function(){window.open("https://soundcloud.com/search?q=".concat(this.artist," ").concat(this.title))},openAudius:function(){window.open("https://audius.co/search/".concat(this.artist," ").concat(this.title))},openYoutubeMusic:function(){window.open("https://music.youtube.com/search?q=".concat(this.artist," ").concat(this.title))},openSpotify:function(){window.open("https://open.spotify.com/search/".concat(this.artist," ").concat(this.title))}}};const we=d()(Pe,[["render",_e]]);var Ne=we,Ae={name:"AddSong",components:{FindSources:Ne},data:function(){return{showModal:!1,cover:"",artist:"",title:""}},methods:{opencontextmenu:function(t){this.$refs.findSources.show(t)},hideFindSourcesCtx:function(){this.$refs.findSources.hide()},add:function(){console.log("fetch"),fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),source:this.$refs.source.value,title:this.title,artist:this.artist,album:this.$refs.album.value,cover:this.cover})}).then((function(t){return console.log(t)})),this.showModal=!1},loadMetadata:function(){var t=this;fetch("http://localhost:1234/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then((function(t){return t.json()})).then((function(e){console.log(e),t.title=e.title,t.$refs.album.value=e.album,t.artist=e.artists.join(", "),t.cover=e.cover,t.$refs.source.value=e.src}))},openInNewTab:function(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}}};n("5d5b"),n("9116");const Ce=d()(Ae,[["render",me],["__scopeId","data-v-76cc2ae8"]]);var Ie=Ce,Te=(n("4228"),n("526b"),function(t){return Object(i["D"])("data-v-332ce0d8"),t=t(),Object(i["B"])(),t}),Me={class:"wrapper"},$e={class:"header"},He=Te((function(){return Object(i["i"])("h3",null,"Edit details",-1)})),De=Te((function(){return Object(i["i"])("span",{class:"material-icons-round"}," close ",-1)})),Ue=[De],Ve=Te((function(){return Object(i["i"])("h4",null,"Name",-1)})),Be={class:"content"},Je=Te((function(){return Object(i["i"])("h4",null,"Description",-1)})),Ee={class:"content"},Le={class:"confirm"};function Fe(t,e,n,c,a,o){var l=Object(i["I"])("vue-final-modal");return Object(i["A"])(),Object(i["h"])("div",null,[Object(i["l"])(l,{modelValue:a.showModal,"onUpdate:modelValue":e[4]||(e[4]=function(t){return a.showModal=t}),classes:"modal-container","content-class":"modal-content"},{default:Object(i["T"])((function(){return[Object(i["i"])("div",Me,[Object(i["i"])("div",$e,[He,Object(i["i"])("button",{class:"modal-close",onClick:e[0]||(e[0]=function(t){return a.showModal=!1})},Ue)]),Ve,Object(i["i"])("div",Be,[Object(i["U"])(Object(i["i"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return a.name=t}),type:"text",ref:"name"},null,512),[[i["Q"],a.name]])]),Je,Object(i["i"])("div",Ee,[Object(i["U"])(Object(i["i"])("input",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return a.description=t}),type:"text",ref:"description"},null,512),[[i["Q"],a.description]])]),Object(i["i"])("div",Le,[Object(i["i"])("button",{onClick:e[3]||(e[3]=function(){return o.apply&&o.apply.apply(o,arguments)}),class:"negative"},"Save")])])]})),_:1},8,["modelValue"])])}var Ge={name:"EditPlaylist",props:{playlistName:String,playlistDescription:String},data:function(){return{showModal:!1,cover:"",name:this.playlistName,description:this.playlistDescription}},methods:{apply:function(){this.showModal=!1}},watch:{playlistName:function(){this.name=this.playlistName},playlistDescription:function(){this.description=this.playlistDescription}}};n("1683"),n("36de");const Re=d()(Ge,[["render",Fe],["__scopeId","data-v-332ce0d8"]]);var Qe=Re,Ye={components:{PlaylistEntry:Zt,FixedPlaylistHeader:$t,GridHeader:It,AddSong:Ie,EditPlaylist:Qe},name:"Playlist",data:function(){return this.updatePlaylist(),{fixedHeaderHidden:!1,playlist:[],playlistName:"N/A",playlistDescription:"My Description"}},methods:{headerVisibilityChanged:function(t){this.fixedHeaderHidden=t},addToPlaylist:function(){this.$refs.addSongPopup.showModal=!0},editPlaylist:function(){this.$refs.editPlaylistPopup.showModal=!0},updatePlaylist:function(){var t=this;"create"!=this.$route.params.id?fetch("http://localhost:1234/api/playlist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})}).then((function(t){return t.json()})).then((function(e){t.playlist=e.songs,t.playlistName=e.name,console.log(t.playlist)})):fetch("http://localhost:1234/api/playlist/create").then((function(t){return t.text()})).then((function(e){console.log(e),t.$router.push(e)}))},loadPlaylist:function(){fetch("http://localhost:1234/api/loadPlaylist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})})}},watch:{$route:function(){this.updatePlaylist()}}};n("149e");const qe=d()(Ye,[["render",jt],["__scopeId","data-v-2ab252cb"]]);var We=qe,Xe={class:"search"};function ze(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",Xe," Search ")}var Ke={name:"Search"};const Ze=d()(Ke,[["render",ze]]);var tn=Ze,en={class:"albums"};function nn(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",en," Albums ")}var cn={name:"Albums"};const an=d()(cn,[["render",nn]]);var on=an,ln={class:"artists"};function rn(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",ln," Home ")}var sn={name:"artists"};const un=d()(sn,[["render",rn]]);var dn=un,bn={class:"playlists"};function fn(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",bn," Playlists ")}var pn={name:"Playlists"};const hn=d()(pn,[["render",fn]]);var On=hn,jn={class:"releases"};function vn(t,e,n,c,a,o){return Object(i["A"])(),Object(i["h"])("div",jn," Releases ")}var mn={name:"Releases"};const yn=d()(mn,[["render",vn]]);var gn=yn,kn=function(t){return Object(i["D"])("data-v-c6efa536"),t=t(),Object(i["B"])(),t},Sn={class:"playlist"},xn={class:"padding-20"},_n=Object(i["k"])("Playlist"),Pn=kn((function(){return Object(i["i"])("h5",null,"My Description",-1)})),wn=kn((function(){return Object(i["i"])("hr",null,null,-1)})),Nn={class:"padding-20"},An={class:"grid"},Cn=kn((function(){return Object(i["i"])("hr",null,null,-1)})),In={class:"playlistEntries"};function Tn(t,e,n,c,a,o){var l=Object(i["I"])("AddSong"),r=Object(i["I"])("fixed-playlist-header"),s=Object(i["I"])("h7"),u=Object(i["I"])("grid-header"),d=Object(i["I"])("playlist-entry"),b=Object(i["J"])("observe-visibility");return Object(i["A"])(),Object(i["h"])("div",Sn,[Object(i["l"])(l,{ref:"addSongPopup"},null,512),Object(i["l"])(r,{onClick:t.loadPlaylist,ref:"fixedHeading",class:Object(i["u"])({hidden:a.fixedHeaderHidden}),title:a.playlistName},null,8,["onClick","class","title"]),Object(i["U"])((Object(i["A"])(),Object(i["h"])("div",xn,[Object(i["l"])(s,null,{default:Object(i["T"])((function(){return[_n]})),_:1}),Object(i["i"])("h1",null,Object(i["N"])(a.playlistName),1),Pn])),[[b,o.headerVisibilityChanged]]),wn,Object(i["i"])("div",Nn,[Object(i["i"])("span",{id:"loadPlaylist",onClick:e[0]||(e[0]=function(){return t.loadPlaylist&&t.loadPlaylist.apply(t,arguments)}),class:"material-icons-outlined"},"play_circle_filled"),Object(i["i"])("div",An,[Object(i["l"])(u),Cn,Object(i["i"])("div",In,[(Object(i["A"])(!0),Object(i["h"])(i["a"],null,Object(i["G"])(a.playlist,(function(t,e){return Object(i["A"])(),Object(i["f"])(d,{key:e,index:e,id:t.id,title:t.title,album:t.album,artist:t.artist,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["index","id","title","album","artist","cover","favourite","duration"])})),128))])])])])}var Mn={components:{PlaylistEntry:Zt,FixedPlaylistHeader:$t,GridHeader:It,AddSong:Ie},name:"Tracks",data:function(){return this.updateTracks(),{fixedHeaderHidden:!1,playlist:[],playlistName:"N/A"}},methods:{headerVisibilityChanged:function(t){this.fixedHeaderHidden=t},updateTracks:function(){var t=this;fetch("http://localhost:1234/api/collection/tracks").then((function(t){return t.json()})).then((function(e){t.playlist=e.songs,t.playlistName=e.name,console.log(t.playlist)}))}}};n("03a4");const $n=d()(Mn,[["render",Tn],["__scopeId","data-v-c6efa536"]]);var Hn=$n,Dn=n("6831"),Un=Object(i["e"])(tt);Un.directive("observe-visibility",{beforeMount:function(t,e,n){n.context=e.instance,et["a"].bind(t,e,n)},updated:et["a"].update,unmounted:et["a"].unbind}),Un.use(Object(nt["a"])()),Un.use(Dn["a"]);var Vn=[{path:"/",component:rt},{path:"/search",component:tn},{path:"/collection/albums",component:on},{path:"/collection/artists",component:dn},{path:"/collection/playlists",component:On},{path:"/collection/releases",component:gn},{path:"/collection/tracks",component:Hn},{path:"/playlist/:id",component:We}],Bn=Object(it["a"])({history:Object(it["b"])(),routes:Vn});Un.use(Bn),Un.mount("#app")}});
//# sourceMappingURL=app.859b7d64.js.map