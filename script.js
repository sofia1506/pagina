
/* ========================================
   1. INICIALIZACIÓN
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initAlbumFilters();
  initCurrentYear();
});

/* ========================================
   2. MENÚ PARA MÓVILES
======================================== */

function initMobileMenu() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = navigation.querySelectorAll("a");

  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      navigation.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Cerrar menú");
      document.body.classList.add("menu-open");
    }
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      closeMenu();
    }
  });
}

/* ========================================
   3. FILTRO DE ÁLBUMES
======================================== */

function initAlbumFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const albumCards = document.querySelectorAll(".album-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      // Actualizar el botón seleccionado.
      filterButtons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      // Mostrar los álbumes que corresponden al filtro.
      albumCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow =
          selectedFilter === "todos" ||
          category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });

    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );
  });
}

/* ========================================
   4. AÑO AUTOMÁTICO
======================================== */

function initCurrentYear() {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
