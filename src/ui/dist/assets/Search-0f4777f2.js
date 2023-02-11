import{A as x}from"./ArtistItem-00fc6bf0.js";import{I as b}from"./ReleaseItem-59272e75.js";import{_ as q}from"./ExternalEntry-f0b99876.js";import{_ as k,h as I,e as l,o as e,c as o,g,a as u,t as p,d,r as B,L,F as f,f as n,w as v,i as m}from"./index-fd3eb342.js";import"./song-ca46ae84.js";import"./Dropdown-0ed13857.js";import"./Playlist-fcddcb87.js";import"./PlaylistHeader-ee03813f.js";import"./ImportSpotifyAlbum.vue_vue_type_script_setup_true_lang-364d1296.js";const D={components:{Cover:I,AddSongToPlaylist:q},name:"SearchItem",methods:{redirect(){this.$refs.addAlbum.show()}},props:{cover:String,title:String,artist:String,releaseDate:String,href:String,preview:String}},N={class:"wrapper drop-shadow-md"},$={key:0,class:"note"};function F(s,c,r,S,i,a){const h=l("add-song-to-playlist"),y=l("Cover");return e(),o("div",N,[g(h,{song:{cover:r.cover,artist:r.artist,title:r.title,preview:r.preview,href:r.href},ref:"addAlbum"},null,8,["song"]),u("div",{class:"item",onClick:c[0]||(c[0]=(..._)=>a.redirect&&a.redirect(..._))},[g(y,{src:r.cover},null,8,["src"]),u("h4",null,p(r.title),1),u("p",null,p(r.artist),1),r.releaseDate?(e(),o("p",$,"Released on "+p(r.releaseDate),1)):d("",!0)])])}const P=k(D,[["render",F],["__scopeId","data-v-49217ea9"]]);const V={name:"Shelf",props:{heading:String,href:String},methods:{redirect(){this.href&&this.$router.push(this.href)}}},E={class:"shelf"},O={key:0,class:"header"},j={class:"items"};function J(s,c,r,S,i,a){return e(),o("div",E,[r.heading?(e(),o("div",O,[u("h2",null,p(r.heading),1),u("h5",{onClick:c[0]||(c[0]=(...h)=>a.redirect&&a.redirect(...h))},"See All")])):d("",!0),u("div",j,[B(s.$slots,"default",{},void 0,!0)])])}const R=k(V,[["render",J],["__scopeId","data-v-6e3dd207"]]);const Y={name:"TrackItem",components:{Cover:I},methods:{redirect(){console.log("redirect"),this.$router.push(this.href)}},props:{cover:String,title:String,artist:String,href:String}},z={class:"wrapper drop-shadow-md"};function G(s,c,r,S,i,a){const h=l("Cover");return e(),o("div",z,[u("div",{class:"item",onClick:c[0]||(c[0]=(...y)=>a.redirect&&a.redirect(...y))},[g(h,{src:r.cover},null,8,["src"]),u("h4",null,p(r.title),1),u("p",null,p(r.artist),1)])])}const H=k(Y,[["render",G],["__scopeId","data-v-d03d3ef1"]]);const K={name:"Search",components:{Shelf:R,Item:b,SearchItem:P,ArtistItem:x,TrackItem:H,Loader:L},data(){return{query:"",spotifyTracks:[],spotifyArtists:[],tracks:[],artists:[],youtubeTracks:[],loading:!1}},methods:{search(){this.query=this.$route.params.query,this.query&&(this.loading=!0,fetch("/api/search",{method:"POST",body:JSON.stringify({query:this.query})}).then(s=>s.json()).then(s=>{this.spotifyTracks.length=0,this.spotifyArtists.length=0,this.tracks.length=0,this.artists.length=0,this.youtubeTracks.length=0,this.spotifyTracks.push(...s.spotifyTracks||[]),this.spotifyArtists.push(...s.spotifyArtists||[]),this.tracks.push(...s.tracks||[]),this.artists.push(...s.artists||[]),this.youtubeTracks.push(...s.youtubeTracks||[]),this.loading=!1}))},enterText(s){s.key==="Enter"&&this.$router.push("/search/"+this.query)}},watch:{$route(){this.search()}},mounted(){this.search()}},M={class:"search"},Q={key:0,class:"fillPage"};function U(s,c,r,S,i,a){const h=l("Loader"),y=l("TrackItem"),_=l("Shelf"),T=l("search-item"),w=l("Item"),A=l("artist-item");return e(),o("div",M,[i.loading?(e(),o("div",Q,[g(h)])):(e(),o(f,{key:1},[i.tracks.length?(e(),n(_,{key:0,heading:"Songs"},{default:v(()=>[(e(!0),o(f,null,m(i.tracks,t=>(e(),n(y,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.spotifyTracks.length?(e(),n(_,{key:1,heading:"Songs (Spotify)"},{default:v(()=>[(e(!0),o(f,null,m(i.spotifyTracks,t=>(e(),n(T,{key:t.url,preview:t.preview,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["preview","cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.youtubeTracks.length?(e(),n(_,{key:2,heading:"Songs (Youtube)"},{default:v(()=>[(e(!0),o(f,null,m(i.youtubeTracks,t=>(e(),n(T,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.artists.length?(e(),n(_,{key:3,heading:"Artists"},{default:v(()=>[(e(!0),o(f,null,m(i.artists,t=>(e(),n(w,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.spotifyArtists.length?(e(),n(_,{key:4,heading:"Artists (Spotify)"},{default:v(()=>[(e(!0),o(f,null,m(i.spotifyArtists,(t,C)=>(e(),n(A,{key:C,cover:t.cover,description:t.description,name:t.name,id:t.id,showFollowButton:!0},null,8,["cover","description","name","id"]))),128))]),_:1})):d("",!0)],64))])}const nt=k(K,[["render",U],["__scopeId","data-v-c8c48ace"]]);export{nt as default};
