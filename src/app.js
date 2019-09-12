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
});

const btnStart = document.querySelector("#btnStart");
btnStart.onclick = (e) => {
    const divStart = document.querySelector("#start");
    divStart.style.display = "none";
    game.playing = true;
    game.backAnimation();
    let sec = 60;
    let id = setInterval(() => {
        const timerSpan = document.querySelector("#timer-sec");
        if (sec > 0) {
            timerSpan.textContent = sec.toString();
            sec--;
        }
        else {
            clearInterval(id);
            const loose = document.querySelector("#loose");
            loose.style.display = "flex"
            document.exitPointerLock();
            game.playing = false;
        }
    }, 1000);

};
const btnRetry = document.querySelector("#btnRetry");
btnRetry.onclick = (e) => {
    location.reload();
};
const btnReload = document.querySelector("#btnReload");
btnReload.onclick = (e) => {
    location.reload();
};