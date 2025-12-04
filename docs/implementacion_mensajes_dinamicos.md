# Implementación de Mensajes Dinámicos (DOM Scripting)

Este documento explica el proceso técnico para implementar mensajes personalizados en la página de inicio, los cuales cambian dinámicamente según la hora del día y el idioma del navegador del usuario.

## 1. Concepto General

El objetivo es mejorar la experiencia de usuario (UX) ofreciendo un saludo contextual. Para ello, utilizamos JavaScript para "leer" el entorno del usuario (hora y configuración regional) y manipular el Document Object Model (DOM) para inyectar el texto apropiado.

## 2. Preparación del HTML

Primero, necesitamos un "contenedor" en el HTML donde se mostrará el mensaje. Modificamos el archivo `inicio.html` para agregar un elemento `<div>` vacío con un ID único.

```html
<!-- Contenedor para el saludo dinámico -->
<div id="dynamic-greeting" class="text-xl ..."></div>
```

    *   **`id="dynamic-greeting"`**: Este identificador es crucial, ya que sirve como "gancho" para que JavaScript encuentre este elemento específico dentro de todo el documento.
    *   **Clases CSS**: Se aplicaron estilos para que el texto resalte (color dorado, sombra, mayúsculas) y se integre con el diseño "Hero" de la página.

## 3. Lógica JavaScript (`app.js`)

La lógica se encapsuló en una función `updateGreeting()` que se ejecuta inmediatamente después de que el DOM ha sido cargado (`DOMContentLoaded`).

### A. Obtención de Datos del Contexto

Utilizamos objetos nativos del navegador para obtener la información necesaria:

1.  **Hora del Sistema**:
    ```javascript
    const hour = new Date().getHours(); // Retorna un número entre 0 y 23
    ```

2.  **Idioma del Navegador**:
    ```javascript
    // Soporte para diferentes navegadores (Chrome/Firefox vs IE antiguo)
    const lang = navigator.language || navigator.userLanguage; 
    const isEnglish = lang && lang.startsWith('en'); // Detecta 'en-US', 'en-GB', etc.
    ```

### B. Lógica Condicional

Determinamos el mensaje basándonos en rangos horarios estándar:

*   **Mañana (05:00 - 11:59)**: "Buenos Días" / "Good Morning"
*   **Tarde (12:00 - 18:59)**: "Buenas Tardes" / "Good Afternoon"
*   **Noche (19:00 - 04:59)**: "Buenas Noches" / "Good Evening"

```javascript
let greeting = '';

if (hour >= 5 && hour < 12) {
  greeting = isEnglish ? 'Good Morning' : 'Buenos Días';
} else if (hour >= 12 && hour < 19) {
  greeting = isEnglish ? 'Good Afternoon' : 'Buenas Tardes';
} else {
  greeting = isEnglish ? 'Good Evening' : 'Buenas Noches';
}
```

### C. Manipulación del DOM

Finalmente, "inyectamos" el texto calculado en el elemento HTML que preparamos anteriormente.

```javascript
const greetingElement = document.getElementById('dynamic-greeting');
if (greetingElement) {
  greetingElement.textContent = greeting;
}
```

*   **`document.getElementById()`**: Busca el nodo en el árbol del DOM.
*   **`.textContent`**: Propiedad segura para establecer texto. Es preferible a `.innerHTML` cuando solo se inserta texto plano, ya que evita riesgos de seguridad (XSS) y es más rápido.

## Resumen

Esta implementación demuestra cómo JavaScript puede actuar como un puente entre el contexto del usuario (hora/idioma) y la interfaz visual (HTML), permitiendo una web más viva y personalizada sin necesidad de recargar la página o procesar datos en el servidor.
