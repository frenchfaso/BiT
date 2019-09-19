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
        this.wallLight = 1;
        this.floorLight = 1;
        this.pow = -2;
        this.lightMin;
        this.lightMax;
    }
    Map(n, start1, stop1, start2, stop2) {
        let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        return newval;
    };

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

            if (this.drawEnd < 0) this.drawEnd = height;

            this.wallLight = this.Map(Math.pow(this.drawEnd, this.pow), this.lightMin, this.lightMax, 0, 1);

            //draw the floor from drawEnd to the bottom of the screen
            for (let y = this.drawEnd; y < height; y++) {

                this.floorLight = this.Map(Math.pow(y, this.pow), this.lightMin, this.lightMax, 0, 1);

                this.currentDist = height / (2.0 * y - height);

                let weight = (this.currentDist - this.distPlayer) / (this.distWall - this.distPlayer);

                let currentFloorX = weight * this.floorXWall + (1.0 - weight) * player.posX;
                let currentFloorY = weight * this.floorYWall + (1.0 - weight) * player.posY;

                this.floorTexX = Math.floor(currentFloorX * texWidth) % texWidth;
                this.floorTexY = Math.floor(currentFloorY * texWidth) % texWidth;

                const i = (x + y * width) * 4;
                const i2 = (x + (height - y - 1) * width) * 4;
                const texI = (this.floorTexX + this.floorTexY * texWidth) * 4;

                //floor
                buffer[i] = Math.floor(textures[6].data[texI] * this.floorLight);
                buffer[i + 1] = Math.floor(textures[6].data[texI + 1] * this.floorLight);
                buffer[i + 2] = Math.floor(textures[6].data[texI + 2] * this.floorLight);
                buffer[i + 3] = 255;
                //ceiling (symmetrical!)
                buffer[i2] = Math.floor(textures[0].data[texI] * this.floorLight);
                buffer[i2 + 1] = Math.floor(textures[0].data[texI + 1] * this.floorLight);
                buffer[i2 + 2] = Math.floor(textures[0].data[texI + 2] * this.floorLight);
                buffer[i2 + 3] = 255;
            }

            // draw the walls
            for (let y = this.drawStart; y < this.drawEnd + 1; y++) {
                this.texY = Math.floor((y - height / 2 + this.lineHeight / 2) * texWidth / this.lineHeight);
                if (this.texY < 0) this.texY = 0;
                else if (this.texY > texWidth - 1) this.texY = texWidth - 1;
                const i = (x + y * width) * 4;
                const texI = (this.texX + this.texY * texWidth) * 4;

                if (this.side == 1) {
                    buffer[i] = Math.floor(textures[this.texNum].data[texI] * this.wallLight);
                    buffer[i + 1] = Math.floor(textures[this.texNum].data[texI + 1] * this.wallLight);
                    buffer[i + 2] = Math.floor(textures[this.texNum].data[texI + 2] * this.wallLight);
                    buffer[i + 3] = 255;
                }
                else {
                    buffer[i] = Math.floor(textures[this.texNum + 6].data[texI] * this.wallLight);
                    buffer[i + 1] = Math.floor(textures[this.texNum + 6].data[texI + 1] * this.wallLight);
                    buffer[i + 2] = Math.floor(textures[this.texNum + 6].data[texI + 2] * this.wallLight);
                    buffer[i + 3] = 255;
                }
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
let width;
let height;

let workerInit = function (e) {
    width = e.data.width;
    height = e.data.height;
    textures = e.data.textures;
    texSize = textures[0].width;
    threads = e.data.threads;
    map = e.data.map;
    rayCaster.lightMin = Math.pow(height / 2, rayCaster.pow);
    rayCaster.lightMax = Math.pow(height, rayCaster.pow);
    removeEventListener("message", workerInit);
    addEventListener("message", (e) => {
        byteArray = new Uint8ClampedArray(width * height * 4)
        rayCaster.CastRays(e.data.start, width, height, threads, map, e.data.player, textures, texSize, byteArray);
        postMessage(byteArray.buffer, [byteArray.buffer]);
    });
}
addEventListener("message", workerInit);