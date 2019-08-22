'use strict';class RayCaster{constructor(){this.cameraX;this.rayDirX;this.rayDirY;this.mapX;this.mapY;this.deltaDistX;this.deltaDistY;this.sideDistX;this.sideDistY;this.perpWallDist;this.stepX;this.stepY;this.hit;this.side;this.lineHeight;this.drawStart;this.drawEnd;this.wallX=this.texNum=this.texY=this.texX=0}CastRays(b,h,l,e,n,m,a,f,k,c){for(;b<h;b+=n){this.hit=0;this.cameraX=2*b/l-1;this.rayDirX=a.dirX+a.planeX*this.cameraX;this.rayDirY=a.dirY+a.planeY*this.cameraX;this.mapX=Math.floor(a.posX);
this.mapY=Math.floor(a.posY);this.deltaDistX=Math.abs(1/this.rayDirX);this.deltaDistY=Math.abs(1/this.rayDirY);0>this.rayDirX?(this.stepX=-1,this.sideDistX=(a.posX-this.mapX)*this.deltaDistX):(this.stepX=1,this.sideDistX=(this.mapX+1-a.posX)*this.deltaDistX);0>this.rayDirY?(this.stepY=-1,this.sideDistY=(a.posY-this.mapY)*this.deltaDistY):(this.stepY=1,this.sideDistY=(this.mapY+1-a.posY)*this.deltaDistY);for(;0==this.hit;)this.sideDistX<this.sideDistY?(this.sideDistX+=this.deltaDistX,this.mapX+=this.stepX,
this.side=0):(this.sideDistY+=this.deltaDistY,this.mapY+=this.stepY,this.side=1),0<m[this.mapX][this.mapY]&&(this.hit=1);this.perpWallDist=0==this.side?(this.mapX-a.posX+(1-this.stepX)/2)/this.rayDirX:(this.mapY-a.posY+(1-this.stepY)/2)/this.rayDirY;this.lineHeight=Math.floor(e/this.perpWallDist);this.drawStart=Math.floor(-this.lineHeight/2+e/2);0>this.drawStart&&(this.drawStart=0);this.drawEnd=Math.floor(this.lineHeight/2+e/2);this.drawEnd>=e&&(this.drawEnd=e-1);this.texNum=m[this.mapX][this.mapY]-
1;this.wallX=0==this.side?a.posY+this.perpWallDist*this.rayDirY:a.posX+this.perpWallDist*this.rayDirX;this.wallX-=Math.floor(this.wallX);this.texX=Math.floor(this.wallX*k);0==this.side&&0<this.rayDirX&&(this.texX=k-this.texX-1);1==this.side&&0>this.rayDirY&&(this.texX=k-this.texX-1);for(let a=this.drawStart+1;a<this.drawEnd;a++){this.texY=Math.floor((256*a-128*e+128*this.lineHeight)*k/this.lineHeight/256);const d=4*(b+a*l),g=4*(this.texX+this.texY*k);1==this.side?(c[d]=f[this.texNum].data[g],c[d+
1]=f[this.texNum].data[g+1],c[d+2]=f[this.texNum].data[g+2]):(c[d]=f[this.texNum+9].data[g],c[d+1]=f[this.texNum+9].data[g+1],c[d+2]=f[this.texNum+9].data[g+2]);c[d+3]=255}}}}const rayCaster=new RayCaster;this.onmessage=b=>{b=b.data;let h=new Uint8ClampedArray(b.width*b.height*4);rayCaster.CastRays(b.start,b.end,b.width,b.height,b.threads,b.map,b.player,b.textures,b.texWidth,h);postMessage(h.buffer,[h.buffer])};
