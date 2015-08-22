<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />      
      <title>Demo Facebook API</title>      
      <script>
    //引入Facebook的API，需要修改的部分，就是把你在第一步取得的APP ID貼上去 
    window.fbAsyncInit = function() 
    {
      FB.init({
        appId      : '711890992205434',
        //cookie     : true,
        xfbml      : true,
        version    : 'v2.0'
      });

      FB.login(
        function(response)
        {
          if (response.authResponse) 
          {
              //alert("test");
          // implement here!
          }
        }, 
        {
          //scope : 'user_friends, read_friendlists, user_relationships, friends_relationships, email,publish_stream,user_about_me,user_likes,user_birthday,user_status'
          scope : 'user_friends'
        }
      );
    };

    (function(d, s, id) 
    {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      //js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=711890992205434";
      js.src = "//connect.facebook.net/zh_TW/all.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    //取得登入者的資料。
    function GetStatus()
    {
      var div = document.getElementById('me'),
      showMe = function(response) 
      {
        if (response.status !== 'connected') 
        {
          div.innerHTML = '<em>Not Connected</em>';
        } 
        else 
        {
          FB.api('/me', function(response) 
          {
            var html = '<table>';
            for (var key in response) {
              html += (
                '<tr>' +
                  '<th>' + key + '</th>' +
                  '<td>' + response[key] + '</td>' +
                '</tr>'
              );
            }
            html += '</table>';
            div.innerHTML = html;

          });

        }
      };
      
      FB.getLoginStatus
      (
        function(response) 
        {
          showMe(response);
          FB.Event.subscribe('auth.sessionChange', showMe);
        }
      );
    }

    //取得登入者的資料。
    function GetPermissions()
    {
      var div = document.getElementById('permissions'),
      showPermissions = function(response) 
      {
        if (response.status !== 'connected') 
        {
          div.innerHTML = '<em>Not Connected</em>';
        } 
        else 
        {
          FB.api('/me/permissions', function(response) 
          {
            var data = response.data;
            var html = '<table>';


            for (var key in data) {
              html += (
                '<tr>' +
                  '<th>' + data[key].permission + '</th>' +
                  '<td>' + data[key].status + '</td>' +
                '</tr>'
              );
            }
            html += '</table>';
            div.innerHTML = html;
          });

        }
      };
      
      FB.getLoginStatus
      (
        function(response) 
        {
          showPermissions(response);
          FB.Event.subscribe('auth.sessionChange', showPermissions);
        }
      );
    }

    function PostMessage()
    {
        var divs = document.getElementById('me'),
        PostMe = function(response) 
        {
            if (response.status !== 'connected') 
            {
              divs.innerHTML = '<em>Not Connected</em>';
            } 
            else 
            {
                FB.ui
                (
                  {
                   method: 'feed',
                   name: 'Charlesciaos',
                   caption: 'hello',
                   description: (
                      'description'
                   ),
                   link: 'http://charlesciaos.diskstation.me/',
                   picture: 'http://charlesciaos.diskstation.me/multiupload/Lighthouse.jpg'
                  },
                  function(response) 
                  {
                    if (response && response.post_id) {
                      alert('Post was published.');
                    } else {
                      alert('Post was not published.');
                    }
                  }
                );
            }
         };

      FB.getLoginStatus
      (
        function(response) 
        {
          PostMe(response);
          FB.Event.subscribe('auth.sessionChange', PostMe);
        }
      );

    }

    function LogoutFB()
    {

      FB.logout(function(response)
      {
        // user is now logged out
        alert("logout");
      });
    }

    function getFriendlist()
    {
      var fbLoaded = false;
      FB.getLoginStatus(function (response)
      {
          //var usession = response.session;
          if (response.status !== 'connected') 
          {
             alert("1000");
          }
          else
          //if (usession != null && !fbLoaded)
          {
              //var uid = "" + usession.uid;
              var uid = response.authResponse.userID;
              //fbLoaded = true;
              //$("#fblogin").hide();
              //$("#fblogout").show();
              //alert("response.authResponse.accessToken:" + response.authResponse.accessToken);
              alert("response.authResponse.userID:" + response.authResponse.userID);

              //alert("me: " + me());
              //var fql = "SELECT uid FROM user WHERE uid IN ( SELECT uid2 FROM friend WHERE uid1='"+ uid +"' )";
              var fql = "SELECT name, uid FROM user WHERE uid IN ( SELECT uid2 FROM friend WHERE uid1=" + response.authResponse.userID +" )";
              //var fql = "SELECT uid,pic_small FROM user WHERE uid='"+me() +"'";
              FB.api
              (
                  {
                    method: 'fql.query',
                    query: fql
                  }, 
                  function (result, fbex) 
                  {
                    /*if (fbex != null) 
                    {
                      //$("#fblogin").show();
                      //$("#fblogout").hide();
                      fbLoaded = false;
                      return;
                    }*/

                    var target = document.getElementById("friendlist");
                    //target.html('');

                    alert("result: " + result.length);
                    //取得要顯示API回傳資料的區塊                
                    for( i = 0, j = result.length; i < j; i++ )
                    {
                        /*if( result[i].pic_small === null || result[i].pic_small === '' )
                        {
                            result[i].pic_small = 'http://static.ak.fbcdn.net/pics/q_silhouette.gif';
                        }*/
                        //alert("result[i].pic_small: " + result[i].pic_small);
                        var html = '';
                        //html = '<img src="'+result[i].pic_small+'" longdesc="'+result[i].pic_small+'" onclick="getPicBigURL('+result[i].uid+')" />';
                        //$(html).appendTo(target);
                        target.appendChild(html);
                    }
                  }
                  /*function (rows) 
                  {
                    alert(JSON.stringify(rows));
                  }*/
              );
          }
          
      });
    }


    function initFriendsRelationShip(){
        FB.api('/me', function(response) 
        {
            //var data = response.data;
            /*for(var i =0; i < response.data.length; i++)
            {
              alert("response.data[i].permission: " + response.data[i].permission + " = " +response.data[i].status);

            }*/

            handelFriendList(response.gender);
        });
    };

    function handelFriendList(myGender) {
        FB.api('/me/friends', function(response) 
        {
            var data = response.data;
            alert("length:" + data.length + "\n"
                + "myGender:" + myGender);
            for ( var i = 0 ; i < data.length; i++) 
            {
                handleRelationship(data[i].id, myGender);
            }
            //FB.Canvas.setAutoResize();
        });
    };
    function handleRelationship(uid, myGender)
    {
        //alert("uid: " + uid);
        FB.api('/'+uid, function(response) 
        {

            var data = response.relationship_status;
            var friendGender = response.gender;
            //alert("friendGender: " + friendGender);
            /*if( myGender == friendGender )
            {
                return;
            }*/
 
            if(data)
            {
                alert("data:" + data);
                if( data == 'Single' || data == 'Separated')
                {
                    //insertToSingleFriendList(uid);
                } 
                else if( data == 'It\'s complicated' )
                {
                    //insertToComplicated(uid);
                }
            } 
            else 
            {
                //insertToUnkownFriendList(uid);
            }
            var target = document.getElementById('friendlist');
            var html = '';
            //html += '<div>'
            //html = '<img src="'+result[i].pic_small+'" longdesc="'+result[i].pic_small+'" onclick="getPicBigURL('+result[i].uid+')" />';
            //$(html).appendTo(target);
            //target.appendChild(html);

            //var html = '<table>';
            
            html = '<div>' +
                '<b>' + response.name + '</b>' +'   ' + response.gender +
              '</div>';
            
            //html += '</table>';
            target.innerHTML = html;
        });
    }

</script>
</head>
<body> 
<div id="fb-root"></div>
<!--<div class="fb-login-button" data-show-faces="true" data-scope="email,user_friends,user_checkins, read_friendlists, friends_relationships">使用Facebook帳號登入</div>-->
<!--<div class="fb-login-button" data-show-faces="true" data-scope="user_friends, read_friendlists, user_relationships, friends_relationships, email,publish_stream,user_about_me,user_likes,user_birthday,user_status">使用Facebook帳號登入</div>-->
<div class="fb-login-button" data-show-faces="true" data-scope="user_friends">使用Facebook帳號登入</div>


<hr/>
<input type="button" id="btn1" onClick="javascript:GetStatus();return false;" value="取得Facebook登入者資訊" text="1234" />
<div id="me">
</div>
<input type="button" id="btn6" onClick="javascript:GetPermissions();return false;" value="取得Facebook登入者權限" text="1234" />
<div id="permissions">
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
<br/>
<input type="button" id="btn2" onClick="javascript:PostMessage();return false;" value="貼文到Facebook塗鴉牆" text="1234" />
<div id ="friendlist"></div>
<br/>
<input type="button" id="btn3" onClick="javascript:initFriendsRelationShip();return false;" value="取得朋友列表" text="1234" />
<br/>
<input type="button" id="btn3" onClick="javascript:LogoutFB();return false;" value="LogoutFB" text="1234" />
</body>
</html>