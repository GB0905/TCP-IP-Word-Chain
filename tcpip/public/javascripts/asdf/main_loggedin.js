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
