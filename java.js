 
 
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



const contenedor = document.getElementById("carrusel");

function renderizarProductos(productos) {
  contenedor.innerHTML = "";

  productos.forEach(p => {

    const imagenesHTML = p.imagenes
      .map(img => `<img src="../img/${img}.jpeg" alt="${p.nombre}">`)
      .join("");

    const coloresHTML = p.colores
      .map(color => `<span class="color" style="background:${color}"></span>`)
      .join("");

    const tallasHTML = p.tallas
      .map(talla => `<button>${talla}</button>`)
      .join("");

    contenedor.innerHTML += `
      <article class="card">
        <div class="imagenes">${imagenesHTML}</div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <strong>S/ ${p.precio}</strong>
        <div class="colores">${coloresHTML}</div>
        <div class="tallas">${tallasHTML}</div>
      </article>
    `;
  });
}

  /* ==========================
     INICIALIZACIÓN
  ========================== */
initNavLinks();
initMenuMovil();
initSearchOverlay();
fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    console.log("Productos cargados:", data.productos);
    renderizarProductos(data.productos);
  })
  .catch(err => console.error("Error cargando JSON:", err));
