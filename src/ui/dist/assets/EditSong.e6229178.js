import{F as f}from"./FindSources.76c75593.js";import{_,e as a,o as S,c as g,g as p,w as h,a as t,s as r,u as c,l as b,p as y,i as w}from"./index.c601bd9b.js";const C={name:"EditSong",components:{FindSources:f},props:{cover:String,album:String,artist:String,source:String,title:String,id:Number},mounted(){this.$refs.upSong.addEventListener("change",()=>{const s=new FormData;var e=this.$refs.upSong.files[0],d=e.slice(0,e.size,e.type),u=new File([d],this.id+".mp3",{type:e.type});s.append("file",u),fetch("/api/config/tracks",{method:"POST",body:s}).then(o=>o.text()).then(o=>this.dSource=o)}),this.$refs.upCover.addEventListener("change",()=>{const s=new FormData;var e=this.$refs.upCover.files[0],d=e.slice(0,e.size,e.type);const u=e.name.split(".").pop();var o=new File([d],this.id+`.${u}`,{type:e.type});s.append("file",o),fetch("/api/config/images",{method:"POST",body:s}).then(n=>n.text()).then(n=>this.dCover=n)})},data(){return{showModal:!1,dCover:this.cover,dAlbum:this.album,dArtist:this.artist,dTitle:this.title,dSource:this.source}},methods:{opencontextmenu(s){this.$refs.findSourcesEdit.show(s)},hideFindSourcesCtx(){this.$refs.findSourcesEdit.hide()},add(){this.showModal=!1,console.log("fetch"),fetch(`/api/tracks/${this.id}`,{method:"PUT",body:JSON.stringify({source:this.dSource,title:this.dTitle,artist:this.dArtist,album:this.dAlbum,cover:this.dCover})}).then(s=>{console.log(s),this.$emit("close")})},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(s=>s.json()).then(s=>{console.log(s),this.dTitle=s.title,this.dAlbum=s.album,this.dArtist=s.artists.join(", "),this.dCover=s.cover,this.dSource=s.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}},watch:{id(){this.dCover=this.cover,this.dAlbum=this.album,this.dArtist=this.artist,this.dTitle=this.title,this.dSource=this.source}}},l=s=>(y("data-v-769d8284"),s=s(),w(),s),x={class:"wrapper"},T={class:"header"},k=l(()=>t("h3",null,"Edit song",-1)),A=l(()=>t("span",{class:"material-icons-round"}," close ",-1)),F=[A],E=l(()=>t("h4",null,"Source",-1)),V={class:"content"},M=l(()=>t("span",{class:"material-symbols-rounded"},"file_upload",-1)),N=[M],I={type:"file",ref:"upSong",style:{display:"none"},accept:"audio/mp3"},U=l(()=>t("h4",null,"Title",-1)),O={class:"content"},P=l(()=>t("h4",null,"Album",-1)),B={class:"content"},D=l(()=>t("h4",null,"Artist",-1)),z={class:"content"},J=l(()=>t("h4",null,"Cover",-1)),L={class:"content"},q=l(()=>t("span",{class:"material-symbols-rounded"},"file_upload",-1)),G=[q],H={type:"file",ref:"upCover",style:{display:"none"},accept:"images/*"},K=["src"],Q={class:"confirm"};function R(s,e,d,u,o,n){const m=a("FindSources"),v=a("vue-final-modal");return S(),g("div",null,[p(v,{onContextmenu:e[11]||(e[11]=b(()=>{},["stop"])),onClick:n.hideFindSourcesCtx,modelValue:o.showModal,"onUpdate:modelValue":e[12]||(e[12]=i=>o.showModal=i),classes:"modal-container","content-class":"modal-content"},{default:h(()=>[t("div",x,[t("div",T,[k,t("button",{class:"modal-close",onClick:e[0]||(e[0]=i=>o.showModal=!1)},F)]),E,p(m,{ref:"findSourcesEdit",src:o.dSource,title:o.dTitle,artist:o.dArtist},{default:h(()=>[t("div",V,[t("button",{onClick:e[1]||(e[1]=()=>s.$refs.upSong.click())},N),t("input",I,null,512),r(t("input",{"onUpdate:modelValue":e[2]||(e[2]=i=>o.dSource=i),type:"text",ref:"source"},null,512),[[c,o.dSource]]),t("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[3]||(e[3]=(...i)=>n.opencontextmenu&&n.opencontextmenu(...i))},"more_vert",512)])]),_:1},8,["src","title","artist"]),U,t("div",O,[r(t("input",{"onUpdate:modelValue":e[4]||(e[4]=i=>o.dTitle=i),type:"text"},null,512),[[c,o.dTitle]])]),P,t("div",B,[r(t("input",{"onUpdate:modelValue":e[5]||(e[5]=i=>o.dAlbum=i),type:"text",ref:"album"},null,512),[[c,o.dAlbum]])]),D,t("div",z,[r(t("input",{"onUpdate:modelValue":e[6]||(e[6]=i=>o.dArtist=i),type:"text"},null,512),[[c,o.dArtist]])]),J,t("div",L,[t("button",{onClick:e[7]||(e[7]=()=>s.$refs.upCover.click())},G),t("input",H,null,512),r(t("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[8]||(e[8]=i=>o.dCover=i),ref:"cover"},null,512),[[c,o.dCover]]),t("img",{onClick:e[9]||(e[9]=(...i)=>n.openInNewTab&&n.openInNewTab(...i)),class:"addSong cover",src:d.cover?d.cover:"/assets/img/music_placeholder.png"},null,8,K)]),t("div",Q,[t("button",{onClick:e[10]||(e[10]=(...i)=>n.add&&n.add(...i)),class:"negative"},"Save")])])]),_:1},8,["onClick","modelValue"])])}const Y=_(C,[["render",R],["__scopeId","data-v-769d8284"]]);export{Y as E};
