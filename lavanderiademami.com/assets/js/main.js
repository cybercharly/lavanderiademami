// ================================================
// LA LAVANDERÍA DE MAMI - Scripts Globales
// ================================================

// --- Configuración central ---
const WHATSAPP_NUMBER = '523322562719'; // número con lada, formato wa.me
const DEFAULT_WA_MSG  = 'Hola, los encontré en su sitio web y quisiera información sobre sus servicios de lavandería. ¿Me pueden ayudar?';

// --- Construye todos los links de WhatsApp a partir de data-wa="mensaje" ---
// Cualquier <a> o <button> con atributo data-wa se convierte en un link a WhatsApp
// usando el número configurado arriba. Si data-wa está vacío, usa el mensaje por defecto.
function buildWhatsAppLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    const msg  = el.getAttribute('data-wa').trim() || DEFAULT_WA_MSG;
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    if (el.tagName === 'A') {
      el.setAttribute('href', href);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      // para botones u otros elementos
      el.addEventListener('click', () => window.open(href, '_blank', 'noopener'));
      el.style.cursor = 'pointer';
    }
  });
}
buildWhatsAppLinks();

// --- Mobile menu toggle ---
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });
  // Cerrar el menú al hacer clic en un link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = menuBtn.querySelector('i');
      if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
    });
  });
}

// --- Resaltar el link activo según la página ---
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === page) link.classList.add('active');
});

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// --- Formulario de contacto → WhatsApp (contacto.html) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const nombre   = document.getElementById('f-nombre').value.trim();
    const telefono = document.getElementById('f-telefono').value.trim();
    const servicio = document.getElementById('f-servicio').value;
    const detalle  = document.getElementById('f-detalle').value.trim();

    const text = `¡Hola La Lavandería de Mami! 👋 Me llamo *${nombre}*.

*Servicio de interés:* ${servicio}
*Detalle:* ${detalle || 'Sin detalle adicional'}
*Mi teléfono:* ${telefono || 'No proporcionado'}

Me gustaría más información. ¡Gracias!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

// --- Año dinámico en el footer ---
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
