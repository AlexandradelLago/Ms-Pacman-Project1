function Pacman() {
    Collision.call(this);
    this.x=18*escala;
    this.y=14*escala;
    this.vel=1;
    this.lives=3;
    this.width=50;
    this.height=50;
    this.img = new Image();
    this.img.src=images.eatingPacman;
    // el this dentro de addEventlistere seria la imagen para que siga hablando de la claase
    // board le pongo el bind 
    // this.img.onload=function(){}.bind.this
    this.img.onload= function(){
        this.drawPacman();}.bind(this);
    this.finalScore=[0,0];
    this.player=1;
    this.score=0;
    this.direction="";
    this.frame=0;
    this.stopped=false;
};
// hacer que pacman me cambie de imagen con los sprite pero PRIMORDIAL es el movimiento
Pacman.prototype.drawPacman= function (){
    this.frame+=1;
    if (this.frames%60===0){
        if (this.animation===this.animation1){
            this.animation=this.animation2;
        } else {
            this.animation=this.animation2;
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
        
        this.y-=2; 
};

Pacman.prototype.moveDown = function(){
        this.y+=2;
};

Pacman.prototype.moveLeft = function(){
        this.x-=2;
};

Pacman.prototype.moveRight = function(){
        this.x+=2;   
};

Pacman.prototype.EatFood = function (){
    this.score+=1;
};

Pacman.prototype.killed= function(){
   this.lives--;
   // si llego a vida 0 y es jugador dos. comparar puntuaciones y decidir gananor
   if (this.lives===0 && this.player===2){
       this.finalScore[1]=this.score;
       this.checkWinner();
   }else if (this.lives===0 && this.player===1){
        this.nextPlayer();
   }
}

Pacman.prototype.nextPlayer = function (){
        this.finalScore[0]=this.score;
        this.score=0;
        this.player=2;
        this.lives=3;
    // cuando player 1 y dos han jugado . comparar puntuaciones y enviar a pantalla nombre de ganador
}

Pacman.prototype.checkWinner = function (){
    // cuando player 1 y dos han jugado . comparar puntuaciones y enviar a pantalla nombre de ganador
}


