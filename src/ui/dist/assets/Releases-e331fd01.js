import{F as I}from"./FullShelf-204c8065.js";import{I as B}from"./ReleaseItem-53a37dde.js";import{_ as A}from"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-eb07cf96.js";import{_ as k,e as a,o,c as i,g as b,a as l,t as v,d as _,O as C,f as c,w as y,F as m,h as D}from"./index-24e68ff2.js";import{C as N}from"./CollectionHeader-ffab6106.js";import"./Form-fa2b8928.js";import"./IconButton-7756cddf.js";import"./Dropdown-229ee4f5.js";import"./Playlist-ea875b21.js";import"./PlaylistHeader-dcd775c6.js";import"./ExternalEntry-74801bac.js";import"./song-ff103b64.js";const x={components:{AddAlbumToPlaylist:A},name:"ReleaseItemBig",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,href:String,releaseDate:String}},R={class:"itemBig drop-shadow-md"},F=["src"],j={class:"wrapper"},L={key:0,class:"note"};function H(d,s,t,n,r,p){var h,f;const g=a("add-album-to-playlist");return o(),i("div",R,[b(g,{id:(h=this.href)==null?void 0:h.replace("https://open.spotify.com/album/",""),cover:t.cover,title:t.title,artist:t.artist,href:t.href,ref:"addAlbum",album:{id:(f=this.href)==null?void 0:f.replace("https://open.spotify.com/album/",""),title:this.title,artist:this.artist,cover:this.cover,href:this.href,releaseDate:this.releaseDate}},null,8,["id","cover","title","artist","href","album"]),l("div",{class:"item",onClick:s[0]||(s[0]=(...u)=>p.redirect&&p.redirect(...u))},[l("img",{src:t.cover},null,8,F),l("div",j,[l("h4",null,v(t.title),1),l("p",null,v(t.artist),1),t.releaseDate?(o(),i("p",L,"Released on "+v(t.releaseDate),1)):_("",!0)])])])}const O=k(x,[["render",H],["__scopeId","data-v-1f6d63df"]]);const V={components:{Loader:C,CollectionHeader:N,FullShelf:I,Item:B,ItemBig:O},name:"Releases",data(){return{outSoon:[],outNow:[],outAlready:[],loading:!0}},mounted(){this.loading=!0,fetch("/api/releases").then(d=>d.json()).then(d=>{const s=new Date;for(const t of d){const n=new Date(t.releaseDate);s<n?this.outSoon.push(t):s.getMonth()==n.getMonth()&&s.getDate()==n.getDate()&&s.getFullYear()==n.getFullYear()?this.outNow.push(t):this.outAlready.push(t)}this.loading=!1})}},M={key:0,class:"fill-page"},Y={class:"padding-20"},E={class:"releases"};function P(d,s,t,n,r,p){const g=a("Loader"),h=a("CollectionHeader"),f=a("item-big"),u=a("full-shelf"),w=a("ItemBig"),S=a("Item");return o(),i(m,null,[r.loading?(o(),i("div",M,[b(g)])):_("",!0),l("div",Y,[b(h),l("div",E,[r.outSoon.length?(o(),c(u,{key:0,heading:"Out Soon"},{default:y(()=>[(o(!0),i(m,null,D(r.outSoon,e=>(o(),c(f,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),r.outNow.length?(o(),c(u,{key:1,heading:"Out Now"},{default:y(()=>[(o(!0),i(m,null,D(r.outNow,e=>(o(),c(w,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0),r.outAlready.length?(o(),c(u,{key:2,heading:"Releases"},{default:y(()=>[(o(!0),i(m,null,D(r.outAlready,e=>(o(),c(S,{key:e.url,artist:e.artists.join(", "),cover:e.cover,href:e.url,releaseDate:e.releaseDate,title:e.title},null,8,["artist","cover","href","releaseDate","title"]))),128))]),_:1})):_("",!0)])])],64)}const ee=k(V,[["render",P],["__scopeId","data-v-164dabf1"]]);export{ee as default};