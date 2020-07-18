var imgUrl = ["./images/1.jpg","./images/2.jpg","./images/3.jpg",
                "./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg"];
var index = 0;

const vButton = document.getElementById('speech');
const b1 = document.getElementById('nb1');
const b2 = document.getElementById('nb2');


function implementLeftButton(){
    b1.addEventListener('click',function(){
        let x= document.getElementById('imgsld1');
        index = (--index<0)? imgUrl.length-1:index;
        x.src = imgUrl[index]; 
    });
}
function implementRightButton(){
    
    b2.addEventListener('click',function(){
        let x = document.getElementById('imgsld1');
        index = (index+1) % imgUrl.length;
        x.src = imgUrl[index];
    });
}
function implementVoiceButton(){
    vButton.addEventListener('click',function(){
        let string = vButton.innerHTML;
        if(string.includes('Start')){
            vButton.innerHTML = "Stop";
            vButton.style = "background-color: rgba(235, 62, 32, 0.815);";
        }else if(string.includes('Stop')){
            vButton.innerHTML = "Start";
            vButton.style = "background-color: rgba(32, 235, 140, 0.815);";
        }
    });
}
implementLeftButton();
implementRightButton();
implementVoiceButton();
