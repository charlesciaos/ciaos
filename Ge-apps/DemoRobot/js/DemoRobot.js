var ServerURL = "http://charlesciaos.diskstation.me/api/require_url.php";

var require_counter = 0;
var counterTimerId = 0;
var SendRequireInterval = 5000;

// retrieves the XMLHttpRequest object
function createXmlHttpRequestObject() 
{
  // will store the reference to the XMLHttpRequest object
  var xmlHttp;
  // if running Internet Explorer
  if(window.ActiveXObject)
  {
    try
    {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (e) 
    {
      xmlHttp = false;
    }
  }
  // if running Mozilla or other browsers
  else
  {
    try 
    {
      xmlHttp = new XMLHttpRequest();
    }
    catch (e) 
    {
      xmlHttp = false;
    }
  }

  // return the created object or display an error message
  if (!xmlHttp)
  {
    alert("Error creating the XMLHttpRequest object.");
  }
  else 
  {
    return xmlHttp;
  }
}

// make asynchronous HTTP request using the XMLHttpRequest object 
function process2()
{
  console.log("process: " + xmlHttp.readyState);
  // proceed only if the xmlHttp object isn't busy
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
  {
    //path = encodeURIComponent(document.getElementById("required_url").value);
    path = document.getElementById("required_url").value;
    // execute the quickstart.php page from the server


    if(path == "" || path == "undefined")
    {
        stopProcess();
        return;
    }
    
    console.log(path);
    
    
    xmlHttp.open("GET", ServerURL+"?path="+path, true);  
    // define the method to handle server responses
    xmlHttp.onreadystatechange = handleServerResponse2;
    // make the server request
    xmlHttp.send(null);
  }
  else
  {
    var oReuquiredInterval = document.getElementById("required_interval");
    SendRequireInterval = oReuquiredInterval.value;
    
    if(0 == SendRequireInterval || "undefined" == SendRequireInterval)
    {
        SendRequireInterval = 5000;
        oReuquiredInterval.value = 5000;
    }
    
    // if the connection is busy, try again after one second
    clearTimeout(counterTimerId);
    counterTimerId = setTimeout(process2, SendRequireInterval);
  }
}

function stopProcess()
{
    clearTimeout(counterTimerId);
    require_counter = 0;
    document.getElementById("divRequiredCounter").innerHTML = '<i>' + require_counter + '</i>';
}

// executed automatically when a message is received from the server
function handleServerResponse2() 
{
  // move forward only if the transaction has completed
  if (xmlHttp.readyState == 4) 
  {
    // status of 200 indicates the transaction completed successfully
    if (xmlHttp.status == 200) 
    {
      require_counter++;
	  
      document.getElementById("divRequiredCounter").innerHTML = '<i>' + require_counter + '</i>';
      
      var oReuquiredInterval = document.getElementById("required_interval");
      SendRequireInterval = oReuquiredInterval.value;
        if(0 == SendRequireInterval || "undefined" == SendRequireInterval)
        {
            SendRequireInterval = 5000;
            oReuquiredInterval.value = 5000;
        }
      // restart sequence
      clearTimeout(counterTimerId);
      counterTimerId = setTimeout(process2, SendRequireInterval);
    } 
    // a HTTP status different than 200 signals an error
    else 
    {
      //alert("There was a problem accessing the server: " + xmlHttp.statusText);
    }
  }
}

function init()
{
    console.log("init");

    document.getElementById("divRequiredCounter").innerHTML = '<i>' + require_counter + '</i>';

    var oReuquiredUrl = document.getElementById("required_url");
    oReuquiredUrl.value = "http://charlesciaos.diskstation.me/api/add_counter.php";
    
    var oReuquiredInterval = document.getElementById("required_interval");
    oReuquiredInterval.value = 5000;
    SendRequireInterval = oReuquiredInterval.value;

    var oBtnUpdate = document.getElementById("btnUpdate");
    oBtnUpdate.addEventListener('click', process2);
    
    var oBtnUpdate = document.getElementById("btnStopUpdate");
    oBtnUpdate.addEventListener('click', stopProcess);    
	//process();
}
// Main
// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject(); 

window.addEventListener('load', init);
