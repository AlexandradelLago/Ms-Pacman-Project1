function Game (canvas,escala){
    this.board = new Board(canvas,escala);
    this.food = new Food(canvas,escala);
    this.pacman = new Pacman(canvas,escala);
    this.redGhost = new Ghost(canvas,18,10,0,-1,true,"./images/redGhost.png",escala);
    this.blueGhost=new Ghost(canvas,20.5,10,0,-1,true,"./images/blueGhost.png",escala);
  //  this.powerUp = new PowerUp(canvas,escala);
    
}   