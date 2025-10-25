// Script para optimizar LCP en todas las páginas
const fs = require("fs");

const pages = [
  "src/costa/costa.html",
  "src/sierra/sierra.html",
  "src/selva/selva.html",
  "src/destinos.html",
];

const optimizeLCPImages = (content) => {
  // Optimizar imágenes principales con fetchpriority y decoding
  content = content.replace(
    /<img([^>]*)\s+src="[^"]*machupichu[^"]*"([^>]*)>/g,
    (match, before, after) => {
      if (match.includes('fetchpriority="high"')) return match; // Ya optimizada

      return match.replace(
        ">",
        ' fetchpriority="high" loading="eager" decoding="sync">'
      );
    }
  );

  // Optimizar logos con fetchpriority
  content = content.replace(
    /<img([^>]*)\s+src="[^"]*LogoPeruvianTravel[^"]*"([^>]*)>/g,
    (match, before, after) => {
      if (match.includes('fetchpriority="high"')) return match; // Ya optimizada

      return match.replace(
        ">",
        ' fetchpriority="high" loading="eager" decoding="sync">'
      );
    }
  );

  // Optimizar imágenes hero en general
  content = content.replace(
    /<img([^>]*)\s+src="[^"]*hero[^"]*"([^>]*)>/g,
    (match, before, after) => {
      if (match.includes('fetchpriority="high"')) return match;

      return match.replace(
        ">",
        ' fetchpriority="high" loading="eager" decoding="sync">'
      );
    }
  );

  return content;
};

const addLCPPreloads = (content) => {
  // Agregar preload para imágenes LCP si no existe
  const lcpImages = [
    "machupichu_kdibgw.webp",
    "costasection_hmwsj7.webp",
    "sierrasection_webp.webp",
    "selvasection_webp.webp",
  ];

  lcpImages.forEach((imageName) => {
    if (
      content.includes(imageName) &&
      !content.includes(`preload.*${imageName}`)
    ) {
      const preloadLink = `<link rel="preload" href="https://res.cloudinary.com/dxa54qfxx/image/upload/v1758384876/${imageName}" as="image" type="image/webp" fetchpriority="high">`;
      content = content.replace(
        /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/,
        `$&\n  ${preloadLink}`
      );
    }
  });

  return content;
};

console.log("Optimizando LCP en todas las páginas...");

pages.forEach((page) => {
  try {
    let content = fs.readFileSync(page, "utf8");

    // Aplicar optimizaciones LCP
    content = optimizeLCPImages(content);
    content = addLCPPreloads(content);

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - LCP optimizado`);
  } catch (error) {
    console.log(`❌ Error en ${page}:`, error.message);
  }
});

console.log("Optimización de LCP completada");
