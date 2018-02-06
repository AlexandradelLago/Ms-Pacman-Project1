function Food(){
    Collision.call(this);
    this.x=0;
    this.y=0;
    this.ratius=escala*0.2;
    this.points=30;
    this.ate=false;
    this.color="yellow";
};
// primero generar todas los objeto comida, luego borrar los objeto comida que colisionan con pacman y no dibujarlo y darle score a pacman
// cuando pacman come todos los objetos gana.!!!
Food.prototype.drawFood = function (){
 ctx.fillStyle=this.color;
 for (x=4; x<=38;x++){
     for (y=4; y<=20;y++){
        if (x%2===0&&y%2===0){
            ctx.beginPath();
           // console.log((x-0.5)*escala);
            ctx.arc((x-0.5)*escala,(y-0.5)*escala,this.ratius,0,Math.PI*2,true);
            ctx.fill();
            ctx.closePath();
        }
     }
 }
}
