import{M as b}from"./MiniPlayer.cc5dcaa5.js";import{_ as S,e as u,v as P,o as n,c as r,g as m,w as _,a as e,x as v,y as M,F as C,h as V,t as y,b as x,d as p,f as T,k as N,l as A}from"./index.8fd665a1.js";const I={components:{MiniPlayer:b},name:"AddSongToPlaylist",props:{cover:String,artist:String,title:String,preview:String,href:String,exists:{type:Boolean,default:!1}},data(){return{showModal:!1,selectedPlaylist:-1,track:{},playlists:[]}},methods:{preview(){console.log(this.href);const t=new CustomEvent("player.play",{detail:{artist:this.artist,title:this.title,source:this.href}});window.dispatchEvent(t)},share(){window.open(this.href)},close(){this.showModal=!1,this.$emit("close")},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.href})}).then(t=>t.json()).then(t=>{this.track=t})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")},add(){const t=this.track,s=this.playlists.findIndex(d=>d==this.selectedPlaylist);if(console.log(t,s),s<0){alert("no playlist selected");return}console.log(t,this.exists,s);let i=this.exists?{source:this.href}:{source:this.track.src,title:this.title,artist:this.artist,album:this.track.album,cover:this.cover};fetch(`/api/playlists/${s}/tracks`,{method:"POST",body:JSON.stringify(i)}).then(d=>{d.status==200&&(t.added=!0,this.close())})}},watch:{showModal(){!this.showModal||(fetch("/api/playlists").then(t=>t.json()).then(t=>{this.playlists.length=0,this.playlists.push(...t)}),this.loadMetadata())}}},h=t=>(N("data-v-3057693c"),t=t(),A(),t),B={class:"wrapper"},O={class:"header"},D=h(()=>e("h3",null,"Add song",-1)),E=h(()=>e("span",{class:"material-icons-round"}," close ",-1)),j=[E],F=h(()=>e("h4",null,"To Playlist",-1)),J=h(()=>e("br",null,null,-1)),U=["src"],L={class:"details"},q={class:"detailswrapper"},z={class:"confirm"};function G(t,s,i,d,a,o){const f=u("h7"),w=u("mini-player"),g=u("vue-final-modal"),k=P("observe-visibility");return n(),r("div",null,[m(g,{modelValue:a.showModal,"onUpdate:modelValue":s[6]||(s[6]=c=>a.showModal=c),classes:"modal-container","content-class":"modal-content"},{default:_(()=>{var c;return[e("div",B,[e("div",O,[D,e("button",{class:"modal-close",onClick:s[0]||(s[0]=(...l)=>o.close&&o.close(...l))},j)]),F,v(e("select",{"onUpdate:modelValue":s[1]||(s[1]=l=>a.selectedPlaylist=l)},[(n(!0),r(C,null,V(a.playlists,l=>(n(),r("option",{key:l},y(l),1))),128))],512),[[M,a.selectedPlaylist]]),J,e("div",null,[v((n(),r("div",{class:"padding-20 playlisteditor",onClick:s[4]||(s[4]=(...l)=>t.editPlaylist&&t.editPlaylist(...l))},[e("img",{class:"cover",src:i.cover},null,8,U),e("div",L,[e("div",q,[m(f,null,{default:_(()=>[x("Song")]),_:1}),i.href?(n(),r("span",{key:0,class:"material-symbols-rounded share",onClick:s[2]||(s[2]=(...l)=>o.share&&o.share(...l))},"share")):p("",!0),i.href?(n(),r("span",{key:1,class:"material-symbols-rounded share fill",onClick:s[3]||(s[3]=(...l)=>o.preview&&o.preview(...l))},"play_arrow")):p("",!0)]),e("h1",null,y(i.title),1),e("h5",null,y(i.artist),1)])])),[[k,t.headerVisibilityChanged]])]),e("div",z,[(c=a.track)!=null&&c.src?(n(),T(w,{key:0,class:"miniPlayer",title:i.title,artist:i.artist,src:a.track.src},null,8,["title","artist","src"])):p("",!0),e("button",{onClick:s[5]||(s[5]=(...l)=>o.add&&o.add(...l)),class:"negative"},"Add")])])]}),_:1},8,["modelValue"])])}const Q=S(I,[["render",G],["__scopeId","data-v-3057693c"]]);export{Q as A};