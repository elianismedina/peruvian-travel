# Implementación del Slider de Imágenes (Carrusel) en la Página Selva

Este documento detalla la implementación técnica del carrusel de imágenes interactivo en la página `Selva`. La solución utiliza HTML5, CSS3 para las transiciones y JavaScript puro (Vanilla JS) para la lógica de control, incluyendo navegación automática y manual.

## 1. Estructura HTML

La estructura del slider se basa en un contenedor principal que actúa como "marco" y una pista (track) que se desliza horizontalmente.

```html
<div class="slider-container">
  <div class="slider-wrapper">
    <!-- Pista deslizante -->
    <div class="slider-track" id="slider-track">
      <!-- Slide Individual -->
      <div class="slider-slide">
        <img src="..." alt="...">
        <div class="slider-overlay">
          <h3>Título</h3>
          <p>Descripción</p>
        </div>
      </div>
      <!-- Más slides... -->
    </div>
    
    <!-- Controles de Navegación -->
    <button class="slider-nav-btn prev" id="slider-prev">...</button>
    <button class="slider-nav-btn next" id="slider-next">...</button>
    
    <!-- Indicadores (Puntos) -->
    <div class="slider-dots">
      <button class="slider-dot active" data-slide="0"></button>
      <!-- ... -->
    </div>
  </div>
</div>
```

## 2. Estilos CSS Clave

La magia de la animación reside en la propiedad `transform` y `transition` de CSS.

*   **`.slider-container`**: Define el tamaño y oculta el desbordamiento (`overflow: hidden`).
*   **`.slider-track`**: Es el elemento que se mueve.
    *   `display: flex`: Alinea las imágenes horizontalmente.
    *   `transition: transform 0.5s ease-in-out`: Suaviza el movimiento al cambiar de slide.
*   **`.slider-slide`**: Cada slide ocupa el 100% del ancho del contenedor (`min-width: 100%`).

## 3. Lógica JavaScript

El script gestiona el estado del slider y los eventos del usuario.

### A. Estado y Variables
```javascript
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;
```

### B. Función de Actualización (`updateSlider`)
Esta es la función central que mueve el carrusel. Calcula el desplazamiento negativo en porcentaje basado en el índice actual.

```javascript
function updateSlider() {
  // Mueve el track horizontalmente
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Actualiza la clase 'active' en los puntos indicadores
  dots.forEach((dot, index) => {
    // ... lógica de activación
  });
}
```

### C. Navegación Automática (`setInterval`)
Para lograr el cambio automático de imágenes, utilizamos `setInterval`.

```javascript
function startAutoSlide() {
  // Ejecuta nextSlide() cada 5000ms (5 segundos)
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}
```

### D. Navegación Manual y Reinicio del Temporizador
Es crucial reiniciar el intervalo automático cuando el usuario interactúa manualmente, para evitar que la imagen cambie inmediatamente después de que el usuario haya hecho clic.

```javascript
function goToSlide(slideIndex) {
  // ... validación de índice ...
  currentSlide = slideIndex;
  updateSlider();
  
  // Reinicia el temporizador para dar tiempo al usuario de ver la nueva imagen
  resetAutoSlide(); 
}
```

### E. Mejoras de Experiencia de Usuario (UX)

1.  **Pausa al Hover**: El carrusel se detiene cuando el usuario pasa el mouse por encima, facilitando la lectura del texto.
    ```javascript
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    ```

2.  **Gestión de Visibilidad**: Se detiene la animación si la pestaña no está activa para ahorrar recursos del navegador.
    ```javascript
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) stopAutoSlide();
      else startAutoSlide();
    });
    ```

## Resumen
Esta implementación proporciona un slider robusto y eficiente sin dependencias externas. Combina la automatización mediante `setInterval` con un control total por parte del usuario, asegurando una experiencia de navegación fluida e intuitiva.
