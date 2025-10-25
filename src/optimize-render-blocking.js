// Script para optimizar render-blocking resources en todas las páginas
const fs = require("fs");

const pages = [
  "src/costa/costa.html",
  "src/sierra/sierra.html",
  "src/selva/selva.html",
  "src/destinos.html",
];

const optimizeCSS = (content) => {
  // Diferir CSS no crítico
  content = content.replace(
    /<link href="\.\/output\.css" rel="stylesheet">/g,
    '<link href="./output.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
  );

  content = content.replace(
    /<link href="\.\.\/output\.css" rel="stylesheet">/g,
    '<link href="../output.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
  );

  content = content.replace(
    /<link href="\.\.\/\.\.\/output\.css" rel="stylesheet">/g,
    '<link href="../../output.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
  );

  // Diferir CSS responsive
  content = content.replace(
    /<link href="\.\/styles\/responsive\.css" rel="stylesheet">/g,
    '<link href="./styles/responsive.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
  );

  content = content.replace(
    /<link href="\.\.\/styles\/responsive\.css" rel="stylesheet">/g,
    '<link href="../styles/responsive.css" rel="stylesheet" media="print" onload="this.media=\'all\'">'
  );

  // Agregar noscript fallbacks
  if (!content.includes("noscript><link href=")) {
    content = content.replace(
      /<\/head>/,
      '  <noscript><link href="./output.css" rel="stylesheet"></noscript>\n  <noscript><link href="./styles/responsive.css" rel="stylesheet"></noscript>\n</head>'
    );
  }

  return content;
};

const optimizeFonts = (content) => {
  // Diferir Google Fonts
  content = content.replace(
    /<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet">/g,
    (match) =>
      match.replace(
        'rel="stylesheet"',
        'rel="stylesheet" media="print" onload="this.media=\'all\'"'
      )
  );

  // Agregar noscript para fuentes
  if (!content.includes('noscript><link href="https://fonts.googleapis.com')) {
    content = content.replace(
      /<\/head>/,
      '  <noscript><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap" rel="stylesheet"></noscript>\n</head>'
    );
  }

  return content;
};

console.log("Optimizando render-blocking resources...");

pages.forEach((page) => {
  try {
    let content = fs.readFileSync(page, "utf8");

    // Aplicar optimizaciones
    content = optimizeCSS(content);
    content = optimizeFonts(content);

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - Render-blocking optimizado`);
  } catch (error) {
    console.log(`❌ Error en ${page}:`, error.message);
  }
});

console.log("Optimización de render-blocking completada");
