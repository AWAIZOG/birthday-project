const images = [
    "photos/img1.png",
    "photos/img1.png",
    "photos/img2.png",
    "photos/img2.png",
    "photos/img3.png",
    "photos/img3.png",
    "photos/img4.png",
    "photos/img4.png",
    "photos/img5.png",
    "photos/img5.png",
    "photos/img6.png",
    "photos/img6.png"
];

let board = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Shuffle
images.sort(() => Math.random() - 0.5);

// Create cards
images.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = img;

    card.innerHTML = `
        <div class="front">❤️</div>
        <div class="back">
            <img src="${img}">
        </div>
    `;

    card.addEventListener("click", flipCard);
    board.appendChild(card);
});

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.image === secondCard.dataset.image){
        matches++;
        resetBoard();

        if(matches === images.length / 2){

            burstConfetti();

            document.querySelectorAll(".card").forEach(card => {
                card.classList.add("win-card");
            });

            setTimeout(() => {
                document.getElementById("finalLove").classList.add("show");
            }, 1200);
        }
    }
    else{
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetBoard();
        }, 1000);
    }
}

function resetBoard(){
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function burstConfetti(){
    const container = document.getElementById("confetti-container");

    for(let i = 0; i < 120; i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = "50%";
        confetti.style.top = "50%";

        confetti.style.backgroundColor =
            `hsl(${Math.random()*360}, 100%, 70%)`;

        confetti.style.setProperty(
            "--x",
            `${(Math.random()-0.5)*1200}px`
        );

        confetti.style.setProperty(
            "--y",
            `${(Math.random()-0.5)*1200}px`
        );

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function goBack(){
    const params = new URLSearchParams(window.location.search);
    const returnPage = params.get("return");

    window.location.href = "html.html#" + returnPage;
}