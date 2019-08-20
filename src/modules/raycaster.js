class RayCaster {
    constructor() {
        this.cameraX
        this.rayDirX
        this.rayDirY
        this.mapX
        this.mapY
        this.deltaDistX
        this.deltaDistY
        this.sideDistX;
        this.sideDistY;
        this.perpWallDist;
        this.stepX;
        this.stepY;
        this.hit;
        this.side;
        this.lineHeight;
        this.drawStart;
        this.drawEnd;
        this.texX = 0;
        this.texY = 0;
        this.texNum = 0;
        this.wallX = 0;
    }
    CastRays(start, end, texWidth, map, player, canv, textures, buffer) {
        for (let x = start; x < end; x++) {
            this.hit = 0;
            //calculate ray position and direction
            this.cameraX = 2 * x / canv.width - 1; //x-coordinate in camera space
            this.rayDirX = player.dirX + player.planeX * this.cameraX;
            this.rayDirY = player.dirY + player.planeY * this.cameraX;

            //which box of the map we're in
            this.mapX = Math.floor(player.posX);
            this.mapY = Math.floor(player.posY);

            //length of ray from one x or y-side to next x or y-side
            this.deltaDistX = Math.abs(1 / this.rayDirX);
            this.deltaDistY = Math.abs(1 / this.rayDirY);

            if (this.rayDirX < 0) {
                this.stepX = -1;
                this.sideDistX = (player.posX - this.mapX) * this.deltaDistX;
            }
            else {
                this.stepX = 1;
                this.sideDistX = (this.mapX + 1 - player.posX) * this.deltaDistX;
            }
            if (this.rayDirY < 0) {
                this.stepY = -1;
                this.sideDistY = (player.posY - this.mapY) * this.deltaDistY;
            }
            else {
                this.stepY = 1;
                this.sideDistY = (this.mapY + 1 - player.posY) * this.deltaDistY;
            }

            //perform DDA
            while (this.hit == 0) {
                if (this.sideDistX < this.sideDistY) {
                    this.sideDistX += this.deltaDistX;
                    this.mapX += this.stepX;
                    this.side = 0;
                }
                else {
                    this.sideDistY += this.deltaDistY;
                    this.mapY += this.stepY;
                    this.side = 1;
                }
                if (map[this.mapX][this.mapY] > 0) this.hit = 1;
            }

            if (this.side == 0) {
                this.perpWallDist = (this.mapX - player.posX + (1 - this.stepX) / 2) / this.rayDirX;
            }
            else {
                this.perpWallDist = (this.mapY - player.posY + (1 - this.stepY) / 2) / this.rayDirY;
            }

            //Calculate height of line to draw on screen
            this.lineHeight = Math.floor(canv.height / this.perpWallDist);

            //calculate lowest and highest pixel to fill in current stripe
            this.drawStart = Math.floor(-this.lineHeight / 2 + canv.height / 2);
            if (this.drawStart < 0) this.drawStart = 0;
            this.drawEnd = Math.floor(this.lineHeight / 2 + canv.height / 2);
            if (this.drawEnd >= canv.height) this.drawEnd = canv.height - 1;

            //texturing calculations
            this.texNum = map[this.mapX][this.mapY] - 1;
            if (this.side == 0) {
                this.wallX = player.posY + this.perpWallDist * this.rayDirY;
            }
            else {
                this.wallX = player.posX + this.perpWallDist * this.rayDirX;
            }
            this.wallX -= Math.floor(this.wallX);
            this.texX = Math.floor(this.wallX * texWidth);
            if (this.side == 0 && this.rayDirX > 0) this.texX = texWidth - this.texX - 1;
            if (this.side == 1 && this.rayDirY < 0) this.texX = texWidth - this.texX - 1;

            for (let y = this.drawStart + 1; y < this.drawEnd; y++) {
                this.texY = Math.floor((y * 256 - canv.height * 128 + this.lineHeight * 128) * texWidth / this.lineHeight / 256);

                const i = (x + y * canv.width) * 4;
                const texI = (this.texX + this.texY * texWidth) * 4;
                if (this.side == 1) {
                    buffer[i] = textures[this.texNum].data[texI];
                    buffer[i + 1] = textures[this.texNum].data[texI + 1];
                    buffer[i + 2] = textures[this.texNum].data[texI + 2];
                    buffer[i + 3] = 255;
                }
                else {
                    buffer[i] = textures[this.texNum + 9].data[texI];
                    buffer[i + 1] = textures[this.texNum + 9].data[texI + 1];
                    buffer[i + 2] = textures[this.texNum + 9].data[texI + 2];
                    buffer[i + 3] = 255;
                }
            }
        }
    }
}

export { RayCaster };
// rayCaster = new RayCaster();