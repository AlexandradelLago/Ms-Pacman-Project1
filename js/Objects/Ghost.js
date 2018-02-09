function Ghost(x,y,img,name,chaserfrequency){
  this.x=x*escala;
  this.y=y*escala;
  this.name=name;
  this.width=1.8*escala;
  this.height=1.8*escala;
  this.vel=1;
  this.direction=["up","down","right","left"];
  this.index=0;
  this.vulnerability=false;
  this.alive=true;
  this.img= new Image();
  this.img.src=img;
  this.img.addEventListener("load",this.drawGhost.bind(this));
  this.frame=0;
  this.chasing=true;
  this.points=500;
  this.chaserfrequency=chaserfrequency;

};

Ghost.prototype.killed=function (){
  this.x=18.5*escala;
  this.y=7*escala;
  this.vel=1;
  this.vulnerability=false;
  this.alive=true;
  this.index=2;
}

Ghost.prototype.updateGhost=function(index){
  switch (index? this.direction[index]:this.direction[this.index]){
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

Ghost.prototype.drawGhost= function (){
  ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}
/*SEGUIR AQUI!!! ESTOY HACIENDO QUE LOS GHOSTS DECIDAN HACIA ADONDE VAN DEPENDIENDO DE LA DISTANCIA CON PACMAN Y DE SI LA SIGUIENTE POSICION DA ERROR O NO*/ 
Ghost.prototype.nextMove=function(){
  validPosition=[];
  var randomInd;
  var c= this.vel+1;
  var f={x:this.x,y:this.y,w:this.width,h:this.height};
 switch (this.index) {
   case 0: // COLLISION WHILE HEADING UP
            f.y=this.y+c;
            // Vengo de abajo  Siguiente hacia abajo (0,1+c)
            validPosition.push({
              distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),x:0,
              y:c+1,index:1,crash:getCrash(walls,f)});
          validPosition.push({  // Siguiente a la derecha
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y), x:1, y:c,
            index:2,crash:getCrash(walls,f)});
          // Siguiente a la izquierda
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
            x:-1,
            y:c,
            index:3,
            crash:getCrash(walls,f) 
          });
              break;
    case 1: // COLLISION WHILE HEADING DOWN
   
              f.y=this.y-c;
            validPosition.push({
              distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y),
              x:1,
              y:-c,
              index:2,
              crash:getCrash(walls,f)
            });
          // Siguiente a la derecha
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
            x:-1,
            y:-c,
            index:3,
            crash:getCrash(walls,f)
          });
          // Siguiente a la izquierda
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:0,
            y:-c-1,
            index:0,
            crash:getCrash(walls,f) 
          });
              break;
     case 2:
              // Siguiente hacia arribaç
            f.x=this.x-c;
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:-c,
            y:-1,
            index:0,
            crash:getCrash(walls,f)
          });
          // Siguiente hacia abajo
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),
            x:-c,
            y:1,
            index:1,
            crash:getCrash(walls,f)
        });
        // Siguiente a la izquierda
        validPosition.push({
          distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
          x:-c-1,
          y:0,
          index:3,
          crash:getCrash(walls,f) 
        });
            break;
     case 3:
              // Siguiente hacia arriba
          f.x=this.x+c;
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:c,
            y:-1,
            index:0,
            crash:getCrash(walls,f)
          });
          // Siguiente hacia abajo
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),
            x:c,
            y:1,
            index:1,
            crash:getCrash(walls,f)
        });
        // Siguiente a la derecha
        validPosition.push({
          distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y),
          x:c+1,
          y:0,
          index:2,
          crash:getCrash(walls,f)
        });
            break;
 }
    validPosition= validPosition.filter(function(p){return p.crash===0});
    validPosition.sort(function (a, b) {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
   randomInd=Math.floor(Math.random()*validPosition.length);

      if (frame%this.chaserfrequency===0){
        this.chasing ? this.chasing=false:this.chasing=true;
      }
      if (this.chasing){
                this.index=validPosition[0].index;
                this.x+=validPosition[0].x;
                this.y+=validPosition[0].y;
      }else {
        this.index=validPosition[randomInd].index;
        this.x+=validPosition[randomInd].x;
        this.y+=validPosition[randomInd].y;
      }
  }


Ghost.prototype.vulnerable =function(){
    this.vulnerability=true;
    this.img.src="./images/vulnerable.png";
    setTimeout(function (){
      this.vulnerability=false;
     if (this.name==="redy"){
      this.img.src="./images/redGhost.png";
     } else if ((this.name==="blue")){
      this.img.src="./images/blueGhost.png";
     }else if (this.name==="pinky"){
      this.img.src="./images/pinkyGhost.png";
     } else if ((this.name==="orange")){
      this.img.src="./images/orangeGhost.png";
     }
    }.bind(this),4000);

};


function getCrash(walls,g){
  var crasH=0;
  walls.forEach(function(w){
    if(crashWith(g,w)){
      console.log(g.crashWith(w));
      crasH+=1;
      
    }
  });
  return crasH;
}  


function getDistance(x1,y1,x2,y2){
  var xD = x2-x1;
  var yD = y2-y1;
  return Math.sqrt(Math.pow(xD,2) + Math.pow(yD,2));
} 
