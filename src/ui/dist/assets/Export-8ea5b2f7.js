import{G as st,C as Mt}from"./gistClient-3bb1d21f.js";import{_ as Dt,bW as $t,j as Ot,o as H,c as lt,a as M,g as ft,F as Gt,i as jt,f as Wt,e as pt,k as Yt,l as Vt}from"./index-dc6d2949.js";import{I as qt}from"./IconButton-46170c0d.js";import"./song-bf77990d.js";var at={},j={};j.byteLength=Xt;j.toByteArray=Kt;j.fromByteArray=vt;var T=[],C=[],Ht=typeof Uint8Array<"u"?Uint8Array:Array,J="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var P=0,Jt=J.length;P<Jt;++P)T[P]=J[P],C[J.charCodeAt(P)]=P;C["-".charCodeAt(0)]=62;C["_".charCodeAt(0)]=63;function yt(s){var h=s.length;if(h%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=s.indexOf("=");f===-1&&(f=h);var w=f===h?0:4-f%4;return[f,w]}function Xt(s){var h=yt(s),f=h[0],w=h[1];return(f+w)*3/4-w}function zt(s,h,f){return(h+f)*3/4-f}function Kt(s){var h,f=yt(s),w=f[0],y=f[1],p=new Ht(zt(s,w,y)),l=0,o=y>0?w-4:w,d;for(d=0;d<o;d+=4)h=C[s.charCodeAt(d)]<<18|C[s.charCodeAt(d+1)]<<12|C[s.charCodeAt(d+2)]<<6|C[s.charCodeAt(d+3)],p[l++]=h>>16&255,p[l++]=h>>8&255,p[l++]=h&255;return y===2&&(h=C[s.charCodeAt(d)]<<2|C[s.charCodeAt(d+1)]>>4,p[l++]=h&255),y===1&&(h=C[s.charCodeAt(d)]<<10|C[s.charCodeAt(d+1)]<<4|C[s.charCodeAt(d+2)]>>2,p[l++]=h>>8&255,p[l++]=h&255),p}function Zt(s){return T[s>>18&63]+T[s>>12&63]+T[s>>6&63]+T[s&63]}function Qt(s,h,f){for(var w,y=[],p=h;p<f;p+=3)w=(s[p]<<16&16711680)+(s[p+1]<<8&65280)+(s[p+2]&255),y.push(Zt(w));return y.join("")}function vt(s){for(var h,f=s.length,w=f%3,y=[],p=16383,l=0,o=f-w;l<o;l+=p)y.push(Qt(s,l,l+p>o?o:l+p));return w===1?(h=s[f-1],y.push(T[h>>2]+T[h<<4&63]+"==")):w===2&&(h=(s[f-2]<<8)+s[f-1],y.push(T[h>>10]+T[h>>4&63]+T[h<<2&63]+"=")),y.join("")}var X={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */X.read=function(s,h,f,w,y){var p,l,o=y*8-w-1,d=(1<<o)-1,_=d>>1,I=-7,F=f?y-1:0,S=f?-1:1,A=s[h+F];for(F+=S,p=A&(1<<-I)-1,A>>=-I,I+=o;I>0;p=p*256+s[h+F],F+=S,I-=8);for(l=p&(1<<-I)-1,p>>=-I,I+=w;I>0;l=l*256+s[h+F],F+=S,I-=8);if(p===0)p=1-_;else{if(p===d)return l?NaN:(A?-1:1)*(1/0);l=l+Math.pow(2,w),p=p-_}return(A?-1:1)*l*Math.pow(2,p-w)};X.write=function(s,h,f,w,y,p){var l,o,d,_=p*8-y-1,I=(1<<_)-1,F=I>>1,S=y===23?Math.pow(2,-24)-Math.pow(2,-77):0,A=w?0:p-1,D=w?1:-1,$=h<0||h===0&&1/h<0?1:0;for(h=Math.abs(h),isNaN(h)||h===1/0?(o=isNaN(h)?1:0,l=I):(l=Math.floor(Math.log(h)/Math.LN2),h*(d=Math.pow(2,-l))<1&&(l--,d*=2),l+F>=1?h+=S/d:h+=S*Math.pow(2,1-F),h*d>=2&&(l++,d/=2),l+F>=I?(o=0,l=I):l+F>=1?(o=(h*d-1)*Math.pow(2,y),l=l+F):(o=h*Math.pow(2,F-1)*Math.pow(2,y),l=0));y>=8;s[f+A]=o&255,A+=D,o/=256,y-=8);for(l=l<<y|o,_+=y;_>0;s[f+A]=l&255,A+=D,l/=256,_-=8);s[f+A-D]|=$*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(s){const h=j,f=X,w=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;s.Buffer=o,s.SlowBuffer=dt,s.INSPECT_MAX_BYTES=50;const y=2147483647;s.kMaxLength=y,o.TYPED_ARRAY_SUPPORT=p(),!o.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function p(){try{const i=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(i,t),i.foo()===42}catch{return!1}}Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}});function l(i){if(i>y)throw new RangeError('The value "'+i+'" is invalid for option "size"');const t=new Uint8Array(i);return Object.setPrototypeOf(t,o.prototype),t}function o(i,t,r){if(typeof i=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return F(i)}return d(i,t,r)}o.poolSize=8192;function d(i,t,r){if(typeof i=="string")return S(i,t);if(ArrayBuffer.isView(i))return D(i);if(i==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i);if(R(i,ArrayBuffer)||i&&R(i.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(R(i,SharedArrayBuffer)||i&&R(i.buffer,SharedArrayBuffer)))return $(i,t,r);if(typeof i=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const n=i.valueOf&&i.valueOf();if(n!=null&&n!==i)return o.from(n,t,r);const e=wt(i);if(e)return e;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof i[Symbol.toPrimitive]=="function")return o.from(i[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i)}o.from=function(i,t,r){return d(i,t,r)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array);function _(i){if(typeof i!="number")throw new TypeError('"size" argument must be of type number');if(i<0)throw new RangeError('The value "'+i+'" is invalid for option "size"')}function I(i,t,r){return _(i),i<=0?l(i):t!==void 0?typeof r=="string"?l(i).fill(t,r):l(i).fill(t):l(i)}o.alloc=function(i,t,r){return I(i,t,r)};function F(i){return _(i),l(i<0?0:W(i)|0)}o.allocUnsafe=function(i){return F(i)},o.allocUnsafeSlow=function(i){return F(i)};function S(i,t){if((typeof t!="string"||t==="")&&(t="utf8"),!o.isEncoding(t))throw new TypeError("Unknown encoding: "+t);const r=K(i,t)|0;let n=l(r);const e=n.write(i,t);return e!==r&&(n=n.slice(0,e)),n}function A(i){const t=i.length<0?0:W(i.length)|0,r=l(t);for(let n=0;n<t;n+=1)r[n]=i[n]&255;return r}function D(i){if(R(i,Uint8Array)){const t=new Uint8Array(i);return $(t.buffer,t.byteOffset,t.byteLength)}return A(i)}function $(i,t,r){if(t<0||i.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(i.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&r===void 0?n=new Uint8Array(i):r===void 0?n=new Uint8Array(i,t):n=new Uint8Array(i,t,r),Object.setPrototypeOf(n,o.prototype),n}function wt(i){if(o.isBuffer(i)){const t=W(i.length)|0,r=l(t);return r.length===0||i.copy(r,0,0,t),r}if(i.length!==void 0)return typeof i.length!="number"||q(i.length)?l(0):A(i);if(i.type==="Buffer"&&Array.isArray(i.data))return A(i.data)}function W(i){if(i>=y)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+y.toString(16)+" bytes");return i|0}function dt(i){return+i!=i&&(i=0),o.alloc(+i)}o.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==o.prototype},o.compare=function(t,r){if(R(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),R(r,Uint8Array)&&(r=o.from(r,r.offset,r.byteLength)),!o.isBuffer(t)||!o.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;let n=t.length,e=r.length;for(let u=0,c=Math.min(n,e);u<c;++u)if(t[u]!==r[u]){n=t[u],e=r[u];break}return n<e?-1:e<n?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return o.alloc(0);let n;if(r===void 0)for(r=0,n=0;n<t.length;++n)r+=t[n].length;const e=o.allocUnsafe(r);let u=0;for(n=0;n<t.length;++n){let c=t[n];if(R(c,Uint8Array))u+c.length>e.length?(o.isBuffer(c)||(c=o.from(c)),c.copy(e,u)):Uint8Array.prototype.set.call(e,c,u);else if(o.isBuffer(c))c.copy(e,u);else throw new TypeError('"list" argument must be an Array of Buffers');u+=c.length}return e};function K(i,t){if(o.isBuffer(i))return i.length;if(ArrayBuffer.isView(i)||R(i,ArrayBuffer))return i.byteLength;if(typeof i!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof i);const r=i.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&r===0)return 0;let e=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return V(i).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return r*2;case"hex":return r>>>1;case"base64":return ht(i).length;default:if(e)return n?-1:V(i).length;t=(""+t).toLowerCase(),e=!0}}o.byteLength=K;function xt(i,t,r){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((r===void 0||r>this.length)&&(r=this.length),r<=0)||(r>>>=0,t>>>=0,r<=t))return"";for(i||(i="utf8");;)switch(i){case"hex":return Ct(this,t,r);case"utf8":case"utf-8":return v(this,t,r);case"ascii":return Ut(this,t,r);case"latin1":case"binary":return _t(this,t,r);case"base64":return Ft(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Rt(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+i);i=(i+"").toLowerCase(),n=!0}}o.prototype._isBuffer=!0;function L(i,t,r){const n=i[t];i[t]=i[r],i[r]=n}o.prototype.swap16=function(){const t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let r=0;r<t;r+=2)L(this,r,r+1);return this},o.prototype.swap32=function(){const t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let r=0;r<t;r+=4)L(this,r,r+3),L(this,r+1,r+2);return this},o.prototype.swap64=function(){const t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let r=0;r<t;r+=8)L(this,r,r+7),L(this,r+1,r+6),L(this,r+2,r+5),L(this,r+3,r+4);return this},o.prototype.toString=function(){const t=this.length;return t===0?"":arguments.length===0?v(this,0,t):xt.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:o.compare(this,t)===0},o.prototype.inspect=function(){let t="";const r=s.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},w&&(o.prototype[w]=o.prototype.inspect),o.prototype.compare=function(t,r,n,e,u){if(R(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(r===void 0&&(r=0),n===void 0&&(n=t?t.length:0),e===void 0&&(e=0),u===void 0&&(u=this.length),r<0||n>t.length||e<0||u>this.length)throw new RangeError("out of range index");if(e>=u&&r>=n)return 0;if(e>=u)return-1;if(r>=n)return 1;if(r>>>=0,n>>>=0,e>>>=0,u>>>=0,this===t)return 0;let c=u-e,a=n-r;const E=Math.min(c,a),B=this.slice(e,u),m=t.slice(r,n);for(let x=0;x<E;++x)if(B[x]!==m[x]){c=B[x],a=m[x];break}return c<a?-1:a<c?1:0};function Z(i,t,r,n,e){if(i.length===0)return-1;if(typeof r=="string"?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,q(r)&&(r=e?0:i.length-1),r<0&&(r=i.length+r),r>=i.length){if(e)return-1;r=i.length-1}else if(r<0)if(e)r=0;else return-1;if(typeof t=="string"&&(t=o.from(t,n)),o.isBuffer(t))return t.length===0?-1:Q(i,t,r,n,e);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?e?Uint8Array.prototype.indexOf.call(i,t,r):Uint8Array.prototype.lastIndexOf.call(i,t,r):Q(i,[t],r,n,e);throw new TypeError("val must be string, number or Buffer")}function Q(i,t,r,n,e){let u=1,c=i.length,a=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(i.length<2||t.length<2)return-1;u=2,c/=2,a/=2,r/=2}function E(m,x){return u===1?m[x]:m.readUInt16BE(x*u)}let B;if(e){let m=-1;for(B=r;B<c;B++)if(E(i,B)===E(t,m===-1?0:B-m)){if(m===-1&&(m=B),B-m+1===a)return m*u}else m!==-1&&(B-=B-m),m=-1}else for(r+a>c&&(r=c-a),B=r;B>=0;B--){let m=!0;for(let x=0;x<a;x++)if(E(i,B+x)!==E(t,x)){m=!1;break}if(m)return B}return-1}o.prototype.includes=function(t,r,n){return this.indexOf(t,r,n)!==-1},o.prototype.indexOf=function(t,r,n){return Z(this,t,r,n,!0)},o.prototype.lastIndexOf=function(t,r,n){return Z(this,t,r,n,!1)};function Bt(i,t,r,n){r=Number(r)||0;const e=i.length-r;n?(n=Number(n),n>e&&(n=e)):n=e;const u=t.length;n>u/2&&(n=u/2);let c;for(c=0;c<n;++c){const a=parseInt(t.substr(c*2,2),16);if(q(a))return c;i[r+c]=a}return c}function Et(i,t,r,n){return G(V(t,i.length-r),i,r,n)}function mt(i,t,r,n){return G(Lt(t),i,r,n)}function gt(i,t,r,n){return G(ht(t),i,r,n)}function It(i,t,r,n){return G(Nt(t,i.length-r),i,r,n)}o.prototype.write=function(t,r,n,e){if(r===void 0)e="utf8",n=this.length,r=0;else if(n===void 0&&typeof r=="string")e=r,n=this.length,r=0;else if(isFinite(r))r=r>>>0,isFinite(n)?(n=n>>>0,e===void 0&&(e="utf8")):(e=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const u=this.length-r;if((n===void 0||n>u)&&(n=u),t.length>0&&(n<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");e||(e="utf8");let c=!1;for(;;)switch(e){case"hex":return Bt(this,t,r,n);case"utf8":case"utf-8":return Et(this,t,r,n);case"ascii":case"latin1":case"binary":return mt(this,t,r,n);case"base64":return gt(this,t,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return It(this,t,r,n);default:if(c)throw new TypeError("Unknown encoding: "+e);e=(""+e).toLowerCase(),c=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Ft(i,t,r){return t===0&&r===i.length?h.fromByteArray(i):h.fromByteArray(i.slice(t,r))}function v(i,t,r){r=Math.min(i.length,r);const n=[];let e=t;for(;e<r;){const u=i[e];let c=null,a=u>239?4:u>223?3:u>191?2:1;if(e+a<=r){let E,B,m,x;switch(a){case 1:u<128&&(c=u);break;case 2:E=i[e+1],(E&192)===128&&(x=(u&31)<<6|E&63,x>127&&(c=x));break;case 3:E=i[e+1],B=i[e+2],(E&192)===128&&(B&192)===128&&(x=(u&15)<<12|(E&63)<<6|B&63,x>2047&&(x<55296||x>57343)&&(c=x));break;case 4:E=i[e+1],B=i[e+2],m=i[e+3],(E&192)===128&&(B&192)===128&&(m&192)===128&&(x=(u&15)<<18|(E&63)<<12|(B&63)<<6|m&63,x>65535&&x<1114112&&(c=x))}}c===null?(c=65533,a=1):c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|c&1023),n.push(c),e+=a}return At(n)}const tt=4096;function At(i){const t=i.length;if(t<=tt)return String.fromCharCode.apply(String,i);let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,i.slice(n,n+=tt));return r}function Ut(i,t,r){let n="";r=Math.min(i.length,r);for(let e=t;e<r;++e)n+=String.fromCharCode(i[e]&127);return n}function _t(i,t,r){let n="";r=Math.min(i.length,r);for(let e=t;e<r;++e)n+=String.fromCharCode(i[e]);return n}function Ct(i,t,r){const n=i.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let e="";for(let u=t;u<r;++u)e+=bt[i[u]];return e}function Rt(i,t,r){const n=i.slice(t,r);let e="";for(let u=0;u<n.length-1;u+=2)e+=String.fromCharCode(n[u]+n[u+1]*256);return e}o.prototype.slice=function(t,r){const n=this.length;t=~~t,r=r===void 0?n:~~r,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),r<0?(r+=n,r<0&&(r=0)):r>n&&(r=n),r<t&&(r=t);const e=this.subarray(t,r);return Object.setPrototypeOf(e,o.prototype),e};function g(i,t,r){if(i%1!==0||i<0)throw new RangeError("offset is not uint");if(i+t>r)throw new RangeError("Trying to access beyond buffer length")}o.prototype.readUintLE=o.prototype.readUIntLE=function(t,r,n){t=t>>>0,r=r>>>0,n||g(t,r,this.length);let e=this[t],u=1,c=0;for(;++c<r&&(u*=256);)e+=this[t+c]*u;return e},o.prototype.readUintBE=o.prototype.readUIntBE=function(t,r,n){t=t>>>0,r=r>>>0,n||g(t,r,this.length);let e=this[t+--r],u=1;for(;r>0&&(u*=256);)e+=this[t+--r]*u;return e},o.prototype.readUint8=o.prototype.readUInt8=function(t,r){return t=t>>>0,r||g(t,1,this.length),this[t]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(t,r){return t=t>>>0,r||g(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(t,r){return t=t>>>0,r||g(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(t,r){return t=t>>>0,r||g(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(t,r){return t=t>>>0,r||g(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readBigUInt64LE=k(function(t){t=t>>>0,b(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&O(t,this.length-8);const e=r+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,u=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(e)+(BigInt(u)<<BigInt(32))}),o.prototype.readBigUInt64BE=k(function(t){t=t>>>0,b(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&O(t,this.length-8);const e=r*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],u=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(e)<<BigInt(32))+BigInt(u)}),o.prototype.readIntLE=function(t,r,n){t=t>>>0,r=r>>>0,n||g(t,r,this.length);let e=this[t],u=1,c=0;for(;++c<r&&(u*=256);)e+=this[t+c]*u;return u*=128,e>=u&&(e-=Math.pow(2,8*r)),e},o.prototype.readIntBE=function(t,r,n){t=t>>>0,r=r>>>0,n||g(t,r,this.length);let e=r,u=1,c=this[t+--e];for(;e>0&&(u*=256);)c+=this[t+--e]*u;return u*=128,c>=u&&(c-=Math.pow(2,8*r)),c},o.prototype.readInt8=function(t,r){return t=t>>>0,r||g(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]},o.prototype.readInt16LE=function(t,r){t=t>>>0,r||g(t,2,this.length);const n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n},o.prototype.readInt16BE=function(t,r){t=t>>>0,r||g(t,2,this.length);const n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n},o.prototype.readInt32LE=function(t,r){return t=t>>>0,r||g(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,r){return t=t>>>0,r||g(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readBigInt64LE=k(function(t){t=t>>>0,b(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&O(t,this.length-8);const e=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(e)<<BigInt(32))+BigInt(r+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)}),o.prototype.readBigInt64BE=k(function(t){t=t>>>0,b(t,"offset");const r=this[t],n=this[t+7];(r===void 0||n===void 0)&&O(t,this.length-8);const e=(r<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(e)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)}),o.prototype.readFloatLE=function(t,r){return t=t>>>0,r||g(t,4,this.length),f.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,r){return t=t>>>0,r||g(t,4,this.length),f.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,r){return t=t>>>0,r||g(t,8,this.length),f.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,r){return t=t>>>0,r||g(t,8,this.length),f.read(this,t,!1,52,8)};function U(i,t,r,n,e,u){if(!o.isBuffer(i))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>e||t<u)throw new RangeError('"value" argument is out of bounds');if(r+n>i.length)throw new RangeError("Index out of range")}o.prototype.writeUintLE=o.prototype.writeUIntLE=function(t,r,n,e){if(t=+t,r=r>>>0,n=n>>>0,!e){const a=Math.pow(2,8*n)-1;U(this,t,r,n,a,0)}let u=1,c=0;for(this[r]=t&255;++c<n&&(u*=256);)this[r+c]=t/u&255;return r+n},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(t,r,n,e){if(t=+t,r=r>>>0,n=n>>>0,!e){const a=Math.pow(2,8*n)-1;U(this,t,r,n,a,0)}let u=n-1,c=1;for(this[r+u]=t&255;--u>=0&&(c*=256);)this[r+u]=t/c&255;return r+n},o.prototype.writeUint8=o.prototype.writeUInt8=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,1,255,0),this[r]=t&255,r+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,65535,0),this[r]=t&255,this[r+1]=t>>>8,r+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=t&255,r+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=t&255,r+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t&255,r+4};function rt(i,t,r,n,e){ct(t,n,e,i,r,7);let u=Number(t&BigInt(4294967295));i[r++]=u,u=u>>8,i[r++]=u,u=u>>8,i[r++]=u,u=u>>8,i[r++]=u;let c=Number(t>>BigInt(32)&BigInt(4294967295));return i[r++]=c,c=c>>8,i[r++]=c,c=c>>8,i[r++]=c,c=c>>8,i[r++]=c,r}function it(i,t,r,n,e){ct(t,n,e,i,r,7);let u=Number(t&BigInt(4294967295));i[r+7]=u,u=u>>8,i[r+6]=u,u=u>>8,i[r+5]=u,u=u>>8,i[r+4]=u;let c=Number(t>>BigInt(32)&BigInt(4294967295));return i[r+3]=c,c=c>>8,i[r+2]=c,c=c>>8,i[r+1]=c,c=c>>8,i[r]=c,r+8}o.prototype.writeBigUInt64LE=k(function(t,r=0){return rt(this,t,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeBigUInt64BE=k(function(t,r=0){return it(this,t,r,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeIntLE=function(t,r,n,e){if(t=+t,r=r>>>0,!e){const E=Math.pow(2,8*n-1);U(this,t,r,n,E-1,-E)}let u=0,c=1,a=0;for(this[r]=t&255;++u<n&&(c*=256);)t<0&&a===0&&this[r+u-1]!==0&&(a=1),this[r+u]=(t/c>>0)-a&255;return r+n},o.prototype.writeIntBE=function(t,r,n,e){if(t=+t,r=r>>>0,!e){const E=Math.pow(2,8*n-1);U(this,t,r,n,E-1,-E)}let u=n-1,c=1,a=0;for(this[r+u]=t&255;--u>=0&&(c*=256);)t<0&&a===0&&this[r+u+1]!==0&&(a=1),this[r+u]=(t/c>>0)-a&255;return r+n},o.prototype.writeInt8=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=t&255,r+1},o.prototype.writeInt16LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,32767,-32768),this[r]=t&255,this[r+1]=t>>>8,r+2},o.prototype.writeInt16BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=t&255,r+2},o.prototype.writeInt32LE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,2147483647,-2147483648),this[r]=t&255,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},o.prototype.writeInt32BE=function(t,r,n){return t=+t,r=r>>>0,n||U(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t&255,r+4},o.prototype.writeBigInt64LE=k(function(t,r=0){return rt(this,t,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),o.prototype.writeBigInt64BE=k(function(t,r=0){return it(this,t,r,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function nt(i,t,r,n,e,u){if(r+n>i.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function et(i,t,r,n,e){return t=+t,r=r>>>0,e||nt(i,t,r,4),f.write(i,t,r,n,23,4),r+4}o.prototype.writeFloatLE=function(t,r,n){return et(this,t,r,!0,n)},o.prototype.writeFloatBE=function(t,r,n){return et(this,t,r,!1,n)};function ot(i,t,r,n,e){return t=+t,r=r>>>0,e||nt(i,t,r,8),f.write(i,t,r,n,52,8),r+8}o.prototype.writeDoubleLE=function(t,r,n){return ot(this,t,r,!0,n)},o.prototype.writeDoubleBE=function(t,r,n){return ot(this,t,r,!1,n)},o.prototype.copy=function(t,r,n,e){if(!o.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!e&&e!==0&&(e=this.length),r>=t.length&&(r=t.length),r||(r=0),e>0&&e<n&&(e=n),e===n||t.length===0||this.length===0)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("sourceEnd out of bounds");e>this.length&&(e=this.length),t.length-r<e-n&&(e=t.length-r+n);const u=e-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(r,n,e):Uint8Array.prototype.set.call(t,this.subarray(n,e),r),u},o.prototype.fill=function(t,r,n,e){if(typeof t=="string"){if(typeof r=="string"?(e=r,r=0,n=this.length):typeof n=="string"&&(e=n,n=this.length),e!==void 0&&typeof e!="string")throw new TypeError("encoding must be a string");if(typeof e=="string"&&!o.isEncoding(e))throw new TypeError("Unknown encoding: "+e);if(t.length===1){const c=t.charCodeAt(0);(e==="utf8"&&c<128||e==="latin1")&&(t=c)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(r<0||this.length<r||this.length<n)throw new RangeError("Out of range index");if(n<=r)return this;r=r>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let u;if(typeof t=="number")for(u=r;u<n;++u)this[u]=t;else{const c=o.isBuffer(t)?t:o.from(t,e),a=c.length;if(a===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(u=0;u<n-r;++u)this[u+r]=c[u%a]}return this};const N={};function Y(i,t,r){N[i]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${i}]`,this.stack,delete this.name}get code(){return i}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${i}]: ${this.message}`}}}Y("ERR_BUFFER_OUT_OF_BOUNDS",function(i){return i?`${i} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),Y("ERR_INVALID_ARG_TYPE",function(i,t){return`The "${i}" argument must be of type number. Received type ${typeof t}`},TypeError),Y("ERR_OUT_OF_RANGE",function(i,t,r){let n=`The value of "${i}" is out of range.`,e=r;return Number.isInteger(r)&&Math.abs(r)>2**32?e=ut(String(r)):typeof r=="bigint"&&(e=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(e=ut(e)),e+="n"),n+=` It must be ${t}. Received ${e}`,n},RangeError);function ut(i){let t="",r=i.length;const n=i[0]==="-"?1:0;for(;r>=n+4;r-=3)t=`_${i.slice(r-3,r)}${t}`;return`${i.slice(0,r)}${t}`}function Tt(i,t,r){b(t,"offset"),(i[t]===void 0||i[t+r]===void 0)&&O(t,i.length-(r+1))}function ct(i,t,r,n,e,u){if(i>r||i<t){const c=typeof t=="bigint"?"n":"";let a;throw u>3?t===0||t===BigInt(0)?a=`>= 0${c} and < 2${c} ** ${(u+1)*8}${c}`:a=`>= -(2${c} ** ${(u+1)*8-1}${c}) and < 2 ** ${(u+1)*8-1}${c}`:a=`>= ${t}${c} and <= ${r}${c}`,new N.ERR_OUT_OF_RANGE("value",a,i)}Tt(n,e,u)}function b(i,t){if(typeof i!="number")throw new N.ERR_INVALID_ARG_TYPE(t,"number",i)}function O(i,t,r){throw Math.floor(i)!==i?(b(i,r),new N.ERR_OUT_OF_RANGE(r||"offset","an integer",i)):t<0?new N.ERR_BUFFER_OUT_OF_BOUNDS:new N.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${t}`,i)}const St=/[^+/0-9A-Za-z-_]/g;function kt(i){if(i=i.split("=")[0],i=i.trim().replace(St,""),i.length<2)return"";for(;i.length%4!==0;)i=i+"=";return i}function V(i,t){t=t||1/0;let r;const n=i.length;let e=null;const u=[];for(let c=0;c<n;++c){if(r=i.charCodeAt(c),r>55295&&r<57344){if(!e){if(r>56319){(t-=3)>-1&&u.push(239,191,189);continue}else if(c+1===n){(t-=3)>-1&&u.push(239,191,189);continue}e=r;continue}if(r<56320){(t-=3)>-1&&u.push(239,191,189),e=r;continue}r=(e-55296<<10|r-56320)+65536}else e&&(t-=3)>-1&&u.push(239,191,189);if(e=null,r<128){if((t-=1)<0)break;u.push(r)}else if(r<2048){if((t-=2)<0)break;u.push(r>>6|192,r&63|128)}else if(r<65536){if((t-=3)<0)break;u.push(r>>12|224,r>>6&63|128,r&63|128)}else if(r<1114112){if((t-=4)<0)break;u.push(r>>18|240,r>>12&63|128,r>>6&63|128,r&63|128)}else throw new Error("Invalid code point")}return u}function Lt(i){const t=[];for(let r=0;r<i.length;++r)t.push(i.charCodeAt(r)&255);return t}function Nt(i,t){let r,n,e;const u=[];for(let c=0;c<i.length&&!((t-=2)<0);++c)r=i.charCodeAt(c),n=r>>8,e=r%256,u.push(e),u.push(n);return u}function ht(i){return h.toByteArray(kt(i))}function G(i,t,r,n){let e;for(e=0;e<n&&!(e+r>=t.length||e>=i.length);++e)t[e+r]=i[e];return e}function R(i,t){return i instanceof t||i!=null&&i.constructor!=null&&i.constructor.name!=null&&i.constructor.name===t.name}function q(i){return i!==i}const bt=function(){const i="0123456789abcdef",t=new Array(256);for(let r=0;r<16;++r){const n=r*16;for(let e=0;e<16;++e)t[n+e]=i[r]+i[e]}return t}();function k(i){return typeof BigInt>"u"?Pt:i}function Pt(){throw new Error("BigInt not supported")}})(at);window.Buffer=at.Buffer;new $t("reapApollo");const tr={name:"import",methods:{downloadFile(){var s="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.playlists)),h=document.getElementById("downloadAnchorElem");h.setAttribute("href",s),h.setAttribute("download","lib.one.json"),h.click()},async upload(){console.log(await st.save(this.playlists)),this.fetchGists()},async fetchGists(){this.cloudPlaylists=await st.getContent()},async fetchLocalPlaylists(){var s,h,f;console.log("fetching local playlists",(s=this.dataStore)==null?void 0:s.playlists),this.playlists=[];for(let w=0;w<((f=(h=this.dataStore)==null?void 0:h.playlists)==null?void 0:f.length);w++){const p=await(await fetch(`/api/playlists/${w}`)).json();this.playlists.push(p)}}},watch:{dataStore:{handler(){this.fetchLocalPlaylists()},deep:!0}},data(){return this.fetchGists(),{playlists:[],userData:{},cloudPlaylists:[],dataStore:Ot()}},components:{IconButton:qt,CloudPlaylist:Mt}},z=s=>(Yt("data-v-d17823a9"),s=s(),Vt(),s),rr={class:"export"},ir={class:"action"},nr=z(()=>M("h1",null,"Save to File",-1)),er=z(()=>M("a",{id:"downloadAnchorElem",style:{display:"none"}},null,-1)),or={class:"action"},ur=z(()=>M("h1",null,"Save to Github Gists",-1)),cr={class:"data"};function hr(s,h,f,w,y,p){const l=pt("IconButton"),o=pt("CloudPlaylist");return H(),lt("div",rr,[M("div",ir,[nr,er,ft(l,{icon:"file_download",label:"Save",onClick:p.downloadFile},null,8,["onClick"])]),M("div",or,[ur,ft(l,{icon:"cloud_upload",label:"Synchronise",onClick:p.upload},null,8,["onClick"])]),M("div",cr,[(H(!0),lt(Gt,null,jt(y.playlists,(d,_)=>(H(),Wt(o,{key:_,cloudPlaylists:y.cloudPlaylists,playlist:d,onRemove:()=>y.playlists.splice(_,1)},null,8,["cloudPlaylists","playlist","onRemove"]))),128))])])}const yr=Dt(tr,[["render",hr],["__scopeId","data-v-d17823a9"]]);export{yr as default};