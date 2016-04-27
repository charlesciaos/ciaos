
function eventWinodwLoaded()
{
        var ball = new GEObject();

        console.log(ball); 
        ball.m = 10;
        ball.x = 300;
        ball.y = 20;
        console.log(ball); 
        //ball.drawObject();
        ball.setAccessor(10, 30);

        var myCar = new GEObject();
        console.log(myCar);

        var c=document.getElementById("canvas");
        var box=c.getContext("2d");
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
