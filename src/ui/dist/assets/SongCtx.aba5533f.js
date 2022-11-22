import{i as C,A as y,e as r,v as g,x,o as d,c as p,r as $,g as e,w as n,b as a,t as h,f,d as S,F as b,h as B,u as D}from"./index.8fd665a1.js";const A={ref:"box"},N={name:"SongCtx",props:{liked:Boolean,isAutoPlaylist:Boolean,src:String,artist:String,title:String},methods:{preview(){const t=new CustomEvent("player.play",{detail:{title:this.title,artist:this.artist,source:this.src}});window.dispatchEvent(t),this.$refs.contextmenu.hide()},hide(){this.$refs.contextmenu.hide()},show(t){const o=this.$refs.box.getBoundingClientRect(),c={top:o.height+o.top+window.scrollY,left:o.width+o.left+window.scrollX};this.$refs.contextmenu.show(c),t==null||t.stopPropagation()},like(){this.$emit("like")},remove(){this.$emit("remove")},addto(t){if(t==="new"){fetch("/api/playlists/new").then(o=>o.text()).then(o=>{this.$emit("addto",Number(o.replace("/playlist/","")))});return}this.$emit("addto",t)},download(){this.$emit("download")},update(){this.$emit("update")}}},E=Object.assign(N,{setup(t){const o=C(),c=y(()=>o.playlists);return(i,u)=>{const s=r("v-contextmenu-item"),l=r("v-contextmenu-divider"),v=r("v-contextmenu-submenu"),_=r("v-contextmenu"),k=g("contextmenu");return x((d(),p("div",A,[$(i.$slots,"default"),e(_,{ref:"contextmenu"},{default:n(()=>[e(s,{onClick:i.preview},{default:n(()=>[a("Preview")]),_:1},8,["onClick"]),e(l),e(s,{onClick:i.like},{default:n(()=>[a(h((t.liked?"Remove from":"Save to")+" your Liked Songs"),1)]),_:1},8,["onClick"]),t.isAutoPlaylist?S("",!0):(d(),f(s,{key:0,onClick:i.remove},{default:n(()=>[a("Remove from this playlist")]),_:1},8,["onClick"])),e(v,{title:"Add to playlist"},{default:n(()=>[e(s,{onClick:u[0]||(u[0]=()=>i.addto("new"))},{default:n(()=>[a("Add to new playlist")]),_:1}),e(l),(d(!0),p(b,null,B(D(c),(w,m)=>(d(),f(s,{key:m,onClick:()=>i.addto(m)},{default:n(()=>[a(h(w.name),1)]),_:2},1032,["onClick"]))),128))]),_:1}),e(l),e(s,{onClick:i.update},{default:n(()=>[a("Update Metadata")]),_:1},8,["onClick"]),e(l),e(s,{onClick:i.download},{default:n(()=>[a("Download")]),_:1},8,["onClick"])]),_:1},512)])),[[k,void 0,"contextmenu"]])}}});export{E as _};
