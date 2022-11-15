import{_ as h,e as u,q as m,s as _,o as f,c as w,r as x,g as t,w as o,b as c}from"./index.f2b9c799.js";const v={name:"FindSources",props:{artist:String,title:String,src:String},methods:{hide(){this.$refs.contextmenu.hide()},preview(){const e=new CustomEvent("player.play",{detail:{title:this.title,artist:this.artist,source:this.src}});window.dispatchEvent(e),this.$refs.contextmenu.hide()},show(e){const n=this.$refs.box.getBoundingClientRect(),r={top:n.height+n.top+window.scrollY,left:n.width+n.left+window.scrollX};this.$refs.contextmenu.show(r),e==null||e.stopPropagation()},openSoundcloud(){window.open(`https://soundcloud.com/search?q=${this.artist} ${this.title}`)},openAudius(){window.open(`https://audius.co/search/${this.artist} ${this.title}`)},openYoutubeMusic(){window.open(`https://music.youtube.com/search?q=${this.artist} ${this.title}`)},openSpotify(){window.open(`https://open.spotify.com/search/${this.artist} ${this.title}`)}}},C={ref:"box"};function S(e,n,r,k,$,i){const s=u("v-contextmenu-item"),d=u("v-contextmenu-divider"),a=u("v-contextmenu-submenu"),l=u("v-contextmenu"),p=m("contextmenu");return _((f(),w("div",C,[x(e.$slots,"default"),t(l,{ref:"contextmenu"},{default:o(()=>[t(s,{onClick:i.preview},{default:o(()=>[c("Preview")]),_:1},8,["onClick"]),t(d),t(a,{title:"Search on"},{default:o(()=>[t(s,{onClick:i.openSoundcloud},{default:o(()=>[c("Soundcloud")]),_:1},8,["onClick"]),t(s,{onClick:i.openAudius},{default:o(()=>[c("Audius")]),_:1},8,["onClick"]),t(s,{onClick:i.openYoutubeMusic},{default:o(()=>[c("Youtube Music")]),_:1},8,["onClick"]),t(s,{onClick:i.openSpotify},{default:o(()=>[c("Spotify")]),_:1},8,["onClick"])]),_:1})]),_:1},512)])),[[p,void 0,"contextmenu"]])}const g=h(v,[["render",S]]);export{g as F};
