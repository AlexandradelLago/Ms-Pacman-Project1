function Ghost(x,y,vX,vY,alive,img){
  Collision.call(this);
  this.x=x*escala;
  this.y=y*escala;
  this.vel=1;
  this.direction=["up","down","left","right"];
  this.width=2.5*escala;
  this.height=2.5*escala;
  this.vulnerability=false;
  this.alive=alive;
  this.img= new Image();
  this.img.src=img;
  this.img.addEventListener("load",this.drawGhost.bind(this));
  this.frame=0;
  this.index=0;
};

Ghost.prototype.drawGhost= function (){
  this.frame+=1;
  if (this.frame%120===0){
    this.updateGhost(this.index=Math.floor(Math.random()*4));
  }
  this.updateGhost(this.index);
  ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}


Ghost.prototype.updateGhost=function(index){
  
  switch (this.direction[index]) {
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