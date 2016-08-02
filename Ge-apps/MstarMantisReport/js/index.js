function setConfig(params)
{
    document.getElementById('divWaittingDialog').style.visibility = 'visible';
    
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = 'http://charlesciaos.diskstation.me:8280/api/GeService/genMantisConfig.php';
    eventObj.params = params;
    eventObj.callback = cbSetConfig;
    // add the message to the queue
    MessageQueue.push(eventObj);
}

function genReport(params)
{
    document.getElementById('divWaittingDialog').style.visibility = 'visible';
    
    var eventObj = new Object();
    // set the flag that specifies we're deleting the messages
    eventObj.path = 'http://charlesciaos.diskstation.me:8280/api/GeService/genMantisReport.php';
    eventObj.params = params;
    eventObj.callback = cbGenReport;
    // add the message to the queue
    MessageQueue.push(eventObj);
}


function cbSetConfig()
{
    console.log("cbSetConfig");
    
    // continue if the process is completed
    if(xmlHttpGetMessages.readyState == 4) 
    {
        // continue only if HTTP status is "OK"
        if(xmlHttpGetMessages.status == 200) 
        {
            var result = xmlHttpGetMessages.responseText;
            
            console.log(result);
            
            document.getElementById('divWaittingDialog').style.visibility = 'hidden';
            
        }
    }
    
}

function cbGenReport()
{
    // continue if the process is completed
    if(xmlHttpGetMessages.readyState == 4) 
    {
        // continue only if HTTP status is "OK"
        if(xmlHttpGetMessages.status == 200) 
        {
            console.log("cbGenReport");
            
            var result = xmlHttpGetMessages.responseText;
            
            console.log(result);
            
            document.getElementById('divWaittingDialog').style.visibility = 'hidden';

            
            xmlResponse = xmlHttpGetMessages.responseXML;
            xmlDocumentElement = xmlResponse.documentElement;
            var status = xmlDocumentElement.getElementsByTagName("status")[0].firstChild.data;

            console.log("status:" + status);
            
            var msg = '';
            if(status == 'success')
            {
                var uri = xmlDocumentElement.getElementsByTagName("uri")[0].firstChild.data;
                
                var link = 'http://charlesciaos.diskstation.me:8280/' + uri;
                
                msg += 'Done, please downlaod daily report from below link address\n';
                msg += '<a href="'+ link+ '">' + link + '</a>'
            }
            else
            {
                msg += xmlDocumentElement.getElementsByTagName("msg")[0].firstChild.data;
            }
            document.getElementById('divResponseMsg').innerHTML = msg;
        }
    }
    
}


function init()
{
    console.log("start");
    initMessageQueue();
    
    var iUsername = document.getElementById('username');
    var iPassword = document.getElementById('password');
    var iProjectName = document.getElementById('project_name');
    var iWorkId = document.getElementById('work_id');
    var iDepartment = document.getElementById('department');
    var iMailTitle = document.getElementById('mail_title');
    var iMailLoop = document.getElementById('mail_loop');
    var iMailCC = document.getElementById('mail_cc');
    var iMailContentHeader = document.getElementById('mail_content_header');
    
    document.getElementById("btnSetConfig").onclick = function()
    {
        console.log(this+"onclick");
        
        params='';
        
        if(iUsername)
        {
            params += 'USERNAME=' + encodeURIComponent(iUsername.value);
        }
        if(iPassword)
        {
            params += '&PASSWORD=' + encodeURIComponent(iPassword.value);
        }
        if(iProjectName)
        {
            params += '&PROJECT_NAME=' + encodeURIComponent(iProjectName.value);
        }
        if(iWorkId)
        {
            params += '&MSTAR_WORK_ID=' + encodeURIComponent(iWorkId.value);
        }
        if(iDepartment)
        {
            params += '&MSTAR_DEPARTMENT=' + encodeURIComponent(iDepartment.value);
        }
        if(iMailTitle)
        {
            params += '&MSTAR_MAIL_TITLE=' + encodeURIComponent(iMailTitle.value);
        }
        if(iMailLoop)
        {
            params += '&MSTAR_MAIL_LOOP=' + encodeURIComponent(iMailLoop.value);
        }
        if(iMailCC)
        {
            params += '&MSTAR_MAIL_CC=' + encodeURIComponent(iMailCC.value);
        }
        if(iMailContentHeader)
        {
            params += '&MSTAR_MAIL_CONTENT_HEADER=' + encodeURIComponent(iMailContentHeader.value);
        }

        if(iUsername && iPassword)
        {
            setConfig(params);
        }
        else
        {
            alert('please input username and password');
        }
    }
    document.getElementById("btnGenReport").onclick = function()
    {
        console.log(this+"onclick");
        
        params='';
        if(iUsername)
        {
            params += 'USERNAME=' + encodeURIComponent(iUsername.value);
        }
        if(iPassword)
        {
            params += '&PASSWORD=' + encodeURIComponent(iPassword.value);
        }
        
        if(iUsername && iPassword)
        {
            genReport(params);
        }
        else
        {
            alert('please input username and password');
        }
    }
}

window.addEventListener('load', init);
