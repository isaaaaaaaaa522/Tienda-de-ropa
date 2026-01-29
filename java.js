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

/* buscador */


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


/* CARRUSEL DE LOS PRODUCTOS DE KEVIN */
const contenedor = document.getElementById("carrusel");

function renderizarProductos(productos) {
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
      </span>
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
/*Movimiento del Carrusel*/
contenedor.addEventListener("click", e => {
  if (!e.target.classList.contains("prev") && 
      !e.target.classList.contains("next")) return;

  const imagenesCont = e.target.closest(".imagenes");
  const imagenes = imagenesCont.querySelectorAll("img");
  let index = Number(imagenesCont.dataset.index);

  if (e.target.classList.contains("next")) {
    index = (index + 1) % imagenes.length;
  }

  if (e.target.classList.contains("prev")) {
    index = (index - 1 + imagenes.length) % imagenes.length;
  }

  imagenes.forEach(img => img.classList.remove("activa"));
  imagenes[index].classList.add("activa");
  imagenesCont.dataset.index = index;
});

contenedor.addEventListener("mouseenter", e => {
  if (!e.target.matches(".imagenes img")) return;

  const imagenesCont = e.target.closest(".imagenes");
  const imagenes = imagenesCont.querySelectorAll("img");
  const indexActual = Number(imagenesCont.dataset.index);
  const indexHover = (indexActual - 1 + imagenes.length) % imagenes.length;

  imagenes[indexActual].classList.remove("activa");
  imagenes[indexHover].classList.add("activa");
}, true);

contenedor.addEventListener("mouseleave", e => {
  if (!e.target.matches(".imagenes")) return;

  const imagenesCont = e.target.closest(".imagenes");
  const imagenes = imagenesCont.querySelectorAll("img");
  const indexActual = Number(imagenesCont.dataset.index);

  imagenes.forEach(img => img.classList.remove("activa"));
  imagenes[indexActual].classList.add("activa");
}, true);


  


  /* ==========================
     INICIALIZACIÓN 
  ========================== */
initNavLinks();
initMenuMovil();
initSearchOverlay();
scrollNavbar();
fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    console.log("Productos cargados:", data.productos);
    renderizarProductos(data.productos);
  })
  .catch(err => console.error("Error cargando JSON:", err));


