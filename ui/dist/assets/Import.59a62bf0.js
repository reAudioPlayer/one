import{b as f}from"./index.aef9157e.js";import{_ as h,H as _,o as r,c as d,a as t,b as u,d as y,F as v,i as w,f as P,e as k,p as $,h as C}from"./index.f3f28f91.js";import{C as F}from"./CloudPlaylist.0aa5ef97.js";window.Buffer=f.Buffer;new _("reapApollo");const b={name:"import",methods:{login(){window.location=`https://eu-apollo.herokuapp.com/user/accessToken?redirect=${encodeURIComponent(window.location.origin+"/#/import/<token>")}`}},mounted(){this.$refs.upFile.addEventListener("change",()=>{var o,l,a,n;const s=(o=this.$refs.upFile.files)==null?void 0:o[0];if(!!s){this.uploadedCoverName=(n=(a=(l=this.$refs.upFile)==null?void 0:l.files)==null?void 0:a[0])==null?void 0:n.name;var e=new FileReader;e.onloadend=()=>{this.cloudPlaylists=JSON.parse(e.result)},e.readAsText(s)}})},data(){if(this.$route.params.data){const s=this.$route.params.data;fetch(`https://eu-apollo.herokuapp.com/user/${s}`).then(async e=>{this.userData=await e.json(),this.cloudPlaylists=this.userData.data.playlists})}return fetch("/api/playlists").then(async s=>{const e=await s.json();for(let o=0;o<e.length;o++){const l=await fetch(`/api/playlists/${o}`);this.localPlaylists.push(await l.json())}}),{localPlaylists:[],cloudPlaylists:[],userData:{}}},components:{CloudPlaylist:F}},c=s=>($("data-v-de2dc38a"),s=s(),C(),s),I={class:"import"},g={class:"action"},B=c(()=>t("h1",null,"Restore From File",-1)),T={type:"file",ref:"upFile",style:{display:"none"},accept:"application/json"},x=c(()=>t("span",{class:"material-symbols-rounded"},"file_upload",-1)),E=c(()=>t("span",{class:"material-symbols-rounded"},"done",-1)),N={class:"data"};function R(s,e,o,l,a,n){const m=k("CloudPlaylist");return r(),d("div",I,[t("div",g,[B,t("input",T,null,512),t("button",{onClick:e[0]||(e[0]=()=>s.$refs.upFile.click()),class:"iconWithText"},[x,u(" Upload")]),t("button",{onClick:e[1]||(e[1]=p=>s.$refs.playlistsElements.forEach(i=>i.import())),class:"iconWithText"},[E,u(" Apply")])]),y("",!0),t("div",N,[(r(!0),d(v,null,w(a.cloudPlaylists,(p,i)=>(r(),P(m,{onRemove:()=>a.cloudPlaylists.splice(i,1),ref_for:!0,ref:"playlistsElements",key:i,playlist:p,localPlaylists:a.localPlaylists},null,8,["onRemove","playlist","localPlaylists"]))),128))])])}const D=h(b,[["render",R],["__scopeId","data-v-de2dc38a"]]);export{D as default};
