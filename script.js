/*
  Configuração rápida do template.
  Confirme o número abaixo antes da publicação final.
  Formato: código do país + DDD + número, apenas dígitos.
*/
const SITE_CONFIG = {
  whatsappNumber: "558896037760",
  clinicName: "Clínica Rejuvence",
};

const careContent = {
  face: {
    number: "01",
    kicker: "Equilíbrio, expressão e naturalidade",
    title: "Harmonia facial",
    description: "Um olhar cuidadoso para proporções, contornos e pontos que podem ser valorizados sem apagar a sua identidade.",
    list: ["Avaliação individual", "Plano alinhado às suas expectativas", "Orientações antes e depois do cuidado"],
    image: "assets/suelly-face.webp",
    alt: "Retrato de Suelly Teles",
    gradient: "radial-gradient(circle at 70% 20%, rgba(255,255,255,.52), transparent 25%), linear-gradient(150deg, #bd8d65, #f0c9ad 58%, #c77d9c)",
  },
  skin: {
    number: "02",
    kicker: "Luminosidade, textura e vitalidade",
    title: "Pele & rejuvenescimento",
    description: "Cuidados pensados para as necessidades atuais da pele, com atenção à hidratação, aparência, textura e bem-estar.",
    list: ["Leitura cuidadosa da pele", "Escolha de protocolos personalizados", "Rotina de cuidados orientada"],
    image: "assets/serum-editorial.webp",
    alt: "Frasco cosmético em composição editorial",
    gradient: "radial-gradient(circle at 30% 15%, rgba(255,255,255,.45), transparent 30%), linear-gradient(145deg, #c0904f, #efc16e 52%, #9c6b3d)",
  },
  body: {
    number: "03",
    kicker: "Conforto, contorno e autocuidado",
    title: "Contorno corporal",
    description: "Uma abordagem individual para conversar sobre proporções, firmeza, bem-estar e objetivos corporais possíveis para você.",
    list: ["Avaliação das áreas de interesse", "Planejamento por etapas", "Acompanhamento individual"],
    image: "assets/suelly-branco-portrait.webp",
    alt: "Suelly Teles em retrato profissional",
    gradient: "radial-gradient(circle at 76% 18%, rgba(255,255,255,.5), transparent 22%), linear-gradient(150deg, #c6a37f, #ead6c2 55%, #b27870)",
  },
  laser: {
    number: "04",
    kicker: "Praticidade para a sua rotina",
    title: "Depilação a laser",
    description: "Atendimento planejado conforme a região, características da pele e histórico, com orientações claras para cada etapa.",
    list: ["Avaliação antes do início", "Planejamento das sessões", "Cuidados explicados com clareza"],
    image: "assets/branco-full.webp",
    alt: "Campanha institucional de Suelly Teles",
    gradient: "radial-gradient(circle at 28% 20%, rgba(255,255,255,.5), transparent 28%), linear-gradient(150deg, #b8a28a, #e7d1b4 58%, #a98a72)",
  },
  hair: {
    number: "05",
    kicker: "Atenção à saúde e aparência dos fios",
    title: "Cuidados capilares",
    description: "Uma conversa orientada para compreender queixas e possibilidades de cuidado, respeitando a necessidade de cada pessoa.",
    list: ["Escuta do histórico", "Avaliação individual", "Orientação de continuidade"],
    image: "assets/suelly-rosa-portrait.webp",
    alt: "Retrato de Suelly Teles com cabelos longos",
    gradient: "radial-gradient(circle at 80% 22%, rgba(255,255,255,.4), transparent 25%), linear-gradient(150deg, #9a745d, #d79d85 56%, #c74d81)",
  },
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

function buildWhatsAppUrl(message) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function initHeader() {
  const header = $("[data-header]");
  const menu = $("[data-menu]");
  const toggle = $("[data-menu-toggle]");
  const mobileContact = $(".mobile-contact");

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const opening = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(opening));
    menu.classList.toggle("is-open", opening);
    document.body.classList.toggle("menu-open", opening);
  });

  $$("a", menu).forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 48);
    if (mobileContact) mobileContact.classList.toggle("is-visible", y > 720);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6%" }
  );

  items.forEach((item) => observer.observe(item));
}

function initCareTabs() {
  const tabs = $$(".care-tab");
  const panel = $(".care-panel");
  if (!tabs.length || !panel) return;

  const title = $("[data-care-title]", panel);
  const kicker = $("[data-care-kicker]", panel);
  const description = $("[data-care-description]", panel);
  const list = $("[data-care-list]", panel);
  const number = $("[data-care-number]", panel);
  const image = $("[data-care-image]", panel);
  const visual = $("[data-care-visual]", panel);
  const cta = $("[data-care-cta]", panel);

  const selectCare = (key, focus = false) => {
    const data = careContent[key];
    const activeTab = tabs.find((tab) => tab.dataset.care === key);
    if (!data || !activeTab) return;

    tabs.forEach((tab) => {
      const active = tab === activeTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panel.classList.add("is-switching");
    window.setTimeout(() => {
      title.textContent = data.title;
      kicker.textContent = data.kicker;
      description.textContent = data.description;
      number.textContent = data.number;
      image.src = data.image;
      image.alt = data.alt;
      visual.style.background = data.gradient;
      list.innerHTML = data.list.map((item) => `<li>${item}</li>`).join("");
      cta.dataset.subject = data.title;
      panel.classList.remove("is-switching");
    }, 230);

    if (focus) activeTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.tabIndex = tab.classList.contains("is-active") ? 0 : -1;
    tab.addEventListener("click", () => selectCare(tab.dataset.care));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      selectCare(tabs[next].dataset.care, true);
    });
  });
}

function initQuiz() {
  const root = $("[data-consultation]");
  if (!root) return;

  const form = $("#consultation-form", root);
  const steps = $$(".quiz-step", root);
  const progress = $$(".quiz-progress span", root);
  const next = $("[data-quiz-next]", root);
  const back = $("[data-quiz-back]", root);
  const result = $(".quiz-result", root);
  const summary = $("[data-result-summary]", root);
  const whatsapp = $("[data-whatsapp-link]", root);
  const restart = $("[data-quiz-restart]", root);
  let current = 0;

  const showStep = (index) => {
    current = index;
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    progress.forEach((bar, barIndex) => bar.classList.toggle("is-active", barIndex <= index));
    back.disabled = index === 0;
    $("span", next).textContent = index === steps.length - 1 ? "Preparar mensagem" : "Continuar";
  };

  const selectedValue = (name) => {
    const checked = $(`input[name="${name}"]:checked`, form);
    return checked?.value || "";
  };

  const validateCurrent = () => {
    const checked = $("input:checked", steps[current]);
    if (checked) return true;
    const firstInput = $("input", steps[current]);
    firstInput?.focus();
    steps[current].animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 280, easing: "ease-out" }
    );
    return false;
  };

  const showResult = () => {
    const objective = selectedValue("objetivo");
    const experience = selectedValue("experiencia");
    const period = selectedValue("periodo");
    const message = `Olá! Conheci a ${SITE_CONFIG.clinicName} pelo site e gostaria de conversar sobre uma avaliação. Meu principal interesse é ${objective}. Sobre experiências anteriores: ${experience}. Normalmente, o melhor período para mim é ${period}.`;

    summary.textContent = `Interesse: ${objective}. Melhor período: ${period}. Ao tocar no botão, você poderá revisar a mensagem antes de enviá-la.`;
    whatsapp.href = buildWhatsAppUrl(message);
    form.hidden = true;
    result.hidden = false;
  };

  next.addEventListener("click", () => {
    if (!validateCurrent()) return;
    if (current < steps.length - 1) showStep(current + 1);
    else showResult();
  });

  back.addEventListener("click", () => {
    if (current > 0) showStep(current - 1);
  });

  restart.addEventListener("click", () => {
    form.reset();
    result.hidden = true;
    form.hidden = false;
    showStep(0);
  });
}

function initFaq() {
  $$(".faq-item").forEach((item) => {
    const button = $("button", item);
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      item.classList.toggle("is-open", !open);
    });
  });
}

function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = $$('[data-parallax]');
  if (!elements.length) return;

  let ticking = false;
  const update = () => {
    const viewport = window.innerHeight;
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) return;
      const strength = Number(element.dataset.parallax) || 0.05;
      const offset = (rect.top + rect.height / 2 - viewport / 2) * strength;
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  };

  const request = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
}

function initCursorGlow() {
  const glow = $(".cursor-glow");
  if (!glow || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let targetX = -500;
  let targetY = -500;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  const animate = () => {
    currentX += (targetX - currentX) * 0.11;
    currentY += (targetY - currentY) * 0.11;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    window.requestAnimationFrame(animate);
  };
  animate();
}

function initDirectLinks() {
  const directMessage = `Olá! Conheci a ${SITE_CONFIG.clinicName} pelo site e gostaria de informações sobre uma avaliação.`;
  $$('[data-direct-whatsapp]').forEach((link) => {
    link.href = buildWhatsAppUrl(directMessage);
  });
  $("[data-year]").textContent = new Date().getFullYear();
}

function initSmoothAnchors() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });
}

function init() {
  initHeader();
  initReveal();
  initCareTabs();
  initQuiz();
  initFaq();
  initParallax();
  initCursorGlow();
  initDirectLinks();
  initSmoothAnchors();
}

document.addEventListener("DOMContentLoaded", init);
