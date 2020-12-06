/**
 * class 추가
 * @param element
 * @param className
 */
function addClass(element, className) {
  if (element.classList.contains(className)) {
    removeClass(element, className);
  }
  element.classList.add(className);
}

/**
 * class 삭제
 * @param element
 * @param className
 */
function removeClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
}
