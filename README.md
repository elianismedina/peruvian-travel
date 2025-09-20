# Peruvian Travel 🏔️

Una aplicación web moderna y responsiva que muestra la diversidad cultural y natural de Perú a través de sus tres regiones únicas: Costa, Sierra y Selva.

## 🌟 Características

### 🎨 Diseño y UX
- **Diseño responsivo** que se adapta perfectamente a móviles, tablets y desktop
- **Paleta de colores personalizada** inspirada en la bandera peruana:
  - **Primario**: #D91023 (Rojo peruano)
  - **Secundario**: #FDB813 (Dorado)
  - **Terciario**: #3A8E4F (Verde)
  - **Blanco**: #FFFFFF
- **Tipografías elegantes**:
  - **Cinzel**: Para encabezados y elementos destacados
  - **Merriweather**: Para texto del cuerpo
- **Animaciones suaves** y transiciones elegantes

### 📱 Navegación
- **Menú de navegación responsivo** con:
  - Navegación desktop horizontal
  - Menú móvil con degradado de colores terciario a secundario
  - Botón CTA "Explorar destinos"
- **Logo destacado** en sección independiente con fondo claro
- **Navegación entre páginas** fluida y consistente

### 🗺️ Páginas del Sitio

#### 🏠 **Página de Inicio**
- Hero section con imagen de Machu Picchu
- Introducción a las tres regiones de Perú
- Tarjetas informativas para cada región
- Call-to-actions atractivos

#### 🏖️ **Página Costa**
- Hero section con imágenes del litoral peruano
- Información sobre ciudades costeras (Lima, Trujillo, Chiclayo)
- Enlaces a otras regiones

#### 🏔️ **Página Sierra**
- Hero section con paisajes andinos
- Contenido sobre la cultura andina y Machu Picchu
- Información sobre ciudades de la sierra (Cusco, Arequipa, Huaraz)

#### 🌿 **Página Selva**
- Hero section con biodiversidad amazónica
- Información sobre la Amazonía peruana
- Ciudades de la selva (Iquitos, Puerto Maldonado, Tarapoto)

### 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **Tailwind CSS v4**: Framework de CSS moderno con:
  - Sistema de colores personalizado
  - Utilidades responsivas
  - Animaciones y transiciones
- **JavaScript Vanilla**: Interactividad del menú móvil
- **Google Fonts**: Tipografías Cinzel y Merriweather
- **Cloudinary**: Hosting de imágenes optimizadas

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd PeruvianTravelCode
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Tailwind CSS**
   ```bash
   cd src
   npx tailwindcss -i input.css -o output.css --watch
   ```

4. **Ejecutar el servidor local**
   - Abrir `src/inicio.html` en un navegador web
   - O usar un servidor local como Live Server de VS Code

## 📁 Estructura del Proyecto

```
PeruvianTravelCode/
├── src/
│   ├── inicio.html          # Página principal
│   ├── costa.html           # Página de la región Costa
│   ├── sierra.html          # Página de la región Sierra
│   ├── selva.html           # Página de la región Selva
│   ├── input.css            # Configuración de Tailwind CSS
│   └── output.css           # CSS compilado
├── public/
│   └── assets/
│       └── images/
│           ├── LogoPeruvianTravel.png
│           └── machupichu.webp
└── README.md
```

## 🎯 Funcionalidades Principales

### 📱 Menú Móvil
- **Activación**: Botón hamburguesa en la esquina superior derecha
- **Diseño**: Fondo degradado de verde terciario a amarillo secundario
- **Contenido**: Enlaces de navegación centrados con texto blanco
- **Logo**: Posicionado en la parte inferior
- **Cierre**: Botón X en la esquina superior derecha

### 🖥️ Navegación Desktop
- **Layout horizontal** con logo a la izquierda
- **Enlaces de navegación** con efectos hover
- **Botón CTA** destacado con color secundario
- **Indicador de página activa** con borde inferior

### 🖼️ Hero Sections
- **Imágenes de fondo** optimizadas desde Cloudinary
- **Overlay semi-transparente** para mejorar legibilidad
- **Texto responsivo** que se adapta al tamaño de pantalla
- **Botones CTA** con efectos de hover y animaciones

### 🦶 Footer
- **Sección del logo** con fondo gris claro
- **Información de contacto** y enlaces legales
- **Enlaces de navegación** organizados en columnas
- **Diseño responsivo** con grid adaptativo

## 🎨 Personalización

### Colores
Los colores personalizados están definidos en `src/input.css`:

```css
@theme {
  --color-primary: #D91023;
  --color-secondary: #FDB813;
  --color-tertiary: #3A8E4F;
}
```

### Tipografías
```css
@theme {
  --font-heading: "Cinzel", serif;
  --font-body: "Merriweather", serif;
}
```

### Componentes
- **Botones**: Utilizan la clase `font-heading` para tipografía consistente
- **Enlaces**: Transiciones suaves con `transition-colors duration-200`
- **Tarjetas**: Efectos hover con `hover:shadow-xl`

## 📱 Responsive Design

El sitio está optimizado para:
- **Móviles**: 320px - 767px
- **Tablets**: 768px - 1023px
- **Desktop**: 1024px+

### Breakpoints utilizados:
- `sm:` - 640px y superior
- `md:` - 768px y superior
- `lg:` - 1024px y superior
- `xl:` - 1280px y superior

## 🚀 Próximas Funcionalidades

- [ ] Páginas detalladas para cada ciudad
- [ ] Galería de imágenes interactiva
- [ ] Formulario de contacto funcional
- [ ] Blog de viajes
- [ ] Sistema de reservas
- [ ] Integración con mapas interactivos
- [ ] Versión en inglés

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Frontend**: [Tu nombre]
- **Diseño UX/UI**: [Tu nombre]
- **Contenido**: [Tu nombre]

## 📞 Contacto

- **Email**: info@peruvian-travel.com
- **Teléfono**: +51 999 999 999
- **Ubicación**: Lima, Perú

---

**Peruvian Travel** - Descubre la magia de Perú 🇵🇪
