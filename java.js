 
 
 function initNavLinks() {
    const navLinks = document.querySelectorAll(".navbar a");
    const activeLink = localStorage.getItem("activeNav");

    navLinks.forEach(link => {
      if (link.getAttribute("href") === activeLink) {
        link.classList.add("active");
      }

      link.addEventListener("click", () => {
        localStorage.setItem("activeNav", link.getAttribute("href"));
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  /* ==========================
     MENÚ MÓVIL
  ========================== */
  function initMenuMovil() {
    const menuToggle = document.getElementById("menuToggle");
    const navsLinks = document.getElementById("navsLinks");
    if (!menuToggle || !navsLinks) return;

    const navLinksItems = navsLinks.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
      const isOpen = navsLinks.classList.toggle("active");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.textContent = isOpen ? "✖" : "☰";
    });

    navLinksItems.forEach(link => {
      link.addEventListener("click", () => {
        navsLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.textContent = "☰";
      });
    });
  }


  const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");
const searchOverlay = document.getElementById("searchOverlay");
const navbar = document.querySelector(".navbar");

openSearch.addEventListener("click", (e) => {
  e.preventDefault();
  navbar.classList.add("hidden");
  searchOverlay.classList.add("active");
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("active");
  navbar.classList.remove("hidden");
});




function initSearchOverlay() {
  const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");
const searchOverlay = document.getElementById("searchOverlay");
const navbar = document.querySelector(".navbar");

openSearch.addEventListener("click", (e) => {
  e.preventDefault();
  navbar.classList.add("hidden");
  searchOverlay.classList.add("active");
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("active");
  navbar.classList.remove("hidden");
});

}






  /* ==========================
     INICIALIZACIÓN
  ========================== */
initNavLinks();
initMenuMovil();
initSearchOverlay();