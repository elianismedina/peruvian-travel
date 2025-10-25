// Script para corregir CLS en todas las páginas
const fs = require("fs");
const path = require("path");

const pages = [
  "src/costa/costa.html",
  "src/sierra/sierra.html",
  "src/selva/selva.html",
  "src/destinos.html",
];

const logoFix = (content) => {
  return content.replace(
    /<img src="[^"]*LogoPeruvianTravel\.png"[^>]*>/g,
    (match) => {
      if (match.includes("style=")) return match; // Ya tiene style
      return match.replace(
        ">",
        ' style="aspect-ratio: 200/48;" loading="eager">'
      );
    }
  );
};

const fontFix = (content) => {
  if (content.includes("font-display: swap")) return content; // Ya tiene el fix

  const fontStyle = `
  <style>
    /* Prevent font swap layout shift */
    .font-heading {
      font-family: 'Cinzel', serif;
      font-display: swap;
    }
    .font-body {
      font-family: 'Merriweather', serif;
      font-display: swap;
    }
  </style>`;

  return content.replace(
    /<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet">/,
    `$&${fontStyle}`
  );
};

console.log("Aplicando correcciones de CLS...");

pages.forEach((page) => {
  try {
    let content = fs.readFileSync(page, "utf8");

    // Aplicar fixes
    content = logoFix(content);
    content = fontFix(content);

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - CLS fixes aplicados`);
  } catch (error) {
    console.log(`❌ Error en ${page}:`, error.message);
  }
});

console.log("Correcciones de CLS completadas");
