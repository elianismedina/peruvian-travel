document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    return; // No ejecutar en móvil
  }

  // Función para determinar la ruta base según la ubicación de la página
  function getBasePath() {
    const path = window.location.pathname;
    // Si estamos en src/inicio.html o src/destinos.html
    if (
      path.includes("/inicio.html") ||
      path.includes("/destinos.html") ||
      path.endsWith("/src/") ||
      path.endsWith("/src")
    ) {
      return "";
    }
    // Si estamos en src/costa/, src/sierra/, src/selva/
    if (
      path.includes("/costa/") ||
      path.includes("/sierra/") ||
      path.includes("/selva/")
    ) {
      return "../";
    }
    return "";
  }

  const basePath = getBasePath();

  // Configuración de los menús desplegables
  const dropdownMenus = {
    costa: {
      trigger: "costa-menu-trigger",
      dropdown: "costa-dropdown",
      items: [
        { text: "Costa", href: basePath + "costa/costa.html" },
        { text: "Lima", href: basePath + "costa/lima.html" },
        { text: "Playas", href: basePath + "costa/playas.html" },
      ],
    },
    sierra: {
      trigger: "sierra-menu-trigger",
      dropdown: "sierra-dropdown",
      items: [
        { text: "Sierra", href: basePath + "sierra/sierra.html" },
        { text: "Andes", href: basePath + "sierra/andes.html" },
      ],
    },
    selva: {
      trigger: "selva-menu-trigger",
      dropdown: "selva-dropdown",
      items: [
        { text: "Selva", href: basePath + "selva/selva.html" },
        { text: "Amazonía", href: basePath + "selva/amazonia.html" },
        { text: "Iquitos", href: basePath + "selva/iquitos.html" },
      ],
    },
  };

  // Función para crear el menú desplegable si no existe
  function createDropdown(menuConfig) {
    const trigger = document.getElementById(menuConfig.trigger);
    if (!trigger) return;

    // Verificar si el dropdown ya existe
    let dropdown = document.getElementById(menuConfig.dropdown);
    if (!dropdown) {
      // Crear el contenedor del dropdown
      dropdown = document.createElement("div");
      dropdown.id = menuConfig.dropdown;
      dropdown.className = "dropdown-menu";

      // Crear los items del menú
      menuConfig.items.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        dropdown.appendChild(link);
      });

      // Insertar el dropdown después del trigger
      trigger.parentNode.insertBefore(dropdown, trigger.nextSibling);
    }

    // Hacer el trigger relativo para posicionar el dropdown
    if (trigger.parentNode.style.position !== "relative") {
      trigger.parentNode.style.position = "relative";
    }

    // Evento mouseover - mostrar dropdown
    trigger.addEventListener("mouseover", function () {
      dropdown.classList.add("visible");
    });

    // Evento mouseout - ocultar dropdown
    trigger.addEventListener("mouseout", function (e) {
      // Verificar si el mouse está saliendo del trigger y no entrando al dropdown
      const relatedTarget = e.relatedTarget;
      if (!dropdown.contains(relatedTarget)) {
        dropdown.classList.remove("visible");
      }
    });

    // Evento mouseover en el dropdown - mantener visible
    dropdown.addEventListener("mouseover", function () {
      dropdown.classList.add("visible");
    });

    // Evento mouseout en el dropdown - ocultar
    dropdown.addEventListener("mouseout", function (e) {
      const relatedTarget = e.relatedTarget;
      if (
        !trigger.contains(relatedTarget) &&
        !dropdown.contains(relatedTarget)
      ) {
        dropdown.classList.remove("visible");
      }
    });
  }

  // Inicializar todos los menús desplegables
  Object.values(dropdownMenus).forEach((menuConfig) => {
    createDropdown(menuConfig);
  });

  // Manejar cambios de tamaño de ventana
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Si cambia a móvil, ocultar todos los dropdowns
      if (window.innerWidth < 768) {
        Object.values(dropdownMenus).forEach((menuConfig) => {
          const dropdown = document.getElementById(menuConfig.dropdown);
          if (dropdown) {
            dropdown.classList.remove("visible");
          }
        });
      }
    }, 250);
  });
});
