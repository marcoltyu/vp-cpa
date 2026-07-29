/* ============================================================
   VPCPA — main.js (Phase 1 mobile optimisation)
   ============================================================ */
(function () {
  const MOBILE_NAV = window.matchMedia("(max-width: 1200px)");
  const REDUCED_OR_MOBILE = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  function closeSubmenus(except) {
    document.querySelectorAll(".nav-dropdown.submenu-open").forEach((item) => {
      if (item === except) return;
      item.classList.remove("submenu-open");
      const trigger = item.querySelector(":scope > .nav-dropdown-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function closeNav() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    closeSubmenus();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open && MOBILE_NAV.matches);
      if (!open) closeSubmenus();
    });

    mainNav.querySelectorAll(".nav-dropdown-trigger").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        if (!MOBILE_NAV.matches) return;
        event.preventDefault();
        event.stopPropagation();
        const item = trigger.closest(".nav-dropdown");
        const willOpen = !item.classList.contains("submenu-open");
        closeSubmenus(item);
        item.classList.toggle("submenu-open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
      });
    });

    mainNav.querySelectorAll("a:not(.nav-dropdown-trigger)").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
      if (!MOBILE_NAV.matches) closeNav();
    }, { passive: true });
  }

  /* Language toggle */
  const STORAGE_KEY = "vpcpa.lang";
  function normaliseLang(value) {
    value = (value || "").toString().toLowerCase();
    return (value.includes("zh") || value.includes("繁") || value.includes("中")) ? "zh" : "en";
  }
  function applyLang(lang) {
    const chosen = normaliseLang(lang);
    document.documentElement.setAttribute("lang", chosen === "zh" ? "zh-HK" : "en-HK");
    document.querySelectorAll(".lang-toggle button").forEach((button) => {
      const active = normaliseLang(button.dataset.switchLang || button.textContent) === chosen;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    try { localStorage.setItem(STORAGE_KEY, chosen); } catch (_) {}
  }
  document.querySelectorAll(".lang-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      applyLang(button.dataset.switchLang || button.textContent);
      if (button.closest(".main-nav")) closeNav();
    });
  });
  let saved = "en";
  try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (_) {}
  applyLang(saved);

  /* Reveal animation: keep the polished desktop animation, remove mobile jank. */
  const revealItems = document.querySelectorAll(".reveal");
  if (REDUCED_OR_MOBILE.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => observer.observe(item));
    setTimeout(() => revealItems.forEach((item) => item.classList.add("visible")), 1400);
  }

  /* Active nav link */
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".main-nav a, .dropdown-menu a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#") || href.startsWith("javascript:")) return;
    const clean = href.split("#")[0].replace(/\/$/, "").replace(/^\.\.\//, "/").replace(/^\.\//, "/");
    if (clean && path.endsWith(clean.replace(/^\//, ""))) link.classList.add("current");
  });
})();
