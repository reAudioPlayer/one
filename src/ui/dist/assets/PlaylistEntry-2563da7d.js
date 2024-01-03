import{i as L,k as J,D as p,q as B,e as S,bj as K,bY as W,o as u,c as g,r as X,g as o,w as s,b as d,F as T,j as U,f as A,t as k,d as I,u as b,ce as Q,cG as Z,c6 as ee,cr as te,y as oe,cw as ne,cH as se,c8 as ae,cz as ie,c9 as le,a as h,cI as ue,O,h as re,M as V,A as de,N as ce,cJ as ve,cd as ge,cK as fe,_ as me}from"./index-610769ea.js";import{_ as ye}from"./EditSong.vue_vue_type_script_setup_true_lang-314f3f62.js";import{p as pe}from"./playerInPicture-af203fdf.js";const ke=L({__name:"SongContext",props:{song:{type:Object,required:!0},playlistId:{type:String,required:!1,default:""}},emits:["update","edit"],setup(t,{expose:N,emit:F}){const a=J(),$=p(()=>a.playlists.filter(n=>n.type==="classic")),e=t,m=F,v=p(()=>e.playlistId==-1),C=()=>{pe(e.song.artist,e.song.title,e.song.source)},f=async n=>{var i;n!=-1&&(await ee(n,e.song),te.addSuccess(e.song.title,`Added to ${(i=$.value.find(l=>l.id==n))==null?void 0:i.name}`,3e3),m("update"))},_=async()=>{const n=await oe(e.song.title,e.song.artist,e.song.cover);await f(n),m("update")},q=async()=>{await ne(e.playlistId,e.song.id),m("update")},P=B(null),y=B(null),E=()=>{y.value.visible?M():c()},M=()=>{y.value.hide()},c=()=>{const n=P.value.getBoundingClientRect(),i={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};y.value.show(i)};N({show:c,toggle:E,hide:M});const D=p(()=>({Soundcloud:`https://soundcloud.com/search?q=${e.song.artist} ${e.song.title}`,Audius:`https://audius.co/search/${e.song.artist} ${e.song.title}`,"Youtube Music":`https://music.youtube.com/search?q=${e.song.artist} ${e.song.title}`,Spotify:`https://open.spotify.com/search/${e.song.artist} ${e.song.title}`})),w=()=>{m("edit")},R=n=>{window.open(D.value[n]),w()},Y=()=>{const n=se(e.song);ae(n,`${e.song.artist} - ${e.song.title}`)};return(n,i)=>{const l=S("v-contextmenu-item"),j=S("v-contextmenu-submenu"),x=S("v-contextmenu-divider"),z=S("v-contextmenu"),H=K("contextmenu");return W((u(),g("div",{ref_key:"box",ref:P},[X(n.$slots,"default"),o(z,{ref_key:"contextmenu",ref:y},{default:s(()=>[o(l,{onClick:C},{default:s(()=>[d(" Preview ")]),_:1}),o(j,{title:"Find source"},{default:s(()=>[(u(!0),g(T,null,U(Object.keys(D.value),r=>(u(),A(l,{key:r,onClick:G=>R(r)},{default:s(()=>[d(k(r),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(x),o(l,{onClick:i[0]||(i[0]=r=>n.$emit("like"))},{default:s(()=>[d(k((t.song.favourite?"Remove from":"Save to")+" your Liked Songs"),1)]),_:1}),v.value?I("",!0):(u(),A(l,{key:0,onClick:q},{default:s(()=>[d(" Remove from this playlist ")]),_:1})),o(j,{title:"Add to playlist"},{default:s(()=>[o(l,{onClick:_},{default:s(()=>[d("Add to new playlist")]),_:1}),o(x),(u(!0),g(T,null,U($.value,r=>(u(),A(l,{key:r.id,onClick:G=>f(r.id)},{default:s(()=>[d(k(r.name),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(x),o(l,{onClick:w},{default:s(()=>[d(" Update Metadata ")]),_:1}),o(x),o(l,{onClick:i[1]||(i[1]=r=>b(Q)(t.song.id))},{default:s(()=>[d(" Download ")]),_:1}),o(l,{onClick:i[2]||(i[2]=r=>b(Z)(t.song.id))},{default:s(()=>[d(" Uncache ")]),_:1}),o(x),o(j,{title:"Export..."},{default:s(()=>[o(l,{onClick:i[3]||(i[3]=r=>Y())},{default:s(()=>[d(" to file ")]),_:1})]),_:1})]),_:1},512)])),[[H,void 0,"contextmenu"]])}}}),we={key:0,class:"index text-right downloading"},xe={key:2,class:"cover"},he={class:"artist-title"},Se={class:"title"},be={class:"artist"},$e={key:3,class:"album"},Ce={class:"duration text-center"},_e=L({__name:"PlaylistEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},withMore:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:String,required:!1,default:null},artist:{type:String,required:!1,default:null}},emits:["update"],setup(t,{emit:N}){const F=ie(),a=t,$=N,e=le(),m=p(()=>a.song.id==e.song.id),v=B(!1),C=()=>{a.song.favourite=!a.song.favourite,fe(a.song.id,a.song.favourite)},f=p(()=>a.playlistId==null?e.playlist.id:a.playlistId),_=async()=>{if(f.value=="track"){e.loadPlaylist("track",a.song.id);return}if(f.value=="artist"){await e.loadPlaylist("artist",a.artist),e.loadSong(null,a.index);return}e.loadSong(f.value,a.index)},q=B(null),P=()=>{q.value.show()},y=()=>{$("update")},E=p(()=>F.isSongDownloading(a.song.id));return(M,c)=>{const D=S("router-link");return u(),A(ke,{ref:"ctxMenu",liked:t.song.favourite,playlistId:f.value,song:t.song,onEdit:P,onLike:C,onUpdate:y},{default:s(()=>[o(ye,{ref_key:"updatePopup",ref:q,song:t.song,onUpdate:c[0]||(c[0]=w=>M.$emit("update"))},null,8,["song"]),h("div",{class:O([{playing:m.value,selected:t.selected,hovering:v.value,withCover:t.withCover,withAlbum:t.withAlbum,withMore:t.withMore},"playlist-entry"]),onDblclick:_,onMouseenter:c[1]||(c[1]=w=>v.value=!0),onMouseleave:c[2]||(c[2]=w=>v.value=!1)},[E.value?(u(),g("div",we,[o(ue)])):(u(),g("div",{key:1,class:O([{"material-symbols-rounded":v.value},"index text-right"]),onClick:_},k(v.value?"play_arrow":t.index+1),3)),t.withCover?(u(),g("div",xe,[o(re,{src:t.song.cover,type:"track"},null,8,["src"])])):I("",!0),h("div",he,[h("span",Se,[o(D,{to:`/track/${b(de)(t.song.id)}`,class:"linkOnHover"},{default:s(()=>[o(V,{text:t.song.title},null,8,["text"])]),_:1},8,["to"])]),h("span",be,[o(ce,{artist:t.song.artist,class:"text-muted text-xs"},null,8,["artist"])])]),t.withAlbum&&!b(ve)?(u(),g("div",$e,[o(V,{text:t.song.album},null,8,["text"])])):I("",!0),t.selected||v.value||t.song.favourite?(u(),g("div",{key:4,class:O([{favourite:t.song.favourite},"favourite-icon icon text-right material-symbols-rounded"]),onClick:C},k(t.song.favourite?"favorite":"heart_plus"),3)):I("",!0),h("div",Ce,k(b(ge)(t.song.duration)),1)],34)]),_:1},8,["liked","playlistId","song"])}}});const De=me(_e,[["__scopeId","data-v-2189838e"]]);export{De as P};