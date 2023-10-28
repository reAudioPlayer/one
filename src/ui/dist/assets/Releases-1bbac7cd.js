import{F as S}from"./FullShelf-5df78564.js";import{I}from"./ReleaseItem-8295fb04.js";import{_ as B}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-b78e00ff.js";import{_ as w,C as A,e as a,f as l,w as m,o,g as k,a as i,t as D,c as u,d,L as N,F as f,j as b}from"./index-84a1fb6c.js";import{C as x}from"./CollectionHeader-4888838c.js";import"./Template-01430bb1.js";import"./IconButton-f2c30e74.js";import"./Form-5ea1f8d4.js";import"./Playlist-0e742198.js";import"./PlaylistHeader-0a2fe8da.js";import"./ExternalEntry-ee6c0fc4.js";const R={components:{Card:A,AddAlbumToPlaylist:B},name:"ReleaseItemBig",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,href:String,releaseDate:String}},F=["src"],j={class:"wrapper"},L={key:0,class:"note"};function H(_,s,t,n,r,p){const g=a("add-album-to-playlist"),v=a("Card");return o(),l(v,{class:"itemBig","with-hover":""},{default:m(()=>{var h,c;return[k(g,{id:(h=this.href)==null?void 0:h.replace("https://open.spotify.com/album/",""),ref:"addAlbum",album:{id:(c=this.href)==null?void 0:c.replace("https://open.spotify.com/album/",""),title:this.title,artist:this.artist,cover:this.cover,href:this.href,releaseDate:this.releaseDate},artist:t.artist,cover:t.cover,href:t.href,title:t.title},null,8,["id","album","artist","cover","href","title"]),i("div",{class:"item",onClick:s[0]||(s[0]=(...y)=>p.redirect&&p.redirect(...y))},[i("img",{src:t.cover},null,8,F),i("div",j,[i("h4",null,D(t.title),1),i("p",null,D(t.artist),1),t.releaseDate?(o(),u("p",L,"Released on "+D(t.releaseDate),1)):d("",!0)])])]}),_:1})}const V=w(R,[["render",H],["__scopeId","data-v-a069bd39"]]),M={components:{Loader:N,CollectionHeader:x,FullShelf:S,Item:I,ItemBig:V},name:"Releases",data(){return{outSoon:[],outNow:[],outAlready:[],loading:!0}},mounted(){this.loading=!0,fetch("/api/releases").then(_=>_.json()).then(_=>{const s=new Date;for(const t of _){const n=new Date(t.releaseDate);s<n?this.outSoon.push(t):s.getMonth()==n.getMonth()&&s.getDate()==n.getDate()&&s.getFullYear()==n.getFullYear()?this.outNow.push(t):this.outAlready.push(t)}this.loading=!1})}};const O={key:0,class:"fill-page"},Y={class:"padding-20"},E={class:"releases"};function P(_,s,t,n,r,p){const g=a("Loader"),v=a("CollectionHeader"),h=a("item-big"),c=a("full-shelf"),y=a("ItemBig"),C=a("Item");return o(),u(f,null,[r.loading?(o(),u("div",O,[k(g)])):d("",!0),i("div",Y,[k(v),i("div",E,[r.outSoon.length?(o(),l(c,{key:0,heading:"Out Soon"},{default:m(()=>[(o(!0),u(f,null,b(r.outSoon,e=>(o(),l(h,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):d("",!0),r.outNow.length?(o(),l(c,{key:1,heading:"Out Now"},{default:m(()=>[(o(!0),u(f,null,b(r.outNow,e=>(o(),l(y,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):d("",!0),r.outAlready.length?(o(),l(c,{key:2,heading:"Releases"},{default:m(()=>[(o(!0),u(f,null,b(r.outAlready,e=>(o(),l(C,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):d("",!0)])])],64)}const $=w(M,[["render",P],["__scopeId","data-v-08907f69"]]);export{$ as default};
