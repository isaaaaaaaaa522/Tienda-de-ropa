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
      
      </article>
    `;
  });
}





const coleccionContainer = document.getElementById("coleccion-header");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Variables del carrusel
let currentIndex = 0;
let itemsPerView = 5;
let isAnimating = false;

// Tu función original - NO LA CAMBIES
function renderizarCategorias(productos) {
  coleccionContainer.innerHTML = "";

  productos.forEach(p => {
    const imagenesHTML = p.imagenes
      .map((img, index) => `
        <img 
          src="../img/${img.src}"
          data-color="${img.color}"
          class="${index === 0 ? "activa" : ""}"
          alt="Producto ${img.color}"
        >
      `)
      .join("");

    coleccionContainer.innerHTML += `
      <div class="img-coleccion" data-index="0">
        <div class="coleccion-headerrr">
         
        <div class="imagenes-coleccion-black"></div>
         ${imagenesHTML}
       
         <h3>xs</h3>
        
         </div>
        
        </div>
    `;
  });

  // Inicializar carrusel después de renderizar
  initCarousel();
}

// Inicializar carrusel
function initCarousel() {
  const items = document.querySelectorAll('.img-coleccion');
  const totalItems = items.length;
  
  if (totalItems === 0) return;
  
  // Crear clones para efecto infinito
  for (let i = 0; i < itemsPerView * 2; i++) {
    // Clonar primeros elementos al final
    const cloneStart = items[i % totalItems].cloneNode(true);
    coleccionContainer.appendChild(cloneStart);
    
    // Clonar últimos elementos al principio
    const cloneEnd = items[totalItems - 1 - (i % totalItems)].cloneNode(true);
    coleccionContainer.insertBefore(cloneEnd, items[0]);
  }
  
  // Mover a la posición inicial
  currentIndex = itemsPerView * 2;
  updateCarousel(true);
  
  // Configurar event listeners
  setupEventListeners();
}

// Actualizar posición del carrusel
function updateCarousel(instant = false) {
  const itemWidth = 100 / itemsPerView;
  const translateX = -currentIndex * itemWidth;
  
  if (instant) {
    coleccionContainer.style.transition = 'none';
  } else {
    coleccionContainer.style.transition = 'transform 0.5s ease';
  }
  
  coleccionContainer.style.transform = `translateX(${translateX}%)`;
}

// Mover carrusel
function moveCarousel(direction) {
  if (isAnimating) return;
  
  isAnimating = true;
  currentIndex += direction;
  
  updateCarousel();
  
  // Reiniciar posición si estamos en los clones
  setTimeout(() => {
    const totalRealItems = document.querySelectorAll('.img-coleccion').length;
    const clonesCount = itemsPerView * 4;
    
    if (currentIndex >= totalRealItems - itemsPerView * 2) {
      currentIndex = itemsPerView * 2;
      updateCarousel(true);
    } else if (currentIndex < itemsPerView * 2) {
      currentIndex = totalRealItems - itemsPerView * 4;
      updateCarousel(true);
    }
    
    isAnimating = false;
  }, 500);
}

// Configurar event listeners
function setupEventListeners() {
  // Flechas
  leftButton.onclick = () => moveCarousel(-1);
  rightButton.onclick = () => moveCarousel(1);
  
  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
  });
  

}

// Si ya hay elementos, inicializar
if (coleccionContainer.children.length > 0) {
  initCarousel();
}











function initPrecioRange() {
  const rangeMin = document.getElementById("rangeMin");
  const rangeMax = document.getElementById("rangeMax");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  rangeMin.addEventListener("input", () => {
    if (+rangeMin.value >= +rangeMax.value) {
      rangeMin.value = rangeMax.value - 1;
    }
    minPrice.value = rangeMin.value;
  });

  rangeMax.addEventListener("input", () => {
    if (+rangeMax.value <= +rangeMin.value) {
      rangeMax.value = +rangeMin.value + 1;
    }
    maxPrice.value = rangeMax.value;
  });

  minPrice.addEventListener("input", () => {
    if (+minPrice.value < +rangeMax.value) {
      rangeMin.value = minPrice.value;
    }
  });

  maxPrice.addEventListener("input", () => {
    if (+maxPrice.value > +rangeMin.value) {
      rangeMax.value = maxPrice.value;
    }
  });
}

initPrecioRange();
initNavLinks();
initMenuMovil();
initSearchOverlay();

scrollNavbar();
fetch("./datos.json")
  .then(res => res.json())
  .then(data => {
    console.log("Productos cargados:", data.productos);
    renderizarProducts(data.productos);
    renderizarCategorias(data.productos);
    coleccionContainer(data.productos);
    
  })
  .catch(err => console.error("Error cargando JSON:", err));


