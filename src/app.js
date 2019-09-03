import { Engine } from "./modules/engine.js";

const game = new Engine();
const gameStep = function (timeStamp) {
    game.update(timeStamp);
    game.render();
    window.requestAnimationFrame(gameStep);
}

game.init().then(() => {
    window.requestAnimationFrame(gameStep);
});