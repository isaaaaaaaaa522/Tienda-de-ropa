/* ==========================
   NAVBAR SCROLL
========================== */
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

/* ==========================
   NAV LINKS ACTIVE
========================== */
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

/* ==========================
   BUSCADOR
========================== */
function initSearchOverlay() {
  const openSearch = document.getElementById("openSearch");
  const closeSearch = document.getElementById("closeSearch");
  const searchOverlay = document.getElementById("searchOverlay");
  const navbar = document.querySelector(".navbar");

  openSearch.addEventListener("click", e => {
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
   CARRUSEL PRODUCTOS
========================== */
const contenedor = document.getElementById("carrusel");
const contenedorVista = document.getElementById("description-produc");

let productosGlobal = [];

function renderizarProductos(productos) {
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    const imagenesHTML = p.imagenes
      .map((img, i) => `
        <img 
          src="../img/${img.src}"
          data-color="${img.color}"
          class="${i === 0 ? "activa" : ""}">
      `).join("");

    const coloresHTML = p.imagenes
      .map(img => `
        <span 
          class="color"
          data-color="${img.color}"
          style="background:${img.color}">
        </span>
      `).join("");

    contenedor.innerHTML += `
      <article class="card">
        <div class="imagenes" data-index="0">
          <button class="prev">&#10094;</button>
          <button class="next">&#10095;</button>
          ${imagenesHTML}
          <button class="vista" data-id="${index}">Vista Rapida</button>
        </div>

        <div class="descripcion">
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <strong>S/ ${p.precio}</strong>
          <div class="colores">${coloresHTML}</div>
        </div>
      </article>
    `;
  });
}

/* ==========================
   VISTA RÁPIDA
========================== */
function renderVistaRapida(producto) {
  contenedorVista.innerHTML = `
    <div class="vista-container">
      <button class="cerrar">✖</button>

      <div class="vista-imagenes">
        ${producto.imagenes
          .map(img => `<img src="../img/${img.src}">`)
          .join("")}
      </div>

      <div class="vista-info">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <strong>S/ ${producto.precio}</strong>

        <div class="vista-colores">
          ${producto.imagenes
            .map(img => `<span style="background:${img.color}"></span>`)
            .join("")}
        </div>
      </div>
    </div>
  `;
  contenedorVista.classList.add("active");
}

/* ==========================
   EVENTOS CARRUSEL + VISTA
========================== */
contenedor.addEventListener("click", e => {

  if (e.target.classList.contains("vista")) {
    const id = e.target.dataset.id;
    renderVistaRapida(productosGlobal[id]);
    return;
  }

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

/* ==========================
   CERRAR VISTA RÁPIDA
========================== */
contenedorVista.addEventListener("click", e => {
  if (e.target.classList.contains("cerrar")) {
    contenedorVista.classList.remove("active");
    contenedorVista.innerHTML = "";
  }
});

/* ==========================
   CAMBIO DE IMAGEN POR COLOR
========================== */
function cambiarImagenPorColor() {
  contenedor.addEventListener("click", e => {
    if (!e.target.classList.contains("color")) return;

    const color = e.target.dataset.color;
    const card = e.target.closest(".card");
    const imagenes = card.querySelectorAll(".imagenes img");

    imagenes.forEach(img => {
      img.classList.toggle("activa", img.dataset.color === color);
    });
  });
}

/* ==========================
   INICIALIZACIÓN
========================== */
cambiarImagenPorColor();
initNavLinks();
initMenuMovil();
initSearchOverlay();
scrollNavbar();

fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    productosGlobal = data.productos;
    renderizarProductos(productosGlobal);
  })
  .catch(err => console.error("Error cargando JSON:", err));
