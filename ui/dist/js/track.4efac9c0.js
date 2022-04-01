(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["track"],{1494:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("4228"),n("526b"),n("3efd"),n("5b8c"),n("2670"),n("324c");var a=n("4e3d");function i(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Object(a["a"])(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n["return"]||n["return"]()}finally{if(l)throw o}}}}},"3ae5":function(e,t,n){"use strict";var a=n("69be"),i={class:"track"},r=["src"],o={class:"trackwrapper"},c={class:"title"},l={class:"artist"};function s(e,t,n,s,d,u){var p=Object(a["resolveComponent"])("mini-player");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{onDblclick:t[2]||(t[2]=function(){u.playAt(),u.onselect()}),onClick:t[3]||(t[3]=function(){return u.onselect&&u.onselect.apply(u,arguments)}),onMouseover:t[4]||(t[4]=function(e){return d.hovering=!0}),onMouseleave:t[5]||(t[5]=function(e){return d.hovering=!1}),class:Object(a["normalizeClass"])(["playlistEntry",{selected:d.highlighted}])},[Object(a["createVNode"])(p,{class:Object(a["normalizeClass"])(["miniPlayer",{hidden:!d.hovering}]),src:n.preview},null,8,["class","src"]),d.hovering?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",{key:0,onClick:t[0]||(t[0]=function(){return e.edit&&e.edit.apply(e,arguments)}),class:"id"},Object(a["toDisplayString"])(n.index+1),1)),Object(a["createElementVNode"])("div",i,[Object(a["createElementVNode"])("img",{src:n.cover||"/assets/img/music_placeholder.png"},null,8,r),Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("span",c,Object(a["toDisplayString"])(n.title),1),Object(a["createElementVNode"])("span",l,Object(a["toDisplayString"])(n.artist),1)]),Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("span",{onClick:t[1]||(t[1]=function(){return u.add&&u.add.apply(u,arguments)}),class:"material-icons-round edit",ref:"add"},"add",512)],34)}n("dfac"),n("3efd"),n("f258");var d=n("cb9b"),u={components:{MiniPlayer:d["a"]},name:"SpotifyPlaylistEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,cover:String,album:String,preview:String},data:function(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:"/collection/tracks"==this.$route.path,hovering:!1}},methods:{remove:function(){fetch("http://localhost:1234/api/remove",{method:"POST",body:JSON.stringify({playlistId:Number(this.$route.params.id),songId:this.id})})},onselect:function(){this.highlighted=!this.highlighted},playAt:function(){this.$emit("edit",this.index)},add:function(){console.log("add"),this.$emit("add",this.index)}},watch:{added:function(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},p=(n("577c"),n("1c27")),f=n.n(p);const y=f()(u,[["render",s],["__scopeId","data-v-4d350ce2"]]);t["a"]=y},"44bd":function(e,t,n){"use strict";n("a95c")},"577c":function(e,t,n){"use strict";n("c326")},"907b":function(e,t,n){"use strict";n.r(t);n("867d"),n("ed98");var a=n("69be"),i=function(e){return Object(a["pushScopeId"])("data-v-53e843e2"),e=e(),Object(a["popScopeId"])(),e},r={class:"playlist"},o=["src"],c={class:"details"},l=Object(a["createTextVNode"])("Song"),s=i((function(){return Object(a["createElementVNode"])("hr",null,null,-1)})),d={class:"padding-20"},u={class:"grid"},p=i((function(){return Object(a["createElementVNode"])("hr",null,null,-1)})),f={class:"playlistEntries"};function y(e,t,n,i,y,b){var h=Object(a["resolveComponent"])("fixed-playlist-header"),m=Object(a["resolveComponent"])("h7"),v=Object(a["resolveComponent"])("grid-header"),O=Object(a["resolveComponent"])("spotify-playlist-entry"),g=Object(a["resolveComponent"])("draggable"),j=Object(a["resolveDirective"])("observe-visibility");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",r,[Object(a["createVNode"])(h,{onLoadPlaylist:b.loadPlaylist,ref:"fixedHeading",class:Object(a["normalizeClass"])({hidden:y.fixedHeaderHidden}),title:e.playlistName},null,8,["onLoadPlaylist","class","title"]),Object(a["withDirectives"])((Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{class:"padding-20 songdetails",onClick:t[0]||(t[0]=function(){return b.editPlaylist&&b.editPlaylist.apply(b,arguments)})},[Object(a["createElementVNode"])("img",{class:"cover",src:y.cover},null,8,o),Object(a["createElementVNode"])("div",c,[Object(a["createVNode"])(m,null,{default:Object(a["withCtx"])((function(){return[l]})),_:1}),Object(a["createElementVNode"])("h1",null,Object(a["toDisplayString"])(y.title),1),Object(a["createElementVNode"])("h5",null,Object(a["toDisplayString"])(y.artist),1)])])),[[j,b.headerVisibilityChanged]]),s,Object(a["createElementVNode"])("div",d,[Object(a["createElementVNode"])("span",{id:"loadPlaylist",onClick:t[1]||(t[1]=function(){return b.loadPlaylist&&b.loadPlaylist.apply(b,arguments)}),class:"material-icons-outlined"},"play_circle_filled"),Object(a["createElementVNode"])("span",{id:"addToPlaylist",onClick:t[2]||(t[2]=function(){return b.addToPlaylist&&b.addToPlaylist.apply(b,arguments)}),class:"material-icons-outlined"},"add_circle"),Object(a["createElementVNode"])("div",u,[Object(a["createElementVNode"])("h2",null,Object(a["toDisplayString"])("Recommendations based on "+y.title),1),Object(a["createVNode"])(v),p,Object(a["createElementVNode"])("div",f,[Object(a["createVNode"])(g,{modelValue:y.recommendations,"onUpdate:modelValue":t[3]||(t[3]=function(e){return y.recommendations=e})},{item:Object(a["withCtx"])((function(e){var t=e.element;return[Object(a["createVNode"])(O,{onRequestUpdate:b.updatePlaylist,index:y.recommendations.findIndex((function(e){return e.src==t.src})),source:t.src,id:t.id,title:t.title,album:t.album,artist:t.artists.join(", "),preview:t.preview,cover:t.cover,favourite:t.favourite,duration:t.duration},null,8,["onRequestUpdate","index","source","id","title","album","artist","preview","cover","favourite","duration"])]})),_:1},8,["modelValue"])])])])])}var b=n("e599"),h=n("afa6"),m=n("1494"),v=(n("a623"),n("89b1"),n("1c6f"),n("3efd"),n("f258"),n("dfac"),n("500c"),n("c988")),O=n("8ed2"),g=n("2e60"),j=n.n(g),N=n("3ae5"),P={components:{FixedPlaylistHeader:v["a"],GridHeader:O["a"],draggable:j.a,SpotifyPlaylistEntry:N["a"]},name:"Track",data:function(){return this.updatePlaylist(),{fixedHeaderHidden:!0,title:"N/A",artist:"N/A",cover:"/assets/img/music_placeholder.png",recommendations:[]}},methods:{onPlaylistRearrange:function(e){e.moved},connect:function(){var e=this;console.log("attempting reconnect");var t=new WebSocket("ws://localhost:1234/ws");t.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},t.onopen=function(){console.log("ws connected")},t.onmessage=function(t){var n=JSON.parse(t.data);e.updateData(n)}},headerVisibilityChanged:function(e){this.fixedHeaderHidden=e},addToPlaylist:function(){this.$refs.addSongPopup.showModal=!0},editPlaylist:function(){this.$refs.editPlaylistPopup.showModal=!0},updateData:function(e){if("player.song"==e.path){var t,n,a=(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.title)||"N/A",i=Object(m["a"])(this.playlist);try{for(i.s();!(n=i.n()).done;){var r=n.value;r.playing=r.title==a}}catch(o){i.e(o)}finally{i.f()}}},updatePlaylist:function(){var e=this;this.$route.params.id&&this.$route.path.includes("/track/")&&fetch("http://localhost:1234/api/track",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id)})}).then(function(){var t=Object(h["a"])(regeneratorRuntime.mark((function t(n){var a,i,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(404!=n.status){t.next=3;break}return e.$router.push("/"),t.abrupt("return");case 3:return t.next=5,n.json();case 5:return i=t.sent,console.log(i),e.title=i.title||"N/A",e.artist=i.artist||"N/A",e.cover=i.cover||"/assets/img/music_placeholder.png",document.title="".concat(e.title," • ").concat(e.artist),e.connect(),t.next=14,fetch("http://localhost:1234/api/spotify/recommend",{method:"POST",body:JSON.stringify({query:"".concat(e.artist," ").concat(e.title)})});case 14:return r=t.sent,t.next=17,r.json();case 17:o=t.sent,(a=e.recommendations).push.apply(a,Object(b["a"])(o));case 19:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},loadPlaylist:function(){fetch("http://localhost:1234/api/loadPlaylist",{method:"POST",body:JSON.stringify({id:Number(this.$route.params.id),type:"track"})})}},watch:{$route:function(){this.updatePlaylist()}}},w=(n("44bd"),n("1c27")),S=n.n(w);const k=S()(P,[["render",y],["__scopeId","data-v-53e843e2"]]);t["default"]=k},a503:function(e,t,n){},a95c:function(e,t,n){},c0b8:function(e,t,n){"use strict";var a=n("117f");e.exports=function(e,t){var n=[][e];return!!n&&a((function(){n.call(null,t||function(){throw 1},1)}))}},c326:function(e,t,n){},cb9b:function(e,t,n){"use strict";var a=n("69be"),i={class:"miniPlayer"},r=["src"];function o(e,t,n,o,c,l){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",i,[Object(a["createElementVNode"])("audio",{src:n.src,ref:"player"},null,8,r),n.display?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",{key:0,onClick:t[0]||(t[0]=function(){return l.playPause&&l.playPause.apply(l,arguments)}),class:"material-icons-round circle"},Object(a["toDisplayString"])(c.playing?"pause":"play_arrow"),1)):Object(a["createCommentVNode"])("",!0)])}n("3efd");var c={name:"MiniPlayer",props:{src:String,display:{type:Boolean,default:!0}},data:function(){return{playing:!1}},methods:{get:function(e){fetch("http://localhost:1234/api/".concat(e))},pause:function(){this.get("pause")},play:function(){this.get("play")},playPause:function(){var e=this;this.$refs.player.onended||(this.$refs.player.onended=function(){e.playing=!1}),window.player=this.$refs.player,this.playing=this.$refs.player.paused,this.$refs.player.paused?(this.pause(),this.$refs.player.play()):this.$refs.player.pause()}}},l=(n("e383"),n("1c27")),s=n.n(l);const d=s()(c,[["render",o],["__scopeId","data-v-ef9941c4"]]);t["a"]=d},e383:function(e,t,n){"use strict";n("a503")},e599:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("73c1");function i(e){if(Array.isArray(e))return Object(a["a"])(e)}n("4228"),n("526b"),n("3efd"),n("5b8c"),n("2670"),n("324c"),n("5eca");function r(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}var o=n("4e3d");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e){return i(e)||r(e)||Object(o["a"])(e)||c()}},ed98:function(e,t,n){"use strict";var a=n("e6df"),i=n("23ae"),r=n("00d8"),o=n("4deb"),c=n("c0b8"),l=i([].join),s=r!=Object,d=c("join",",");a({target:"Array",proto:!0,forced:s||!d},{join:function(e){return l(o(this),void 0===e?",":e)}})}}]);
//# sourceMappingURL=track.4efac9c0.js.map