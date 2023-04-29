import{A as x}from"./ArtistItem-8f64021f.js";import{I as q}from"./ReleaseItem-aefb98f5.js";import{_ as B}from"./ExternalEntry-22a55a1a.js";import{_ as S,C as T,h as w,o as e,f as o,w as d,g as k,a,t as p,c as n,d as f,e as c,r as L,L as D,F as m,i as v,l as N,m as F}from"./index-73e4032e.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-45299512.js";import"./Template-973a37f3.js";import"./IconButton-8ea97c6a.js";import"./Form-2144997c.js";import"./Dropdown-83fafee8.js";import"./Playlist-3b27dbbc.js";import"./PlaylistHeader-3158c850.js";import"./song-ab7f6530.js";const V={components:{Card:T,Cover:w,AddSongToPlaylist:B},name:"SearchItem",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,releaseDate:String,href:String,preview:String}},E={key:0,class:"note"};function O(r,l,s,I,i,h){const _=c("add-song-to-playlist"),y=c("Cover"),u=c("Card");return e(),o(u,{class:"wrapper","with-hover":""},{default:d(()=>[k(_,{ref:"addAlbum",song:{cover:s.cover,artist:s.artist,title:s.title,preview:s.preview,href:s.href}},null,8,["song"]),a("div",{class:"item",onClick:l[0]||(l[0]=(...g)=>h.redirect&&h.redirect(...g))},[k(y,{src:s.cover},null,8,["src"]),a("h4",null,p(s.title),1),a("p",null,p(s.artist),1),s.releaseDate?(e(),n("p",E,"Released on "+p(s.releaseDate),1)):f("",!0)])]),_:1})}const P=S(V,[["render",O],["__scopeId","data-v-1172913f"]]);const j={name:"Shelf",props:{heading:String,href:String},methods:{redirect(){this.href&&this.$router.push(this.href)}}},J={class:"shelf"},R={key:0,class:"header"},Y={class:"items"};function $(r,l,s,I,i,h){return e(),n("div",J,[s.heading?(e(),n("div",R,[a("h2",null,p(s.heading),1),a("h5",{onClick:l[0]||(l[0]=(..._)=>h.redirect&&h.redirect(..._))},"See All")])):f("",!0),a("div",Y,[L(r.$slots,"default",{},void 0,!0)])])}const z=S(j,[["render",$],["__scopeId","data-v-a60bb56d"]]);const G={name:"TrackItem",components:{Card:T,Cover:w},methods:{redirect(){console.log("redirect"),this.$router.push(this.href)}},props:{cover:String,title:String,artist:String,href:String}};function H(r,l,s,I,i,h){const _=c("Cover"),y=c("Card");return e(),o(y,{class:"wrapper","with-hover":""},{default:d(()=>[a("div",{class:"item",onClick:l[0]||(l[0]=(...u)=>h.redirect&&h.redirect(...u))},[k(_,{src:s.cover},null,8,["src"]),a("h4",null,p(s.title),1),a("p",null,p(s.artist),1)])]),_:1})}const K=S(G,[["render",H],["__scopeId","data-v-ca575a01"]]);const M={name:"Search",components:{Shelf:z,Item:q,SearchItem:P,ArtistItem:x,TrackItem:K,Loader:D},data(){return{query:"",spotifyTracks:[],spotifyArtists:[],tracks:[],artists:[],youtubeTracks:[],loading:!1,error:null}},methods:{search(){this.query=this.$route.params.query,this.query&&(this.loading=!0,this.error=null,fetch("/api/search",{method:"POST",body:JSON.stringify({query:this.query,scope:["local","spotify"]})}).then(r=>r.json()).then(r=>{this.spotifyTracks.length=0,this.spotifyArtists.length=0,this.tracks.length=0,this.artists.length=0,this.youtubeTracks.length=0,this.spotifyTracks.push(...r.spotifyTracks||[]),this.spotifyArtists.push(...r.spotifyArtists||[]),this.tracks.push(...r.tracks||[]),this.artists.push(...r.artists||[]),this.youtubeTracks.push(...r.youtubeTracks||[]),this.loading=!1}).catch(r=>{this.error=r,this.loading=!1}))},enterText(r){r.key==="Enter"&&this.$router.push("/search/"+this.query)}},watch:{$route(){this.search()}},mounted(){this.search()}},Q=r=>(N("data-v-15b9a3da"),r=r(),F(),r),U={class:"search"},W={key:0,class:"fill-page"},X={key:1,class:"fill-page"},Z=Q(()=>a("h1",null,"Something went wrong",-1));function tt(r,l,s,I,i,h){const _=c("Loader"),y=c("TrackItem"),u=c("Shelf"),g=c("search-item"),C=c("Item"),b=c("artist-item");return e(),n("div",U,[i.loading?(e(),n("div",W,[k(_)])):i.error?(e(),n("div",X,[Z,a("p",null,p(i.error),1)])):(e(),n(m,{key:2},[i.tracks.length?(e(),o(u,{key:0,heading:"Songs"},{default:d(()=>[(e(!0),n(m,null,v(i.tracks,t=>(e(),o(y,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.href,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.spotifyTracks.length?(e(),o(u,{key:1,heading:"Songs (Spotify)"},{default:d(()=>[(e(!0),n(m,null,v(i.spotifyTracks,t=>(e(),o(g,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,preview:t.preview,title:t.title},null,8,["artist","cover","href","preview","title"]))),128))]),_:1})):f("",!0),i.youtubeTracks.length?(e(),o(u,{key:2,heading:"Songs (Youtube)"},{default:d(()=>[(e(!0),n(m,null,v(i.youtubeTracks,t=>(e(),o(g,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.artists.length?(e(),o(u,{key:3,heading:"Artists"},{default:d(()=>[(e(!0),n(m,null,v(i.artists,t=>(e(),o(C,{key:t.url,artist:t.artists.join(", "),cover:t.cover,href:t.url,title:t.title},null,8,["artist","cover","href","title"]))),128))]),_:1})):f("",!0),i.spotifyArtists.length?(e(),o(u,{key:4,heading:"Artists (Spotify)"},{default:d(()=>[(e(!0),n(m,null,v(i.spotifyArtists,(t,A)=>(e(),o(b,{id:t.id,key:A,cover:t.cover,description:t.description,name:t.name,showFollowButton:!0},null,8,["id","cover","description","name"]))),128))]),_:1})):f("",!0)],64))])}const dt=S(M,[["render",tt],["__scopeId","data-v-15b9a3da"]]);export{dt as default};
