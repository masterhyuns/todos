const bodyEl = document.querySelector("body");
const LS_IS_FIRST = "IS_FIRST";
const IS_FIRST = getLocalStorage(LS_IS_FIRST) ? false : true;
const DP_NONE_CLASS = "dp-none";
function getLocalStorage(key) {
  const lsValue = localStorage.getItem(key);
  return lsValue || "";
}
function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
function lsUtilsInit() {}

lsUtilsInit();
