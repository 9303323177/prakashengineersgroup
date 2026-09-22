/* ============================================================
   PRAKASH ENGINEERS GROUP — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

// ── CONSTANTS ──
const PHONE1    = '9303323177';
const PHONE2    = '9589039426';
const WHATSAPP  = '919303323177';
const EMAIL1    = 'sakshiydv722@gmail.com';
const EMAIL2    = 'prakash-engineering4@gmail.com';

// ── DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initProcessTabs();
  initFormSubmit();
  initChatbot();
  initBackToTop();
  initActiveNav();
});

// ── HEADER SCROLL EFFECT ──
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── MOBILE NAV ──
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = mobileNav.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    });
  });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
    observer.observe(el);
  });

  // Staggered cards
  document.querySelectorAll('.why-card, .service-card, .product-card, .industry-card, .project-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.dataset.delay = (i % 3) * 100;
  });
}

// ── ANIMATED COUNTERS ──
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ── ACTIVE NAV ON SCROLL ──
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"], .mobile-nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ── PROCESS TABS (optional) ──
function initProcessTabs() { /* Extended if needed */ }

// ── FORM SUBMIT ──
function initFormSubmit() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Sending...`;
    btn.disabled = true;

    // Build WhatsApp message from form
    const name      = form.querySelector('[name="name"]').value;
    const company   = form.querySelector('[name="company"]').value;
    const phone     = form.querySelector('[name="phone"]').value;
    const city      = form.querySelector('[name="city"]').value;
    const cranereq  = form.querySelector('[name="cranereq"]').value;
    const capacity  = form.querySelector('[name="capacity"]').value;
    const message   = form.querySelector('[name="message"]').value;

    const waMsg = encodeURIComponent(
      `*New Enquiry - Prakash Engineers Group*\n\n` +
      `*Name:* ${name}\n` +
      `*Company:* ${company}\n` +
      `*Phone:* ${phone}\n` +
      `*City:* ${city}\n` +
      `*Crane Requirement:* ${cranereq}\n` +
      `*Approx Capacity:* ${capacity}\n` +
      `*Message:* ${message}\n\n` +
      `_Sent from website enquiry form_`
    );

    setTimeout(() => {
      showToast('✓ Enquiry submitted! Redirecting to WhatsApp...');
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;

      // Open WhatsApp with the enquiry
      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP}?text=${waMsg}`, '_blank');
      }, 800);
    }, 1200);
  });
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.background = type === 'error' ? '#e53935' : '#2e7d32';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── BACK TO TOP ──
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── AI CHATBOT ──
const botKnowledge = {
  greet: [
    'Hello! Welcome to Prakash Engineers Group. I\'m here to help you with crane solutions, services, and enquiries. How can I assist you today?',
  ],
  about: [
    'Prakash Engineers Group is an industrial engineering company based in Bhilai, Chhattisgarh. We have around 20 years of experience in crane manufacturing, installation, service and maintenance. We have completed approximately 24–30 crane projects for industrial customers.'
  ],
  products: [
    'We offer industrial crane solutions including EOT Cranes, Double Girder Cranes, Single Girder Cranes, Gantry/Goliath Cranes, and other custom industrial crane solutions. All cranes are manufactured as per customer requirements and site conditions.'
  ],
  services: [
    'Our services include:\n• Crane Manufacturing\n• Crane Installation & Commissioning\n• Preventive Maintenance\n• Breakdown & Repair Support\n• Inspection & Technical Support\n• After-Sales Support\n\nWe provide 24/7 technical support.'
  ],
  maintenance: [
    'We provide comprehensive EOT crane maintenance covering:\n• Mechanical parts (Gear Boxes, Brake Assemblies, Rope Drum, Pulleys)\n• Electrical parts (Main Panel, Limit Switches, Motors, Cables)\n• Fabrication (Rail Lines, Bus Bar, Current Collector)\n\nWe also do complete renovation and modification of EOT cranes.'
  ],
  contact: [
    `You can reach us at:\n📞 ${PHONE1} / ${PHONE2}\n📧 ${EMAIL1}\n📍 Plot No. 17B, Light Industrial Area, Chhawani, Bhilai, Chhattisgarh 490024\n\nWe are available 24 hours a day.`
  ],
  quote: [
    'To get a quote, please share:\n• Type of crane required\n• Maximum load capacity\n• Span (distance between rails)\n• Lifting height\n• Application & industry\n• Location\n\nYou can call us at ' + PHONE1 + ' or fill the enquiry form on this page.'
  ],
  location: [
    'We are located at Plot No. 17B, Light Industrial Area, Chhawani, Bhilai, Chhattisgarh 490024. You can also find us on Google Maps by searching "Prakash Engineers Group Bhilai".'
  ],
  experience: [
    'We have around 20 years of industry experience in crane manufacturing and maintenance. Our team has worked with many types of industrial machinery and has completed approximately 24–30 crane projects.'
  ],
  price: [
    'Crane pricing depends on several factors: crane type, capacity, span, lifting height, and application. We provide competitive quotes after a technical evaluation. Please call us at ' + PHONE1 + ' or submit an enquiry form for a customized quote.'
  ],
  eot: [
    'EOT (Electric Overhead Travelling) Cranes are our core product. We manufacture them as per your specific requirements. The crane is designed for safe, long-term operation in industrial environments. Contact us to discuss your EOT crane requirement.'
  ],
};

const quickReplies = [
  { label: 'Our Services', key: 'services' },
  { label: 'Get a Quote', key: 'quote' },
  { label: 'Contact Us', key: 'contact' },
  { label: 'About Us', key: 'about' },
  { label: 'Products', key: 'products' },
  { label: 'Maintenance', key: 'maintenance' },
];

function getBotResponse(input) {
  const lc = input.toLowerCase();
  if (/hello|hi|hey|namaste|good/.test(lc)) return botKnowledge.greet[0];
  if (/price|cost|charge|rate|fee|how much|kitna/.test(lc)) return botKnowledge.price[0];
  if (/eot|overhead|travelling/.test(lc)) return botKnowledge.eot[0];
  if (/product|crane type|model|what.*make|manufacture/.test(lc)) return botKnowledge.products[0];
  if (/service|maintain|repair|breakdown|inspect|commission/.test(lc)) return botKnowledge.services[0];
  if (/maintenance|maint|component|gear|brake|motor|panel/.test(lc)) return botKnowledge.maintenance[0];
  if (/quote|enquiry|require|need|want|looking for/.test(lc)) return botKnowledge.quote[0];
  if (/contact|call|phone|email|whatsapp|reach|address|location|where/.test(lc)) return botKnowledge.contact[0];
  if (/about|company|who|experience|year|history/.test(lc)) return botKnowledge.about[0];
  if (/location|address|bhilai|chhattisgarh|where.*based/.test(lc)) return botKnowledge.location[0];
  return `Thank you for your message! For the best assistance, please call us at 📞 ${PHONE1} or WhatsApp us at the same number. Our team is available 24 hours.`;
}

function initChatbot() {
  const launcher  = document.getElementById('chatbot-launcher');
  const window_   = document.getElementById('chatbot-window');
  const closeBtn  = document.getElementById('chatbot-close');
  const input     = document.getElementById('chatbot-input');
  const sendBtn   = document.getElementById('chatbot-send');
  const messages  = document.getElementById('chatbot-messages');
  const qrArea    = document.getElementById('chat-quick-replies');

  if (!launcher) return;

  // Render quick replies
  if (qrArea) {
    quickReplies.forEach(qr => {
      const btn = document.createElement('button');
      btn.className = 'chat-qr';
      btn.textContent = qr.label;
      btn.addEventListener('click', () => {
        addMessage(qr.label, 'user');
        setTimeout(() => addMessage(botKnowledge[qr.key][0], 'bot'), 500);
      });
      qrArea.appendChild(btn);
    });
  }

  launcher.addEventListener('click', () => {
    window_.classList.toggle('open');
    if (window_.classList.contains('open') && messages.children.length === 0) {
      setTimeout(() => addMessage(botKnowledge.greet[0], 'bot'), 300);
    }
  });
  closeBtn && closeBtn.addEventListener('click', () => window_.classList.remove('open'));

  function addMessage(text, from) {
    const div = document.createElement('div');
    div.className = `chat-msg ${from}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    div.appendChild(bubble);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    input.value = '';
    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.innerHTML = '<div class="chat-bubble" style="color:#999;font-style:italic">Typing...</div>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      messages.removeChild(typing);
      addMessage(getBotResponse(val), 'bot');
    }, 700);
  }

  sendBtn && sendBtn.addEventListener('click', handleSend);
  input && input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
