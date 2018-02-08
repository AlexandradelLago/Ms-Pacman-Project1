function Food(x,y){
    this.x=x;
    this.y=y;
    this.ratius=escala*0.2;
    this.width=this.ratius*2;
    this.height=this.ratius*2;
    
    this.points=30;
    this.ate=false;
    this.color="yellow";
};
// primero generar todas los objeto comida, luego borrar los objeto comida que colisionan con pacman y no dibujarlo y darle score a pacman
// cuando pacman come todos los objetos gana.!!! 

Food.prototype.drawFood = function(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x-0.5*escala,this.y-0.5*escala,this.ratius,0,Math.PI*2,true);
        ctx.fill();
        ctx.closePath();
}
