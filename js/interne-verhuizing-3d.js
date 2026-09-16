(()=>{var Jl=0,No=1,$l=2;var ks=1,Kl=2,es=3,si=0,De=1,on=2,Tn=0,ns=1,is=2,Uo=3,Fo=4,Ql=5;var xi=100,jl=101,tc=102,ec=103,nc=104,ic=200,sc=201,rc=202,ac=203,Oo=204,Bo=205,oc=206,lc=207,cc=208,hc=209,uc=210,dc=211,fc=212,pc=213,mc=214,Cr=0,Ir=1,Pr=2,ki=3,Lr=4,Dr=5,Nr=6,Ur=7,aa=0,gc=1,_c=2,gn=0,zo=1,Vo=2,Ho=3,ko=4,Go=5,Wo=6,Gs=7;var Xo=300,ri=301,vi=302,oa=303,la=304,Ws=306,Gi=1e3,Mn=1001,Fr=1002,Re=1003,xc=1004;var Xs=1005;var Le=1006,ca=1007;var ai=1008;var Ye=1009,qo=1010,Yo=1011,ss=1012,ha=1013,_n=1014,ln=1015,xn=1016,ua=1017,da=1018,rs=1020,Zo=35902,Jo=35899,$o=1021,Ko=1022,cn=1023,Sn=1026,oi=1027,fa=1028,pa=1029,li=1030,ma=1031;var ga=1033,qs=33776,Ys=33777,Zs=33778,Js=33779,_a=35840,xa=35841,va=35842,ya=35843,Ma=36196,Sa=37492,ba=37496,Ea=37488,Ta=37489,$s=37490,wa=37491,Aa=37808,Ra=37809,Ca=37810,Ia=37811,Pa=37812,La=37813,Da=37814,Na=37815,Ua=37816,Fa=37817,Oa=37818,Ba=37819,za=37820,Va=37821,Ha=36492,ka=36494,Ga=36495,Wa=36283,Xa=36284,Ks=36285,qa=36286;var Ss=2300,Or=2301,wr=2302,wo=2303,Ao=2400,Ro=2401,Co=2402;var vc=3200;var Qs=0,yc=1,Bn="",Ie="srgb",bs="srgb-linear",Es="linear",ie="srgb";var Ar=7680;var Mc=519,Sc=512,bc=513,Ec=514,Ya=515,Tc=516,wc=517,Za=518,Ac=519,Rc=35044;var Qo="300 es",mn=2e3,Wi=2001;function fh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ph(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Xi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cc(){let i=Xi("canvas");return i.style.display="block",i}var Tl={},qi=null;function jo(...i){let t="THREE."+i.shift();qi?qi("log",t,...i):console.log(t,...i)}function Ic(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Nt(...i){i=Ic(i);let t="THREE."+i.shift();if(qi)qi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Ut(...i){i=Ic(i);let t="THREE."+i.shift();if(qi)qi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function mi(...i){let t=i.join(" ");t in Tl||(Tl[t]=!0,Nt(...i))}function Pc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Lc={[Cr]:Ir,[Pr]:Nr,[Lr]:Ur,[ki]:Dr,[Ir]:Cr,[Nr]:Pr,[Ur]:Lr,[Dr]:ki},bn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var no=Math.PI/180,Br=180/Math.PI;function js(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function Jt(i,t,e){return Math.max(t,Math.min(e,i))}function mh(i,t){return(i%t+t)%t}function io(i,t,e){return(1-e)*i+e*t}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var sl=class sl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sl.prototype.isVector2=!0;var Xt=sl,nn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],p=r[a+1],v=r[a+2],M=r[a+3];if(f!==M||c!==h||l!==p||u!==v){let g=c*h+l*p+u*v+f*M;g<0&&(h=-h,p=-p,v=-v,M=-M,g=-g);let d=1-o;if(g<.9995){let T=Math.acos(g),L=Math.sin(T);d=Math.sin(d*T)/L,o=Math.sin(o*T)/L,c=c*d+h*o,l=l*d+p*o,u=u*d+v*o,f=f*d+M*o}else{c=c*d+h*o,l=l*d+p*o,u=u*d+v*o,f=f*d+M*o;let T=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=T,l*=T,u*=T,f*=T}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],p=r[a+2],v=r[a+3];return t[e]=o*v+u*f+c*p-l*h,t[e+1]=c*v+u*h+l*f-o*p,t[e+2]=l*v+u*p+o*h-c*f,t[e+3]=u*v-o*f-c*h-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),h=c(n/2),p=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*p*v,this._y=l*p*f-h*u*v,this._z=l*u*v+h*p*f,this._w=l*u*f-h*p*v;break;case"YXZ":this._x=h*u*f+l*p*v,this._y=l*p*f-h*u*v,this._z=l*u*v-h*p*f,this._w=l*u*f+h*p*v;break;case"ZXY":this._x=h*u*f-l*p*v,this._y=l*p*f+h*u*v,this._z=l*u*v+h*p*f,this._w=l*u*f-h*p*v;break;case"ZYX":this._x=h*u*f-l*p*v,this._y=l*p*f+h*u*v,this._z=l*u*v-h*p*f,this._w=l*u*f+h*p*v;break;case"YZX":this._x=h*u*f+l*p*v,this._y=l*p*f+h*u*v,this._z=l*u*v-h*p*f,this._w=l*u*f-h*p*v;break;case"XZY":this._x=h*u*f-l*p*v,this._y=l*p*f-h*u*v,this._z=l*u*v+h*p*f,this._w=l*u*f+h*p*v;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>f){let p=2*Math.sqrt(1+n-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){let p=2*Math.sqrt(1+o-n-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+f-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},rl=class rl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return so.copy(this).projectOnVector(t),this.sub(so)}reflect(t){return this.sub(so.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rl.prototype.isVector3=!0;var H=rl,so=new H,wl=new nn,al=class al{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],p=n[5],v=n[8],M=s[0],g=s[3],d=s[6],T=s[1],L=s[4],y=s[7],S=s[2],b=s[5],C=s[8];return r[0]=a*M+o*T+c*S,r[3]=a*g+o*L+c*b,r[6]=a*d+o*y+c*C,r[1]=l*M+u*T+f*S,r[4]=l*g+u*L+f*b,r[7]=l*d+u*y+f*C,r[2]=h*M+p*T+v*S,r[5]=h*g+p*L+v*b,r[8]=h*d+p*y+v*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*r,p=l*r-a*c,v=e*f+n*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/v;return t[0]=f*M,t[1]=(s*l-u*n)*M,t[2]=(o*n-s*a)*M,t[3]=h*M,t[4]=(u*e-s*c)*M,t[5]=(s*r-o*e)*M,t[6]=p*M,t[7]=(n*c-l*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ro.makeScale(t,e)),this}rotate(t){return mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ro.makeRotation(-t)),this}translate(t,e){return mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};al.prototype.isMatrix3=!0;var Ot=al,ro=new Ot,Al=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gh(){let i={enabled:!0,workingColorSpace:bs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ie&&(s.r=Fn(s.r),s.g=Fn(s.g),s.b=Fn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Es:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[bs]:{primaries:t,whitePoint:n,transfer:Es,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:Al,fromXYZ:Rl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var Zt=gh();function Fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var wi,zr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{wi===void 0&&(wi=Xi("canvas")),wi.width=t.width,wi.height=t.height;let s=wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Xi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Fn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},_h=0,Yi=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=js(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ao(s[a].image)):r.push(ao(s[a]))}else r=ao(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ao(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?zr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}var xh=0,oo=new H,Ve=class i extends bn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=Le,a=ai,o=cn,c=Ye,l=i.DEFAULT_ANISOTROPY,u=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=js(),this.name="",this.source=new Yi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(oo).x}get height(){return this.source.getSize(oo).y}get depth(){return this.source.getSize(oo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gi:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case Fr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gi:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case Fr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Xo;Ve.DEFAULT_ANISOTROPY=1;var ol=class ol{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],p=c[5],v=c[9],M=c[2],g=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-M)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+M)<.1&&Math.abs(v+g)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let L=(l+1)/2,y=(p+1)/2,S=(d+1)/2,b=(u+h)/4,C=(f+M)/4,x=(v+g)/4;return L>y&&L>S?L<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(L),s=b/n,r=C/n):y>S?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=x/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=C/r,s=x/r),this.set(n,s,r,e),this}let T=Math.sqrt((g-v)*(g-v)+(f-M)*(f-M)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(g-v)/T,this.y=(f-M)/T,this.z=(h-u)/T,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ol.prototype.isVector4=!0;var me=ol,Vr=class extends bn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ve(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Yi(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},qe=class extends Vr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ts=class extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Hr=class extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ra=class ra{constructor(t,e,n,s,r,a,o,c,l,u,f,h,p,v,M,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,f,h,p,v,M,g)}set(t,e,n,s,r,a,o,c,l,u,f,h,p,v,M,g){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=v,d[11]=M,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ra().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Ai.setFromMatrixColumn(t,0).length(),r=1/Ai.setFromMatrixColumn(t,1).length(),a=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,p=a*f,v=o*u,M=o*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=p+v*l,e[5]=h-M*l,e[9]=-o*c,e[2]=M-h*l,e[6]=v+p*l,e[10]=a*c}else if(t.order==="YXZ"){let h=c*u,p=c*f,v=l*u,M=l*f;e[0]=h+M*o,e[4]=v*o-p,e[8]=a*l,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=p*o-v,e[6]=M+h*o,e[10]=a*c}else if(t.order==="ZXY"){let h=c*u,p=c*f,v=l*u,M=l*f;e[0]=h-M*o,e[4]=-a*f,e[8]=v+p*o,e[1]=p+v*o,e[5]=a*u,e[9]=M-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let h=a*u,p=a*f,v=o*u,M=o*f;e[0]=c*u,e[4]=v*l-p,e[8]=h*l+M,e[1]=c*f,e[5]=M*l+h,e[9]=p*l-v,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let h=a*c,p=a*l,v=o*c,M=o*l;e[0]=c*u,e[4]=M-h*f,e[8]=v*f+p,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=p*f+v,e[10]=h-M*f}else if(t.order==="XZY"){let h=a*c,p=a*l,v=o*c,M=o*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+M,e[5]=a*u,e[9]=p*f-v,e[2]=v*f-p,e[6]=o*u,e[10]=M*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vh,t,yh)}lookAt(t,e,n){let s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),qn.crossVectors(n,Je),qn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),qn.crossVectors(n,Je)),qn.normalize(),ar.crossVectors(Je,qn),s[0]=qn.x,s[4]=ar.x,s[8]=Je.x,s[1]=qn.y,s[5]=ar.y,s[9]=Je.y,s[2]=qn.z,s[6]=ar.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],p=n[13],v=n[2],M=n[6],g=n[10],d=n[14],T=n[3],L=n[7],y=n[11],S=n[15],b=s[0],C=s[4],x=s[8],E=s[12],P=s[1],B=s[5],V=s[9],W=s[13],I=s[2],G=s[6],J=s[10],$=s[14],at=s[3],Y=s[7],it=s[11],st=s[15];return r[0]=a*b+o*P+c*I+l*at,r[4]=a*C+o*B+c*G+l*Y,r[8]=a*x+o*V+c*J+l*it,r[12]=a*E+o*W+c*$+l*st,r[1]=u*b+f*P+h*I+p*at,r[5]=u*C+f*B+h*G+p*Y,r[9]=u*x+f*V+h*J+p*it,r[13]=u*E+f*W+h*$+p*st,r[2]=v*b+M*P+g*I+d*at,r[6]=v*C+M*B+g*G+d*Y,r[10]=v*x+M*V+g*J+d*it,r[14]=v*E+M*W+g*$+d*st,r[3]=T*b+L*P+y*I+S*at,r[7]=T*C+L*B+y*G+S*Y,r[11]=T*x+L*V+y*J+S*it,r[15]=T*E+L*W+y*$+S*st,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],p=t[14],v=t[3],M=t[7],g=t[11],d=t[15],T=c*p-l*h,L=o*p-l*f,y=o*h-c*f,S=a*p-l*u,b=a*h-c*u,C=a*f-o*u;return e*(M*T-g*L+d*y)-n*(v*T-g*S+d*b)+s*(v*L-M*S+d*C)-r*(v*y-M*b+g*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],p=t[11],v=t[12],M=t[13],g=t[14],d=t[15],T=e*o-n*a,L=e*c-s*a,y=e*l-r*a,S=n*c-s*o,b=n*l-r*o,C=s*l-r*c,x=u*M-f*v,E=u*g-h*v,P=u*d-p*v,B=f*g-h*M,V=f*d-p*M,W=h*d-p*g,I=T*W-L*V+y*B+S*P-b*E+C*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/I;return t[0]=(o*W-c*V+l*B)*G,t[1]=(s*V-n*W-r*B)*G,t[2]=(M*C-g*b+d*S)*G,t[3]=(h*b-f*C-p*S)*G,t[4]=(c*P-a*W-l*E)*G,t[5]=(e*W-s*P+r*E)*G,t[6]=(g*y-v*C-d*L)*G,t[7]=(u*C-h*y+p*L)*G,t[8]=(a*V-o*P+l*x)*G,t[9]=(n*P-e*V-r*x)*G,t[10]=(v*b-M*y+d*T)*G,t[11]=(f*y-u*b-p*T)*G,t[12]=(o*E-a*B-c*x)*G,t[13]=(e*B-n*E+s*x)*G,t[14]=(M*L-v*S-g*T)*G,t[15]=(u*S-f*L+h*T)*G,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,f=o+o,h=r*l,p=r*u,v=r*f,M=a*u,g=a*f,d=o*f,T=c*l,L=c*u,y=c*f,S=n.x,b=n.y,C=n.z;return s[0]=(1-(M+d))*S,s[1]=(p+y)*S,s[2]=(v-L)*S,s[3]=0,s[4]=(p-y)*b,s[5]=(1-(h+d))*b,s[6]=(g+T)*b,s[7]=0,s[8]=(v+L)*C,s[9]=(g-T)*C,s[10]=(1-(h+M))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ai.set(s[0],s[1],s[2]).length(),o=Ai.set(s[4],s[5],s[6]).length(),c=Ai.set(s[8],s[9],s[10]).length();r<0&&(a=-a),un.copy(this);let l=1/a,u=1/o,f=1/c;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=f,un.elements[9]*=f,un.elements[10]*=f,e.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=mn,c=!1){let l=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),p=(n+s)/(n-s),v,M;if(c)v=r/(a-r),M=a*r/(a-r);else if(o===mn)v=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Wi)v=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=mn,c=!1){let l=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),p=-(n+s)/(n-s),v,M;if(c)v=1/(a-r),M=a/(a-r);else if(o===mn)v=-2/(a-r),M=-(a+r)/(a-r);else if(o===Wi)v=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=v,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ra.prototype.isMatrix4=!0;var ue=ra,Ai=new H,un=new ue,vh=new H(0,0,0),yh=new H(1,1,1),qn=new H,ar=new H,Je=new H,Cl=new ue,Il=new nn,sn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Il.setFromEuler(this),this.setFromQuaternion(Il,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};sn.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Mh=0,Pl=new H,Ri=new nn,Pn=new ue,or=new H,gs=new H,Sh=new H,bh=new nn,Ll=new H(1,0,0),Dl=new H(0,1,0),Nl=new H(0,0,1),Ul={type:"added"},Eh={type:"removed"},Ci={type:"childadded",child:null},lo={type:"childremoved",child:null},Ce=class i extends bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new sn,n=new nn,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Ot}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(Ll,t)}rotateY(t){return this.rotateOnAxis(Dl,t)}rotateZ(t){return this.rotateOnAxis(Nl,t)}translateOnAxis(t,e){return Pl.copy(t).applyQuaternion(this.quaternion),this.position.add(Pl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ll,t)}translateY(t){return this.translateOnAxis(Dl,t)}translateZ(t){return this.translateOnAxis(Nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(gs,or,this.up):Pn.lookAt(or,gs,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ut("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ul),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null):Ut("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eh),lo.child=t,this.dispatchEvent(lo),lo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ul),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,Sh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,bh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),v=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ce.DEFAULT_UP=new H(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ze=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},Th={type:"move"},Zi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let M of t.hand.values()){let g=e.getJointPose(M,n),d=this._getHandJoint(l,M);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,v=.005;l.inputState.pinching&&h>p+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=p-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Th)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},lr={h:0,s:0,l:0};function co(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Zt.workingColorSpace){if(t=mh(t,1),e=Jt(e,0,1),n=Jt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=co(a,r,t+1/3),this.g=co(a,r,t),this.b=co(a,r,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=Dc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Zt.workingToColorSpace(Be.copy(this),t),Math.round(Jt(Be.r*255,0,255))*65536+Math.round(Jt(Be.g*255,0,255))*256+Math.round(Jt(Be.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Be.copy(this),e);let n=Be.r,s=Be.g,r=Be.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Ie){Zt.workingToColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,s=Be.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(lr);let n=io(Yn.h,lr.h,e),s=io(Yn.s,lr.s,e),r=io(Yn.l,lr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Ht;Ht.NAMES=Dc;var gi=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},dn=new H,Ln=new H,ho=new H,Dn=new H,Ii=new H,Pi=new H,Fl=new H,uo=new H,fo=new H,po=new H,mo=new me,go=new me,_o=new me,Kn=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),Ln.subVectors(n,e),ho.subVectors(t,e);let a=dn.dot(dn),o=dn.dot(Ln),c=dn.dot(ho),l=Ln.dot(Ln),u=Ln.dot(ho),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,p=(l*c-o*u)*h,v=(a*u-o*c)*h;return r.set(1-p-v,v,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Dn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Dn.x),c.addScaledVector(a,Dn.y),c.addScaledVector(o,Dn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return mo.setScalar(0),go.setScalar(0),_o.setScalar(0),mo.fromBufferAttribute(t,e),go.fromBufferAttribute(t,n),_o.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(mo,r.x),a.addScaledVector(go,r.y),a.addScaledVector(_o,r.z),a}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),Ln.subVectors(t,e),dn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),dn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ii.subVectors(s,n),Pi.subVectors(r,n),uo.subVectors(t,n);let c=Ii.dot(uo),l=Pi.dot(uo);if(c<=0&&l<=0)return e.copy(n);fo.subVectors(t,s);let u=Ii.dot(fo),f=Pi.dot(fo);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ii,a);po.subVectors(t,r);let p=Ii.dot(po),v=Pi.dot(po);if(v>=0&&p<=v)return e.copy(r);let M=p*l-c*v;if(M<=0&&l>=0&&v<=0)return o=l/(l-v),e.copy(n).addScaledVector(Pi,o);let g=u*v-p*f;if(g<=0&&f-u>=0&&p-v>=0)return Fl.subVectors(r,s),o=(f-u)/(f-u+(p-v)),e.copy(s).addScaledVector(Fl,o);let d=1/(g+M+h);return a=M*d,o=h*d,e.copy(n).addScaledVector(Ii,a).addScaledVector(Pi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},En=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(t.matrixWorld),this.union(cr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_s),hr.subVectors(this.max,_s),Li.subVectors(t.a,_s),Di.subVectors(t.b,_s),Ni.subVectors(t.c,_s),Zn.subVectors(Di,Li),Jn.subVectors(Ni,Di),ui.subVectors(Li,Ni);let e=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-ui.z,ui.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,ui.z,0,-ui.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-ui.y,ui.x,0];return!xo(e,Li,Di,Ni,hr)||(e=[1,0,0,0,1,0,0,0,1],!xo(e,Li,Di,Ni,hr))?!1:(ur.crossVectors(Zn,Jn),e=[ur.x,ur.y,ur.z],xo(e,Li,Di,Ni,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Nn=[new H,new H,new H,new H,new H,new H,new H,new H],fn=new H,cr=new En,Li=new H,Di=new H,Ni=new H,Zn=new H,Jn=new H,ui=new H,_s=new H,hr=new H,ur=new H,di=new H;function xo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){di.fromArray(i,r);let o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=t.dot(di),l=e.dot(di),u=n.dot(di);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Se=new H,dr=new Xt,wh=0,Ke=class extends bn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rc,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var As=class extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Rs=class extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ae=class extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ah=new En,xs=new H,vo=new H,Qn=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ah.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);let e=xs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add(vo)),this.expandByPoint(xs.copy(t.center).sub(vo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Rh=0,en=new ue,yo=new Ce,Ui=new H,$e=new En,vs=new En,we=new H,rn=class i extends bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fh(t)?Rs:As)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return yo.lookAt(t),yo.updateMatrix(),this.applyMatrix4(yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ae(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors($e.min,vs.min),$e.expandByPoint(we),we.addVectors($e.max,vs.max),$e.expandByPoint(we)):($e.expandByPoint(vs.min),$e.expandByPoint(vs.max))}$e.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)we.fromBufferAttribute(o,l),c&&(Ui.fromBufferAttribute(t,l),we.add(Ui)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ke(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new H,c[x]=new H;let l=new H,u=new H,f=new H,h=new Xt,p=new Xt,v=new Xt,M=new H,g=new H;function d(x,E,P){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,P),h.fromBufferAttribute(r,x),p.fromBufferAttribute(r,E),v.fromBufferAttribute(r,P),u.sub(l),f.sub(l),p.sub(h),v.sub(h);let B=1/(p.x*v.y-v.x*p.y);isFinite(B)&&(M.copy(u).multiplyScalar(v.y).addScaledVector(f,-p.y).multiplyScalar(B),g.copy(f).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(B),o[x].add(M),o[E].add(M),o[P].add(M),c[x].add(g),c[E].add(g),c[P].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let x=0,E=T.length;x<E;++x){let P=T[x],B=P.start,V=P.count;for(let W=B,I=B+V;W<I;W+=3)d(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let L=new H,y=new H,S=new H,b=new H;function C(x){S.fromBufferAttribute(s,x),b.copy(S);let E=o[x];L.copy(E),L.sub(S.multiplyScalar(S.dot(E))).normalize(),y.crossVectors(b,E);let B=y.dot(c[x])<0?-1:1;a.setXYZW(x,L.x,L.y,L.z,B)}for(let x=0,E=T.length;x<E;++x){let P=T[x],B=P.start,V=P.count;for(let W=B,I=B+V;W<I;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new H,r=new H,a=new H,o=new H,c=new H,l=new H,u=new H,f=new H;if(t)for(let h=0,p=t.count;h<p;h+=3){let v=t.getX(h+0),M=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,v),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u),p=0,v=0;for(let M=0,g=c.length;M<g;M++){o.isInterleavedBufferAttribute?p=c[M]*o.data.stride+o.offset:p=c[M]*u;for(let d=0;d<u;d++)h[v++]=l[p++]}return new Ke(h,u,f)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){let h=l[u],p=t(h,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let p=l[f];u.push(p.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],f=r[l];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Mo=new H,Ch=new H,Ih=new Ot,pn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Mo.subVectors(n,e).cross(Ch.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Mo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ih.getNormalMatrix(t),s=this.coplanarPoint(Mo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ph=0,On=class extends bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=js(),this.name="",this.type="Material",this.blending=ns,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oo,this.blendDst=Bo,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=ki,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ar,this.stencilZFail=Ar,this.stencilZPass=Ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ht().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new pn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Un=new H,So=new H,fr=new H,pr=new H,kr=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){So.copy(t).add(e).multiplyScalar(.5),fr.copy(e).sub(t).normalize(),pr.copy(this.origin).sub(So);let r=t.distanceTo(e)*.5,a=-this.direction.dot(fr),o=pr.dot(this.direction),c=-pr.dot(fr),l=pr.lengthSq(),u=Math.abs(1-a*a),f,h,p,v;if(u>0)if(f=a*c-o,h=a*o-c,v=r*u,f>=0)if(h>=-v)if(h<=v){let M=1/u;f*=M,h*=M,p=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h<=-v?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l):h<=v?(f=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(So).addScaledVector(fr,h),p}intersectSphere(t,e){if(t.radius<0)return null;Un.subVectors(t.center,this.origin);let n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,p=t.z-a.z,v=e.x-a.x,M=e.y-a.y,g=e.z-a.z,d=n.x-a.x,T=n.y-a.y,L=n.z-a.z,y=Math.abs(c),S=Math.abs(l),b=Math.abs(u),C,x,E,P,B,V,W,I,G,J,$,at;if(y>=S&&y>=b?(E=c,V=f,G=v,at=d,c>=0?(C=l,x=u,P=h,B=p,W=M,I=g,J=T,$=L):(C=u,x=l,P=p,B=h,W=g,I=M,J=L,$=T)):S>=b?(E=l,V=h,G=M,at=T,l>=0?(C=u,x=c,P=p,B=f,W=g,I=v,J=L,$=d):(C=c,x=u,P=f,B=p,W=v,I=g,J=d,$=L)):(E=u,V=p,G=g,at=L,u>=0?(C=c,x=l,P=f,B=h,W=v,I=M,J=d,$=T):(C=l,x=c,P=h,B=f,W=M,I=v,J=T,$=d)),E===0)return null;let Y=C/E,it=x/E,st=1/E,Lt=P-Y*V,Rt=B-it*V,te=W-Y*G,qt=I-it*G,$t=J-Y*at,K=$-it*at,nt=$t*qt-K*te,Mt=Lt*K-Rt*$t,Dt=te*Rt-qt*Lt;if(s){if(nt<0||Mt<0||Dt<0)return null}else if((nt<0||Mt<0||Dt<0)&&(nt>0||Mt>0||Dt>0))return null;let yt=nt+Mt+Dt;if(yt===0)return null;let Vt=st*(nt*V+Mt*G+Dt*at);return(yt>0?Vt<0:Vt>0)?null:this.at(Vt/yt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},an=class extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=aa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ol=new ue,fi=new kr,mr=new Qn,Bl=new H,gr=new H,_r=new H,xr=new H,bo=new H,vr=new H,zl=new H,yr=new H,At=class extends Ce{constructor(t=new rn,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){vr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],f=r[c];u!==0&&(bo.fromBufferAttribute(f,t),a?vr.addScaledVector(bo,u):vr.addScaledVector(bo.sub(e),u))}e.add(vr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(mr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(mr,Bl)===null||fi.origin.distanceToSquared(Bl)>(t.far-t.near)**2))&&(Ol.copy(r).invert(),fi.copy(t.ray).applyMatrix4(Ol),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,M=h.length;v<M;v++){let g=h[v],d=a[g.materialIndex],T=Math.max(g.start,p.start),L=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let y=T,S=L;y<S;y+=3){let b=o.getX(y),C=o.getX(y+1),x=o.getX(y+2);s=Mr(this,d,t,n,l,u,f,b,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let v=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let g=v,d=M;g<d;g+=3){let T=o.getX(g),L=o.getX(g+1),y=o.getX(g+2);s=Mr(this,a,t,n,l,u,f,T,L,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,M=h.length;v<M;v++){let g=h[v],d=a[g.materialIndex],T=Math.max(g.start,p.start),L=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let y=T,S=L;y<S;y+=3){let b=y,C=y+1,x=y+2;s=Mr(this,d,t,n,l,u,f,b,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let v=Math.max(0,p.start),M=Math.min(c.count,p.start+p.count);for(let g=v,d=M;g<d;g+=3){let T=g,L=g+1,y=g+2;s=Mr(this,a,t,n,l,u,f,T,L,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Lh(i,t,e,n,s,r,a,o){let c;if(t.side===De?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===si,o),c===null)return null;yr.copy(o),yr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(yr);return l<e.near||l>e.far?null:{distance:l,point:yr.clone(),object:i}}function Mr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,gr),i.getVertexPosition(c,_r),i.getVertexPosition(l,xr);let u=Lh(i,t,e,n,gr,_r,xr,zl);if(u){let f=new H;Kn.getBarycoord(zl,gr,_r,xr,f),s&&(u.uv=Kn.getInterpolatedAttribute(s,o,c,l,f,new Xt)),r&&(u.uv1=Kn.getInterpolatedAttribute(r,o,c,l,f,new Xt)),a&&(u.normal=Kn.getInterpolatedAttribute(a,o,c,l,f,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new H,materialIndex:0};Kn.getNormal(gr,_r,xr,h.normal),u.face=h,u.barycoord=f}return u}var Cs=class extends Ve{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Re,u=Re,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Is=class extends Ke{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Fi=new ue,Vl=new ue,Sr=[],Hl=new En,Dh=new ue,ys=new At,Ms=new Qn,Ps=class extends At{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Is(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dh)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new En),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),Hl.copy(t.boundingBox).applyMatrix4(Fi),this.boundingBox.union(Hl)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),Ms.copy(t.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(Ms)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(n),t.ray.intersectsSphere(Ms)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fi),Vl.multiplyMatrices(n,Fi),ys.matrixWorld=Vl,ys.raycast(t,Sr);for(let a=0,o=Sr.length;a<o;a++){let c=Sr[a];c.instanceId=r,c.object=this,e.push(c)}Sr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Is(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cs(new Float32Array(s*this.count),s,this.count,fa,ln));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},pi=new Qn,Nh=new Xt(.5,.5),br=new H,Ji=class{constructor(t=new pn,e=new pn,n=new pn,s=new pn,r=new pn,a=new pn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],p=r[7],v=r[8],M=r[9],g=r[10],d=r[11],T=r[12],L=r[13],y=r[14],S=r[15];if(s[0].setComponents(l-a,p-u,d-v,S-T).normalize(),s[1].setComponents(l+a,p+u,d+v,S+T).normalize(),s[2].setComponents(l+o,p+f,d+M,S+L).normalize(),s[3].setComponents(l-o,p-f,d-M,S-L).normalize(),n)s[4].setComponents(c,h,g,y).normalize(),s[5].setComponents(l-c,p-h,d-g,S-y).normalize();else if(s[4].setComponents(l-c,p-h,d-g,S-y).normalize(),e===mn)s[5].setComponents(l+c,p+h,d+g,S+y).normalize();else if(e===Wi)s[5].setComponents(c,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){pi.center.set(0,0,0);let e=Nh.distanceTo(t.center);return pi.radius=.7071067811865476+e,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(br.x=s.normal.x>0?t.max.x:t.min.x,br.y=s.normal.y>0?t.max.y:t.min.y,br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(br)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ls=class extends Ve{constructor(t=[],e=ri,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ds=class extends Ve{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var jn=class extends Ve{constructor(t,e,n=_n,s,r,a,o=Re,c=Re,l,u=Sn,f=1){if(u!==Sn&&u!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Yi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Gr=class extends jn{constructor(t,e=_n,n=ri,s,r,a=Re,o=Re,c,l=Sn){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ns=class extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},be=class i extends rn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],f=[],h=0,p=0;v("z","y","x",-1,-1,n,e,t,a,r,0),v("z","y","x",1,-1,n,e,-t,a,r,1),v("x","z","y",1,1,t,n,e,s,a,2),v("x","z","y",1,-1,t,n,-e,s,a,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ae(l,3)),this.setAttribute("normal",new Ae(u,3)),this.setAttribute("uv",new Ae(f,2));function v(M,g,d,T,L,y,S,b,C,x,E){let P=y/C,B=S/x,V=y/2,W=S/2,I=b/2,G=C+1,J=x+1,$=0,at=0,Y=new H;for(let it=0;it<J;it++){let st=it*B-W;for(let Lt=0;Lt<G;Lt++){let Rt=Lt*P-V;Y[M]=Rt*T,Y[g]=st*L,Y[d]=I,l.push(Y.x,Y.y,Y.z),Y[M]=0,Y[g]=0,Y[d]=b>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(Lt/C),f.push(1-it/x),$+=1}}for(let it=0;it<x;it++)for(let st=0;st<C;st++){let Lt=h+st+G*it,Rt=h+st+G*(it+1),te=h+(st+1)+G*(it+1),qt=h+(st+1)+G*it;c.push(Lt,Rt,qt),c.push(Rt,te,qt),at+=6}o.addGroup(p,at,E),p+=at,h+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var _i=class i extends rn{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],h=[],p=[],v=0,M=[],g=n/2,d=0;T(),a===!1&&(t>0&&L(!0),e>0&&L(!1)),this.setIndex(u),this.setAttribute("position",new Ae(f,3)),this.setAttribute("normal",new Ae(h,3)),this.setAttribute("uv",new Ae(p,2));function T(){let y=new H,S=new H,b=0,C=(e-t)/n;for(let x=0;x<=r;x++){let E=[],P=x/r,B=P*(e-t)+t;for(let V=0;V<=s;V++){let W=V/s,I=W*c+o,G=Math.sin(I),J=Math.cos(I);S.x=B*G,S.y=-P*n+g,S.z=B*J,f.push(S.x,S.y,S.z),y.set(G,C,J).normalize(),h.push(y.x,y.y,y.z),p.push(W,1-P),E.push(v++)}M.push(E)}for(let x=0;x<s;x++)for(let E=0;E<r;E++){let P=M[E][x],B=M[E+1][x],V=M[E+1][x+1],W=M[E][x+1];(t>0||E!==0)&&(u.push(P,B,W),b+=3),(e>0||E!==r-1)&&(u.push(B,V,W),b+=3)}l.addGroup(d,b,0),d+=b}function L(y){let S=v,b=new Xt,C=new H,x=0,E=y===!0?t:e,P=y===!0?1:-1;for(let V=1;V<=s;V++)f.push(0,g*P,0),h.push(0,P,0),p.push(.5,.5),v++;let B=v;for(let V=0;V<=s;V++){let I=V/s*c+o,G=Math.cos(I),J=Math.sin(I);C.x=E*J,C.y=g*P,C.z=E*G,f.push(C.x,C.y,C.z),h.push(0,P,0),b.x=G*.5+.5,b.y=J*.5*P+.5,p.push(b.x,b.y),v++}for(let V=0;V<s;V++){let W=S+V,I=B+V;y===!0?u.push(I,I+1,W):u.push(I+1,I,W),x+=3}l.addGroup(d,x,y===!0?1:2),d+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var We=class i extends rn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=t/o,h=e/c,p=[],v=[],M=[],g=[];for(let d=0;d<u;d++){let T=d*h-a;for(let L=0;L<l;L++){let y=L*f-r;v.push(y,-T,0),M.push(0,0,1),g.push(L/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let T=0;T<o;T++){let L=T+l*d,y=T+l*(d+1),S=T+1+l*(d+1),b=T+1+l*d;p.push(L,y,b),p.push(y,S,b)}this.setIndex(p),this.setAttribute("position",new Ae(v,3)),this.setAttribute("normal",new Ae(M,3)),this.setAttribute("uv",new Ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var $i=class i extends rn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],f=new H,h=new H,p=[],v=[],M=[],g=[];for(let d=0;d<=n;d++){let T=[],L=d/n,y=a+L*o,S=t*Math.cos(y),b=Math.sqrt(t*t-S*S),C=0;d===0&&a===0?C=.5/e:d===n&&c===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){let E=x/e,P=s+E*r;f.x=-b*Math.cos(P),f.y=S,f.z=b*Math.sin(P),v.push(f.x,f.y,f.z),h.copy(f).normalize(),M.push(h.x,h.y,h.z),g.push(E+C,1-L),T.push(l++)}u.push(T)}for(let d=0;d<n;d++)for(let T=0;T<e;T++){let L=u[d][T+1],y=u[d][T],S=u[d+1][T],b=u[d+1][T+1];(d!==0||a>0)&&p.push(L,y,b),(d!==n-1||c<Math.PI)&&p.push(y,S,b)}this.setIndex(p),this.setAttribute("position",new Ae(v,3)),this.setAttribute("normal",new Ae(M,3)),this.setAttribute("uv",new Ae(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function yi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(kl(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(kl(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function He(i){let t={};for(let e=0;e<i.length;e++){let n=yi(i[e]);for(let s in n)t[s]=n[s]}return t}function kl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Uh(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function tl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}var Nc={clone:yi,merge:He},Fh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qe=class extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fh,this.fragmentShader=Oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yi(t.uniforms),this.uniformsGroups=Uh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new H().fromArray(s.value);break;case"v4":this.uniforms[n].value=new me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Wr=class extends Qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},oe=class extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qs,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ti=class extends oe{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Us=class extends On{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qs,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=aa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Xr=class extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},qr=class extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Oi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Eo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ei=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Yr=class extends ei{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ao,endingEnd:Ao}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ro:r=t,o=2*e-n;break;case Co:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ro:a=t,c=2*n-e;break;case Co:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,v=(n-e)/(s-e),M=v*v,g=M*v,d=-h*g+2*h*M-h*v,T=(1+h)*g+(-1.5-2*h)*M+(-.5+h)*v+1,L=(-1-p)*g+(1.5+p)*M+.5*v,y=p*g-p*M;for(let S=0;S!==o;++S)r[S]=d*a[u+S]+T*a[l+S]+L*a[c+S]+y*a[f+S];return r}},Zr=class extends ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*f+a[c+h]*u;return r}},Jr=class extends ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$r=class extends ei{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let v=(n-e)/(s-e),M=1-v;for(let g=0;g!==o;++g)r[g]=a[l+g]*M+a[c+g]*v;return r}let h=o*2,p=t-1;for(let v=0;v!==o;++v){let M=a[l+v],g=a[c+v],d=p*h+v*2,T=f[d],L=f[d+1],y=t*h+v*2,S=u[y],b=u[y+1],C=zh(n,e,T,S,s);r[v]=Uc(C,M,L,b,g)}return r}};function Uc(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Bh(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function zh(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Uc(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Bh(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Oi(e,this.TimeBufferType),this.values=Oi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Oi(t.times,Array),values:Oi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Eo(t.settings)&&(n.settings={inTangents:Oi(t.settings.inTangents,Array),outTangents:Oi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Jr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Zr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Yr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new $r(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ss:e=this.InterpolantFactoryMethodDiscrete;break;case Or:e=this.InterpolantFactoryMethodLinear;break;case wr:e=this.InterpolantFactoryMethodSmooth;break;case wo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Nt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Or;case this.InterpolantFactoryMethodSmooth:return wr;case this.InterpolantFactoryMethodBezier:return wo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Eo(this.settings)&&(Gl(this.settings.inTangents,t),Gl(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ut("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ut("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ut("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Ut("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&ph(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ut("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===wr,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*n,h=f-n,p=f+n;for(let v=0;v!==n;++v){let M=e[f+v];if(M!==e[h+v]||M!==e[p+v]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*n,h=a*n;for(let p=0;p!==n;++p)e[h+p]=e[f+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Eo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Gl(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}je.prototype.ValueTypeName="";je.prototype.TimeBufferType=Float32Array;je.prototype.ValueBufferType=Float32Array;je.prototype.DefaultInterpolation=Or;var ni=class extends je{constructor(t,e,n){super(t,e,n)}};ni.prototype.ValueTypeName="bool";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=Ss;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Kr.prototype.ValueTypeName="color";var Qr=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};Qr.prototype.ValueTypeName="number";var jr=class extends ei{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)nn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Fs=class extends je{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new jr(this.times,this.values,this.getValueSize(),t)}};Fs.prototype.ValueTypeName="quaternion";Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var ii=class extends je{constructor(t,e,n){super(t,e,n)}};ii.prototype.ValueTypeName="string";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=Ss;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var ta=class extends je{constructor(t,e,n,s){super(t,e,n,s)}};ta.prototype.ValueTypeName="vector";var Rr={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(Wl(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!Wl(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Wl(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var ea=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let p=l[f],v=l[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fc=new ea,Ki=class{constructor(t){this.manager=t!==void 0?t:Fc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ki.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bi=new WeakMap,na=class extends Ki{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=Rr.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let f=Bi.get(a);f===void 0&&(f=[],Bi.set(a,f)),f.push({onLoad:e,onError:s})}return a}let o=Xi("img");function c(){u(),e&&e(this);let f=Bi.get(this)||[];for(let h=0;h<f.length;h++){let p=f[h];p.onLoad&&p.onLoad(this)}Bi.delete(this),r.manager.itemEnd(t)}function l(f){u(),s&&s(f),Rr.remove(`image:${t}`);let h=Bi.get(this)||[];for(let p=0;p<h.length;p++){let v=h[p];v.onError&&v.onError(f)}Bi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Rr.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}};var Os=class extends Ki{constructor(t){super(t)}load(t,e,n,s){let r=new Ve,a=new na(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Qi=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Bs=class extends Qi{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},To=new ue,Xl=new H,ql=new H,zs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=Ye,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ji,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xl),ql.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ql),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){To.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(To,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Wi||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(To)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Er=new H,Tr=new nn,yn=new H,Vs=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Er,Tr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Er,Tr,yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Er,Tr,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Er,Tr,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$n=new H,Yl=new Xt,Zl=new Xt,Pe=class extends Vs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Br*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(no*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Br*2*Math.atan(Math.tan(no*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Yl,Zl),e.subVectors(Zl,Yl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(no*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Io=class extends zs{constructor(){super(new Pe(90,1,.5,500)),this.isPointLightShadow=!0}},Hs=class extends Qi{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Io}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ji=class extends Vs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Po=class extends zs{constructor(){super(new ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ts=class extends Qi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Po}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var zi=-90,Vi=1,ia=class extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Pe(zi,Vi,t,e);s.layers=this.layers,this.add(s);let r=new Pe(zi,Vi,t,e);r.layers=this.layers,this.add(r);let a=new Pe(zi,Vi,t,e);a.layers=this.layers,this.add(a);let o=new Pe(zi,Vi,t,e);o.layers=this.layers,this.add(o);let c=new Pe(zi,Vi,t,e);c.layers=this.layers,this.add(c);let l=new Pe(zi,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Wi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},sa=class extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var el="\\[\\]\\.:\\/",Vh=new RegExp("["+el+"]","g"),nl="[^"+el+"]",Hh="[^"+el.replace("\\.","")+"]",kh=/((?:WC+[\/:])*)/.source.replace("WC",nl),Gh=/(WCOD+)?/.source.replace("WCOD",Hh),Wh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nl),Xh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nl),qh=new RegExp("^"+kh+Gh+Wh+Xh+"$"),Yh=["material","materials","bones","map"],Lo=class{constructor(t,e,n){let s=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Vh,"")}static parseTrackName(t){let e=qh.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Yh.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Nt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ut("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ut("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ut("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Ut("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Ut("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Ut("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Lo;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Gm=new Float32Array(1);var ll=class ll{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};ll.prototype.isMatrix2=!0;var Do=ll;function il(i,t,e,n){let s=Zh(n);switch(e){case $o:return i*t;case fa:return i*t/s.components*s.byteLength;case pa:return i*t/s.components*s.byteLength;case li:return i*t*2/s.components*s.byteLength;case ma:return i*t*2/s.components*s.byteLength;case Ko:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case ga:return i*t*4/s.components*s.byteLength;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zs:case Js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:case ya:return Math.max(i,16)*Math.max(t,8)/4;case _a:case va:return Math.max(i,8)*Math.max(t,8)/2;case Ma:case Sa:case Ea:case Ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ba:case $s:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Da:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ha:case ka:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Wa:case Xa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ks:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zh(i){switch(i){case Ye:case qo:return{byteLength:1,components:1};case ss:case Yo:case xn:return{byteLength:2,components:1};case ua:case da:return{byteLength:2,components:4};case _n:case ha:case ln:return{byteLength:4,components:1};case Zo:case Jo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function sh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function $h(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array!="undefined"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<f.length;p++){let v=f[h],M=f[p];M.start<=v.start+v.count+1?v.count=Math.max(v.count,M.start+M.count-v.start):(++h,f[h]=M)}f.length=h+1;for(let p=0,v=f.length;p<v;p++){let M=f[p];i.bufferSubData(l,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,jh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ru=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ou=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,uu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_u=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,xu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,yu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Su=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,bu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Au="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ru=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Iu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Nu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ou=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ku=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Gu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Wu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ju=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$u=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ku=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Qu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ju=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,td=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ed=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,id=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ad=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,od=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ld=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ud=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,md=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,yd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Md=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ed=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Td=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ad=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ld=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Nd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ud=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Od=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,qd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$d=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Kd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,af=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,of=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,df=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ff=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_f=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ef=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Af=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,If=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Kh,alphahash_pars_fragment:Qh,alphamap_fragment:jh,alphamap_pars_fragment:tu,alphatest_fragment:eu,alphatest_pars_fragment:nu,aomap_fragment:iu,aomap_pars_fragment:su,batching_pars_vertex:ru,batching_vertex:au,begin_vertex:ou,beginnormal_vertex:lu,bsdfs:cu,iridescence_fragment:hu,bumpmap_pars_fragment:uu,clipping_planes_fragment:du,clipping_planes_pars_fragment:fu,clipping_planes_pars_vertex:pu,clipping_planes_vertex:mu,color_fragment:gu,color_pars_fragment:_u,color_pars_vertex:xu,color_vertex:vu,common:yu,cube_uv_reflection_fragment:Mu,defaultnormal_vertex:Su,displacementmap_pars_vertex:bu,displacementmap_vertex:Eu,emissivemap_fragment:Tu,emissivemap_pars_fragment:wu,colorspace_fragment:Au,colorspace_pars_fragment:Ru,envmap_fragment:Cu,envmap_common_pars_fragment:Iu,envmap_pars_fragment:Pu,envmap_pars_vertex:Lu,envmap_physical_pars_fragment:Gu,envmap_vertex:Du,fog_vertex:Nu,fog_pars_vertex:Uu,fog_fragment:Fu,fog_pars_fragment:Ou,gradientmap_pars_fragment:Bu,lightmap_pars_fragment:zu,lights_lambert_fragment:Vu,lights_lambert_pars_fragment:Hu,lights_pars_begin:ku,lights_toon_fragment:Wu,lights_toon_pars_fragment:Xu,lights_phong_fragment:qu,lights_phong_pars_fragment:Yu,lights_physical_fragment:Zu,lights_physical_pars_fragment:Ju,lights_fragment_begin:$u,lights_fragment_maps:Ku,lights_fragment_end:Qu,lightprobes_pars_fragment:ju,logdepthbuf_fragment:td,logdepthbuf_pars_fragment:ed,logdepthbuf_pars_vertex:nd,logdepthbuf_vertex:id,map_fragment:sd,map_pars_fragment:rd,map_particle_fragment:ad,map_particle_pars_fragment:od,metalnessmap_fragment:ld,metalnessmap_pars_fragment:cd,morphinstance_vertex:hd,morphcolor_vertex:ud,morphnormal_vertex:dd,morphtarget_pars_vertex:fd,morphtarget_vertex:pd,normal_fragment_begin:md,normal_fragment_maps:gd,normal_pars_fragment:_d,normal_pars_vertex:xd,normal_vertex:vd,normalmap_pars_fragment:yd,clearcoat_normal_fragment_begin:Md,clearcoat_normal_fragment_maps:Sd,clearcoat_pars_fragment:bd,iridescence_pars_fragment:Ed,opaque_fragment:Td,packing:wd,premultiplied_alpha_fragment:Ad,project_vertex:Rd,dithering_fragment:Cd,dithering_pars_fragment:Id,roughnessmap_fragment:Pd,roughnessmap_pars_fragment:Ld,shadowmap_pars_fragment:Dd,shadowmap_pars_vertex:Nd,shadowmap_vertex:Ud,shadowmask_pars_fragment:Fd,skinbase_vertex:Od,skinning_pars_vertex:Bd,skinning_vertex:zd,skinnormal_vertex:Vd,specularmap_fragment:Hd,specularmap_pars_fragment:kd,tonemapping_fragment:Gd,tonemapping_pars_fragment:Wd,transmission_fragment:Xd,transmission_pars_fragment:qd,uv_pars_fragment:Yd,uv_pars_vertex:Zd,uv_vertex:Jd,worldpos_vertex:$d,background_vert:Kd,background_frag:Qd,backgroundCube_vert:jd,backgroundCube_frag:tf,cube_vert:ef,cube_frag:nf,depth_vert:sf,depth_frag:rf,distance_vert:af,distance_frag:of,equirect_vert:lf,equirect_frag:cf,linedashed_vert:hf,linedashed_frag:uf,meshbasic_vert:df,meshbasic_frag:ff,meshlambert_vert:pf,meshlambert_frag:mf,meshmatcap_vert:gf,meshmatcap_frag:_f,meshnormal_vert:xf,meshnormal_frag:vf,meshphong_vert:yf,meshphong_frag:Mf,meshphysical_vert:Sf,meshphysical_frag:bf,meshtoon_vert:Ef,meshtoon_frag:Tf,points_vert:wf,points_frag:Af,shadow_vert:Rf,shadow_frag:Cf,sprite_vert:If,sprite_frag:Pf},_t={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},An={basic:{uniforms:He([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:He([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ht(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:He([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:He([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:He([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Ht(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:He([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:He([_t.points,_t.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:He([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:He([_t.common,_t.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:He([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:He([_t.sprite,_t.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:He([_t.common,_t.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:He([_t.lights,_t.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};An.physical={uniforms:He([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Ja={r:0,b:0,g:0},Lf=new ue,rh=new Ot;rh.set(-1,0,0,0,1,0,0,0,1);function Df(i,t,e,n,s,r){let a=new Ht(0),o=s===!0?0:1,c,l,u=null,f=0,h=null;function p(T){let L=T.isScene===!0?T.background:null;if(L&&L.isTexture){let y=T.backgroundBlurriness>0;L=t.get(L,y)}return L}function v(T){let L=!1,y=p(T);y===null?g(a,o):y&&y.isColor&&(g(y,1),L=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||L)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(T,L){let y=p(L);y&&(y.isCubeTexture||y.mapping===Ws)?(l===void 0&&(l=new At(new be(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:yi(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:De,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Lf.makeRotationFromEuler(L.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(rh),l.material.toneMapped=Zt.getTransfer(y.colorSpace)!==ie,(u!==y||f!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new At(new We(2,2),new Qe({name:"BackgroundMaterial",uniforms:yi(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(y.colorSpace)!==ie,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,L){T.getRGB(Ja,tl(i)),e.buffers.color.setClear(Ja.r,Ja.g,Ja.b,L,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,L=1){a.set(T),o=L,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:v,addToRenderList:M,dispose:d}}function Nf(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(B,V,W,I,G){let J=!1,$=f(B,I,W,V);r!==$&&(r=$,l(r.object)),J=p(B,I,W,G),J&&v(B,I,W,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,y(B,V,W,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(B){return i.bindVertexArray(B)}function u(B){return i.deleteVertexArray(B)}function f(B,V,W,I){let G=I.wireframe===!0,J=n[V.id];J===void 0&&(J={},n[V.id]=J);let $=B.isInstancedMesh===!0?B.id:0,at=J[$];at===void 0&&(at={},J[$]=at);let Y=at[W.id];Y===void 0&&(Y={},at[W.id]=Y);let it=Y[G];return it===void 0&&(it=h(c()),Y[G]=it),it}function h(B){let V=[],W=[],I=[];for(let G=0;G<e;G++)V[G]=0,W[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:W,attributeDivisors:I,object:B,attributes:{},index:null}}function p(B,V,W,I){let G=r.attributes,J=V.attributes,$=0,at=W.getAttributes();for(let Y in at)if(at[Y].location>=0){let st=G[Y],Lt=J[Y];if(Lt===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(Lt=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(Lt=B.instanceColor)),st===void 0||st.attribute!==Lt||Lt&&st.data!==Lt.data)return!0;$++}return r.attributesNum!==$||r.index!==I}function v(B,V,W,I){let G={},J=V.attributes,$=0,at=W.getAttributes();for(let Y in at)if(at[Y].location>=0){let st=J[Y];st===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(st=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(st=B.instanceColor));let Lt={};Lt.attribute=st,st&&st.data&&(Lt.data=st.data),G[Y]=Lt,$++}r.attributes=G,r.attributesNum=$,r.index=I}function M(){let B=r.newAttributes;for(let V=0,W=B.length;V<W;V++)B[V]=0}function g(B){d(B,0)}function d(B,V){let W=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;W[B]=1,I[B]===0&&(i.enableVertexAttribArray(B),I[B]=1),G[B]!==V&&(i.vertexAttribDivisor(B,V),G[B]=V)}function T(){let B=r.newAttributes,V=r.enabledAttributes;for(let W=0,I=V.length;W<I;W++)V[W]!==B[W]&&(i.disableVertexAttribArray(W),V[W]=0)}function L(B,V,W,I,G,J,$){$===!0?i.vertexAttribIPointer(B,V,W,G,J):i.vertexAttribPointer(B,V,W,I,G,J)}function y(B,V,W,I){M();let G=I.attributes,J=W.getAttributes(),$=V.defaultAttributeValues;for(let at in J){let Y=J[at];if(Y.location>=0){let it=G[at];if(it===void 0&&(at==="instanceMatrix"&&B.instanceMatrix&&(it=B.instanceMatrix),at==="instanceColor"&&B.instanceColor&&(it=B.instanceColor)),it!==void 0){let st=it.normalized,Lt=it.itemSize,Rt=t.get(it);if(Rt===void 0)continue;let te=Rt.buffer,qt=Rt.type,$t=Rt.bytesPerElement,K=qt===i.INT||qt===i.UNSIGNED_INT||it.gpuType===ha;if(it.isInterleavedBufferAttribute){let nt=it.data,Mt=nt.stride,Dt=it.offset;if(nt.isInstancedInterleavedBuffer){for(let yt=0;yt<Y.locationSize;yt++)d(Y.location+yt,nt.meshPerAttribute);B.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let yt=0;yt<Y.locationSize;yt++)g(Y.location+yt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let yt=0;yt<Y.locationSize;yt++)L(Y.location+yt,Lt/Y.locationSize,qt,st,Mt*$t,(Dt+Lt/Y.locationSize*yt)*$t,K)}else{if(it.isInstancedBufferAttribute){for(let nt=0;nt<Y.locationSize;nt++)d(Y.location+nt,it.meshPerAttribute);B.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let nt=0;nt<Y.locationSize;nt++)g(Y.location+nt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let nt=0;nt<Y.locationSize;nt++)L(Y.location+nt,Lt/Y.locationSize,qt,st,Lt*$t,Lt/Y.locationSize*nt*$t,K)}}else if($!==void 0){let st=$[at];if(st!==void 0)switch(st.length){case 2:i.vertexAttrib2fv(Y.location,st);break;case 3:i.vertexAttrib3fv(Y.location,st);break;case 4:i.vertexAttrib4fv(Y.location,st);break;default:i.vertexAttrib1fv(Y.location,st)}}}}T()}function S(){E();for(let B in n){let V=n[B];for(let W in V){let I=V[W];for(let G in I){let J=I[G];for(let $ in J)u(J[$].object),delete J[$];delete I[G]}}delete n[B]}}function b(B){if(n[B.id]===void 0)return;let V=n[B.id];for(let W in V){let I=V[W];for(let G in I){let J=I[G];for(let $ in J)u(J[$].object),delete J[$];delete I[G]}}delete n[B.id]}function C(B){for(let V in n){let W=n[V];for(let I in W){let G=W[I];if(G[B.id]===void 0)continue;let J=G[B.id];for(let $ in J)u(J[$].object),delete J[$];delete G[B.id]}}}function x(B){for(let V in n){let W=n[V],I=B.isInstancedMesh===!0?B.id:0,G=W[I];if(G!==void 0){for(let J in G){let $=G[J];for(let at in $)u($[at].object),delete $[at];delete G[J]}delete W[I],Object.keys(W).length===0&&delete n[V]}}}function E(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:M,enableAttribute:g,disableUnusedAttributes:T}}function Uf(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ff(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ye&&C!==ln&&!x&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Nt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),L=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:M,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:T,maxVaryings:L,maxFragmentUniforms:y,maxSamples:S,samples:b}}function Of(i){let t=this,e=null,n=0,s=!1,r=!1,a=new pn,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let v=f.clippingPlanes,M=f.clipIntersection,g=f.clipShadows,d=i.get(f);if(!s||v===null||v.length===0||r&&!g)r?u(null):l();else{let T=r?0:n,L=T*4,y=d.clippingState||null;c.value=y,y=u(v,h,L,p);for(let S=0;S!==L;++S)y[S]=e[S];d.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,p,v){let M=f!==null?f.length:0,g=null;if(M!==0){if(g=c.value,v!==!0||g===null){let d=p+M*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<d)&&(g=new Float32Array(d));for(let L=0,y=p;L!==M;++L,y+=4)a.copy(f[L]).applyMatrix4(T,o),a.normal.toArray(g,y),g[y+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,g}}var os=4,Bf=6,zf=20,Vf=256,tr=new ji,Oc=new Ht,cl=null,hl=0,ul=0,dl=!1,Hf=new H,Mi=new H,cs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Hf}=r;cl=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(cl,hl,ul),this._renderer.xr.enabled=dl,t.scissorTest=!1,as(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ri||t.mapping===vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),cl=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),dl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:xn,format:cn,colorSpace:bs,depthBuffer:!1},s=Bc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=kf(r)),this._blurMaterial=Wf(r,t,e),this._ggxMaterial=Gf(r,t,e)}return s}_compileMaterial(t){let e=new At(new rn,t);this._renderer.compile(e,tr)}_sceneToCubeUV(t,e,n,s,r){let c=new Pe(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Oc),f.toneMapping=gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new At(new be,new an({name:"PMREM.Background",side:De,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,g=M.material,d=!1,T=t.background;T?T.isColor&&(g.color.copy(T),t.background=null,d=!0):(g.color.copy(Oc),d=!0);for(let L=0;L<6;L++){let y=L%3;y===0?(c.up.set(0,l[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[L],r.y,r.z)):y===1?(c.up.set(0,0,l[L]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[L],r.z)):(c.up.set(0,l[L],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[L]));let S=this._cubeSize;as(s,y*S,L>2?S:0,S,S),f.setRenderTarget(s),d&&f.render(M,c),f.render(t,c)}f.toneMapping=p,f.autoClear=h,t.background=T}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ri||t.mapping===vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;as(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,tr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,p=f*h,{_lodMax:v}=this,M=this._sizeLods[n],g=3*M*(n>v-os?n-v+os:0),d=4*(this._cubeSize-M);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=v-e,as(r,g,d,3*M,2*M),s.setRenderTarget(r),s.render(o,tr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-n,as(t,g,d,3*M,2*M),s.setRenderTarget(t),s.render(o,tr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-os?s-this._lodMax+os:0),h=4*(this._cubeSize-u);as(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(c,tr)}};function kf(i){let t=[],e=[],n=i,s=i-os+1+Bf;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,p=3,v=new Float32Array(p*h*f),M=new Float32Array(p*h*f);for(let d=0;d<f;d++){let T=d%3*2/3-1,L=d>2?0:-1,y=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];v.set(y,p*h*d);for(let S=0;S<h;S++){let b=u[S*2]*2-1,C=u[S*2+1]*2-1;d===0?Mi.set(1,C,b):d===1?Mi.set(-b,1,-C):d===2?Mi.set(-b,C,1):d===3?Mi.set(-1,C,-b):d===4?Mi.set(-b,-1,C):Mi.set(b,C,-1),Mi.toArray(M,(d*h+S)*p)}}let g=new rn;g.setAttribute("position",new Ke(v,p)),g.setAttribute("outputDirection",new Ke(M,p)),e.push(new At(g,null)),n>os&&n--}return{lodMeshes:e,sizeLods:t}}function Bc(i,t,e){let n=new qe(i,t,e);return n.texture.mapping=Ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function as(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Gf(i,t,e){return new Qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ja(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Wf(i,t,e){return new Qe({name:"SphericalGaussianBlur",defines:{SAMPLES:zf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ja(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function zc(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Vc(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function ja(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ka=class extends qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ls(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new be(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:De,blending:Tn});r.uniforms.tEquirect.value=e;let a=new At(s,r),o=e.minFilter;return e.minFilter===ai&&(e.minFilter=Le),new ia(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Xf(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===oa||p===la)if(t.has(h)){let v=t.get(h).texture;return o(v,h.mapping)}else{let v=h.image;if(v&&v.height>0){let M=new Ka(v.height);return M.fromEquirectangularTexture(i,h),t.set(h,M),h.addEventListener("dispose",l),o(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let p=h.mapping,v=p===oa||p===la,M=p===ri||p===vi;if(v||M){let g=e.get(h),d=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new cs(i)),g=v?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let T=h.image;return v&&T&&T.height>0||M&&T&&c(T)?(n===null&&(n=new cs(i)),g=v?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,p){return p===oa?h.mapping=ri:p===la&&(h.mapping=vi),h}function c(h){let p=0,v=6;for(let M=0;M<v;M++)h[M]!==void 0&&p++;return p===v}function l(h){let p=h.target;p.removeEventListener("dispose",l);let v=t.get(p);v!==void 0&&(t.delete(p),v.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function qf(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&mi("WebGLRenderer: "+n+" extension not supported."),s}}}function Yf(i,t,e,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let v in h.attributes)t.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];let p=r.get(h);p&&(t.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let p in h)t.update(h[p],i.ARRAY_BUFFER)}function l(f){let h=[],p=f.index,v=f.attributes.position,M=0;if(v===void 0)return;if(p!==null){let T=p.array;M=p.version;for(let L=0,y=T.length;L<y;L+=3){let S=T[L+0],b=T[L+1],C=T[L+2];h.push(S,b,b,C,C,S)}}else{let T=v.array;M=v.version;for(let L=0,y=T.length/3-1;L<y;L+=3){let S=L+0,b=L+1,C=L+2;h.push(S,b,b,C,C,S)}}let g=new(v.count>=65535?Rs:As)(h,1);g.version=M;let d=r.get(f);d&&t.remove(d),r.set(f,g)}function u(f){let h=r.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Zf(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*a),e.update(h,n,1)}function l(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*a,p),e.update(h,n,p))}function u(f,h,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let M=0;for(let g=0;g<p;g++)M+=h[g];e.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Jf(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Ut("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function $f(i,t,e){let n=new WeakMap,s=new me;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let E=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],L=0;p===!0&&(L=1),v===!0&&(L=2),M===!0&&(L=3);let y=o.attributes.position.count*L,S=1;y>t.maxTextureSize&&(S=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let b=new Float32Array(y*S*4*f),C=new Ts(b,y,S,f);C.type=ln,C.needsUpdate=!0;let x=L*4;for(let P=0;P<f;P++){let B=g[P],V=d[P],W=T[P],I=y*S*4*P;for(let G=0;G<B.count;G++){let J=G*x;p===!0&&(s.fromBufferAttribute(B,G),b[I+J+0]=s.x,b[I+J+1]=s.y,b[I+J+2]=s.z,b[I+J+3]=0),v===!0&&(s.fromBufferAttribute(V,G),b[I+J+4]=s.x,b[I+J+5]=s.y,b[I+J+6]=s.z,b[I+J+7]=0),M===!0&&(s.fromBufferAttribute(W,G),b[I+J+8]=s.x,b[I+J+9]=s.y,b[I+J+10]=s.z,b[I+J+11]=W.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new Xt(y,S)},n.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let M=0;M<l.length;M++)p+=l[M];let v=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Kf(i,t,e,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Qf={[zo]:"LINEAR_TONE_MAPPING",[Vo]:"REINHARD_TONE_MAPPING",[Ho]:"CINEON_TONE_MAPPING",[ko]:"ACES_FILMIC_TONE_MAPPING",[Wo]:"AGX_TONE_MAPPING",[Gs]:"NEUTRAL_TONE_MAPPING",[Go]:"CUSTOM_TONE_MAPPING"};function jf(i,t,e,n,s,r){let a=new qe(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new rn;l.setAttribute("position",new Ae([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ae([0,2,0,0,2,0],2));let u=new Wr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new At(l,u),h=new ji(-1,1,1,-1,0,1),p=null,v=null,M=!1,g,d=null,T=[],L=!1;this.setSize=function(y,S){a.setSize(y,S),o!==null&&o.setSize(y,S),c!==null&&c.setSize(y,S);for(let b=0;b<T.length;b++){let C=T[b];C.setSize&&C.setSize(y,S)}},this.setEffects=function(y){T=y,L=T.length>0&&T[0].isRenderPass===!0;let S=a.width,b=a.height;T.length>0&&o===null&&(o=new qe(S,b,{type:xn,depthBuffer:!1,stencilBuffer:!1}),c=new qe(S,b,{type:xn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<T.length;C++){let x=T[C];x.setSize&&x.setSize(S,b)}},this.begin=function(y,S){if(M||y.toneMapping===gn&&T.length===0)return!1;if(d=S,S!==null){let b=S.width,C=S.height;(a.width!==b||a.height!==C)&&this.setSize(b,C)}return L===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=gn,!0},this.hasRenderPass=function(){return L},this.end=function(y,S){y.toneMapping=g,M=!0;let b=a,C=o;for(let x=0;x<T.length;x++){let E=T[x];E.enabled!==!1&&(E.render(y,C,b,S),E.needsSwap!==!1&&(b=C,C=C===o?c:o))}if(p!==y.outputColorSpace||v!==y.toneMapping){p=y.outputColorSpace,v=y.toneMapping,u.defines={},Zt.getTransfer(p)===ie&&(u.defines.SRGB_TRANSFER="");let x=Qf[v];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(d),y.render(f,h),d=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ah=new Ve,ml=new jn(1,1),oh=new Ts,lh=new Hr,ch=new Ls,Hc=[],kc=[],Gc=new Float32Array(16),Wc=new Float32Array(9),Xc=new Float32Array(4);function hs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Hc[s];if(r===void 0&&(r=new Float32Array(s),Hc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function to(i,t){let e=kc[t];e===void 0&&(e=new Int32Array(t),kc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function tp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ep(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function ip(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function sp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Xc.set(n),i.uniformMatrix2fv(this.addr,!1,Xc),Te(e,n)}}function rp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Wc.set(n),i.uniformMatrix3fv(this.addr,!1,Wc),Te(e,n)}}function ap(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Gc.set(n),i.uniformMatrix4fv(this.addr,!1,Gc),Te(e,n)}}function op(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function lp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function cp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function up(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function dp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function fp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function pp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function mp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ml.compareFunction=e.isReversedDepthBuffer()?Za:Ya,r=ml):r=ah,e.setTexture2D(t||r,s)}function gp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||lh,s)}function _p(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ch,s)}function xp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||oh,s)}function vp(i){switch(i){case 5126:return tp;case 35664:return ep;case 35665:return np;case 35666:return ip;case 35674:return sp;case 35675:return rp;case 35676:return ap;case 5124:case 35670:return op;case 35667:case 35671:return lp;case 35668:case 35672:return cp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return dp;case 36295:return fp;case 36296:return pp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return xp}}function yp(i,t){i.uniform1fv(this.addr,t)}function Mp(i,t){let e=hs(t,this.size,2);i.uniform2fv(this.addr,e)}function Sp(i,t){let e=hs(t,this.size,3);i.uniform3fv(this.addr,e)}function bp(i,t){let e=hs(t,this.size,4);i.uniform4fv(this.addr,e)}function Ep(i,t){let e=hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Tp(i,t){let e=hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function wp(i,t){let e=hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ap(i,t){i.uniform1iv(this.addr,t)}function Rp(i,t){i.uniform2iv(this.addr,t)}function Cp(i,t){i.uniform3iv(this.addr,t)}function Ip(i,t){i.uniform4iv(this.addr,t)}function Pp(i,t){i.uniform1uiv(this.addr,t)}function Lp(i,t){i.uniform2uiv(this.addr,t)}function Dp(i,t){i.uniform3uiv(this.addr,t)}function Np(i,t){i.uniform4uiv(this.addr,t)}function Up(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ml:a=ah;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Fp(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||lh,r[a])}function Op(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ch,r[a])}function Bp(i,t,e){let n=this.cache,s=t.length,r=to(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||oh,r[a])}function zp(i){switch(i){case 5126:return yp;case 35664:return Mp;case 35665:return Sp;case 35666:return bp;case 35674:return Ep;case 35675:return Tp;case 35676:return wp;case 5124:case 35670:return Ap;case 35667:case 35671:return Rp;case 35668:case 35672:return Cp;case 35669:case 35673:return Ip;case 5125:return Pp;case 36294:return Lp;case 36295:return Dp;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Bp}}var gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vp(e.type)}},_l=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zp(e.type)}},xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},fl=/(\w+)(\])?(\[|\.)?/g;function qc(i,t){i.seq.push(t),i.map[t.id]=t}function Vp(i,t,e){let n=i.name,s=n.length;for(fl.lastIndex=0;;){let r=fl.exec(n),a=fl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){qc(e,l===void 0?new gl(o,i,t):new _l(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new xl(o),qc(e,f)),e=f}}}var ls=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Vp(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Yc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Hp=37297,kp=0;function Gp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Zc=new Ot;function Wp(i){Zt._getMatrix(Zc,Zt.workingColorSpace,i);let t=`mat3( ${Zc.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(i)){case Es:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Jc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Gp(i.getShaderSource(t),o)}else return r}function Xp(i,t){let e=Wp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var qp={[zo]:"Linear",[Vo]:"Reinhard",[Ho]:"Cineon",[ko]:"ACESFilmic",[Wo]:"AgX",[Gs]:"Neutral",[Go]:"Custom"};function Yp(i,t){let e=qp[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var $a=new H;function Zp(){Zt.getLuminanceCoefficients($a);let i=$a.x.toFixed(4),t=$a.y.toFixed(4),e=$a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function $p(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function nr(i){return i!==""}function $c(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Qp=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(i){return i.replace(Qp,tm)}var jp=new Map;function tm(i,t){let e=kt[t];if(e===void 0){let n=jp.get(t);if(n!==void 0)e=kt[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return vl(e)}var em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qc(i){return i.replace(em,nm)}function nm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var im={[ks]:"SHADOWMAP_TYPE_PCF",[es]:"SHADOWMAP_TYPE_VSM"};function sm(i){return im[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var rm={[ri]:"ENVMAP_TYPE_CUBE",[vi]:"ENVMAP_TYPE_CUBE",[Ws]:"ENVMAP_TYPE_CUBE_UV"};function am(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":rm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var om={[vi]:"ENVMAP_MODE_REFRACTION"};function lm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":om[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cm={[aa]:"ENVMAP_BLENDING_MULTIPLY",[gc]:"ENVMAP_BLENDING_MIX",[_c]:"ENVMAP_BLENDING_ADD"};function hm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":cm[i.combine]||"ENVMAP_BLENDING_NONE"}function um(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function dm(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=sm(e),l=am(e),u=lm(e),f=hm(e),h=um(e),p=Jp(e),v=$p(r),M=s.createProgram(),g,d,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(nr).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(nr).join(`
`),d.length>0&&(d+=`
`)):(g=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),d=[jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gn?"#define TONE_MAPPING":"",e.toneMapping!==gn?kt.tonemapping_pars_fragment:"",e.toneMapping!==gn?Yp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Xp("linearToOutputTexel",e.outputColorSpace),Zp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),a=vl(a),a=$c(a,e),a=Kc(a,e),o=vl(o),o=$c(o,e),o=Kc(o,e),a=Qc(a),o=Qc(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let L=T+g+a,y=T+d+o,S=Yc(s,s.VERTEX_SHADER,L),b=Yc(s,s.FRAGMENT_SHADER,y);s.attachShader(M,S),s.attachShader(M,b),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function C(B){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(M)||"",W=s.getShaderInfoLog(S)||"",I=s.getShaderInfoLog(b)||"",G=V.trim(),J=W.trim(),$=I.trim(),at=!0,Y=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(at=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,S,b);else{let it=Jc(s,S,"vertex"),st=Jc(s,b,"fragment");Ut("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+G+`
`+it+`
`+st)}else G!==""?Nt("WebGLProgram: Program Info Log:",G):(J===""||$==="")&&(Y=!1);Y&&(B.diagnostics={runnable:at,programLog:G,vertexShader:{log:J,prefix:g},fragmentShader:{log:$,prefix:d}})}s.deleteShader(S),s.deleteShader(b),x=new ls(s,M),E=Kp(s,M)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(M,Hp)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kp++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=S,this.fragmentShader=b,this}var fm=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ml(t),e.set(t,n)),n}},Ml=class{constructor(t){this.id=fm++,this.code=t,this.usedTimes=0}};function pm(i){return i===li||i===$s||i===Ks}function mm(i,t,e,n,s,r){let a=new ws,o=new yl,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return c.add(x),x===0?"uv":`uv${x}`}function M(x,E,P,B,V,W){let I=B.fog,G=V.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?B.environment:null,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,at=t.get(x.envMap||J,$),Y=at&&at.mapping===Ws?at.image.height:null,it=p[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&Nt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let st=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Lt=st!==void 0?st.length:0,Rt=0;G.morphAttributes.position!==void 0&&(Rt=1),G.morphAttributes.normal!==void 0&&(Rt=2),G.morphAttributes.color!==void 0&&(Rt=3);let te,qt,$t,K;if(it){let se=An[it];te=se.vertexShader,qt=se.fragmentShader}else{te=x.vertexShader,qt=x.fragmentShader;let se=o.getVertexShaderStage(x),jt=o.getFragmentShaderStage(x);o.update(x,se,jt),$t=se.id,K=jt.id}let nt=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Dt=V.isInstancedMesh===!0,yt=V.isBatchedMesh===!0,Vt=!!x.map,ge=!!x.matcap,Gt=!!at,Yt=!!x.aoMap,re=!!x.lightMap,Wt=!!x.bumpMap&&x.wireframe===!1,ce=!!x.normalMap,xe=!!x.displacementMap,Ne=!!x.emissiveMap,ee=!!x.metalnessMap,de=!!x.roughnessMap,N=x.anisotropy>0,_e=x.clearcoat>0,Qt=x.dispersion>0,w=x.retroreflectivity>0,m=x.iridescence>0,z=x.sheen>0,k=x.transmission>0,q=N&&!!x.anisotropyMap,lt=_e&&!!x.clearcoatMap,dt=_e&&!!x.clearcoatNormalMap,Z=_e&&!!x.clearcoatRoughnessMap,et=m&&!!x.iridescenceMap,ft=m&&!!x.iridescenceThicknessMap,bt=z&&!!x.sheenColorMap,pt=z&&!!x.sheenRoughnessMap,mt=!!x.specularMap,Ct=!!x.specularColorMap,Pt=!!x.specularIntensityMap,Bt=k&&!!x.transmissionMap,D=k&&!!x.thicknessMap,ut=!!x.gradientMap,j=!!x.alphaMap,gt=x.alphaTest>0,xt=!!x.alphaHash,rt=!!x.extensions,It=gn;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(It=i.toneMapping);let wt={shaderID:it,shaderType:x.type,shaderName:x.name,vertexShader:te,fragmentShader:qt,defines:x.defines,customVertexShaderID:$t,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:yt,batchingColor:yt&&V._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&V.instanceColor!==null,instancingMorph:Dt&&V.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Zt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Vt,matcap:ge,envMap:Gt,envMapMode:Gt&&at.mapping,envMapCubeUVHeight:Y,aoMap:Yt,lightMap:re,bumpMap:Wt,normalMap:ce,displacementMap:xe,emissiveMap:Ne,normalMapObjectSpace:ce&&x.normalMapType===yc,normalMapTangentSpace:ce&&x.normalMapType===Qs,packedNormalMap:ce&&x.normalMapType===Qs&&pm(x.normalMap.format),metalnessMap:ee,roughnessMap:de,anisotropy:N,anisotropyMap:q,clearcoat:_e,clearcoatMap:lt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Z,dispersion:Qt,retroreflection:w,iridescence:m,iridescenceMap:et,iridescenceThicknessMap:ft,sheen:z,sheenColorMap:bt,sheenRoughnessMap:pt,specularMap:mt,specularColorMap:Ct,specularIntensityMap:Pt,transmission:k,transmissionMap:Bt,thicknessMap:D,gradientMap:ut,opaque:x.transparent===!1&&x.blending===ns&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:gt,alphaHash:xt,combine:x.combine,mapUv:Vt&&v(x.map.channel),aoMapUv:Yt&&v(x.aoMap.channel),lightMapUv:re&&v(x.lightMap.channel),bumpMapUv:Wt&&v(x.bumpMap.channel),normalMapUv:ce&&v(x.normalMap.channel),displacementMapUv:xe&&v(x.displacementMap.channel),emissiveMapUv:Ne&&v(x.emissiveMap.channel),metalnessMapUv:ee&&v(x.metalnessMap.channel),roughnessMapUv:de&&v(x.roughnessMap.channel),anisotropyMapUv:q&&v(x.anisotropyMap.channel),clearcoatMapUv:lt&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:dt&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ft&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:pt&&v(x.sheenRoughnessMap.channel),specularMapUv:mt&&v(x.specularMap.channel),specularColorMapUv:Ct&&v(x.specularColorMap.channel),specularIntensityMapUv:Pt&&v(x.specularIntensityMap.channel),transmissionMapUv:Bt&&v(x.transmissionMap.channel),thicknessMapUv:D&&v(x.thicknessMap.channel),alphaMapUv:j&&v(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ce||N),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!G.attributes.uv&&(Vt||j),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&ce===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Mt,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:Rt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Vt&&x.map.isVideoTexture===!0&&Zt.getTransfer(x.map.colorSpace)===ie,decodeVideoTextureEmissive:Ne&&x.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(x.emissiveMap.colorSpace)===ie,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===on,flipSided:x.side===De,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:rt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&x.extensions.multiDraw===!0||yt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function g(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)E.push(P),E.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(d(E,x),T(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function d(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function T(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function L(x){let E=p[x.type],P;if(E){let B=An[E];P=Nc.clone(B.uniforms)}else P=x.uniforms;return P}function y(x,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new dm(i,E,x,s),l.push(P),u.set(E,P)),P}function S(x){if(--x.usedTimes===0){let E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function C(){o.dispose()}return{getParameters:M,getProgramCacheKey:g,getUniforms:L,acquireProgram:y,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:C}}function gm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function _m(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function th(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function eh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,v,M,g,d){let T=i[t];return T===void 0?(T={id:h.id,object:h,geometry:p,material:v,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:g,group:d},i[t]=T):(T.id=h.id,T.object=h,T.geometry=p,T.material=v,T.materialVariant=a(h),T.groupOrder=M,T.renderOrder=h.renderOrder,T.z=g,T.group=d),t++,T}function c(h,p,v,M,g,d,T){T.reversedDepth===!0&&(g=-g);let L=o(h,p,v,M,g,d);v.transmission>0?n.push(L):v.transparent===!0?s.push(L):e.push(L)}function l(h,p,v,M,g,d){let T=o(h,p,v,M,g,d);v.transmission>0?n.unshift(T):v.transparent===!0?s.unshift(T):e.unshift(T)}function u(h,p){e.length>1&&e.sort(h||_m),n.length>1&&n.sort(p||th),s.length>1&&s.sort(p||th)}function f(){for(let h=t,p=i.length;h<p;h++){let v=i[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function xm(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new eh,i.set(n,[a])):s>=r.length?(a=new eh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function vm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new Ht};break;case"SpotLight":e={position:new H,direction:new H,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function ym(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Mm=0;function Sm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function bm(i){let t=new vm,e=ym(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);let s=new H,r=new ue,a=new ue;function o(l){let u=0,f=0,h=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let p=0,v=0,M=0,g=0,d=0,T=0,L=0,y=0,S=0,b=0,C=0,x=0,E=0,P=0;l.sort(Sm);for(let V=0,W=l.length;V<W;V++){let I=l[V],G=I.color,J=I.intensity,$=I.distance,at=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===li?at=I.shadow.map.texture:at=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=G.r*J,f+=G.g*J,h+=G.b*J;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],J);P++}else if(I.isSunLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let it=I.shadow,st=e.get(I);st.shadowIntensity=it.intensity,st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize.copy(it.mapSize).multiply(it.getFrameExtents()),n.sunShadow[v]=st,n.sunShadowMap[v]=at;let Lt=it.getViewportCount();for(let Rt=0;Rt<Lt;Rt++)n.sunShadowMatrix[M+Rt]=it.getMatrix(Rt),n.sunShadowCascade[M+Rt]=it._cascadeData[Rt];M+=Lt,v++}n.sun[p]=Y,p++}else if(I.isDirectionalLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let it=I.shadow,st=e.get(I);st.shadowIntensity=it.intensity,st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,n.directionalShadow[g]=st,n.directionalShadowMap[g]=at,n.directionalShadowMatrix[g]=I.shadow.matrix,S++}n.directional[g]=Y,g++}else if(I.isSpotLight){let Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(G).multiplyScalar(J),Y.distance=$,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[T]=Y;let it=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,it.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[T]=it.matrix,I.castShadow){let st=e.get(I);st.shadowIntensity=it.intensity,st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,n.spotShadow[T]=st,n.spotShadowMap[T]=at,C++}T++}else if(I.isRectAreaLight){let Y=t.get(I);Y.color.copy(G).multiplyScalar(J),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[L]=Y,L++}else if(I.isPointLight){let Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){let it=I.shadow,st=e.get(I);st.shadowIntensity=it.intensity,st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,st.shadowCameraNear=it.camera.near,st.shadowCameraFar=it.camera.far,n.pointShadow[d]=st,n.pointShadowMap[d]=at,n.pointShadowMatrix[d]=I.shadow.matrix,b++}n.point[d]=Y,d++}else if(I.isHemisphereLight){let Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(J),Y.groundColor.copy(I.groundColor).multiplyScalar(J),n.hemi[y]=Y,y++}}L>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let B=n.hash;(B.sunLength!==p||B.directionalLength!==g||B.pointLength!==d||B.spotLength!==T||B.rectAreaLength!==L||B.hemiLength!==y||B.numSunShadows!==v||B.numDirectionalShadows!==S||B.numPointShadows!==b||B.numSpotShadows!==C||B.numSpotMaps!==x||B.numLightProbes!==P)&&(n.sun.length=p,n.directional.length=g,n.spot.length=T,n.rectArea.length=L,n.point.length=d,n.hemi.length=y,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,B.sunLength=p,B.directionalLength=g,B.pointLength=d,B.spotLength=T,B.rectAreaLength=L,B.hemiLength=y,B.numSunShadows=v,B.numDirectionalShadows=S,B.numPointShadows=b,B.numSpotShadows=C,B.numSpotMaps=x,B.numLightProbes=P,n.version=Mm++)}function c(l,u){let f=0,h=0,p=0,v=0,M=0,g=0,d=u.matrixWorldInverse;for(let T=0,L=l.length;T<L;T++){let y=l[T];if(y.isSunLight){let S=n.sun[f];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(d),f++}else if(y.isDirectionalLight){let S=n.directional[h];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),h++}else if(y.isSpotLight){let S=n.spot[v];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(d),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),v++}else if(y.isRectAreaLight){let S=n.rectArea[M];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(d),a.identity(),r.copy(y.matrixWorld),r.premultiply(d),a.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){let S=n.point[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){let S=n.hemi[g];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(d),g++}}}return{setup:o,setupView:c,state:n}}function nh(i){let t=new bm(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Em(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new nh(i),t.set(s,[o])):r>=a.length?(o=new nh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Am=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Rm=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],ih=new ue,er=new H,pl=new H;function Cm(i,t,e){let n=new Ji,s=new Xt,r=new Xt,a=new me,o=new Xr,c=new qr,l={},u=e.maxTextureSize,f={[si]:De,[De]:si,[on]:on},h=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:Tm,fragmentShader:wm}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let v=new rn;v.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new At(v,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ks;let d=this.type;this.render=function(b,C,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;this.type===Kl&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ks);let E=i.getRenderTarget(),P=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Tn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let W=d!==this.type;W&&C.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=b.length;I<G;I++){let J=b[I],$=J.shadow;if($===void 0){Nt("WebGLShadowMap:",J,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let at=$.getFrameExtents();s.multiply(at),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/at.x),s.x=r.x*at.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/at.y),s.y=r.y*at.y,$.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=Y,$.map===null||W===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===es){if(J.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new qe(s.x,s.y,{format:li,type:xn,minFilter:Le,magFilter:Le,generateMipmaps:!1}),$.map.texture.name=J.name+".shadowMap",$.map.depthTexture=new jn(s.x,s.y,ln),$.map.depthTexture.name=J.name+".shadowMapDepth",$.map.depthTexture.format=Sn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Re,$.map.depthTexture.magFilter=Re}else J.isPointLight?($.map=new Ka(s.x),$.map.depthTexture=new Gr(s.x,_n)):($.map=new qe(s.x,s.y),$.map.depthTexture=new jn(s.x,s.y,_n)),$.map.depthTexture.name=J.name+".shadowMap",$.map.depthTexture.format=Sn,this.type===ks?($.map.depthTexture.compareFunction=Y?Za:Ya,$.map.depthTexture.minFilter=Le,$.map.depthTexture.magFilter=Le):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Re,$.map.depthTexture.magFilter=Re);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==s.x||$.map.height!==s.y)&&$.map.setSize(s.x,s.y);let it=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();J.isPointLight!==!0&&$.updateMatrices(J,x);for(let st=0;st<it;st++){let Lt=$.getCamera(st);if(J.isPointLight){let Rt=$.camera,te=$.matrix,qt=J.distance||Rt.far;qt!==Rt.far&&(Rt.far=qt,Rt.updateProjectionMatrix()),er.setFromMatrixPosition(J.matrixWorld),Rt.position.copy(er),pl.copy(Rt.position),pl.add(Am[st]),Rt.up.copy(Rm[st]),Rt.lookAt(pl),Rt.updateMatrixWorld(),te.makeTranslation(-er.x,-er.y,-er.z),ih.multiplyMatrices(Rt.projectionMatrix,Rt.matrixWorldInverse),$._frustum.setFromProjectionMatrix(ih,Rt.coordinateSystem,Rt.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,st),i.clear();else{st===0&&(i.setRenderTarget($.map),i.clear());let Rt=$.getViewport(st);a.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),V.viewport(a)}n=$.getFrustum(st),y(C,x,Lt,J,this.type)}$.isPointLightShadow!==!0&&this.type===es&&T($,x),$.needsUpdate=!1}d=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,B)};function T(b,C){let x=t.update(M);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null?b.mapPass=new qe(s.x,s.y,{format:li,type:xn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(C,null,x,h,M,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value.set(b.map.width,b.map.height),p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(C,null,x,p,M,null)}function L(b,C,x,E){let P=null,B=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(B!==void 0)P=B;else if(P=x.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let V=P.uuid,W=C.uuid,I=l[V];I===void 0&&(I={},l[V]=I);let G=I[W];G===void 0&&(G=P.clone(),I[W]=G,C.addEventListener("dispose",S)),P=G}if(P.visible=C.visible,P.wireframe=C.wireframe,E===es?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let V=i.properties.get(P);V.light=x}return P}function y(b,C,x,E,P){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===es)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let W=t.update(b),I=b.material;if(Array.isArray(I)){let G=W.groups;for(let J=0,$=G.length;J<$;J++){let at=G[J],Y=I[at.materialIndex];if(Y&&Y.visible){let it=L(b,Y,E,P);b.onBeforeShadow(i,b,C,x,W,it,at),i.renderBufferDirect(x,null,W,it,b,at),b.onAfterShadow(i,b,C,x,W,it,at)}}}else if(I.visible){let G=L(b,I,E,P);b.onBeforeShadow(i,b,C,x,W,G,null),i.renderBufferDirect(x,null,W,G,b,null),b.onAfterShadow(i,b,C,x,W,G,null)}}let V=b.children;for(let W=0,I=V.length;W<I;W++)y(V[W],C,x,E,P)}function S(b){b.target.removeEventListener("dispose",S);for(let x in l){let E=l[x],P=b.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function Im(i,t){function e(){let D=!1,ut=new me,j=null,gt=new me(0,0,0,0);return{setMask:function(xt){j!==xt&&!D&&(i.colorMask(xt,xt,xt,xt),j=xt)},setLocked:function(xt){D=xt},setClear:function(xt,rt,It,wt,se){se===!0&&(xt*=wt,rt*=wt,It*=wt),ut.set(xt,rt,It,wt),gt.equals(ut)===!1&&(i.clearColor(xt,rt,It,wt),gt.copy(ut))},reset:function(){D=!1,j=null,gt.set(-1,0,0,0)}}}function n(){let D=!1,ut=!1,j=null,gt=null,xt=null;return{setReversed:function(rt){if(ut!==rt){let It=t.get("EXT_clip_control");rt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ut=rt;let wt=xt;xt=null,this.setClear(wt)}},getReversed:function(){return ut},setTest:function(rt){rt?nt(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(rt){j!==rt&&!D&&(i.depthMask(rt),j=rt)},setFunc:function(rt){if(ut&&(rt=Lc[rt]),gt!==rt){switch(rt){case Cr:i.depthFunc(i.NEVER);break;case Ir:i.depthFunc(i.ALWAYS);break;case Pr:i.depthFunc(i.LESS);break;case ki:i.depthFunc(i.LEQUAL);break;case Lr:i.depthFunc(i.EQUAL);break;case Dr:i.depthFunc(i.GEQUAL);break;case Nr:i.depthFunc(i.GREATER);break;case Ur:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=rt}},setLocked:function(rt){D=rt},setClear:function(rt){xt!==rt&&(xt=rt,ut&&(rt=1-rt),i.clearDepth(rt))},reset:function(){D=!1,j=null,gt=null,xt=null,ut=!1}}}function s(){let D=!1,ut=null,j=null,gt=null,xt=null,rt=null,It=null,wt=null,se=null;return{setTest:function(jt){D||(jt?nt(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(jt){ut!==jt&&!D&&(i.stencilMask(jt),ut=jt)},setFunc:function(jt,Ue,ke){(j!==jt||gt!==Ue||xt!==ke)&&(i.stencilFunc(jt,Ue,ke),j=jt,gt=Ue,xt=ke)},setOp:function(jt,Ue,ke){(rt!==jt||It!==Ue||wt!==ke)&&(i.stencilOp(jt,Ue,ke),rt=jt,It=Ue,wt=ke)},setLocked:function(jt){D=jt},setClear:function(jt){se!==jt&&(i.clearStencil(jt),se=jt)},reset:function(){D=!1,ut=null,j=null,gt=null,xt=null,rt=null,It=null,wt=null,se=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},f={},h={},p=new WeakMap,v=[],M=null,g=!1,d=null,T=null,L=null,y=null,S=null,b=null,C=null,x=new Ht(0,0,0),E=0,P=!1,B=null,V=null,W=null,I=null,G=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,at=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=at>=1):Y.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=at>=2);let it=null,st={},Lt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),te=new me().fromArray(Lt),qt=new me().fromArray(Rt);function $t(D,ut,j,gt){let xt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(D,rt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<j;It++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(ut+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return rt}let K={};K[i.TEXTURE_2D]=$t(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=$t(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=$t(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=$t(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(ki),Wt(!1),ce(No),nt(i.CULL_FACE),Yt(Tn);function nt(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Mt(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Dt(D,ut){return h[D]!==ut?(i.bindFramebuffer(D,ut),h[D]=ut,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ut),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function yt(D,ut){let j=v,gt=!1;if(D){j=p.get(ut),j===void 0&&(j=[],p.set(ut,j));let xt=D.textures;if(j.length!==xt.length||j[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,It=xt.length;rt<It;rt++)j[rt]=i.COLOR_ATTACHMENT0+rt;j.length=xt.length,gt=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,gt=!0);gt&&i.drawBuffers(j)}function Vt(D){return M!==D?(i.useProgram(D),M=D,!0):!1}let ge={[xi]:i.FUNC_ADD,[jl]:i.FUNC_SUBTRACT,[tc]:i.FUNC_REVERSE_SUBTRACT};ge[ec]=i.MIN,ge[nc]=i.MAX;let Gt={[ic]:i.ZERO,[sc]:i.ONE,[rc]:i.SRC_COLOR,[Oo]:i.SRC_ALPHA,[uc]:i.SRC_ALPHA_SATURATE,[cc]:i.DST_COLOR,[oc]:i.DST_ALPHA,[ac]:i.ONE_MINUS_SRC_COLOR,[Bo]:i.ONE_MINUS_SRC_ALPHA,[hc]:i.ONE_MINUS_DST_COLOR,[lc]:i.ONE_MINUS_DST_ALPHA,[dc]:i.CONSTANT_COLOR,[fc]:i.ONE_MINUS_CONSTANT_COLOR,[pc]:i.CONSTANT_ALPHA,[mc]:i.ONE_MINUS_CONSTANT_ALPHA};function Yt(D,ut,j,gt,xt,rt,It,wt,se,jt){if(D===Tn){g===!0&&(Mt(i.BLEND),g=!1);return}if(g===!1&&(nt(i.BLEND),g=!0),D!==Ql){if(D!==d||jt!==P){if((T!==xi||S!==xi)&&(i.blendEquation(i.FUNC_ADD),T=xi,S=xi),jt)switch(D){case ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case is:i.blendFunc(i.ONE,i.ONE);break;case Uo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ut("WebGLState: Invalid blending: ",D);break}else switch(D){case ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Uo:Ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fo:Ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ut("WebGLState: Invalid blending: ",D);break}L=null,y=null,b=null,C=null,x.set(0,0,0),E=0,d=D,P=jt}return}xt=xt||ut,rt=rt||j,It=It||gt,(ut!==T||xt!==S)&&(i.blendEquationSeparate(ge[ut],ge[xt]),T=ut,S=xt),(j!==L||gt!==y||rt!==b||It!==C)&&(i.blendFuncSeparate(Gt[j],Gt[gt],Gt[rt],Gt[It]),L=j,y=gt,b=rt,C=It),(wt.equals(x)===!1||se!==E)&&(i.blendColor(wt.r,wt.g,wt.b,se),x.copy(wt),E=se),d=D,P=!1}function re(D,ut){D.side===on?Mt(i.CULL_FACE):nt(i.CULL_FACE);let j=D.side===De;ut&&(j=!j),Wt(j),D.blending===ns&&D.transparent===!1?Yt(Tn):Yt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let gt=D.stencilWrite;o.setTest(gt),gt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ne(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(D){B!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),B=D)}function ce(D){D!==Jl?(nt(i.CULL_FACE),D!==V&&(D===No?i.cullFace(i.BACK):D===$l?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),V=D}function xe(D){D!==W&&($&&i.lineWidth(D),W=D)}function Ne(D,ut,j){D?(nt(i.POLYGON_OFFSET_FILL),(I!==ut||G!==j)&&(I=ut,G=j,a.getReversed()&&(ut=-ut),i.polygonOffset(ut,j))):Mt(i.POLYGON_OFFSET_FILL)}function ee(D){D?nt(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function de(D){D===void 0&&(D=i.TEXTURE0+J-1),it!==D&&(i.activeTexture(D),it=D)}function N(D,ut,j){j===void 0&&(it===null?j=i.TEXTURE0+J-1:j=it);let gt=st[j];gt===void 0&&(gt={type:void 0,texture:void 0},st[j]=gt),(gt.type!==D||gt.texture!==ut)&&(it!==j&&(i.activeTexture(j),it=j),i.bindTexture(D,ut||K[D]),gt.type=D,gt.texture=ut)}function _e(){let D=st[it];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function m(){try{i.texSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function z(){try{i.texSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function lt(){try{i.texStorage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function dt(){try{i.texStorage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function Z(){try{i.texImage2D(...arguments)}catch(D){Ut("WebGLState:",D)}}function et(){try{i.texImage3D(...arguments)}catch(D){Ut("WebGLState:",D)}}function ft(D){return f[D]!==void 0?f[D]:i.getParameter(D)}function bt(D,ut){f[D]!==ut&&(i.pixelStorei(D,ut),f[D]=ut)}function pt(D){te.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),te.copy(D))}function mt(D){qt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),qt.copy(D))}function Ct(D,ut){let j=l.get(ut);j===void 0&&(j=new WeakMap,l.set(ut,j));let gt=j.get(D);gt===void 0&&(gt=i.getUniformBlockIndex(ut,D.name),j.set(D,gt))}function Pt(D,ut){let gt=l.get(ut).get(D);c.get(ut)!==gt&&(i.uniformBlockBinding(ut,gt,D.__bindingPointIndex),c.set(ut,gt))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},it=null,st={},h={},p=new WeakMap,v=[],M=null,g=!1,d=null,T=null,L=null,y=null,S=null,b=null,C=null,x=new Ht(0,0,0),E=0,P=!1,B=null,V=null,W=null,I=null,G=null,te.set(0,0,i.canvas.width,i.canvas.height),qt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:Mt,bindFramebuffer:Dt,drawBuffers:yt,useProgram:Vt,setBlending:Yt,setMaterial:re,setFlipSided:Wt,setCullFace:ce,setLineWidth:xe,setPolygonOffset:Ne,setScissorTest:ee,activeTexture:de,bindTexture:N,unbindTexture:_e,compressedTexImage2D:Qt,compressedTexImage3D:w,texImage2D:Z,texImage3D:et,pixelStorei:bt,getParameter:ft,updateUBOMapping:Ct,uniformBlockBinding:Pt,texStorage2D:lt,texStorage3D:dt,texSubImage2D:m,texSubImage3D:z,compressedTexSubImage2D:k,compressedTexSubImage3D:q,scissor:pt,viewport:mt,reset:Bt}}function Pm(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,u=new WeakMap,f=new Set,h,p=new WeakMap,v=!1;try{v=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(w,m){return v?new OffscreenCanvas(w,m):Xi("canvas")}function g(w,m,z){let k=1,q=Qt(w);if((q.width>z||q.height>z)&&(k=z/Math.max(q.width,q.height)),k<1)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap||typeof VideoFrame!="undefined"&&w instanceof VideoFrame){let lt=Math.floor(k*q.width),dt=Math.floor(k*q.height);h===void 0&&(h=M(lt,dt));let Z=m?M(lt,dt):h;return Z.width=lt,Z.height=dt,Z.getContext("2d").drawImage(w,0,0,lt,dt),Nt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+lt+"x"+dt+")."),Z}else return"data"in w&&Nt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),w;return w}function d(w){return w.generateMipmaps}function T(w){i.generateMipmap(w)}function L(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(w,m,z,k,q,lt=!1){if(w!==null){if(i[w]!==void 0)return i[w];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let dt;k&&(dt=t.get("EXT_texture_norm16"),dt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=m;if(m===i.RED&&(z===i.FLOAT&&(Z=i.R32F),z===i.HALF_FLOAT&&(Z=i.R16F),z===i.UNSIGNED_BYTE&&(Z=i.R8),z===i.UNSIGNED_SHORT&&dt&&(Z=dt.R16_EXT),z===i.SHORT&&dt&&(Z=dt.R16_SNORM_EXT)),m===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.R8UI),z===i.UNSIGNED_SHORT&&(Z=i.R16UI),z===i.UNSIGNED_INT&&(Z=i.R32UI),z===i.BYTE&&(Z=i.R8I),z===i.SHORT&&(Z=i.R16I),z===i.INT&&(Z=i.R32I)),m===i.RG&&(z===i.FLOAT&&(Z=i.RG32F),z===i.HALF_FLOAT&&(Z=i.RG16F),z===i.UNSIGNED_BYTE&&(Z=i.RG8),z===i.UNSIGNED_SHORT&&dt&&(Z=dt.RG16_EXT),z===i.SHORT&&dt&&(Z=dt.RG16_SNORM_EXT)),m===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RG8UI),z===i.UNSIGNED_SHORT&&(Z=i.RG16UI),z===i.UNSIGNED_INT&&(Z=i.RG32UI),z===i.BYTE&&(Z=i.RG8I),z===i.SHORT&&(Z=i.RG16I),z===i.INT&&(Z=i.RG32I)),m===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),z===i.UNSIGNED_INT&&(Z=i.RGB32UI),z===i.BYTE&&(Z=i.RGB8I),z===i.SHORT&&(Z=i.RGB16I),z===i.INT&&(Z=i.RGB32I)),m===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),z===i.UNSIGNED_INT&&(Z=i.RGBA32UI),z===i.BYTE&&(Z=i.RGBA8I),z===i.SHORT&&(Z=i.RGBA16I),z===i.INT&&(Z=i.RGBA32I)),m===i.RGB&&(z===i.UNSIGNED_SHORT&&dt&&(Z=dt.RGB16_EXT),z===i.SHORT&&dt&&(Z=dt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),m===i.RGBA){let et=lt?Es:Zt.getTransfer(q);z===i.FLOAT&&(Z=i.RGBA32F),z===i.HALF_FLOAT&&(Z=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Z=et===ie?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&dt&&(Z=dt.RGBA16_EXT),z===i.SHORT&&dt&&(Z=dt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(w,m){let z;return w?m===null||m===_n||m===rs?z=i.DEPTH24_STENCIL8:m===ln?z=i.DEPTH32F_STENCIL8:m===ss&&(z=i.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):m===null||m===_n||m===rs?z=i.DEPTH_COMPONENT24:m===ln?z=i.DEPTH_COMPONENT32F:m===ss&&(z=i.DEPTH_COMPONENT16),z}function b(w,m){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==Re&&w.minFilter!==Le?Math.log2(Math.max(m.width,m.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?m.mipmaps.length:1}function C(w){let m=w.target;m.removeEventListener("dispose",C),E(m),m.isVideoTexture&&u.delete(m),m.isHTMLTexture&&f.delete(m)}function x(w){let m=w.target;m.removeEventListener("dispose",x),B(m)}function E(w){let m=n.get(w);if(m.__webglInit===void 0)return;let z=w.source,k=p.get(z);if(k){let q=k[m.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(w),Object.keys(k).length===0&&p.delete(z)}n.remove(w)}function P(w){let m=n.get(w);i.deleteTexture(m.__webglTexture);let z=w.source,k=p.get(z);delete k[m.__cacheKey],a.memory.textures--}function B(w){let m=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(m.__webglFramebuffer[k]))for(let q=0;q<m.__webglFramebuffer[k].length;q++)i.deleteFramebuffer(m.__webglFramebuffer[k][q]);else i.deleteFramebuffer(m.__webglFramebuffer[k]);m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer[k])}else{if(Array.isArray(m.__webglFramebuffer))for(let k=0;k<m.__webglFramebuffer.length;k++)i.deleteFramebuffer(m.__webglFramebuffer[k]);else i.deleteFramebuffer(m.__webglFramebuffer);if(m.__webglDepthbuffer&&i.deleteRenderbuffer(m.__webglDepthbuffer),m.__webglMultisampledFramebuffer&&i.deleteFramebuffer(m.__webglMultisampledFramebuffer),m.__webglColorRenderbuffer)for(let k=0;k<m.__webglColorRenderbuffer.length;k++)m.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(m.__webglColorRenderbuffer[k]);m.__webglDepthRenderbuffer&&i.deleteRenderbuffer(m.__webglDepthRenderbuffer)}let z=w.textures;for(let k=0,q=z.length;k<q;k++){let lt=n.get(z[k]);lt.__webglTexture&&(i.deleteTexture(lt.__webglTexture),a.memory.textures--),n.remove(z[k])}n.remove(w)}let V=0;function W(){V=0}function I(){return V}function G(w){V=w}function J(){let w=V;return w>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,w}function $(w){let m=[];return m.push(w.wrapS),m.push(w.wrapT),m.push(w.wrapR||0),m.push(w.magFilter),m.push(w.minFilter),m.push(w.anisotropy),m.push(w.internalFormat),m.push(w.format),m.push(w.type),m.push(w.generateMipmaps),m.push(w.premultiplyAlpha),m.push(w.flipY),m.push(w.unpackAlignment),m.push(w.colorSpace),m.join()}function at(w,m){let z=n.get(w);if(w.isVideoTexture&&N(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&z.__version!==w.version){let k=w.image;if(k===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(z,w,m);return}}else w.isExternalTexture&&(z.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+m)}function Y(w,m){let z=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Mt(z,w,m);return}else w.isExternalTexture&&(z.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+m)}function it(w,m){let z=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Mt(z,w,m);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+m)}function st(w,m){let z=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&z.__version!==w.version){Dt(z,w,m);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+m)}let Lt={[Gi]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Fr]:i.MIRRORED_REPEAT},Rt={[Re]:i.NEAREST,[xc]:i.NEAREST_MIPMAP_NEAREST,[Xs]:i.NEAREST_MIPMAP_LINEAR,[Le]:i.LINEAR,[ca]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},te={[Sc]:i.NEVER,[Ac]:i.ALWAYS,[bc]:i.LESS,[Ya]:i.LEQUAL,[Ec]:i.EQUAL,[Za]:i.GEQUAL,[Tc]:i.GREATER,[wc]:i.NOTEQUAL};function qt(w,m){if(m.type===ln&&t.has("OES_texture_float_linear")===!1&&(m.magFilter===Le||m.magFilter===ca||m.magFilter===Xs||m.magFilter===ai||m.minFilter===Le||m.minFilter===ca||m.minFilter===Xs||m.minFilter===ai)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Lt[m.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Lt[m.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Lt[m.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Rt[m.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Rt[m.minFilter]),m.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,te[m.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(m.magFilter===Re||m.minFilter!==Xs&&m.minFilter!==ai||m.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(m.anisotropy>1||n.get(m).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(m.anisotropy,s.getMaxAnisotropy())),n.get(m).__currentAnisotropy=m.anisotropy}}}function $t(w,m){let z=!1;w.__webglInit===void 0&&(w.__webglInit=!0,m.addEventListener("dispose",C));let k=m.source,q=p.get(k);q===void 0&&(q={},p.set(k,q));let lt=$(m);if(lt!==w.__cacheKey){q[lt]===void 0&&(q[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),q[lt].usedTimes++;let dt=q[w.__cacheKey];dt!==void 0&&(q[w.__cacheKey].usedTimes--,dt.usedTimes===0&&P(m)),w.__cacheKey=lt,w.__webglTexture=q[lt].texture}return z}function K(w,m,z){return Math.floor(Math.floor(w/z)/m)}function nt(w,m,z,k){let lt=w.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,m.width,m.height,z,k,m.data);else{lt.sort((bt,pt)=>bt.start-pt.start);let dt=0;for(let bt=1;bt<lt.length;bt++){let pt=lt[dt],mt=lt[bt],Ct=pt.start+pt.count,Pt=K(mt.start,m.width,4),Bt=K(pt.start,m.width,4);mt.start<=Ct+1&&Pt===Bt&&K(mt.start+mt.count-1,m.width,4)===Pt?pt.count=Math.max(pt.count,mt.start+mt.count-pt.start):(++dt,lt[dt]=mt)}lt.length=dt+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),et=e.getParameter(i.UNPACK_SKIP_PIXELS),ft=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,m.width);for(let bt=0,pt=lt.length;bt<pt;bt++){let mt=lt[bt],Ct=Math.floor(mt.start/4),Pt=Math.ceil(mt.count/4),Bt=Ct%m.width,D=Math.floor(Ct/m.width),ut=Pt,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Bt,D,ut,j,z,k,m.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,et),e.pixelStorei(i.UNPACK_SKIP_ROWS,ft)}}function Mt(w,m,z){let k=i.TEXTURE_2D;(m.isDataArrayTexture||m.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),m.isData3DTexture&&(k=i.TEXTURE_3D);let q=$t(w,m),lt=m.source;e.bindTexture(k,w.__webglTexture,i.TEXTURE0+z);let dt=n.get(lt);if(lt.version!==dt.__version||q===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap!="undefined"&&m.image instanceof ImageBitmap)===!1){let j=Zt.getPrimaries(Zt.workingColorSpace),gt=m.colorSpace===Bn?null:Zt.getPrimaries(m.colorSpace),xt=m.colorSpace===Bn||j===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt)}e.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment);let et=g(m.image,!1,s.maxTextureSize);et=_e(m,et);let ft=r.convert(m.format,m.colorSpace),bt=r.convert(m.type),pt=y(m.internalFormat,ft,bt,m.normalized,m.colorSpace,m.isVideoTexture);qt(k,m);let mt,Ct=m.mipmaps,Pt=m.isVideoTexture!==!0,Bt=dt.__version===void 0||q===!0,D=lt.dataReady,ut=b(m,et);if(m.isDepthTexture)pt=S(m.format===oi,m.type),Bt&&(Pt?e.texStorage2D(i.TEXTURE_2D,1,pt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,pt,et.width,et.height,0,ft,bt,null));else if(m.isDataTexture)if(Ct.length>0){Pt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ut,pt,Ct[0].width,Ct[0].height);for(let j=0,gt=Ct.length;j<gt;j++)mt=Ct[j],Pt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,ft,bt,mt.data):e.texImage2D(i.TEXTURE_2D,j,pt,mt.width,mt.height,0,ft,bt,mt.data);m.generateMipmaps=!1}else Pt?(Bt&&e.texStorage2D(i.TEXTURE_2D,ut,pt,et.width,et.height),D&&nt(m,et,ft,bt)):e.texImage2D(i.TEXTURE_2D,0,pt,et.width,et.height,0,ft,bt,et.data);else if(m.isCompressedTexture)if(m.isCompressedArrayTexture){Pt&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,pt,Ct[0].width,Ct[0].height,et.depth);for(let j=0,gt=Ct.length;j<gt;j++)if(mt=Ct[j],m.format!==cn)if(ft!==null)if(Pt){if(D)if(m.layerUpdates.size>0){let xt=il(mt.width,mt.height,m.format,m.type);for(let rt of m.layerUpdates){let It=mt.data.subarray(rt*xt/mt.data.BYTES_PER_ELEMENT,(rt+1)*xt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,rt,mt.width,mt.height,1,ft,It)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,et.depth,ft,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,pt,mt.width,mt.height,et.depth,0,mt.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pt?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,mt.width,mt.height,et.depth,ft,bt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,pt,mt.width,mt.height,et.depth,0,ft,bt,mt.data);m.layerUpdates.size>0&&m.clearLayerUpdates()}else{Pt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ut,pt,Ct[0].width,Ct[0].height);for(let j=0,gt=Ct.length;j<gt;j++)mt=Ct[j],m.format!==cn?ft!==null?Pt?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,ft,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,pt,mt.width,mt.height,0,mt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,mt.width,mt.height,ft,bt,mt.data):e.texImage2D(i.TEXTURE_2D,j,pt,mt.width,mt.height,0,ft,bt,mt.data)}else if(m.isDataArrayTexture)if(Pt){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,pt,et.width,et.height,et.depth),D)if(m.layerUpdates.size>0){let j=il(et.width,et.height,m.format,m.type);for(let gt of m.layerUpdates){let xt=et.data.subarray(gt*j/et.data.BYTES_PER_ELEMENT,(gt+1)*j/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,gt,et.width,et.height,1,ft,bt,xt)}m.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,bt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,pt,et.width,et.height,et.depth,0,ft,bt,et.data);else if(m.isData3DTexture)Pt?(Bt&&e.texStorage3D(i.TEXTURE_3D,ut,pt,et.width,et.height,et.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,bt,et.data)):e.texImage3D(i.TEXTURE_3D,0,pt,et.width,et.height,et.depth,0,ft,bt,et.data);else if(m.isFramebufferTexture){if(Bt)if(Pt)e.texStorage2D(i.TEXTURE_2D,ut,pt,et.width,et.height);else{let j=et.width,gt=et.height;for(let xt=0;xt<ut;xt++)e.texImage2D(i.TEXTURE_2D,xt,pt,j,gt,0,ft,bt,null),j>>=1,gt>>=1}}else if(m.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),et.parentNode!==j){j.appendChild(et),f.add(m),j.onpaint=gt=>{let xt=gt.changedElements;for(let rt of f)xt.includes(rt.image)&&(rt.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,et);else{let xt=i.RGBA,rt=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xt,rt,It,et)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ct.length>0){if(Pt&&Bt){let j=Qt(Ct[0]);e.texStorage2D(i.TEXTURE_2D,ut,pt,j.width,j.height)}for(let j=0,gt=Ct.length;j<gt;j++)mt=Ct[j],Pt?D&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,ft,bt,mt):e.texImage2D(i.TEXTURE_2D,j,pt,ft,bt,mt);m.generateMipmaps=!1}else if(Pt){if(Bt){let j=Qt(et);e.texStorage2D(i.TEXTURE_2D,ut,pt,j.width,j.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft,bt,et)}else e.texImage2D(i.TEXTURE_2D,0,pt,ft,bt,et);d(m)&&T(k),dt.__version=lt.version,m.onUpdate&&m.onUpdate(m)}w.__version=m.version}function Dt(w,m,z){if(m.image.length!==6)return;let k=$t(w,m),q=m.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+z);let lt=n.get(q);if(q.version!==lt.__version||k===!0){e.activeTexture(i.TEXTURE0+z);let dt=Zt.getPrimaries(Zt.workingColorSpace),Z=m.colorSpace===Bn?null:Zt.getPrimaries(m.colorSpace),et=m.colorSpace===Bn||dt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,m.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,m.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let ft=m.isCompressedTexture||m.image[0].isCompressedTexture,bt=m.image[0]&&m.image[0].isDataTexture,pt=[];for(let rt=0;rt<6;rt++)!ft&&!bt?pt[rt]=g(m.image[rt],!0,s.maxCubemapSize):pt[rt]=bt?m.image[rt].image:m.image[rt],pt[rt]=_e(m,pt[rt]);let mt=pt[0],Ct=r.convert(m.format,m.colorSpace),Pt=r.convert(m.type),Bt=y(m.internalFormat,Ct,Pt,m.normalized,m.colorSpace),D=m.isVideoTexture!==!0,ut=lt.__version===void 0||k===!0,j=q.dataReady,gt=b(m,mt);qt(i.TEXTURE_CUBE_MAP,m);let xt;if(ft){D&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Bt,mt.width,mt.height);for(let rt=0;rt<6;rt++){xt=pt[rt].mipmaps;for(let It=0;It<xt.length;It++){let wt=xt[It];m.format!==cn?Ct!==null?D?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,wt.width,wt.height,Ct,wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Bt,wt.width,wt.height,0,wt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,wt.width,wt.height,Ct,Pt,wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Bt,wt.width,wt.height,0,Ct,Pt,wt.data)}}}else{if(xt=m.mipmaps,D&&ut){xt.length>0&&gt++;let rt=Qt(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Bt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(bt){D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,pt[rt].width,pt[rt].height,Ct,Pt,pt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Bt,pt[rt].width,pt[rt].height,0,Ct,Pt,pt[rt].data);for(let It=0;It<xt.length;It++){let se=xt[It].image[rt].image;D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,se.width,se.height,Ct,Pt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Bt,se.width,se.height,0,Ct,Pt,se.data)}}else{D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Ct,Pt,pt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Bt,Ct,Pt,pt[rt]);for(let It=0;It<xt.length;It++){let wt=xt[It];D?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Ct,Pt,wt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Bt,Ct,Pt,wt.image[rt])}}}d(m)&&T(i.TEXTURE_CUBE_MAP),lt.__version=q.version,m.onUpdate&&m.onUpdate(m)}w.__version=m.version}function yt(w,m,z,k,q,lt){let dt=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),et=y(z.internalFormat,dt,Z,z.normalized,z.colorSpace),ft=n.get(m),bt=n.get(z);if(bt.__renderTarget=m,!ft.__hasExternalTextures){let pt=Math.max(1,m.width>>lt),mt=Math.max(1,m.height>>lt);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,lt,et,pt,mt,m.depth,0,dt,Z,null):e.texImage2D(q,lt,et,pt,mt,0,dt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),de(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,q,bt.__webglTexture,0,ee(m)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,q,bt.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(w,m,z){if(i.bindRenderbuffer(i.RENDERBUFFER,w),m.depthBuffer){let k=m.depthTexture,q=k&&k.isDepthTexture?k.type:null,lt=S(m.stencilBuffer,q),dt=m.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;de(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(m),lt,m.width,m.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(m),lt,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,lt,m.width,m.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,w)}else{let k=m.textures;for(let q=0;q<k.length;q++){let lt=k[q],dt=r.convert(lt.format,lt.colorSpace),Z=r.convert(lt.type),et=y(lt.internalFormat,dt,Z,lt.normalized,lt.colorSpace);de(m)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee(m),et,m.width,m.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee(m),et,m.width,m.height):i.renderbufferStorage(i.RENDERBUFFER,et,m.width,m.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(w,m,z){let k=m.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(m.depthTexture&&m.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(m.depthTexture);if(q.__renderTarget=m,(!q.__webglTexture||m.depthTexture.image.width!==m.width||m.depthTexture.image.height!==m.height)&&(m.depthTexture.image.width=m.width,m.depthTexture.image.height=m.height,m.depthTexture.needsUpdate=!0),k){if(q.__webglInit===void 0&&(q.__webglInit=!0,m.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),qt(i.TEXTURE_CUBE_MAP,m.depthTexture);let ft=r.convert(m.depthTexture.format),bt=r.convert(m.depthTexture.type),pt;m.depthTexture.format===Sn?pt=i.DEPTH_COMPONENT24:m.depthTexture.format===oi&&(pt=i.DEPTH24_STENCIL8);for(let mt=0;mt<6;mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,pt,m.width,m.height,0,ft,bt,null)}}else at(m.depthTexture,0);let lt=q.__webglTexture,dt=ee(m),Z=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,et=m.depthTexture.format===oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(m.depthTexture.format===Sn)de(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,Z,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,et,Z,lt,0);else if(m.depthTexture.format===oi)de(m)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,Z,lt,0,dt):i.framebufferTexture2D(i.FRAMEBUFFER,et,Z,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Gt(w){let m=n.get(w),z=w.isWebGLCubeRenderTarget===!0;if(m.__boundDepthTexture!==w.depthTexture){let k=w.depthTexture;if(m.__depthDisposeCallback&&m.__depthDisposeCallback(),k){let q=()=>{delete m.__boundDepthTexture,delete m.__depthDisposeCallback,k.removeEventListener("dispose",q)};k.addEventListener("dispose",q),m.__depthDisposeCallback=q}m.__boundDepthTexture=k}if(w.depthTexture&&!m.__autoAllocateDepthBuffer)if(z)for(let k=0;k<6;k++)ge(m.__webglFramebuffer[k],w,k);else{let k=w.texture.mipmaps;k&&k.length>0?ge(m.__webglFramebuffer[0],w,0):ge(m.__webglFramebuffer,w,0)}else if(z){m.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[k]),m.__webglDepthbuffer[k]===void 0)m.__webglDepthbuffer[k]=i.createRenderbuffer(),Vt(m.__webglDepthbuffer[k],w,!1);else{let q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=m.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,lt)}}else{let k=w.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,m.__webglFramebuffer),m.__webglDepthbuffer===void 0)m.__webglDepthbuffer=i.createRenderbuffer(),Vt(m.__webglDepthbuffer,w,!1);else{let q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=m.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,lt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Yt(w,m,z){let k=n.get(w);m!==void 0&&yt(k.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Gt(w)}function re(w){let m=w.texture,z=n.get(w),k=n.get(m);w.addEventListener("dispose",x);let q=w.textures,lt=w.isWebGLCubeRenderTarget===!0,dt=q.length>1;if(dt||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=m.version,a.memory.textures++),lt){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(m.mipmaps&&m.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let et=0;et<m.mipmaps.length;et++)z.__webglFramebuffer[Z][et]=i.createFramebuffer()}else z.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(m.mipmaps&&m.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<m.mipmaps.length;Z++)z.__webglFramebuffer[Z]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(dt)for(let Z=0,et=q.length;Z<et;Z++){let ft=n.get(q[Z]);ft.__webglTexture===void 0&&(ft.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&de(w)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<q.length;Z++){let et=q[Z];z.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let ft=r.convert(et.format,et.colorSpace),bt=r.convert(et.type),pt=y(et.internalFormat,ft,bt,et.normalized,et.colorSpace,w.isXRRenderTarget===!0),mt=ee(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,pt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Vt(z.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),qt(i.TEXTURE_CUBE_MAP,m);for(let Z=0;Z<6;Z++)if(m.mipmaps&&m.mipmaps.length>0)for(let et=0;et<m.mipmaps.length;et++)yt(z.__webglFramebuffer[Z][et],w,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,et);else yt(z.__webglFramebuffer[Z],w,m,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);d(m)&&T(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let Z=0,et=q.length;Z<et;Z++){let ft=q[Z],bt=n.get(ft),pt=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(pt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,bt.__webglTexture),qt(pt,ft),yt(z.__webglFramebuffer,w,ft,i.COLOR_ATTACHMENT0+Z,pt,0),d(ft)&&T(pt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Z=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,k.__webglTexture),qt(Z,m),m.mipmaps&&m.mipmaps.length>0)for(let et=0;et<m.mipmaps.length;et++)yt(z.__webglFramebuffer[et],w,m,i.COLOR_ATTACHMENT0,Z,et);else yt(z.__webglFramebuffer,w,m,i.COLOR_ATTACHMENT0,Z,0);d(m)&&T(Z),e.unbindTexture()}w.depthBuffer&&Gt(w)}function Wt(w){let m=w.textures;for(let z=0,k=m.length;z<k;z++){let q=m[z];if(d(q)){let lt=L(w),dt=n.get(q).__webglTexture;e.bindTexture(lt,dt),T(lt),e.unbindTexture()}}}let ce=[],xe=[];function Ne(w){if(w.samples>0){if(de(w)===!1){let m=w.textures,z=w.width,k=w.height,q=i.COLOR_BUFFER_BIT,lt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(w),Z=m.length>1;if(Z)for(let ft=0;ft<m.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);let et=w.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ft=0;ft<m.length;ft++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[ft]);let bt=n.get(m[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,z,k,0,0,z,k,q,i.NEAREST),c===!0&&(ce.length=0,xe.length=0,ce.push(i.COLOR_ATTACHMENT0+ft),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(ce.push(lt),xe.push(lt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ft=0;ft<m.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,dt.__webglColorRenderbuffer[ft]);let bt=n.get(m[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&c){let m=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[m])}}}function ee(w){return Math.min(s.maxSamples,w.samples)}function de(w){let m=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&m.__useRenderToTexture!==!1}function N(w){let m=a.render.frame;u.get(w)!==m&&(u.set(w,m),w.update())}function _e(w,m){let z=w.colorSpace,k=w.format,q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||z!==bs&&z!==Bn&&(Zt.getTransfer(z)===ie?(k!==cn||q!==Ye)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ut("WebGLTextures: Unsupported texture color space:",z)),m}function Qt(w){return typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame!="undefined"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=W,this.getTextureUnits=I,this.setTextureUnits=G,this.setTexture2D=at,this.setTexture2DArray=Y,this.setTexture3D=it,this.setTextureCube=st,this.rebindTextures=Yt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Wt,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=de,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Lm(i,t){function e(n,s=Bn){let r,a=Zt.getTransfer(s);if(n===Ye)return i.UNSIGNED_BYTE;if(n===ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===da)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qo)return i.BYTE;if(n===Yo)return i.SHORT;if(n===ss)return i.UNSIGNED_SHORT;if(n===ha)return i.INT;if(n===_n)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===xn)return i.HALF_FLOAT;if(n===$o)return i.ALPHA;if(n===Ko)return i.RGB;if(n===cn)return i.RGBA;if(n===Sn)return i.DEPTH_COMPONENT;if(n===oi)return i.DEPTH_STENCIL;if(n===fa)return i.RED;if(n===pa)return i.RED_INTEGER;if(n===li)return i.RG;if(n===ma)return i.RG_INTEGER;if(n===ga)return i.RGBA_INTEGER;if(n===qs||n===Ys||n===Zs||n===Js)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_a||n===xa||n===va||n===ya)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ma||n===Sa||n===ba||n===Ea||n===Ta||n===$s||n===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ma||n===Sa)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ba)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ea)return r.COMPRESSED_R11_EAC;if(n===Ta)return r.COMPRESSED_SIGNED_R11_EAC;if(n===$s)return r.COMPRESSED_RG11_EAC;if(n===wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Aa||n===Ra||n===Ca||n===Ia||n===Pa||n===La||n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===Ba||n===za||n===Va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Aa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ra)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ca)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ia)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===La)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Da)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Na)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ua)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ba)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Va)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ha||n===ka||n===Ga)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ha)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wa||n===Xa||n===Ks||n===qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ks)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Dm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ns(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Qe({vertexShader:Dm,fragmentShader:Nm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new At(new We(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bl=class extends bn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,p=null,v=null,M=typeof XRWebGLBinding!="undefined",g=new Sl,d={},T=e.getContextAttributes(),L=null,y=null,S=[],b=[],C=new Xt,x=null,E=null,P=new Pe;P.viewport=new me;let B=new Pe;B.viewport=new me;let V=[P,B],W=new sa,I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=S[K];return nt===void 0&&(nt=new Zi,S[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=S[K];return nt===void 0&&(nt=new Zi,S[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=S[K];return nt===void 0&&(nt=new Zi,S[K]=nt),nt.getHandSpace()};function J(K){let nt=b.indexOf(K.inputSource);if(nt===-1)return;let Mt=S[nt];Mt!==void 0&&(Mt.update(K.inputSource,K.frame,l||a),Mt.dispatchEvent({type:K.type,data:K.inputSource}))}function $(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",at);for(let K=0;K<S.length;K++){let nt=b[K];nt!==null&&(b[K]=null,S[K].disconnect(nt))}I=null,G=null,g.reset();for(let K in d)delete d[K];if(t.setRenderTarget(L),p=null,h=null,f=null,s=null,y=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),E!==null){let K=E.camera;K.fov=E.fov,K.zoom=E.zoom,K.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(L=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",$),s.addEventListener("inputsourceschange",at),T.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Dt=null,yt=null;T.depth&&(yt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=T.stencil?oi:Sn,Dt=T.stencil?rs:_n);let Vt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new qe(h.textureWidth,h.textureHeight,{format:cn,type:Ye,depthTexture:new jn(h.textureWidth,h.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let Mt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new qe(p.framebufferWidth,p.framebufferHeight,{format:cn,type:Ye,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function at(K){for(let nt=0;nt<K.removed.length;nt++){let Mt=K.removed[nt],Dt=b.indexOf(Mt);Dt>=0&&(b[Dt]=null,S[Dt].disconnect(Mt))}for(let nt=0;nt<K.added.length;nt++){let Mt=K.added[nt],Dt=b.indexOf(Mt);if(Dt===-1){for(let Vt=0;Vt<S.length;Vt++)if(Vt>=b.length){b.push(Mt),Dt=Vt;break}else if(b[Vt]===null){b[Vt]=Mt,Dt=Vt;break}if(Dt===-1)break}let yt=S[Dt];yt&&yt.connect(Mt)}}let Y=new H,it=new H;function st(K,nt,Mt){Y.setFromMatrixPosition(nt.matrixWorld),it.setFromMatrixPosition(Mt.matrixWorld);let Dt=Y.distanceTo(it),yt=nt.projectionMatrix.elements,Vt=Mt.projectionMatrix.elements,ge=yt[14]/(yt[10]-1),Gt=yt[14]/(yt[10]+1),Yt=(yt[9]+1)/yt[5],re=(yt[9]-1)/yt[5],Wt=(yt[8]-1)/yt[0],ce=(Vt[8]+1)/Vt[0],xe=ge*Wt,Ne=ge*ce,ee=Dt/(-Wt+ce),de=ee*-Wt;if(nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(de),K.translateZ(ee),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),yt[10]===-1)K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let N=ge+ee,_e=Gt+ee,Qt=xe-de,w=Ne+(Dt-de),m=Yt*Gt/_e*N,z=re*Gt/_e*N;K.projectionMatrix.makePerspective(Qt,w,m,z,N,_e),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Lt(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let nt=K.near,Mt=K.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(Mt=g.depthFar)),W.near=B.near=P.near=nt,W.far=B.far=P.far=Mt,(I!==W.near||G!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),I=W.near,G=W.far),W.layers.mask=K.layers.mask|6,P.layers.mask=W.layers.mask&-5,B.layers.mask=W.layers.mask&-3;let Dt=K.parent,yt=W.cameras;Lt(W,Dt);for(let Vt=0;Vt<yt.length;Vt++)Lt(yt[Vt],Dt);yt.length===2?st(W,P,B):W.projectionMatrix.copy(P.projectionMatrix),E===null&&K.isPerspectiveCamera&&(E={camera:K,fov:K.fov,zoom:K.zoom}),Rt(K,W,Dt)};function Rt(K,nt,Mt){Mt===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(Mt.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Br*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(K){c=K,h!==null&&(h.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(K){return d[K]};let te=null;function qt(K,nt){if(u=nt.getViewerPose(l||a),v=nt,u!==null){let Mt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Dt=!1;Mt.length!==W.cameras.length&&(W.cameras.length=0,Dt=!0);for(let Gt=0;Gt<Mt.length;Gt++){let Yt=Mt[Gt],re=null;if(p!==null)re=p.getViewport(Yt);else{let ce=f.getViewSubImage(h,Yt);re=ce.viewport,Gt===0&&(t.setRenderTargetTextures(y,ce.colorTexture,ce.depthStencilTexture),t.setRenderTarget(y))}let Wt=V[Gt];Wt===void 0&&(Wt=new Pe,Wt.layers.enable(Gt),Wt.viewport=new me,V[Gt]=Wt),Wt.matrix.fromArray(Yt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Yt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(re.x,re.y,re.width,re.height),Gt===0&&(W.matrix.copy(Wt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Dt===!0&&W.cameras.push(Wt)}let yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=n.getBinding();let Gt=f.getDepthInformation(Mt[0]);Gt&&Gt.isValid&&Gt.texture&&g.init(Gt,s.renderState)}if(yt&&yt.includes("camera-access")&&M){t.state.unbindTexture(),f=n.getBinding();for(let Gt=0;Gt<Mt.length;Gt++){let Yt=Mt[Gt].camera;if(Yt){let re=d[Yt];re||(re=new Ns,d[Yt]=re);let Wt=f.getCameraImage(Yt);re.sourceTexture=Wt}}}}for(let Mt=0;Mt<S.length;Mt++){let Dt=b[Mt],yt=S[Mt];Dt!==null&&yt!==void 0&&yt.update(Dt,nt,l||a)}te&&te(K,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),v=null}let $t=new sh;$t.setAnimationLoop(qt),this.setAnimationLoop=function(K){te=K},this.dispose=function(){}}},Um=new ue,hh=new Ot;hh.set(-1,0,0,0,1,0,0,0,1);function Fm(i,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function n(g,d){d.color.getRGB(g.fogColor.value,tl(i)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function s(g,d,T,L,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(g,d):d.isMeshLambertMaterial?(r(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(g,d),f(g,d)):d.isMeshPhongMaterial?(r(g,d),u(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(g,d),h(g,d),d.isMeshPhysicalMaterial&&p(g,d,y)):d.isMeshMatcapMaterial?(r(g,d),v(g,d)):d.isMeshDepthMaterial?r(g,d):d.isMeshDistanceMaterial?(r(g,d),M(g,d)):d.isMeshNormalMaterial?r(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,T,L):d.isSpriteMaterial?l(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===De&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===De&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);let T=t.get(d),L=T.envMap,y=T.envMapRotation;L&&(g.envMap.value=L,g.envMapRotation.value.setFromMatrix4(Um.makeRotationFromEuler(y)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hh),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,T,L){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*T,g.scale.value=L*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function l(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function f(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,T){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===De&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.retroreflectivity>0&&(g.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,d){d.matcap&&(g.matcap.value=d.matcap)}function M(g,d){let T=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Om(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,S){let b=S.program;n.uniformBlockBinding(y,b)}function l(y,S){let b=s[y.id];b===void 0&&(g(y),b=u(y),s[y.id]=b,y.addEventListener("dispose",T));let C=S.program;n.updateUBOMapping(y,C);let x=t.render.frame;r[y.id]!==x&&(h(y),r[y.id]=x)}function u(y){let S=f();y.__bindingPointIndex=S;let b=i.createBuffer(),C=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,b),b}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let S=s[y.id],b=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let x=0,E=b.length;x<E;x++){let P=b[x];if(Array.isArray(P))for(let B=0,V=P.length;B<V;B++)p(P[B],x,B,C);else p(P,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,S,b,C){if(M(y,S,b,C)===!0){let x=y.__offset,E=y.value;if(Array.isArray(E)){let P=0;for(let B=0;B<E.length;B++){let V=E[B],W=d(V);v(V,y.__data,P),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(E,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function v(y,S,b){typeof y=="number"||typeof y=="boolean"?S[0]=y:y.isMatrix3?(S[0]=y.elements[0],S[1]=y.elements[1],S[2]=y.elements[2],S[3]=0,S[4]=y.elements[3],S[5]=y.elements[4],S[6]=y.elements[5],S[7]=0,S[8]=y.elements[6],S[9]=y.elements[7],S[10]=y.elements[8],S[11]=0):ArrayBuffer.isView(y)?S.set(new y.constructor(y.buffer,y.byteOffset,S.length)):y.toArray(S,b)}function M(y,S,b,C){let x=y.value,E=S+"_"+b;if(C[E]===void 0)return typeof x=="number"||typeof x=="boolean"?C[E]=x:ArrayBuffer.isView(x)?C[E]=x.slice():C[E]=x.clone(),!0;{let P=C[E];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return C[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function g(y){let S=y.uniforms,b=0,C=16;for(let E=0,P=S.length;E<P;E++){let B=Array.isArray(S[E])?S[E]:[S[E]];for(let V=0,W=B.length;V<W;V++){let I=B[V],G=Array.isArray(I.value)?I.value:[I.value];for(let J=0,$=G.length;J<$;J++){let at=G[J],Y=d(at),it=b%C,st=it%Y.boundary,Lt=it+st;b+=st,Lt!==0&&C-Lt<Y.storage&&(b+=C-Lt),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=Y.storage}}}let x=b%C;return x>0&&(b+=C-x),y.__size=b,y.__cache={},this}function d(y){let S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=48,S.storage=48):y.isMatrix4?(S.boundary=64,S.storage=64):y.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",y),S}function T(y){let S=y.target;S.removeEventListener("dispose",T);let b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function L(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:L}}var Bm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wn=null;function zm(){return wn===null&&(wn=new Cs(Bm,16,16,li,xn),wn.name="DFG_LUT",wn.minFilter=Le,wn.magFilter=Le,wn.wrapS=Mn,wn.wrapT=Mn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}var Qa=class{constructor(t={}){let{canvas:e=Cc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Ye}=t;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;let M=p,g=new Set([ga,ma,pa]),d=new Set([Ye,_n,ss,rs,ua,da]),T=new Uint32Array(4),L=new Int32Array(4),y=new H,S=null,b=null,C=[],x=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,B=!1,V=null,W=null,I=null,G=null;this._outputColorSpace=Ie;let J=0,$=0,at=null,Y=-1,it=null,st=new me,Lt=new me,Rt=null,te=new Ht(0),qt=0,$t=e.width,K=e.height,nt=1,Mt=null,Dt=null,yt=new me(0,0,$t,K),Vt=new me(0,0,$t,K),ge=!1,Gt=new Ji,Yt=!1,re=!1,Wt=new ue,ce=new H,xe=new me,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ee=!1;function de(){return at===null?nt:1}let N=n;function _e(_,A){return e.getContext(_,A)}let Qt,w,m,z,k,q,lt,dt,Z,et,ft,bt,pt,mt,Ct,Pt,Bt,D,ut,j,gt,xt,rt;try{let _={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",se,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",Ue,!1),N===null){let A="webgl2";if(N=_e(A,_),N===null)throw _e(A)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(_){throw e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Ue,!1),Ut("WebGLRenderer: "+_.message),_}function It(){Qt=new qf(N),Qt.init(),gt=new Lm(N,Qt),w=new Ff(N,Qt,t,gt),m=new Im(N,Qt),w.reversedDepthBuffer&&h&&m.buffers.depth.setReversed(!0),W=N.createFramebuffer(),I=N.createFramebuffer(),G=N.createFramebuffer(),z=new Jf(N),k=new gm,q=new Pm(N,Qt,m,k,w,gt,z),lt=new Xf(P),dt=new $h(N),xt=new Nf(N,dt),Z=new Yf(N,dt,z,xt),et=new Kf(N,Z,dt,xt,z),D=new $f(N,w,q),Ct=new Of(k),ft=new mm(P,lt,Qt,w,xt,Ct),bt=new Fm(P,k),pt=new xm,mt=new Em(Qt),Bt=new Df(P,lt,m,et,v,c),Pt=new Cm(P,et,w),rt=new Om(N,z,w,m),ut=new Uf(N,Qt,z),j=new Zf(N,Qt,z),z.programs=ft.programs,P.capabilities=w,P.extensions=Qt,P.properties=k,P.renderLists=pt,P.shadowMap=Pt,P.state=m,P.info=z}M!==Ye&&(E=new jf(M,e.width,e.height,o,s,r));let wt=new bl(P,N);this.xr=wt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let _=Qt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=Qt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(_){_!==void 0&&(nt=_,this.setSize($t,K,!1))},this.getSize=function(_){return _.set($t,K)},this.setSize=function(_,A,O=!0){if(wt.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}$t=_,K=A,e.width=Math.floor(_*nt),e.height=Math.floor(A*nt),O===!0&&(e.style.width=_+"px",e.style.height=A+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,_,A)},this.getDrawingBufferSize=function(_){return _.set($t*nt,K*nt).floor()},this.setDrawingBufferSize=function(_,A,O){$t=_,K=A,nt=O,e.width=Math.floor(_*O),e.height=Math.floor(A*O),this.setViewport(0,0,_,A)},this.setEffects=function(_){if(M===Ye){Ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let A=0;A<_.length;A++)if(_[A].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(st)},this.getViewport=function(_){return _.copy(yt)},this.setViewport=function(_,A,O,U){_.isVector4?yt.set(_.x,_.y,_.z,_.w):yt.set(_,A,O,U),m.viewport(st.copy(yt).multiplyScalar(nt).round())},this.getScissor=function(_){return _.copy(Vt)},this.setScissor=function(_,A,O,U){_.isVector4?Vt.set(_.x,_.y,_.z,_.w):Vt.set(_,A,O,U),m.scissor(Lt.copy(Vt).multiplyScalar(nt).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(_){m.setScissorTest(ge=_)},this.setOpaqueSort=function(_){Mt=_},this.setTransparentSort=function(_){Dt=_},this.getClearColor=function(_){return _.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(_=!0,A=!0,O=!0){let U=0;if(_){let F=!1;if(at!==null){let ot=at.texture.format;F=g.has(ot)}if(F){let ot=at.texture.type,ct=d.has(ot),ht=Bt.getClearColor(),vt=Bt.getClearAlpha(),Et=ht.r,Ft=ht.g,zt=ht.b;ct?(T[0]=Et,T[1]=Ft,T[2]=zt,T[3]=vt,N.clearBufferuiv(N.COLOR,0,T)):(L[0]=Et,L[1]=Ft,L[2]=zt,L[3]=vt,N.clearBufferiv(N.COLOR,0,L))}else U|=N.COLOR_BUFFER_BIT}A&&(U|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),O&&(U|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U!==0&&N.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),V=_},this.dispose=function(){e.removeEventListener("webglcontextlost",se,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Ue,!1),Bt.dispose(),pt.dispose(),mt.dispose(),k.dispose(),lt.dispose(),et.dispose(),xt.dispose(),rt.dispose(),ft.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",hi),wt.removeEventListener("sessionend",sr),Rn.stop()};function se(_){_.preventDefault(),jo("WebGLRenderer: Context Lost."),B=!0}function jt(){jo("WebGLRenderer: Context Restored."),B=!1;let _=z.autoReset,A=Pt.enabled,O=Pt.autoUpdate,U=Pt.needsUpdate,F=Pt.type;It(),z.autoReset=_,Pt.enabled=A,Pt.autoUpdate=O,Pt.needsUpdate=U,Pt.type=F}function Ue(_){Ut("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function ke(_){let A=_.target;A.removeEventListener("dispose",ke),ds(A)}function ds(_){Si(_),k.remove(_)}function Si(_){let A=k.get(_).programs;A!==void 0&&(A.forEach(function(O){ft.releaseProgram(O)}),_.isShaderMaterial&&ft.releaseShaderCache(_))}this.renderBufferDirect=function(_,A,O,U,F,ot){A===null&&(A=Ne);let ct=F.isMesh&&F.matrixWorld.determinantAffine()<0,ht=R(_,A,O,U,F);m.setMaterial(U,ct);let vt=O.index,Et=1;if(U.wireframe===!0){if(vt=Z.getWireframeAttribute(O),vt===void 0)return;Et=2}let Ft=O.drawRange,zt=O.attributes.position,Tt=Ft.start*Et,ne=(Ft.start+Ft.count)*Et;ot!==null&&(Tt=Math.max(Tt,ot.start*Et),ne=Math.min(ne,(ot.start+ot.count)*Et)),vt!==null?(Tt=Math.max(Tt,0),ne=Math.min(ne,vt.count)):zt!=null&&(Tt=Math.max(Tt,0),ne=Math.min(ne,zt.count));let Me=ne-Tt;if(Me<0||Me===1/0)return;xt.setup(F,U,ht,O,vt);let fe,le=ut;if(vt!==null&&(fe=dt.get(vt),le=j,le.setIndex(fe)),F.isMesh)U.wireframe===!0?(m.setLineWidth(U.wireframeLinewidth*de()),le.setMode(N.LINES)):le.setMode(N.TRIANGLES);else if(F.isLine){let Fe=U.linewidth;Fe===void 0&&(Fe=1),m.setLineWidth(Fe*de()),F.isLineSegments?le.setMode(N.LINES):F.isLineLoop?le.setMode(N.LINE_LOOP):le.setMode(N.LINE_STRIP)}else F.isPoints?le.setMode(N.POINTS):F.isSprite&&le.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))le.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Fe=F._multiDrawStarts,St=F._multiDrawCounts,Ge=F._multiDrawCount,Kt=vt?dt.get(vt).bytesPerElement:1,tn=k.get(U).currentProgram.getUniforms();for(let vn=0;vn<Ge;vn++)tn.setValue(N,"_gl_DrawID",vn),le.render(Fe[vn]/Kt,St[vn])}else if(F.isInstancedMesh)le.renderInstances(Tt,Me,F.count);else if(O.isInstancedBufferGeometry){let Fe=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,St=Math.min(O.instanceCount,Fe);le.renderInstances(Tt,Me,St)}else le.render(Tt,Me)};function ci(_,A,O,U){V!==null&&_.isNodeMaterial&&V.setObject(U,_),Yt===!0&&Ct.setState(_,O,!1),_.transparent===!0&&_.side===on&&_.forceSinglePass===!1?(_.side=De,_.needsUpdate=!0,In(_,A,U),_.side=si,_.needsUpdate=!0,In(_,A,U),_.side=on):In(_,A,U)}this.compile=function(_,A,O=null){O===null&&(O=_),V!==null&&V.renderStart(_,A,O),b=mt.get(O),b.init(A),x.push(b),O.traverseVisible(function(F){F.isLight&&F.layers.test(A.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),_!==O&&_.traverseVisible(function(F){F.isLight&&F.layers.test(A.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),b.setupLights(),V!==null&&V.updateLights(b.state.lightsArray),re=this.localClippingEnabled,Yt=Ct.init(this.clippingPlanes,re),Yt===!0&&Ct.setGlobalState(this.clippingPlanes,A),V!==null&&Pt.render(b.state.shadowsArray,O,A);let U=new Set;return _.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ot=F.material;if(ot)if(Array.isArray(ot))for(let ct=0;ct<ot.length;ct++){let ht=ot[ct];ci(ht,O,A,F),U.add(ht)}else ci(ot,O,A,F),U.add(ot)}),b=x.pop(),V!==null&&V.renderEnd(),U},this.compileAsync=function(_,A,O=null){let U=this.compile(_,A,O);return new Promise(F=>{function ot(){if(U.forEach(function(ct){let vt=k.get(ct).currentProgram;(vt===void 0||vt.isReady())&&U.delete(ct)}),U.size===0){F(_);return}setTimeout(ot,10)}Qt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let zn=null;function fs(_){zn&&zn(_)}function hi(){Rn.stop()}function sr(){Rn.start()}let Rn=new sh;Rn.setAnimationLoop(fs),typeof self!="undefined"&&Rn.setContext(self),this.setAnimationLoop=function(_){zn=_,wt.setAnimationLoop(_),_===null?Rn.stop():Rn.start()},wt.addEventListener("sessionstart",hi),wt.addEventListener("sessionend",sr),this.render=function(_,A){if(A!==void 0&&A.isCamera!==!0){Ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;V!==null&&V.renderStart(_,A);let O=wt.enabled===!0&&wt.isPresenting===!0,U=E!==null&&(at===null||O)&&E.begin(P,at);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(A),A=wt.getCamera()),_.isScene===!0&&_.onBeforeRender(P,_,A,at),b=mt.get(_,x.length),b.init(A),b.state.textureUnits=q.getTextureUnits(),x.push(b),Wt.multiplyMatrices(A.projectionMatrix,A.matrixWorldInverse),Gt.setFromProjectionMatrix(Wt,mn,A.reversedDepth),re=this.localClippingEnabled,Yt=Ct.init(this.clippingPlanes,re),S=pt.get(_,C.length),S.init(),C.push(S),wt.enabled===!0&&wt.isPresenting===!0){let ct=P.xr.getDepthSensingMesh();ct!==null&&Vn(ct,A,-1/0,P.sortObjects)}Vn(_,A,0,P.sortObjects),S.finish(),V!==null&&V.updateLights(b.state.lightsArray),P.sortObjects===!0&&S.sort(Mt,Dt),ee=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,ee&&Bt.addToRenderList(S,_),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Yt===!0&&Ct.beginShadows();let F=b.state.shadowsArray;if(Pt.render(F,_,A),Yt===!0&&Ct.endShadows(),(U&&E.hasRenderPass())===!1){let ct=S.opaque,ht=S.transmissive;if(b.setupLights(),A.isArrayCamera){let vt=A.cameras;if(ht.length>0)for(let Et=0,Ft=vt.length;Et<Ft;Et++){let zt=vt[Et];Ze(ct,ht,_,zt)}ee&&Bt.render(_);for(let Et=0,Ft=vt.length;Et<Ft;Et++){let zt=vt[Et];rr(S,_,zt,zt.viewport)}}else ht.length>0&&Ze(ct,ht,_,A),ee&&Bt.render(_),rr(S,_,A)}at!==null&&$===0&&(q.updateMultisampleRenderTarget(at),q.updateRenderTargetMipmap(at)),U&&E.end(P),_.isScene===!0&&_.onAfterRender(P,_,A),xt.resetDefaultState(),Y=-1,it=null,x.pop(),x.length>0?(b=x[x.length-1],q.setTextureUnits(b.state.textureUnits),Yt===!0&&Ct.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,V!==null&&V.renderEnd()};function Vn(_,A,O,U){if(_.visible===!1)return;if(_.layers.test(A.layers)){if(_.isGroup)O=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(A);else if(_.isLightProbeGrid)b.pushLightProbeGrid(_);else if(_.isLight)b.pushLight(_),_.castShadow&&b.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||_.intersectsFrustum(Gt)){U&&xe.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Wt);let ct=et.update(_),ht=_.material;ht.visible&&S.push(_,ct,ht,O,xe.z,null,A)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||_.intersectsFrustum(Gt))){let ct=et.update(_),ht=_.material;if(U&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),xe.copy(_.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),xe.copy(ct.boundingSphere.center)),xe.applyMatrix4(_.matrixWorld).applyMatrix4(Wt)),Array.isArray(ht)){let vt=ct.groups;for(let Et=0,Ft=vt.length;Et<Ft;Et++){let zt=vt[Et],Tt=ht[zt.materialIndex];Tt&&Tt.visible&&S.push(_,ct,Tt,O,xe.z,zt,A)}}else ht.visible&&S.push(_,ct,ht,O,xe.z,null,A)}}let ot=_.children;for(let ct=0,ht=ot.length;ct<ht;ct++)Vn(ot[ct],A,O,U)}function rr(_,A,O,U){let{opaque:F,transmissive:ot,transparent:ct}=_;b.setupLightsView(O),Yt===!0&&Ct.setGlobalState(P.clippingPlanes,O),U&&m.viewport(st.copy(U)),F.length>0&&Cn(F,A,O),ot.length>0&&Cn(ot,A,O),ct.length>0&&Cn(ct,A,O),m.buffers.depth.setTest(!0),m.buffers.depth.setMask(!0),m.buffers.color.setMask(!0),m.setPolygonOffset(!1)}function Ze(_,A,O,U){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[U.id]===void 0){let Tt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[U.id]=new qe(1,1,{generateMipmaps:!0,type:Tt?xn:Ye,minFilter:ai,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}let ot=b.state.transmissionRenderTarget[U.id],ct=U.viewport||st;ot.setSize(ct.z*P.transmissionResolutionScale,ct.w*P.transmissionResolutionScale);let ht=P.getRenderTarget(),vt=P.getActiveCubeFace(),Et=P.getActiveMipmapLevel();P.setRenderTarget(ot),P.getClearColor(te),qt=P.getClearAlpha(),qt<1&&P.setClearColor(16777215,.5),P.clear(),ee&&Bt.render(O);let Ft=P.toneMapping;P.toneMapping=gn;let zt=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),b.setupLightsView(U),Yt===!0&&Ct.setGlobalState(P.clippingPlanes,U),Cn(_,O,U),q.updateMultisampleRenderTarget(ot),q.updateRenderTargetMipmap(ot),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let ne=0,Me=A.length;ne<Me;ne++){let fe=A[ne],{object:le,geometry:Fe,material:St,group:Ge}=fe;if(St.side===on&&le.layers.test(U.layers)){let Kt=St.side;St.side=De,St.needsUpdate=!0,Hn(le,O,U,Fe,St,Ge),St.side=Kt,St.needsUpdate=!0,Tt=!0}}Tt===!0&&(q.updateMultisampleRenderTarget(ot),q.updateRenderTargetMipmap(ot))}P.setRenderTarget(ht,vt,Et),P.setClearColor(te,qt),zt!==void 0&&(U.viewport=zt),P.toneMapping=Ft}function Cn(_,A,O){let U=A.isScene===!0?A.overrideMaterial:null;for(let F=0,ot=_.length;F<ot;F++){let ct=_[F],{object:ht,geometry:vt,group:Et}=ct,Ft=ct.material;Ft.allowOverride===!0&&U!==null&&(Ft=U),ht.layers.test(O.layers)&&Hn(ht,A,O,vt,Ft,Et)}}function Hn(_,A,O,U,F,ot){V!==null&&F.isNodeMaterial&&V.setObject(_,F),_.onBeforeRender(P,A,O,U,F,ot),_.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),F.onBeforeRender(P,A,O,U,_,ot),F.transparent===!0&&F.side===on&&F.forceSinglePass===!1?(F.side=De,F.needsUpdate=!0,P.renderBufferDirect(O,A,U,F,_,ot),F.side=si,F.needsUpdate=!0,P.renderBufferDirect(O,A,U,F,_,ot),F.side=on):P.renderBufferDirect(O,A,U,F,_,ot),_.onAfterRender(P,A,O,U,F,ot)}function In(_,A,O){A.isScene!==!0&&(A=Ne);let U=k.get(_),F=b.state.lights,ot=b.state.shadowsArray,ct=F.state.version,ht=ft.getParameters(_,F.state,ot,A,O,b.state.lightProbeGridArray),vt=ft.getProgramCacheKey(ht),Et=U.programs;U.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,U.fog=A.fog;let Ft=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;U.envMap=lt.get(_.envMap||U.environment,Ft),U.envMapRotation=U.environment!==null&&_.envMap===null?A.environmentRotation:_.envMapRotation,Et===void 0&&(_.addEventListener("dispose",ke),Et=new Map,U.programs=Et);let zt=Et.get(vt);if(zt!==void 0){if(U.currentProgram===zt&&U.lightsStateVersion===ct)return ps(_,ht),zt}else ht.uniforms=ft.getUniforms(_),V!==null&&_.isNodeMaterial&&V.build(_,O,ht),_.onBeforeCompile(ht,P),zt=ft.acquireProgram(ht,vt),Et.set(vt,zt),U.uniforms=ht.uniforms;let Tt=U.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Tt.clippingPlanes=Ct.uniform),ps(_,ht),U.needsLights=Q(_),U.lightsStateVersion=ct,U.needsLights&&(Tt.ambientLightColor.value=F.state.ambient,Tt.lightProbe.value=F.state.probe,Tt.sunLights.value=F.state.sun,Tt.sunLightShadows.value=F.state.sunShadow,Tt.directionalLights.value=F.state.directional,Tt.directionalLightShadows.value=F.state.directionalShadow,Tt.spotLights.value=F.state.spot,Tt.spotLightShadows.value=F.state.spotShadow,Tt.rectAreaLights.value=F.state.rectArea,Tt.ltc_1.value=F.state.rectAreaLTC1,Tt.ltc_2.value=F.state.rectAreaLTC2,Tt.pointLights.value=F.state.point,Tt.pointLightShadows.value=F.state.pointShadow,Tt.hemisphereLights.value=F.state.hemi,Tt.sunShadowMatrix.value=F.state.sunShadowMatrix,Tt.sunShadowCascade.value=F.state.sunShadowCascade,Tt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Tt.spotLightMatrix.value=F.state.spotLightMatrix,Tt.spotLightMap.value=F.state.spotLightMap,Tt.pointShadowMatrix.value=F.state.pointShadowMatrix),U.lightProbeGrid=b.state.lightProbeGridArray.length>0,U.currentProgram=zt,U.uniformsList=null,zt}function bi(_){if(_.uniformsList===null){let A=_.currentProgram.getUniforms();_.uniformsList=ls.seqWithValue(A.seq,_.uniforms)}return _.uniformsList}function ps(_,A){let O=k.get(_);O.outputColorSpace=A.outputColorSpace,O.batching=A.batching,O.batchingColor=A.batchingColor,O.instancing=A.instancing,O.instancingColor=A.instancingColor,O.instancingMorph=A.instancingMorph,O.skinning=A.skinning,O.morphTargets=A.morphTargets,O.morphNormals=A.morphNormals,O.morphColors=A.morphColors,O.morphTargetsCount=A.morphTargetsCount,O.numClippingPlanes=A.numClippingPlanes,O.numIntersection=A.numClipIntersection,O.vertexAlphas=A.vertexAlphas,O.vertexTangents=A.vertexTangents,O.toneMapping=A.toneMapping}function kn(_,A){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;y.setFromMatrixPosition(A.matrixWorld);for(let O=0,U=_.length;O<U;O++){let F=_[O];if(F.texture!==null&&F.boundingBox.containsPoint(y))return F}return null}function R(_,A,O,U,F){A.isScene!==!0&&(A=Ne),q.resetTextureUnits();let ot=A.fog,ct=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?A.environment:null,ht=at===null?P.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Zt.workingColorSpace,vt=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap,Et=lt.get(U.envMap||ct,vt),Ft=U.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,zt=!!O.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Tt=!!O.morphAttributes.position,ne=!!O.morphAttributes.normal,Me=!!O.morphAttributes.color,fe=gn;U.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(fe=P.toneMapping);let le=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Fe=le!==void 0?le.length:0,St=k.get(U),Ge=b.state.lights;if(Yt===!0&&(re===!0||_!==it)){let he=_===it&&U.id===Y;Ct.setState(U,_,he)}let Kt=!1;U.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Ge.state.version||St.outputColorSpace!==ht||F.isBatchedMesh&&St.batching===!1||!F.isBatchedMesh&&St.batching===!0||F.isBatchedMesh&&St.batchingColor===!0&&F._colorsTexture===null||F.isBatchedMesh&&St.batchingColor===!1&&F._colorsTexture!==null||F.isInstancedMesh&&St.instancing===!1||!F.isInstancedMesh&&St.instancing===!0||F.isSkinnedMesh&&St.skinning===!1||!F.isSkinnedMesh&&St.skinning===!0||F.isInstancedMesh&&St.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&St.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&St.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&St.instancingMorph===!1&&F.morphTexture!==null||St.envMap!==Et||U.fog===!0&&St.fog!==ot||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Ct.numPlanes||St.numIntersection!==Ct.numIntersection)||St.vertexAlphas!==Ft||St.vertexTangents!==zt||St.morphTargets!==Tt||St.morphNormals!==ne||St.morphColors!==Me||St.toneMapping!==fe||St.morphTargetsCount!==Fe||!!St.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,St.__version=U.version);let tn=St.currentProgram;Kt===!0&&(tn=In(U,A,F),V&&U.isNodeMaterial&&V.onUpdateProgram(U,tn,St));let vn=!1,Gn=!1,Ei=!1,ae=tn.getUniforms(),ve=St.uniforms;if(m.useProgram(tn.program)&&(vn=!0,Gn=!0,Ei=!0),U.id!==Y&&(Y=U.id,Gn=!0),St.needsLights){let he=kn(b.state.lightProbeGridArray,F);St.lightProbeGrid!==he&&(St.lightProbeGrid=he,Gn=!0)}if(vn||it!==_){m.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),ae.setValue(N,"projectionMatrix",_.projectionMatrix),ae.setValue(N,"viewMatrix",_.matrixWorldInverse);let Xn=ae.map.cameraPosition;Xn!==void 0&&Xn.setValue(N,ce.setFromMatrixPosition(_.matrixWorld)),w.logarithmicDepthBuffer&&ae.setValue(N,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&ae.setValue(N,"isOrthographic",_.isOrthographicCamera===!0),it!==_&&(it=_,Gn=!0,Ei=!0)}if(St.needsLights&&(Ge.state.sunShadowMap.length>0&&ae.setValue(N,"sunShadowMap",Ge.state.sunShadowMap,q),Ge.state.directionalShadowMap.length>0&&ae.setValue(N,"directionalShadowMap",Ge.state.directionalShadowMap,q),Ge.state.spotShadowMap.length>0&&ae.setValue(N,"spotShadowMap",Ge.state.spotShadowMap,q),Ge.state.pointShadowMap.length>0&&ae.setValue(N,"pointShadowMap",Ge.state.pointShadowMap,q)),F.isSkinnedMesh){ae.setOptional(N,F,"bindMatrix"),ae.setOptional(N,F,"bindMatrixInverse");let he=F.skeleton;he&&(he.boneTexture===null&&he.computeBoneTexture(),ae.setValue(N,"boneTexture",he.boneTexture,q))}F.isBatchedMesh&&(ae.setOptional(N,F,"batchingTexture"),ae.setValue(N,"batchingTexture",F._matricesTexture,q),ae.setOptional(N,F,"batchingIdTexture"),ae.setValue(N,"batchingIdTexture",F._indirectTexture,q),ae.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&ae.setValue(N,"batchingColorTexture",F._colorsTexture,q));let Wn=O.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&D.update(F,O,tn),(Gn||St.receiveShadow!==F.receiveShadow)&&(St.receiveShadow=F.receiveShadow,ae.setValue(N,"receiveShadow",F.receiveShadow)),(U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial)&&U.envMap===null&&A.environment!==null&&(ve.envMapIntensity.value=A.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=zm()),Gn){if(ae.setValue(N,"toneMappingExposure",P.toneMappingExposure),St.needsLights&&X(ve,Ei),ot&&U.fog===!0&&bt.refreshFogUniforms(ve,ot),bt.refreshMaterialUniforms(ve,U,nt,K,b.state.transmissionRenderTarget[_.id]),St.needsLights&&St.lightProbeGrid){let he=St.lightProbeGrid;ve.probesSH.value=he.texture,ve.probesMin.value.copy(he.boundingBox.min),ve.probesMax.value.copy(he.boundingBox.max),ve.probesResolution.value.copy(he.resolution)}ls.upload(N,bi(St),ve,q)}if(U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(ls.upload(N,bi(St),ve,q),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&ae.setValue(N,"center",F.center),ae.setValue(N,"modelViewMatrix",F.modelViewMatrix),ae.setValue(N,"normalMatrix",F.normalMatrix),ae.setValue(N,"modelMatrix",F.matrixWorld),U.uniformsGroups!==void 0){let he=U.uniformsGroups;for(let Xn=0,Ti=he.length;Xn<Ti;Xn++){let El=he[Xn];rt.update(El,tn),rt.bind(El,tn)}}return tn}function X(_,A){_.ambientLightColor.needsUpdate=A,_.lightProbe.needsUpdate=A,_.sunLights.needsUpdate=A,_.sunLightShadows.needsUpdate=A,_.directionalLights.needsUpdate=A,_.directionalLightShadows.needsUpdate=A,_.pointLights.needsUpdate=A,_.pointLightShadows.needsUpdate=A,_.spotLights.needsUpdate=A,_.spotLightShadows.needsUpdate=A,_.rectAreaLights.needsUpdate=A,_.hemisphereLights.needsUpdate=A}function Q(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(_,A,O){let U=k.get(_);U.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),k.get(_.texture).__webglTexture=A,k.get(_.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:O,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,A){let O=k.get(_);O.__webglFramebuffer=A,O.__useDefaultFramebuffer=A===void 0},this.setRenderTarget=function(_,A=0,O=0){at=_,J=A,$=O;let U=null,F=!1,ot=!1;if(_){let ht=k.get(_);if(ht.__useDefaultFramebuffer!==void 0){m.bindFramebuffer(N.FRAMEBUFFER,ht.__webglFramebuffer),st.copy(_.viewport),Lt.copy(_.scissor),Rt=_.scissorTest,m.viewport(st),m.scissor(Lt),m.setScissorTest(Rt),Y=-1;return}else if(ht.__webglFramebuffer===void 0)q.setupRenderTarget(_);else if(ht.__hasExternalTextures)q.rebindTextures(_,k.get(_.texture).__webglTexture,k.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Ft=_.depthTexture;if(ht.__boundDepthTexture!==Ft){if(Ft!==null&&k.has(Ft)&&(_.width!==Ft.image.width||_.height!==Ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(_)}}let vt=_.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(ot=!0);let Et=k.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Et[A])?U=Et[A][O]:U=Et[A],F=!0):_.samples>0&&q.useMultisampledRTT(_)===!1?U=k.get(_).__webglMultisampledFramebuffer:Array.isArray(Et)?U=Et[O]:U=Et,st.copy(_.viewport),Lt.copy(_.scissor),Rt=_.scissorTest}else st.copy(yt).multiplyScalar(nt).floor(),Lt.copy(Vt).multiplyScalar(nt).floor(),Rt=ge;if(O!==0&&(U=W),m.bindFramebuffer(N.FRAMEBUFFER,U)&&m.drawBuffers(_,U),m.viewport(st),m.scissor(Lt),m.setScissorTest(Rt),F){let ht=k.get(_.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+A,ht.__webglTexture,O)}else if(ot){let ht=A;for(let vt=0;vt<_.textures.length;vt++){let Et=k.get(_.textures[vt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+vt,Et.__webglTexture,O,ht)}}else if(_!==null&&O!==0){let ht=k.get(_.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ht.__webglTexture,O)}Y=-1};function tt(_){let A=k.get(_);return(A.__readFormat!==_.format||A.__readType!==_.type)&&(A.__readFormat=_.format,A.__readType=_.type,A.__formatReadable=w.textureFormatReadable(_.format),A.__typeReadable=w.textureTypeReadable(_.type)),A}this.readRenderTargetPixels=function(_,A,O,U,F,ot,ct,ht=0){if(!(_&&_.isWebGLRenderTarget)){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=k.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(vt=vt[ct]),vt){m.bindFramebuffer(N.FRAMEBUFFER,vt);try{let Et=_.textures[ht],Ft=Et.format,zt=Et.type;_.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Tt=tt(Et);if(Tt.__formatReadable===!1){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}A>=0&&A<=_.width-U&&O>=0&&O<=_.height-F&&N.readPixels(A,O,U,F,gt.convert(Ft),gt.convert(zt),ot)}finally{let Et=at!==null?k.get(at).__webglFramebuffer:null;m.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(_,A,O,U,F,ot,ct,ht=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=k.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(vt=vt[ct]),vt)if(A>=0&&A<=_.width-U&&O>=0&&O<=_.height-F){m.bindFramebuffer(N.FRAMEBUFFER,vt);let Et=_.textures[ht],Ft=Et.format,zt=Et.type;_.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ht);let Tt=tt(Et);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ne=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ne),N.bufferData(N.PIXEL_PACK_BUFFER,ot.byteLength,N.STREAM_READ),N.readPixels(A,O,U,F,gt.convert(Ft),gt.convert(zt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Me=at!==null?k.get(at).__webglFramebuffer:null;m.bindFramebuffer(N.FRAMEBUFFER,Me);let fe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pc(N,fe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ne),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ot),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(ne),N.deleteSync(fe),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,A=null,O=0){let U=Math.pow(2,-O),F=Math.floor(_.image.width*U),ot=Math.floor(_.image.height*U),ct=A!==null?A.x:0,ht=A!==null?A.y:0;q.setTexture2D(_,0),N.copyTexSubImage2D(N.TEXTURE_2D,O,0,0,ct,ht,F,ot),m.unbindTexture()},this.copyTextureToTexture=function(_,A,O=null,U=null,F=0,ot=0){let ct,ht,vt,Et,Ft,zt,Tt,ne,Me,fe=_.isCompressedTexture?_.mipmaps[ot]:_.image;if(O!==null)ct=O.max.x-O.min.x,ht=O.max.y-O.min.y,vt=O.isBox3?O.max.z-O.min.z:1,Et=O.min.x,Ft=O.min.y,zt=O.isBox3?O.min.z:0;else{let ve=Math.pow(2,-F);ct=Math.floor(fe.width*ve),ht=Math.floor(fe.height*ve),_.isDataArrayTexture?vt=fe.depth:_.isData3DTexture?vt=Math.floor(fe.depth*ve):vt=1,Et=0,Ft=0,zt=0}U!==null?(Tt=U.x,ne=U.y,Me=U.z):(Tt=0,ne=0,Me=0);let le=gt.convert(A.format),Fe=gt.convert(A.type),St;A.isData3DTexture?(q.setTexture3D(A,0),St=N.TEXTURE_3D):A.isDataArrayTexture||A.isCompressedArrayTexture?(q.setTexture2DArray(A,0),St=N.TEXTURE_2D_ARRAY):(q.setTexture2D(A,0),St=N.TEXTURE_2D),m.activeTexture(N.TEXTURE0),m.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,A.flipY),m.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),m.pixelStorei(N.UNPACK_ALIGNMENT,A.unpackAlignment);let Ge=m.getParameter(N.UNPACK_ROW_LENGTH),Kt=m.getParameter(N.UNPACK_IMAGE_HEIGHT),tn=m.getParameter(N.UNPACK_SKIP_PIXELS),vn=m.getParameter(N.UNPACK_SKIP_ROWS),Gn=m.getParameter(N.UNPACK_SKIP_IMAGES);m.pixelStorei(N.UNPACK_ROW_LENGTH,fe.width),m.pixelStorei(N.UNPACK_IMAGE_HEIGHT,fe.height),m.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),m.pixelStorei(N.UNPACK_SKIP_ROWS,Ft),m.pixelStorei(N.UNPACK_SKIP_IMAGES,zt);let Ei=_.isDataArrayTexture||_.isData3DTexture,ae=A.isDataArrayTexture||A.isData3DTexture;if(_.isDepthTexture){let ve=k.get(_),Wn=k.get(A),he=k.get(ve.__renderTarget),Xn=k.get(Wn.__renderTarget);m.bindFramebuffer(N.READ_FRAMEBUFFER,he.__webglFramebuffer),m.bindFramebuffer(N.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Ti=0;Ti<vt;Ti++)Ei&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,k.get(_).__webglTexture,F,zt+Ti),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,k.get(A).__webglTexture,ot,Me+Ti)),N.blitFramebuffer(Et,Ft,ct,ht,Tt,ne,ct,ht,N.DEPTH_BUFFER_BIT,N.NEAREST);m.bindFramebuffer(N.READ_FRAMEBUFFER,null),m.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||_.isRenderTargetTexture||k.has(_)){let ve=k.get(_),Wn=k.get(A);m.bindFramebuffer(N.READ_FRAMEBUFFER,I),m.bindFramebuffer(N.DRAW_FRAMEBUFFER,G);for(let he=0;he<vt;he++)Ei?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,F,zt+he):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ve.__webglTexture,F),ae?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Wn.__webglTexture,ot,Me+he):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Wn.__webglTexture,ot),F!==0?N.blitFramebuffer(Et,Ft,ct,ht,Tt,ne,ct,ht,N.COLOR_BUFFER_BIT,N.NEAREST):ae?N.copyTexSubImage3D(St,ot,Tt,ne,Me+he,Et,Ft,ct,ht):N.copyTexSubImage2D(St,ot,Tt,ne,Et,Ft,ct,ht);m.bindFramebuffer(N.READ_FRAMEBUFFER,null),m.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ae?_.isDataTexture||_.isData3DTexture?N.texSubImage3D(St,ot,Tt,ne,Me,ct,ht,vt,le,Fe,fe.data):A.isCompressedArrayTexture?N.compressedTexSubImage3D(St,ot,Tt,ne,Me,ct,ht,vt,le,fe.data):N.texSubImage3D(St,ot,Tt,ne,Me,ct,ht,vt,le,Fe,fe):_.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ot,Tt,ne,ct,ht,le,Fe,fe.data):_.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ot,Tt,ne,fe.width,fe.height,le,fe.data):N.texSubImage2D(N.TEXTURE_2D,ot,Tt,ne,ct,ht,le,Fe,fe);m.pixelStorei(N.UNPACK_ROW_LENGTH,Ge),m.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Kt),m.pixelStorei(N.UNPACK_SKIP_PIXELS,tn),m.pixelStorei(N.UNPACK_SKIP_ROWS,vn),m.pixelStorei(N.UNPACK_SKIP_IMAGES,Gn),ot===0&&A.generateMipmaps&&N.generateMipmap(St),m.unbindTexture()},this.initRenderTarget=function(_){k.get(_).__webglFramebuffer===void 0&&q.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?q.setTextureCube(_,0):_.isData3DTexture?q.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?q.setTexture2DArray(_,0):q.setTexture2D(_,0),m.unbindTexture()},this.resetState=function(){J=0,$=0,at=null,m.reset(),xt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}};var eo=class extends gi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new be;t.deleteAttribute("uv");let e=new oe({side:De}),n=new oe,s=new Hs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new At(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Ps(t,n,6),o=new Ce;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new At(t,us(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new At(t,us(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new At(t,us(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let f=new At(t,us(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let h=new At(t,us(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let p=new At(t,us(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function us(i){return new Us({color:0,emissive:16777215,emissiveIntensity:i})}var ir=new H;function hn(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;ir.copy(t),ir[n]=0,ir.normalize();let l=.5*a/(a+o),u=1-ir.angleTo(i)/c;return Math.sign(ir[e])===1?u*l:o/(a+o)+l+l*(1-u)}var ye=class i extends be{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new H,l=new H,u=new H(t,e,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,h=this.attributes.normal.array,p=this.attributes.uv.array,v=f.length/6,M=new H,g=.5/a;for(let d=0,T=0;d<f.length;d+=3,T+=2)switch(c.fromArray(f,d),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),f[d+0]=u.x*Math.sign(c.x)+l.x*r,f[d+1]=u.y*Math.sign(c.y)+l.y*r,f[d+2]=u.z*Math.sign(c.z)+l.z*r,h[d+0]=l.x,h[d+1]=l.y,h[d+2]=l.z,Math.floor(d/v)){case 0:M.set(1,0,0),p[T+0]=hn(M,l,"z","y",r,n),p[T+1]=1-hn(M,l,"y","z",r,e);break;case 1:M.set(-1,0,0),p[T+0]=1-hn(M,l,"z","y",r,n),p[T+1]=1-hn(M,l,"y","z",r,e);break;case 2:M.set(0,1,0),p[T+0]=1-hn(M,l,"x","z",r,t),p[T+1]=hn(M,l,"z","x",r,n);break;case 3:M.set(0,-1,0),p[T+0]=1-hn(M,l,"x","z",r,t),p[T+1]=1-hn(M,l,"z","x",r,n);break;case 4:M.set(0,0,1),p[T+0]=1-hn(M,l,"x","y",r,t),p[T+1]=1-hn(M,l,"y","x",r,e);break;case 5:M.set(0,0,-1),p[T+0]=hn(M,l,"x","y",r,t),p[T+1]=1-hn(M,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var uh="data:image/webp;base64,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";var dh="data:image/png;base64,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";(function(){var i=document.querySelector("[data-iv-laptop]");if(!i)return;var t=new URLSearchParams(location.search),e=t.has("iv-t")?parseFloat(t.get("iv-t")):null,n=window.matchMedia("(hover: hover) and (pointer: fine)");function s(R,X,Q){return Math.min(Q,Math.max(X,R))}function r(R){return 1-Math.pow(1-R,3)}function a(R){return R<.5?4*R*R*R:1-Math.pow(-2*R+2,3)/2}function o(R){var X=Math.sin(R*91.37+12.9)*43758.5453;return X-Math.floor(X)}function c(R,X,Q,tt,_,A){var O=1-A;return R.set(0,0,0).addScaledVector(X,O*O*O).addScaledVector(Q,3*O*O*A).addScaledVector(tt,3*O*A*A).addScaledVector(_,A*A*A)}var l=document.createElement("canvas");l.className="ivl-stage__canvas";var u;try{u=new Qa({canvas:l,alpha:!0,antialias:!0,powerPreference:"high-performance"})}catch{i.classList.add("is-fallback");return}i.appendChild(l),i.classList.add("is-3d"),u.setClearColor(0,0),u.outputColorSpace=Ie,u.toneMapping=Gs;var f=u.capabilities.getMaxAnisotropy(),h=new gi,p=new cs(u);h.environment=p.fromScene(new eo,.04).texture,h.environmentIntensity=.8,p.dispose();var v=new ts(16774374,2.1);v.position.set(-3,6,5),h.add(v);var M=new ts(12575743,1);M.position.set(4,3,-4),h.add(M),h.add(new Bs(15922943,3818584,.45));var g=new Pe(30,1.6,.1,100),d=new ze;h.add(d);function T(R,X,Q,tt){var _=document.createElement("canvas");_.width=R,_.height=X,Q(_.getContext("2d"),R,X);var A=new Ds(_);return tt!==!1&&(A.colorSpace=Ie),A.anisotropy=f,A.__draw=function(){Q(_.getContext("2d"),R,X),A.needsUpdate=!0},A}var L=T(256,256,function(R,X,Q){R.fillStyle="#808080",R.fillRect(0,0,X,Q);for(var tt=0;tt<3e3;tt++)R.fillStyle=o(tt)>.5?"rgba(255,255,255,.14)":"rgba(0,0,0,.14)",R.fillRect(o(tt*1.3)*X,o(tt*2.9)*Q,1.5,1.5)},!1);L.wrapS=L.wrapT=Gi;var y=new Image,S=!1,b=[],C=1,x=.52,E=.68,P=.035;function B(R){return T(R?640:440,340,function(X,Q,tt){var _=X.createLinearGradient(0,0,0,tt);_.addColorStop(0,"#9aa0a8"),_.addColorStop(1,"#7d838c"),X.fillStyle=_,X.fillRect(0,0,Q,tt),X.fillStyle="rgba(255,255,255,.18)",X.fillRect(0,0,Q,16),X.fillStyle="rgba(0,0,0,.18)",X.fillRect(0,16,Q,4);for(var A=R?9:6,O=1;O<A;O++){var U=O*Q/A;X.fillStyle="rgba(0,0,0,.16)",X.fillRect(U-5,26,4,tt-40),X.fillStyle="rgba(255,255,255,.12)",X.fillRect(U-1,26,3,tt-40)}if(X.fillStyle="rgba(0,0,0,.22)",X.fillRect(0,tt-22,Q,22),R){X.fillStyle="#b9bec5",X.fillRect(Q*.36,tt*.36,Q*.28,tt*.26),X.fillStyle="#f4f6f8",X.fillRect(Q*.38,tt*.4,Q*.24,tt*.18),X.fillStyle="#0f2c59";for(var F=0;F<26;F++)o(F+4)>.35&&X.fillRect(Q*.4+F*5,tt*.43,o(F)>.5?3:2,tt*.08);X.fillStyle="#10b981",X.fillRect(Q*.4,tt*.53,Q*.12,5)}else X.beginPath(),X.roundRect(Q*.3,34,Q*.4,46,22),X.fillStyle="#23262b",X.fill(),X.strokeStyle="rgba(255,255,255,.25)",X.lineWidth=3,X.stroke()})}var V=new oe({map:B(!0),roughness:.55,bumpMap:L,bumpScale:.3}),W=new oe({map:B(!1),roughness:.55,bumpMap:L,bumpScale:.3}),I=new oe({color:8752020,roughness:.6}),G=new oe({color:6120300,roughness:.7});function J(){var R=new ze,X=new At(new be(C-.04,P,E-.04),G);return X.position.y=P/2+.02,R.add(X),[1,-1].forEach(function(Q){var tt=Q>0?[I,I,I,I,V,G]:[I,I,I,I,G,V],_=new At(new be(C,x,P),tt);_.position.set(0,x/2,Q*(E/2-P/2)),R.add(_)}),[1,-1].forEach(function(Q){var tt=Q>0?[W,G,I,I,I,I]:[G,W,I,I,I,I],_=new At(new be(P,x,E-P*2),tt);_.position.set(Q*(C/2-P/2),x/2,0),R.add(_)}),[[C+.03,P*1.4,0,E/2],[C+.03,P*1.4,0,-E/2]].forEach(function(Q){var tt=new At(new be(Q[0],.04,Q[1]),I);tt.position.set(Q[2],x-.02,Q[3]),R.add(tt)}),[[E+.03,C/2],[E+.03,-C/2]].forEach(function(Q){var tt=new At(new be(P*1.4,.04,Q[0]),I);tt.position.set(Q[1],x-.02,0),R.add(tt)}),R}function $(R,X,Q,tt){R.fillStyle="#c89a62",R.fillRect(0,0,X,Q);for(var _=0;_<60;_++){var A=o(tt+_)*X,O=o(tt+_*1.7)*Q,U=30+o(tt+_*2.3)*110,F=R.createRadialGradient(A,O,0,A,O,U);F.addColorStop(0,o(tt+_*3.1)>.5?"rgba(120,80,40,.10)":"rgba(235,200,150,.10)"),F.addColorStop(1,"rgba(0,0,0,0)"),R.fillStyle=F,R.fillRect(A-U,O-U,U*2,U*2)}for(var ot=0;ot<Q;ot+=7)R.fillStyle="rgba(120,80,40,.035)",R.fillRect(0,ot,X,3);var ct=R.createLinearGradient(0,0,0,Q);ct.addColorStop(0,"rgba(90,60,30,.25)"),ct.addColorStop(.06,"rgba(90,60,30,0)"),ct.addColorStop(.94,"rgba(90,60,30,0)"),ct.addColorStop(1,"rgba(90,60,30,.3)"),R.fillStyle=ct,R.fillRect(0,0,X,Q)}function at(R,X,Q,tt,_){R.fillStyle="rgba(214,176,118,.92)",R.fillRect(X,Q,tt,_),R.strokeStyle="rgba(140,100,50,.35)",R.lineWidth=2,R.strokeRect(X+1,Q+1,tt-2,_-2)}function Y(R,X,Q,tt){S&&(R.save(),R.globalCompositeOperation="multiply",R.globalAlpha=.9,R.drawImage(y,X-tt/2,Q-tt/2,tt,tt),R.restore())}var it=.9,st=.66,Lt=.66,Rt=T(620,456,function(R,X,Q){$(R,X,Q,11),at(R,X/2-34,0,68,Q*.2),Y(R,X*.5,Q*.58,Q*.62)}),te=T(456,456,function(R,X,Q){$(R,X,Q,23),R.beginPath(),R.ellipse(X/2,Q*.24,X*.17,Q*.05,0,0,Math.PI*2),R.fillStyle="#2a1c10",R.fill(),Y(R,X/2,Q*.62,Q*.42)}),qt=T(620,456,function(R,X,Q){$(R,X,Q,37),R.fillStyle="rgba(60,38,18,.55)",R.fillRect(0,Q/2-2,X,4),at(R,0,Q/2-36,X,72)});b.push(Rt,te);function $t(R){function X(Q){return new oe(Object.assign({map:Q,bumpMap:L,bumpScale:.4,roughness:.88},R||{}))}return[X(te),X(te),X(qt),X(qt),X(Rt),X(Rt)]}var K=new ye(it,st,Lt,3,.02);function nt(R){var X=new ze,Q=$t(R),tt=new At(K,Q);return tt.position.y=st/2,X.add(tt),X.userData.mats=Q,X}var Mt=new oe({color:2830134,roughness:.92,bumpMap:L,bumpScale:.8}),Dt=new oe({color:1382171,roughness:.45,metalness:.1}),yt=new ti({color:14278115,metalness:1,roughness:.18}),Vt=new ti({color:15397631,roughness:.12,metalness:0,transparent:!0,opacity:.22,clearcoat:1,clearcoatRoughness:.08,depthWrite:!1,side:on});function ge(){for(var R=new ze,X=0;X<5;X++){var Q=X/5*Math.PI*2,tt=new At(new ye(.46,.05,.07,2,.02),Dt);tt.position.set(Math.cos(Q)*.23,.1,Math.sin(Q)*.23),tt.rotation.y=-Q,tt.rotation.z=.08,R.add(tt);var _=new At(new $i(.045,16,12),Dt);_.position.set(Math.cos(Q)*.45,.045,Math.sin(Q)*.45),_.scale.set(1,1,.8),R.add(_)}var A=new At(new _i(.07,.08,.1,20),Dt);A.position.y=.12,R.add(A);var O=new At(new _i(.032,.032,.36,20),yt);O.position.y=.34,R.add(O);var U=new At(new ye(.3,.06,.26,2,.02),Dt);U.position.y=.53,R.add(U);var F=new At(new ye(.62,.11,.58,4,.05),Mt);F.position.y=.61,R.add(F);var ot=new At(new ye(.56,.72,.08,4,.04),Mt);ot.position.set(0,1.08,-.3),ot.rotation.x=-.12,R.add(ot);var ct=new At(new ye(.08,.5,.04,2,.015),Dt);ct.position.set(0,.78,-.33),ct.rotation.x=-.35,R.add(ct),[-1,1].forEach(function(Ft){var zt=new At(new ye(.04,.22,.05,2,.015),Dt);zt.position.set(Ft*.29,.75,0),R.add(zt);var Tt=new At(new ye(.07,.035,.26,2,.015),Dt);Tt.position.set(Ft*.29,.87,.01),R.add(Tt)});var ht=new At(new ye(.7,.2,.66,4,.08),Vt);ht.position.y=.62,R.add(ht);var vt=new At(new ye(.64,.82,.16,4,.07),Vt);vt.position.set(0,1.08,-.3),vt.rotation.x=-.12,R.add(vt);var Et=new At(new ye(.72,.3,.3,3,.1),Vt);return Et.position.set(0,.84,-.02),R.add(Et),R}var Gt=T(512,256,function(R,X,Q){R.fillStyle="#d9b98c",R.fillRect(0,0,X,Q);for(var tt=0;tt<90;tt++){var _=o(tt*2.1)*Q;R.strokeStyle=o(tt)>.5?"rgba(150,105,60,.18)":"rgba(255,235,200,.2)",R.lineWidth=1+o(tt*5)*2,R.beginPath(),R.moveTo(0,_);for(var A=0;A<=X;A+=32)R.lineTo(A,_+Math.sin(A*.02+tt)*3);R.stroke()}}),Yt=new oe({color:15856630,roughness:.35,metalness:.3}),re=new oe({color:724242,roughness:.3,metalness:.3}),Wt=T(400,240,function(R,X,Q){var tt=R.createLinearGradient(0,0,X,Q);tt.addColorStop(0,"#0f2c59"),tt.addColorStop(1,"#00498f"),R.fillStyle=tt,R.fillRect(0,0,X,Q),R.fillStyle="rgba(255,255,255,.9)",R.fillRect(24,24,120,12),R.fillStyle="rgba(255,255,255,.35)";for(var _=0;_<4;_++)R.fillRect(24,52+_*18,170-_*20,8);R.fillStyle="#10b981",R.fillRect(24,140,90,26),S&&R.drawImage(y,X-150,40,120,120)});b.push(Wt);function ce(){var R=new ze,X=new At(new ye(1.7,.05,.85,3,.015),[new oe({color:13215348,roughness:.6}),new oe({color:13215348,roughness:.6}),new oe({map:Gt,roughness:.5}),new oe({color:13215348,roughness:.6}),new oe({color:13215348,roughness:.6}),new oe({color:13215348,roughness:.6})]);X.position.y=.94,R.add(X),[-1,1].forEach(function(Et){var Ft=new At(new be(.06,.9,.06),Yt);Ft.position.set(Et*.7,.46,0),R.add(Ft);var zt=new At(new ye(.08,.04,.74,2,.015),Yt);zt.position.set(Et*.7,.02,0),R.add(zt)});var Q=new At(new be(1.4,.06,.05),Yt);Q.position.set(0,.86,-.2),R.add(Q);var tt=new At(new ye(.34,.02,.22,2,.008),yt);tt.position.set(.1,.975,-.18),R.add(tt);var _=new At(new be(.05,.36,.03),yt);_.position.set(.1,1.15,-.24),R.add(_);var A=new At(new ye(.95,.56,.04,2,.012),re);A.position.set(.1,1.42,-.2),R.add(A);var O=new At(new We(.89,.5),new an({map:Wt,toneMapped:!1}));O.position.set(.1,1.42,-.178),R.add(O);var U=new At(new ye(.46,.02,.15,2,.008),new oe({color:3093048,roughness:.5}));U.position.set(.05,.975,.18),R.add(U);var F=new At(new _i(.07,.055,.13,20),new oe({color:16053490,roughness:.4}));F.position.set(-.64,1.03,-.15),R.add(F);for(var ot=new oe({color:4165434,roughness:.6}),ct=0;ct<7;ct++){var ht=new At(new $i(.06,10,8),ot);ht.scale.set(.5,1.5,.25);var vt=ct/7*Math.PI*2;ht.position.set(-.64+Math.cos(vt)*.04,1.16+o(ct)*.04,-.15+Math.sin(vt)*.04),ht.rotation.set(Math.sin(vt)*.5,0,-Math.cos(vt)*.5),R.add(ht)}return R}y.onload=function(){S=!0,b.forEach(function(R){R.__draw()}),kn()},y.src=dh;var xe=new ti({color:12830928,metalness:.85,roughness:.34,clearcoat:.3,clearcoatRoughness:.4}),Ne=new oe({color:724242,roughness:.4,metalness:.2}),ee=new ze;d.add(ee);var de=3.3,N=2.25,_e=.1,Qt=new At(new ye(de,_e,N,4,.045),xe);Qt.position.y=_e/2,ee.add(Qt);var w=T(1024,360,function(R,X,Q){R.fillStyle="#9ea4ad",R.fillRect(0,0,X,Q);for(var tt=5,_=14,A=6,O=(X-A)/_,U=(Q-A)/tt,F=0;F<tt;F++)for(var ot=0;ot<_;ot++){var ct=O;if(F===4&&ot===5&&(ct=O*5),!(F===4&&ot>5&&ot<10)){var ht=A+ot*O,vt=A+F*U;R.fillStyle="#1d2026",R.beginPath(),R.roundRect(ht,vt,ct-A,U-A,8),R.fill(),R.fillStyle="rgba(255,255,255,.06)",R.fillRect(ht+4,vt+3,ct-A-8,2)}}}),m=new At(new We(2.75,.97),new oe({map:w,roughness:.6}));m.rotation.x=-Math.PI/2,m.position.set(0,_e+.002,-.35),ee.add(m);var z=new At(new We(1.1,.62),new ti({color:11844291,metalness:.6,roughness:.22,clearcoat:.6}));z.rotation.x=-Math.PI/2,z.position.set(0,_e+.002,.62),ee.add(z);var k=new ze;k.position.set(0,_e,-N/2+.03),k.rotation.x=-.22,ee.add(k);var q=2.15,lt=new At(new ye(de,q,.07,4,.03),xe);lt.position.set(0,q/2,-.035),k.add(lt);var dt=new At(new We(de-.1,q-.1),Ne);dt.position.set(0,q/2,.001),k.add(dt);var Z=new Os().load(uh,function(){kn()});Z.colorSpace=Ie,Z.anisotropy=f;var et=3,ft=1.78,bt=new At(new We(et,ft),new an({map:Z,toneMapped:!1,color:15000804}));bt.position.set(0,q/2+.03,.003),k.add(bt);var pt=new At(new We(et,ft),new an({map:T(256,256,function(R,X,Q){var tt=R.createLinearGradient(0,0,X,Q);tt.addColorStop(0,"rgba(255,255,255,.22)"),tt.addColorStop(.35,"rgba(255,255,255,.02)"),tt.addColorStop(.55,"rgba(255,255,255,0)"),tt.addColorStop(1,"rgba(255,255,255,.06)"),R.fillStyle=tt,R.fillRect(0,0,X,Q)}),transparent:!0,depthWrite:!1,toneMapped:!1}));pt.position.copy(bt.position),pt.position.z+=.002,k.add(pt);var mt=T(256,256,function(R,X,Q){var tt=R.createRadialGradient(X/2,Q/2,0,X/2,Q/2,X/2);tt.addColorStop(0,"rgba(200,240,255,1)"),tt.addColorStop(.35,"rgba(0,125,194,.7)"),tt.addColorStop(1,"rgba(0,125,194,0)"),R.fillStyle=tt,R.fillRect(0,0,X,Q)}),Ct=new an({map:mt,transparent:!0,depthWrite:!1,blending:is,toneMapped:!1,opacity:0}),Pt=new At(new We(2.4,2.4),Ct);Pt.position.copy(bt.position),Pt.position.z+=.01,k.add(Pt);var Bt=T(256,256,function(R,X,Q){R.strokeStyle="rgba(170,230,140,1)",R.lineWidth=7,R.beginPath(),R.arc(X/2,Q/2,X/2-10,0,Math.PI*2),R.stroke()}),D=[0,1].map(function(){var R=new At(new We(1,1),new an({map:Bt,transparent:!0,depthWrite:!1,blending:is,toneMapped:!1,opacity:0}));return R.position.copy(bt.position),R.position.z+=.012,k.add(R),R});ee.updateMatrixWorld(!0);var ut=bt.getWorldPosition(new H),j=new H(0,0,1).applyQuaternion(bt.getWorldQuaternion(new nn)).normalize(),gt=T(128,128,function(R,X,Q){var tt=R.createRadialGradient(X/2,Q/2,0,X/2,Q/2,X/2);tt.addColorStop(0,"rgba(10,20,40,.55)"),tt.addColorStop(.6,"rgba(10,20,40,.2)"),tt.addColorStop(1,"rgba(10,20,40,0)"),R.fillStyle=tt,R.fillRect(0,0,X,Q)});function xt(R,X,Q){var tt=new At(new We(R,X),new an({map:gt,transparent:!0,depthWrite:!1,opacity:Q}));return tt.rotation.x=-Math.PI/2,tt.position.y=.002,d.add(tt),tt}xt(de*1.35,N*1.5,.75).position.z=-.1;function rt(R,X){var Q=new ze;return R.position.y=-X/2,Q.add(R),Q.visible=!1,d.add(Q),Q.userData.h=X,Q}var It=[{make:ce,h:1.7,at:[3.05,0,-1],yaw:-.45,s:.95,y:0,t0:.35,sw:2.2,sd:1.4},{make:ge,h:1.45,at:[2.35,0,.35],yaw:-2.5,s:.9,y:0,t0:1.15,sw:1.3,sd:1.3},{make:J,h:x,at:[-2.75,0,.1],yaw:.3,s:1.05,y:0,t0:1.95,sw:1.8,sd:1.4},{make:J,h:x,at:[-2.73,0,.1],yaw:.26,s:1.05,y:x*1.05-.02,t0:2.6,sw:0,sd:0},{make:function(){return nt()},h:st,at:[-2.05,0,1.35],yaw:-.25,s:.8,y:0,t0:3.2,sw:1.2,sd:1.1}].map(function(R,X){return R.mesh=rt(R.make(),R.h),R.sh=R.sw?xt(R.sw*R.s,R.sd*R.s,0):null,R.sh&&(R.sh.position.set(R.at[0],.003+X*.001,R.at[2]),R.sh.rotation.z=R.yaw),R.spin=new H(o(X+1)*5-2.5,o(X+7)*5-2.5,o(X+3)*3-1.5),R.target=new H(R.at[0],R.y+R.h*R.s/2,R.at[2]),R}),wt=4.3,se=2.5,jt=2.3;function Ue(R){var X=[];return R.traverse(function(Q){if(Q.isMesh){var tt=Array.isArray(Q.material)?Q.material:[Q.material],_=tt.map(function(A){var O=A.clone();return O.transparent=!0,O.userData.base=A.opacity,X.push(O),O});Q.material=Array.isArray(Q.material)?_:_[0]}}),R.userData.fade=X,R}var ke=[{h:x,obj:rt(Ue(J()),x)},{h:st,obj:rt(Ue(nt()),st)},{h:1.45,obj:rt(Ue(ge()),1.45),s:.8},{h:st,obj:rt(Ue(nt()),st)}];ke.forEach(function(R){R.obj.renderOrder=2});var ds=new H,Si=new H,ci=new H,zn=new H,fs=new H,hi=new sn;function sr(R,X){var Q=(X-R.t0)/1.3;if(Q<=0)return R.mesh.visible=!1,R.sh&&(R.sh.material.opacity=0),0;R.mesh.visible=!0;var tt=s(Q,0,1),_=a(tt);zn.copy(ut).addScaledVector(j,-.55),Si.copy(ut).addScaledVector(j,2.4).add(ds.set(R.target.x*.2,.7,0)),ci.copy(R.target).add(ds.set(0,2.4,.6)),c(R.mesh.position,zn,Si,ci,R.target,_);var A=R.s*(.2+.8*r(s(tt/.45,0,1))),O=s((Q-1)/.45,0,1),U=Q>1?Math.sin(O*Math.PI*2)*(1-O)*.1:0;R.mesh.scale.set(A*(1+U*.6),A*(1-U),A*(1+U*.6)),Q>1&&(R.mesh.position.y=R.target.y-R.h*R.s*U/2);var F=1-_;return hi.set(R.spin.x*F,R.yaw+R.spin.y*F,R.spin.z*F),R.mesh.rotation.copy(hi),R.sh&&(R.sh.material.opacity=.7*s(1-(R.mesh.position.y-R.target.y)/3,0,1)*s(tt*1.5,0,1)),tt<1?1-Math.abs(tt-.15)/.15:0}function Rn(R,X,Q){var tt=(Q-wt-X*se)/jt;if(tt<0||tt>1)return-1;var _=X%2===0?-1:1,A=X*3.7,O=R.obj;O.visible=!0,zn.copy(ut).addScaledVector(j,-.55),Si.copy(ut).addScaledVector(j,1.9),fs.set(.5+_*(.2+o(A)*.3),2.1+o(A+1)*.3,5.4),ci.copy(fs).add(ds.set(_*.6,.6,-2.3));var U=a(tt);c(O.position,zn,Si,ci,fs,U),O.scale.setScalar((R.s||1)*(.2+1.05*r(s(tt/.6,0,1)))),hi.set(tt*(1.6+o(A+2))*_,tt*3*_+.4,tt*1.1),O.rotation.copy(hi);var F=1-s((tt-.72)/.22,0,1);return O.children[0].userData.fade.forEach(function(ot){ot.opacity=F*(ot.userData.base==null?1:ot.userData.base)}),tt<.3?1-Math.abs(tt-.12)/.12:0}var Vn={w:0,h:0};function rr(){var R=l.clientWidth,X=l.clientHeight;!R||!X||R===Vn.w&&X===Vn.h||(Vn.w=R,Vn.h=X,u.setPixelRatio(Math.min(window.devicePixelRatio||1,R<600?1.5:1.75)),u.setSize(R,X,!1),g.aspect=R/X,g.fov=R/X<1.3?36:30,g.updateProjectionMatrix())}var Ze={x:0,y:0,sx:0,sy:0};window.addEventListener("pointermove",function(R){if(n.matches){var X=i.getBoundingClientRect();Ze.x=s((R.clientX-(X.left+X.width/2))/X.width,-1,1),Ze.y=s((R.clientY-(X.top+X.height/2))/X.height,-1,1),kn()}},{passive:!0});var Cn=0,Hn=!1,In=null,bi=!1;function ps(R){Cn=0,In===null&&(In=R),rr();var X=e!==null?e:(R-In)/1e3;Ze.sx+=(Ze.x-Ze.sx)*.06,Ze.sy+=(Ze.y-Ze.sy)*.06,d.rotation.y=-.16+Ze.sx*.14,d.rotation.x=Ze.sy*.05,d.position.y=Math.sin(X*.9)*.03;var Q=g.aspect<1.3;g.position.set(.3,Q?3.3:3,Q?10.9:9.6),g.lookAt(0,.95,0);var tt=0;if(It.forEach(function(U){tt=Math.max(tt,sr(U,X))}),ke.forEach(function(U){U.obj.visible=!1}),X>wt)for(var _=Math.floor((X-wt)/se),A=Math.max(0,_-1);A<=_;A++){var O=Rn(ke[A%ke.length],A,X);O>-1&&(tt=Math.max(tt,O))}tt=s(tt,0,1),Ct.opacity=.12+tt*.85,Pt.scale.setScalar(.8+tt*.5),D.forEach(function(U,F){var ot=(X*.8+F*.5)%1;U.scale.setScalar(.3+ot*2.2),U.material.opacity=(1-ot)*(.25+tt*.6)}),u.render(h,g),Hn&&e===null&&(Cn=requestAnimationFrame(ps))}function kn(){Cn||(Cn=requestAnimationFrame(ps))}"IntersectionObserver"in window?new IntersectionObserver(function(R){Hn=R[0].isIntersecting,Hn&&!bi&&(bi=!0,In=null),Hn&&kn()},{rootMargin:"0px 0px -10% 0px"}).observe(i):(Hn=!0,bi=!0),window.addEventListener("resize",kn),kn()})();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
