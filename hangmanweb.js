const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const dialog = document.getElementById("dialog");
const imgExemple = document.getElementById("imgExemple");

const player = {
  x: 50,
  y: 50,
  width: 30,
  height: 30,
  speed: 8,
  collideWithBox: null,
};
//projectPageHtml c'est le nom du .html du projet donc si tu veux le projet 6 tu met projectPageHtml: "PROJET6"
//projectImage c'est le nom de l'image du projet donc si tu veux le projet 6 tu met projectImage: "sortable.png" si le projet 6 correspond à sortable
const boxes = [
  
    {
        x: 600, 
        y: 200, 
        width: 20, 
        height: 20, 
        index: 2, 
        playerOnBox: false , 
        projectPageHtml: "PROJET2",
        projectImage: "Groupietracker.png"
    },
    { 
        x: 300, 
        y: 300, 
        width: 20, 
        height: 20, 
        index: 3, 
        playerOnBox: false,
        projectPageHtml: "PROJET3",
        projectImage: "sortable.png",
    },
    {
        x: 720, 
        y: 65, 
        width: 20, 
        height: 20, 
        index: 9, 
        playerOnBox: false,
        projectPageHtml: "index",
        projectImage: "imaged'accueil.png",
    },
  
  
  
   
];


const walls = [
    { x: 0, y: 0, width: canvas.width, height: 10 },
    { x: 0, y: 0, width: 10, height: canvas.height },
    { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
    { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
    { x: 50, y: 100, width: 10, height: 400 },
    { x: 150, y: 50, width: 10, height: 400 },
    { x: 250, y: 160, width: 10, height: 400 },
    { x: 350, y: 50, width: 10, height: 400 },
    { x: 450, y: 150, width: 10, height: 400 },
    { x: 550, y: 50, width: 10, height: 400 },
    { x: 650, y: 150, width: 10, height: 400 },
    { x: 750, y: 100, width: 10, height: 400 },
    { x: 100, y: 100, width: 600, height: 10 },
    { x: 100, y: 490, width: 600, height: 10 },
    { x: 200, y: 250, width: 10, height: 100 },
    { x: 400, y: 250, width: 10, height: 100 },
    { x: 600, y: 250, width: 10, height: 100 },
    { x: 210, y: 200, width: 100, height: 10 },
    { x: 410, y: 300, width: 100, height: 10 },
    { x: 210, y: 400, width: 100, height: 10 },
    { x: 50, y: 250, width: 10, height: 100 },
    { x: 750, y: 250, width: 10, height: 100 },
    { x: 350, y: 200, width: 10, height: 100 },
    { x: 450, y: 400, width: 10, height: 100 },
    { x: 100, y: 200, width: 100, height: 10 },
    { x: 600, y: 400, width: 100, height: 10 },
];


function drawPlayer() {
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = "black";
  }
  
  function drawBoxes() {
    boxes.forEach((box) => {
      context.fillRect(
        box.x,
        box.y,
  
        box.width,
        box.height
      );
    });
  }
  function drawWalls() {
    walls.forEach((wall) => {
      context.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
  }
  
  function movePlayer(event) {
    switch (event.keyCode) {
      case 37: // left arrow
        player.x -= player.speed;
        break;
      case 38: // up arrow
        player.y -= player.speed;
        break;
      case 39: // right arrow
        player.x += player.speed;
        break;
      case 40: // down arrow
        player.y += player.speed;
        break;
    }
    if (event.key.toLowerCase() == "p" && player.collideWithBox != null) {
      window.location.href = player.collideWithBox.projectPageHtml + ".html";
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoxes();
    drawWalls();
    drawPlayer();
    detectCollision();
  }
  
  function detectCollision() {
    // Check collision with wall
    walls.forEach((wall) => {
      if (
        player.x < wall.x + wall.width &&
        player.x + player.width > wall.x &&
        player.y < wall.y + wall.height &&
        player.y + player.height > wall.y
      ) {
        // Collision detected, move player back to starting position
        player.x = 50;
        player.y = 50;
  
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawBoxes();
        drawWalls();
      }
    });
  
    for (let i = 0; i < boxes.length; i++) {
      if (
        player.x < boxes[i].x + boxes[i].width &&
        player.x + player.width > boxes[i].x &&
        player.y < boxes[i].y + boxes[i].height &&
        player.y + player.height > boxes[i].y
      ) {
        dialog.style.display = "flex";
        player.collideWithBox = boxes[i];
        imgExemple.src = "/image/" + boxes[i].projectImage;
        imgExemple.style.display = "block";
  
        break;
      } else {
        dialog.style.display = "none";
        player.collideWithBox = null;
        imgExemple.style.display = "none";
  
        console.log("t");
      }
    }
  }
  
  function gameLoop() {
    // Clear canvas
  
    // Draw game objects
  
    // Detect collision
  
    // Request next frame
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  gameLoop();
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBoxes();
  drawWalls();
  detectCollision();
  
  // Move player with arrow keys
  document.addEventListener("keydown", movePlayer);
  