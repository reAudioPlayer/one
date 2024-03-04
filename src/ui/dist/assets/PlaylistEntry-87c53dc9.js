import{e as H,j as W,D as w,n as B,f as h,ac as X,a2 as G,o as r,c as y,r as J,g as t,w as o,b as u,F as L,h as T,i as N,t as S,u as g,cL as Z,cM as ee,cN as te,d as I,aj as se,cO as oe,a as i,ab as ne,ar as ae,x as le,aF as ie,cP as de,ae as ue,aI as re,a6 as ce,cQ as me,O as j,H as fe,M as V,A as ve,K as ye,cR as ge,ai as pe,cS as _e,_ as xe}from"./index-2d688a36.js";import{_ as he}from"./EditSong.vue_vue_type_script_setup_true_lang-20543fe4.js";import{p as we}from"./playerInPicture-af203fdf.js";const be=i("span",{class:"material-symbols-rounded"},"preview",-1),ke=i("span",{class:"material-symbols-rounded"},"search",-1),Se=i("span",{class:"material-symbols-rounded"},"queue_music",-1),$e=i("span",{class:"material-symbols-rounded"}," play_arrow ",-1),Ce=i("span",{class:"material-symbols-rounded"}," add_to_queue ",-1),qe=i("span",{class:"material-symbols-rounded"}," queue_play_next ",-1),Pe=i("span",{class:"material-symbols-rounded"},"delete",-1),Me=i("span",{class:"material-symbols-rounded"},"playlist_add",-1),Ae=i("span",{class:"material-symbols-rounded"},"edit",-1),De=i("span",{class:"material-symbols-rounded"},"file_download",-1),Ne=i("span",{class:"material-symbols-rounded"},"replay",-1),Ie=i("span",{class:"material-symbols-rounded"},"share",-1),Be=H({__name:"SongContext",props:{song:{type:Object,required:!0},playlistId:{type:String,required:!1,default:""}},emits:["update","edit"],setup(s,{expose:F,emit:E}){const d=W(),$=w(()=>d.playlists.filter(n=>n.type==="classic")),e=s,p=E,f=w(()=>e.playlistId==-1),C=()=>{we(e.song.artist,e.song.title,e.song.source)},v=async n=>{var l;n!=-1&&(await ne(n,e.song),ae.addSuccess(e.song.title,`Added to ${(l=$.value.find(a=>a.id==n))==null?void 0:l.name}`,3e3),p("update"))},q=async()=>{const n=await le(e.song.title,e.song.artist,e.song.cover);await v(n),p("update")},P=async()=>{await ie(e.playlistId,e.song.id),p("update")},M=B(null),_=B(null),O=()=>{_.value.visible?A():m()},A=()=>{_.value.hide()},m=()=>{const n=M.value.getBoundingClientRect(),l={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};_.value.show(l)};F({show:m,toggle:O,hide:A});const b=w(()=>({Soundcloud:`https://soundcloud.com/search?q=${e.song.artist} ${e.song.title}`,Audius:`https://audius.co/search/${e.song.artist} ${e.song.title}`,"Youtube Music":`https://music.youtube.com/search?q=${e.song.artist} ${e.song.title}`,Spotify:`https://open.spotify.com/search/${e.song.artist} ${e.song.title}`})),k=()=>{p("edit")},R=n=>{window.open(b.value[n]),k()},U=()=>{const n=de(e.song);ue(n,`${e.song.artist} - ${e.song.title}`)};return(n,l)=>{const a=h("v-contextmenu-item"),D=h("v-contextmenu-submenu"),x=h("v-contextmenu-divider"),Y=h("v-context-menu-divider"),z=h("v-contextmenu"),K=X("contextmenu");return G((r(),y("div",{ref_key:"box",ref:M},[J(n.$slots,"default"),t(z,{ref_key:"contextmenu",ref:_},{default:o(()=>[t(a,{onClick:C},{default:o(()=>[be,u(" Preview ")]),_:1}),t(a,null,{default:o(()=>[ke,t(D,{title:"Find source"},{default:o(()=>[(r(!0),y(L,null,T(Object.keys(b.value),c=>(r(),N(a,{key:c,onClick:Q=>R(c)},{default:o(()=>[u(S(c),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1}),t(x),t(a,null,{default:o(()=>[Se,t(D,{title:"Add to queue"},{default:o(()=>[t(a,{onClick:l[0]||(l[0]=()=>g(Z)(e.song.id))},{default:o(()=>[$e,u(" Play Now ")]),_:1}),t(a,{onClick:l[1]||(l[1]=()=>g(ee)(e.song.id))},{default:o(()=>[Ce,u(" Play Next ")]),_:1}),t(a,{onClick:l[2]||(l[2]=()=>g(te)(e.song.id))},{default:o(()=>[qe,u(" Play Last ")]),_:1})]),_:1})]),_:1}),t(x),t(Y),f.value?I("",!0):(r(),N(a,{key:0,onClick:P},{default:o(()=>[Pe,u(" Remove from this playlist ")]),_:1})),t(a,null,{default:o(()=>[Me,t(D,{title:"Add to playlist"},{default:o(()=>[t(a,{onClick:q},{default:o(()=>[u(" Add to new playlist ")]),_:1}),t(x),(r(!0),y(L,null,T($.value,c=>(r(),N(a,{key:c.id,onClick:Q=>v(c.id)},{default:o(()=>[u(S(c.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1}),t(x),t(a,{onClick:k},{default:o(()=>[Ae,u(" Edit ")]),_:1}),t(x),t(a,{onClick:l[3]||(l[3]=c=>g(se)(s.song.id))},{default:o(()=>[De,u(" Download ")]),_:1}),t(a,{onClick:l[4]||(l[4]=c=>g(oe)(s.song.id))},{default:o(()=>[Ne,u(" Uncache ")]),_:1}),t(x),t(a,null,{default:o(()=>[Ie,t(D,{title:"Export..."},{default:o(()=>[t(a,{onClick:l[5]||(l[5]=c=>U())},{default:o(()=>[u(" to file ")]),_:1})]),_:1})]),_:1})]),_:1},512)])),[[K,void 0,"contextmenu"]])}}}),Fe={key:0,class:"index text-right downloading"},Ee={key:2,class:"cover"},Oe={class:"artist-title"},je={class:"title"},Le={class:"artist"},Te={key:3,class:"album"},Ve={class:"duration text-center"},He=H({__name:"PlaylistEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},withMore:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:String,required:!1,default:null},artist:{type:String,required:!1,default:null},album:{type:String,required:!1,default:null}},emits:["update"],setup(s,{emit:F}){const E=re(),d=s,$=F,e=ce(),p=w(()=>d.song.id==e.song.id),f=B(!1),C=()=>{d.song.favourite=!d.song.favourite,_e(d.song.id,d.song.favourite)},v=w(()=>d.playlistId==null?e.playlist.id:d.playlistId),q=async()=>{if(v.value=="track"){e.loadPlaylist("track",d.song.id);return}if(v.value=="artist"){await e.loadPlaylist("artist",d.artist),e.loadSong(null,d.index);return}if(v.value=="album"){await e.loadPlaylist("album",d.album),e.loadSong(null,d.index);return}e.loadSong(v.value,d.index)},P=B(null),M=()=>{P.value.show()},_=()=>{$("update")},O=w(()=>E.isSongDownloading(d.song.id));return(A,m)=>{const b=h("router-link");return r(),N(Be,{ref:"ctxMenu",liked:s.song.favourite,playlistId:v.value,song:s.song,onEdit:M,onLike:C,onUpdate:_},{default:o(()=>[t(he,{ref_key:"updatePopup",ref:P,song:s.song,onUpdate:m[0]||(m[0]=k=>A.$emit("update"))},null,8,["song"]),i("div",{class:j([{playing:p.value,selected:s.selected,hovering:f.value,withCover:s.withCover,withAlbum:s.withAlbum,withMore:s.withMore},"playlist-entry"]),onDblclick:q,onMouseenter:m[1]||(m[1]=k=>f.value=!0),onMouseleave:m[2]||(m[2]=k=>f.value=!1)},[O.value?(r(),y("div",Fe,[t(me)])):(r(),y("div",{key:1,class:j([{"material-symbols-rounded":f.value},"index text-right"]),onClick:q},S(f.value?"play_arrow":s.index+1),3)),s.withCover?(r(),y("div",Ee,[t(fe,{src:s.song.cover,type:"track"},null,8,["src"])])):I("",!0),i("div",Oe,[i("span",je,[t(b,{to:`/track/${g(ve)(s.song.id)}`,class:"linkOnHover"},{default:o(()=>[t(V,{text:s.song.title},null,8,["text"])]),_:1},8,["to"])]),i("span",Le,[t(ye,{artist:s.song.artist,class:"text-muted text-xs"},null,8,["artist"])])]),s.withAlbum&&!g(ge)?(r(),y("div",Te,[t(b,{to:s.song.album.href,class:"linkOnHover"},{default:o(()=>[t(V,{text:s.song.album.name},null,8,["text"])]),_:1},8,["to"])])):I("",!0),s.selected||f.value||s.song.favourite?(r(),y("div",{key:4,class:j([{favourite:s.song.favourite},"favourite-icon icon text-right material-symbols-rounded"]),onClick:C},S(s.song.favourite?"favorite":"heart_plus"),3)):I("",!0),i("div",Ve,S(g(pe)(s.song.duration)),1)],34)]),_:1},8,["liked","playlistId","song"])}}});const ze=xe(He,[["__scopeId","data-v-67cfb148"]]);export{ze as P};
