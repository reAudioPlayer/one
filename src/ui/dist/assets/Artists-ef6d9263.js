import{F as d}from"./FullShelf-dd1d9a6a.js";import{A as l}from"./ArtistItem-650543cc.js";import{C as m}from"./CollectionHeader-2a6745df.js";import{_ as f,o,c as i,g as r,a as u,w as h,F as v,i as y,f as A,e}from"./index-e1e1fd02.js";import"./song-1aa9c723.js";import"./IconButton-e9ef882b.js";import"./Dropdown-e153a54f.js";import"./Playlist-24259cc9.js";import"./PlaylistHeader-ea5193af.js";import"./ExternalEntry-c3bba58e.js";const g={components:{CollectionHeader:m,ArtistItem:l,FullShelf:d},name:"Artists",data(){return fetch("/api/spotify/artists").then(t=>t.json()).then(t=>this.spotifyArtists.push(...t)),{spotifyArtists:[]}}},C={class:"padding-20"},x={class:"artists"};function F(t,k,B,w,n,H){const a=e("CollectionHeader"),c=e("artist-item"),p=e("full-shelf");return o(),i("div",C,[r(a),u("div",x,[r(p,{heading:"Following on Spotify"},{default:h(()=>[(o(!0),i(v,null,y(n.spotifyArtists,(s,_)=>(o(),A(c,{key:_,cover:s.cover,description:s.description,name:s.name,id:s.id},null,8,["cover","description","name","id"]))),128))]),_:1})])])}const z=f(g,[["render",F],["__scopeId","data-v-0c9d0c00"]]);export{z as default};