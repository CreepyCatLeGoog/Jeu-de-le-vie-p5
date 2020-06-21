let rows;
let cols;
let grid;
let next;

function initialise() {
  grid = new Array(cols);
  next = new Array(cols);
  for(let x = 0; x < cols; x++) {
    grid[x] = new Array(rows);
    next[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      if (x == 0 || y == 0 || x == cols-1 || y == rows-1)
        grid[x][y] = 0;
      else
        grid[x][y] = floor(random(2));
      next[x][y] = 0;
    }
  }
}

function setup() {
  let wid = 10;
  
  frameRate(20);
  createCanvas(800, 600);
  cols = floor(width/wid);
  rows = floor(height/wid);
  initialise();
}

function ruleset(neighbors, x, y) {
  if (((grid[x][y] == 1) && (neighbors < 2)) || ((grid[x][y] == 1 ) && ( neighbors > 3)))
    next[x][y] = 0;
  else if ((grid[x][y] == 0) && (neighbors == 3))
    next[x][y] = 1;
  else
    next[x][y] = grid[x][y];
}

function generate() {
  let temp;
  let neighbors;
  
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 01; y < rows - 1; y++) {
      neighbors = 0;
      neighbors += grid[x+1][y] + grid[x-1][y] + grid[x][y+1] + grid[x][y-1];
      neighbors += grid[x+1][y+1] + grid[x+1][y-1] + grid[x-1][y+1] + grid[x-1][y-1];
      ruleset(neighbors, x, y);
    }
  }
  temp = grid;
  grid = next;
  next = temp;
}

function draw() {
  let wid = 10;
  
  background(0);
  generate();
  for (let x = 0; x < cols; x ++) {
    for (let y = 0; y < rows; y++) {
      rect(x * wid, y * wid,wid - 1 , wid - 1)
      if (grid[x][y] == 1)
        fill('rgb(0,255,0)');
      else
        fill(0);
    }
  }
}