importScripts("raycaster.js");

onmessage = (e) => {
    const data = e.data;
    let buffer = new Uint8ClampedArray(data.canv.width * data.canv.height * 4)
    rayCaster.CastRays(data.start, data.end, data.texWidth, data.map, data.player, data.canv, data.textures, buffer);
    postMessage(buffer.buffer, [buffer.buffer]);
}