'use strict';class b{constructor(){this.D;this.c;this.h;this.a;this.b;this.s;this.u;this.j;this.o;this.A;this.B;this.C;this.F;this.v;this.lineHeight;this.i;this.w}};class g{constructor(){this.f=11;this.g=5;this.l=-1;this.G=this.m=0;this.H=.66;this.b=0;this.i=this.h=this.c=this.a=!1}};class k{constructor(){this.data=[[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,7,7,7,7,7,7,7,7],[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,7],[4,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],[4,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],[4,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,7],[4,0,4,0,0,0,0,5,5,5,5,5,5,5,5,5,7,7,0,7,7,7,7,7],[4,0,5,0,0,0,0,5,0,5,0,5,0,5,0,5,7,0,0,0,7,7,7,1],[4,0,6,0,0,0,0,5,0,0,0,0,0,0,0,5,7,0,0,0,0,0,0,8],[4,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,1],[4,0,8,0,0,0,0,5,0,
0,0,0,0,0,0,5,7,0,0,0,0,0,0,8],[4,0,0,0,0,0,0,5,0,0,0,0,0,0,0,5,7,0,0,0,7,7,7,1],[4,0,0,0,0,0,0,5,5,5,5,0,5,5,5,5,7,7,7,7,7,7,7,1],[6,6,6,6,6,6,6,6,6,6,6,0,6,6,6,6,6,6,6,6,6,6,6,6],[8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],[6,6,6,6,6,6,0,6,6,6,6,0,6,6,6,6,6,6,6,6,6,6,6,6],[4,4,4,4,4,4,0,4,4,4,6,0,6,2,2,2,2,2,2,2,3,3,3,3],[4,0,0,0,0,0,0,0,0,4,6,0,6,2,0,0,0,0,0,2,0,0,0,2],[4,0,0,0,0,0,0,0,0,0,0,0,6,2,0,0,5,0,0,2,0,0,0,2],[4,0,0,0,0,0,0,0,0,4,6,0,6,2,0,0,0,0,0,2,2,0,2,2],[4,0,6,0,6,0,0,0,0,4,
6,0,0,0,0,0,5,0,0,0,0,0,0,2],[4,0,0,5,0,0,0,0,0,4,6,0,6,2,0,0,0,0,0,2,2,0,2,2],[4,0,6,0,6,0,0,0,0,4,6,0,6,2,0,0,5,0,0,2,0,0,0,2],[4,0,0,0,0,0,0,0,0,4,6,0,6,2,0,0,0,0,0,2,0,0,0,2],[4,4,4,4,4,4,4,4,4,4,1,1,1,2,2,2,2,2,2,3,3,3,3,3]]}get a(){return this.data}};class l{constructor(){this.u=this.u.bind(this);this.M=new b;this.a=new g;this.h=(new k).a;this.j=[];this.D=new Image;this.b=document.createElement("canvas");this.b.width=window.innerWidth;this.b.height=window.innerHeight;this.b.style.a="pixelated";this.b.addEventListener("touchend",()=>{this.o=!1;this.s=this.F=this.B=this.A=0;this.a.b=0;this.a.a=!1;this.a.c=!1});this.b.addEventListener("touchmove",d=>{this.o&&(this.F=-.1*(this.A-d.touches[0].clientX),this.s=this.B-d.touches[0].clientY,0!=this.s&&
(this.a.a=!0))},{passive:!1});this.b.addEventListener("touchstart",d=>{this.o=!0;this.A=d.touches[0].clientX;this.B=d.touches[0].clientY},{passive:!1});document.body.appendChild(this.b);this.b.addEventListener("click",()=>{this.b.requestPointerLock()});this.i=this.b.getContext("2d",{alpha:!1});this.i.imageSmoothingEnabled=!1;this.i.lineWidth=1;this.w=this.J=0;this.o=!1;this.c=this.s=this.F=this.B=this.A=0;this.C=1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement==this.b?
document.addEventListener("mousemove",this.u,!1):document.removeEventListener("mousemove",this.u,!1)},!1);document.addEventListener("keyup",d=>{switch(d.keyCode){case 87:this.a.a=!1;break;case 83:this.a.c=!1;break;case 65:this.a.h=!1;break;case 68:this.a.i=!1;break;case 16:this.C=1}},!1);document.addEventListener("keydown",d=>{switch(d.keyCode){case 87:this.a.a=!0;break;case 83:this.a.c=!0;break;case 65:this.a.h=!0;break;case 68:this.a.i=!0;break;case 16:this.C=2.5}},!1);document.getElementById("fullscreen").addEventListener("click",
()=>{this.b.requestFullscreen&&this.b.requestFullscreen()});window.addEventListener("resize",()=>{this.b.width=window.innerWidth;this.b.height=window.innerHeight;this.i.imageSmoothingEnabled=!1})}u(d){this.a.b=d.movementX}};const m=new l;
function n(d){var a=(d-m.J)/1E3;m.c=3*a*m.C;if(1==m.o||m.a.b!=m.w){if(m.o){var e=m.F;m.c=m.s/1E3}else e=(m.w+m.a.b)/2;m.w=m.a.b;a=e*a*-.1;e=m.a.l;m.a.l=m.a.l*Math.cos(a)-m.a.m*Math.sin(a);m.a.m=e*Math.sin(a)+m.a.m*Math.cos(a);e=m.a.G;m.a.G=m.a.G*Math.cos(a)-m.a.H*Math.sin(a);m.a.H=e*Math.sin(a)+m.a.H*Math.cos(a)}m.a.a&&(0==m.h[Math.floor(m.a.f+m.a.l*m.c*15)][Math.floor(m.a.g)]&&(m.a.f+=m.a.l*m.c),0==m.h[Math.floor(m.a.f)][Math.floor(m.a.g+m.a.m*m.c*15)]&&(m.a.g+=m.a.m*m.c));m.a.i&&(a=(m.a.l*Math.cos(Math.PI/
2)-m.a.m*Math.sin(Math.PI/2))*m.c,0==m.h[Math.floor(m.a.f-15*a)][Math.floor(m.a.g)]&&(m.a.f-=a),a=(m.a.l*Math.sin(Math.PI/2)+m.a.m*Math.cos(Math.PI/2))*m.c,0==m.h[Math.floor(m.a.f)][Math.floor(m.a.g-15*a)]&&(m.a.g-=a));m.a.h&&(a=(m.a.l*Math.cos(-Math.PI/2)-m.a.m*Math.sin(-Math.PI/2))*m.c,0==m.h[Math.floor(m.a.f-15*a)][Math.floor(m.a.g)]&&(m.a.f-=a),a=(m.a.l*Math.sin(-Math.PI/2)+m.a.m*Math.cos(-Math.PI/2))*m.c,0==m.h[Math.floor(m.a.f)][Math.floor(m.a.g-15*a)]&&(m.a.g-=a));m.a.c&&(0==m.h[Math.floor(m.a.f-
m.a.l*m.c*15)][Math.floor(m.a.g)]&&(m.a.f-=m.a.l*m.c),0==m.h[Math.floor(m.a.f)][Math.floor(m.a.g-m.a.m*m.c*15)]&&(m.a.g-=m.a.m*m.c));m.J=d;m.i.fillStyle="#777777";m.i.fillRect(0,0,m.b.width,m.b.height/2);m.i.fillStyle="#bbbbbb";m.i.fillRect(0,m.b.height/2,m.b.width,m.b.height);for(d=0;d<m.b.width;d+=2){a=m.M;var f=d,h=m.h;var c=m.a;e=m.b;a.F=0;a.D=2*f/e.width-1;a.c=c.l+c.G*a.D;a.h=c.m+c.H*a.D;a.a=Math.floor(c.f);a.b=Math.floor(c.g);a.s=Math.abs(1/a.c);a.u=Math.abs(1/a.h);0>a.c?(a.B=-1,a.j=(c.f-a.a)*
a.s):(a.B=1,a.j=(a.a+1-c.f)*a.s);0>a.h?(a.C=-1,a.o=(c.g-a.b)*a.u):(a.C=1,a.o=(a.b+1-c.g)*a.u);for(;0==a.F;)a.j<a.o?(a.j+=a.s,a.a+=a.B,a.v=0):(a.o+=a.u,a.b+=a.C,a.v=1),0<h[a.a][a.b]&&(a.F=1);a.A=0==a.v?(a.a-c.f+(1-a.B)/2)/a.c:(a.b-c.g+(1-a.C)/2)/a.h;a.lineHeight=Math.floor(e.height/a.A);a.i=Math.floor(-a.lineHeight/2+e.height/2);0>a.i&&(a.i=0);a.w=Math.floor(a.lineHeight/2+e.height/2);a.w>=e.height&&(a.w=e.height-1);f=h[a.a][a.b]-1;c=0==a.v?c.g+a.A*a.h:c.f+a.A*a.c;c-=Math.floor(c);c=Math.floor(64*
c);0==a.v&&0<a.c&&(c=64-c-1);1==a.v&&0>a.h&&(c=64-c-1);a={K:f,L:c,I:64*(256*a.i-128*e.height+128*a.lineHeight)/a.lineHeight/256,start:a.i,end:a.w,v:a.v};1==a.v?m.i.drawImage(m.j[a.K],a.L,a.I,1,64-2*a.I,d,a.end,2,a.start-a.end):m.i.drawImage(m.j[a.K+9],a.L,a.I,1,64-2*a.I,d,a.end,2,a.start-a.end)}window.requestAnimationFrame(n)}
(async function(){return new Promise(d=>{m.D.addEventListener("load",async()=>{const a=document.createElement("canvas");a.width=64;a.height=64;const e=a.getContext("2d");for(let f=0;9>f;f++)m.j[f]=await createImageBitmap(m.D,f%3*64,64*Math.floor(f/3),64,64),e.drawImage(m.j[f],0,0,m.j[f].width,m.j[f].height),e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(0,0,a.width,a.height),m.j[f+9]=await createImageBitmap(a);d()});m.D.src="./textures.webp"})})().then(()=>{window.requestAnimationFrame(n)});
