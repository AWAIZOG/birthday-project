const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const countdown = document.getElementById("countdown");
const filter = document.getElementById("filter");
const startBtn = document.getElementById("startBtn");
const printBtn = document.getElementById("printBtn");
const downloadBtn = document.getElementById("downloadBtn");
const output = document.getElementById("output");
const flash = document.getElementById("flash");

let photos = [];

navigator.mediaDevices.getUserMedia({video:true})
.then(stream=>{
    video.srcObject = stream;
});

filter.addEventListener("change",()=>{
    video.style.filter = filter.value;
});

startBtn.addEventListener("click", startSession);
printBtn.addEventListener("click", printStrip);
downloadBtn.addEventListener("click", downloadStrip);

function startSession(){
    photos = [];
    startBtn.disabled = true;
    printBtn.style.display = "none";
    downloadBtn.style.display = "none";
    output.innerHTML = "";

    let count = 3;
    countdown.innerText = count;

    let timer = setInterval(()=>{
        count--;
        if(count > 0){
            countdown.innerText = count;
        }else{
            clearInterval(timer);
            countdown.innerText = "";
            autoCapture();
        }
    },1000);
}

async function autoCapture(){
    for(let i=0;i<4;i++){
        // countdown.innerText = `📸 ${i+1}/4`;
        await delay(1200);
        capturePhoto();
        await delay(1000);
    }

    countdown.innerText = "";
    printBtn.style.display = "block";
    startBtn.disabled = false;
}

function capturePhoto(){
    flash.classList.add("active");

    setTimeout(()=>{
        flash.classList.remove("active");
    },250);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.filter = filter.value;
    ctx.drawImage(video,0,0);

    photos.push(canvas.toDataURL("image/png"));
}

function printStrip(){
    output.innerHTML = "";

    let strip = document.createElement("div");
    strip.className = "photo-strip";

    photos.forEach(photo=>{
        let img = document.createElement("img");
        img.src = photo;
        strip.appendChild(img);
    });

    output.appendChild(strip);

    output.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

    setTimeout(()=>{
        strip.classList.add("print");
    },100);

    setTimeout(()=>{
        downloadBtn.style.display = "block";
    },4000);
}

function downloadStrip(){
    const stripCanvas = document.createElement("canvas");
    const stripCtx = stripCanvas.getContext("2d");

    stripCanvas.width = 220;
    stripCanvas.height = photos.length * 170;

    let loaded = 0;

    photos.forEach((photo,index)=>{
        const img = new Image();
        img.src = photo;

        img.onload = ()=>{
            stripCtx.drawImage(img,0,index*170,220,160);
            loaded++;

            if(loaded === photos.length){
                const link = document.createElement("a");
                link.download = "photo-strip.png";
                link.href = stripCanvas.toDataURL("image/png");
                link.click();
            }
        };
    });
}

function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function goBack(){
    const params = new URLSearchParams(window.location.search);
    const returnPage = params.get("return");

    window.location.href = "html.html#" + returnPage;
}