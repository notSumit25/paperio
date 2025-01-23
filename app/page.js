"use client"
import { useState,useRef } from 'react';
import {Game} from './Game.js';

export default function Home() {
  const gameref=useRef(null);
  const [game,setGame]=useState(false);
  const startgame=()=>{
    const context=gameref.current.getContext("2d");
    const canvasWidth=gameref.current.width;
    const canvasHeight=gameref.current.height;
    const color="black";
    if(context && gameref){
      // console.log("game started",context,canvasWidth,canvasHeight,color);
    const game=new Game(context,canvasHeight,canvasWidth,color);
    console.log(game);
    game.startGame();
    setGame(game);
    }
  }
 
  return (
    <div>
       {!game &&<button onClick={startgame}> Start Game </button>}
      <canvas width={"100vw"} height={"100vh"} ref={gameref}>
       
      </canvas>
    </div>
  );
}
