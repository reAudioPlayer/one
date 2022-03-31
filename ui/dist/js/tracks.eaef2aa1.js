(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tracks"],{"093b":function(e,t,i){"use strict";i.r(t);var a=i("69be"),n=function(e){return Object(a["pushScopeId"])("data-v-9670632e"),e=e(),Object(a["popScopeId"])(),e},o={class:"playlist"},l={class:"padding-20"},c=Object(a["createTextVNode"])("Playlist"),r=n((function(){return Object(a["createElementVNode"])("h5",null,"My Description",-1)})),s=n((function(){return Object(a["createElementVNode"])("hr",null,null,-1)})),d={class:"padding-20"},u={class:"grid"},p=n((function(){return Object(a["createElementVNode"])("hr",null,null,-1)})),f={class:"playlistEntries"};function h(e,t,i,n,h,b){var m=Object(a["resolveComponent"])("fixed-playlist-header"),y=Object(a["resolveComponent"])("h7"),v=Object(a["resolveComponent"])("grid-header"),O=Object(a["resolveComponent"])("playlist-entry"),j=Object(a["resolveDirective"])("observe-visibility");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,[Object(a["createVNode"])(m,{onClick:b.loadPlaylist,ref:"fixedHeading",class:Object(a["normalizeClass"])({hidden:h.fixedHeaderHidden}),title:h.playlistName},null,8,["onClick","class","title"]),Object(a["withDirectives"])((Object(a["openBlock"])(),Object(a["createElementBlock"])("div",l,[Object(a["createVNode"])(y,null,{default:Object(a["withCtx"])((function(){return[c]})),_:1}),Object(a["createElementVNode"])("h1",null,Object(a["toDisplayString"])(h.playlistName),1),r])),[[j,b.headerVisibilityChanged]]),s,Object(a["createElementVNode"])("div",d,[Object(a["createElementVNode"])("span",{id:"loadPlaylist",onClick:t[0]||(t[0]=function(){return b.loadPlaylist&&b.loadPlaylist.apply(b,arguments)}),class:"material-icons-outlined"},"play_circle_filled"),Object(a["createElementVNode"])("div",u,[Object(a["createVNode"])(v),p,Object(a["createElementVNode"])("div",f,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(h.playlist,(function(e,t){return Object(a["openBlock"])(),Object(a["createBlock"])(O,{key:t,index:t,source:e.source,id:e.id,title:e.title,playing:e.playing,album:e.album,artist:e.artist,cover:e.cover,favourite:e.favourite,duration:e.duration},null,8,["index","source","id","title","playing","album","artist","cover","favourite","duration"])})),128))])])])])}var b=i("1494"),m=(i("3efd"),i("a15b"),i("f258"),i("c988")),y=i("8ed2"),v=i("dcbb"),O={components:{PlaylistEntry:v["a"],FixedPlaylistHeader:m["a"],GridHeader:y["a"]},name:"Tracks",data:function(){return this.updateTracks(),{fixedHeaderHidden:!0,playlist:[],playlistName:"N/A"}},methods:{connect:function(){var e=this;console.log("attempting reconnect");var t=new WebSocket("ws://localhost:1234/ws");t.onclose=function(){console.log("ws closed"),setTimeout(this.connect,1e3)},t.onopen=function(){console.log("ws connected")},t.onmessage=function(t){var i=JSON.parse(t.data);e.updateData(i)}},updateData:function(e){if("player.song"==e.path){var t,i,a=(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.title)||"N/A",n=Object(b["a"])(this.playlist);try{for(n.s();!(i=n.n()).done;){var o=i.value;o.playing=o.title==a}}catch(l){n.e(l)}finally{n.f()}}},headerVisibilityChanged:function(e){this.fixedHeaderHidden=e},updateTracks:function(){var e=this;fetch("http://localhost:1234/api/collection/tracks").then((function(e){return e.json()})).then((function(t){e.playlist=t.songs,e.playlistName=t.name,console.log(e.playlist),e.connect()}))},loadPlaylist:function(){fetch("http://localhost:1234/api/loadPlaylist",{method:"POST",body:JSON.stringify({type:"collection"})})}}},j=(i("442d"),i("1c27")),g=i.n(j);const N=g()(O,[["render",h],["__scopeId","data-v-9670632e"]]);t["default"]=N},1273:function(e,t,i){"use strict";i("c178")},2554:function(e,t,i){"use strict";i("b899")},"442d":function(e,t,i){"use strict";i("a2ab")},"73aa":function(e,t,i){},"83db":function(e,t,i){"use strict";i("73aa")},"8ed2":function(e,t,i){"use strict";var a=i("69be"),n=function(e){return Object(a["pushScopeId"])("data-v-3db22da6"),e=e(),Object(a["popScopeId"])(),e},o={class:"gridHeader"},l=n((function(){return Object(a["createElementVNode"])("span",{class:"id"},"#",-1)})),c=n((function(){return Object(a["createElementVNode"])("span",{class:"title"},"Title",-1)})),r=n((function(){return Object(a["createElementVNode"])("span",{class:"album"},"Album",-1)})),s=n((function(){return Object(a["createElementVNode"])("span",{class:"clock material-icons-round"},"schedule",-1)})),d=[l,c,r,s];function u(e,t,i,n,l,c){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,d)}var p={name:"GridHeader"},f=(i("83db"),i("1c27")),h=i.n(f);const b=h()(p,[["render",u],["__scopeId","data-v-3db22da6"]]);t["a"]=b},a2ab:function(e,t,i){},b899:function(e,t,i){},c178:function(e,t,i){},c988:function(e,t,i){"use strict";var a=i("69be"),n={class:"fixedPlaylistHeader"},o={class:"upperWrapper"};function l(e,t,i,l,c,r){var s=this,d=Object(a["resolveComponent"])("grid-header");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",n,[Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("span",{id:"loadPlaylist",onClick:t[0]||(t[0]=function(e){return s.$emit("loadPlaylist")}),class:"material-icons-outlined"},"play_circle_filled"),Object(a["createElementVNode"])("h3",null,Object(a["toDisplayString"])(i.title),1)]),Object(a["createVNode"])(d,{class:"padding-20 darkback"})])}var c=i("8ed2"),r={name:"FixedPlaylistHeader",components:{GridHeader:c["a"]},props:{title:String}},s=(i("2554"),i("1c27")),d=i.n(s);const u=d()(r,[["render",l],["__scopeId","data-v-5cba14e9"]]);t["a"]=u},dcbb:function(e,t,i){"use strict";var a=i("69be"),n={class:"track"},o=["src"],l={class:"trackwrapper"},c={class:"duration"};function r(e,t,i,r,s,d){var u=Object(a["resolveComponent"])("EditSong"),p=Object(a["resolveComponent"])("Marquee"),f=Object(a["resolveComponent"])("SongCtx");return Object(a["openBlock"])(),Object(a["createBlock"])(f,{onDownload:d.download,onAddto:d.addToPlaylist,onRemove:d.remove,onUpdate:d.update,onLike:t[7]||(t[7]=function(e){return s.favourited=!s.favourited}),isAutoPlaylist:s.isAutoPlaylist,liked:s.favourited,ref:"ctxMenu"},{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(u,{onClose:e.updatePlaylist,ref:"editSongPopup",cover:i.cover,id:i.id,title:i.title,album:i.album,artist:i.artist,source:i.source},null,8,["onClose","cover","id","title","album","artist","source"]),Object(a["createElementVNode"])("div",{onDblclick:t[3]||(t[3]=function(){d.playAt(),d.onselect()}),onClick:t[4]||(t[4]=function(){return d.onselect&&d.onselect.apply(d,arguments)}),onMouseover:t[5]||(t[5]=function(){return d.displayPlay&&d.displayPlay.apply(d,arguments)}),onMouseleave:t[6]||(t[6]=function(){return d.displayId&&d.displayId.apply(d,arguments)}),class:Object(a["normalizeClass"])(["playlistEntry",{selected:s.highlighted}])},[Object(a["createElementVNode"])("span",{onClick:t[0]||(t[0]=function(){return d.playAt&&d.playAt.apply(d,arguments)}),ref:"idOrPlay",class:Object(a["normalizeClass"])([{playing:i.playing},"id"])},Object(a["toDisplayString"])(i.index+1),3),Object(a["createElementVNode"])("div",n,[Object(a["createElementVNode"])("img",{src:i.cover||"/assets/img/music_placeholder.png"},null,8,o),Object(a["createElementVNode"])("div",l,[Object(a["createElementVNode"])("span",{class:Object(a["normalizeClass"])(["title",{playing:i.playing}])},[Object(a["createVNode"])(p,{text:i.title},null,8,["text"])],2),Object(a["createElementVNode"])("span",{class:Object(a["normalizeClass"])(["artist",{playing:i.playing}])},[Object(a["createVNode"])(p,{text:i.artist},null,8,["text"])],2)])]),Object(a["createElementVNode"])("span",{class:Object(a["normalizeClass"])(["album",{playing:i.playing}])},[Object(a["createVNode"])(p,{text:i.album},null,8,["text"])],2),Object(a["createElementVNode"])("span",{onClick:t[1]||(t[1]=function(e){return s.favourited=!s.favourited}),class:Object(a["normalizeClass"])(["favourite material-icons-round",{showfavourite:s.favourited||s.highlighted}])},Object(a["toDisplayString"])(s.favourited?"favorite":"favorite_border"),3),Object(a["createElementVNode"])("span",c,Object(a["toDisplayString"])(i.duration),1),Object(a["createElementVNode"])("span",{onClick:t[2]||(t[2]=function(){return d.showCtxMenu&&d.showCtxMenu.apply(d,arguments)}),class:Object(a["normalizeClass"])(["more material-icons-round",{hidden:!s.highlighted}])},"more_horiz",2)],34)]})),_:1},8,["onDownload","onAddto","onRemove","onUpdate","isAutoPlaylist","liked"])}i("dfac"),i("3efd"),i("f258"),i("89b1"),i("1c6f");var s=i("a279"),d=i("d0cc"),u=i("5acf"),p={name:"PlaylistEntry",components:{SongCtx:s["a"],EditSong:u["a"],Marquee:d["a"]},props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},title:{type:String,default:"N/A"},album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1},playing:{type:Boolean,default:!1}},data:function(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:"/collection/tracks"==this.$route.path}},methods:{download:function(){this.$emit("download",this.index)},addToPlaylist:function(e){var t=this;fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:e,source:this.source})}).then((function(e){200==e.status&&t.$emit("requestUpdate")}))},remove:function(){var e=this;fetch("http://localhost:1234/api/remove",{method:"POST",body:JSON.stringify({playlistId:Number(this.$route.params.id),songId:this.id})}).then((function(t){200==t.status&&e.$emit("requestUpdate")}))},update:function(){this.$refs.editSongPopup.showModal=!0},hideCtxMenu:function(){this.$refs.ctxMenu.hide()},showCtxMenu:function(e){console.log("show"),this.$refs.ctxMenu.show(e)},onselect:function(){this.highlighted=!this.highlighted,this.hideCtxMenu()},displayPlay:function(){var e=this.$refs.idOrPlay;e.innerHTML="play_arrow",e.classList.add("material-icons-round")},displayId:function(){var e=this.$refs.idOrPlay;e.innerHTML=this.index+1,e.classList.remove("material-icons-round")},playAt:function(){console.log(this.$route.path);var e={index:this.index};this.$route.path.includes("/playlist/")&&(e.playlistIndex=Number(this.$route.params.id)),this.$route.path.includes("/collection/tracks")&&(e.type="collection"),fetch("http://localhost:1234/api/at",{method:"POST",body:JSON.stringify(e)})},setFavourite:function(){fetch("http://localhost:1234/api/updateSong",{method:"POST",body:JSON.stringify({id:this.id,favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover,source:this.source})})}},watch:{favourited:function(){this.setFavourite()},favourite:function(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}},f=(i("1273"),i("1c27")),h=i.n(f);const b=h()(p,[["render",r],["__scopeId","data-v-64cbb25c"]]);t["a"]=b}}]);
//# sourceMappingURL=tracks.eaef2aa1.js.map