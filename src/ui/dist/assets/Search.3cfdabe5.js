import{A as b}from"./ArtistItem.011f1043.js";import{I as x}from"./ReleaseItem.f80d62c2.js";import{A as q}from"./AddSongToPlaylist.c0fa2b25.js";import{_ as v,e as u,o as e,c as o,g as T,a as n,t as f,d,r as C,L as B,F as _,f as c,w as y,j as g}from"./index.d3105e36.js";import"./FindSources.f3980392.js";import"./SpotifyPlaylistEntry.365a9cc0.js";import"./MiniPlayer.8a4ed7d6.js";import"./SpotifyPlaylistHeader.be7fdf13.js";import"./AddAlbumToPlaylist.7fdf9be2.js";const L={components:{AddSongToPlaylist:q},name:"SearchItem",methods:{redirect(){this.$refs.addAlbum.showModal=!0}},props:{cover:String,title:String,artist:String,releaseDate:String,href:String,preview:String}},D={class:"wrapper drop-shadow-md"},N=["src"],$={key:0,class:"note"};function F(s,a,r,m,i,l){const h=u("add-song-to-playlist");return e(),o("div",D,[T(h,{href:r.href,cover:r.cover,title:r.title,artist:r.artist,preview:r.preview,ref:"addAlbum"},null,8,["href","cover","title","artist","preview"]),n("div",{class:"item",onClick:a[0]||(a[0]=(...k)=>l.redirect&&l.redirect(...k))},[n("img",{src:r.cover},null,8,N),n("h4",null,f(r.title),1),n("p",null,f(r.artist),1),r.releaseDate?(e(),o("p",$,"Released on "+f(r.releaseDate),1)):d("",!0)])])}const P=v(L,[["render",F],["__scopeId","data-v-bd38a40d"]]);const V={name:"Shelf",props:{heading:String,href:String},methods:{redirect(){!this.href||this.$router.push(this.href)}}},j={class:"shelf"},E={key:0,class:"header"},O={class:"items"};function J(s,a,r,m,i,l){return e(),o("div",j,[r.heading?(e(),o("div",E,[n("h2",null,f(r.heading),1),n("h5",{onClick:a[0]||(a[0]=(...h)=>l.redirect&&l.redirect(...h))},"See All")])):d("",!0),n("div",O,[C(s.$slots,"default",{},void 0,!0)])])}const M=v(V,[["render",J],["__scopeId","data-v-a88c43f2"]]);const R={name:"TrackItem",methods:{redirect(){console.log("redirect"),this.$router.push(this.href)}},props:{cover:String,title:String,artist:String,href:String}},Y={class:"wrapper drop-shadow-md"},z=["src"];function G(s,a,r,m,i,l){return e(),o("div",Y,[n("div",{class:"item",onClick:a[0]||(a[0]=(...h)=>l.redirect&&l.redirect(...h))},[n("img",{src:r.cover},null,8,z),n("h4",null,f(r.title),1),n("p",null,f(r.artist),1)])])}const H=v(R,[["render",G],["__scopeId","data-v-28d2ff3e"]]);const K={name:"Search",components:{Shelf:M,Item:x,SearchItem:P,ArtistItem:b,TrackItem:H,Loader:B},data(){return{query:"",spotifyTracks:[],spotifyArtists:[],tracks:[],artists:[],youtubeTracks:[],loading:!1}},methods:{search(){this.query=this.$route.params.query,this.query&&(this.loading=!0,fetch("/api/search",{method:"POST",body:JSON.stringify({query:this.query})}).then(s=>s.json()).then(s=>{this.spotifyTracks.length=0,this.spotifyArtists.length=0,this.tracks.length=0,this.artists.length=0,this.youtubeTracks.length=0,this.spotifyTracks.push(...s.spotifyTracks||[]),this.spotifyArtists.push(...s.spotifyArtists||[]),this.tracks.push(...s.tracks||[]),this.artists.push(...s.artists||[]),this.youtubeTracks.push(...s.youtubeTracks||[]),this.loading=!1}))},enterText(s){s.key==="Enter"&&this.$router.push("/search/"+this.query)}},watch:{$route(){this.search()}},mounted(){this.search()}},Q={class:"search"},U={key:0,class:"fillPage"};function W(s,a,r,m,i,l){const h=u("Loader"),k=u("TrackItem"),p=u("Shelf"),S=u("search-item"),w=u("Item"),I=u("artist-item");return e(),o("div",Q,[i.loading?(e(),o("div",U,[T(h)])):(e(),o(_,{key:1},[i.tracks.length?(e(),c(p,{key:0,heading:"Songs"},{default:y(()=>[(e(!0),o(_,null,g(i.tracks,t=>(e(),c(k,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.spotifyTracks.length?(e(),c(p,{key:1,heading:"Songs (Spotify)"},{default:y(()=>[(e(!0),o(_,null,g(i.spotifyTracks,t=>(e(),c(S,{key:t.url,preview:t.preview,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["preview","cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.youtubeTracks.length?(e(),c(p,{key:2,heading:"Songs (Youtube)"},{default:y(()=>[(e(!0),o(_,null,g(i.youtubeTracks,t=>(e(),c(S,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.artists.length?(e(),c(p,{key:3,heading:"Artists"},{default:y(()=>[(e(!0),o(_,null,g(i.artists,t=>(e(),c(w,{key:t.url,cover:t.cover,href:t.url,artist:t.artists.join(", "),title:t.title},null,8,["cover","href","artist","title"]))),128))]),_:1})):d("",!0),i.spotifyArtists.length?(e(),c(p,{key:4,heading:"Artists (Spotify)"},{default:y(()=>[(e(!0),o(_,null,g(i.spotifyArtists,(t,A)=>(e(),c(I,{key:A,cover:t.cover,description:t.description,name:t.name,id:t.id,showFollowButton:!0},null,8,["cover","description","name","id"]))),128))]),_:1})):d("",!0)],64))])}const ct=v(K,[["render",W],["__scopeId","data-v-506e3f23"]]);export{ct as default};
