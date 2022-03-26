(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bigPlayer"],{1919:function(t,e,o){},"3a46":function(t,e,o){},"4fce":function(t,e,o){"use strict";o("1919")},6208:function(t,e,o){"use strict";o.r(e);o("867d");var n=o("69be"),i={class:"bigPlayer"},a={class:"upNow"},s=["src"],c={class:"playlist"};function r(t,e,o,r,l,d){var u=Object(n["resolveComponent"])("spotify-playlist-header"),p=Object(n["resolveComponent"])("light-playlist-entry");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",i,[Object(n["createElementVNode"])("div",a,[Object(n["createElementVNode"])("img",{src:l.cover},null,8,s)]),Object(n["createElementVNode"])("div",c,[Object(n["createVNode"])(u),(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(l.playlist.songs,(function(e){return Object(n["openBlock"])(),Object(n["createBlock"])(p,{key:e.source,onDownload:t.download,onRequestUpdate:t.updatePlaylist,index:l.playlist.songs.findIndex((function(t){return t.source==e.source})),source:e.source,playing:e.playing,id:e.id,title:e.title,album:e.album,artist:e.artist,cover:e.cover,favourite:e.favourite,duration:e.duration},null,8,["onDownload","onRequestUpdate","index","source","playing","id","title","album","artist","cover","favourite","duration"])})),128))])])}o("3efd");var l={class:"track"},d=["src"],u={class:"trackwrapper"},p={class:"title"},f={class:"artist"},h={class:"duration"};function y(t,e,o,i,a,s){var c=Object(n["resolveComponent"])("EditSong"),r=Object(n["resolveComponent"])("Marquee"),y=Object(n["resolveComponent"])("SongCtx");return Object(n["openBlock"])(),Object(n["createBlock"])(y,{onDownload:s.download,onAddto:s.addToPlaylist,onRemove:s.remove,onUpdate:s.update,onLike:e[5]||(e[5]=function(t){return a.favourited=!a.favourited}),isAutoPlaylist:a.isAutoPlaylist,liked:a.favourited,ref:"ctxMenu"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{onClose:t.updatePlaylist,ref:"editSongPopup",cover:o.cover,id:o.id,title:o.title,album:o.album,artist:o.artist,source:o.source},null,8,["onClose","cover","id","title","album","artist","source"]),Object(n["createElementVNode"])("div",{onDblclick:e[1]||(e[1]=function(){s.playAt(),s.onselect()}),onClick:e[2]||(e[2]=function(){return s.onselect&&s.onselect.apply(s,arguments)}),onMouseover:e[3]||(e[3]=function(){return s.displayPlay&&s.displayPlay.apply(s,arguments)}),onMouseleave:e[4]||(e[4]=function(){return s.displayId&&s.displayId.apply(s,arguments)}),class:Object(n["normalizeClass"])(["playlistEntry",{selected:a.highlighted}])},[Object(n["createElementVNode"])("span",{onClick:e[0]||(e[0]=function(){return s.playAt&&s.playAt.apply(s,arguments)}),ref:"idOrPlay",class:Object(n["normalizeClass"])([{playing:t.playing},"id"])},Object(n["toDisplayString"])(o.index+1),3),Object(n["createElementVNode"])("div",l,[Object(n["createElementVNode"])("img",{src:o.cover||"/assets/img/music_placeholder.png"},null,8,d),Object(n["createElementVNode"])("div",u,[Object(n["createElementVNode"])("span",p,[Object(n["createVNode"])(r,{text:o.title},null,8,["text"])]),Object(n["createElementVNode"])("span",f,[Object(n["createVNode"])(r,{text:o.artist},null,8,["text"])])])]),Object(n["createElementVNode"])("span",h,Object(n["toDisplayString"])(o.duration),1)],34)]})),_:1},8,["onDownload","onAddto","onRemove","onUpdate","isAutoPlaylist","liked"])}o("dfac"),o("f258");var v=o("a279"),b=o("d0cc"),m=o("5acf"),g={name:"LightPlaylistEntry",components:{SongCtx:v["a"],EditSong:m["a"],Marquee:b["a"]},props:{index:Number,id:Number,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},cover:{type:String,default:"/assets/img/music_placeholder.png"},source:String,album:{type:String,default:"N/A"},duration:{type:String,default:"N/A"},favourite:{type:Boolean,default:!1}},data:function(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:"/collection/tracks"==this.$route.path,hovering:!1}},methods:{download:function(){window.open("http://localhost:1234/api/download/"+this.id)},addToPlaylist:function(t){var e=this;fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:t,source:this.source})}).then((function(t){200==t.status&&e.$emit("requestUpdate")}))},update:function(){this.$refs.editSongPopup.showModal=!0},remove:function(){fetch("http://localhost:1234/api/remove",{method:"POST",body:JSON.stringify({playlistId:Number(this.$route.params.id),songId:this.id})})},onselect:function(){this.highlighted=!this.highlighted},playAt:function(){console.log(this.$route.path);var t={index:this.index};t.playlistIndex=Number(this.$route.params.id),fetch("http://localhost:1234/api/at",{method:"POST",body:JSON.stringify(t)})},setFavourite:function(){fetch("http://localhost:1234/api/updateSong",{method:"POST",body:JSON.stringify({id:this.id,favourite:this.favourited,album:this.album,artist:this.artist,title:this.title,duration:this.duration,cover:this.cover,source:this.source})})},displayPlay:function(){var t=this.$refs.idOrPlay;t.innerHTML="play_arrow",t.classList.add("material-icons-round")},displayId:function(){var t=this.$refs.idOrPlay;t.innerHTML=this.index+1,t.classList.remove("material-icons-round")}},watch:{added:function(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"},favourited:function(){this.setFavourite()},favourite:function(){console.log("mounted",this.title,this.favourite,this.favourited),this.favourited=this.favourite,this.highlighted=!1}}},O=(o("bfaf"),o("1c27")),j=o.n(O);const N=j()(g,[["render",y],["__scopeId","data-v-186855b0"]]);var P=N,S=o("bca3"),w={components:{LightPlaylistEntry:P,SpotifyPlaylistHeader:S["a"]},name:"BigPlayer",methods:{fetchPlaylist:function(){var t=this;fetch("http://localhost:1234/api/playlist",{method:"POST"}).then((function(t){return t.json()})).then((function(e){return t.playlist=e}))},updateData:function(t){var e;"player.song"!=t.path||(this.cover=(null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.cover)||"/assets/img/music_placeholder.png")}},data:function(){var t=this,e=function e(){console.log("attempting reconnect");var o=new WebSocket("ws://localhost:1234/ws");o.onclose=function(){console.log("ws closed"),setTimeout(e,1e3)},o.onopen=function(){console.log("ws connected")},o.onmessage=function(e){var o=JSON.parse(e.data);t.updateData(o)}};return e(),this.fetchPlaylist(),{cover:"/assets/img/music_placeholder.png",playlist:[]}}};o("78bc");const k=j()(w,[["render",r],["__scopeId","data-v-0e4b546a"]]);e["default"]=k},"78bc":function(t,e,o){"use strict";o("b117")},"867d":function(t,e,o){"use strict";var n=o("e6df"),i=o("fe06").findIndex,a=o("513e"),s="findIndex",c=!0;s in[]&&Array(1)[s]((function(){c=!1})),n({target:"Array",proto:!0,forced:c},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a(s)},b117:function(t,e,o){},bca3:function(t,e,o){"use strict";var n=o("69be"),i=function(t){return Object(n["pushScopeId"])("data-v-491e69c7"),t=t(),Object(n["popScopeId"])(),t},a={class:"gridHeader"},s=i((function(){return Object(n["createElementVNode"])("span",{class:"id"},"#",-1)})),c=i((function(){return Object(n["createElementVNode"])("span",{class:"title"},"Title",-1)})),r=[s,c];function l(t,e,o,i,s,c){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,r)}var d={name:"SpotifyPlaylistHeader"},u=(o("4fce"),o("1c27")),p=o.n(u);const f=p()(d,[["render",l],["__scopeId","data-v-491e69c7"]]);e["a"]=f},bfaf:function(t,e,o){"use strict";o("3a46")}}]);
//# sourceMappingURL=bigPlayer.e8a55327.js.map