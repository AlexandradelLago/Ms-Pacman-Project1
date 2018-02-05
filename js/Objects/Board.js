function Board(canvas,escala){
    this.canvas= canvas;
    this.ctx=canvas.getContext("2d");
    this.escala=escala;
    this.canvas.height=23*this.escala;
    this.canvas.width=41*this.escala;
    
};

Board.prototype.clearBoard= function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}

   

Board.prototype.drawBoard = function (){
   
    this.ctx.fillStyle="black";
    // drawing of the black background
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    myGame.food.drawFood();
    myGame.pacman.drawPacman();
   // myGame.powerUp.drawPowerUp();
    myGame.blueGhost.drawGhost();
    myGame.redGhost.drawGhost();
    
// draw the walls
    var n1=1*this.escala;
    var n2=2*this.escala;
    var n3=3*this.escala;
    var n5=5*this.escala;
    var n6=6*this.escala;
    var n9=9*this.escala;
    var n11=11*this.escala;
    var n13=13*this.escala;
    var n15=15*this.escala;
    var n17=17*this.escala;
    var n20=20*this.escala;
    var n29=29*this.escala;
    var n33=33*this.escala;
    var n35=35*this.escala;
    var n39=39*this.escala;
    // drawing of blue lines
    this.ctx.beginPath();
    this.ctx.fillStyle="#0350fb"
    this.ctx.rect(n1,n1,n39,n1);
    this.ctx.rect(n1,n2,n1,n20);
    this.ctx.rect(n1,21*this.escala,n39,n1);
    this.ctx.rect(n39,n2,n1,n20);
    this.ctx.rect(n5,n5,n1,n5);
    this.ctx.rect(n5,n13,n1,n5);
    this.ctx.rect(n35,n5,n1,n5);
    this.ctx.rect(n35,n13,n1,n5);
    this.ctx.rect(n15,n9,n1,n5);
    this.ctx.rect(25*this.escala,n9,n1,n5);
    this.ctx.rect(23*this.escala,n9,n2,n1);
    this.ctx.rect(n6,n5,n2,n1);
    this.ctx.rect(n6,n17,n2,n1);
    this.ctx.rect(n33,n5,n2,n1);
    this.ctx.rect(n33,n17,n2,n1);
    this.ctx.rect(16*this.escala,n9,n2,n1);
    this.ctx.rect(n9,n9,n3,n1);
    this.ctx.rect(n9,n13,n3,n1);
    this.ctx.rect(n29,n9,n3,n1);
    this.ctx.rect(n29,n13,n3,n1);
    this.ctx.rect(n15,n5,n11,n1);
    this.ctx.rect(n15,n13,n11,n1);
    this.ctx.rect(n15,n17,n11,n1);
    this.ctx.fill();

}

