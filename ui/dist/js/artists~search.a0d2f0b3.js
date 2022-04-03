(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["artists~search"],{"0129":function(e,t,n){"use strict";n("b6d6")},"13c1":function(e,t,n){"use strict";n("a15b"),n("4228"),n("526b");var c=n("69be"),o={class:"wrapper"},l=["src"],i=["innerHTML"];function r(e,t,n,r,a,s){var d=Object(c["resolveComponent"])("add-artist-to-playlist");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createVNode"])(d,{cover:n.cover,name:n.name,description:n.description,id:n.id,href:"https://open.spotify.com/artist/".concat(n.id),ref:"import"},null,8,["cover","name","description","id","href"]),Object(c["createElementVNode"])("div",{class:"item",onClick:t[1]||(t[1]=function(){return s.redirect&&s.redirect.apply(s,arguments)})},[Object(c["createElementVNode"])("img",{src:n.cover},null,8,l),Object(c["createElementVNode"])("h4",null,Object(c["toDisplayString"])(n.name),1),Object(c["createElementVNode"])("p",{innerHTML:n.description},null,8,i),n.showFollowButton?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,onClick:t[0]||(t[0]=function(){return s.follow&&s.follow.apply(s,arguments)}),class:"followButton"},Object(c["toDisplayString"])(a.following?"Following":"Follow"),1)):Object(c["createCommentVNode"])("",!0)])])}n("3efd"),n("f258"),n("ed98");var a=function(e){return Object(c["pushScopeId"])("data-v-09c0f9c2"),e=e(),Object(c["popScopeId"])(),e},s={class:"wrapper"},d={class:"header"},u=a((function(){return Object(c["createElementVNode"])("h3",null,"Import playlist",-1)})),p=a((function(){return Object(c["createElementVNode"])("span",{class:"material-icons-round"}," close ",-1)})),m=[p],b=a((function(){return Object(c["createElementVNode"])("h4",null,"To Playlist",-1)})),f=a((function(){return Object(c["createElementVNode"])("br",null,null,-1)})),h={key:0},O=a((function(){return Object(c["createElementVNode"])("h4",null,"Source",-1)})),j={class:"content"},v=a((function(){return Object(c["createElementVNode"])("h4",null,"Title",-1)})),y={class:"content"},g=a((function(){return Object(c["createElementVNode"])("h4",null,"Album",-1)})),N={class:"content"},V=a((function(){return Object(c["createElementVNode"])("h4",null,"Artist",-1)})),E={class:"content"},w=a((function(){return Object(c["createElementVNode"])("h4",null,"Cover",-1)})),k={class:"content"},S=["src"],C={class:"confirm"},B={key:1},T=["src"],A={class:"details"},x={class:"detailswrapper"},P=Object(c["createTextVNode"])("Artist"),M=["innerHTML"],I=a((function(){return Object(c["createElementVNode"])("hr",null,null,-1)})),D=a((function(){return Object(c["createElementVNode"])("hr",null,null,-1)})),_=a((function(){return Object(c["createElementVNode"])("hr",null,null,-1)})),F=a((function(){return Object(c["createElementVNode"])("hr",null,null,-1)})),$={class:"confirm"};function H(e,t,n,o,l,i){var r=Object(c["resolveComponent"])("FindSources"),a=Object(c["resolveComponent"])("h7"),p=Object(c["resolveComponent"])("spotify-playlist-header"),H=Object(c["resolveComponent"])("spotify-playlist-entry"),J=Object(c["resolveComponent"])("vue-final-modal"),L=Object(c["resolveDirective"])("observe-visibility");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createVNode"])(J,{onClick:e.hideFindSourcesCtx,modelValue:l.showModal,"onUpdate:modelValue":t[13]||(t[13]=function(e){return l.showModal=e}),classes:"modal-containerr","content-class":"addAlbumToPlaylistPopup"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",s,[Object(c["createElementVNode"])("div",d,[u,Object(c["createElementVNode"])("button",{class:"modal-close",onClick:t[0]||(t[0]=function(){return i.close&&i.close.apply(i,arguments)})},m)]),b,Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return l.selectedPlaylist=e})},[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(l.playlists,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{key:e},Object(c["toDisplayString"])(e),1)})),128))],512),[[c["vModelSelect"],l.selectedPlaylist]]),f,l.editSong?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",h,[O,Object(c["createVNode"])(r,{ref:"findSources",title:e.title,artist:e.artist},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",j,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.dSource=t}),ref:"source"},null,512),[[c["vModelText"],e.dSource]]),Object(c["createElementVNode"])("span",{class:"material-icons-round more",ref:"sourceMore",onClick:t[3]||(t[3]=function(){return e.opencontextmenu&&e.opencontextmenu.apply(e,arguments)})},"more_vert",512)])]})),_:1},8,["title","artist"]),v,Object(c["createElementVNode"])("div",y,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.dTitle=t}),type:"text"},null,512),[[c["vModelText"],e.dTitle]])]),g,Object(c["createElementVNode"])("div",N,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.dAlbum=t}),type:"text",ref:"album"},null,512),[[c["vModelText"],e.dAlbum]])]),V,Object(c["createElementVNode"])("div",E,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.dArtist=t}),type:"text"},null,512),[[c["vModelText"],e.dArtist]])]),w,Object(c["createElementVNode"])("div",k,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",class:"addSong cover","onUpdate:modelValue":t[7]||(t[7]=function(t){return e.dCover=t}),ref:"cover"},null,512),[[c["vModelText"],e.dCover]]),Object(c["createElementVNode"])("img",{onClick:t[8]||(t[8]=function(){return i.openInNewTab&&i.openInNewTab.apply(i,arguments)}),class:"addSong cover",src:e.dCover?e.dCover:"/assets/img/music_placeholder.png"},null,8,S)]),Object(c["createElementVNode"])("div",C,[Object(c["createElementVNode"])("button",{onClick:t[9]||(t[9]=function(){return i.add&&i.add.apply(i,arguments)}),class:"negative"},"Add")])])):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",B,[Object(c["withDirectives"])((Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"padding-20 playlisteditor",onClick:t[11]||(t[11]=function(){return e.editPlaylist&&e.editPlaylist.apply(e,arguments)})},[Object(c["createElementVNode"])("img",{class:"cover",src:n.cover},null,8,T),Object(c["createElementVNode"])("div",A,[Object(c["createElementVNode"])("div",x,[Object(c["createVNode"])(a,null,{default:Object(c["withCtx"])((function(){return[P]})),_:1}),Object(c["createElementVNode"])("span",{class:"material-icons-round share",onClick:t[10]||(t[10]=function(){return i.share&&i.share.apply(i,arguments)})},"share")]),Object(c["createElementVNode"])("h1",null,Object(c["toDisplayString"])(n.name),1),Object(c["createElementVNode"])("h5",{innerHTML:n.description},null,8,M)])])),[[L,e.headerVisibilityChanged]]),I,Object(c["createVNode"])(p),D,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(l.playlist,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(H,{onAdd:i.add,key:t,added:e.added,index:t,cover:e.cover,artist:e.artists.join(", "),title:e.title,source:e.source,album:e.album,preview:e.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"])})),128)),Object(c["createElementVNode"])("h5",null,Object(c["toDisplayString"])("Recommendations based on "+n.name),1),_,Object(c["createVNode"])(p),F,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(l.recommendations,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(H,{onAdd:i.addRec,key:t,added:e.added,index:t,cover:e.cover,artist:e.artists.join(", "),title:e.title,source:e.source,album:e.album,preview:e.preview},null,8,["onAdd","added","index","cover","artist","title","source","album","preview"])})),128))])),Object(c["createElementVNode"])("div",$,[Object(c["createElementVNode"])("button",{onClick:t[12]||(t[12]=function(){return i.addAll&&i.addAll.apply(i,arguments)}),class:"negative"},"Add All")])])]})),_:1},8,["onClick","modelValue"])])}var J=n("e599"),L=(n("867d"),n("06b9")),U=n("3ae5"),R=n("bca3"),z={name:"AddArtistToPlaylist",components:{FindSources:L["a"],SpotifyPlaylistHeader:R["a"],SpotifyPlaylistEntry:U["a"]},props:{cover:String,description:String,name:String,href:String,id:String},data:function(){return{showModal:!1,playlists:[],selectedPlaylist:-1,playlist:[],recommendations:[],editSong:!1}},methods:{share:function(){window.open(this.href)},close:function(){this.showModal=!1,this.$emit("close")},loadMetadata:function(){var e=this;fetch("http://localhost:1234/api/metadata",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then((function(e){return e.json()})).then((function(t){console.log(t),e.dTitle=t.title,e.$refs.album.value=t.album,e.dArtist=t.artists.join(", "),e.dCover=t.cover,e.$refs.source.value=t.src}))},openInNewTab:function(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},addAll:function(){for(var e=0;e<this.playlist.length;e++)this.add(e)},add:function(e){this.addTrack(this.playlist[e])},addRec:function(e){this.addTrack(this.recommendations[e])},addTrack:function(e){var t=this,n=this.playlists.findIndex((function(e){return e==t.selectedPlaylist}));console.log(e,n),n<0?alert("no playlist selected"):fetch("http://localhost:1234/api/add",{method:"POST",body:JSON.stringify({id:n,source:e.src,title:e.title,artist:e.artists.join(", "),album:e.album,cover:e.cover})}).then((function(t){200==t.status&&(e.added=!0)}))}},watch:{dSource:function(){this.loadMetadata()},showModal:function(){var e=this;this.showModal&&(fetch("http://localhost:1234/api/playlists").then((function(e){return e.json()})).then((function(t){var n;e.playlists.length=0,(n=e.playlists).push.apply(n,Object(J["a"])(t))})),fetch("http://localhost:1234/api/spotify/artist",{method:"POST",body:JSON.stringify({artistId:this.id})}).then((function(e){return e.json()})).then((function(t){var n;e.playlist.length=0,(n=e.playlist).push.apply(n,Object(J["a"])(t))})),fetch("http://localhost:1234/api/spotify/recommend",{method:"POST",body:JSON.stringify({artists:[this.id]})}).then((function(e){return e.json()})).then((function(t){var n;e.recommendations.length=0,(n=e.recommendations).push.apply(n,Object(J["a"])(t))})))}}},q=(n("0129"),n("8645"),n("1c27")),G=n.n(q);const K=G()(z,[["render",H],["__scopeId","data-v-09c0f9c2"]]);var Q=K,W={components:{AddArtistToPlaylist:Q},name:"ArtistItem",methods:{redirect:function(){this.$refs.import.showModal=!0},follow:function(e){var t=this;e.stopPropagation();var n=this.following?"unfollow":"follow";fetch("http://localhost:1234/api/spotify/"+n,{method:"POST",body:JSON.stringify({artistId:this.id})}).then((function(e){200==e.status&&(t.following=!t.following)}))}},data:function(){return{following:!1}},props:{cover:String,name:String,description:String,id:String,showFollowButton:Boolean}};n("3dcc");const X=G()(W,[["render",r],["__scopeId","data-v-d8e1827a"]]);t["a"]=X},1919:function(e,t,n){},"3ae5":function(e,t,n){"use strict";var c=n("69be"),o={class:"track"},l=["src"],i={class:"trackwrapper"},r={class:"title"},a={class:"artist"};function s(e,t,n,s,d,u){var p=Object(c["resolveComponent"])("mini-player");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{onDblclick:t[2]||(t[2]=function(){u.playAt(),u.onselect()}),onClick:t[3]||(t[3]=function(){return u.onselect&&u.onselect.apply(u,arguments)}),onMouseover:t[4]||(t[4]=function(e){return d.hovering=!0}),onMouseleave:t[5]||(t[5]=function(e){return d.hovering=!1}),class:Object(c["normalizeClass"])(["playlistEntry",{selected:d.highlighted}])},[Object(c["createVNode"])(p,{class:Object(c["normalizeClass"])(["miniPlayer",{hidden:!d.hovering}]),src:n.preview},null,8,["class","src"]),d.hovering?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",{key:0,onClick:t[0]||(t[0]=function(){return e.edit&&e.edit.apply(e,arguments)}),class:"id"},Object(c["toDisplayString"])(n.index+1),1)),Object(c["createElementVNode"])("div",o,[Object(c["createElementVNode"])("img",{src:n.cover||"/assets/img/music_placeholder.png"},null,8,l),Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("span",r,Object(c["toDisplayString"])(n.title),1),Object(c["createElementVNode"])("span",a,Object(c["toDisplayString"])(n.artist),1)]),Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("span",{onClick:t[1]||(t[1]=function(){return u.add&&u.add.apply(u,arguments)}),class:"material-icons-round edit",ref:"add"},"add",512)],34)}n("dfac"),n("3efd"),n("f258");var d=n("cb9b"),u={components:{MiniPlayer:d["a"]},name:"SpotifyPlaylistEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,cover:String,album:String,preview:String},data:function(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:"/collection/tracks"==this.$route.path,hovering:!1}},methods:{remove:function(){fetch("http://localhost:1234/api/remove",{method:"POST",body:JSON.stringify({playlistId:Number(this.$route.params.id),songId:this.id})})},onselect:function(){this.highlighted=!this.highlighted},playAt:function(){this.$emit("edit",this.index)},add:function(){console.log("add"),this.$emit("add",this.index)}},watch:{added:function(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},p=(n("577c"),n("1c27")),m=n.n(p);const b=m()(u,[["render",s],["__scopeId","data-v-4d350ce2"]]);t["a"]=b},"3dcc":function(e,t,n){"use strict";n("64e6")},"4fce":function(e,t,n){"use strict";n("1919")},"577c":function(e,t,n){"use strict";n("c326")},"64e6":function(e,t,n){},8645:function(e,t,n){"use strict";n("de2a")},b6d6:function(e,t,n){},bca3:function(e,t,n){"use strict";var c=n("69be"),o=function(e){return Object(c["pushScopeId"])("data-v-491e69c7"),e=e(),Object(c["popScopeId"])(),e},l={class:"gridHeader"},i=o((function(){return Object(c["createElementVNode"])("span",{class:"id"},"#",-1)})),r=o((function(){return Object(c["createElementVNode"])("span",{class:"title"},"Title",-1)})),a=[i,r];function s(e,t,n,o,i,r){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",l,a)}var d={name:"SpotifyPlaylistHeader"},u=(n("4fce"),n("1c27")),p=n.n(u);const m=p()(d,[["render",s],["__scopeId","data-v-491e69c7"]]);t["a"]=m},c326:function(e,t,n){},de2a:function(e,t,n){}}]);
//# sourceMappingURL=artists~search.a0d2f0b3.js.map