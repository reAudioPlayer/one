import{b as _}from"./index.11d3b0f3.js";import{_ as m,H as h,o as i,c as r,a as o,t as p,j as y,F as f,h as v,i as w,p as P,k,b as C,g}from"./index.f26f2948.js";import{C as D}from"./CloudPlaylist.c072cc34.js";window.Buffer=_.Buffer;new h("reapApollo");const I={name:"import",data(){if(this.$route.params.data){const e=this.$route.params.data;fetch(`https://eu-apollo.herokuapp.com/user/${e}`).then(async t=>{this.userData=await t.json(),this.cloudPlaylists=this.userData.data.playlists}),fetch("/api/playlists").then(async t=>{const n=await t.json();for(let a=0;a<n.length;a++){const s=await fetch("/api/playlist",{method:"POST",body:JSON.stringify({id:a})});this.localPlaylists.push(await s.json())}})}else window.location=`https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin+"/#/import/<token>")}`;return{localPlaylists:[],cloudPlaylists:[],userData:{}}},components:{CloudPlaylist:D}},d=e=>(P("data-v-7d358d9e"),e=e(),k(),e),S={class:"import"},b={class:"action"},B=d(()=>o("h1",null,"Cloud Restore",-1)),T={key:0},j=d(()=>o("span",{class:"material-symbols-rounded"},"cloud_download",-1)),x=g(" Synchronise"),E=[j,x],N={class:"data"};function R(e,t,n,a,s,$){const u=C("CloudPlaylist");return i(),r("div",S,[o("div",b,[B,s.userData.user?(i(),r("h2",T,"Hello "+p(s.userData.user.userinfo.name)+" ("+p(s.userData.user.userinfo.email)+")",1)):y("",!0),o("button",{onClick:t[0]||(t[0]=c=>e.$refs.playlistsElements.forEach(l=>l.import())),class:"iconWithText"},E)]),o("div",N,[(i(!0),r(f,null,v(s.cloudPlaylists,(c,l)=>(i(),w(u,{onRemove:()=>s.cloudPlaylists.splice(l,1),ref_for:!0,ref:"playlistsElements",key:l,playlist:c,localPlaylists:s.localPlaylists},null,8,["onRemove","playlist","localPlaylists"]))),128))])])}var O=m(I,[["render",R],["__scopeId","data-v-7d358d9e"]]);export{O as default};
