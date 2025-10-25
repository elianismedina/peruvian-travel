// Script para corregir relación de aspecto de imágenes en todas las páginas
const fs = require("fs");

const pages = [
  "src/costa/costa.html",
  "src/sierra/sierra.html",
  "src/selva/selva.html",
  "src/destinos.html",
];

const fixLogoAspectRatio = (content) => {
  // Corregir dimensiones del logo (497x57 es la relación real)
  content = content.replace(
    /<img([^>]*)\s+src="[^"]*LogoPeruvianTravel[^"]*"([^>]*)>/g,
    (match, before, after) => {
      // Verificar si ya tiene las dimensiones correctas
      if (match.includes('width="497"') && match.includes('height="57"')) {
        return match; // Ya corregida
      }

      // Reemplazar dimensiones incorrectas
      let corrected = match
        .replace(/width="200"/g, 'width="497"')
        .replace(/height="48"/g, 'height="57"')
        .replace(/aspect-ratio:\s*200\/48/g, "aspect-ratio: 497/57")
        .replace(
          /style="([^"]*)"([^>]*style="aspect-ratio:\s*200\/48;)/g,
          'style="$1 aspect-ratio: 497/57;"'
        );

      // Si no tiene style, agregarlo
      if (!corrected.includes("style=")) {
        corrected = corrected.replace(">", ' style="aspect-ratio: 497/57;">');
      }

      return corrected;
    }
  );

  return content;
};

const fixImageAspectRatios = (content) => {
  // Corregir otras imágenes que puedan tener problemas de aspecto
  const imageFixes = [
    // Hero images
    {
      pattern: /<img([^>]*)\s+src="[^"]*machupichu[^"]*"([^>]*)>/g,
      width: 1920,
      height: 1080,
    },
    {
      pattern: /<img([^>]*)\s+src="[^"]*costasection[^"]*"([^>]*)>/g,
      width: 1920,
      height: 1080,
    },
    {
      pattern: /<img([^>]*)\s+src="[^"]*sierrasection[^"]*"([^>]*)>/g,
      width: 1920,
      height: 1080,
    },
    {
      pattern: /<img([^>]*)\s+src="[^"]*selvasection[^"]*"([^>]*)>/g,
      width: 1920,
      height: 1080,
    },
  ];

  imageFixes.forEach((fix) => {
    content = content.replace(fix.pattern, (match) => {
      if (
        match.includes(`width="${fix.width}"`) &&
        match.includes(`height="${fix.height}"`)
      ) {
        return match; // Ya tiene dimensiones correctas
      }

      // Agregar dimensiones si no las tiene
      if (!match.includes("width=") || !match.includes("height=")) {
        return match.replace(
          ">",
          ` width="${fix.width}" height="${fix.height}">`
        );
      }

      return match;
    });
  });

  return content;
};

console.log("Corrigiendo relación de aspecto de imágenes...");

pages.forEach((page) => {
  try {
    let content = fs.readFileSync(page, "utf8");

    // Aplicar correcciones
    content = fixLogoAspectRatio(content);
    content = fixImageAspectRatios(content);

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - Relación de aspecto corregida`);
  } catch (error) {
    console.log(`❌ Error en ${page}:`, error.message);
  }
});

console.log("Corrección de relación de aspecto completada");
