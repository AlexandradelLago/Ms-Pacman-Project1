function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;  
};

Board.prototype.drawBoard = function (){
   // drawing of the black background
    ctx.fillStyle="black";
    ctx.fillRect(this.x,this.y,this.width,this.height);
}

