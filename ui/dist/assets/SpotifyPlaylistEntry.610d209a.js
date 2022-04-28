import{M as g}from"./MiniPlayer.ee1a3e92.js";import{_ as u,g as y,o,c as d,b as p,n as c,t as a,f as h,a as i}from"./index.450f4d87.js";const v={components:{MiniPlayer:g},name:"SpotifyPlaylistEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,cover:String,album:String,preview:String},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},methods:{remove(){fetch("/api/remove",{method:"POST",body:JSON.stringify({playlistId:Number(this.$route.params.id),songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){this.$emit("edit",this.index)},add(){console.log("add"),this.$emit("add",this.index)}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},f={class:"track"},_=["src"],S={class:"trackwrapper"},k={class:"title"},N={class:"artist"};function b(l,e,n,P,r,s){const m=y("mini-player");return o(),d("div",{onDblclick:e[2]||(e[2]=()=>{s.playAt(),s.onselect()}),onClick:e[3]||(e[3]=(...t)=>s.onselect&&s.onselect(...t)),onMouseover:e[4]||(e[4]=t=>r.hovering=!0),onMouseleave:e[5]||(e[5]=t=>r.hovering=!1),class:c(["playlistEntry",{selected:r.highlighted}])},[p(m,{class:c(["miniPlayer",{hidden:!r.hovering}]),src:n.preview},null,8,["class","src"]),r.hovering?h("",!0):(o(),d("span",{key:0,onClick:e[0]||(e[0]=(...t)=>l.edit&&l.edit(...t)),class:"id"},a(n.index+1),1)),i("div",f,[i("img",{src:n.cover||"/assets/img/music_placeholder.png"},null,8,_),i("div",S,[i("span",k,a(n.title),1),i("span",N,a(n.artist),1)]),h("",!0)]),i("span",{onClick:e[1]||(e[1]=(...t)=>s.add&&s.add(...t)),class:"material-icons-round edit",ref:"add"},"add",512)],34)}var A=u(v,[["render",b],["__scopeId","data-v-b296fd1c"]]);export{A as S};
