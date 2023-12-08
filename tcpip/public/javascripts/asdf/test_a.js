document.addEventListener("DOMContentLoaded", () => {
  let number = parseInt(prompt("몇 명이서 참가하시나요?")); // 몇명 참가하는지?
  const order = document.querySelector("#order"); // n번째 참가자 창
  const word = document.querySelector("#word"); // 제시어 생기는 창
  const input = document.querySelector("#input"); //typeof => String // 제시어 입력하는 창
  const button = document.querySelector("#button"); //입력 버튼
  let i = 1;
  const regex = /^[ㄱ-ㅎ|가-힣]+$/; // 입력값에 한글만 받도록 하기

  //프롬트창에서 숫자가 아닌 값을 받을때, 다시 띄울 창
  while (isNaN(number)) {
    number = parseInt(prompt("숫자를 입력하세요"));
  }

  button.addEventListener("click", () => {
    let inputWord = document.getElementById("input").value; // 인풋에 받는 값
    if (regex.test(inputWord) == false) {
      // 입력값이 문자열이 아니라면
      alert("단어를 다시 입력하세요" + i++ + "/ 3");
      input.value = "";
      if (i > 3) {
        alert("값을 잘못 입력하셨습니다. 게임이 끝났습니다."); // 아예 창이 아무것도 안뜨게 하기
      }
    } else {
      // 입력값이 제대로 입력됐다면
      // 입력받았던 값의 끝글자와 입력값의 첫글자가 이어진다면

      word.append(inputWord);
      input.value = "";
      const lastWord = document.getElementById("word").innerHTML;
    }
  });
});
