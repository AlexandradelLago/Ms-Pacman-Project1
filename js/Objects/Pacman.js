function Pacman(name,x,y,player) {
    this.x=x;
    this.y=y;
    this.vel=1;
    this.lives=3;
    this.width=2*escala;
    this.height=2*escala;
    this.img = new Image();
    this.img.src=images.eatingPacman;
    this.img.onload= function(){
        this.drawPacman();}.bind(this);
    this.finalScore=[0,0];
    this.player=1;
    this.score=0;
    this.direction="";
    this.stopped=false;
    this.frame=0;
    this.name=name;
};
// hacer que pacman me cambie de imagen con los sprite pero PRIMORDIAL es el movimiento
Pacman.prototype.drawPacman= function (){
 this.frame+=1;
    if (frame%20===0&&this.direction){
        if (this.mouthOpened){
            this.img.src=images.closedPacman;
            this.mouthOpened=false;
        } else {
            this.img.src=images.eatingPacman
            this.mouthOpened=true;
        }
    }
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height); 
}
Pacman.prototype.updatePacman=function(){
        switch (this.direction) {
            case "up":
            this.y-=this.vel; 
            break;
            case "down":
            this.y+=this.vel;
            break;
            case "right":
            this.x+=this.vel;
            break;
            case "left":
            this.x-=this.vel;
            break;
        }
}
Pacman.prototype.moveUp = function(){
        
        this.y-=3; 
};

Pacman.prototype.moveDown = function(){
        this.y+=3;
};

Pacman.prototype.moveLeft = function(){
        this.x-=3;
};

Pacman.prototype.moveRight = function(){
        this.x+=3;   
};

Pacman.prototype.killed= function(){
   
   this.lives--;
   // si llego a vida 0 y es jugador dos. comparar puntuaciones y decidir gananor
   if (this.lives===0 && this.player===2){
       this.finalScore[1]=this.score;
       gameover=true;
       this.gameOver();
   }else if (this.lives===0 && this.player===1){
    
        this.nextPlayer();
   }else{
       // inicializar a los fantasmas y a pacman
    frame=0;
    myGame.redGhost.x=18.5*escala;
    myGame.redGhost.y=10*escala;
    myGame.redGhost.vel=1;
    myGame.redGhost.vulnerability=false;
    myGame.redGhost.alive=true;
    myGame.redGhost.index=0;

    myGame.blueGhost.x=21*escala;
    myGame.blueGhost.y=10*escala;
    myGame.blueGhost.vel=1;
    myGame.blueGhost.vulnerability=false;
    myGame.blueGhost.alive=true;
    myGame.blueGhost.index=0;

    myGame.pinkyGhost.x=18.5*escala;
    myGame.pinkyGhost.y=10*escala;
    myGame.pinkyGhost.vel=1;
    myGame.pinkyGhost.vulnerability=false;
    myGame.pinkyGhost.alive=true;
    myGame.redGhost.index=0;

    myGame.orangeGhost.x=21*escala;
    myGame.orangeGhost.y=10*escala;
    myGame.orangeGhost.vel=1;
    myGame.orangeGhost.vulnerability=false;
    myGame.orangeGhost.alive=true;
    myGame.orangeGhost.index=0;

    this.x=18*escala;
    this.y=14.5*escala;
    
   }
}

Pacman.prototype.nextPlayer = function (){
        generateFood();
        generatePowerUp();
        this.finalScore[0]=this.score;
        this.score=0;
        this.player=2;
        this.lives=3;
    // cuando player 1 y dos han jugado . comparar puntuaciones y enviar a pantalla nombre de ganador
}

Pacman.prototype.gameOver = function (){
    
    ctx.fillStyle = "rgb(221, 26, 117)";
    ctx.font = "100px Arial"
    ctx.fillText("GAME OVER", 100,200);
    ctx.fillStyle = "red";
    ctx.font = "30px Arial"
    ctx.fillText("Press 'ESC' for restart", 100,300);
    clearInterval(interval);
    if (this.finalScore[0]>this.finalScore[1]){
        ctx.fillStyle="white";
        ctx.font="50px Arial";
        ctx.fillText("THE WINNER IS MS. PACMAN with a score of"+this.finalScore[0],canvas.width/2,canvas.height/2);
    } else{
        ctx.fillStyle="white";
        ctx.font="50px Arial";
        ctx.fillText("THE WINNER IS MR. PACMAN with a score of"+this.finalScore[1],canvas.width/2,canvas.height/2);
    }
    startGame();
    // cuando player 1 y dos han jugado . comparar puntuaciones y enviar a pantalla nombre de ganador
}


