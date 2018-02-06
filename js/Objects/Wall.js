    function Wall(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Wall.prototype.drawWall= function (){
    ctx.beginPath();
    ctx.fillStyle="#0350fb"
    ctx.rect(this.x,this.y,this.width,this.height)
    ctx.fill();
    }   
    

