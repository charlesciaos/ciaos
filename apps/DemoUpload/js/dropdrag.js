var ServerURL = "http://charlesciaos.diskstation.me/api/save_ajax.php";
var ServerRootURL = "http://charlesciaos.diskstation.me/";

function enableDropDrag()
{
  document.ondragenter = function(e) 
  {
    e.preventDefault();
  }

  document.ondragover = function(e)
  {
    e.preventDefault();
  }

  document.getElementById('panel').addEventListener('dragenter', function(e)
  {
    e.preventDefault();
    if (window.console) console.log('dragenter');
    e.effectAllowed = ['move'];
  }, false);

  document.getElementById('panel').addEventListener('dragover', function(e) {
    e.preventDefault();
    if (window.console) console.log('dragover');
    e.dataTransfer.dropEffect = 'move';
  }, false);

  document.getElementById('panel').addEventListener('drop', function(e)
  {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (window.console) console.log('drop');
    if (window.console) console.log(e.dataTransfer);
    if (e.dataTransfer.types && e.dataTransfer.types.length > 0)
    {
      for (var i = 0; i < e.dataTransfer.types.length; i++)
      {
        if (window.console) console.log(e.dataTransfer.types[i]);
        if (e.dataTransfer.types[i] !== 'Files')
        {
          if (window.console) console.log(e.dataTransfer.getData(e.dataTransfer.types[i]));
        }
      }
    }
    //can't get FileList in Chrome7... and Firefox4 didn't follow the FileAPI standard...
    if (e.dataTransfer.files.length > 0) 
    {
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        switch (e.dataTransfer.files[i].type) {
        case 'image/jpeg':
        case 'image/gif':
        case 'image/png':
        case 'image/bmp':
          document.getElementById('msg1').innerHTML = 'File name: ' + e.dataTransfer.files[i].name;
          document.getElementById('msg2').innerHTML = '';
          document.getElementById('msg3').innerHTML = '';
          setTimeout(function(blob) {
            return function() {
              var fileReader = new FileReader();
              fileReader.onload = function() {
                if (window.console) console.log('got an image file.');
                //if(window.console) console.log(this.result);
                var uploader = new fwH5AjaxUploader(ServerURL, function(_txt, _xml)
                {
                  if (1) console.log(_txt);
                  var msg = JSON.parse(_txt);
                  if (msg.state == 'success')
                  {
                    document.getElementById('msg3').innerHTML = 'File uploaded: ' + blob.name;
                    var img = document.createElement('img');
                    img.src = ServerRootURL + msg.path.substr(2);
                    img.width = '110';
                    img.style = "text-align:center";
                    document.getElementById('panel').innerHTML = 'Drop Here.<p>';
                    document.getElementById('panel').appendChild(img);
                    img = null;
                  }
                });
                
                uploader.addFile('fileupload',
                {
                  'name': blob.name,
                  'type': blob.type,
                  'data': this.result.slice(this.result.indexOf(",") + 1)
                }, 'base64');
                document.getElementById('msg2').innerHTML = 'Start uploading: ' + blob.name;
                uploader.send();
              };
              try {
                fileReader.readAsDataURL(blob);
              } catch (e) {
                alert(e);
              }
            };
          }(e.dataTransfer.files[i]), 100);
          break;
        default:
          alert('Only image file allowed.\nIncluding: jpeg, png, gif and bmp.');
          break;
        }
      }
    }
  }, false);

}