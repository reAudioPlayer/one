import{e as H,j as W,D as w,n as B,f as h,ac as X,a2 as G,o as r,c as v,r as J,g as t,w as o,b as u,F as L,h as T,i as I,t as S,u as g,cL as Z,cM as ee,cN as te,d as N,aj as se,cO as oe,a as d,ab as ne,ar as ae,x as le,aF as ie,cP as de,ae as ue,aI as re,a6 as ce,cQ as me,O as j,H as ye,M as V,A as fe,K as ve,cR as ge,ai as pe,cS as _e,_ as xe}from"./index-ffaf8705.js";import{_ as he}from"./EditSong.vue_vue_type_script_setup_true_lang-32414f57.js";import{p as we}from"./playerInPicture-af203fdf.js";const be=d("span",{class:"material-symbols-rounded"},"preview",-1),ke=d("span",{class:"material-symbols-rounded"},"search",-1),Se=d("span",{class:"material-symbols-rounded"},"queue_music",-1),$e=d("span",{class:"material-symbols-rounded"}," play_arrow ",-1),Ce=d("span",{class:"material-symbols-rounded"}," add_to_queue ",-1),qe=d("span",{class:"material-symbols-rounded"}," queue_play_next ",-1),Pe=d("span",{class:"material-symbols-rounded"},"delete",-1),Me=d("span",{class:"material-symbols-rounded"},"playlist_add",-1),Ae=d("span",{class:"material-symbols-rounded"},"edit",-1),De=d("span",{class:"material-symbols-rounded"},"file_download",-1),Ie=d("span",{class:"material-symbols-rounded"},"replay",-1),Ne=d("span",{class:"material-symbols-rounded"},"share",-1),Be=H({__name:"SongContext",props:{song:{type:Object,required:!0},playlistId:{type:String,required:!1,default:""}},emits:["update","edit"],setup(s,{expose:F,emit:E}){const i=W(),$=w(()=>i.playlists.filter(n=>n.type==="classic")),e=s,p=E,y=()=>{we(e.song.artist,e.song.title,e.song.source)},C=w(()=>{var n;return((n=i.playlists.find(a=>a.id===e.playlistId))==null?void 0:n.type)!=="classic"}),f=async n=>{var a;await ne(n,e.song),ae.addSuccess(e.song.title,`Added to ${(a=$.value.find(l=>l.id==n))==null?void 0:a.name}`,3e3),p("update")},q=async()=>{const n=await le("classic",e.song.title,e.song.artist,e.song.cover);await f(n),p("update")},P=async()=>{await ie(e.playlistId,e.song.id),p("update")},M=B(null),_=B(null),O=()=>{_.value.visible?A():m()},A=()=>{_.value.hide()},m=()=>{const n=M.value.getBoundingClientRect(),a={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};_.value.show(a)};F({show:m,toggle:O,hide:A});const b=w(()=>({Soundcloud:`https://soundcloud.com/search?q=${e.song.artist} ${e.song.title}`,Audius:`https://audius.co/search/${e.song.artist} ${e.song.title}`,"Youtube Music":`https://music.youtube.com/search?q=${e.song.artist} ${e.song.title}`,Spotify:`https://open.spotify.com/search/${e.song.artist} ${e.song.title}`})),k=()=>{p("edit")},R=n=>{window.open(b.value[n]),k()},U=()=>{const n=de(e.song);ue(n,`${e.song.artist} - ${e.song.title}`)};return(n,a)=>{const l=h("v-contextmenu-item"),D=h("v-contextmenu-submenu"),x=h("v-contextmenu-divider"),Y=h("v-context-menu-divider"),z=h("v-contextmenu"),K=X("contextmenu");return G((r(),v("div",{ref_key:"box",ref:M},[J(n.$slots,"default"),t(z,{ref_key:"contextmenu",ref:_},{default:o(()=>[t(l,{onClick:y},{default:o(()=>[be,u(" Preview ")]),_:1}),t(l,null,{default:o(()=>[ke,t(D,{title:"Find source"},{default:o(()=>[(r(!0),v(L,null,T(Object.keys(b.value),c=>(r(),I(l,{key:c,onClick:Q=>R(c)},{default:o(()=>[u(S(c),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1}),t(x),t(l,null,{default:o(()=>[Se,t(D,{title:"Add to queue"},{default:o(()=>[t(l,{onClick:a[0]||(a[0]=()=>g(Z)(e.song.id))},{default:o(()=>[$e,u(" Play Now ")]),_:1}),t(l,{onClick:a[1]||(a[1]=()=>g(ee)(e.song.id))},{default:o(()=>[Ce,u(" Play Next ")]),_:1}),t(l,{onClick:a[2]||(a[2]=()=>g(te)(e.song.id))},{default:o(()=>[qe,u(" Play Last ")]),_:1})]),_:1})]),_:1}),t(x),t(Y),C.value?N("",!0):(r(),I(l,{key:0,onClick:P},{default:o(()=>[Pe,u(" Remove from this playlist ")]),_:1})),t(l,null,{default:o(()=>[Me,t(D,{title:"Add to playlist"},{default:o(()=>[t(l,{onClick:q},{default:o(()=>[u(" Add to new playlist ")]),_:1}),t(x),(r(!0),v(L,null,T($.value,c=>(r(),I(l,{key:c.id,onClick:Q=>f(c.id)},{default:o(()=>[u(S(c.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1}),t(x),t(l,{onClick:k},{default:o(()=>[Ae,u(" Edit ")]),_:1}),t(x),t(l,{onClick:a[3]||(a[3]=c=>g(se)(s.song.id))},{default:o(()=>[De,u(" Download ")]),_:1}),t(l,{onClick:a[4]||(a[4]=c=>g(oe)(s.song.id))},{default:o(()=>[Ie,u(" Uncache ")]),_:1}),t(x),t(l,null,{default:o(()=>[Ne,t(D,{title:"Export..."},{default:o(()=>[t(l,{onClick:a[5]||(a[5]=c=>U())},{default:o(()=>[u(" to file ")]),_:1})]),_:1})]),_:1})]),_:1},512)])),[[K,void 0,"contextmenu"]])}}}),Fe={key:0,class:"index text-right downloading"},Ee={key:2,class:"cover"},Oe={class:"artist-title"},je={class:"title"},Le={class:"artist"},Te={key:3,class:"album"},Ve={class:"duration text-center"},He=H({__name:"PlaylistEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},withMore:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:String,required:!1,default:null},artist:{type:String,required:!1,default:null},album:{type:String,required:!1,default:null}},emits:["update"],setup(s,{emit:F}){const E=re(),i=s,$=F,e=ce(),p=w(()=>i.song.id==e.song.id),y=B(!1),C=()=>{i.song.favourite=!i.song.favourite,_e(i.song.id,i.song.favourite)},f=w(()=>i.playlistId==null?e.playlist.id:i.playlistId),q=async()=>{if(f.value=="track"){e.loadPlaylist("track",i.song.id);return}if(f.value=="artist"){await e.loadPlaylist("artist",i.artist),e.loadSong(null,i.index);return}if(f.value=="album"){await e.loadPlaylist("album",i.album),e.loadSong(null,i.index);return}e.loadSong(f.value,i.index)},P=B(null),M=()=>{P.value.show()},_=()=>{$("update")},O=w(()=>E.isSongDownloading(i.song.id));return(A,m)=>{const b=h("router-link");return r(),I(Be,{ref:"ctxMenu",liked:s.song.favourite,playlistId:f.value,song:s.song,onEdit:M,onLike:C,onUpdate:_},{default:o(()=>[t(he,{ref_key:"updatePopup",ref:P,song:s.song,onUpdate:m[0]||(m[0]=k=>A.$emit("update"))},null,8,["song"]),d("div",{class:j([{playing:p.value,selected:s.selected,hovering:y.value,withCover:s.withCover,withAlbum:s.withAlbum,withMore:s.withMore},"playlist-entry"]),onDblclick:q,onMouseenter:m[1]||(m[1]=k=>y.value=!0),onMouseleave:m[2]||(m[2]=k=>y.value=!1)},[O.value?(r(),v("div",Fe,[t(me)])):(r(),v("div",{key:1,class:j([{"material-symbols-rounded":y.value},"index text-right"]),onClick:q},S(y.value?"play_arrow":s.index+1),3)),s.withCover?(r(),v("div",Ee,[t(ye,{src:s.song.cover,type:"track"},null,8,["src"])])):N("",!0),d("div",Oe,[d("span",je,[t(b,{to:`/track/${g(fe)(s.song.id)}`,class:"linkOnHover"},{default:o(()=>[t(V,{text:s.song.title},null,8,["text"])]),_:1},8,["to"])]),d("span",Le,[t(ve,{artist:s.song.artist,class:"text-muted text-xs"},null,8,["artist"])])]),s.withAlbum&&!g(ge)?(r(),v("div",Te,[t(b,{to:s.song.album.href,class:"linkOnHover"},{default:o(()=>[t(V,{text:s.song.album.name},null,8,["text"])]),_:1},8,["to"])])):N("",!0),s.selected||y.value||s.song.favourite?(r(),v("div",{key:4,class:j([{favourite:s.song.favourite},"favourite-icon icon text-right material-symbols-rounded"]),onClick:C},S(s.song.favourite?"favorite":"heart_plus"),3)):N("",!0),d("div",Ve,S(g(pe)(s.song.duration)),1)],34)]),_:1},8,["liked","playlistId","song"])}}});const ze=xe(He,[["__scopeId","data-v-67cfb148"]]);export{ze as P};
