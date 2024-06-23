import{_ as D,f as E,o,c as p,g as m,w as h,l as se,m as le,a as t,C as U,H as Q,i as y,t as b,d as x,e as M,n as f,y as j,E as P,r as ue,L as ae,h as T,F as R,j as ce,D as N,q as de,J as pe,M as G,K as Z,O as C,Q as A,b as ee,R as te,B as ve,U as me}from"./index-DnhwPdfm.js";import{F}from"./FullShelf-DRbcKza6.js";import{E as _e}from"./Error-hTSpQMK3.js";import{P as J}from"./PlaylistCard-CMjdNIlB.js";import{p as fe}from"./playerInPicture-Dfp9IAsf.js";const he={name:"CollectionHeader",props:{href:String}},q=c=>(se("data-v-6670177a"),c=c(),le(),c),ye={class:"wrapper"},ge=q(()=>t("div",{class:"collection"},"Playlists",-1)),xe=q(()=>t("div",{class:"collection"},"Releases",-1)),we=q(()=>t("div",{class:"collection"},"Artists",-1)),ke=q(()=>t("div",{class:"collection"},"Albums",-1));function $e(c,r,e,d,_,n){const u=E("router-link");return o(),p("div",ye,[m(u,{class:"link",to:"/collection/playlists"},{default:h(()=>[ge]),_:1}),m(u,{class:"link",to:"/collection/releases"},{default:h(()=>[xe]),_:1}),m(u,{class:"link",to:"/collection/artists"},{default:h(()=>[we]),_:1}),m(u,{class:"link",to:"/collection/albums"},{default:h(()=>[ke]),_:1})])}const Ce=D(he,[["render",$e],["__scopeId","data-v-6670177a"]]),be={components:{Card:U,Cover:Q},name:"CardWithImageAndText",props:{cover:String,title:String,description:String,playlistType:{type:String,default:null},imageType:{type:String,default:"playlist"}}},Se={class:"item"},Ie={class:"title"},De={key:0,class:"material-symbols-rounded"},Te=["title"],Re=["title","innerHTML"];function Me(c,r,e,d,_,n){const u=E("Cover"),a=E("Card");return o(),y(a,{class:"wrapper drop-shadow-md","with-hover":""},{default:h(()=>[t("div",Se,[m(u,{src:e.cover,type:e.imageType,name:e.title},null,8,["src","type","name"]),t("div",null,[t("div",Ie,[[null,"classic"].includes(e.playlistType)?x("",!0):(o(),p("span",De,b(e.playlistType=="smart"?"neurology":"bolt"),1)),t("h4",{title:e.title},b(e.title),9,Te)]),t("p",{class:"text-muted text-xs hideIfMobile",title:e.description,innerHTML:e.description},null,8,Re)])])]),_:1})}const oe=D(be,[["render",Me],["__scopeId","data-v-19795e3d"]]),B=M({__name:"FetchLoader",props:{response:{type:Promise,required:!0},error:{type:Function,default:c=>`Failed to fetch (${c.status})`}},setup(c){const r=c,e=f(!1),d=f(""),_=async()=>{if(!r.response)return;e.value=!0,d.value="";const n=await r.response;e.value=!1,n.ok||(d.value=r.error(n))};return j(_),P(()=>r.response,_),(n,u)=>e.value?(o(),y(ae,{key:0})):d.value?(o(),y(_e,{key:1,msg:d.value},null,8,["msg"])):c.response?ue(n.$slots,"default",{key:2}):x("",!0)}}),Ae={class:"albums"},Pe=M({__name:"Albums",setup(c){const r=f([]),e=f(null);return j(async()=>{e.value=fetch("/api/albums");const _=await(await e.value).json();r.value=_.sort((n,u)=>n.name.localeCompare(u.name))}),(d,_)=>(o(),y(B,{response:e.value},{default:h(()=>[t("div",Ae,[m(F,{heading:"In your library"},{default:h(()=>[(o(!0),p(R,null,T(r.value,n=>(o(),y(oe,{title:n.name,description:n.artists.join(", "),cover:n.image,onClick:u=>d.$router.push(n.href),imageType:"album"},null,8,["title","description","cover","onClick"]))),256))]),_:1})])]),_:1},8,["response"]))}}),Ee=D(Pe,[["__scopeId","data-v-33e7fc43"]]),Fe={class:"playlists"},je=M({__name:"Playlists",setup(c){const r=ce(),e=N(()=>r.playlists),d=f([]),_=f(null);return j(async()=>{_.value=fetch("/api/spotify/playlists");const u=await(await _.value).json();d.value=u}),(n,u)=>(o(),p("div",Fe,[e.value.length?(o(),y(F,{key:0,heading:"Playlists"},{default:h(()=>[(o(!0),p(R,null,T(e.value,a=>(o(),y(J,{playlist:a},null,8,["playlist"]))),256))]),_:1})):x("",!0),m(B,{response:_.value,error:a=>`Failed to fetch Spotify playlists (${a.status})`},{default:h(()=>[d.value.length?(o(),y(F,{key:0,heading:"Import From Spotify"},{default:h(()=>[m(J,{playlist:{href:"/liked",name:"Liked",description:"your liked tracks",type:"classic",cover:null,id:"liked",plays:0},"is-spotify":""}),(o(!0),p(R,null,T(d.value,a=>(o(),y(J,{playlist:{...a,href:`https://open.spotify.com/playlist/${a.id}`,type:"classic"},"is-spotify":""},null,8,["playlist"]))),256))]),_:1})):x("",!0)]),_:1},8,["response","error"])]))}}),H=c=>(se("data-v-924f3e91"),c=c(),le(),c),Le={key:0,class:"fill-page"},Ne={key:1},Be={class:"releases w-full"},qe={class:"current"},He={key:0,class:"w-max flex flex-col gap-4"},Oe={class:"flex justify-between w-full items-center"},Ye={class:"flex gap-4 items-center"},Je={class:"info"},Ve={key:0},Ke={key:1,class:"m-0 text-muted text-sm"},Qe=["title"],Ue={class:"actions"},We={key:1,class:"h-96 flex flex-col justify-center"},ze=H(()=>t("span",{class:"italic text-sm text-muted"}," Nothing to preview ",-1)),Xe=[ze],Ge={class:"flex items-center gap-4 w-max"},Ze={key:0,class:"flex justify-between mb-2"},et=H(()=>t("span",{class:"material-symbols-rounded"}," refresh ",-1)),tt=H(()=>t("span",{class:"material-symbols-rounded"}," done_all ",-1)),st={class:"entries overflow-y-auto flex flex-col gap-2"},lt=["onClick"],at={class:"info overflow-hidden"},ot={class:"m-0 overflow-hidden"},nt={class:"m-0 overflow-hidden text-sm text-muted"},rt=["title"],it=["onClick"],ut=["onClick"],ct=["onClick"],dt={key:1,class:"flex flex-col items-center"},pt=H(()=>t("span",{class:"italic text-sm text-muted"}," No releases in this queue ",-1)),vt=[pt],V="reap.releases.seen",K="reap.releases.remember",mt=M({__name:"Releases",setup(c){const r=f(!0),e=f("unseen"),d=l=>{const s=new Date(l),g=Math.floor((Date.now()-s.getTime())/1e3/60/60/24);return g==0?"Today":g==1?"Yesterday":g<100?`${g} days ago`:g<365?`${Math.floor(g/30)} months ago`:s.toLocaleDateString()},_=de();P(e,l=>{const s={queue:l};_.replace({query:s})});const n=N(()=>{switch(e.value){case"unseen":return S.value.filter(l=>!$.value.includes(l.url));case"out-today":return ne.value;case"watching":return k.value;case"all":return S.value;case"seen":return $.value.map(l=>S.value.find(s=>s.url==l)).filter(l=>l)}}),u=l=>{fe(l.artist,l.title,l.url)},a=f(null),w=f(null),O=new Date,S=f([]),W=l=>{a.value=l,te(()=>{var s;(s=w.value)==null||s.show()})},ne=N(()=>S.value.filter(l=>{const s=new Date(l.releaseDate);return O.getMonth()==s.getMonth()&&O.getDate()==s.getDate()&&O.getFullYear()==s.getFullYear()})),z=l=>{k.value.find(s=>s.url==l.url)||k.value.push(l)},X=l=>{k.value=k.value.filter(s=>s.url!=l.url)},Y=l=>{var g;let s=!1;l.url===((g=v.value)==null?void 0:g.url)&&(s=!0),$.value.includes(l.url)||$.value.push(l.url),s&&te(()=>u(v.value))},$=f([]),k=f([]),v=f(null),re=()=>{r.value=!0,fetch("/api/releases",{headers:{"X-Cache-Control":"no-cache"}}).then(l=>l.json()).then(l=>{S.value=l,r.value=!1})};return j(async()=>{var s;r.value=!0;const l=await fetch("/api/releases");S.value=await l.json(),r.value=!1,$.value=((s=localStorage.getItem(V))==null?void 0:s.split(","))??[],$.value=$.value.filter(g=>S.value.find(L=>L.url==g)),k.value=JSON.parse(localStorage.getItem(K)??"[]")}),P(n,l=>{v.value=l[0]??null}),P($,l=>{l.length?localStorage.setItem(V,l.join(",")):localStorage.removeItem(V)},{deep:!0}),P(k,l=>{l.length?localStorage.setItem(K,JSON.stringify(l)):localStorage.removeItem(K)},{deep:!0}),(l,s)=>{var g,L;return r.value?(o(),p("div",Le,[m(ae)])):(o(),p("div",Ne,[a.value?(o(),y(pe,{key:0,id:(g=a.value.url)==null?void 0:g.replace("https://open.spotify.com/album/",""),ref_key:"addReleaseRef",ref:w,album:{id:(L=a.value.url)==null?void 0:L.replace("https://open.spotify.com/album/",""),title:a.value.title,artist:a.value.artists.join(", "),cover:a.value.cover,href:a.value.url,releaseDate:a.value.releaseDate},artist:a.value.artist,cover:a.value.cover,href:a.value.url,title:a.value.title},null,8,["id","album","artist","cover","href","title"])):x("",!0),t("div",Be,[t("div",qe,[v.value?(o(),p("div",He,[v.value?(o(),y(Q,{key:0,class:"rounded-3xl",src:v.value.cover,"with-ambient":""},null,8,["src"])):x("",!0),t("div",Oe,[t("div",Ye,[t("span",{class:"preview material-symbols-rounded ms-fill text-5xl cursor-pointer",onClick:s[0]||(s[0]=i=>u(v.value))}," play_circle "),t("div",Je,[v.value?(o(),p("h3",Ve,[m(G,{text:v.value.title},null,8,["text"])])):x("",!0),v.value?(o(),p("p",Ke,[m(Z,{artist:v.value.artist},null,8,["artist"])])):x("",!0),v.value?(o(),p("p",{key:2,class:"m-0 text-muted text-xs",title:v.value.releaseDate},b(d(v.value.releaseDate)),9,Qe)):x("",!0)])]),t("div",Ue,[t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:s[1]||(s[1]=C(i=>W(v.value),["stop"])),title:"Add to playlist"}," add "),t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:s[2]||(s[2]=C(i=>k.value.find(I=>I.url===v.value.url)?X(v.value):z(v.value),["stop"])),title:"Pin"},b(k.value.find(i=>i.url===v.value.url)?"playlist_remove":"push_pin"),1),t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:s[3]||(s[3]=C(i=>Y(v.value),["stop"])),title:"Mark as seen"}," done_all ")])])])):(o(),p("div",We,Xe))]),m(U,{class:"queue w-full p-2 h-full flex flex-col gap-2 relative"},{default:h(()=>[t("div",Ge,[t("h5",{class:A(["cursor-pointer",{selected:e.value=="unseen"}]),onClick:s[4]||(s[4]=i=>e.value="unseen")}," Unseen ",2),t("h5",{class:A(["cursor-pointer",{selected:e.value=="out-today"}]),onClick:s[5]||(s[5]=i=>e.value="out-today")}," Out Today ",2),t("h5",{class:A(["cursor-pointer",{selected:e.value=="watching"}]),onClick:s[6]||(s[6]=i=>e.value="watching")}," Pinned ",2),t("h5",{class:A(["cursor-pointer",{selected:e.value=="seen"}]),onClick:s[7]||(s[7]=i=>e.value="seen")}," Seen ",2),t("h5",{class:A(["cursor-pointer",{selected:e.value=="all"}]),onClick:s[8]||(s[8]=i=>e.value="all")}," All ",2)]),e.value==="unseen"&&n.value.length?(o(),p("div",Ze,[t("span",{class:"cursor-pointer text-sm text-muted hover:text-primary flex items-center gap-2",onClick:re},[ee(" Refresh "),et]),t("span",{class:"cursor-pointer text-sm text-muted hover:text-primary flex items-center gap-2",onClick:s[9]||(s[9]=i=>n.value.forEach(Y))},[ee(" Mark all as seen "),tt])])):x("",!0),t("div",st,[n.value.length?(o(!0),p(R,{key:0},T(n.value,i=>(o(),p("div",{class:"entry",onClick:I=>{v.value=i,u(i)}},[m(Q,{class:"rounded-xl",src:i.cover},null,8,["src"]),t("div",at,[t("p",ot,[m(G,{text:i.title},null,8,["text"])]),t("p",nt,[m(Z,{artist:i.artist},null,8,["artist"])])]),t("p",{class:"text-sm m-0 text-muted",title:i.releaseDate},b(d(i.releaseDate)),9,rt),t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:C(I=>W(i),["stop"]),title:"Add to playlist"}," add ",8,it),t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:C(I=>k.value.find(ie=>ie.url===i.url)?X(i):z(i),["stop"]),title:"Pin"},b(k.value.find(I=>I.url===i.url)?"playlist_remove":"push_pin"),9,ut),t("span",{class:"material-symbols-rounded cursor-pointer text-muted hover:text-primary",onClick:C(I=>Y(i),["stop"]),title:"Mark as seen"}," done_all ",8,ct)],8,lt))),256)):x("",!0)]),n.value.length?x("",!0):(o(),p("div",dt,vt))]),_:1})])]))}}}),_t=D(mt,[["__scopeId","data-v-924f3e91"]]),ft={components:{Card:U},name:"ArtistItem",methods:{follow(c){c.stopPropagation();const r=this.following?"DELETE":"POST";fetch("/api/spotify/following",{method:r,body:JSON.stringify({artistId:this.id})}).then(e=>{e.status==200&&(this.following=!this.following)})}},data(){return{following:this.initiallyFollowing}},props:{cover:String,name:String,description:String,id:String,initiallyFollowing:Boolean,showFollowButton:Boolean}},ht={class:"item"},yt=["src"],gt={class:"flex gap-2 items-center justify-between"},xt=["innerHTML"];function wt(c,r,e,d,_,n){const u=E("add-artist-to-playlist"),a=E("Card");return o(),y(a,{class:"wrapper","with-hover":"",onClick:r[1]||(r[1]=C(w=>c.$router.push("/artist/"+e.name),["stop"]))},{default:h(()=>[m(u,{ref:"import",artist:{id:e.id,name:e.name,href:`https://open.spotify.com/artist/${e.id}`,image:e.cover}},null,8,["artist"]),t("div",ht,[t("img",{src:e.cover},null,8,yt),t("div",gt,[t("div",null,[t("h4",null,b(e.name),1),t("p",{innerHTML:e.description},null,8,xt)]),e.showFollowButton?(o(),p("span",{key:0,class:"material-symbols-rounded text-muted text-md",onClick:r[0]||(r[0]=C((...w)=>n.follow&&n.follow(...w),["stop"]))},b(_.following?"person_check":"person_add"),1)):x("",!0)])])]),_:1})}const kt=D(ft,[["render",wt],["__scopeId","data-v-286e9794"]]),$t={class:"artists"},Ct=M({__name:"Artists",setup(c){const r=f([]),e=f([]),d=f(null),_=f(null);return j(async()=>{d.value=fetch("/api/artists");let n=await d.value,u=await n.json();e.value=u.sort((a,w)=>a.name.localeCompare(w.name)),_.value=fetch("/api/spotify/artists"),n=await _.value,u=await n.json(),r.value=u.sort((a,w)=>a.name.localeCompare(w.name))}),(n,u)=>(o(),p("div",$t,[m(B,{response:d.value},{default:h(()=>[m(F,{heading:"In your library"},{default:h(()=>[(o(!0),p(R,null,T(e.value,a=>(o(),y(oe,{title:a.name,cover:a.image,onClick:w=>n.$router.push(`/artist/${a.name}`),imageType:"artist"},null,8,["title","cover","onClick"]))),256))]),_:1})]),_:1},8,["response"]),m(B,{response:_.value},{default:h(()=>[m(F,{heading:"Following on Spotify"},{default:h(()=>[(o(!0),p(R,null,T(r.value,(a,w)=>(o(),y(kt,{id:a.id,key:w,cover:a.cover,description:a.description,name:a.name,"initially-following":"","show-follow-button":""},null,8,["id","cover","description","name"]))),128))]),_:1})]),_:1},8,["response"])]))}}),bt=D(Ct,[["__scopeId","data-v-a8a87a8e"]]),St={class:"parent"},It={class:"collection"},Dt=M({__name:"index",setup(c){const r=ve(),e=N(()=>{switch(r.path.split("/")[2]){case"albums":return Ee;case"playlists":return je;case"releases":return _t;case"artists":return bt}});return(d,_)=>(o(),p("div",St,[m(Ce,{class:"header"}),t("main",It,[(o(),y(me(e.value)))])]))}}),Et=D(Dt,[["__scopeId","data-v-4fad4f51"]]);export{Et as default};
