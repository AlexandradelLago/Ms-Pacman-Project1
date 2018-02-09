function Game (){
    this.board = new Board();
    this.pacman = new Pacman("pacman",18*escala,14.5*escala,imagesmr);
    this.mspacman=new Pacman("mspacman",20*escala,14.5*escala,imagesms);
    this.redGhost = new Ghost(18.5,10,"images/redGhost.png","redy",50);
    this.blueGhost=new Ghost(21,10,"images/blueGhost.png","blue",70);
    this.pinkyGhost = new Ghost(18.5,10,"images/pinkyGhost.png","pinky",150);
    this.orangeGhost=new Ghost(21,10,"images/orangeGhost.png","orange",200);

}   

