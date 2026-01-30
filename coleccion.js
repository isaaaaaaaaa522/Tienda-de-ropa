function scrollNavbar() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.top = `-${navbar.offsetHeight}px`;
    } else {
      navbar.style.top = '0';
    }

    lastScrollTop = scrollTop;
  });
}


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
function filterHeader() {

const filters = document.querySelectorAll(".filter");

filters.forEach(filter => {
  filter.addEventListener("toggle", () => {
    if (filter.open) {
      filters.forEach(other => {
        if (other !== filter) other.removeAttribute("open");
      });
    }
  });
});

  }
  
const contenedor = document.getElementById("products");

function renderizarProducts(productos) {
  contenedor.innerHTML = "";

  productos.forEach(p => {

    const imagenesHTML = p.imagenes
      .map((img, index) => `
        <img 
          src="../img/${img.src}"
          data-color="${img.color}"
          class="${index === 0 ? "activa" : ""}"
        >
      `)
      .join("");


    const coloresHTML = p.imagenes
    .map(img => `
      <span 
        class="color" 
        data-color="${img.color}"
        style="background:${img.color}">
      </span>|
    `)
    .join("");


    const tallasHTML = p.tallas
      .map(talla => `<button>${talla}</button>`)
      .join("");

    contenedor.innerHTML += `
      <article class="card">
        <div class="imagenes" data-index="0">
          <button class="prev">&#10094;</button>
          <button class="next">&#10095;</button>
          ${imagenesHTML}
        </div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <strong>S/ ${p.precio}</strong>
        <div class="colores">${coloresHTML}</div>
        <div class="tallas">${tallasHTML}</div>
      </article>
    `;
  });
}




initNavLinks();
initMenuMovil();
initSearchOverlay();

scrollNavbar();
fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    console.log("Productos cargados:", data.productos);
    renderizarProducts(data.productos);
    
  })
  .catch(err => console.error("Error cargando JSON:", err));


