import{F as _}from"./FindSources.26858312.js";import{_ as v,e as u,o as f,c as S,g as a,w as h,a as t,m as d,q as r,p as g,h as b}from"./index.fc9bdca8.js";const w={name:"EditSong",components:{FindSources:_},props:{cover:String,album:String,artist:String,source:String,title:String,id:Number},data(){return{showModal:!1,dCover:this.cover,dAlbum:this.album,dArtist:this.artist,dTitle:this.title,dSource:this.source}},methods:{opencontextmenu(o){this.$refs.findSourcesEdit.show(o)},hideFindSourcesCtx(){this.$refs.findSourcesEdit.hide()},add(){this.showModal=!1,console.log("fetch"),fetch(`/api/tracks/${this.id}`,{method:"PUT",body:JSON.stringify({source:this.dSource,title:this.dTitle,artist:this.dArtist,album:this.dAlbum,cover:this.dCover})}).then(o=>{console.log(o),this.$emit("close")})},loadMetadata(){fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:this.$refs.source.value})}).then(o=>o.json()).then(o=>{console.log(o),this.dTitle=o.title,this.dAlbum=o.album,this.dArtist=o.artists.join(", "),this.dCover=o.cover,this.dSource=o.src})},openInNewTab(){window.open(this.cover?this.cover:"/assets/img/music_placeholder.png")}},watch:{id(){this.dCover=this.cover,this.dAlbum=this.album,this.dArtist=this.artist,this.dTitle=this.title,this.dSource=this.source}}},l=o=>(g("data-v-d3fa242a"),o=o(),b(),o),C={class:"wrapper"},x={class:"header"},A=l(()=>t("h3",null,"Edit song",-1)),T=l(()=>t("span",{class:"material-icons-round"}," close ",-1)),y=[T],k=l(()=>t("h4",null,"Source",-1)),V={class:"content"},E=l(()=>t("h4",null,"Title",-1)),M={class:"content"},N=l(()=>t("h4",null,"Album",-1)),I={class:"content"},U=l(()=>t("h4",null,"Artist",-1)),F={class:"content"},B=l(()=>t("h4",null,"Cover",-1)),O={class:"content"},J=["src"],P={class:"confirm"};function q(o,e,c,D,i,n){const m=u("FindSources"),p=u("vue-final-modal");return f(),S("div",null,[a(p,{onClick:n.hideFindSourcesCtx,modelValue:i.showModal,"onUpdate:modelValue":e[9]||(e[9]=s=>i.showModal=s),classes:"modal-container","content-class":"modal-content"},{default:h(()=>[t("div",C,[t("div",x,[A,t("button",{class:"modal-close",onClick:e[0]||(e[0]=s=>i.showModal=!1)},y)]),k,a(m,{ref:"findSourcesEdit",src:i.dSource,title:i.dTitle,artist:i.dArtist},{default:h(()=>[t("div",V,[d(t("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>i.dSource=s),type:"text",ref:"source"},null,512),[[r,i.dSource]]),t("span",{class:"material-icons-round more",ref:"sourceMore",onClick:e[2]||(e[2]=(...s)=>n.opencontextmenu&&n.opencontextmenu(...s))},"more_vert",512)])]),_:1},8,["src","title","artist"]),E,t("div",M,[d(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>i.dTitle=s),type:"text"},null,512),[[r,i.dTitle]])]),N,t("div",I,[d(t("input",{"onUpdate:modelValue":e[4]||(e[4]=s=>i.dAlbum=s),type:"text",ref:"album"},null,512),[[r,i.dAlbum]])]),U,t("div",F,[d(t("input",{"onUpdate:modelValue":e[5]||(e[5]=s=>i.dArtist=s),type:"text"},null,512),[[r,i.dArtist]])]),B,t("div",O,[d(t("input",{type:"text",class:"addSong cover","onUpdate:modelValue":e[6]||(e[6]=s=>i.dCover=s),ref:"cover"},null,512),[[r,i.dCover]]),t("img",{onClick:e[7]||(e[7]=(...s)=>n.openInNewTab&&n.openInNewTab(...s)),class:"addSong cover",src:c.cover?c.cover:"/assets/img/music_placeholder.png"},null,8,J)]),t("div",P,[t("button",{onClick:e[8]||(e[8]=(...s)=>n.add&&n.add(...s)),class:"negative"},"Save")])])]),_:1},8,["onClick","modelValue"])])}const H=v(w,[["render",q],["__scopeId","data-v-d3fa242a"]]);export{H as E};
