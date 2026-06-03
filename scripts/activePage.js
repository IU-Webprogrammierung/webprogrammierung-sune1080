document.addEventListener("htmx:afterSwap", function () {
  const links = document.querySelectorAll("nav a");
  links.forEach(function (link) {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  if (window.location.href.includes("article")) {
    document.querySelector('nav a[href="news.html"]').classList.add("active");
  }
});
