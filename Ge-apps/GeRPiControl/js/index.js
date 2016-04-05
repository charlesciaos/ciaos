function RPi_getRPiStatus(callback)
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/webiopi_RESTAPI.php";
    eventObj.params = null;
    eventObj.callback = callback;
    // add the message to the queue
    MessageQueue.push(eventObj);
}

function RPi_RotateCamera(direction)
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/RpiControl.php";
    eventObj.params = "device=SG90&direction="+direction;
    eventObj.callback = null;
    // add the message to the queue
    MessageQueue.push(eventObj);
}

function RPi_EnableCameraMonitor(mode)
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/RpiControl.php";
    eventObj.params = "device=camera&mode="+mode;
    eventObj.callback = null;
    // add the message to the queue
    MessageQueue.push(eventObj);
}


function RPi_takePicture()
{
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = "http://charlesciaos.diskstation.me/api/GeService/sendSshCommand.php";
    eventObj.params = "";
    eventObj.callback = null;
    // add the message to the queue
    MessageQueue.push(eventObj);
}

function init()
{
    console.log("start");
	initMessageQueue();
    
    document.getElementById("divBtnOn").onclick = function()
    {
        console.log(this+"onclick");
        RPi_EnableCameraMonitor("on");
        
        setTimeout(function(){
            document.getElementById('liveWebcam').innerHTML = location.reload();
            }, 2000);
        
    }
    document.getElementById("divBtnOff").onclick = function()
    {
        console.log(this+"onclick");
        RPi_EnableCameraMonitor("off");
    }
    document.getElementById("divBtnUp").onclick = function()
    {
        console.log(this+"onclick");
        RPi_RotateCamera("up");
    }
    document.getElementById("divBtnDown").onclick = function()
    {
        console.log(this+"onclick");
        RPi_RotateCamera("down");
    }
    document.getElementById("divBtnLeft").onclick = function()
    {
        console.log(this+"onclick");
        RPi_RotateCamera("left");
    }
    document.getElementById("divBtnRight").onclick = function()
    {
        console.log(this+"onclick");
        RPi_RotateCamera("right");
    }
}

window.addEventListener('load', init);
