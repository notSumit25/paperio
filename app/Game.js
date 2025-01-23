"use client";

export class Game{
   
    direction;
    context;
    head;
    gameOver;
    canvasWidth;
    canvasHeight;
    trail;
    grid;
    color;
    cursorX;
    cursorY;

    Game(context,canvasHeight,canvasWidth,color)
    {
       this.color=color;
       this.context=context;
       this.canvasWidth=canvasWidth;
       this.canvasHeight=canvasHeight;
       this.head = { x: this.canvasWidth / 2, y: this.canvasHeight / 2 }; 
       this.direction = this.getDirectionFromCursor(this.head.x, this.head.y);
       this.trail = [];
       for (let x = 0; x < this.canvasWidth; x++) {
        this.grid[x] = [];
        for (let y = 0; y < this.canvasHeight; y++) {
          this.grid[x][y] = -1; 
        }
      }
      this.gameOver = false;
      this.initColourinGrid();
      this.fillGrid();
       document.addEventListener("mousemove", (event) => {
        this.cursorX = event.clientX;
        this.cursorY = event.clientY;
        this.direction = this.getDirectionFromCursor(this.cursorX, this.cursorY);
    });
    }

    getDirectionFromCursor(cursorX, cursorY) {
        const deltaX = cursorX - this.head.x;
        const deltaY = cursorY - this.head.y;
        const angleRadians = Math.atan2(deltaY, deltaX);
        return {
          x: Math.cos(angleRadians),
          y: Math.sin(angleRadians)
        };
    }

    initColourinGrid()
    {
        const radius = 5; 
        const centerX = Math.floor(this.canvasWidth / 2);
        const centerY = Math.floor(this.canvasHeight / 2);
    
        for (let x = centerX - radius; x <= centerX + radius; x++) {
          for (let y = centerY - radius; y <= centerY + radius; y++) {
            if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)) {
              this.grid[x][y] = 1; 
            }
          }
        }
    }

    draw() {
        this.context.fillStyle = this.color; 
        this.context.fillRect(this.head.x, this.head.y, 1, 1); 
      }

    fillGrid(){
        this.context.fillStyle = this.color;
        for (let x = 0; x < this.canvasWidth; x++) {
          for (let y = 0; y < this.canvasHeight; y++) {
            if (this.grid[x] && this.grid[x][y] === 1) {
              this.context.fillRect(x, y, 1, 1); 
            }
          }
        }
    }
      
    update(){
        if (this.gameOver) {
          return;
        }
        
        this.head.x += this.direction.x;
        this.head.y += this.direction.y;
        
        
        if (this.grid[this.head.x] && this.grid[this.head.x][this.head.y] === 1) {
          this.gameOver = true;
          return;
        }
        
        this.trail.push({ x: this.head.x, y: this.head.y });
        this.grid[this.head.x][this.head.y] = 1; 
        

    }

    updateGame()
    {
      this.update();
      this.draw();
      
      if(!this.gameOver)
      {
        requestAnimationFrame(this.updateGame);
      }
    }

    startGame()
    {
        this.updateGame();
    }

    
}