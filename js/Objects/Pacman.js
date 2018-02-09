function Pacman(name,x,y,images) {
    this.x=x;
    this.y=y;
    this.vel=2;
    this.lives=3;
    this.width=2*escala;
    this.height=2*escala;
    this.images = images;
    this.img = new Image();
    this.img.src=images[0];
    this.img.onload= function(){
        this.drawPacman();}.bind(this);
    this.finalScore=[0,0];
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
            this.img.src=this.images[0];
            this.mouthOpened=false;
        } else {
            this.img.src= this.images[1];
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
    
        this.y-=4; 
};

Pacman.prototype.moveDown = function(){
        this.y+=4;
};

Pacman.prototype.moveLeft = function(){
        this.x-=4;
};

Pacman.prototype.moveRight = function(){
        this.x+=4;   
};

Pacman.prototype.killed= function(){
   if (this.lives!=0){
    this.lives--;
    this.score-=500;
    frame=0;
    // si llego a vida 0 y es jugador dos. comparar puntuaciones y decidir gananor
        // inicializar a los fantasmas y a pacman
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
     if (this.name==="mspacman"){
         this.x=20*escala;
         this.y=14.5*escala;
         this.direction="";
     } else {
         this.x=18*escala;
         this.y=14.5*escala;
         this.direction="";
     }
   } 
}




