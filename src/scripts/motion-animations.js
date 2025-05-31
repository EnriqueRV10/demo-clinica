import { animate, delay, inView, scroll } from "motion";

window.motion = { animate, inView, scroll };

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  if (!window.motion) return;

  const { animate, inView, scroll } = window.motion;

  // Definir animaciones
  const animations = {
    "fade-in": (element, delay = 0) => {
      animate(element, { opacity: [0, 1] }, { duration: 0.8, delay });
    },
    "fade-in-up": (element, delay = 0) => {
      animate(
        element,
        { opacity: [0, 1], y: [100, 0] },
        { duration: 0.8, delay },
      );
    },
    "fade-in-left": (element, delay = 0) => {
      animate(
        element,
        { opacity: [0, 1], x: [-50, 0] },
        { duration: 0.8, delay },
      );
    },
    "fade-in-right": (element, delay = 0) => {
      animate(
        element,
        { opacity: [0, 1], x: [50, 0] },
        { duration: 0.8, delay },
      );
    },
    "scale-in": (element, delay = 0) => {
      animate(
        element,
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 0.8, delay },
      );
    },
    "slide-in-left": (element, delay = 0) => {
      animate(
        element,
        { opacity: [0, 1], x: [-100, 0] },
        { duration: 1, delay },
      );
    },
  };

  // Aplicar animaciones a elementos con data-animate
  document.querySelectorAll("[data-animate]").forEach((element) => {
    const animationType = element.getAttribute("data-animate");
    const delay = parseFloat(element.getAttribute("data-delay") || "0");

    // Estado inicial
    element.style.opacity = "0";

    inView(
      element,
      () => {
        if (animations[animationType]) {
          animations[animationType](element, delay);
        }
      },
      { once: true },
    );
  });
});
