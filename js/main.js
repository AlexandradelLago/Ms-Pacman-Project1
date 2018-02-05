// We declar canvas and mygame outside the document.ready so 
// they are global and we can call them from any object

var canvas;
var myGame;
var escala=25;
var fps=30; // minimum 30 and optimal is 60 fps for a game

$(document).ready (function (){
    $("section button").on("click",function(e){
        canvas = document.getElementById("canvas");
        myGame = new Game (canvas,escala);
        keyListener();
        var frames = setInterval(function(){
            myGame.board.clearBoard();                      
            myGame.board.drawBoard();
        },1000/fps)
    })
});


function keyListener(){
    document.addEventListener("keydown", function(e){
        switch (e.keyCode) {
            case 38: //w
               myGame.pacman.moveUp()               
                break;
            case 40: //s
                myGame.pacman.moveDown()
                break;
            case 39: //arrow up
                myGame.pacman.moveRight()
                break;
            case 37: //arrow down
                myGame.pacman.moveLeft()
                break;
            default:
                break;
        }
    })
}