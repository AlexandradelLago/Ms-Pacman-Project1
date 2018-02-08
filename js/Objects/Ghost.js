function Ghost(x,y,vX,vY,img){
  this.x=x*escala;
  this.y=y*escala;
  this.vel=1;
  this.direction=["up","down","right","left","none"];
  this.width=1.8*escala;
  this.height=1.8*escala;
  this.vulnerability=false;
  this.alive=true;
  this.img= new Image();
  this.img.src=img;
  this.img.addEventListener("load",this.drawGhost.bind(this));
  this.frame=0;
  this.index=0;
  this.validPosition=[];
};

Ghost.prototype.drawGhost= function (){
  ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}
/*SEGUIR AQUI!!! ESTOY HACIENDO QUE LOS GHOSTS DECIDAN HACIA ADONDE VAN DEPENDIENDO DE LA DISTANCIA CON PACMAN Y DE SI LA SIGUIENTE POSICION DA ERROR O NO*/ 
Ghost.prototype.nextMove=function(){
  var x;
  var y;
  validPosition=[];
  var randomInd;
  var f={x:this.x,y:this.y,w:this.width,h:this.height};
 switch (this.index) {
   // choco arriba 
   case 0:
            // Siguiente hacia abajo
            f={x:this.x,y:this.y+this.vel+1,w:this.width,h:this.height};
            validPosition.push({
              distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),
              x:0,
              y:this.vel+1+1,
              index:1,
              crash:getCrash(walls,f)
          });
          // Siguiente a la derecha
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y),
            x:1,
            y:this.vel+1,
            index:2,
            crash:getCrash(walls,f)
          });
          // Siguiente a la izquierda
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
            x:-1,
            y:this.vel+1,
            index:3,
            crash:getCrash(walls,f) 
          });
              break;
    case 1:
              f={x:this.x,y:this.y-(this.vel+1),w:this.width,h:this.height};
            validPosition.push({
              distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y),
              x:1,
              y:-(this.vel+1),
              index:0,
              crash:getCrash(walls,f)
            });
          // Siguiente a la derecha
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
            x:-1,
            y:-(this.vel+1),
            index:2,
            crash:getCrash(walls,f)
          });
          // Siguiente a la izquierda
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:0,
            y:-(this.vel+1)-1,
            index:3,
            crash:getCrash(walls,f) 
          });
              break;
     case 2:
              // Siguiente hacia arribaç
            f={x:this.x-(this.vel+1),y:this.y,w:this.width,h:this.height};
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:-(this.vel+1),
            y:-1,
            index:0,
            crash:getCrash(walls,f)
          });
          // Siguiente hacia abajo
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),
            x:-(this.vel+1),
            y:1,
            index:1,
            crash:getCrash(walls,f)
        });
        // Siguiente a la izquierda
        validPosition.push({
          distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x-1,f.y),
          x:-(this.vel+1)-1,
          y:0,
          index:3,
          crash:getCrash(walls,f) 
        });
            break;
     case 3:
              // Siguiente hacia arriba
          f={x:this.x+(this.vel+1),y:this.y,w:this.width,h:this.height};
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y-1),
            x:(this.vel+1),
            y:-1,
            index:0,
            crash:getCrash(walls,f)
          });
          // Siguiente hacia abajo
          validPosition.push({
            distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x,f.y+1),
            x:(this.vel+1),
            y:1,
            index:1,
            crash:getCrash(walls,f)
        });
        // Siguiente a la derecha
        validPosition.push({
          distance:getDistance(myGame.pacman.x,myGame.pacman.y,f.x+1,f.y),
          x:(this.vel+1)+1,
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
    // a must be equal to b
    return 0;
  });
 randomInd=Math.floor(Math.random()*validPosition.length);
 if (frame%200===0){
   console.log("esto es perseguir "+perseguir);
    perseguir ? perseguir=false:perseguir=true;
 }
 if (perseguir){
     // if (randomInd<0.5||validPosition.length===1){
          this.index=validPosition[0].index;
          this.x+=validPosition[0].x;
          this.y+=validPosition[0].y;
    /*    }else if(0.5<randomInd<0.75&&validPosition.length===3){
          this.index=validPosition[1].index;
          this.x+=validPosition[1].x;
          this.y+=validPosition[1].y;
        }else if(0.75<randomInd<1&&validPosition.length===3){
          this.index=validPosition[2].index;
          this.x+=validPosition[2].x;
          this.y+=validPosition[2].y;
        } else if (0.5<randomInd<1&&validPosition.length===2){
          this.index=validPosition[1].index;
          this.x+=validPosition[1].x;
          this.y+=validPosition[1].y;
        }*/
 }else{
  this.index=validPosition[randomInd].index;
  this.x+=validPosition[randomInd].x;
  this.y+=validPosition[randomInd].y;
 }


 // this.updateGhost(validPosition[g.index].index);
  //this.updateGhost(validPosition[0].index);

}

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

Ghost.prototype.vulnerability =function(){
    this.vulnerability=true;
    var vtime=300;
    return vtime;
};