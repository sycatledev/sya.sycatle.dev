var header = document.getElementById("header");
var bottomButton = document.getElementById("bottom-button");
var lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let documentSize = document.documentElement.scrollHeight;
    
    if (scrollPosition < lastScrollTop) {
      if (header != null) header.classList.remove("-translate-y-full");
    } else {
      if (header != null && scrollPosition > 150) header.classList.add("-translate-y-full");
    }
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;

    if (scrollPosition < (documentSize - 50)) {
      if (bottomButton != null) header.classList.remove("-translate-y-full");
    } else {
      if (bottomButton != null) header.classList.add("-translate-y-full");
    }
  },
  true
);