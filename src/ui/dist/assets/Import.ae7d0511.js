import{b as h}from"./index.b5a11ad3.js";import{_ as f,bx as _,o as r,c as d,a as t,b as u,d as y,F as v,j as P,f as $,e as k,p as w,i as C}from"./index.f2b9c799.js";import{C as F}from"./CloudPlaylist.b8f740d4.js";window.Buffer=h.Buffer;new _("reapApollo");const b={name:"import",methods:{login(){window.location=`https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin+"/#/import/<token>")}`}},mounted(){this.$refs.upFile.addEventListener("change",()=>{var a,i,o,n;const e=(a=this.$refs.upFile.files)==null?void 0:a[0];if(!!e){this.uploadedCoverName=(n=(o=(i=this.$refs.upFile)==null?void 0:i.files)==null?void 0:o[0])==null?void 0:n.name;var s=new FileReader;s.onloadend=()=>{this.cloudPlaylists=JSON.parse(s.result)},s.readAsText(e)}})},data(){if(this.$route.params.data){const e=this.$route.params.data;fetch(`https://eu-apollo.herokuapp.com/user/${e}`).then(async s=>{this.userData=await s.json(),this.cloudPlaylists=this.userData.data.playlists})}for(let e=0;e<this.$store.state.playlists.length;e++)fetch(`/api/playlists/${e}`).then(s=>s.json()).then(s=>this.localPlaylists.push(s));return{localPlaylists:[],cloudPlaylists:[],userData:{}}},components:{CloudPlaylist:F}},c=e=>(w("data-v-7d83ce5c"),e=e(),C(),e),I={class:"import"},g={class:"action"},x=c(()=>t("h1",null,"Restore From File",-1)),B={type:"file",ref:"upFile",style:{display:"none"},accept:"application/json"},T=c(()=>t("span",{class:"material-symbols-rounded"},"file_upload",-1)),E=c(()=>t("span",{class:"material-symbols-rounded"},"done",-1)),N={class:"data"};function R(e,s,a,i,o,n){const m=k("CloudPlaylist");return r(),d("div",I,[t("div",g,[x,t("input",B,null,512),t("button",{onClick:s[0]||(s[0]=()=>e.$refs.upFile.click()),class:"iconWithText"},[T,u(" Upload")]),t("button",{onClick:s[1]||(s[1]=p=>e.$refs.playlistsElements.forEach(l=>l.import())),class:"iconWithText"},[E,u(" Apply")])]),y("",!0),t("div",N,[(r(!0),d(v,null,P(o.cloudPlaylists,(p,l)=>(r(),$(m,{onRemove:()=>o.cloudPlaylists.splice(l,1),ref_for:!0,ref:"playlistsElements",key:l,playlist:p,localPlaylists:o.localPlaylists},null,8,["onRemove","playlist","localPlaylists"]))),128))])])}const D=f(b,[["render",R],["__scopeId","data-v-7d83ce5c"]]);export{D as default};
