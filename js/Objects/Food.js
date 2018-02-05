function Food(canvas,escala){
    this.escala=escala;
    this.ctx=canvas.getContext("2d");
    this.x=0*this.escala;
    this.y=0*this.escala;
    this.ratius=this.escala*0.3;
    this.points=30;
    this.ate=false;
    this.color="yellow";
};

Food.prototype.drawFood = function (){
 this.ctx.fillStyle=this.color;
 for (i=4; i<=38;i++){
     for (j=4; j<=20;j++){
        if (i%2===0&&j%2===0){
            this.ctx.beginPath();
            this.ctx.arc((i-0.5)*this.escala,(j-0.5)*this.escala,this.ratius,0,Math.PI*2);
            this.ctx.closePath();
        }
     }
 }
}

Food.prototype.updateFood= function (){

}