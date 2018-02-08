function PowerUp(x,y){
    this.x=x;
    this.y=y;
    this.color= "#db1973";
    this.ratius=escala*0.3;
    this.width=this.ratius*2;
    this.height=this.ratius*2;
    this.points=100;
}

PowerUp.prototype.drawPowerUp= function (){
    
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x-0.5*escala,this.y-0.5*escala,this.ratius,0,Math.PI*2,true);
    ctx.fill();
    ctx.closePath();

}