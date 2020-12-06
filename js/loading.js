const pageLoadingEl = document.querySelector(".page-loading");
progressEl = pageLoadingEl.querySelector(".loading-bar");
const LOADING_CLASS = "loading";
const LOGIN_CLASS = "login";
const IMAGE_NUMBER = 13;
/**
 * loading bar run
 */
function runProgressBar() {
  let progressValue = 3;
  progressEl.value = progressValue;

  const intevral = setInterval(() => {
    progressValue += 1;
    progressEl.value = progressValue;
    if (progressValue === 100) {
      clearInterval(intevral);
      removeClass(bodyEl, LOADING_CLASS);
      addClass(bodyEl, LOGIN_CLASS);
    }
  }, 10);
}

/**
 * 첫 방문시 로딩 출력
 */
function setDisplayLoading() {
  if (IS_FIRST) {
    addClass(bodyEl, LOADING_CLASS);
    runProgressBar();
  } else {
    removeClass(bodyEl, LOADING_CLASS);
  }
}
function imageLoading() {
  for (let i = 1; i < IMAGE_NUMBER + 1; i++) {
    let img = new Image();
    img.src = `./images/bg/mac_bg_${i}.jpeg`;
  }
}
function loadingInit() {
  imageLoading();
  setDisplayLoading();
}
if (IS_FIRST) {
  loadingInit();
}
