import{F as S}from"./FullShelf-b301c76a.js";import{I}from"./ReleaseItem-b0280589.js";import{_ as B}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-de8b4d89.js";import{_ as w,C as A,o,f as i,w as m,g as k,a as l,t as D,c as u,d as _,e as a,L as N,F as f,i as b}from"./index-a21b7814.js";import{C as x}from"./CollectionHeader-879e8bea.js";import"./Template-6d1fbb86.js";import"./IconButton-d131a59b.js";import"./Form-90b03f50.js";import"./Dropdown-3bb770a9.js";import"./Playlist-b3012551.js";import"./PlaylistHeader-235481c1.js";import"./ExternalEntry-9173684c.js";import"./song-09082ef7.js";const R={components:{Card:A,AddAlbumToPlaylist:B},name:"ReleaseItemBig",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,href:String,releaseDate:String}},F=["src"],L={class:"wrapper"},j={key:0,class:"note"};function H(d,r,t,n,s,p){const g=a("add-album-to-playlist"),v=a("Card");return o(),i(v,{class:"itemBig","with-hover":""},{default:m(()=>{var h,c;return[k(g,{id:(h=this.href)==null?void 0:h.replace("https://open.spotify.com/album/",""),ref:"addAlbum",album:{id:(c=this.href)==null?void 0:c.replace("https://open.spotify.com/album/",""),title:this.title,artist:this.artist,cover:this.cover,href:this.href,releaseDate:this.releaseDate},artist:t.artist,cover:t.cover,href:t.href,title:t.title},null,8,["id","album","artist","cover","href","title"]),l("div",{class:"item",onClick:r[0]||(r[0]=(...y)=>p.redirect&&p.redirect(...y))},[l("img",{src:t.cover},null,8,F),l("div",L,[l("h4",null,D(t.title),1),l("p",null,D(t.artist),1),t.releaseDate?(o(),u("p",j,"Released on "+D(t.releaseDate),1)):_("",!0)])])]}),_:1})}const V=w(R,[["render",H],["__scopeId","data-v-a069bd39"]]);const M={components:{Loader:N,CollectionHeader:x,FullShelf:S,Item:I,ItemBig:V},name:"Releases",data(){return{outSoon:[],outNow:[],outAlready:[],loading:!0}},mounted(){this.loading=!0,fetch("/api/releases").then(d=>d.json()).then(d=>{const r=new Date;for(const t of d){const n=new Date(t.releaseDate);r<n?this.outSoon.push(t):r.getMonth()==n.getMonth()&&r.getDate()==n.getDate()&&r.getFullYear()==n.getFullYear()?this.outNow.push(t):this.outAlready.push(t)}this.loading=!1})}},O={key:0,class:"fill-page"},Y={class:"padding-20"},E={class:"releases"};function P(d,r,t,n,s,p){const g=a("Loader"),v=a("CollectionHeader"),h=a("item-big"),c=a("full-shelf"),y=a("ItemBig"),C=a("Item");return o(),u(f,null,[s.loading?(o(),u("div",O,[k(g)])):_("",!0),l("div",Y,[k(v),l("div",E,[s.outSoon.length?(o(),i(c,{key:0,heading:"Out Soon"},{default:m(()=>[(o(!0),u(f,null,b(s.outSoon,e=>(o(),i(h,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),s.outNow.length?(o(),i(c,{key:1,heading:"Out Now"},{default:m(()=>[(o(!0),u(f,null,b(s.outNow,e=>(o(),i(y,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),s.outAlready.length?(o(),i(c,{key:2,heading:"Releases"},{default:m(()=>[(o(!0),u(f,null,b(s.outAlready,e=>(o(),i(C,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0)])])],64)}const te=w(M,[["render",P],["__scopeId","data-v-164dabf1"]]);export{te as default};
