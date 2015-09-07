<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>WebSocket Test</title>
     
    <script language="javascript" type="text/javascript">
      var wsUri = "ws://echo.websocket.org/";
      var output;
      var websocket;
     
      function init() {
        output = document.getElementById("output");
        testWebSocket();
      }
     
      function testWebSocket() {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) {
          onOpen(evt)
        };
     
        websocket.onclose = function (evt) {
          onClose(evt)
        };
     
        websocket.onmessage = function (evt) {
          onMessage(evt)
        };
     
        websocket.onerror = function (evt) {
          onError(evt)
        };
      }
     
      function onOpen(evt) {
        writeToScreen("CONNECTED");
        doSend("WebSocket rocks");
      }
     
      function onClose(evt) {
        writeToScreen("DISCONNECTED");
      }
     
      function onMessage(evt) {
        writeToScreen('<span style="color:blue;">RESPONSE:'+evt.data+'</span>');
        //websocket.close();
      }
     
      function onError(evt) {
        writeToScreen('<span style="color:red;">ERROR:</span>' + evt.data);
      }
     
      function doClose() {
        writeToScreen("DOCLOSE");
        websocket.close();
      }

      function doSend(message) {
        writeToScreen("SENT: " + message);
        websocket.send(message);
      }
      

      function writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        output.appendChild(pre);
      }
     
      window.addEventListener("load", init, false);
     
      var i = 0;
      function test()
      {
        i++;
        doSend("TEST:"+i);
      }

      function doclose()
      {
        console.log("close");
        doClose();
      }



    </script>
  </head>
  
  <body>
    <input type="button" value="Test" onclick="test()" />
    <input type="button" value="Close it" onclick="doclose()" />
    <h2>WebSocket Test</h2>
    <div id="output"></div>
  </body>
</html>  