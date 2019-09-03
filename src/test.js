let s = 20;
let maxX = 16;
let maxY = 16;
// let maze = createMaze(maxX, maxY);
let m;

function setup() {
  createCanvas(420, 420);
  noStroke();
  let maze = createMaze(maxX, maxY);
  m = maze;
  createVerticalWall(maze, 1, 1, maxX - 1, maxY - 1);
}

function draw() {
  background(220);
  drawMaze();
}

function drawMaze() {
  for (let x = 0; x < m.length; x++) {
    for (let y = 0; y < m[x].length; y++) {
      if (m[x][y] == 0) fill("white");
      else fill("red");
      rect(x * s, y * s, s, s);
    }
  }
}

function createMaze(w, h) {
  let maze = [];
  for (let x = 0; x < w; x++) {
    maze[x] = [];
    for (let y = 0; y < h; y++) {
      maze[x][y] = 0;
      if (x == 0 | x == w - 1 | y == 0 | y == h - 1) maze[x][y] = 1;
    }
  }
  maze[1][0] = 0;
  maze[maxX-2][maxY-1] = 0;
  return maze
}

function createVerticalWall(maze, x1, y1, x2, y2) {
  let midX = (x1 + x2) / 2;
  if (midX % 2 == 0) midX += 1;
  let doors = (y2 - y1) / 2;
  let door = y1 - 1 + (Math.ceil(Math.random() * doors)) * 2;
  for (let i = y1; i < y2; i++) {
    if (i == door) {
      maze[midX][i] = 0;
    } else {
      maze[midX][i] = 1;
    }
  }
  if (midX - x1 > 3) createHorizontalWall(maze, x1, y1, midX, y2);
  if (x2 - midX > 3) createHorizontalWall(maze, midX, y1, x2, y2);
}

function createHorizontalWall(maze, x1, y1, x2, y2) {
  let midY = (y1 + y2) / 2;
  if (midY % 2 == 0) midY -= 1;
  let doors = (x2 - x1) / 2;
  let door = x1 - 1 + (Math.ceil(Math.random() * doors)) * 2;
  for (let i = x1; i < x2; i++) {
    if (i == door) {
      maze[i][midY] = 0;
    } else {
      maze[i][midY] = 1;
    }
  }
  if (midY - y1 > 3) createVerticalWall(maze, x1, y1, x2, midY);
  if (y2 - midY > 3) createVerticalWall(maze, x1, midY, x2, y2);
}