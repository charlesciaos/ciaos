console.log("[FLOW] index.js START");

function dragstartHandler(event)
{
    event.dataTransfer.setData('text/plain' , event.currentTarget.id);
}

function loadFramesIntoDiv(frames, divBlock)
{
    var divContainter = document.getElementById(divBlock);

    var divContent = "";
    
    console.log("frames.length = "+frames.length);
    for(var i = 0; i < frames.length; i++)
    {
        //var stDocument = document.implementation.createDocument("https://tw.yahoo.com/", "html", null);
        //console.log(">>>>>>>>" + stDocument.title + "!!\n");

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
        //divTagArticalContent.innerHTML += "<iframe id='"+divBlock+"_"+i+i+"' src='"+ frames[i] +"' scrolling='no' frameborder='0' width='100%'  height='100%'></iframe>";
            
        divTagArticalContent.innerHTML += "<iframe src='"+ frames[i] +"' allowTransparency='true' width='100%' marginwidth='0' marginheight='0' scrolling='No' frameborder='0' id='"+divBlock+"_"+i+i+"'></iframe>";
        divTag.appendChild(divTagArticalTitle);
        divTag.appendChild(divTagArticalContent);
        divContainter.appendChild(divTag);

        document.getElementById(divBlock+"_"+i+i).addEventListener("load", SetCwinHeight, false);
    }
}

function reSize()
{
    console.log("[FLOW] scrollHeight=" + document.body.scrollHeight);
    console.log("[FLOW] offsetHeight=" + document.body.offsetHeight);
    //parent.document.all.frameid.height=document.body.scrollHeight; 
    //parent.document.getElementById("LeftFrame1").height=document.body.scrollHeight;
    //ih = document.getElementById("LeftFrame_11").contentWindow.document.body.offsetHeight; 
    ih = document.getElementById("LeftFrame_11").contentWindow.document.body.scrollHeight; 
    //ih2 = document.getElementById("CenterFrame_00").contentWindow.document.body.divUserCount; 
    ih2 =  document.getElementById("LeftFrame_11").contentWindow.document.body.clientHeight;
    //ih = parent.document.body.scrollHeight;
    console.log("[FLOW] ih=" + ih + " ih2=" + ih2);
    document.getElementById("LeftFrame1").style.height = (ih) +"px";


    ih3 = document.getElementById("CenterFrame_00").contentWindow.document.body.scrollHeight; 
    document.getElementById("CenterFrame0").style.height = (ih3) +"px";
    console.log("[FLOW] ih3=" + ih3);
}

function SetCwinHeight(e)
{
    //var iframeid=document.getElementById("CenterFrame_00"); //iframe id
   
    var iframeid= e.path[0]; //iframe id
    //console.log(e +"xx" + e.path[0]);
    if (document.getElementById)
    {   
        if (iframeid && !window.opera)
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
    

};

function SetAppsFrameHeight(e)
{
    var totalHeight = 0;   
    alert("frame change");
    console.log("SetAppsFrameHeight="+e);
}


function test()
{
    console.log("[FLOW] 5");

    var idoc = document.getElementById("CenterFrame_00");

    console.log("[FLOW] 5-1");
    var w = parseInt( idoc.scrollWidth );

    console.log("[FLOW] 5-2");
    var h = parseInt( idoc.scrollHeight );

    console.log("[FLOW] 5-3");
    console.log('   : ' + w+"px\n"+'   : ' +h+'px');
    document.getElementById("CenterFrame0").style.height = (h) +"px";

    console.log("[FLOW] 5-5");
    idoc = document.getElementById("LeftFrame_11");
    w = parseInt( idoc.clientWidth );
    h = parseInt( idoc.clientHeight );
    var h2 = parseInt( idoc.scrollHeight );  
    console.log('   : ' + w+"px\n"+'   : ' +h+'px' + ' h2=' + h2);
    document.getElementById("LeftFrame1").style.height = (h) +"px";

    console.log("[FLOW] 6");
}

function test2()
{
    var idoc = document.getElementById("CenterFrame_00").contentDocument.body;
    var w = parseInt( idoc.scrollWidth );  
    var h = parseInt( idoc.scrollHeight );  
    console.log('   : ' + w+"px\n"+'   : ' +h+'px');
    document.getElementById("CenterFrame0").style.height = (h) +"px";

    idoc = document.getElementById("LeftFrame_11").contentWindow.document.body;
    w = parseInt( idoc.clientWidth );  
    h = parseInt( idoc.clientHeight );  
    var h2 = parseInt( idoc.scrollHeight );  
    console.log('   : ' + w+"px\n"+'   : ' +h+'px' + 'h2=' + h2);
    document.getElementById("LeftFrame1").style.height = (h) +"px";
}

function onLoadInit()
{
    console.log("[FLOW] 4: onLoadInit");
    loadFramesIntoDiv(DemoLeftFrames, "LeftFrame");
    loadFramesIntoDiv(DemoCenterFrames, "CenterFrame");
    loadFramesIntoDiv(DemoRightFrames, "RightFrame");
    
    document.getElementById("BottomFrame").innerHTML = jsonObjWeather["parameter"]["parameterName"];

    //var divDropLeftTag0 = document.getElementById("LeftFrame1");
    //divDropLeftTag0.addEventListener('dblclick', dbClick, false);

    //reSize();
}

function eventWindowLoaded()
{
    onLoadInit();

    var divDropLeftTag = document.getElementById("LeftFrame");
    divDropLeftTag.ondragover = dragoverHandler;
    divDropLeftTag.ondragleave = dragLeaveHandler;
    divDropLeftTag.ondrop = dropHandler;

    var divDropCenterTag = document.getElementById("CenterFrame");
    divDropCenterTag.ondragover = dragoverHandler;
    divDropCenterTag.ondragleave = dragLeaveHandler;
    divDropCenterTag.ondrop = dropHandler;

    var divDropRightTag = document.getElementById("RightFrame");
    divDropRightTag.ondragover = dragoverHandler;
    divDropRightTag.ondragleave = dragLeaveHandler;
    divDropRightTag.ondrop = dropHandler;

    divDropLeftTag.addEventListener("change", SetAppsFrameHeight, false);        //當網頁載入完成時
    divDropCenterTag.addEventListener("change", SetAppsFrameHeight, false);        //當網頁載入完成時
    divDropRightTag.addEventListener("change", SetAppsFrameHeight, false);        //當網頁載入完成時
    
    console.log("[FLOW] eventWindowLoaded END");
}

//function dragstartHandler(event) {
//    event.dataTransfer.setData('text/plain' , event.currentTarget.id);
//}

/*function dragEnterHandler(event) {
    event.preventDefault();
    event.currentTarget.style.backgroundColor= "blue";
}*/

var preColor = "white";
function dragoverHandler(event)
{
    event.preventDefault();
    console.log("aa  drag:" + preColor +" background:" + event.currentTarget);
    preColor = event.currentTarget.style.backgroundColor;
    console.log("bb  drag:" + preColor);
    //event.currentTarget.style.backgroundColor= "gray";
    //event.currentTarget.setAttribute("class", "div.dragOver");
}

function dragLeaveHandler(event)
{
    event.currentTarget.style.backgroundColor= "white";
}

function dropHandler(event)
{
    var did = event.dataTransfer.getData('text/plain');
    var d = document.getElementById(did);
    event.currentTarget.appendChild(d);
    console.log("cc drop:" + preColor);
    event.currentTarget.style.backgroundColor= "white";
}

//當網頁載入完成時
window.addEventListener("load", eventWindowLoaded, false); 

//Get Apps list
var jsonTextManifest = getTextSync("apps/GeApps.json"); 
var jsonObjManifest = JSON.parse(jsonTextManifest);

//Get opendata
var jsonTextWeather = getTextSync("http://charlesciaos.diskstation.me/api/opendata/gov_cwb.php"); 
var jsonObjWeather = JSON.parse(jsonTextWeather);

console.log("[FLOW] index.js END");