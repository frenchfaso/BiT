import { RayCaster } from "./raycaster.js";
import { Player } from "./player.js";
import { Map } from "./map.js";

class Engine {
    constructor() {
        this.updateRotation = this.updateRotation.bind(this);

        this.rayCaster = new RayCaster();
        this.player = new Player();
        this.map = new Map().map;
        this.textures = [];
        this.textureAtlas = new Image();
        this.canv = document.createElement("canvas");
        this.canv.width = window.innerWidth;
        this.canv.height = window.innerHeight;
        this.canv.style.imageRendering = "pixelated";
        this.canv.addEventListener("touchend", (e) => {
            this.touched = false;
            this.oldTouchDX = 0;
            this.oldTouchDY = 0;
            this.touchDX = 0;
            this.touchDY = 0;
            this.player.rot = 0;
            this.player.forward = false;
            this.player.backward = false;
        });
        this.canv.addEventListener("touchmove", (e) => {
            if (this.touched) {
                this.touchDX = (this.oldTouchDX - e.touches[0].clientX) * -0.1;
                this.touchDY = this.oldTouchDY - e.touches[0].clientY;
                if (this.touchDY != 0) {
                    this.player.forward = true;
                }
            }
        }, { passive: false });
        this.canv.addEventListener("touchstart", (e) => {
            this.touched = true;
            this.oldTouchDX = e.touches[0].clientX;
            this.oldTouchDY = e.touches[0].clientY;
        }, { passive: false });
        document.body.appendChild(this.canv);
        this.canv.addEventListener("click", () => {
            this.canv.requestPointerLock();
        });
        this.mouseLocked = false;
        this.ctx = this.canv.getContext("2d", { alpha: false });
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;
        this.oldTime = 0;
        this.oldRot = 0;
        this.touched = false;
        this.oldTouchDX = 0;
        this.oldTouchDY = 0;
        this.touchDX = 0;
        this.touchDY = 0;
        this.movSpeed = 0;
        this.superSpeed = 1;
        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement == this.canv) {
                document.addEventListener("mousemove", this.updateRotation, false);
            } else {
                document.removeEventListener("mousemove", this.updateRotation, false);
            }
        }, false);
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 87:
                    this.player.forward = false;
                    break;
                case 83:
                    this.player.backward = false;
                    break;
                case 65:
                    this.player.left = false;
                    break;
                case 68:
                    this.player.right = false;
                    break;
                case 16:
                    this.superSpeed = 1;
                    break;
            }
        }, false);
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 87:
                    this.player.forward = true;
                    break;
                case 83:
                    this.player.backward = true;
                    break;
                case 65:
                    this.player.left = true;
                    break;
                case 68:
                    this.player.right = true;
                    break;
                case 16:
                    this.superSpeed = 2.5;
                    break;
            }
        }, false);
        const fullscreenButton = document.getElementById("fullscreen");
        fullscreenButton.addEventListener("click", (e) => {
            if (this.canv.requestFullscreen) {
                this.canv.requestFullscreen();
            }
        });
        window.addEventListener("resize", () => {
            this.canv.width = window.innerWidth;
            this.canv.height = window.innerHeight;
            this.ctx.imageSmoothingEnabled = false;
        });
    }
    async init() {
        return new Promise((resolve, reject) => {
            this.textureAtlas.addEventListener("load", async (e) => {
                for (let t = 0; t < 9; t++) {
                    const x = t % 3 * 64;
                    const y = Math.floor(t / 3) * 64;
                    this.textures[t] = await createImageBitmap(this.textureAtlas, x, y, 64, 64);
                }
                resolve();
            });
            this.textureAtlas.src = "./textures.webp";
        });
    }
    updateRotation(e) {
        this.player.rot = e.movementX;
    }
    update(tFrame) {
        // update player position
        const frameTime = (tFrame - this.oldTime) / 1000;
        this.movSpeed = frameTime * 3 * this.superSpeed;

        if (this.touched == true || this.player.rot != this.oldRot) {
            let rot = 0;
            if (this.touched) {
                rot = this.touchDX;
                this.movSpeed = this.touchDY / 1000;
            }
            else {
                rot = (this.oldRot + this.player.rot) / 2;
            }
            this.oldRot = this.player.rot;
            const rotSpeed = rot * frameTime * -0.1;
            const oldDirX = this.player.dirX;
            this.player.dirX = this.player.dirX * Math.cos(rotSpeed) - this.player.dirY * Math.sin(rotSpeed);
            this.player.dirY = oldDirX * Math.sin(rotSpeed) + this.player.dirY * Math.cos(rotSpeed);
            const oldPlaneX = this.player.planeX;
            this.player.planeX = this.player.planeX * Math.cos(rotSpeed) - this.player.planeY * Math.sin(rotSpeed);
            this.player.planeY = oldPlaneX * Math.sin(rotSpeed) + this.player.planeY * Math.cos(rotSpeed);
        }
        if (this.player.forward) {
            const x1 = Math.floor(this.player.posX + this.player.dirX * this.movSpeed * this.player.collision);
            const y1 = Math.floor(this.player.posY);
            if (this.map[x1][y1] == 0) this.player.posX += this.player.dirX * this.movSpeed;
            const x2 = Math.floor(this.player.posX);
            const y2 = Math.floor(this.player.posY + this.player.dirY * this.movSpeed * this.player.collision);
            if (this.map[x2][y2] == 0) this.player.posY += this.player.dirY * this.movSpeed;
        }
        if (this.player.right) {
            const dx = (this.player.dirX * Math.cos(Math.PI / 2) - this.player.dirY * Math.sin(Math.PI / 2)) * this.movSpeed;
            const x1 = Math.floor(this.player.posX - dx * this.player.collision);
            const y1 = Math.floor(this.player.posY);
            if (this.map[x1][y1] == 0) this.player.posX -= dx;
            const dy = (this.player.dirX * Math.sin(Math.PI / 2) + this.player.dirY * Math.cos(Math.PI / 2)) * this.movSpeed;
            const x2 = Math.floor(this.player.posX);
            const y2 = Math.floor(this.player.posY - dy * this.player.collision);
            if (this.map[x2][y2] == 0) this.player.posY -= dy;
        }
        if (this.player.left) {
            const dx = (this.player.dirX * Math.cos(-Math.PI / 2) - this.player.dirY * Math.sin(-Math.PI / 2)) * this.movSpeed;
            const x1 = Math.floor(this.player.posX - dx * this.player.collision);
            const y1 = Math.floor(this.player.posY);
            if (this.map[x1][y1] == 0) this.player.posX -= dx;
            const dy = (this.player.dirX * Math.sin(-Math.PI / 2) + this.player.dirY * Math.cos(-Math.PI / 2)) * this.movSpeed;
            const x2 = Math.floor(this.player.posX);
            const y2 = Math.floor(this.player.posY - dy * this.player.collision);
            if (this.map[x2][y2] == 0) this.player.posY -= dy;
        }
        if (this.player.backward) {
            const x1 = Math.floor(this.player.posX - this.player.dirX * this.movSpeed * this.player.collision);
            const y1 = Math.floor(this.player.posY);
            if (this.map[x1][y1] == 0) this.player.posX -= this.player.dirX * this.movSpeed;
            const x2 = Math.floor(this.player.posX);
            const y2 = Math.floor(this.player.posY - this.player.dirY * this.movSpeed * this.player.collision);
            if (this.map[x2][y2] == 0) this.player.posY -= this.player.dirY * this.movSpeed;
        }
        this.oldTime = tFrame;
    }
    render() {
        // draw floor and ceiling
        this.ctx.fillStyle = "#777777";
        this.ctx.fillRect(0, 0, this.canv.width, this.canv.height / 2);
        this.ctx.fillStyle = "#bbbbbb";
        this.ctx.fillRect(0, this.canv.height / 2, this.canv.width, this.canv.height);

        // draw textured walls
        for (let x = 0; x < this.canv.width; x += 1) {
            let stripe = this.rayCaster.CastRay(x, 64, this.map, this.player, this.canv);
            this.ctx.drawImage(this.textures[stripe.texNum], stripe.texX, 0, 1, 64, x, stripe.end, 1, stripe.start - stripe.end);
        }
    }
}

export { Engine };