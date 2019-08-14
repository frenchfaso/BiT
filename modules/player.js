class Player {
    constructor() {
        this.posX = 21;
        this.posY = 12;
        this.dirX = -1;
        this.dirY = 0;
        this.planeX = 0;
        this.planeY = 0.66;
        this.rot = 0;
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
        this.turn = false;
        this.collision = 15;
    }
}

export { Player };