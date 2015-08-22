var ServerURL = "http://charlesciaos.diskstation.me/api/DemoPhotoBrowserJSON.php";
var RootURL = "http://charlesciaos.diskstation.me";

var bg;
function resizeTo()
{
    bg.setSize();
}

function NextPic(idx, length)
{
    idx++;
    if(idx>=length)
    {
        return 0;
    }
    return idx;
}

function PrePic(idx, length)
{
    idx--;
    if(idx<0)
    {
        return length-1;
    }
    return idx;
}

var nCurDisplayIdx = 6;
var img01 = new Image();
var img02 = new Image();
var img03 = new Image();
var imgSrcs = [];/*["res/wallpaper/01.jpg",
               "res/wallpaper/02.jpg",
               "res/wallpaper/03.jpg",
               "res/wallpaper/04.jpg",
               "res/wallpaper/05.jpg",
               "res/wallpaper/06.jpg",
               "res/wallpaper/07.jpg"];   // array of URLs*/
var nImageNumber; //imgSrcs.length;
function onLoadInit()
{
    console.log("onLoadInit Start");

    var photoJSON = getTextSync(ServerURL);
    console.log("load JSON: " + photoJSON);
    var photoList = JSON.parse( photoJSON );
    
    console.log(photoList);
    console.log(photoList.photo);
    console.log(photoList.photo.length);
    nImageNumber = photoList.photo.length;
    
    console.log(nImageNumber);
    
    var i =0
    for(i = 0; i< photoList.photo.length; i++)
    {
        imgSrcs[i] = RootURL + photoList.photo[i].photoPath.substr(2);
    }
    console.log(imgSrcs);

    var div_background = document.getElementById("background"); 
    //div_background.innerHTML = "<img src='res/wallpaper/MarcPerrella.jpg'>";
    //bg = new fit(div_background,1680,945);

    //new addEvent(window, "resize", resizeTo);
 
    //var div_current = document.getElementById("preload-01"); 
    //div_current.style.width =    window.innerWidth + "px";
    //div_current.style.height =   (768 * window.innerWidth / 1024 ) + "px";
    //div_current.style.top =  100 + "px";
    //div_current.style.left =  200 + "px";

    //var myImages = [], img;  

    img01.onload = function() 
    {
        // decide which object on the page to load this image into
        // this part of the code is missing because you haven't explained how you
        // want it to work
        var div01 = document.getElementById('divDisplay');
        div01.style.backgroundImage = "url(" + this.src + ")";
    };
    img01.src = imgSrcs[nCurDisplayIdx];


    img02.onload = function() 
    {
        // decide which object on the page to load this image into
        // this part of the code is missing because you haven't explained how you
        // want it to work
        document.getElementById('divDisplayLBuffer').style.backgroundImage = "url(" + this.src + ")";
    };
    img02.src = imgSrcs[PrePic(nCurDisplayIdx, nImageNumber)];


    img03.onload = function() 
    {
        // decide which object on the page to load this image into
        // this part of the code is missing because you haven't explained how you
        // want it to work
        document.getElementById('divDisplayRBuffer').style.backgroundImage = "url(" + this.src + ")";
    };
    img03.src = imgSrcs[NextPic(nCurDisplayIdx, nImageNumber)];

    var divDisplayCurr = document.getElementById("divDisplay");
    divDisplayCurr.onmouseover = function()
    {
        console.log(this+"mouseover");
        StackToTop("divDisplay");
    }
    divDisplayCurr.onmouseout = function()
    {
        console.log(this+"mouseout");
        StackToBottom("divDisplay");
    }

    var divDisplayL = document.getElementById("divDisplayLBuffer");
    divDisplayL.onmouseover = function()
    {
        console.log(this+"mouseover");
        StackToTop("divDisplayLBuffer");
    }
    divDisplayL.onmouseout = function()
    {
        console.log(this+"mouseout");
        StackToBottom("divDisplayLBuffer");
    }

    var divDisplayR = document.getElementById("divDisplayRBuffer");
    divDisplayR.onmouseover = function()
    {
        console.log(this+"mouseover");
        StackToTop("divDisplayRBuffer");
    }
    divDisplayR.onmouseout = function()
    {
        console.log(this+"mouseout");
        StackToBottom("divDisplayRBuffer");
    }
    
    var divBtnPre = document.getElementById("divBtnPre");
    divBtnPre.onclick = function()
    {
        console.log(this+"onclick" + nCurDisplayIdx);
        nCurDisplayIdx = PrePic(nCurDisplayIdx, nImageNumber);
        RefreshPhoto();
    }
    divBtnPre.onmouseover = function()
    {
        console.log(this+"divBtnPre onmouseover");
        this.style.boxShadow="-4px -4px 3px rgba(0, 0, 0, 0.2) inset";
        this.style.backgroundColor="rgba(255, 255, 255, 0.3)";
    }
    divBtnPre.onmouseout = function()
    {
        this.style.boxShadow="none";
        this.style.backgroundColor="rgba(255, 255, 255, 0)";
    }

    var divBtnNext = document.getElementById("divBtnNext");
    divBtnNext.onclick = function()
    {
        console.log(this+"onclick" + nCurDisplayIdx);
        nCurDisplayIdx = NextPic(nCurDisplayIdx, nImageNumber);
        RefreshPhoto();
    }
    divBtnNext.onmouseover = function()
    {
        this.style.boxShadow="4px 4px 3px rgba(0, 0, 0, 0.2) inset";
        this.style.backgroundColor="rgba(255, 255, 255, 0.3)";
    }
    divBtnNext.onmouseout = function()
    {
        this.style.boxShadow="none";
        this.style.backgroundColor="rgba(255, 255, 255, 0)";
    }
    var jsonString = '                          \
    {                                           \
      "orderID": 12345,                         \
      "shopperName": "John Smith",              \
      "shopperEmail": "johnsmith@example.com",  \
      "contents": [                             \
        {                                       \
          "productID": 34,                      \
          "productName": "SuperWidget",         \
          "quantity": 1                         \
        },                                      \
        {                                       \
          "productID": 56,                      \
          "productName": "WonderWidget",        \
          "quantity": 3                         \
        }                                       \
      ],                                        \
      "orderCompleted": true                    \
    }                                           \
    ';
     
    var cart = JSON.parse ( jsonString );
    console.log(cart);
    console.log( cart.shopperEmail );
    console.log( cart.contents[1].productName );

    /*document.ready = function()
    {
        //執行 getData();
        getData();       
    };*/

}

//定義 getData Function
function getData()
{
    console.log(this+"getData");
    /*$.getJSON('data.json', function(data) 
    {        
           //取得 json 取得所有的 dataset
            wishes = data.dataset;
             
            //取得 wish 數量
            var length = wishes.length;
 
            //在前台呈現所有的 wish
            for( var i = length; i >0; i-- ){
                $('.wish-pool').append('<div class="wish">'+wishes[i-1]+'</div>');
            }
        });*/
};

function RefreshPhoto()
{
    img01.src = imgSrcs[nCurDisplayIdx];
    img02.src = imgSrcs[PrePic(nCurDisplayIdx, nImageNumber)];
    img03.src = imgSrcs[NextPic(nCurDisplayIdx, nImageNumber)];
}

function StackToTop(elemId)
{
    var temp = document.getElementById(elemId);
    temp.style.zIndex = 100000;
}
function StackToBottom(elemId)
{
    var temp = document.getElementById(elemId);
    temp.style.zIndex = 0;
}

window.addEventListener('load', onLoadInit);

