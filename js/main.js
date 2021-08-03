'use strict'

var gCurrLevel = 16;
var gNextNum;
var gNums;
var gStartTime;
var gTimerInterval;
var gNumsLength;
var gLevel = { easy: 16, hard: 25, extreme: 36 };
var gMove = new Audio('/sound/move.mp3')
var gWin = new Audio('/sound/win.mp3')
var gLevelSound = new Audio('/sound/level.wav')
var gPlayAgain = new Audio('/sound/playAgain.wav')

function startTime() {
    gStartTime = Date.now();
    var elTimer = document.querySelector('.timer span');
    gTimerInterval = setInterval(function () {
        var passedSeconds = (Date.now() - gStartTime) / 1000;
        elTimer.innerText = passedSeconds.toFixed(3);
    }, 100);
}

function init() {
    gNextNum = 1;
    if (gTimerInterval) clearInterval(gTimerInterval)
    gNums = getBoardNums();
    gNumsLength = gNums.length;
    renderBoard();
    var elBtnPlay = document.querySelector('.play');
    document.querySelector('.timer span').innerText = '00.000';
    elBtnPlay.style.visibility = 'hidden'
}

function onStartOver() {
    gPlayAgain.play();
    var elBtnPlay = document.querySelector('.play')
    elBtnPlay.style.visibility = 'hidden'
    init();
}

function renderBoard() {
    var size = Math.sqrt(gNums.length);
    //creating a table with string
    var strHTML = '';
    for (var i = 0; i < size; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < size; j++) {
            var num = drawNum();
            strHTML += `<td onclick="onCellClicked(this,${num})">${num}</td>\n`
        }
        strHTML += `<tr>\n`;
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function onLevelClicked(ev) {
    gLevelSound.play();
    var btnName = ev.target.id;
    gCurrLevel = gLevel[btnName];
    init();
}

function onCellClicked(elCell, cellNum) {
    //when player click a number count the number and mark it
    if (cellNum === gCurrLevel && cellNum === gNextNum) {
        var elBtnPlay = document.querySelector('.play')
        elBtnPlay.style.visibility = 'visible'
        gWin.play();
    }
    if (cellNum === gNextNum) {
        elCell.style.backgroundColor = 'green'
        // elCell.style.border = '2px solid white'
        elCell.style.color = 'white'
        gMove.play();
        gNextNum++
    }
    if (+elCell.innerText === gNumsLength) {
        clearInterval(gTimerInterval);
    }
    if (cellNum === 1) startTime();
}

function resetNums() {
    gNums = getBoardNums();
}

function drawNum() {
    var currNum = gNums.splice(getRandomInt(0, gNums.length), 1);
    return currNum[0];
}
