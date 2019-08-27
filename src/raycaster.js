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
        this.floorXWall = 0.0;
        this.floorYWall = 0.0;
        this.distWall;
        this.distPlayer;
        this.currentDist;
        this.floorTexX = 0;
        this.floorTexY = 0;
    }

    CastRays(start, width, height, threads, map, player, textures, texWidth, buffer) {
        for (let x = start; x < width; x += threads) {
            this.hit = 0;
            //calculate ray position and direction
            this.cameraX = 2 * x / width - 1; //x-coordinate in camera space
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
            this.lineHeight = Math.floor(height / this.perpWallDist);

            //calculate lowest and highest pixel to fill in current stripe
            this.drawStart = Math.floor(-this.lineHeight / 2 + height / 2);
            if (this.drawStart < 0) this.drawStart = 0;
            this.drawEnd = Math.floor(this.lineHeight / 2 + height / 2);
            if (this.drawEnd >= height) this.drawEnd = height - 1;

            //texturing calculations
            this.texNum = map[this.mapX][this.mapY];
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
                this.texY = Math.floor((y * 256 - height * 128 + this.lineHeight * 128) * texWidth / this.lineHeight / 256);
                const i = (x + y * width) * 4;
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

            //FLOOR CASTING
            //4 different wall directions possible
            if (this.side == 0 && this.rayDirX > 0) {
                this.floorXWall = this.mapX;
                this.floorYWall = this.mapY + this.wallX;
            }
            else if (this.side == 0 && this.rayDirX < 0) {
                this.floorXWall = this.mapX + 1.0;
                this.floorYWall = this.mapY + this.wallX;
            }
            else if (this.side == 1 && this.rayDirY > 0) {
                this.floorXWall = this.mapX + this.wallX;
                this.floorYWall = this.mapY;
            }
            else {
                this.floorXWall = this.mapX + this.wallX;
                this.floorYWall = this.mapY + 1.0;
            }

            this.distWall = this.perpWallDist;
            this.distPlayer = 0.0;

            if (this.drawEnd < 0) this.drawEnd = height; //becomes < 0 when the integer overflows

            //draw the floor from drawEnd to the bottom of the screen
            for (let y = this.drawEnd; y < height + 1; y++) {
                this.currentDist = height / (2.0 * y - height); //you could make a small lookup table for this instead

                let weight = (this.currentDist - this.distPlayer) / (this.distWall - this.distPlayer);

                let currentFloorX = weight * this.floorXWall + (1.0 - weight) * player.posX;
                let currentFloorY = weight * this.floorYWall + (1.0 - weight) * player.posY;


                this.floorTexX = Math.floor(currentFloorX * texWidth) % texWidth;
                this.floorTexY = Math.floor(currentFloorY * texWidth) % texWidth;
                const i = (x + y * width) * 4;
                const i2 = (x + (height - y) * width) * 4;
                const texI = (this.floorTexX + this.floorTexY * texWidth) * 4;

                //floor
                buffer[i2] = textures[7].data[texI];
                buffer[i2 + 1] = textures[7].data[texI + 1];
                buffer[i2 + 2] = textures[7].data[texI + 2];
                buffer[i2 + 3] = 255;
                //ceiling (symmetrical!)
                buffer[i] = textures[16].data[texI];
                buffer[i + 1] = textures[16].data[texI + 1];
                buffer[i + 2] = textures[16].data[texI + 2];
                buffer[i + 3] = 255;
            }
        }
    }
}

const rayCaster = new RayCaster();
let byteArray;
let textures = [];
let texSize = 0;
let map = [];
let threads = 0;

let workerInit = function (e) {
    textures = e.data.textures;
    texSize = textures[0].width;
    threads = e.data.threads;
    map = e.data.map;
    removeEventListener("message", workerInit);
    addEventListener("message", (e) => {
        byteArray = new Uint8ClampedArray(e.data.width * e.data.height * 4)
        rayCaster.CastRays(e.data.start, e.data.width, e.data.height, threads, map, e.data.player, textures, texSize, byteArray);
        postMessage(byteArray.buffer, [byteArray.buffer]);
    });
}
addEventListener("message", workerInit);