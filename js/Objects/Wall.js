    function Wall(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Wall.prototype.drawWall= function (){
    ctx.beginPath();
    if (myGame.pacman.lives===3||myGame.mspacman.lives===3){
        console.log(myGame.pacman.life);
        ctx.fillStyle="#0350fb"
    }else if (myGame.pacman.lives===2||myGame.mspacman.lives===2){
        ctx.fillStyle="#ec5ac5"
    }else if (myGame.pacman.lives===1||myGame.mspacman.lives===1){
        ctx.fillStyle="green";
    }else{
        ctx.fillStyle="#0350fb";
    }
    ctx.rect(this.x,this.y,this.width,this.height)
    ctx.fill();
    }   
    

