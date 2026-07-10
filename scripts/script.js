document.addEventListener("DOMContentLoaded", function () {
  // Active Nav-Link
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

  // Tab-Switching
  document.querySelectorAll(".mediaSelection").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".mediaContent")
        .forEach((s) => s.classList.add("hidden"));
      document
        .querySelectorAll(".mediaSelection")
        .forEach((b) => b.classList.remove("active"));

      document.getElementById(button.dataset.target).classList.remove("hidden");
      button.classList.add("active");
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  document.querySelectorAll("#screenshots .mediaCard button").forEach((btn) => {
    const img = btn.querySelector("img");
    btn.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  document.querySelector(".lightboxClose").addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
    }
  });
});

//Hamburger Menu
document.addEventListener("click", (event) => {
  const button = event.target.closest("#hamburgerBtn");
  if (!button) return;

  const menu = document.getElementById("navMenu");
  const isOpen = menu.classList.toggle("open");
  button.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (event) => {
  if (event.target.matches("#navMenu a")) {
    document.getElementById("navMenu").classList.remove("open");
  }
});