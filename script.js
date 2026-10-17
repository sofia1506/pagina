
/* ==========================================
   PINK FLOYD EXPERIENCE
   JavaScript puro — sin frameworks
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initAlbumExplorer();
  initAlbumDialog();
  initReadingProgress();
  initScrollReveal();
  initBackToTop();
  initEffectsToggle();
  initCurrentYear();
});

/* ==========================================
   1. MENÚ PARA MÓVILES
========================================== */

function initMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (!button || !navigation) return;

  function closeMenu() {
    navigation.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  }

  button.addEventListener("click", () => {
    const isOpen =
      button.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      navigation.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Cerrar menú");
      document.body.classList.add("menu-open");
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      closeMenu();
    }
  });
}

/* ==========================================
   2. BUSCADOR Y FILTROS DE ÁLBUMES
========================================== */

function initAlbumExplorer() {
  const cards = [...document.querySelectorAll(".album-card")];
  const filters = [...document.querySelectorAll(".filter-button")];
  const searchInput = document.querySelector("#album-search-input");
  const status = document.querySelector("#search-status");

  if (!cards.length) return;

  let activeFilter = "todos";
  let searchTerm = "";

  function updateAlbums() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const text = card.textContent.toLocaleLowerCase("es");

      const matchesFilter =
        activeFilter === "todos" ||
        category === activeFilter;

      const matchesSearch = text.includes(searchTerm);
      const shouldShow = matchesFilter && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    if (status) {
      if (visibleCount === 0) {
        status.textContent =
          "No se encontraron álbumes. Prueba otra búsqueda.";
      } else {
        status.textContent =
          `${visibleCount} ${
            visibleCount === 1
              ? "álbum encontrado"
              : "álbumes encontrados"
          }`;
      }
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "todos";

      filters.forEach((filter) => {
        const selected = filter === button;

        filter.classList.toggle("active", selected);
        filter.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

      updateAlbums();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value
        .trim()
        .toLocaleLowerCase("es");

      updateAlbums();
    });
  }

  updateAlbums();
}

/* ==========================================
   3. INFORMACIÓN DE LOS ÁLBUMES
========================================== */

const albumData = {
  "dark-side": {
    title: "The Dark Side of the Moon",
    year: "1973",

    description:
      "Un álbum conceptual que aborda el tiempo, " +
      "la presión, el dinero, la mortalidad y la experiencia humana.",

    context:
      "Combina experimentación de estudio, transiciones sonoras " +
      "y una estructura conceptual. Es una de las obras más " +
      "reconocidas de la historia del rock.",

    url:
      "https://open.spotify.com/search/Pink%20Floyd%20The%20Dark%20Side%20of%20the%20Moon"
  },

  "wish-you-were-here": {
    title: "Wish You Were Here",
    year: "1975",

    description:
      "Una obra que reflexiona sobre la ausencia, la alienación " +
      "y las contradicciones de la industria musical.",

    context:
      "Incluye las dos partes de Shine On You Crazy Diamond " +
      "y la canción Wish You Were Here. El álbum explora " +
      "la distancia emocional y el recuerdo.",

    url:
      "https://open.spotify.com/search/Pink%20Floyd%20Wish%20You%20Were%20Here"
  },

  "meddle": {
    title: "Meddle",
    year: "1971",

    description:
      "Un álbum que amplió el lenguaje musical de la banda " +
      "mediante paisajes sonoros, improvisación y experimentación.",

    context:
      "La pieza Echoes ocupa gran parte de la segunda cara " +
      "del disco y anticipa el desarrollo conceptual y musical " +
      "de Pink Floyd durante los años siguientes.",

    url:
      "https://open.spotify.com/search/Pink%20Floyd%20Meddle"
  },

  "the-wall": {
    title: "The Wall",
    year: "1979",

    description:
      "Una ópera rock que narra el aislamiento progresivo " +
      "de su protagonista a través de una historia conceptual.",

    context:
      "Sus canciones exploran el trauma, la soledad, " +
      "la autoridad y las barreras emocionales. " +
      "El álbum también inspiró una adaptación cinematográfica.",

    url:
      "https://open.spotify.com/search/Pink%20Floyd%20The%20Wall"
  }
};

/* ==========================================
   4. VENTANA EMERGENTE DE LOS ÁLBUMES
========================================== */

function initAlbumDialog() {
  const dialog = document.querySelector("#album-dialog");
  const closeButton = document.querySelector("#close-dialog");

  if (!dialog || !closeButton) return;

  const title = document.querySelector("#dialog-title");
  const year = document.querySelector("#dialog-year");
  const description =
    document.querySelector("#dialog-description");
  const context = document.querySelector("#dialog-context");
  const listenLink = document.querySelector("#dialog-listen");

  const albumButtons =
    document.querySelectorAll("[data-album]");

  albumButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const album = albumData[button.dataset.album];

      if (!album) return;

      title.textContent = album.title;
      year.textContent = album.year;
      description.textContent = album.description;
      context.textContent = album.context;
      listenLink.href = album.url;
      listenLink.textContent = "BUSCAR PARA ESCUCHAR ↗";

      if (!dialog.open) {
        dialog.showModal();
      }
    });
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // Cerrar al pulsar sobre el fondo de la ventana.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  // El elemento dialog también permite cerrar con Escape.
}

/* ==========================================
   5. BARRA DE PROGRESO DE LECTURA
========================================== */

function initReadingProgress() {
  const bar = document.querySelector("#progress-bar");

  if (!bar) return;

  let ticking = false;

  function updateProgress() {
    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    bar.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", updateProgress);

  updateProgress();
}

/* ==========================================
   6. ANIMACIONES AL DESPLAZARSE
========================================== */

function initScrollReveal() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const elements = document.querySelectorAll(
    ".section-heading, " +
    ".featured-news, " +
    ".news-card, " +
    ".album-card, " +
    ".history-image, " +
    ".history-copy, " +
    ".quote-section"
  );

  elements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
  });

  document.body.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/* ==========================================
   7. BOTÓN VOLVER ARRIBA
========================================== */

function initBackToTop() {
  const button = document.querySelector("#back-to-top");

  if (!button) return;

  function updateButton() {
    button.classList.toggle(
      "visible",
      window.scrollY > 450
    );
  }

  window.addEventListener(
    "scroll",
    updateButton,
    { passive: true }
  );

  button.addEventListener("click", () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  updateButton();
}

/* ==========================================
   8. ACTIVAR O DESACTIVAR EFECTOS
========================================== */

function initEffectsToggle() {
  const button = document.querySelector("#effects-toggle");

  if (!button) return;

  button.addEventListener("click", () => {
    const effectsEnabled =
      button.getAttribute("aria-pressed") === "true";

    const nextState = !effectsEnabled;

    document.body.classList.toggle(
      "effects-off",
      !nextState
    );

    button.setAttribute(
      "aria-pressed",
      String(nextState)
    );

    button.setAttribute(
      "aria-label",
      nextState
        ? "Desactivar efectos visuales"
        : "Activar efectos visuales"
    );

    button.title = nextState
      ? "Desactivar efectos visuales"
      : "Activar efectos visuales";
  });
}

/* ==========================================
   9. AÑO AUTOMÁTICO EN EL FOOTER
========================================== */

function initCurrentYear() {
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}
