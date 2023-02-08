import{m as R,j as z,E as M,n as P,y as J,o as l,c as y,r as K,g as o,w as s,b as d,F as V,i as L,f as I,t as p,u as v,d as x,e as b,I as W,J as X,a as g,C as E,h as G,M as F,v as Q,K as Z,_ as ee}from"./index.458fd4ed.js";import{_ as te}from"./EditSong.vue_vue_type_script_setup_true_lang.d5c5fc55.js";import{p as oe}from"./playerInPicture.37a9ab56.js";import{a as ne,c as se,r as ae,d as le,f as ie}from"./song.d5ee386f.js";const ue=R({__name:"SongContext",props:{song:{type:Object,required:!0},playlistId:{type:Number,required:!1,default:-1}},emits:["update","edit"],setup(e,{expose:A,emit:a}){const t=e,B=z(),i=M(()=>B.playlists),C=M(()=>t.playlistId==-1),$=()=>{oe(t.song.artist,t.song.title,t.song.source)},h=async n=>{n!=-1&&await ne(n,t.song)},_=async()=>{const n=await se(t.song.title,t.song.artist,t.song.cover);h(n)},N=async()=>{await ae(t.playlistId,t.song.id),a("update")},S=P(null),f=P(null),u=()=>{f.value.visible?k():w()},k=()=>{f.value.hide()},w=()=>{const n=S.value.getBoundingClientRect(),m={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};f.value.show(m)};A({show:w,toggle:u,hide:k});const O={Soundcloud:`https://soundcloud.com/search?q=${t.song.artist} ${t.song.title}`,Audius:`https://audius.co/search/${t.song.artist} ${t.song.title}`,"Youtube Music":`https://music.youtube.com/search?q=${t.song.artist} ${t.song.title}`,Spotify:`https://open.spotify.com/search/${t.song.artist} ${t.song.title}`},j=()=>{a("edit")},U=n=>{window.open(O[n]),j()};return(n,m)=>{const r=b("v-contextmenu-item"),T=b("v-contextmenu-submenu"),q=b("v-contextmenu-divider"),H=b("v-contextmenu"),Y=W("contextmenu");return J((l(),y("div",{ref_key:"box",ref:S},[K(n.$slots,"default"),o(H,{ref_key:"contextmenu",ref:f},{default:s(()=>[o(r,{onClick:$},{default:s(()=>[d(" Preview ")]),_:1}),o(T,{title:"Find source"},{default:s(()=>[(l(!0),y(V,null,L(Object.keys(O),c=>(l(),I(r,{key:c,onClick:D=>U(c)},{default:s(()=>[d(p(c),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(q),o(r,{onClick:m[0]||(m[0]=c=>n.$emit("like"))},{default:s(()=>[d(p((e.song.favourite?"Remove from":"Save to")+" your Liked Songs"),1)]),_:1}),v(C)?x("",!0):(l(),I(r,{key:0,onClick:N},{default:s(()=>[d(" Remove from this playlist ")]),_:1})),o(T,{title:"Add to playlist"},{default:s(()=>[o(r,{onClick:_},{default:s(()=>[d("Add to new playlist")]),_:1}),o(q),(l(!0),y(V,null,L(v(i),(c,D)=>(l(),I(r,{key:D,onClick:ye=>h(D)},{default:s(()=>[d(p(c.name),1)]),_:2},1032,["onClick"]))),128))]),_:1}),o(q),o(r,{onClick:j},{default:s(()=>[d(" Update Metadata ")]),_:1}),o(q),o(r,{onClick:m[1]||(m[1]=c=>v(le)(e.song.id))},{default:s(()=>[d("Download")]),_:1})]),_:1},512)])),[[Y,void 0,"contextmenu"]])}}}),re={key:0,class:"cover"},de={class:"artist-title"},ce={class:"title"},ve={class:"artist"},fe={key:1,class:"album"},me={class:"duration text-center"},ge=R({__name:"PlaylistEntry",props:{song:{type:Object,required:!0},index:{type:Number,required:!0},withCover:{type:Boolean,required:!1,default:!1},withAlbum:{type:Boolean,required:!1,default:!1},withMore:{type:Boolean,required:!1,default:!1},selected:{type:Boolean,required:!1,default:!1},playlistId:{type:Number,required:!1,default:null}},emits:["update"],setup(e,{emit:A}){const a=e,t=X(),B=M(()=>a.song.id==t.song.id),i=P(!1),C=()=>{a.song.favourite=!a.song.favourite,ie(a.song.id,a.song.favourite)},$=M(()=>a.playlistId==null?t.playlist.id:a.playlistId),h=()=>{t.loadSong($.value,a.index)},_=P(null),N=()=>{_.value.show()},S=()=>{A("update")};return(f,u)=>{const k=b("router-link");return l(),I(ue,{ref:"ctxMenu",liked:e.song.favourite,playlistId:v($),song:e.song,onEdit:N,onLike:C,onUpdate:S},{default:s(()=>[o(te,{ref_key:"updatePopup",ref:_,song:e.song,onUpdate:u[0]||(u[0]=w=>f.$emit("update"))},null,8,["song"]),g("div",{class:E([{playing:v(B),selected:e.selected,hovering:i.value,withCover:e.withCover,withAlbum:e.withAlbum,withMore:e.withMore},"playlist-entry"]),onDblclick:h,onMouseenter:u[2]||(u[2]=w=>i.value=!0),onMouseleave:u[3]||(u[3]=w=>i.value=!1)},[g("div",{class:E([{"material-symbols-rounded":i.value},"index text-right"]),onClick:h},p(i.value?"play_arrow":e.index+1),3),e.withCover?(l(),y("div",re,[o(G,{src:e.song.cover,type:"track"},null,8,["src"])])):x("",!0),g("div",de,[g("span",ce,[o(k,{to:`/track/${v(Q)(e.song.id)}`,class:"linkOnHover"},{default:s(()=>[o(F,{text:e.song.title},null,8,["text"])]),_:1},8,["to"])]),g("span",ve,[o(k,{to:`/search/artist:${e.song.artist}`,class:"linkOnHover"},{default:s(()=>[o(F,{text:e.song.artist},null,8,["text"])]),_:1},8,["to"])])]),e.withAlbum&&!v(Z)?(l(),y("div",fe,[o(F,{text:e.song.album},null,8,["text"])])):x("",!0),e.selected||i.value||e.song.favourite?(l(),y("div",{key:2,class:E([{favourite:e.song.favourite},"favourite-icon icon text-right material-symbols-rounded"]),onClick:C},p(e.song.favourite?"favorite":"heart_plus"),3)):x("",!0),g("div",me,p(e.song.duration=="-1:59"?"N/A":e.song.duration),1),x("",!0)],34)]),_:1},8,["liked","playlistId","song"])}}});const xe=ee(ge,[["__scopeId","data-v-2ee6be8d"]]);export{xe as P};
