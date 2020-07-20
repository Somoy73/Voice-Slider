var imgUrl = ["./images/1.jpg","./images/2.jpg","./images/3.jpg",
                "./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg"];
var index = 0;

const vButton = document.getElementById('speech');
const b1 = document.getElementById('nb1');
const b2 = document.getElementById('nb2');
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
            audioCommandStart();
        }else if(string.includes('Stop')){
            vButton.innerHTML = "Start";
            vButton.style = "background-color: rgba(32, 235, 140, 0.815);";
            audioCommandStop();
        }
    });
}
function imageJump(val){
    let x = document.getElementById('imgsld1');
    index = val;
    x.src = imgUrl[index];
}

rec.onresult = function(e){
    for(var i = e.resultIndex; i<e.results.length; ++i){
        if(e.results[i].isFinal){
            let x = e.results[i].length;
            for(let j=0; j<x; ++j){
                if(parseFloat(e.results[i][j].confidence)>=parseFloat(probability)){
                    var str = e.results[i][j].transcript;
                    console.log(str);
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