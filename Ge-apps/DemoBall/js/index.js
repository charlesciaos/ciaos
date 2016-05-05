
const FRAMERATE = 30; //frame per second
const INTERVALTIME = 1000/FRAMERATE; //in milliseconds
const INTERVALTIME_IN_SECOND = 1/FRAMERATE; //in second


const GAME_STATE_TITLE = 0;
const GAME_STATE_INIT = 1;
const GAME_STATE_GAME_OVER = 2;


var lastTime = 0; //紀錄前一次的時間
var b = 1; //空氣阻力

var x = 0; // in pixels
var y = 0;

var vx = 0; // pixels / second
var vy = 0;

var ax = 0; // pixels / second^2
var ay = 0;
var g = 0; //Gravity

var box;

function eventWinodwLoaded()
{   
    var c = document.getElementById("GravityField");
    box = c.getContext("2d");
    box.fillStyle="#FF0000";

    x = 20;
    y = 100;
    vx = 30;
    vy = 0;
    ay = 0;
    ax = 0;
    
    initGravityField();

    setInterval(loop, INTERVALTIME); //in milliseconds
}


function initGravityField()
{
    g = 100; // Gravity = 9.80665 m / sec^2
    lastTime = new Date().getTime();
    //dt = INTERVALTIME_IN_SECOND; //in seconds
}


function setAccessory(aax, aay)
{
	ax += aax;
    ay += aay;
}

function loop()
{
    var nowTime = new Date().getTime();
    var dt = (nowTime - lastTime) / 1000;

    setAccessory(0, g); //set Gravity
    
    y += vy*dt + 0.5*ay*dt*dt;  
    x += vx*dt + 0.5*ax*dt*dt;

    console.log("x=" + x + ", y=" + y + ", ax=" + ax + ", ay=" + ay + ", dt=" + dt);    
    
    vx = vx + ax*dt;
    vy = vy + ay*dt;
    
    vx *= b;
    vy *= b;

    ax = 0;
    ay = 0;
    
    lastTime = nowTime;

    // redraw image
    box.clearRect(0, 0, 400, 200);
    box.beginPath();
    box.arc(x+10, y+10, 10, 0, 2*Math.PI);
    box.stroke();
    box.closePath();
    box.fill();

    //check boundary
    checkBoundary();
}

function checkBoundary()
{
    if(y>180) 
    {
        y = 180;
        vy *= -1;
    }
    else if(0 > y)
    {
        y = 0;
        vy *= -1;
    }

    if (x>380)
    {
        x=380;
        vx *= -1;
    }
    else if(0 > x)
    {
        x = 0;
        vx *= -1;
	}
}

function handleKeyDown(e)
{
    var key=e.keyCode || e.which;

    //console.log(key);
    //console.log("keycode = " + e.keyCode + "which = " + e.which)
    switch(key)
    {
        case 37: //left
        setAccessory( -1000, 0);
        break;
        case 38: //up
        setAccessory( 0, -1000);
        break;
        case 39: //right
        setAccessory( 1000, 0);
        break;
        case 40: //down
        setAccessory( 0, 1000);
        break;
        default:
        break;
    }
}

window.addEventListener("load", eventWinodwLoaded, false);
window.addEventListener("keydown", handleKeyDown, true);







// canvas 2
var ctx

var titleSheet = new Image();
titleSheet.addEventListener('load', eventShipLoadded, false);
titleSheet.src = "images/flower.png";

var animationFrames = [0, 1, 2, 3, 4, 5, 6, 7];
var frameIndex = 0;
var rotation = 90;

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
