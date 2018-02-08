// We declar canvas and mygame outside the document.ready so 
// they are global and we can call them from any object
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var myGame;
var gameover=false;
var escala=30;
canvas.height=canvas.height*escala;
canvas.width=canvas.width*escala;
var fps=60; // minimum 30 and optimal is 60 fps for a game
var board;
var pacman;
var frame=0;
var interval;
var powerUp=[];
var playing=true;
var pause=false;
var wallsData=[
    [1,1,39,1],[1,2,1,20],[1,21,39,1],[39,2,1,20],[5,5,1,5],[5,13,1,5],[35,5,1,5],[35,13,1,5],
    [15,9,1,5],[25,9,1,5],[23,9,2,1],[6,5,2,1],[6,17,2,1],[33,5,2,1],[33,17,2,1],[16,9,2,1],[9,9,3,1],
    [9,13,3,1],[29,9,3,1],[29,13,3,1],[15,5,11,1],[15,13,11,1],[15,17,11,1]
];
var walls=[];
var food=[];
var images={
    eatingPacman:"./images/ms_pac_man.png",
    closedPacman:"./images/closedPacman.png"
};
var music = new Audio();
music.src = "./Audios/pacman-song.mp3";

// START of the GAME
$(document).ready (function (){
    $("#play").on("click",function(e){
        //esto inicia todo
        $("#play").css("display","none");
        myGame = new Game ();
        generateWalls();
        generateFood();
        generatePowerUp();
        keyListener();
        interval = setInterval(updateGame,1000/fps)
    });
});
// Me dibuja todo y actualiza
function updateGame(){
    if (!pause&&!gameover){
        ctx.clearRect(0,0,canvas.width,canvas.height);                     
        myGame.board.drawBoard();
        food.forEach(function(f){f.drawFood();});
        myGame.pacman.updatePacman();
        myGame.pacman.drawPacman();
        walls.forEach(function(w){ w.drawWall();});
        powerUp.forEach(function(p){ p.drawPowerUp();});
        checkIfCrash(); // checa pacman
       if (frame<55){

        myGame.blueGhost.updateGhost();
        myGame.redGhost.updateGhost();
       }else if (frame<90){
        myGame.blueGhost.updateGhost();
        myGame.redGhost.updateGhost();
        myGame.pinkyGhost.updateGhost();
        myGame.orangeGhost.updateGhost();

        }else if (frame===90) {
            myGame.blueGhost.index=2;
            myGame.blueGhost.updateGhost()
            myGame.redGhost.index=3;
            myGame.redGhost.updateGhost();
            myGame.pinkyGhost.updateGhost();
            myGame.orangeGhost.updateGhost();
        }else if (frame<140){
            
        myGame.blueGhost.updateGhost();
        myGame.redGhost.updateGhost();
        myGame.pinkyGhost.updateGhost();
        myGame.orangeGhost.updateGhost();
        }else if (frame===140){
            myGame.pinkyGhost.index=2;
            myGame.pinkyGhost.updateGhost()
            myGame.orangeGhost.index=3;
            myGame.orangeGhost.updateGhost();
      
        }else{
            checkIfCrashGhost(myGame.redGhost,20); // checa ghost y lo mueve
            checkIfCrashGhost(myGame.blueGhost,40);
            checkIfCrashGhost(myGame.pinkyGhost,60);
            checkIfCrashGhost(myGame.orangeGhost,80);
        }
        myGame.blueGhost.drawGhost();
        myGame.redGhost.drawGhost();
        myGame.pinkyGhost.drawGhost();
        myGame.orangeGhost.drawGhost();
        frame+=1;
        drawScore(myGame.pacman.finalScore,myGame.pacman.score);
music.play()
    }
}
function drawScore(player,score){
    ctx.fillStyle="white";
    ctx.font="50px Arial";
    ctx.fillText("SCORE PLAYER 1"+" : "+Math.round(score),50,50);
    ctx.fillText("SCORE PLAYER 2"+" : "+Math.round(player[0]),canvas.width-600,canvas.height-20);
 }

 

  // EVENTS LISTENERSSS
  function keyListener(){
    document.addEventListener("keydown", function(e){
        switch (e.keyCode) {
            case 38: //w
            console.log(pause);
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
            case 80: //w
            console.log(pause);
             pause? pause=false:pause=true;         
                break;
            case 27: //arrow down       
            startGame();
                break;
        }
    });
}
//Main function
function startGame(){  
    var gameover=false;
    frame=0;
    playing=true;
    pause=false;
    food=[];
    powerUp=[];
    walls=[];
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    myGame=undefined;
    myGame = new Game ();
    generateWalls();
    generateFood();
    generatePowerUp();
    keyListener();
    interval = setInterval(updateGame,1000/fps)
}


//*********************************************************************** */

// me crea los objeto muro a partir de las coordenadas, w y h guardados en wallsData y los guarda en wall
function generateWalls(){
    wallsData.forEach(function(e){
    walls.push(new Wall(e[0]*escala,e[1]*escala,e[2]*escala,e[3]*escala));
   });
}
// me genera todos los objeto comida
function generateFood(){
   for (x=4; x<=38;x++){
       for (y=4; y<=20;y++){
          if (x%2===0&&y%2===0){
               food.push(new Food(x*escala,y*escala));
               walls.forEach(function(w){
                   if (crashWith(w,food[food.length-1])){
                       food.pop();
                   }
               });
          }
       }
   }
  }
  function generatePowerUp(){
        powerUp.push(new PowerUp(4*escala,4*escala));
        powerUp.push(new PowerUp(38*escala,4*escala));
        powerUp.push(new PowerUp(4*escala,20*escala));
        powerUp.push(new PowerUp(38*escala,20*escala));
   }
  

/**************************COLISIONES***********************************************/
function checkIfCrash(){
// With Walls 
        walls.forEach(function(w){if(crashWith(myGame.pacman,w)){ moveBack();}});
// with Ghosts
        if (crashWith(myGame.pacman,myGame.blueGhost)){
            if (myGame.blueGhost.vulnerability){
                myGame.blueGhost.killed();
                myGame.pacman.score+=myGame.blueGhost.points;
            }else{
                myGame.pacman.killed();
            }
            
        }else if (crashWith(myGame.pacman,myGame.redGhost)){
            if (myGame.redGhost.vulnerability){
                myGame.redGhost.killed();
                myGame.pacman.score+=myGame.redGhost.points;
            }else{
                myGame.pacman.killed();
            }
        }else if (crashWith(myGame.pacman,myGame.pinkyGhost)){
            if (myGame.pinkyGhost.vulnerability){
                myGame.pinkyGhost.killed();
                myGame.pacman.score+=myGame.pinkyGhost.points;
            }else{
                myGame.pacman.killed();
            }
            
        }else if (crashWith(myGame.pacman,myGame.orangeGhost)){
            if (myGame.orangeGhost.vulnerability){
                myGame.orangeGhost.killed();
                myGame.pacman.score+=myGame.orangeGhost.points;
            }else{
                myGame.pacman.killed();
            }
        }

// with food
        food.forEach(function(f,index){
            if(crashWith(myGame.pacman,f)){
                food.splice(index,1);
                myGame.pacman.score+=f.points;
            }
        });
// with powerUP
   powerUp.forEach(function(p,index){
    if(crashWith(myGame.pacman,p)){
        powerUp.splice(index,1);
        myGame.pacman.score+=p.points;
        myGame.redGhost.vulnerable()
        myGame.blueGhost.vulnerable();
        myGame.pinkyGhost.vulnerable()
        myGame.orangeGhost.vulnerable();
    }
});
}
function moveBack(){
switch (myGame.pacman.direction) {
    case "up":
    myGame.pacman.moveDown();
    break;
    case "down":
    myGame.pacman.moveUp();
    break;
    case "right":
    myGame.pacman.moveLeft();
    break;
    case "left":
    myGame.pacman.moveRight();
    break;
    default:
    myGame.pacman.direction="";
        break;
  }  
}


function checkIfCrashGhost(ghost,fps){
    var crashed=0;
        walls.forEach(function(w){
             if (crashWith(ghost,w)){
                // console.log(ghost);
                // console.log(w);
                ghost.nextMove();
                console.log("esto es crashed " +crashed);
                crashed+=1;
                ghost.updateGhost();
             /*   console.log(w);
                console.log(ghost.crashWith(w));
                var index1=Math.floor(Math.random()*4);
                console.log(index1);
                ghost.updateGhost(index1);*/
            }
        });
        if(crashed===0&&frame%fps===0){
           // console.log("estoy en cambio random de direccion")
            var index=Math.floor(Math.random()*4);
          //  console.log(index);
            this.index=index;
           // console.log(this.index);
            ghost.updateGhost(index);
       }else if(crashed===0){
           ghost.updateGhost();
        }
              // aqui mirar si choca contra ghost muerte
              // myGame
            // estoy mirando si choca contra muro
            //tengo que mirar si choca contra ghost tb y ahi seria game o   // en el caso de los muros tengo que hacer hacer velocidad cero y   
}


  function crashWith(objeto,obstaculo){
    return (objeto.x <= obstaculo.x + obstaculo.width) &&
    (objeto.x + objeto.width >= obstaculo.x) &&
    (objeto.y <= obstaculo.y + obstaculo.height) &&
    (objeto.y + objeto.height >= obstaculo.y);
  }

