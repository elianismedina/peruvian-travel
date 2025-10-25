/**
 * Responsive JavaScript for Peruvian Travel
 * Handles mobile menu, responsive images, and other interactive features
 */

class ResponsiveManager {
  constructor() {
    this.mobileMenuButton = null;
    this.mobileMenu = null;
    this.closeMobileMenuButton = null;
    this.currentBreakpoint = this.getCurrentBreakpoint();

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupResponsiveImages();
    this.setupScrollEffects();
    this.setupTouchGestures();
    this.setupResizeHandler();
  }

  /**
   * Setup mobile menu functionality
   */
  setupMobileMenu() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.closeMobileMenuButton = document.getElementById("close-mobile-menu");

    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
    }

    if (this.closeMobileMenuButton && this.mobileMenu) {
      this.closeMobileMenuButton.addEventListener("click", () =>
        this.closeMobileMenu()
      );
    }

    // Close menu when clicking on links
    if (this.mobileMenu) {
      const mobileMenuLinks = this.mobileMenu.querySelectorAll("a");
      mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => this.closeMobileMenu());
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.mobileMenu &&
        !this.mobileMenu.contains(e.target) &&
        !this.mobileMenuButton.contains(e.target) &&
        !this.mobileMenu.classList.contains("hidden")
      ) {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.toggle("hidden");
      const isExpanded = !this.mobileMenu.classList.contains("hidden");
      this.mobileMenuButton.setAttribute("aria-expanded", isExpanded);

      // Prevent body scroll when menu is open
      if (isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.add("hidden");
      this.mobileMenuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  /**
   * Setup responsive images with lazy loading
   */
  setupResponsiveImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  }

  /**
   * Setup scroll effects for hero section
   */
  setupScrollEffects() {
    const heroSection = document.querySelector(".hero-section");
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const nextSection = heroSection?.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Parallax effect for hero section
    if (heroSection) {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  /**
   * Setup touch gestures for mobile
   */
  setupTouchGestures() {
    let startY = 0;
    let startX = 0;

    document.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    });

    document.addEventListener("touchmove", (e) => {
      if (!startY || !startX) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = startY - currentY;
      const diffX = startX - currentX;

      // Swipe up to close mobile menu
      if (this.mobileMenu && !this.mobileMenu.classList.contains("hidden")) {
        if (Math.abs(diffY) > Math.abs(diffX) && diffY < -50) {
          this.closeMobileMenu();
        }
      }
    });

    document.addEventListener("touchend", () => {
      startY = 0;
      startX = 0;
    });
  }

  /**
   * Setup resize handler for responsive behavior
   */
  setupResizeHandler() {
    let resizeTimeout;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newBreakpoint = this.getCurrentBreakpoint();

        if (newBreakpoint !== this.currentBreakpoint) {
          this.currentBreakpoint = newBreakpoint;
          this.handleBreakpointChange(newBreakpoint);
        }
      }, 250);
    });
  }

  /**
   * Handle breakpoint changes
   */
  handleBreakpointChange(breakpoint) {
    // Close mobile menu when switching to desktop
    if (breakpoint === "md" || breakpoint === "lg" || breakpoint === "xl") {
      this.closeMobileMenu();
    }

    // Update responsive images
    this.updateResponsiveImages();
  }

  /**
   * Update responsive images based on current breakpoint
   */
  updateResponsiveImages() {
    const responsiveImages = document.querySelectorAll(
      "img[data-src-mobile][data-src-desktop]"
    );

    responsiveImages.forEach((img) => {
      if (this.currentBreakpoint === "sm" || this.currentBreakpoint === "xs") {
        img.src = img.dataset.srcMobile;
      } else {
        img.src = img.dataset.srcDesktop;
      }
    });
  }

  /**
   * Get current breakpoint based on window width
   */
  getCurrentBreakpoint() {
    const width = window.innerWidth;

    if (width < 640) return "xs";
    if (width < 768) return "sm";
    if (width < 1024) return "md";
    if (width < 1280) return "lg";
    return "xl";
  }

  /**
   * Utility method to check if device is mobile
   */
  isMobile() {
    return this.currentBreakpoint === "xs" || this.currentBreakpoint === "sm";
  }

  /**
   * Utility method to check if device is tablet
   */
  isTablet() {
    return this.currentBreakpoint === "md";
  }

  /**
   * Utility method to check if device is desktop
   */
  isDesktop() {
    return this.currentBreakpoint === "lg" || this.currentBreakpoint === "xl";
  }
}

/**
 * Responsive utilities
 */
class ResponsiveUtils {
  /**
   * Debounce function for performance
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function for performance
   */
  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Check if element is in viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Smooth scroll to element
   */
  static smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// Initialize responsive manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.responsiveManager = new ResponsiveManager();
  window.responsiveUtils = ResponsiveUtils;
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ResponsiveManager, ResponsiveUtils };
}
