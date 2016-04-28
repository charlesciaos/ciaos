
const FRAMERATE = 40;
const INTERVALTIME = 1000/FRAMERATE;



const GAME_STATE_TITLE = 0;
const GAME_STATE_INIT = 1;
const GAME_STATE_GAME_OVER = 2;


var ctx

var titleSheet = new Image();
titleSheet.addEventListener('load', eventShipLoadded, false);

titleSheet.src = "images/flower.png";

var animationFrames = [0, 1, 2, 3, 4, 5, 6, 7];
var frameIndex = 0;
var rotation = 90;

var x = 50;
var y = 50;



function eventShipLoadded()
{
    drawScreen();
}

function drawScreen()
{
        
    var ship = document.getElementById("ship");
    ctx = ship.getContext("2d");    
    ctx.fillStyle = "#aaaaaa";

    ctx.fillRect(0,0,500,500);
    
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    
    ctx.translate(x+16, y+16);
    var angleInRadians = rotation * Math.PI / 180;
    ctx.rotate(angleInRadians);
    
    var sourceX = Math.floor(animationFrames[frameIndex] % 8 )*32;
    var sourceY = Math.floor(animationFrames[frameIndex] / 8 )*32;
    
    ctx.drawImage(titleSheet, sourceX, sourceY, 32, 32, -16, -16, 32, 32);
    
    ctx.restore();
}


var box;

function eventWinodwLoaded()
{   
    var c = document.getElementById("can");
    box = c.getContext("2d");
    box.fillStyle="#FF0000";

    x = 0;
    y = 100;
    v0y = 0;
    v0x = 25;

    ay = 0;
    ax = 0;
    g = 10;

    dt =  0.1;
    k = 0.8 // 空氣阻力

    setInterval("loop()", 10);
}

function setAccessory(aax, aay)
{
	ax += aax;
    ay += aay;
}

//setAccessory(100, -50);
function loop()
{
    // S=v0*t+1/2*a*t^2
    y += v0y*dt + 0.5*ay*dt*dt;  
    x += v0x*dt + 0.5*ax*dt*dt;

    // g
    y += v0y*dt + 0.5*g*dt*dt;  

    v0x = v0x + ax*dt;
    v0y = v0y + ay*dt;
    //g
    v0y = v0y + g*dt;

    ay = 0;
    ax = 0;     

    // re draw image
    box.clearRect(0, 0, 400, 200);
    //box.fillRect(x,y,50,50); 
    box.beginPath();
    box.arc(x+10,y+10,10, 0,2*Math.PI);
    box.stroke();
    box.closePath();
    //box.stroke();
    box.fill();

    if(y>180) 
    {
        y = 180;
        v0y *= -k;
    }
    else if(0> y)
    {
        v0y *= -k;   
    }
    
    if (x>380)
    {
        x=380;
        v0x *= -k ;
    }
    else if(0 > x)
    {
        v0x *= -k ;
	}
    

}

window.addEventListener("load", eventWinodwLoaded, false);
