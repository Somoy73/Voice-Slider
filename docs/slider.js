//Image Variables
var imgUrl = ["./images/1.jpg","./images/2.jpg","./images/3.jpg",
                "./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg"];
var images = [];
var index = 0,flag = false;

//Buttons
const vButton = document.getElementById('speech');
const b1 = document.getElementById('nb1');
const b2 = document.getElementById('nb2');

//Variables for Speech Recognition
var rec;
const probability = 0.3;

function createRec(){
    try{
        rec = new webkitSpeechRecognition();
    }catch(e){
        alert('voice initialization failed. This will only work in Chromium Browsers!');
    }
}
createRec();

//Preloading Images for a smoother Experience.
function preloadImages(){
    for(i = 0; i<imgUrl.length; ++i){
        images[i] = new Image();
        images[i].src = imgUrl[i];
        images[i].className="imageSlider";
        images[i].id='imgsld1';
        images[i].alt="loading...";
    }
}
preloadImages();

//Implementing Button Properties
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
        if(!flag){
            vButton.innerHTML = "Stop";
            vButton.style = "background-color: rgba(235, 62, 32, 0.815);";
            flag = true;
            audioCommandStart();
        }else if(flag){
            vButton.innerHTML = "Start";
            vButton.style = "background-color: rgba(32, 235, 140, 0.815);";
            flag = false;
            audioCommandStop();
        }
    });
}

function imageJump(val){
    let x = document.getElementById('imgsld1');
    index = val;
    x.parentNode.replaceChild(images[val],x);
}

rec.onresult = function(e){
    for(var i = e.resultIndex; i<e.results.length; ++i){
        if(e.results[i].isFinal){
            let x = e.results[i].length;
            for(let j=0; j<x; ++j){
                if(parseFloat(e.results[i][j].confidence)>=parseFloat(probability)){
                    var str = e.results[i][j].transcript;
                    str = str.toLowerCase();
                    console.log(str);
                    vButton.innerHTML = str + ".." ;
                    if(str.includes('next')){
                        b2.click();
                        break;
                    }else if(str.includes('prev') || str.includes('back')){
                        b1.click();
                        break;
                    }else if(str.includes('stop')){
                        vButton.click();
                        break;
                    }else if(str.includes('last')){
                        imageJump(imgUrl.length-1);
                        break;
                    }else if(str.includes('first')){
                        imageJump(0);
                        break;
                    }
                }
            }
        }
    }
}

function audioCommandStart(){
    rec.continuous = true;
    rec.languge = 'en';
    rec.start();
}

function audioCommandStop(){
    rec.stop();
}

implementLeftButton();
implementRightButton();
implementVoiceButton();