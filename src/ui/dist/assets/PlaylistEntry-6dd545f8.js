import{i as V,k as X,D as p,q as I,e as S,bo as G,c1 as J,o as u,c as f,r as K,g as o,w as s,b as d,F as T,j as L,f as A,t as k,d as B,u as $,cj as Q,cL as Z,cb as ee,cw as te,y as oe,cB as ne,cM as se,cd as ae,cE as le,ce as ie,a as b,cN as ue,O as j,h as re,M as U,A as de,N as ce,cO as ve,ci as ge,cP as fe,_ as me}from"./index-9ce0501a.js";import{_ as ye}from"./EditSong.vue_vue_type_script_setup_true_lang-fa67243e.js";import{p as pe}from"./playerInPicture-af203fdf.js";const ke=V({__name:"SongContext",props:{song:{type:Object,required:!0},playlistId:{type:String,required:!1,default:""}},emits:["update","edit"],setup(t,{expose:N,emit:E}){const a=X(),C=p(()=>a.playlists.filter(n=>n.type==="classic")),e=t,m=E,v=p(()=>e.playlistId==-1),_=()=>{pe(e.song.artist,e.song.title,e.song.source)},g=async n=>{var l;n!=-1&&(await ee(n,e.song),te.addSuccess(e.song.title,`Added to ${(l=C.value.find(i=>i.id==n))==null?void 0:l.name}`,3e3),m("update"))},q=async()=>{const n=await oe(e.song.title,e.song.artist,e.song.cover);await g(n),m("update")},P=async()=>{await ne(e.playlistId,e.song.id),m("update")},M=I(null),y=I(null),F=()=>{y.value.visible?D():c()},D=()=>{y.value.hide()},c=()=>{const n=M.value.getBoundingClientRect(),l={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};y.value.show(l)};N({show:c,toggle:F,hide:D});const w=p(()=>({Soundcloud:`https://soundcloud.com/search?q=${e.song.artist} ${e.song.title}`,Audius:`https://audius.co/search/${e.song.artist} ${e.song.title}`,"Youtube Music":`https://music.youtube.com/search?q=${e.song.artist} ${e.song.title}`,Spotify:`https://open.spotify.com/search/${e.song.artist} ${e.song.title}`})),x=()=>{m("edit")},R=n=>{window.open(w.value[n]),x()},H=()=>{const n=se(e.song);ae(n,`${e.song.artist} - ${e.song.title}`)};return(n,l)=>{const i=S("v-contextmenu-item"),O=S("v-contextmenu-submenu"),h=S("v-contextmenu-divider"),Y=S("v-contextmenu"),z=G("contextmenu");return J((u(),f("div",{ref_key:"box",ref:M},[K(n.$slots,"default"),o(Y,{ref_key:"contextmenu",ref:y},{default:s(()=>[o(i,{onClick:_},{default:s(()=>[d(" Preview ")]),_:1}),o(O,{title:"Find source"},{default:s(()=>[(u(!0),f(T,null,L(Object.keys(w.value),r=>(u(),A(i,{key:r,onClick:W=>R(r)},{default:s(()=>[d(k(r),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(h),o(i,{onClick:l[0]||(l[0]=r=>n.$emit("like"))},{default:s(()=>[d(k((t.song.favourite?"Remove from":"Save to")+" your Liked Songs"),1)]),_:1}),v.value?B("",!0):(u(),A(i,{key:0,onClick:P},{default:s(()=>[d(" Remove from this playlist ")]),_:1})),o(O,{title:"Add to playlist"},{default:s(()=>[o(i,{onClick:q},{default:s(()=>[d("Add to new playlist")]),_:1}),o(h),(u(!0),f(T,null,L(C.value,r=>(u(),A(i,{key:r.id,onClick:W=>g(r.id)},{default:s(()=>[d(k(r.name),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(h),o(i,{onClick:x},{default:s(()=>[d(" Update Metadata ")]),_:1}),o(h),o(i,{onClick:l[1]||(l[1]=r=>$(Q)(t.song.id))},{default:s(()=>[d(" Download ")]),_:1}),o(i,{onClick:l[2]||(l[2]=r=>$(Z)(t.song.id))},{default:s(()=>[d(" Uncache ")]),_:1}),o(h),o(O,{title:"Export..."},{default:s(()=>[o(i,{onClick:l[3]||(l[3]=r=>H())},{default:s(()=>[d(" to file ")]),_:1})]),_:1})]),_:1},512)])),[[z,void 0,"contextmenu"]])}}}),we={key:0,class:"index text-right downloading"},xe={key:2,class:"cover"},he={class:"artist-title"},be={class:"title"},Se={class:"artist"},$e={key:3,class:"album"},Ce={class:"duration text-center"},_e=V({__name:"PlaylistEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},withMore:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:String,required:!1,default:null},artist:{type:String,required:!1,default:null},album:{type:String,required:!1,default:null}},emits:["update"],setup(t,{emit:N}){const E=le(),a=t,C=N,e=ie(),m=p(()=>a.song.id==e.song.id),v=I(!1),_=()=>{a.song.favourite=!a.song.favourite,fe(a.song.id,a.song.favourite)},g=p(()=>a.playlistId==null?e.playlist.id:a.playlistId),q=async()=>{if(g.value=="track"){e.loadPlaylist("track",a.song.id);return}if(g.value=="artist"){await e.loadPlaylist("artist",a.artist),e.loadSong(null,a.index);return}if(g.value=="album"){await e.loadPlaylist("album",a.album),e.loadSong(null,a.index);return}e.loadSong(g.value,a.index)},P=I(null),M=()=>{P.value.show()},y=()=>{C("update")},F=p(()=>E.isSongDownloading(a.song.id));return(D,c)=>{const w=S("router-link");return u(),A(ke,{ref:"ctxMenu",liked:t.song.favourite,playlistId:g.value,song:t.song,onEdit:M,onLike:_,onUpdate:y},{default:s(()=>[o(ye,{ref_key:"updatePopup",ref:P,song:t.song,onUpdate:c[0]||(c[0]=x=>D.$emit("update"))},null,8,["song"]),b("div",{class:j([{playing:m.value,selected:t.selected,hovering:v.value,withCover:t.withCover,withAlbum:t.withAlbum,withMore:t.withMore},"playlist-entry"]),onDblclick:q,onMouseenter:c[1]||(c[1]=x=>v.value=!0),onMouseleave:c[2]||(c[2]=x=>v.value=!1)},[F.value?(u(),f("div",we,[o(ue)])):(u(),f("div",{key:1,class:j([{"material-symbols-rounded":v.value},"index text-right"]),onClick:q},k(v.value?"play_arrow":t.index+1),3)),t.withCover?(u(),f("div",xe,[o(re,{src:t.song.cover,type:"track"},null,8,["src"])])):B("",!0),b("div",he,[b("span",be,[o(w,{to:`/track/${$(de)(t.song.id)}`,class:"linkOnHover"},{default:s(()=>[o(U,{text:t.song.title},null,8,["text"])]),_:1},8,["to"])]),b("span",Se,[o(ce,{artist:t.song.artist,class:"text-muted text-xs"},null,8,["artist"])])]),t.withAlbum&&!$(ve)?(u(),f("div",$e,[o(w,{to:t.song.album.href,class:"linkOnHover"},{default:s(()=>[o(U,{text:t.song.album.name},null,8,["text"])]),_:1},8,["to"])])):B("",!0),t.selected||v.value||t.song.favourite?(u(),f("div",{key:4,class:j([{favourite:t.song.favourite},"favourite-icon icon text-right material-symbols-rounded"]),onClick:_},k(t.song.favourite?"favorite":"heart_plus"),3)):B("",!0),b("div",Ce,k($(ge)(t.song.duration)),1)],34)]),_:1},8,["liked","playlistId","song"])}}});const De=me(_e,[["__scopeId","data-v-67cfb148"]]);export{De as P};
