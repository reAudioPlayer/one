import{_ as u,o as a,c as o,k as v,l as h,a as s,e as A,g as m,x as _,t as c,d as p,m as y,F as g,i as f,f as S}from"./index.99c2f1f8.js";import{M as $}from"./MiniPlayer.9b7c1ba9.js";const C={name:"AlbumHeader"},k=e=>(v("data-v-a4397463"),e=e(),h(),e),I={class:"gridHeader"},x=k(()=>s("span",{class:"id"},"#",-1)),w=k(()=>s("span",{class:"title"},"Title",-1)),E=[x,w];function N(e,t,n,i,d,r){return a(),o("div",I,E)}const P=u(C,[["render",N],["__scopeId","data-v-a4397463"]]);const T={components:{MiniPlayer:$},name:"AlbumEntry",props:{index:Number,id:Number,source:String,artist:{type:String,default:"N/A"},title:{type:String,default:"N/A"},added:Boolean,preview:String,cover:String},data(){return{highlighted:!1,favourited:this.favourite,isAutoPlaylist:this.$route.path=="/collection/tracks",hovering:!1}},methods:{remove(){fetch(`/api/playlists/${this.$route.params.id}/tracks`,{method:"DELETE",body:JSON.stringify({songId:this.id})})},onselect(){this.highlighted=!this.highlighted},playAt(){this.$emit("edit",this.index)},add(){console.log("add"),this.$emit("add",this.index)}},watch:{added(){console.log("change"),this.$refs.add.innerHTML=this.added?"done":"add"}}},B={class:"track"},q=["src"],H={class:"trackwrapper"};function M(e,t,n,i,d,r){const b=A("mini-player");return a(),o("div",{onDblclick:t[2]||(t[2]=()=>{r.playAt(),r.onselect()}),onClick:t[3]||(t[3]=(...l)=>r.onselect&&r.onselect(...l)),onMouseover:t[4]||(t[4]=l=>d.hovering=!0),onMouseleave:t[5]||(t[5]=l=>d.hovering=!1),class:_(["albumEntry",{selected:d.highlighted}])},[m(b,{class:_(["miniPlayer",{hidden:!d.hovering}]),title:n.title,artist:n.artist,src:n.source},null,8,["class","title","artist","src"]),d.hovering?p("",!0):(a(),o("span",{key:0,onClick:t[0]||(t[0]=(...l)=>e.edit&&e.edit(...l)),class:"id"},c(n.index+1),1)),s("div",B,[n.cover?(a(),o("img",{key:0,src:n.cover},null,8,q)):p("",!0),s("div",H,[s("span",{class:_(["title",{playing:e.playing}])},c(n.title),3),s("span",{class:_(["artist",{playing:e.playing}])},c(n.artist),3)])]),s("span",{onClick:t[1]||(t[1]=(...l)=>r.add&&r.add(...l)),class:"material-icons-round edit",ref:"add"},"add",512)],34)}const D=u(T,[["render",M],["__scopeId","data-v-ea13d99b"]]),L=e=>(v("data-v-d567d7fe"),e=e(),h(),e),V={class:"playlist"},F=L(()=>s("hr",null,null,-1)),j={class:"entries"},z=y({__name:"Playlist",props:{songs:{type:Array,required:!0},noCover:{type:Boolean,default:!1}},setup(e){return(t,n)=>(a(),o("div",V,[m(P),F,s("div",j,[(a(!0),o(g,null,f(e.songs,(i,d)=>(a(),S(D,{onAdd:r=>t.$emit("add",d),key:i.source,added:i.added,index:d,cover:e.noCover?null:i.cover,artist:i.artists.join(", "),title:i.title,source:i.src,preview:i.source},null,8,["onAdd","added","index","cover","artist","title","source","preview"]))),128))])]))}});const X=u(z,[["__scopeId","data-v-d567d7fe"]]),J={class:"padding-20 playlisteditor"},O=["src"],G={class:"details"},K={class:"detailswrapper"},Q=["onClick"],R=y({__name:"TrackInfo",props:{title:{type:String,required:!0},subtitle:{type:String,required:!0},cover:{type:String,required:!0},icons:{type:Array,required:!0}},setup(e){return(t,n)=>(a(),o("div",J,[s("img",{class:"cover",src:e.cover},null,8,O),s("div",G,[s("div",K,[(a(!0),o(g,null,f(e.icons,(i,d)=>(a(),o("span",{key:d,class:"material-icons-round",onClick:i.onClick},c(i.name),9,Q))),128))]),s("h1",null,c(e.title),1),s("h5",null,c(e.subtitle),1)])]))}});const Y=u(R,[["__scopeId","data-v-54113add"]]);export{X as P,Y as T};