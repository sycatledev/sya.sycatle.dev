let header = document.getElementById("header");
var lastScrollTop = 0;

window.addEventListener("scroll",
  function () {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition < lastScrollTop) {
      if (header != null) header.classList.remove("-translate-y-full");
    } else {
      if (header != null && scrollPosition > 50) header.classList.add("-translate-y-full");
    }
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  },
  true
);