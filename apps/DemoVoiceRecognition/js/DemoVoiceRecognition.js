var ServerUrl="http://charlesciaos.diskstation.me/api/SpeechToText.php";

// holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();

// creates an XMLHttpRequest instance
function createXmlHttpRequestObject() 
{
  // will store the reference to the XMLHttpRequest object
  var xmlHttp;
  // this should work for all browsers except IE6 and older
  try
  {
    // try to create XMLHttpRequest object
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
     // assume IE6 or older
    var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0",
                                    "MSXML2.XMLHTTP.5.0",
                                    "MSXML2.XMLHTTP.4.0",
                                    "MSXML2.XMLHTTP.3.0",
                                    "MSXML2.XMLHTTP",
                                    "Microsoft.XMLHTTP");
    // try every prog id until one works
    for (var i=0; i<XmlHttpVersions.length && !xmlHttp; i++) 
    {
      try 
      { 
        // try to create XMLHttpRequest object
        xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
      } 
      catch (e) {} // ignore potential error
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




// Send request to server
function processContent()
{
  // only continue if xmlHttp isn't void
  if (xmlHttp)
  {
    // try to connect to the server
    try
    {
        // only continue if the connection is clear and cache is not empty
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == 0))
        {
        
            var file = document.getElementById("file");

            /* Create a FormData instance */
            //var formData = document.getElementById("iForm");//new FormData();
            var formData = new FormData();
            /* Add the file */ 
            formData.append("file", file.files[0]);
            console.log(file);
            console.log(file.files[0]);
            console.log(formData);
    
            // initiate the request
            xmlHttp.open("POST", ServerUrl, true);
            //xmlHttp.setRequestHeader("Content-Type", "multipart/form-data");
            
            xmlHttp.setRequestHeader("Cache-Control", "no-cache");
            xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xmlHttp.setRequestHeader("X-File-Name", file.files[0].fileName);
            xmlHttp.setRequestHeader("X-File-Size", file.files[0].fileSize);
            xmlHttp.setRequestHeader("X-File-Type", file.files[0].type);
    
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(formData);
        }
    }
    // display the error in case of failure
    catch (e)
    {

    }
  }
}

// function that retrieves the HTTP response
function handleRequestStateChange() 
{
  // when readyState is 4, we also read the server response
  if (xmlHttp.readyState == 4) 
  {
    // continue only if HTTP status is "OK"
    if (xmlHttp.status == 200) 
    {
      try
      {
        postUpdateProcess();
      }
      catch(e)
      {

      }
    } 
    else 
    {

    }
  }
}

// Processes server's response
function postUpdateProcess()
{
    // read the response
    var response = xmlHttp.responseText;
    // server error?
 
    if(response.indexOf("ERRNO") >= 0
    || response.indexOf("error") >= 0)
    {
        //alert(response);
    }

    // update the tasks list  
    document.getElementById("result").innerHTML = response;
}

function init()
{
    var oSubmit = document.getElementById("iSubmit");
    oSubmit.addEventListener("click", processContent);
    window.addEventListener("load", init);
}

window.addEventListener("load", init);
