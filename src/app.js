"use strict"

import { Engine } from "./modules/engine.js";

const game = new Engine();
const gameStep = function (timeStamp) {
    game.update(timeStamp);
    game.render();
    window.requestAnimationFrame(gameStep);
}

game.init().then(() => {
    window.requestAnimationFrame(gameStep);
    game.path.reverse();
    let pos = 1;
    let count = 0;
    let id = setInterval(() => {
        if (pos < game.path.length - 2) {
            //let x = lerp(game.path[pos].x, game.path[pos + 1].x, count);
            //let y = lerp(game.path[pos].y, game.path[pos + 1].y, count);
            let x = Math.pow((1 - count), 2) * game.path[pos].x + 2 * (1 - count) * count * game.path[pos + 1].x + Math.pow(count, 2) * game.path[pos + 2].x;
            let y = Math.pow((1 - count), 2) * game.path[pos].y + 2 * (1 - count) * count * game.path[pos + 1].y + Math.pow(count, 2) * game.path[pos + 2].y;
            game.player.posX = x + 0.5;
            game.player.posY = y + 0.5;
            count += 0.01;
            if (count >= 1) {
                count = 0;
                pos += 2;
            }
        }
        else clearInterval(id);
    }, 20)
});

function lerp(b, a, t) {
    return a * t + b * (1 - t);
}