const pageLoginEl = document.querySelector(".page-login"),
  userNameEl = pageLoginEl.querySelector(".user-name"),
  welcomeEl = pageLoginEl.querySelector(".welcome"),
  dpUserNameEl = pageLoginEl.querySelector(".dp-user-name"),
  formEl = pageLoginEl.querySelector("form"),
  loginBtn = pageLoginEl.querySelector(".login-btn");
const LS_USER_NAME = "user_name";
const USER_NAME = getLocalStorage(LS_USER_NAME);

/**
 * 기존 사용자와 신규 사용자의 화면 분기
 */
function displayLoginForm() {
  if (USER_NAME) {
    dpUserNameEl.innerText = USER_NAME;
    removeClass(welcomeEl, DP_NONE_CLASS);
    addClass(userNameEl, DP_NONE_CLASS);
  } else {
    addClass(welcomeEl, DP_NONE_CLASS);
    removeClass(userNameEl, DP_NONE_CLASS);
  }
}

/**
 * form submit event 제거
 * @param e
 */
function loginSubmitHandler(e) {
  e.preventDefault();
  loginHandler();
}

/**
 * login
 * @param e
 * @returns {boolean}
 */
function loginHandler() {
  if (!USER_NAME) {
    const userName = userNameEl.value;
    if (!userName) {
      alert("회원명을 입력해주세요");
      return false;
    } else {
      setLocalStorage(LS_USER_NAME, userName);
    }
  }
  removeClass(bodyEl, LOGIN_CLASS);
}
function loginInit() {
  displayLoginForm();
  formEl.addEventListener("submit", loginSubmitHandler);
  loginBtn.addEventListener("click", loginHandler);
}
loginInit();
