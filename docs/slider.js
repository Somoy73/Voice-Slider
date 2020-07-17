var imgUrl = ["./images/1.jpg","./images/2.jpg","./images/3.jpg",
                "./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg"];
var index = 0;

function implementLeftButton(){
    var b1 = document.getElementById('nb1');
    b1.addEventListener('click',function(){
        let x= document.getElementById('imgsld1');
        index = (--index<0)? imgUrl.length-1:index;
        x.src = imgUrl[index]; 
    });
}
function implementRightButton(){
    var b2 = document.getElementById('nb2');
    b2.addEventListener('click',function(){
        let x = document.getElementById('imgsld1');
        index = (index+1) % imgUrl.length;
        x.src = imgUrl[index];
    });
}
implementLeftButton();
implementRightButton();