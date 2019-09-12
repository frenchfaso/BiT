# BiT
BiT (Back in Time) - a compact multithreaded (webworkers) raycasting recursive maze generator/game developed for JS13k 2019  

![BiT screenshot](/screenshots/BiT_highres.jpg?raw=true)  

The raycasting engine is inspired by the excelent [Lode's raycaster tutorial series](https://lodev.org/cgtutor/raycasting.html), adapted to work on the web platform.  
It uses webworkers to share the work on multiple cores:  
the main thread manages the gameloop (input, gamelogic) and orchestrates 2 webworkers that render each 1 partial frame, and fuses them on the "frontbuffer" when ready (the number of threads is a variable, so you can play BiT @ 4K and 64 threads on an AMD Threadripper :-D this should work...).  

The recursive maze generator algorithm is inspired by [this](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method) wikipedia page  

The A* (A-star) pathfinding algorithm is inspired by [Daniel Shiffman's P5.js version](https://www.youtube.com/watch?v=aKYlikFAV4k).  
Btw, If you don't know Dan, check his youtube channel, lots of lovely creative programming tutorials/coding challenges.  

The textures are from the ["Metal textures collection" from "Rubberduck"](https://opengameart.org/content/40-free-metal-textures-from-mtc-sets) on OpenGameArt.  

It was a lot of fun working on this project, I always wanted to learn about raycasting, I fell in love with computers and 3D graphics the first time I saw and played [Wolfenstein 3D](https://en.wikipedia.org/wiki/Wolfenstein_3D). Thanks John!.
