importScripts("raycaster.js");

let stripes = [];

onmessage = (e) => {
    for (let x = e.data.start; x < e.data.end; x++) {
        const stripe = rayCaster.CastRay(x, e.data.texWidth, e.data.map, e.data.player, e.data.canv);
        stripes.push(stripe);
    }
    postMessage(stripes);
    stripes = [];
    // console.log(e.data)
}