'use strict';

console.log("==== [FLOW] ==== index.js START");

function dragstartHandler(event)
{
    console.log("==== [FLOW] ==== dragstartHandler() START");
    event.dataTransfer.setData('text/plain' , event.currentTarget.id);
}

function loadFramesIntoDiv(frames, divBlock)
{
    var divContainter = document.getElementById(divBlock);
    
    console.log("frames.length = " + frames.length);
    for(var i = 0; i < frames.length; i++)
    {
        var divTag = document.createElement("div"); 
        divTag.id = divBlock+i;
        //divTag.setAttribute("align","center");      
        //divTag.style.margin = "0px auto";
        divTag.className = "dynamicDiv";
        divTag.draggable = true;
        divTag.ondragstart = dragstartHandler;
        //artical
        var divTagArticalTitle = document.createElement("div");
        divTagArticalTitle.className = "ArticalTitle";

        var divTagArticalContent = document.createElement("div");
        divTagArticalContent.className = "ArticalContent";           
        divTagArticalContent.innerHTML += "<iframe src='"+ frames[i] +"' allowTransparency='true' width='100%' marginwidth='0' marginheight='0' scrolling='No' frameborder='0' id='"+divBlock+"_"+i+i+"'></iframe>";

        divTag.appendChild(divTagArticalTitle);
        divTag.appendChild(divTagArticalContent);
        divContainter.appendChild(divTag);

        document.getElementById(divBlock+"_"+i+i).addEventListener("load", SetCwinHeight, false);
    }
    divContainter.ondragover = dragoverHandler;
    divContainter.ondragleave = dragLeaveHandler;
    divContainter.ondrop = dropHandler;
}

function SetCwinHeight(e)
{  
    var iframeid= e.path[0]; //iframe id
    //console.log(e +"xx" + e.path[0]);
    if(document.getElementById)
    {
        if(iframeid && !window.opera)
        {
            if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight)
            {
                iframeid.height = iframeid.contentDocument.body.offsetHeight;
            }
            else if(iframeid.Document && iframeid.Document.body.scrollHeight)
            {
                iframeid.height = iframeid.Document.body.scrollHeight;
            }

            var h = parseInt( iframeid.scrollHeight ) + 20;
            iframeid.parentElement.parentElement.style.height = (h) +"px";
        }
    }

    UpdateAppsFrameHeight();
};

function UpdateAppsFrameHeight()
{
    var totalHeight = 0;
    var totalLHeight = 0;   
    var totalCHeight = 0;   
    var totalRHeight = 0;   
    //alert("frame change");

    console.log(document.getElementById("BottomFrame"));
    console.log(document.getElementById("BottomFrame").style.top);

    console.log(document.getElementById("TopFrame"));
    console.log(document.getElementById("TopFrame").style.top);

    var divLFrame = document.getElementById("LeftFrame");
    var divCFrame = document.getElementById("CenterFrame");
    var divRFrame = document.getElementById("RightFrame"); 
    
    for(var i = 0; i < divLFrame.childElementCount; i++)
    {
        totalLHeight += divLFrame.children[i].offsetHeight;
        totalLHeight += 5;
    }
    
    for(var i = 0; i < divCFrame.childElementCount; i++)
    {
        totalCHeight += divCFrame.children[i].offsetHeight;
        totalCHeight += 5;
    }

    for(var i = 0; i < divRFrame.childElementCount; i++)
    {
        totalRHeight += divRFrame.children[i].offsetHeight;
        totalRHeight += 5;
    }    
    
    totalHeight = Math.max(totalLHeight, totalCHeight, totalRHeight);
    
    console.log(totalHeight);
    // set target frame the sum of child's height 
    
    divLFrame.style.height = (totalHeight + 50) +"px";
    divCFrame.style.height = (totalHeight + 50) +"px";
    divRFrame.style.height = (totalHeight + 50) +"px";

    document.getElementById("BottomFrame").style.top = (totalHeight + 50) +"px";
}

var preColor = "";
function dragoverHandler(event)
{
    event.preventDefault();
    console.log("dragoverHandler 1 preColor:" + preColor +" backgroundColor:" + event.currentTarget.style.backgroundColor);
    preColor = "#DCDCDC";
    console.log("dragoverHandler 2 preColor:" + preColor);
    event.currentTarget.style.backgroundColor= "#66cdaa";
    //event.currentTarget.setAttribute("class", "div.dragOver");
}

function dragLeaveHandler(event)
{
    console.log("dragLeaveHandler preColor:" + preColor);
    event.currentTarget.style.backgroundColor= preColor;
}

function dropHandler(event)
{   
    console.log("dropHandler preColor:" + preColor);
    var did = event.dataTransfer.getData('text/plain');
    var d = document.getElementById(did);
    event.currentTarget.appendChild(d);
    event.currentTarget.style.backgroundColor= preColor;
    
    UpdateAppsFrameHeight();
}

function eventWindowLoaded()
{
    console.log("==== [FLOW] ==== eventWindowLoaded() START");

    loadFramesIntoDiv(DemoLeftFrames, "LeftFrame");
    loadFramesIntoDiv(DemoCenterFrames, "CenterFrame");
    loadFramesIntoDiv(DemoRightFrames, "RightFrame");
    
    document.getElementById("BottomFrame").innerHTML = jsonObjWeather["parameter"]["parameterName"];    
}

window.addEventListener("load", eventWindowLoaded, false); 

//Get Apps list
var jsonTextManifest = getTextSync("http://charlesciaos.diskstation.me/apps/GeApps.php");
var jsonObjManifest = JSON.parse(jsonTextManifest);

//Get opendata
var jsonTextWeather = getTextSync("http://charlesciaos.diskstation.me/api/opendata/gov_cwb.php"); 
var jsonObjWeather = JSON.parse(jsonTextWeather);

console.log("==== [FLOW] ==== index.js END");