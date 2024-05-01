let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "blue"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");


document,addEventListener("keydown", function() {
    // console.log("game started");
    if(started == false) {
        started = true;
        console.log("Game Started");
        levelUp();
    }
    // started = true;
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    // console.log(`randIdx = ${randIdx}`);
    // console.log(`randCol = ${randCol}`);
    // console.log(`randCol = ${randBtn}`);

    gameSeq.push(randCol);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log("current level", level);
    // let idx = level - 1;
    if (userSeq[idx] == gameSeq[idx]) {
        // console.log("same value");
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if(highestScore <= level) {
            highestScore = level;
        }
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Highest score = ${highestScore} <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}