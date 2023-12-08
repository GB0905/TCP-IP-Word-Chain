function openPop_makeroom() {
  document.getElementById("popup_makeroom").style.display = "block";
  showPopBlur(true);
}

function closePop_makeroom() {
  document.getElementById("popup_makeroom").style.display = "none";
  showPopBlur(false);
}

function openPop_login() {
  document.getElementById("popup_login").style.display = "block";
  showPopBlur(true);
}

function closePop_login() {
  document.getElementById("popup_login").style.display = "none";
  showPopBlur(false);
}

function openPop_signup() {
  closePop_login();
  document.getElementById("popup_signup").style.display = "block";
  showPopBlur(true);
}

function closePop_signup() {
  document.getElementById("popup_signup").style.display = "none";
  showPopBlur(false);
}

function showPopBlur(chk) {
  if (chk == false) {
    document.getElementById("content").style.opacity = 1;
    document.getElementById("content").style.pointerEvents = "auto";
  } else {
    document.getElementById("content").style.opacity = 0.3;
    document.getElementById("content").style.pointerEvents = "auto";
  }
}

// 로그인  ///////////////////////////////////////////////////////////////////////////
const lg_id = document.getElementById("lg_id");
const lg_pw = document.getElementById("lg_pw");
const lg_btn = document.getElementById("lg_login");

lg_btn.addEventListener("click", (e) => {
  // 아이디 입력여부 검사
  // let id = document.getElementById("id");
  if (!lg_id.value || !lg_pw.value) {
    alert("아이디, 비밀번호를 입력해주세요");
    // id.focus();
    return;
  }
  const request = {
    id: lg_id.value,
    pw: lg_pw.value,
  };
  console.log(request);

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        location.href = "";
      } else {
        alert(response.message);
      }
    });
});
//////////////////////////////////////////////////////////////////////////////////////
// 회원가입  ///////////////////////////////////////////////////////////////////////////
const btn_signup = document.getElementById("_submit");
const id = document.getElementById("id");
const pw = document.getElementById("pw");
const pw1 = document.getElementById("pw1");
const name = document.getElementById("name");
const btn_checkid = document.getElementById("check_id");

btn_signup.addEventListener("click", (e) => {
  // function sendIt() {

  // 비밀번호 불일치
  if (pw.value == "") {
    alert("비밀번호를 입력하지 않았습니다.");
    pw.focus();
    return;
  }
  if (pw.value != pw1.value || pw1.value == "") {
    alert("비밀번호를 확인해주세요.");
    pw.focus();
    return;
  }
  // 이름 입력
  if (name.value == "") {
    alert("이름을 입력하지 않았습니다.");
    name.focus();
    return;
  }
  // 아이디 중복 검사
  if (!id.readOnly) {
    alert("아이디 중복 검사를 진행해주세요.");
    return;
  }

  const request = {
    id: id.value,
    pw: pw.value,
    name: name.value,
  };
  console.log(request);

  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        alert("회원가입에 성공했습니다. 로그인 화면으로 이동합니다.");
        closePop_signup();
        openPop_login();
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
});

id.addEventListener("click", (e) => {
  let text = document.getElementById("_idoverlap");
  text.innerText = "";
  document.getElementById("id").readOnly = false;
});

btn_checkid.addEventListener("click", (e) => {
  const request = {
    id: id.value,
  };
  console.log(request);

  fetch("/check_id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.success) {
        document.getElementById("_idoverlap").innerHTML = response.message;
        id.readOnly = true;
      } else {
        document.getElementById("_idoverlap").innerHTML = response.message;
      }
    });
});

document.getElementById("_cancel").addEventListener("click", (e) => {
  closePop_signup();
});
