function Pacman(canvas,escala) {
    this.ctx=canvas.getContext("2d");
    this.escala=escala;
    this.x=18*escala;
    this.y=13.7*escala;
    this.vel=2;
    this.lives=3;
    this.width=3*escala;
    this.height=3*escala;
    this.img = new Image();
    this.animation={eatingPacman:"./images/ms_pac_man.png",chewingPacman:"./images/closedPacman.png"};
    this.img.src=this.animation.eatingPacman;
    this.img.addEventListener("load",this.drawPacman.bind(this));
    this.finalScore=[0,0];
    this.player=1;
    this.score=0;
    this.direction="";

};

function animate(){
 //   console.log(this.img.src);
    if (this.img.src===this.animation.eatingPacman){
        this.img.src=this.animation.chewingPacman;
    } else {
        this.img.src=this.animation.eatingPacman;
    }

}

Pacman.prototype.drawPacman= function (){
    
    if (!this.collision()){
    this.updatePacman();
    }
    this.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
   // setInterval(animate, 1000/30);
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
        if (!this.collision()){
        this.y-=2;
        this.direction="up";
        }
};

Pacman.prototype.moveDown = function(){
    if (!this.collision()){
        this.y+=2;
        this.direction="down";
    }
};

Pacman.prototype.moveLeft = function(){
    if (!this.collision()){
        this.x-=2;
        this.direction="left";
    }
};

Pacman.prototype.moveRight = function(){
    if (!this.collision()){
        this.x+=2;
        this.direction="right";
    }        
};

Pacman.prototype.EatFood = function (){
    this.score+=1;
};

Pacman.prototype.collision = function(){
    var collision =false;
    // funcion que tiene que mirar si al moverse choca con un muro o con ghost si muro se para si ghost muere
    if (this.y<=this.escala*1.8||this.y>=this.escala*17.5||this.x<=2.2*this.escala||this.x>=36*this.escala){
        collision=true;
    }
    return collision;
}



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


