# BiT
BiT (Back in Time) - a compact multithreaded raycasting recursive maze generator/game developed for [JS13k 2019](https://js13kgames.com/entries/2019)  

![BiT screenshot](/screenshots/BiT_highres.jpg?raw=true)  

[Play BiT](https://js13kgames.com/entries/bit-back-in-time)

# Updates since JS13k
* moved to deferred rendering (2 passes + final mixing)
* added simple lighting based on distance and wall angle
* added super simple/fake ambient occlusion

![Deferred rendering screenshot](/screenshots/BiT_deferred.jpg)

This raycasting engine is inspired by the excellent [Lode's raycaster tutorial series](https://lodev.org/cgtutor/raycasting.html), and has been adapted to work on the web platform.  
It uses webworkers to spread the work on multiple cores:  
the main thread manages the gameloop (input, gamelogic), orchestrates 2 webworkers (each rendering 1 partial frame) and fuses them on the "frontbuffer" when ready. The number of threads is a variable, so you can play BiT @ 4K and 64 threads on an AMD Threadripper ( :-D this should work...).  

The recursive maze generator algorithm is inspired by [this](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method) wikipedia page  

The A* (A-star) pathfinding algorithm is inspired by [Daniel Shiffman's P5.js version](https://www.youtube.com/watch?v=aKYlikFAV4k).  
Btw, If you don't know Dan, check out his youtube channel: it’s packed with lots of lovely creative programming tutorials and coding challenges.  

The textures are from OpenGameArt: ["Metal textures collection" from "Rubberduck"](https://opengameart.org/content/40-free-metal-textures-from-mtc-sets).  

It was a lot of fun working on this project. I always wanted to learn about raycasting: I fell in love with computers and 3D graphics the first time I saw and played [Wolfenstein 3D](https://en.wikipedia.org/wiki/Wolfenstein_3D) with my buddy [Toni](https://github.com/zgypa). Thanks John!.
