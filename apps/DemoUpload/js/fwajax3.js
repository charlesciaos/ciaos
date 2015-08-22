function fwH5AjaxUploader(host, cb)
{
  var req = function()
  {
    try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0") }catch(e){}
    try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0") }catch(e){}
    try{ return new ActiveXObject("Msxml2.XMLHTTP") }catch(e){}
    try{ return new ActiveXObject("Microsoft.XMLHTTP") }catch(e){}
    try{ return new XMLHttpRequest();} catch(e){}
    return null;
  }(),

  boundary = function ()
  {
    var tmp = Math.random();
    var thisDate = new Date();
    tmp = Math.abs(tmp*thisDate.getTime());
    tmp = "--------" + tmp + "--------";
    return tmp;
  }(),

//the format of _value argument should be {'name':'filename','type':'file mine type string', 'data':'file data in Data URL format'}
  createFile = function (_field, _value, _encoding)
  {
    var tmp = "--" + boundary + CRLF;
    tmp += "Content-Disposition: attachment; name=\"" + _field + "\"; filename=\"" + _value.name + "\"" + CRLF;
    tmp += "Content-Type: " + _value.type + CRLF;
    tmp += "Content-Transfer-Encoding: " + _encoding + CRLF + CRLF;
    tmp += _value.data + CRLF;
    tmp += "--" + boundary + "--" + CRLF + CRLF;
    return tmp;
  },

  createField = function (_field, _value)
  {
    var tmp = "--" + boundary + CRLF;
    tmp += "Content-Disposition: form-data; name=\"" + _field + "\"" + CRLF;
    tmp += "Content-Transfer-Encoding: binary" + CRLF + CRLF;
    tmp += _value + CRLF
    tmp += "--" + boundary + "--" + CRLF + CRLF;
    return tmp;
  },

  fields = [],
  files = [],
  CRLF = "\r\n";
  req.onreadystatechange = function()
  {
    if(req.readyState == 4)
    {
      if(req.status == 200)
      {
        cb(req.responseText, req.responseXML);
      }
    }
  };

  this.addFile = function(_field, _value, _encoding)
  {
    files.push([_field, _value, _encoding]);
  };

  this.removeFile = function(_field)
  {
    for (var i=0; i<files.length; i++) {
      if (files[i][0] == _field) {
        files.splice(i,1);
      }
    }
  };

  this.clearFile = function()
  {
    files = [];
  };

  this.addField = function(_field, _value)
  {
    fields.push([_field, _value]);
  };

  this.removeField = function(_field)
  {
    for (var i=0; i<fields.length; i++)
    {
      if (fields[i][0] == _field)
      {
        fields.splice(i,1);
      }
    }
  };

  this.clearField = function () {
    fields = [];
  };

  this.send = function()
  {
    req.open("POST", host, true);
    var msgBody = "";
    for (var i=0; i<fields.length; i++)
    {
      msgBody += createField(fields[i][0], fields[i][1]);
    }
    for (var i=0; i<files.length; i++)
    {
      msgBody += createFile(files[i][0], files[i][1], files[i][2]);
    }
    req.setRequestHeader("Content-Type","multipart/form-data; boundary="+boundary);
//    req.setRequestHeader("Connection","Keep-Alive");
//    req.setRequestHeader("Content-Length",msgBody.length);
    req.send(msgBody);
  };
}