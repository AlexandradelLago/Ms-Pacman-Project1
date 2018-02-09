function Fruits(x,y){
    this.x=x;
    this.y=y;
    this.w=30;
    thiw.h=30;
    this.fruit=["cherry","","",""];
    this.points=100;
}

Fruits.prototype.drawFruit= function (){
    
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x-0.5*escala,this.y-0.5*escala,this.ratius,0,Math.PI*2,true);
    ctx.fill();
    ctx.closePath();

}