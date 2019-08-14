import { RayCaster } from "./raycaster.js";
import { Player } from "./player.js";

class Engine {
    constructor() {
        this.stripes = []
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
        this.canv = document.createElement("canvas");
        this.canv.width = window.innerWidth;
        this.canv.height = window.innerHeight;
        this.canv.style.width = "100%";
        this.canv.style.imageRendering = "pixelated";
        this.canv.addEventListener("touchend", this.touchEnd);
        this.canv.addEventListener("touchmove", this.touchMove, { passive: false });
        this.canv.addEventListener("touchstart", this.touchStart, { passive: false });
        document.body.appendChild(this.canv);
        this.canv.onclick = () => {
            this.canv.requestPointerLock();
        }
        this.mouseLocked = false;
        this.ctx = this.canv.getContext("2d", { alpha: false });
        this.ctx.lineWidth = 1;
        this.player = new Player();
        this.rayCaster = new RayCaster();
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
                console.log('The pointer lock status is now locked');
                document.addEventListener("mousemove", this.updateRotation, false);
            } else {
                console.log('The pointer lock status is now unlocked');
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
    }
    update(tFrame) {
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
        for (let x = 0; x < this.canv.width; x += 1) {
            this.stripes[x] = this.rayCaster.CastRay(x, this.map, this.player, this.canv);
        }
        //this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
        this.ctx.fillStyle = "#777777";
        this.ctx.fillRect(0, 0, this.canv.width, this.canv.height / 2);
        this.ctx.fillStyle = "#bbbbbb";
        this.ctx.fillRect(0, this.canv.height / 2, this.canv.width, this.canv.height);
        for (let x = 0; x < this.canv.width; x += 1) {
            // for (let stripe of this.stripes) {
            this.ctx.strokeStyle = this.stripes[x].color;
            this.ctx.beginPath();
            this.ctx.moveTo(x + 0.5, this.stripes[x].start);
            this.ctx.lineTo(x + 0.5, this.stripes[x].end);
            this.ctx.stroke();
        }
    }

    // Eventhandlers

    updateRotation = (e) => {
        this.player.rot = e.movementX;
    }
    touchStart = (e) => {
        this.touched = true;
        this.oldTouchDX = e.touches[0].clientX;
        this.oldTouchDY = e.touches[0].clientY;
    }
    touchMove = (e) => {
        if (this.touched) {
            this.touchDX = (this.oldTouchDX - e.touches[0].clientX) * -0.1;
            this.touchDY = this.oldTouchDY - e.touches[0].clientY;
            if (this.touchDY != 0) {
                this.player.forward = true;
            }
        }
    }
    touchEnd = (e) => {
        this.touched = false;
        this.oldTouchDX = 0;
        this.oldTouchDY = 0;
        this.touchDX = 0;
        this.touchDY = 0;
        this.player.rot = 0;
        this.player.forward = false;
        this.player.backward = false;
    }
}

export { Engine };