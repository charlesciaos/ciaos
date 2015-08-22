var ServerURL = "http://charlesciaos.diskstation.me/api/response.php";

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
function process()
{
  // proceed only if the xmlHttp object isn't busy
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)
  {
    // retrieve the name typed by the user on the form
    name = encodeURIComponent(document.getElementById("myName").value);
    // execute the quickstart.php page from the server
    xmlHttp.open("GET", ServerURL+"?name=" + name, true);  
    // define the method to handle server responses
    xmlHttp.onreadystatechange = handleServerResponse;
    // make the server request
    xmlHttp.send(null);
  }
  else
  {
    // if the connection is busy, try again after one second  
    setTimeout('process()', 1000);
  }
}

// executed automatically when a message is received from the server
function handleServerResponse() 
{
  // move forward only if the transaction has completed
  if (xmlHttp.readyState == 4) 
  {
    // status of 200 indicates the transaction completed successfully
    if (xmlHttp.status == 200) 
    {
      var user_count;
      // extract the XML retrieved from the server
      xmlResponse = xmlHttp.responseXML;
      // obtain the document element (the root element) of the XML structure
      xmlDocumentElement = xmlResponse.documentElement;
      // get the text message, which is in the first child of
      // the the document element
      helloMessage = xmlDocumentElement.firstChild.data;
      // update the client display using the data received from the server
      user_count = xmlDocumentElement.getElementsByTagName("user_count")[0].firstChild.data;
	  
      document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '</i>';
      // restart sequence
      setTimeout('process()', 1000);
      document.getElementById("divUserCount").innerHTML = '<i>您是第' + user_count + '位訪客</i>';
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
    console.log("start");
	process();
}
// Main
// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject(); 

window.addEventListener('load', init);
