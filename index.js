const correctPassword = "3006";

function addNum(num){
    document.getElementById("display").value += num;
}

function clearPass(){
    document.getElementById("display").value = "";
}

function checkPass(){
    const entered = document.getElementById("display").value;

    if(entered === correctPassword){

        // reset opened gifts when starting fresh
        localStorage.clear();

        showPage("page2");
    }
    else{
        alert("Wrong Password!");
        clearPass();
    }
}

// Page switching function
function showPage(pageId){
    let pages = document.querySelectorAll(".page");

    // hide all pages
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // pause all videos
    document.querySelectorAll("video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    // show selected page
    document.getElementById(pageId).classList.add("active");

    // play only videos inside active page
    let activeVideos = document
        .getElementById(pageId)
        .querySelectorAll("video");

    activeVideos.forEach(video => {
        video.play();
    });
}

// skyshots button display
 setTimeout(() => {
            document.getElementById("btn").style.display = "block";
        }, 30000);

// wishing video
 setTimeout(() => {
            document.getElementById("btn2").style.display = "block";
        }, 29000);




// page 4 gift section
function openGift(box, target){
    // change clicked div image
    box.style.backgroundImage = "url('photos/giftopen.png')";
localStorage.setItem(box.id, "opened");
    setTimeout(() => {
        if(target.endsWith(".html")){
            // open separate file
           window.location.href = target + "?return=page4";
        } else {
            // open page inside same file
            showPage(target);
        }
    }, 500);
}

window.onload = function(){
    if(window.location.hash){
        showPage(window.location.hash.substring(1));
    }

    document.querySelectorAll(".gift").forEach(gift => {
        if(localStorage.getItem(gift.id) === "opened"){
            gift.style.backgroundImage = "url('photos/giftopen.png')";
        }
    });
}



