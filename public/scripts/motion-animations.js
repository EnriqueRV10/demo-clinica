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
        { opacity: [0, 1], x: [-200, 0] },
        { duration: 1, delay },
      );
    },
    "scroll-fade-in-up": (element, delay = 0) => {
      scroll(animate(element, { opacity: [0, 1, 1, 0] }), {
        target: element,
        offset: ["start end", "end end", "start start", "end start"],
      });
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

  // Inicializar carrusel de testimonios
  initTestimonialCarousel();
});

function initTestimonialCarousel() {
  const track1 = document.getElementById("track-1");
  const track2 = document.getElementById("track-2");

  if (!track1 || !track2) return;

  // Configuración del carrusel
  const speed = 15; // pixels por segundo

  function startCarousel(track, direction) {
    const cards = track.children;
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 24; // width + gap
    const totalWidth = cardWidth * (cards.length / 2); // Solo la mitad porque duplicamos

    // Posición inicial
    let currentX = direction === "right" ? 0 : -totalWidth;
    track.style.transform = `translateX(${currentX}px)`;

    function moveTrack() {
      if (direction === "right") {
        currentX -= speed / 60; // 60fps
        if (currentX <= -totalWidth) {
          currentX = 0;
        }
      } else {
        currentX += speed / 60;
        if (currentX >= 0) {
          currentX = -totalWidth;
        }
      }

      track.style.transform = `translateX(${currentX}px)`;
      requestAnimationFrame(moveTrack);
    }

    moveTrack();
  }

  // Observar cuando la sección entra en viewport para iniciar animación
  const testimonialsSection = document.getElementById("testimonios");
  if (testimonialsSection) {
    inView(
      testimonialsSection,
      () => {
        startCarousel(track1, "right");
        startCarousel(track2, "left");
      },
      { once: true },
    );
  }
}
