import{F as S}from"./FullShelf-40d936fe.js";import{I}from"./ReleaseItem-4921e0af.js";import{_ as B}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-d45c5d20.js";import{_ as w,C as A,o,f as l,w as m,g as k,a as i,t as D,c as u,d as _,e as a,L as N,F as f,i as b}from"./index-b250113a.js";import{C as x}from"./CollectionHeader-f351a395.js";import"./Form-5d19c4aa.js";import"./IconButton-294a6ada.js";import"./Dropdown-b9458b5d.js";import"./Playlist-646910dc.js";import"./PlaylistHeader-04d18429.js";import"./ExternalEntry-bb4fc2ef.js";import"./song-9e4416db.js";const R={components:{Card:A,AddAlbumToPlaylist:B},name:"ReleaseItemBig",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,href:String,releaseDate:String}},F=["src"],L={class:"wrapper"},j={key:0,class:"note"};function H(d,s,t,n,r,p){const g=a("add-album-to-playlist"),v=a("Card");return o(),l(v,{class:"itemBig","with-hover":""},{default:m(()=>{var h,c;return[k(g,{id:(h=this.href)==null?void 0:h.replace("https://open.spotify.com/album/",""),ref:"addAlbum",album:{id:(c=this.href)==null?void 0:c.replace("https://open.spotify.com/album/",""),title:this.title,artist:this.artist,cover:this.cover,href:this.href,releaseDate:this.releaseDate},artist:t.artist,cover:t.cover,href:t.href,title:t.title},null,8,["id","album","artist","cover","href","title"]),i("div",{class:"item",onClick:s[0]||(s[0]=(...y)=>p.redirect&&p.redirect(...y))},[i("img",{src:t.cover},null,8,F),i("div",L,[i("h4",null,D(t.title),1),i("p",null,D(t.artist),1),t.releaseDate?(o(),u("p",j,"Released on "+D(t.releaseDate),1)):_("",!0)])])]}),_:1})}const V=w(R,[["render",H],["__scopeId","data-v-d9a455f1"]]);const M={components:{Loader:N,CollectionHeader:x,FullShelf:S,Item:I,ItemBig:V},name:"Releases",data(){return{outSoon:[],outNow:[],outAlready:[],loading:!0}},mounted(){this.loading=!0,fetch("/api/releases").then(d=>d.json()).then(d=>{const s=new Date;for(const t of d){const n=new Date(t.releaseDate);s<n?this.outSoon.push(t):s.getMonth()==n.getMonth()&&s.getDate()==n.getDate()&&s.getFullYear()==n.getFullYear()?this.outNow.push(t):this.outAlready.push(t)}this.loading=!1})}},O={key:0,class:"fill-page"},Y={class:"padding-20"},E={class:"releases"};function P(d,s,t,n,r,p){const g=a("Loader"),v=a("CollectionHeader"),h=a("item-big"),c=a("full-shelf"),y=a("ItemBig"),C=a("Item");return o(),u(f,null,[r.loading?(o(),u("div",O,[k(g)])):_("",!0),i("div",Y,[k(v),i("div",E,[r.outSoon.length?(o(),l(c,{key:0,heading:"Out Soon"},{default:m(()=>[(o(!0),u(f,null,b(r.outSoon,e=>(o(),l(h,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),r.outNow.length?(o(),l(c,{key:1,heading:"Out Now"},{default:m(()=>[(o(!0),u(f,null,b(r.outNow,e=>(o(),l(y,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),r.outAlready.length?(o(),l(c,{key:2,heading:"Releases"},{default:m(()=>[(o(!0),u(f,null,b(r.outAlready,e=>(o(),l(C,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0)])])],64)}const ee=w(M,[["render",P],["__scopeId","data-v-164dabf1"]]);export{ee as default};
