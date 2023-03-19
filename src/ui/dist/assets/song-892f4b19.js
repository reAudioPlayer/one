import{j as c,bF as n,x as r,c0 as y}from"./index-5ef82822.js";const i=c(),l=async t=>{await fetch(`/api/playlists/${t.id}`,{method:"POST",body:JSON.stringify({name:t.name,description:t.description,cover:t.cover})}),await i.fetchPlaylists()},d=async t=>{const a=await fetch(`/api/playlists/${t}`);if(a.status===404)return null;const s=await a.json();for(const e of s.songs)e.href=`/track/${r(e.id)}`;return s.id=t,s},u=async t=>await d(n(t)),p=async t=>{await fetch(`/api/playlists/${t}`,{method:"DELETE"}),await i.fetchPlaylists()},o=async()=>{const a=await(await fetch("/api/playlists/new")).json();return await i.fetchPlaylists(),a},m=async(t,a="",s="")=>{const e=await o();return await l({id:e,name:t,description:a,cover:s}),e},S=async(t,a)=>{await fetch(`/api/playlists/${t}/tracks`,{method:"DELETE",body:JSON.stringify({songId:a})}),await i.fetchPlaylists()},g=async t=>{await fetch(`/api/tracks/${t.id}`,{method:"PUT",body:JSON.stringify({source:t.source,title:t.title,artist:t.artist,album:t.album,cover:t.cover})})},P=async(t,a,s)=>{await fetch(`/api/tracks/${t}`,{method:"PUT",body:JSON.stringify({[a]:s})})},b=async t=>await(await fetch("/api/browse/track",{method:"POST",body:JSON.stringify({url:t})})).json(),k=async(t,a)=>{t==="new"&&(t=await o()),typeof t=="string"&&console.error("playlistId cannot be a string",t),await fetch(`/api/playlists/${t}/tracks`,{method:"POST",body:JSON.stringify({source:a.source,title:a.title,artist:a.artist,album:a.album,cover:a.cover})})},O=async(t,a=!0)=>{await fetch(`/api/tracks/${t}`,{method:"PUT",body:JSON.stringify({favourite:a})})},$=async t=>{window.open(`/api/tracks/${t}/download`)},f=async t=>await(await fetch(`/api/tracks/${t}`)).json(),T=async t=>{const a=y(t);return await f(a)},j=async(t,a=!1,s=null)=>{const e={id:t};return a&&(e.forceFetch=!0),s&&(e.spotifyId=s),await(await fetch("/api/spotify/meta",{method:"POST",body:JSON.stringify(e)})).json()},v=async t=>await(await fetch(`/api/spotify/recommendations/${t}`)).json();export{k as a,o as b,m as c,p as d,u as e,b as f,d as g,T as h,j as i,v as j,$ as k,P as l,O as m,g as n,S as r,l as u};
