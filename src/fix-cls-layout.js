// Script para corregir problemas de CLS (Cumulative Layout Shift) en todas las páginas
const fs = require("fs");

const pages = [
  "src/costa/costa.html",
  "src/sierra/sierra.html",
  "src/selva/selva.html",
  "src/destinos.html",
];

const addCLSPreventionStyles = (content) => {
  // Agregar estilos CSS críticos para prevenir CLS
  const clsStyles = `
    /* CLS Prevention - Reserve space for hero content */
    .hero-content {
      min-height: 500px;
      width: 100%;
      position: relative;
      z-index: 10;
    }
    
    /* Prevent layout shift on font loading */
    .hero-title {
      font-size: clamp(1.875rem, 4vw, 4.5rem);
      line-height: 1.2;
      min-height: 1.2em;
      font-weight: 700;
    }
    
    .hero-subtitle {
      font-size: clamp(1.125rem, 2.5vw, 1.875rem);
      line-height: 1.3;
      min-height: 1.3em;
      font-weight: 500;
    }
    
    /* Prevent CLS on button container */
    .hero-buttons {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: center;
      align-items: center;
    }
    
    @media (min-width: 640px) {
      .hero-buttons {
        flex-direction: row;
        gap: 1rem;
      }
    }
    
    /* Prevent font swap layout shift */
    .font-heading {
      font-family: 'Cinzel', serif;
      font-display: swap;
    }
    .font-body {
      font-family: 'Merriweather', serif;
      font-display: swap;
    }
  `;

  // Insertar estilos antes del cierre de </head>
  if (content.includes("</head>")) {
    content = content.replace(
      "</head>",
      `  <style>${clsStyles}</style>\n</head>`
    );
  }

  return content;
};

const fixHeroContent = (content) => {
  // Corregir contenido hero para prevenir CLS
  content = content.replace(
    /<div style="position: relative; z-index: 10; text-align: center; color: white; padding: 0 1rem; max-width: 64rem; margin: 0 auto; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">/g,
    '<div class="hero-content" style="text-align: center; color: white; padding: 0 1rem; max-width: 64rem; margin: 0 auto; display: flex; flex-direction: column; justify-content: center;">'
  );

  // Corregir títulos hero
  content = content.replace(
    /<h1 class="[^"]*" style="[^"]*">/g,
    '<h1 class="hero-title font-heading mb-4 sm:mb-6 px-2">'
  );

  content = content.replace(
    /<h2 class="[^"]*" style="[^"]*">/g,
    '<h2 class="hero-subtitle font-heading mb-6 sm:mb-8 opacity-90 px-4">'
  );

  // Corregir contenedor de botones
  content = content.replace(
    /<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">/g,
    '<div class="hero-buttons px-4">'
  );

  return content;
};

const addFontPreloads = (content) => {
  // Agregar preloads para fuentes críticas
  const fontPreloads = `
  <link rel="preload" href="https://fonts.gstatic.com/s/cinzel/v26/8vIJ7ww63….woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://fonts.gstatic.com/s/merriweather/v33/u-4t0qyri….woff2" as="font" type="font/woff2" crossorigin>
  `;

  if (
    content.includes('<link rel="preload" href="https://res.cloudinary.com')
  ) {
    content = content.replace(
      '<link rel="preload" href="https://res.cloudinary.com',
      fontPreloads + '  <link rel="preload" href="https://res.cloudinary.com'
    );
  }

  return content;
};

console.log("Corrigiendo problemas de CLS...");

pages.forEach((page) => {
  try {
    let content = fs.readFileSync(page, "utf8");

    // Aplicar correcciones CLS
    content = addCLSPreventionStyles(content);
    content = fixHeroContent(content);
    content = addFontPreloads(content);

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - CLS corregido`);
  } catch (error) {
    console.log(`❌ Error en ${page}:`, error.message);
  }
});

console.log("Corrección de CLS completada");
