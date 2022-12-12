import{F as k}from"./FullShelf.635f9c45.js";import{I}from"./ReleaseItem.52e10a3e.js";import{_ as B}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang.e49e81db.js";import{_ as b,e as n,o as s,c as u,g as w,a as c,t as g,d as h,f as i,w as v,F as y,h as D}from"./index.789939b0.js";import{C as A}from"./CollectionHeader.604106ba.js";import"./song.21840599.js";import"./TrackInfo.2257f372.js";import"./MiniPlayer.d7ae9c7c.js";const C={components:{AddAlbumToPlaylist:B},name:"ReleaseItemBig",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,href:String,releaseDate:String}},N={class:"itemBig drop-shadow-md"},x=["src"],R={class:"wrapper"},F={key:0,class:"note"};function j(_,o,t,a,r,f){var d,l;const m=n("add-album-to-playlist");return s(),u("div",N,[w(m,{id:(d=this.href)==null?void 0:d.replace("https://open.spotify.com/album/",""),cover:t.cover,title:t.title,artist:t.artist,href:t.href,ref:"addAlbum",album:{id:(l=this.href)==null?void 0:l.replace("https://open.spotify.com/album/",""),title:this.title,artist:this.artist,cover:this.cover,href:this.href}},null,8,["id","cover","title","artist","href","album"]),c("div",{class:"item",onClick:o[0]||(o[0]=(...p)=>f.redirect&&f.redirect(...p))},[c("img",{src:t.cover},null,8,x),c("div",R,[c("h4",null,g(t.title),1),c("p",null,g(t.artist),1),t.releaseDate?(s(),u("p",F,"Released on "+g(t.releaseDate),1)):h("",!0)])])])}const H=b(C,[["render",j],["__scopeId","data-v-75fe1887"]]);const V={components:{CollectionHeader:A,FullShelf:k,Item:I,ItemBig:H},name:"Releases",data(){return{outSoon:[],outNow:[],outAlready:[]}},mounted(){fetch("/api/releases").then(_=>_.json()).then(_=>{const o=new Date;for(const t of _){const a=new Date(t.releaseDate);o<a?this.outSoon.push(t):o.getMonth()==a.getMonth()&&o.getDate()==a.getDate()&&o.getFullYear()==a.getFullYear()?this.outNow.push(t):this.outAlready.push(t)}})}},M={class:"padding-20"},O={class:"releases"};function Y(_,o,t,a,r,f){const m=n("CollectionHeader"),d=n("item-big"),l=n("full-shelf"),p=n("ItemBig"),S=n("Item");return s(),u("div",M,[w(m),c("div",O,[r.outSoon.length?(s(),i(l,{key:0,heading:"Out Soon"},{default:v(()=>[(s(!0),u(y,null,D(r.outSoon,e=>(s(),i(d,{key:e.url,releaseDate:e.releaseDate,cover:e.cover,href:e.url,artist:e.artists.join(", "),title:e.title},null,8,["releaseDate","cover","href","artist","title"]))),128))]),_:1})):h("",!0),r.outNow.length?(s(),i(l,{key:1,heading:"Out Now"},{default:v(()=>[(s(!0),u(y,null,D(r.outNow,e=>(s(),i(p,{key:e.url,releaseDate:e.releaseDate,cover:e.cover,href:e.url,artist:e.artists.join(", "),title:e.title},null,8,["releaseDate","cover","href","artist","title"]))),128))]),_:1})):h("",!0),r.outAlready.length?(s(),i(l,{key:2,heading:"Releases"},{default:v(()=>[(s(!0),u(y,null,D(r.outAlready,e=>(s(),i(S,{key:e.url,releaseDate:e.releaseDate,cover:e.cover,href:e.url,artist:e.artists.join(", "),title:e.title},null,8,["releaseDate","cover","href","artist","title"]))),128))]),_:1})):h("",!0)])])}const K=b(V,[["render",Y],["__scopeId","data-v-aaa9aa10"]]);export{K as default};
