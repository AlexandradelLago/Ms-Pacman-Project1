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
var frame=0;
var interval;
var powerUp=[];
var playing=true;
var pause=false;
var finalScore=[];
var wallsData=[
    [1,1,39,1],[1,2,1,20],[1,21,39,1],[39,2,1,20],[5,5,1,5],[5,13,1,5],[35,5,1,5],[35,13,1,5],
    [15,9,1,5],[25,9,1,5],[23,9,2,1],[6,5,2,1],[6,17,2,1],[33,5,2,1],[33,17,2,1],[16,9,2,1],[9,9,3,1],
    [9,13,3,1],[29,9,3,1],[29,13,3,1],[15,5,11,1],[15,13,11,1],[15,17,11,1]
];
var walls=[];
var food=[];
var imagesms=["./images/ms_pac_man.png","./images/mspacmanclosed.png"];
// HACER ESTO-SPRITES!!!
var imagesmr=["./images/openedPacman.png","./images/pacmancerrado.png"];

var music = new Audio();
music.src = "./Audios/pacman-song.mp3";

// START of the GAME
$(document).ready (function (){
    $("#play").on("click",function(e){
        //esto inicia todo
        $("#play").css("display","none");
        startGame();
    });

    $("#startagain").on("click",function(e){
        //esto inicia todo
        gameover=false;
        frame=0;
        playing=true;
        pause=false;
        food=[];
        powerUp=[];
        walls=[];
        myGame=undefined;
        startGame();
    });

});
function startGame(){  
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    myGame = new Game ();
    generateWalls();
    generateFood();
    generatePowerUp();
    keyListener();
    interval = setInterval(updateGame,1000/fps)
}
// Me dibuja todo y actualiza
function updateGame(){
    if (!pause&&!gameover){
        ctx.clearRect(0,0,canvas.width,canvas.height);                     
        myGame.board.drawBoard();
        food.forEach(function(f){f.drawFood();});
        myGame.pacman.updatePacman();
        myGame.mspacman.updatePacman();

        myGame.mspacman.drawPacman();
        myGame.pacman.drawPacman();
        walls.forEach(function(w){ w.drawWall();});
        powerUp.forEach(function(p){ p.drawPowerUp();});
        checkIfCrash(myGame.pacman); 
        checkIfCrash(myGame.mspacman);
        //INICIO DE LOS FANTASMAS Y MOVIMIENTOS
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
         }else if (frame<200){
                    myGame.pinkyGhost.updateGhost()
                    myGame.orangeGhost.updateGhost();
         } else {
                // MIRA SI FANTASMA CHOCA PARA MOVERLO PERSIGUIENDO A PACMAN O RANDOM 
                moveGhost(myGame.redGhost,20); 
                moveGhost(myGame.blueGhost,40);
                moveGhost(myGame.pinkyGhost,50);
                moveGhost(myGame.orangeGhost,70);
        }
        // DIBUJO LOS FANTASMAS
        myGame.blueGhost.drawGhost();
        myGame.redGhost.drawGhost();
        myGame.pinkyGhost.drawGhost();
        myGame.orangeGhost.drawGhost();
        frame+=1;
        drawScore();
//music.play()
        checkIfGameOver();
    }
}
function checkIfGameOver(){
    if (myGame.pacman.lives===0&&myGame.mspacman.lives===0){
        finalScore[0]=myGame.pacman.score;
        finalScore[1]=myGame.mspacman.score;
        gameOver();
        gameover=true; 
    }


    if (food===[]){
        finalScore[0]=myGame.pacman.score;
        finalScore[1]=myGame.mspacman.score;
        gameOver();
        gameover=true;
    }
}

function gameOver(){

    clearInterval(interval);
        
    if (finalScore[0]>finalScore[1]){
        ctx.fillStyle="red";
        ctx.font="50px Arial";
        ctx.fillText(" MR. PACMAN wins with a score of"+finalScore[0],100,canvas.height/2);
    } else{
        ctx.fillStyle="red";
        ctx.font="50px Arial";
        ctx.fillText("MS. PACMAN wins with a score of "+finalScore[1],100,canvas.height/2);
    }
    $("section").append(" <button id='startagain'>bliss</button>");
    $("#startagain").text("START AGAIN");
   
}

function drawScore(){
    ctx.fillStyle="white";
    ctx.font="40px Arial";

    ctx.fillText("SCORE MR PACMAN "+" : "+Math.round(myGame.pacman.score)+" LIVES: "+myGame.pacman.lives,50,50);
    ctx.fillText("SCORE MS PACMAN "+" : "+Math.round(myGame.mspacman.score)+" LIVES: "+myGame.mspacman.lives,300,canvas.height-20);
 }

 

  // EVENTS LISTENERSSS
  function keyListener(){
    document.addEventListener("keydown", function(e){
     if (myGame.mspacman.lives!=0){
        switch (e.keyCode) {
            case 38: //w
            console.log(pause);
              myGame.mspacman.direction="up";
              myGame.mspacman.updatePacman();         
                break;
            case 40: //s
            myGame.mspacman.direction="down";
            myGame.mspacman.updatePacman();
                break;
            case 39: //arrow up
            myGame.mspacman.direction="right";
            myGame.mspacman.updatePacman();
                break;
            case 37: //arrow down
            myGame.mspacman.direction="left";        
            myGame.mspacman.updatePacman();
                break;
            case 80: //w
            console.log(pause);
            pause? pause=false:pause=true;         
                break;
    
        }
     }   
    if (myGame.pacman.lives!=0){
        switch (e.keyCode) {
            case 80: //w
            console.log(pause);
             pause? pause=false:pause=true;         
                break;
            case 87: //w
            console.log(pause);
            myGame.pacman.direction="up";
            myGame.pacman.updatePacman();         
                break;
            case 90: //s
            myGame.pacman.direction="down";
            myGame.pacman.updatePacman();
                break;
            case 83: //arrow up
            myGame.pacman.direction="right";
            myGame.pacman.updatePacman();
                break;
            case 65: //arrow down
            myGame.pacman.direction="left";        
            myGame.pacman.updatePacman();
            break; 
        }
    }
});

}

//**************************  Generate WALLS, FOOD, POWERUPS, EXTRA FRUITS*********************************** */

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
function checkIfCrash(pacman){
// With Walls 
        walls.forEach(function(w){if(crashWith(pacman,w)){ moveBack(pacman);}});
// with Ghosts
        if (crashWith(pacman,myGame.blueGhost)){
            if (myGame.blueGhost.vulnerability){
                myGame.blueGhost.killed();
                pacman.score+=myGame.blueGhost.points;
            }else{
                pacman.killed();
            }
            
        }else if (crashWith(pacman,myGame.redGhost)){
            if (myGame.redGhost.vulnerability){
                myGame.redGhost.killed();
                pacman.score+=myGame.redGhost.points;
            }else{
                pacman.killed();
            }
        }else if (crashWith(pacman,myGame.pinkyGhost)){
            if (myGame.pinkyGhost.vulnerability){
                myGame.pinkyGhost.killed();
                pacman.score+=myGame.pinkyGhost.points;
            }else{
                pacman.killed();
            }
            
        }else if (crashWith(pacman,myGame.orangeGhost)){
            if (myGame.orangeGhost.vulnerability){
                myGame.orangeGhost.killed();
                pacman.score+=myGame.orangeGhost.points;
            }else{
                pacman.killed();
            }
        }

// with food
        food.forEach(function(f,index){
            if(crashWith(pacman,f)){
                food.splice(index,1);
                pacman.score+=f.points;
                if (food===[]){
                    pacman.newMaze();
                }
            }
        });
// with powerUP
   powerUp.forEach(function(p,index){
    if(crashWith(pacman,p)){
        powerUp.splice(index,1);
        pacman.score+=p.points;
        myGame.redGhost.vulnerable()
        myGame.blueGhost.vulnerable();
        myGame.pinkyGhost.vulnerable()
        myGame.orangeGhost.vulnerable();
    }
});
}




function moveBack(pacman){
switch (pacman.direction) {
    case "up":
    pacman.moveDown();
    break;
    case "down":
    pacman.moveUp();
    break;
    case "right":
    pacman.moveLeft();
    break;
    case "left":
    pacman.moveRight();
    break;
    default:
    pacman.direction="";
        break;
  }  
}


function moveGhost(ghost,fps){
    var crashed=0;
        walls.forEach(function(w){
             if (crashWith(ghost,w)){
                ghost.nextMove();
                console.log("esto es crashed " +crashed);
                crashed+=1;
                ghost.updateGhost();
            }
        });
        if(crashed===0&&frame%fps===0){
            var index=Math.floor(Math.random()*4);
            this.index=index;
            ghost.updateGhost(index);
       }else if(crashed===0){
           ghost.updateGhost();
        }
}


  function crashWith(objeto,obstaculo){
    return (objeto.x <= obstaculo.x + obstaculo.width) &&
    (objeto.x + objeto.width >= obstaculo.x) &&
    (objeto.y <= obstaculo.y + obstaculo.height) &&
    (objeto.y + objeto.height >= obstaculo.y);
  }

