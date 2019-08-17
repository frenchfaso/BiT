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
        this.color;
    }
    CastRay(x, texWidth, map, player, canv) {
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

        // switch (map[this.mapX][this.mapY]) {
        //     case 1:
        //         if (this.side == 0) this.color = "#880000";
        //         else this.color = "#FF7777";
        //         break;
        //     case 2:
        //         if (this.side == 0) this.color = "#0000AA";
        //         else this.color = "#0088FF";
        //         break;
        //     case 3:
        //         if (this.side == 0) this.color = "#00CC55";
        //         else this.color = "#AAFF66";
        //         break;
        //     case 4:
        //         if (this.side == 0) this.color = "#664400";
        //         else this.color = "#DD8855";
        //         break;
        //     case 5:
        //         if (this.side == 0) this.color = "#333333";
        //         else this.color = "#000000";
        //         break;
        //     default:
        //         if (this.side == 0) this.color = "#CC44CC";
        //         else this.color = "rgb(202, 120, 202)";
        //         break;
        // }

        //texturing calculations
        const texNum = map[this.mapX][this.mapY] - 1;
        let wallX;
        if (this.side == 0) {
            wallX = player.posY + this.perpWallDist * this.rayDirY;
        }
        else {
            wallX = player.posX + this.perpWallDist * this.rayDirX;
        }
        wallX -= Math.floor(wallX);
        let texX = Math.floor(wallX * texWidth);
        if (this.side == 0 && this.rayDirX > 0) texX = texWidth - texX - 1;
        if (this.side == 1 && this.rayDirY < 0) texX = texWidth - texX - 1;
        return {
            texNum: texNum,
            texX: texX,
            start: this.drawStart,
            end: this.drawEnd,
            color: this.color
        }
    }
}

export { RayCaster };