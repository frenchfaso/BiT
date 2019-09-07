class Map {
    constructor() {
        this.res = 3;
        this.path = [];
        this.data = [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 6, 4, 4, 6, 4, 6, 4, 4, 4, 6, 4],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [8, 0, 3, 3, 0, 0, 0, 0, 0, 8, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
            [8, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
            [8, 0, 3, 3, 0, 0, 0, 0, 0, 8, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 4, 0, 0, 0, 0, 0, 6, 6, 6, 0, 6, 4, 6],
            [8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 6, 0, 0, 0, 0, 0, 6],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 8, 0, 8, 0, 8, 0, 8, 4, 0, 4, 0, 6, 0, 6],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 8, 0, 8, 0, 8, 0, 8, 8, 6, 0, 0, 0, 0, 0, 6],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 0, 0, 0, 0, 0, 4],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 6, 0, 6, 0, 6, 0, 6],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 8, 0, 8, 0, 8, 0, 8, 8, 6, 4, 6, 0, 6, 6, 6],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 8, 8, 4, 0, 6, 8, 4, 8, 3, 3, 3, 0, 3, 3, 3],
            [2, 2, 2, 2, 0, 2, 2, 2, 2, 4, 6, 4, 0, 0, 6, 0, 6, 3, 0, 0, 0, 0, 0, 3],
            [2, 2, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 3],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 0, 0, 3],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 4, 6, 0, 6, 3, 3, 0, 0, 0, 3, 3],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 6, 6, 0, 0, 5, 0, 5, 0, 5],
            [2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 5, 0, 5, 0, 0, 0, 5, 5],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 5, 0, 5, 0, 5, 0, 5, 0, 5],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 5, 0, 5, 0, 5, 0, 5, 0, 5],
            [2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 5, 0, 5, 0, 0, 0, 5, 5],
            [2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        ];
    }

    getMap(w, h) {
        let maze = this.createMaze(w, h);
        // for (let d of maze) {
        //     console.log(...d);
        // }
        this.path = this.aStar(maze, {x:1, y:1}, {x:w-3, y:h-3});
        let m = [];
        for(let e of maze){
            m.push([...e]);
        }
        for(let n of this.path){
            m[n.x][n.y] = "#";
        }
        console.log("So..you like it the easy way, don't you?");
        for(let k of m){
            console.log(k.toString());
        }
        return maze;
    }
    createMaze(w, h) {
        let maze = [];
        for (let x = 0; x < w; x++) {
            maze[x] = [];
            for (let y = 0; y < h; y++) {
                maze[x][y] = 0;
                if (x == 1 | x == w - 1 | y == 1 | y == h - 1) maze[x][y] = 1;
            }
        }
        maze[1][2] = 5;
        maze[h - 1][w - 2] = 5;
        this.createVerticalWall(maze, 1, 1, w - 1, h - 1);

        for (let a of maze) {
            a.shift();
        }
        maze.shift();
        return maze;
    }

    createVerticalWall(maze, x1, y1, x2, y2) {
        let midX = (x1 + x2) / 2;
        if (midX % 2 == 0) midX += 1;
        let doors = (y2 - y1) / 2;
        let door = y1 - 1 + (Math.ceil(Math.random() * doors)) * 2;
        for (let i = y1 + 1; i < y2; i++) {
            if (i == door) {
                maze[midX][i] = 0;
            } else {
                maze[midX][i] = 1;
            }
        }
        if (midX - x1 > this.res) this.createHorizontalWall(maze, x1, y1, midX, y2);
        if (x2 - midX > this.res) this.createHorizontalWall(maze, midX, y1, x2, y2);
    }

    createHorizontalWall(maze, x1, y1, x2, y2) {
        let midY = (y1 + y2) / 2;
        if (midY % 2 == 0) midY -= 1;
        let doors = (x2 - x1) / 2;
        let door = x1 - 1 + (Math.ceil(Math.random() * doors)) * 2;
        for (let i = x1 + 1; i < x2; i++) {
            if (i == door) {
                maze[i][midY] = 0;
            } else {
                maze[i][midY] = 1;
            }
        }
        if (midY - y1 > this.res) this.createVerticalWall(maze, x1, y1, x2, midY);
        if (y2 - midY > this.res) this.createVerticalWall(maze, x1, midY, x2, y2);
    }

    aStar(maze, start, end) {
        Array.prototype.remove = function (item) {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] === item) {
                    this.splice(i, 1);
                }
            }
        }

        let openSet = [];
        let closedSet = [];
        let nodes = [];
        for (let x = 0; x < maze.length; x++) {
            for (let y = 0; y < maze[0].length; y++) {
                let n = {
                    x: x,
                    y: y,
                    wall: maze[x][y] != 0 ? true : false,
                    neighbours: [],
                    f: 0,
                    g: 0,
                    h: Math.sqrt(Math.pow(end.x - x, 2) + Math.pow(end.y - y, 2)),
                    start: (x == start.x && y == start.y) ? true : false,
                    end: (x == end.x && y == end.y) ? true : false
                };
                nodes.push(n);
            }
        }
        for (let n of nodes) {
            let left = n.x - 1;
            let right = n.x + 1;
            let up = n.y - 1;
            let down = n.y + 1;
            if (left >= 0) n.neighbours.push(nodes.find(e => (e.x == left && e.y == n.y)));
            if (right < maze.length - 1) n.neighbours.push(nodes.find(e => (e.x == right && e.y == n.y)));
            if (up >= 0) n.neighbours.push(nodes.find(e => (e.y == up && e.x == n.x)));
            if (down < maze[0].length - 1) n.neighbours.push(nodes.find(e => (e.y == down && e.x == n.x)));
        }
        openSet.push(nodes.find(e => e.start == true));

        while (openSet.length > 0) {
            let winner = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
            }

            let current = openSet[winner];

            if (current.end == true) {
                // get path
                let p = [];
                let temp = current;
                p.push(temp);
                while (temp.previous) {
                    p.push(temp.previous);
                    temp = temp.previous;
                }
                return p;
            }

            openSet.remove(current);
            closedSet.push(current);

            for (let n of current.neighbours) {
                if (!closedSet.find(e => e === n) && n.wall == false) {

                    let tempG = current.g + 1;

                    let newPath = false;
                    if (openSet.find(e => e === n)) {
                        if (tempG < n.g) {
                            n.g = tempG;
                            newPath = true;
                        }
                    } else {
                        n.g = tempG;
                        newPath = true;
                        openSet.push(n);
                    }
                    if (newPath == true) {
                        n.f = n.g + n.h;
                        n.previous = current;
                    }
                }
            }
        }
    }
}

export { Map };