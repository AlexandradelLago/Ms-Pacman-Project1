function Game (){
    this.board = new Board();
    this.pacman = new Pacman();
    this.redGhost = new Ghost(18.5,10,0,-1,"images/redGhost.png");
    this.blueGhost=new Ghost(21,10,0,-1,"images/blueGhost.png");
    this.powerUp = new PowerUp();  
    
}   

