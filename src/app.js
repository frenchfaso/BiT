import { Engine } from "./modules/engine.js";

// (function () {
//     Engine.setup();
//     let main = function (tFrame) {
//         Engine.stopLoop = window.requestAnimationFrame(main);
//         Engine.update(tFrame);
//         Engine.render();
//     };
//     main();
// })();
// window.cancelAnimationFrame(Engine.stopLoop)

const game = new Engine();
const gameStep = function (timeStamp) {
    game.update(timeStamp);
    game.render();
    window.requestAnimationFrame(gameStep);
}
game.init().then(() => {    
    window.requestAnimationFrame(gameStep);
});
