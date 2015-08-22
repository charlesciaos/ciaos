<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />     
      <title>Demo Facebook API</title>     
      <script>
    //引入Facebook的API，需要修改的部分，就是把你在第一步取得的APP ID貼上去
    (function(d, s, id)
    {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=711890992205434";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

//取得登入者的資料。
function GetStatus()
{
  var div = document.getElementById('me'),
  showMe = function(response) {
    if (response.status !== 'connected')
    {
      div.innerHTML = '<em>Not Connected</em>';
    }
    else
    {
      FB.api('/me', function(response) {
        var html = '<table>';
        for (var key in response) {
          html += (
            '<tr>' +
              '<th>' + key + '</th>' +
              '<td>' + response[key] + '</td>' +
            '</tr>'
          );
        }
        div.innerHTML = html;
      });
    }
  };
 
  FB.getLoginStatus(function(response)
  {
    showMe(response);
    FB.Event.subscribe('auth.sessionChange', showMe);
  });
}

</script>
</head>
<body> 
<div id="fb-root"></div>
<div class="fb-login-button" data-show-faces="true" data-scope="email,user_checkins">使用Facebook帳號登入</div>
<hr/>
<input type="button" id="btn1" onClick="javascript:GetStatus();return false;" value="取得Facebook登入者資訊" text="1234" />
<div id="me">
</div>

<div id="fb_recommend" style="float:left">
FB推薦載入中&nbsp;&nbsp;
</div>
<script type="text/javascript">
var myx=location.href;
var myy=myx.split("#");
var myfb_recommend=document.getElementById("fb_recommend");
    myfb_recommend.innerHTML='<div id="fb-root"></div><fb:like action="recommend" font="arial" href="http://charlesciaos.diskstation.me/" layout="button_count" send="true" show_faces="true" width="450"></fb:like>';
</script>

</body>
</html>
