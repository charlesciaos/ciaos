<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>上傳檔案</title>
<link rel="stylesheet" type="text/css" href="css/upload.css">
<script type="text/javascript" src="js/upload.js"></script>
</head>

<body>

<form id="form1" enctype="multipart/form-data">
<div class="row">
    <label for="fileToUpload">Select a File to Upload</label>
    <br><br>
    <input type="file" name="fileToUpload" id="fileToUpload" multiple="multiple" onchange="fileSelected();"/>
</div>

<div id="fileName"></div>
<div id="fileSize"></div>
<div id="fileType"></div>
<div class="row">
    <input type="button" value="Upload" onclick="uploadFile()" />
</div>
<div id="progressNumber"></div>

</form>

</body>
</html>
