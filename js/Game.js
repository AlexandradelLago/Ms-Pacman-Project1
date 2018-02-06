function Game (){
    this.board = new Board();
    this.food = new Food();
    this.pacman = new Pacman();
    this.redGhost = new Ghost(18,10,0,-1,true,"./images/redGhost.png");
    this.blueGhost=new Ghost(20.5,10,0,-1,true,"./images/blueGhost.png");
    this.powerUp = new PowerUp();  
    
}   

