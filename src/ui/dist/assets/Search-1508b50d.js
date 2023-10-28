import{A as x}from"./ArtistItem-a6248e86.js";import{I as q}from"./ReleaseItem-8295fb04.js";import{_ as B}from"./ExternalEntry-ee6c0fc4.js";import{_ as S,C as T,h as w,e as c,o as e,f as o,w as d,g as k,a,t as p,c as n,d as f,r as L,L as D,F as y,j as g,m as N,n as F}from"./index-84a1fb6c.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-b78e00ff.js";import"./Template-01430bb1.js";import"./IconButton-f2c30e74.js";import"./Form-5ea1f8d4.js";import"./Playlist-0e742198.js";import"./PlaylistHeader-0a2fe8da.js";const V={components:{Card:T,Cover:w,AddSongToPlaylist:B},name:"SearchItem",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,releaseDate:String,href:String,preview:String}},j={key:0,class:"note"};function E(r,l,s,I,i,h){const _=c("add-song-to-playlist"),v=c("Cover"),u=c("Card");return e(),o(u,{class:"wrapper","with-hover":""},{default:d(()=>[k(_,{ref:"addAlbum",song:{cover:s.cover,artist:s.artist,title:s.title,preview:s.preview,href:s.href}},null,8,["song"]),a("div",{class:"item",onClick:l[0]||(l[0]=(...m)=>h.redirect&&h.redirect(...m))},[k(v,{src:s.cover},null,8,["src"]),a("h4",null,p(s.title),1),a("p",null,p(s.artist),1),s.releaseDate?(e(),n("p",j,"Released on "+p(s.releaseDate),1)):f("",!0)])]),_:1})}const O=S(V,[["render",E],["__scopeId","data-v-1172913f"]]);const P={name:"Shelf",props:{heading:String,href:String},methods:{redirect(){this.href&&this.$router.push(this.href)}}},J={class:"shelf"},R={key:0,class:"header"},Y={class:"items"};function $(r,l,s,I,i,h){return e(),n("div",J,[s.heading?(e(),n("div",R,[a("h2",null,p(s.heading),1),a("h5",{onClick:l[0]||(l[0]=(..._)=>h.redirect&&h.redirect(..._))},"See All")])):f("",!0),a("div",Y,[L(r.$slots,"default",{},void 0,!0)])])}const z=S(P,[["render",$],["__scopeId","data-v-a60bb56d"]]);const G={name:"TrackItem",components:{Card:T,Cover:w},methods:{redirect(){console.log("redirect"),this.$router.push(this.href)}},props:{cover:String,title:String,artist:String,href:String}};function H(r,l,s,I,i,h){const _=c("Cover"),v=c("Card");return e(),o(v,{class:"wrapper","with-hover":""},{default:d(()=>[a("div",{class:"item",onClick:l[0]||(l[0]=(...u)=>h.redirect&&h.redirect(...u))},[k(_,{src:s.cover},null,8,["src"]),a("h4",null,p(s.title),1),a("p",null,p(s.artist),1)])]),_:1})}const K=S(G,[["render",H],["__scopeId","data-v-ca575a01"]]);const M={name:"Search",components:{Shelf:z,Item:q,SearchItem:O,ArtistItem:x,TrackItem:K,Loader:D},data(){return{query:"",spotifyTracks:[],spotifyArtists:[],tracks:[],artists:[],youtubeTracks:[],loading:!1,error:null}},methods:{search(){this.query=this.$route.params.query,this.query&&(this.loading=!0,this.error=null,fetch("/api/search",{method:"POST",body:JSON.stringify({query:this.query,scope:["local","spotify"]})}).then(r=>r.json()).then(r=>{this.spotifyTracks.length=0,this.spotifyArtists.length=0,this.tracks.length=0,this.artists.length=0,this.youtubeTracks.length=0,this.spotifyTracks.push(...r.spotifyTracks||[]),this.spotifyArtists.push(...r.spotifyArtists||[]),this.tracks.push(...r.tracks||[]),this.artists.push(...r.artists||[]),this.youtubeTracks.push(...r.youtubeTracks||[]),this.loading=!1}).catch(r=>{this.error=r,this.loading=!1}))},enterText(r){r.key==="Enter"&&this.$router.push("/search/"+this.query)}},watch:{$route(){this.search()}},mounted(){this.search()}},Q=r=>(N("data-v-de01a207"),r=r(),F(),r),U={class:"search"},W={key:0,class:"fill-page"},X={key:1,class:"fill-page"},Z=Q(()=>a("h1",null,"Something went wrong",-1));function tt(r,l,s,I,i,h){const _=c("Loader"),v=c("TrackItem"),u=c("Shelf"),m=c("search-item"),C=c("Item"),b=c("artist-item");return e(),n("div",U,[i.loading?(e(),n("div",W,[k(_)])):i.error?(e(),n("div",X,[Z,a("p",null,p(i.error),1)])):(e(),n(y,{key:2},[i.tracks.length?(e(),o(u,{key:0,heading:"Songs"},{default:d(()=>[(e(!0),n(y,null,g(i.tracks,t=>(e(),o(v,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.href,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.spotifyTracks.length?(e(),o(u,{key:1,heading:"Songs (Spotify)"},{default:d(()=>[(e(!0),n(y,null,g(i.spotifyTracks,t=>(e(),o(m,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,preview:t.preview,title:t.title},null,8,["artist","cover","href","preview","title"]))),128))]),_:1})):f("",!0),i.youtubeTracks.length?(e(),o(u,{key:2,heading:"Songs (Youtube)"},{default:d(()=>[(e(!0),n(y,null,g(i.youtubeTracks,t=>(e(),o(m,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.artists.length?(e(),o(u,{key:3,heading:"Artists"},{default:d(()=>[(e(!0),n(y,null,g(i.artists,t=>(e(),o(C,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.spotifyArtists.length?(e(),o(u,{key:4,heading:"Artists (Spotify)"},{default:d(()=>[(e(!0),n(y,null,g(i.spotifyArtists,(t,A)=>(e(),o(b,{id:t.id,key:A,cover:t.cover,description:t.description,name:t.name,showFollowButton:!0},null,8,["id","cover","description","name"]))),128))]),_:1})):f("",!0)],64))])}const ut=S(M,[["render",tt],["__scopeId","data-v-de01a207"]]);export{ut as default};
