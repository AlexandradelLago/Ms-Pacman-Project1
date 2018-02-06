// We declar canvas and mygame outside the document.ready so 
// they are global and we can call them from any object

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var myGame;
var escala=30;
canvas.height=canvas.height*escala;
canvas.width=canvas.width*escala;
var fps=60; // minimum 30 and optimal is 60 fps for a game
var board;
var pacman;
var frame=0;
var interval;
var wallsData=[
    [1,1,39,1],[1,2,1,20],[1,21,39,1],[39,2,1,20],[5,5,1,5],[5,13,1,5],[35,5,1,5],[35,13,1,5],
    [15,9,1,5],[25,9,1,5],[23,9,2,1],[6,5,2,1],[6,17,2,1],[33,5,2,1],[33,17,2,1],[16,9,2,1],[9,9,3,1],
    [9,13,3,1],[29,9,3,1],[29,13,3,1],[15,5,11,1],[15,13,11,1],[15,17,11,1]
];
var walls=[];
var food=[];
var images={eatingPacman:"./images/ms_pac_man.png",chewingPacman:"./images/closedPacman.png"};

function Collision(){
    this.crashWith = function(walls){
      return (this.x < walls.x + walls.width) &&
      (this.x + this.width > walls.x) &&
      (this.y < walls.y + walls.height) &&
      (this.y + this.height > walls.y)
    }
  }
// START of the GAME
$(document).ready (function (){
    $("section button").on("click",function(e){
        //esto inicia todo
        myGame = new Game ();
        generateWalls();
        generateFood();
        keyListener();
        interval = setInterval(updateGame,1000/fps)
    });
});


// me crea los objeto muro a partir de las coordenadas, w y h guardados en wallsData y los guarda en wall
function generateWalls(){
     wallsData.forEach(function(e){
     walls.push(new Wall(e[0]*escala,e[1]*escala,e[2]*escala,e[3]*escala));
    });
 }

 function generateFood(){
    for (x=4; x<=38;x++){
        for (y=4; y<=20;y++){
           if (x%2===0&&y%2===0){

               ctx.beginPath();
               ctx.arc((x-0.5)*escala,(y-0.5)*escala,this.ratius,0,Math.PI*2,true);
               ctx.fill();
               ctx.closePath();
           }
        }
    }
   }
 

// ME DIBUJA TODO
function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);                     
    myGame.board.drawBoard();
    myGame.pacman.updatePacman();
    myGame.pacman.drawPacman();
    myGame.redGhost.drawGhost();
    myGame.blueGhost.drawGhost();
    myGame.food.drawFood();
    walls.forEach(function(w){
    w.drawWall();});
    frame+=1;
    ctx.fillStyle="white";
    ctx.font="20px Arial";
    ctx.fillText(frame,200,200);
    checkIfCrash();
}


function checkIfCrash(){
        walls.forEach(function(w){
          if(myGame.pacman.crashWith(w)){
              console.log("choca contra muro");
              myGame.pacman.direction="";
              myGame.pacman.stopped=true;
              // estoy mirando si choca contra muro
              //tengo que mirar si choca contra ghost tb y ahi seria game o   // en el caso de los muros tengo que hacer hacer velocidad cero y 
          }else {
            myGame.pacman.stopped=false;
          }
        });
}

// EVENTS LISTENERSSS
function keyListener(){
    document.addEventListener("keydown", function(e){
        if (!myGame.pacman.stopped){
        switch (e.keyCode) {
            case 38: //w
              myGame.pacman.direction="up";
              myGame.pacman.updatePacman();         
                break;
            case 40: //s
            myGame.pacman.direction="down";
            myGame.pacman.updatePacman();
                break;
            case 39: //arrow up
            myGame.pacman.direction="right";
            myGame.pacman.updatePacman();
                break;
            case 37: //arrow down
            myGame.pacman.direction="left";        
            myGame.pacman.updatePacman();
                break;
            default:
                break;
        }
    }
    })
}



//Main function
function startGame(){
    //se debe resetear todo!!!! 
    frames = 0;
    board = new Board();
    pacman = new Pacman();
    interval = setInterval(updateGame,1000/60);
  }