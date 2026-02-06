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
        <div class="imagenes">
          <button class="prev">&#10094;</button>
          <button class="next">&#10095;</button>
          ${imagenesHTML}
          <button class="vista" data-id="${index}">Vista Rápida</button>
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
          .map(
            (img, index) =>
              `<img 
                src="../img/${img.src}" 
                data-index="${index}" 
                class="thumb"
              >`
          )
          .join("")}
      </div>

      <div class="producto-img">
        <img 
          id="imagenGrande" 
          src="../img/${producto.imagenes[0].src}" 
          alt="${producto.nombre}"
        >
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

        <div class="cantidad">
          <span>Cantidad:</span>
          <button>-</button>
          <input type="number" value="1" min="1" />
          <button>+</button>
        </div>

        <span>Talla:</span>
        <div class="tallas">
          ${producto.tallas.map(t => `<button>${t}</button>`).join("")}
        </div>

        <button class="agregar-carrito">Agregar al Carrito</button>
      </div>
    </div>
  `;

  contenedorVista.classList.add("active");

  activarCambioImagen();
}
/* ==========================
   HOVER → AVANZA / RETROCEDE
========================== */
function activarCambioImagen() {
  const imagenGrande = document.getElementById("imagenGrande");
  const miniaturas = document.querySelectorAll(".thumb");

  miniaturas.forEach(img => {
    img.addEventListener("click", () => {
      imagenGrande.src = img.src;

      miniaturas.forEach(i => i.classList.remove("active"));
      img.classList.add("active");
    });
  });
}


/* ==========================
   EVENTOS CARRUSEL (INFINITO REAL)
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
  const imagenes = [...imagenesCont.querySelectorAll("img")];

  let indexActual = imagenes.findIndex(img =>
    img.classList.contains("activa")
  );

  if (indexActual === -1) indexActual = 0;

  let nuevoIndex;

  if (e.target.classList.contains("next")) {
    nuevoIndex = (indexActual + 1) % imagenes.length;
  }

  if (e.target.classList.contains("prev")) {
    nuevoIndex = (indexActual - 1 + imagenes.length) % imagenes.length;
  }

  imagenes.forEach(img => img.classList.remove("activa"));
  imagenes[nuevoIndex].classList.add("activa");
});

/* ==========================
   HOVER → AVANZA / RETROCEDE
========================== */
function initHoverCard() {
  document.querySelectorAll(".card").forEach(card => {
    const cont = card.querySelector(".imagenes");

    card.addEventListener("mouseenter", () => {
      const imgs = [...cont.querySelectorAll("img")];
      let index = imgs.findIndex(i => i.classList.contains("activa"));
      index = (index + 1) % imgs.length;

      imgs.forEach(i => i.classList.remove("activa"));
      imgs[index].classList.add("activa");
    });

    card.addEventListener("mouseleave", () => {
      const imgs = [...cont.querySelectorAll("img")];
      let index = imgs.findIndex(i => i.classList.contains("activa"));
      index = (index - 1 + imgs.length) % imgs.length;

      imgs.forEach(i => i.classList.remove("activa"));
      imgs[index].classList.add("activa");
    });
  });
}

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
   CERRAR VISTA RÁPIDA
========================== */
contenedorVista.addEventListener("click", e => {
  if (e.target.classList.contains("cerrar")) {
    contenedorVista.classList.remove("active");
    contenedorVista.innerHTML = "";
  }
});

/* ==========================
   INICIALIZACIÓN
========================== */
cambiarImagenPorColor();
initNavLinks();
initMenuMovil();
initSearchOverlay();
scrollNavbar();
activarCambioImagen();

fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    productosGlobal = data.productos;
    renderizarProductos(productosGlobal);
    initHoverCard();
  })
  .catch(err => console.error("Error cargando JSON:", err));
