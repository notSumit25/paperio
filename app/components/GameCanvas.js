"use client";
import React, { useEffect } from "react";
import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";

const GameCanvas = () => {
  useEffect(() => {
    (async () => {
      const app = new Application();
      await app.init({ background: "#1099bb", resizeTo: window });
      document.getElementById("game-container").appendChild(app.canvas);
      const gridSize = 40; // Size of each grid cell
      const createGrid = () => {
        const grid = new Graphics();
        grid.setStrokeStyle(1, 0xffffff, 0.2); // Light grid lines
        for (let x = 0; x < app.screen.width; x += gridSize) {
          for (let y = 0; x < app.screen.height; y += gridSize) {
            grid.rect(x, y, gridSize, gridSize);
          }
        }
        app.stage.addChild(grid);
      };
      createGrid();
      const playerSize = gridSize - 5;
      const player = new Graphics();
      player.fill(0xff0000); // Red color
      player.rect(0, 0, playerSize, playerSize);
      player.fill();
      player.x = gridSize; // Initial position
      player.y = gridSize;
      app.stage.addChild(player);

      const trail = new Graphics();
      
      app.stage.addChild(trail);
      
      const trailSegments = [];
      

      // Target position (initialized to the player's starting position)
      let targetX = player.x;
      let targetY = player.y;

      // Movement speed
      const speed = 2; // Pixels per frame

      // Listen for mouse clicks on the canvas
      app.canvas.addEventListener("mousemove", (e) => {
        // Calculate the mouse position relative to the canvas
        const rect = app.canvas.getBoundingClientRect();
        targetX = e.clientX - rect.left - playerSize / 2;
        targetY = e.clientY - rect.top - playerSize / 2;
      });



      const movePlayer = () => {
        const dx = targetX - player.x;
        const dy = targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move the player towards the target if not already there
        if (distance > 1) {
          const angle = Math.atan2(dy, dx);
          player.x += Math.cos(angle) * speed;
          player.y += Math.sin(angle) * speed;
        }

        // Prevent player from moving out of bounds
        player.x = Math.max(
          0,
          Math.min(app.screen.width - playerSize, player.x)
        );
        player.y = Math.max(
          0,
          Math.min(app.screen.height - playerSize, player.y)
        );
        trailSegments.push({ x: player.x, y: player.y });

        // Remove old trail segments if the trail exceeds max length

        // Draw the trail
        trail.fill(0x00ff00); // Green color for the trail
        for (const segment of trailSegments) {
          trail.rect(
            segment.x + playerSize / 4,
            segment.y + playerSize / 4,
            playerSize / 2,
            playerSize / 2
          );
        }
        trail.fill();
        
      };

      app.ticker.add(movePlayer);
    })();
  }, []);

  return <div id="game-container"></div>;
};

export default GameCanvas;
