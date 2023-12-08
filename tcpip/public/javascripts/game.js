"use strict";

let socket = io();
let chatWindow = document.getElementById("chatWindow");
let sendButton = document.getElementById("chatMessageSendBtn");
let chatInput = document.getElementById("chatInput");

let content = document.getElementById("content");

let room;

let me;
let myName;
let myMessage;
let myLifeImg;
let myLife = 3;

let enemy;
let enemyName;
let enemyMessage;
let enemyLifeImg;
let enemyLife = 3;

let myTurn;
let sTurn = "user1";

let regex = /^[ㄱ-ㅎ|가-힣]+$/;

function checkTurn() {
  if (myTurn == sTurn) {
    chatInput.disabled = false;
    sendButton.disabled = false;
  } else {
    chatInput.disabled = true;
    sendButton.disabled = true;
  }
}

function checkMyLife() {
  if (myLife == 3) myLifeImg.src = "images/3heart.png";
  else if (myLife == 2) myLifeImg.src = "images/2heart.png";
  else if (myLife == 1) myLifeImg.src = "images/1heart.png";
  else myLifeImg.src = "images/0heart.png";
}

function checkEnemyLife() {
  if (enemyLife == 3) enemyLifeImg.src = "images/3heart.png";
  else if (enemyLife == 2) enemyLifeImg.src = "images/2heart.png";
  else if (enemyLife == 1) enemyLifeImg.src = "images/1heart.png";
  else enemyLifeImg.src = "images/0heart.png";
}
////////////////////////////////////////// socket.io 접속 //////////////////////////////////////////
socket.on("connect", () => {
  room = prompt("게임을 시작할 방 번호를 입력해주세요.", "");
  myName = prompt("이름을 입력해주세요.", "");
  if (room || myName) socket.emit("join", { room, myName });
});

socket.on("room_already_full", () => {
  alert("방이 꽉찼습니다.");
  room = prompt("게임을 시작할 방 번호를 입력해주세요.", "");
  socket.emit("join", { room, myName });
});

socket.on("name_already_used", () => {
  alert("해당 방에서 이미 사용중인 이름입니다.");
  myName = prompt("이름을 입력해주세요.", "");
  socket.emit("join", { room, myName });
});

socket.on("joinP1", (data) => {
  content.disabled = true;
  myTurn = data.turn;
  console.log(myTurn);
  document.getElementById("asdf").innerHTML = "상대를 기다리는 중...";
  me = document.getElementById("p1_name");
  myMessage = document.getElementById("p1_text");
  myLifeImg = document.getElementById("p1_life");
  enemy = document.getElementById("p2_name");
  enemyMessage = document.getElementById("p2_text");
  enemyLifeImg = document.getElementById("p2_life");
  me.innerHTML = myName;
});

socket.on("disconnect", () => {
  location.href = "/game";
});

socket.on("joinP2", (data) => {
  myTurn = data.turn;
  enemyName = data.enemyName;
  console.log(myTurn);

  checkTurn();

  me = document.getElementById("p2_name");
  myMessage = document.getElementById("p2_text");
  myLifeImg = document.getElementById("p2_life");
  enemy = document.getElementById("p1_name");
  enemyMessage = document.getElementById("p1_text");
  enemyLifeImg = document.getElementById("p1_life");

  me.innerHTML = myName;
  enemy.innerHTML = enemyName;
});

socket.on("p2Connected", (data) => {
  document.getElementById("asdf").innerHTML = "";
  content.disabled = false;
  enemyName = data.enemyName;
  enemy.innerHTML = enemyName;
  checkTurn();
});
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// 메세지 송수신(게임) //////////////////////////////////////////
socket.on("message", (data) => {
  sTurn = data.turn;

  let message = data.message;
  if (sTurn == myTurn) {
    enemyMessage.innerHTML = message;
  } else {
    myMessage.innerHTML = message;
  }

  checkTurn();
});
socket.on("word_wrong", () => {
  if (--myLife > 0) {
    checkMyLife();
    alert(`단어가 올바르지 않습니다. 기회가 ${myLife}번 남았습니다.`);
  } else {
    checkMyLife();
    alert(`단어가 올바르지 않습니다. 기회가 ${myLife}번 남았습니다.`);
    location.href = "/game";
  }
});

socket.on("word_already_used", () => {
  if (--myLife > 0) {
    checkMyLife();
    alert(`이미 사용된 단어입니다. 기회가 ${myLife}번 남았습니다.`);
  } else {
    checkMyLife();
    alert(`기회가 ${myLife}번 남았습니다. 게임에서 패배하셨습니다.`);
    document.getElementById("in_game").style.display = "none";
    document.getElementById("result").innerHTML = "패배";
    socket.emit("end_disconnect");
    // location.href = "/game";
  }
});

sendButton.addEventListener("click", function () {
  let message = chatInput.value;
  if (message == "") {
    alert("단어를 입력하세요ç.");
  }
  if (!regex.test(message)) {
    alert("단어는 한글로 이루어져 있어야 합니다.");
    return;
  }
  if (message.length < 2) {
    alert("단어는 두 글자 이상 입력해야합니다.");
    return;
  }
  if (!message.search(/\s/)) {
    alert("단어에 공백을 포함할 수 없습니다.");
    return;
  }
  socket.emit("message", message);

  chatInput.value = "";
});

socket.on("enemy_disconnect", () => {
  alert("상대와 연결이 끊겼습니다.");
  location.href = "/game";
});
socket.on("enemyLifeDown", () => {
  if (--enemyLife > 0) {
    checkEnemyLife();
  } else {
    checkEnemyLife();
    alert("상대의 기회가 모두 소진되었습니다. 게임에서 승리하셨습니다.");
    document.getElementById("in_game").style.display = "none";
    document.getElementById("result").innerHTML = "승리";
    socket.emit("end_disconnect");
  }
});
