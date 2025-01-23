"use client";
import { Player } from "./Player";
export class Game{
   
    direction;
    context;
    headX;
    headY;
    gameOver;
    canvasWidth;
    canvasHeight;
    grid;
    cursorX;
    cursorY;
    Player;

    constructor(context,canvasHeight,canvasWidth,color)
    {
       this.Player=new Player(context,color);
       this.context=context;
       this.canvasWidth=canvasWidth;
       this.canvasHeight=canvasHeight;
       this.headX = this.canvasWidth / 2
       this.headY = this.canvasHeight / 2;
       this.direction = this.getDirectionFromCursor(this.headX, this.headY);
       this.grid = [];
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
        this.Player.setCursor(event.clientX,event.clientY);
        this.direction = this.getDirectionFromCursor(this.Player.cursorX, this.Player.cursorY);
        // console.log(this.direction);
    });
  
    }

    getDirectionFromCursor(cursorX, cursorY) {
        const deltaX = cursorX - this.headX;
        const deltaY = cursorY - this.headY;
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
        this.context.fillStyle = this.Player.color; 
        this.context.fillRect(this.headX, this.headY, 2, 2); 
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
        
         if(!this.headX) this.headX= this.canvasWidth / 2;
         if(!this.headY) this.headY= this.canvasHeight / 2;
        
        this.headX += this.direction.x;
        this.headY += this.direction.y;
        // console.log(this.headX,this.headY);
        
        
        // if (this.headX && this.headY && this.grid[this.headX] && this.grid[this.headX][this.headY] === 1) {
        //   this.gameOver = true;
        //   return;
        // }
        if(this.Player){
        this.Player.pushInTrail(this.headX,this.headY);
        }

        if(this.headX && this.headY && this.grid[this.headX]){
        this.grid[this.headX][this.headY] = 1; 
        }
        

    }

    updateGame()
    {
      this.update();
      this.draw();
    
    
      requestAnimationFrame(this.updateGame.bind(this));
      
    }

    startGame()
    {
        this.updateGame();
    }

    
}