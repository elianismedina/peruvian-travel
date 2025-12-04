# Implementación de Menús Desplegables con MouseOver y MouseOut

Este documento detalla el proceso técnico utilizado para implementar los menús desplegables (dropdowns) en el sitio web `Peruvian Travel`. La implementación se basa en JavaScript puro (Vanilla JS) y manipulación del DOM, utilizando eventos del mouse para controlar la visibilidad.

## 1. Estructura de Datos de Configuración

En lugar de codificar cada menú directamente en el HTML, utilizamos un objeto de configuración centralizado en `app.js`. Esto hace que el código sea mantenible y escalable.

```javascript
const dropdownMenus = {
  costa: {
    trigger: "costa-menu-trigger", // ID del elemento que activa el menú
    dropdown: "costa-dropdown",    // ID que tendrá el menú generado
    items: [                       // Lista de enlaces
      { text: "Costa", href: basePath + "costa/costa.html" },
      { text: "Lima", href: basePath + "costa/lima.html" },
      // ...
    ],
  },
  // ... configuraciones para sierra y selva
};
```

## 2. Generación Dinámica del DOM

La función `createDropdown(menuConfig)` se encarga de crear los elementos HTML necesarios si no existen. Esto mantiene el HTML inicial limpio y semántico.

1.  **Identificación del Trigger**: Se busca el elemento enlace en el menú principal (ej. "Costa").
2.  **Creación del Contenedor**: Se crea un `div` con la clase `dropdown-menu`.
3.  **Inserción de Enlaces**: Se iteran los items configurados y se agregan como elementos `<a>` dentro del contenedor.
4.  **Inserción en el DOM**: El menú se inserta inmediatamente después del elemento trigger.

## 3. Manejo de Eventos (La Lógica Principal)

La interactividad se logra mediante cuatro "Event Listeners" clave que gestionan la clase CSS `visible`.

### A. Mostrar el Menú (`mouseover`)
Cuando el usuario pasa el mouse sobre el enlace principal (trigger), se añade la clase `visible`.

```javascript
trigger.addEventListener("mouseover", function () {
  dropdown.classList.add("visible");
});
```

### B. Ocultar el Menú (`mouseout`) con `relatedTarget`
Este es el punto crítico de la implementación. No basta con ocultar el menú cuando el mouse sale del trigger, porque el usuario podría estar moviendo el mouse *hacia* el menú desplegable.

Utilizamos `e.relatedTarget` para verificar hacia dónde se mueve el mouse.

```javascript
trigger.addEventListener("mouseout", function (e) {
  const relatedTarget = e.relatedTarget;
  // Solo ocultamos si el mouse NO está entrando al dropdown
  if (!dropdown.contains(relatedTarget)) {
    dropdown.classList.remove("visible");
  }
});
```

### C. Mantener el Menú Visible
De manera similar, cuando el mouse está sobre el menú desplegable mismo, este debe permanecer visible.

```javascript
dropdown.addEventListener("mouseover", function () {
  dropdown.classList.add("visible");
});
```

### D. Salir del Menú
Cuando el mouse sale del menú desplegable, verificamos nuevamente si el usuario está regresando al trigger o saliendo completamente.

```javascript
dropdown.addEventListener("mouseout", function (e) {
  const relatedTarget = e.relatedTarget;
  // Solo ocultamos si el mouse NO regresa al trigger Y NO se queda dentro del dropdown
  if (!trigger.contains(relatedTarget) && !dropdown.contains(relatedTarget)) {
    dropdown.classList.remove("visible");
  }
});
```

## 4. Adaptabilidad (Responsive)

El script incluye una verificación inicial y un listener de `resize` para asegurar que esta lógica solo se ejecute en dispositivos de escritorio (ancho > 768px). En móviles, la interacción suele ser por "click" y se maneja mediante un menú hamburguesa separado.

```javascript
if (window.innerWidth < 768) {
  return; // No ejecutar lógica de hover en móviles
}
```

## Resumen

Esta implementación ofrece una experiencia de usuario fluida ("hover intent" básico) sin necesidad de librerías externas, asegurando que el menú no parpadee ni se cierre frustrantemente cuando el usuario intenta navegar por las opciones.
