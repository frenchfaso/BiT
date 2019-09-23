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
        this.pow = -4;
        this.lightMin;
        this.lightMax;
    }
    Map(n, start1, stop1, start2, stop2) {
        let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        return newval;
    };

    CastRays(start, width, height, map, player, buffer) {
        for (let x = start; x < width; x++) {
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
            this.drawEnd = Math.floor(this.lineHeight / 2 + height / 2);
            let ds = this.drawStart;
            let de = this.drawEnd;
            if (this.drawStart < 0) this.drawStart = 0;
            if (this.drawEnd >= height) this.drawEnd = height - 1;
            // if (this.drawEnd < 0) this.drawEnd = height;

            this.wallLight = this.Map(Math.pow(this.drawEnd, this.pow), this.lightMin, this.lightMax, 0, 255);

            //draw the floor from drawEnd to the bottom of the screen
            for (let y = this.drawEnd; y < height; y++) {
                this.floorLight = this.Map(Math.pow(y, this.pow), this.lightMin, this.lightMax, 0, 255);
                const i = (x + y * width) * 4;
                const i2 = (x + (height - y - 1) * width) * 4;
                //floor
                buffer[i] =     this.floorLight;
                buffer[i + 1] = this.floorLight;
                buffer[i + 2] = this.floorLight;
                buffer[i + 3] = 255;
                //ceiling (symmetrical!)
                buffer[i2] =     this.floorLight;
                buffer[i2 + 1] = this.floorLight;
                buffer[i2 + 2] = this.floorLight;
                buffer[i2 + 3] = 255;
            }

            // draw the walls
            for (let y = this.drawStart; y < this.drawEnd + 1; y++) {
                const n = Math.cos(Math.pow(this.Map(y, ds, de, -0.99, 0.99), 4));
                // n = Math.cos(Math.pow(n, 8));
                const i = (x + y * width) * 4;
                if (this.side == 1) {
                    buffer[i] =     n * this.wallLight;
                    buffer[i + 1] = n * this.wallLight;
                    buffer[i + 2] = n * this.wallLight;
                    buffer[i + 3] = 255;
                }
                else {
                    buffer[i] =     0.85 * n * this.wallLight;
                    buffer[i + 1] = 0.85 * n * this.wallLight;
                    buffer[i + 2] = 0.85 * n * this.wallLight;
                    buffer[i + 3] = 255;
                }
            }
        }
    }
}

const rayCaster = new RayCaster();
let byteArray;
let map = [];
let threads = 0;
let width;
let height;

let workerInit = function (e) {
    width = e.data.width;
    height = e.data.height;
    map = e.data.map;
    rayCaster.lightMin = Math.pow(height / 2, rayCaster.pow);
    rayCaster.lightMax = Math.pow(height, rayCaster.pow);
    removeEventListener("message", workerInit);
    addEventListener("message", (e) => {
        byteArray = new Uint8ClampedArray(width * height * 4)
        rayCaster.CastRays(e.data.start, width, height, map, e.data.player, byteArray);
        postMessage(byteArray.buffer, [byteArray.buffer]);
    });
}
addEventListener("message", workerInit);